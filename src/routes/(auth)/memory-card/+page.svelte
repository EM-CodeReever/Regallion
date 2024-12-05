<script lang="ts">
    import MemoryCardBack from '$components/MemoryCardBack.svelte';
    import { fade, fly, slide } from 'svelte/transition';
    import type { PageData } from './$types';
    import {fruitEmojiObject, animalEmojiObject, stuffEmojiObject, getRandomRevealTextOption} from './util'
    import { ChevronDown, EyeOff, Play, Timer, View } from 'lucide-svelte';
    import { stringify } from 'postcss';
    import { cubicIn } from 'svelte/easing';
    export let data: PageData;
    let {userProfile} = data
    let clickHistory = <any>[];
    let hidden = true;
    let display = false;
    let start = false;
    let moveCounter = 0;
    let matchedCounter = 0;
    let showEndModal = false;
    let revealAvailable = false;
    let endLoading = false;
    let highScoreChecker = false;
    const emojiSets = [fruitEmojiObject, animalEmojiObject, stuffEmojiObject]
    let chosenEmojiSet = 0
    let time = {
        minutes: 0,
        seconds: 0
    
    };
    let timerId: any;
    let revealID: any;

    function timer(){
        timerId = setInterval(()=>{
            time.seconds++
            if(time.seconds === 60){
                time.minutes++
                time.seconds = 0
            }
        }, 1000)
    }

    function shuffleArray<T>(array: T[]) {
        const shuffledArray = array.slice(); // Create a copy of the original array

        // Fisher-Yates shuffle algorithm
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }

        return shuffledArray;
    }
    
    let randomizedEmojiArray = shuffleArray(emojiSets[chosenEmojiSet])
    randomizedEmojiArray.forEach((item)=>{
        item.hidden = true
        item.matched = false
    })

    function changeChosenEmojiSet(x:number){
        randomizedEmojiArray = shuffleArray(emojiSets[x])
        randomizedEmojiArray.forEach((item)=>{
            item.hidden = true
            item.matched = false
        })
    }

    function displayCardsForThreeSeconds(){
        display = true
        setTimeout(()=>{
            display = false
        }, 3000)
        revealAvailable = false
        clearInterval(revealID)
        revealID = setInterval(()=>{
            revealAvailable = true
        }, 20000)
    }

    function endGame(){
        start = false
        display = false
        moveCounter = 0
        matchedCounter = 0
        time = {
            minutes: 0,
            seconds: 0
        }
        randomizedEmojiArray = shuffleArray(emojiSets[chosenEmojiSet])
        randomizedEmojiArray.forEach((item)=>{
            item.hidden = true
            item.matched = false
        })
    }

    function scoreCalculation(){
        let score = 0

        //completing the game means the player has at least made all 18 correct matches
        const completionGaruntee = 1800 

        // for every move made (excluding the 18 moves for correct matches) 12 points are deducted
        let base = completionGaruntee - (12 * (moveCounter - 18)) 
        
        // mps - matches per second measures how fast matches are made and serves as a bonus multiplier
        let mpsbonus = base * calculateMPS() 

        // Im sure that the board can be completed in under a minute,
        // any time exceeding that 60 second threshold draws a penalty of 4 points per second
        let overtime = ((((time.minutes * 60) + time.seconds) - 60) * 4) 

        //Final Score, based on all the above factors
        score = base + mpsbonus - overtime
        return score
    }

    function calculateMPS(): number{
        let mps = 0
        if(time.minutes > 0){
            mps = matchedCounter / (time.minutes * 60 + time.seconds)
        }else{
            mps = matchedCounter / time.seconds
        }
        return mps
    }

</script>

<svelte:head>
  <title>Memory Cards</title>
  {#each emojiSets as set}
    {#each set as item}
        <link rel="preload" href={item.emoji} as="image" />
    {/each}
  {/each}
</svelte:head>
<section class="w-full h-fit flex select-none">
        {#if start && !showEndModal}
        <div class="flex flex-col w-full h-full space-y-3 items-center">
            <!-- game inofrmation -->
            <div class="w-full sm:w-[30rem] grid grid-cols-3">
                <div class="col-span-1 rounded-md flex flex-col items-start w-full p-2 justify-start font-extralight text-xl">
                    <span class="flex space-x-1">
                        <p>{matchedCounter} Matches</p>
                    </span>
                    <span>
                        <p>{moveCounter} Moves</p>
                    </span>
                    
                </div>
                <span class="col-span-1 flex justify-center items-center space-x-3">
                    <span class="text-sm text-center flex flex-col items-center">
                         <Timer size="30" />
                        <p class="text-xl">{time.minutes < 10 ? '0' + time.minutes : time.minutes}:{time.seconds < 10 ? '0' + time.seconds : time.seconds}</p>
                    </span>
                </span>
                <span class="col-span-1 flex justify-end items-center">
                    <button disabled={!revealAvailable} class="btn rounded-md morningGreen solid" on:click={()=>{displayCardsForThreeSeconds()}}> 
                        {#if revealAvailable}
                        <View size="20" /> Reveal
                        {:else}
                        <EyeOff size="20" /> Reveal
                        {/if}
                    </button>
                </span>
            </div>
            <!-- memory card grid box -->
            <div class="aspect-square w-full sm:w-[30rem] ground-glass rounded-md grid grid-cols-6 grid-rows-6 gap-1 lg:gap-3 p-3 relative">
                {#if endLoading}
                <script src="https://cdn.lordicon.com/lordicon.js"></script>
                <lord-icon
                    src="https://cdn.lordicon.com/jxhgzthg.json"
                    trigger="loop"
                    stroke="bold"
                    state="loop-cycle"
                    colors="primary:#ffffff,secondary:#ffffff"
                    style="width:50px;height:50px"
                    class="absolute right-[calc(50%-25px)] bottom-[calc(50%-25px)]">
                </lord-icon>
                {:else if display}
                    {#each randomizedEmojiArray as item}
                    <div class="w-full text-3xl h-full bg-gray-900 rounded-md cursor-pointer hover:bg-gray-700 hover:border-gray-200 hover:border-2 flex justify-center items-center" in:fade|global={{duration:300}}>
                        <img src={item.emoji} alt="">
                    </div>
                    {/each}
                {:else}
                {#each randomizedEmojiArray as item}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div in:fade|global={{duration:1000}} class="w-full text-3xl h-full bg-gray-900 rounded-md cursor-pointer hover:bg-gray-700 hover:border-gray-200 hover:border-2 flex justify-center items-center" on:click={async()=>{
                    if(item.matched === false){
                        item.hidden = !item.hidden
                        console.log(item)
                        clickHistory.push(item)
                        if(clickHistory.length === 2){
                            if(clickHistory[0].emoji === clickHistory[1].emoji && clickHistory[0].id !== clickHistory[1].id){
                                console.log('match')
                                matchedCounter++
                                randomizedEmojiArray.forEach((item)=>{
                                    if(item.emoji === clickHistory[0].emoji){
                                        item.matched = true
                                    }
                                })
                                clickHistory = []
                            }else{
                                console.log('no match')
                                clickHistory = []
                            }
                            randomizedEmojiArray.forEach((item)=>{
                                if(item.hidden === false && item.matched === false){
                                    item.hidden = true
                                }
                            })
                            moveCounter++
                            if (matchedCounter === 18){
                                endLoading = true
                                clearInterval(timerId)
                                clearInterval(revealID)
                                let request = await fetch("/memory-card",{
                                    method: "POST",
                                    body: JSON.stringify({
                                        player: Number(userProfile?.id),
                                        time: (time.minutes < 10 ? '0' + time.minutes : time.minutes) + ":" + (time.seconds < 10 ? '0' + time.seconds : time.seconds),
                                        score: scoreCalculation().toFixed(2),
                                        mps: calculateMPS().toFixed(2)
                                    })
                                })
                                let res = await request.json();
                                if(res.isHighScore == true){
                                    highScoreChecker = true;
                                }else{
                                    highScoreChecker = false;
                                }
                                endLoading = false
                                showEndModal = true
                            }
                        }
                    }
                }}>
                    {#if item.hidden === false}
                     <img src={item.emoji} alt="">
                    {:else}
                    <MemoryCardBack />
                    {/if}
                </div>
                {/each}
            {/if}
            </div>
            {#if display}
            <p transition:slide={{duration:300,easing:cubicIn,axis:"y"}}>{getRandomRevealTextOption()}</p>
            {/if}
        </div>
        {:else if !showEndModal && !start}
        <div class="flex flex-col space-y-6 items-center justify-center mx-8 lg:mx-0 w-full h-[32rem]">
            <script src="https://cdn.lordicon.com/lordicon.js"></script>
            <lord-icon
                src="https://cdn.lordicon.com/jsmqucas.json"
                trigger="in"
                stroke="regular"
                state="pinch"
                colors="primary:#ffffff,secondary:#ffffff"
                style="width:250px;height:250px">
            </lord-icon>
            <h1 class="text-3xl font-bold text-center">Memory Cards</h1>
            <p class="text-center text-sm max-w-md">How good is your memory? Let's find out! <br> Click on the cards to reveal the emoji, if two identical emojis are clicked in a row then you've found a match!. Match all the cards to win the game.</p>
            <div class="flex space-x-2 items-center">
                <button class="btn morningGreen solid !h-[48px]" on:click={()=>{
                    start = true;
                    displayCardsForThreeSeconds()
                    setTimeout(()=>{
                        timer()
                    }, 3000)
                    }}>Start Game
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                      </svg>
                      
                </button>
                <div class="dropdown morningGreen">
                    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="btn richBlack light !h-[48px]" tabindex="0">
                        {#each emojiSets as set,index}
                            {#if chosenEmojiSet == index}
                                <img class="-ml-1 h-6 w-6" src={randomizedEmojiArray[0].emoji} alt=""> 
                            {/if}
                        {/each}
                        |
                        <ChevronDown class="mt-1 -mr-1"/>
                    </label>
                    <div class="menu top-right">
                     {#each emojiSets as set,index}
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        {#if index == 0}
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <a class="item text-sm" on:click={()=>{changeChosenEmojiSet(0)}}>Fruits</a>
                        {:else if index == 1}
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <a class="item text-sm" on:click={()=>{changeChosenEmojiSet(1)}}>Food & Drink</a>
                        {:else if index == 2}
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <a class="item text-sm" on:click={()=>{changeChosenEmojiSet(2)}}>Random Stuff</a>
                        {/if}
                     {/each}
                     
                    </div>
                  </div>
            </div>
            
        </div>
        {:else if showEndModal}
        <div class="flex h-[32rem] w-full justify-center items-center">
            <div class="flex flex-col h-full space-y-8 items-center justify-center rounded-sm w-full max-w-md" in:fly={{duration:300, y:150,opacity:0}}>
                <h2 class="text-5xl text-center font-semibold">Board Complete</h2>
                {#if highScoreChecker}
                <div class="flex max-w-xs text-center">
                    <p>Check the
                    <span class="animate-pulse w-fit font-bold from-[#6366F1] via-[#D946EF] to-[#FB7185] bg-gradient-to-r bg-clip-text text-transparent">LeaderBoard</span>
                    your name might be up there! 🎉</p>
                </div>
                {/if}
                <div class=" w-full h-[16rem] aspect-square grid grid-cols-2 gap-3 text-white">
                <div class="col-span-1   rounded-md shadow-sm flex flex-col justify-center items-center">
                    <Timer size="40" />
                    <p class="text-3xl">{time.minutes < 10 ? '0' + time.minutes : time.minutes}:{time.seconds < 10 ? '0' + time.seconds : time.seconds}</p>
                </div>
                <div class="col-span-1  rounded-md flex flex-col justify-center items-center">
                    <p class="text-2xl font-semibold">Moves</p>
                    <p class="text-4xl">{moveCounter}</p>
                </div>
                <div class="col-span-1  rounded-md flex flex-col justify-center items-center">
                    <div class="text-3xl flex flex-col font-semibold text-center [&>*]:m-0"><p>MPS</p> <p class="text-xs">[matches per second]</p></div>
                    <p class="text-4xl">{calculateMPS().toFixed(2)}</p>
                </div>
                <div class="col-span-1  rounded-md flex flex-col justify-center items-center">
                    <p class="text-3xl font-semibold text-center">Score</p>
                    <p class="text-4xl">{scoreCalculation().toFixed(2)}</p>
                </div>
                </div>
                <div class="flex w-full justify-center">
                <button class="btn light morningGreen w-full max-w-xs" on:click={()=>{
                    showEndModal = false
                    endGame()
                    start = false
                    }}>Play Again
                    <Play size="20" />
                    </button>
                </div>
            </div>
        </div>
        {/if}
</section>
