<script lang="ts">
    import MemoryCardBack from '$components/MemoryCardBack.svelte';
    import { fade, fly } from 'svelte/transition';
    import type { PageData } from './$types';
    import {fruitEmojiObject} from './util'

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

</script>

<svelte:head>
    <title>Memory Cards</title>
</svelte:head>
<section class="w-full dusk-waves-inverse min-h-screen h-fit flex justify-center items-center select-none">
    <div class="text-lg mx-auto text-center p-3 py-20 lg:pb-3 flex flex-col justify-center items-center space-y-4">
        <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-24 h-24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
          </svg>          
        Memory-Cards is in development</div> -->
        <h1 class="font-bold xl:text-4xl xs:text-3xl text-2xl">Memory Cards</h1>
        <p class="text-gray-200 max-w-xs text-sm text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga praesentium quisquam optio eaque eveniet sunt dignissimos.</p>
        <div class="flex justify-between w-80 sm:w-96">
            <div class="bg-orangeWeb-800 rounded-md flex justify-between items-center w-fit px-2 space-x-2 text-black font-semibold">
                
                <p class="text-xl">{matchedCounter}</p>
                <p class="text-sm">Matches</p>
            </div>
            <span class="flex space-x-3">
                <span class="text-sm text-center">
                    <p>{moveCounter} Moves</p>
                    <p>Time: {time.minutes < 10 ? '0' + time.minutes : time.minutes}:{time.seconds < 10 ? '0' + time.seconds : time.seconds}</p>
                </span>
            </span>
            <span>
                <!-- Reveal cards button -->
                <button disabled={!revealAvailable} class="btn orangeWeb solid" on:click={()=>{displayCardsForThreeSeconds()}}> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>                                  
                </button>
                <!-- options button -->
                <button class="btn orangeWeb solid">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                      </svg>                  
                </button>
            </span>
            
        </div>
        {#if start}
        <div class="aspect-square w-80 sm:w-96 max-w-sm bg-orangeWeb-800 rounded-md grid grid-cols-6 grid-rows-6 gap-1 lg:gap-3 p-3">
            {#if display}
            {#each randomFruitEmojiObject as fruit}
            <div class="w-full h-full bg-gray-900 rounded-md cursor-pointer hover:bg-gray-700 hover:border-gray-200 hover:border-2 flex justify-center items-center" in:fade|global={{duration:300}}>
                <p>{fruit.emoji}</p>
            </div>
            {/each}
            {:else}
            {#each randomFruitEmojiObject as fruit}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div in:fade|global={{duration:1000}} class="w-full h-full bg-gray-900 rounded-md cursor-pointer hover:bg-gray-700 hover:border-gray-200 hover:border-2 flex justify-center items-center" on:click={()=>{
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
        {:else}
        <div class="aspect-square w-80 sm:w-96 max-w-sm bg-orangeWeb-800 rounded-md flex justify-center items-center p-3">
            <button class="btn bw light lg" on:click={()=>{
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
    <div class="modal show flex flex-col bg-platinum-400 gap-5 w-full max-w-sm" transition:fly={{duration:800, y:150,opacity:0}}>
      <!-- <button class="absolute right-4 top-3">✕</button> -->
      <h2 class="text-3xl text-center">Round Complete</h2>
      <span class="flex flex-col justify-between py-10 h-44">
        <div class="flex justify-between">
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
        </div>
      </span>
      <div class="flex gap-3">
        <button class="btn solid orangeWeb w-full" on:click={()=>{
            showEndModal = false
            endGame()
            start = false
            }}>Play Again</button>
      </div>
    </div>
    {/if}
  </div>