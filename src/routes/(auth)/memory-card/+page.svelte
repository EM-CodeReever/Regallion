<script lang="ts">
    import MemoryCardBack from '$components/MemoryCardBack.svelte';
    import { fade, fly } from 'svelte/transition';
    import type { PageData } from './$types';
    import {fruitEmojiObject} from './util'
  import { EyeOff, Play, Timer, View } from 'lucide-svelte';

    let clickHistory = <any>[];
    let hidden = true;
    let display = false;
    let start = false;
    let moveCounter = 0;
    let matchedCounter = 0;
    let showEndModal = false;
    let revealAvailable = false;
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
    
    let randomFruitEmojiObject = shuffleArray(fruitEmojiObject)
    export let data: PageData;
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
        randomFruitEmojiObject = shuffleArray(fruitEmojiObject)
        randomFruitEmojiObject.forEach((fruit)=>{
            fruit.hidden = true
            fruit.matched = false
        })

    }
    function scoreCalculation(){
        let score = 0
        if(time.minutes < 2){
            score = 1000 - ((moveCounter - 18) * 10)
        }else{
            score = 999 - ((moveCounter - 18) * 10)
        }
        return score
    }

    function calculateMPS(){
        let mps = 0
        if(time.minutes > 0){
            mps = matchedCounter / (time.minutes * 60 + time.seconds)
        }else{
            mps = matchedCounter / time.seconds
        }
        return mps.toFixed(2)
    }

</script>

<svelte:head>
    <title>Memory Cards</title>
</svelte:head>
<section class="w-full h-fit flex select-none">

        
        {#if start}
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
            <div class="aspect-square w-full sm:w-[30rem] bg-[#8d99ae] rounded-md grid grid-cols-6 grid-rows-6 gap-1 lg:gap-3 p-3">
                {#if display}
                {#each randomFruitEmojiObject as fruit}
                <div class="w-full text-3xl h-full bg-gray-900 rounded-md cursor-pointer hover:bg-gray-700 hover:border-gray-200 hover:border-2 flex justify-center items-center" in:fade|global={{duration:300}}>
                    <p>{fruit.emoji}</p>
                </div>
                {/each}
                {:else}
                {#each randomFruitEmojiObject as fruit}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div in:fade|global={{duration:1000}} class="w-full text-3xl h-full bg-gray-900 rounded-md cursor-pointer hover:bg-gray-700 hover:border-gray-200 hover:border-2 flex justify-center items-center" on:click={()=>{
                    if(fruit.matched === false){
                        fruit.hidden = !fruit.hidden
                        console.log(fruit)
                        clickHistory.push(fruit)
                        if(clickHistory.length === 2){
                            if(clickHistory[0].emoji === clickHistory[1].emoji && clickHistory[0].id !== clickHistory[1].id){
                                console.log('match')
                                matchedCounter++
                                randomFruitEmojiObject.forEach((fruit)=>{
                                    if(fruit.emoji === clickHistory[0].emoji){
                                        fruit.matched = true
                                    }
                                })
                                clickHistory = []
                            }else{
                                console.log('no match')
                                clickHistory = []
                            }
                            randomFruitEmojiObject.forEach((fruit)=>{
                                if(fruit.hidden === false && fruit.matched === false){
                                    fruit.hidden = true
                                }
                            })
                            moveCounter++
                            if (matchedCounter === 18){
                                clearInterval(timerId)
                                clearInterval(revealID)
                                showEndModal = true
                            }
                        }
                    }
                }}>
                    {#if fruit.hidden === false}
                    <p>{fruit.emoji}</p>
                    {:else}
                    <MemoryCardBack />
                    {/if}
                </div>
                {/each}
            {/if}
            </div>
            
        </div>
        {:else}
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
            <p class="text-center text-sm">How good is your memory? Let's find out! <br> Click on the cards to reveal the emoji, if two identical emojis are clicked in a row then you've found a match!. Match all the cards to win the game.</p>
            <button class="btn morningGreen solid lg" on:click={()=>{
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
        </div>
        {/if}
</section>

<div>
    <!-- <label class="btn success solid">Open modal</label> -->
    <!-- remove `modal-overlay` element will make modal opened without overlay -->
    <label class="modal-overlay"></label>
    <!-- show class here will make modal visible -->
    {#if showEndModal}
    <div class="modal show flex flex-col bg-oxfordBlue-400 space-y-8 items-center w-full max-w-sm" transition:fly={{duration:800, y:150,opacity:0}}>
      <!-- <button class="absolute right-4 top-3">✕</button> -->
      <h2 class="text-5xl text-center font-semibold">Board Complete</h2>
      <div class=" w-[18rem] aspect-square grid grid-cols-2 gap-4 text-black">
        <div class="col-span-1 aspect-square bg-morningGreen-800 rounded-xl flex flex-col justify-center items-center">
            <Timer size="60" />
            <p class="text-3xl">{time.minutes < 10 ? '0' + time.minutes : time.minutes}:{time.seconds < 10 ? '0' + time.seconds : time.seconds}</p>
        </div>
        <div class="col-span-1 aspect-square bg-morningGreen-800 rounded-xl flex flex-col justify-center items-center">
            <p class="text-3xl font-semibold">Moves</p>
            <p class="text-4xl">{moveCounter}</p>
        </div>
        <div class="col-span-1 aspect-square bg-morningGreen-800 rounded-xl flex flex-col justify-center items-center">
            <div class="text-3xl flex flex-col font-semibold text-center [&>*]:m-0"><p>MPS</p> <p class="text-xs">[matches per second]</p></div>
            <p class="text-4xl">{calculateMPS()}</p>
        </div>
        <div class="col-span-1 aspect-square bg-morningGreen-800 rounded-xl flex flex-col justify-center items-center">
            <p class="text-3xl font-semibold text-center">Score</p>
            <p class="text-4xl">{scoreCalculation()}</p>
        </div>
        <!-- <div class="flex justify-between">
            <p>Time</p>
            <p>{time.minutes < 10 ? '0' + time.minutes : time.minutes}:{time.seconds < 10 ? '0' + time.seconds : time.seconds}</p>
        </div>
        <div class="flex justify-between">
            <p>Moves</p>
            <p>{moveCounter}</p>
        </div>
        <div class="flex justify-between text-xl" >
            <p >Score</p>
            <p>{scoreCalculation()}</p>
        </div> -->
      </div>
      <div class="flex gap-3 w-full">
        <button class="btn light morningGreen w-full" on:click={()=>{
            showEndModal = false
            endGame()
            start = false
            }}>Play Again
            <Play size="20" />
            </button>
      </div>
    </div>
    {/if}
  </div>