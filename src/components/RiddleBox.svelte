<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

    let riddlePromise: Promise<any>;
    let showAnswer = false;
    let riddleObjet = {
        riddle: "",
        answer: ""
    }
    onMount(()=>{
        refreshRiddle();
    });
    
    function refreshRiddle(){
        riddlePromise = fetch('https://riddles-api.vercel.app/random').then(res => res.json()).then(data => {
            riddleObjet = data;
        });
        showAnswer = false;
    }
</script>

<div class="h-72 relative rounded-xl bg-[#8d99ae] w-full mr-5 lg:mr-0 p-5 flex flex-col justify-between text-gray-800" >
    <button class="btn rounded-full p-1 solid orangeWeb absolute top-4 right-4" on:click={()=>{
        refreshRiddle()
    }}>
        <svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.9381 13C19.979 12.6724 20 12.3387 20 12C20 7.58172 16.4183 4 12 4C9.49942 4 7.26681 5.14727 5.7998 6.94416M4.06189 11C4.02104 11.3276 4 11.6613 4 12C4 16.4183 7.58172 20 12 20C14.3894 20 16.5341 18.9525 18 17.2916M15 17H18V17.2916M5.7998 4V6.94416M5.7998 6.94416V6.99993L8.7998 7M18 20V17.2916" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
    </button>
    <span>
        <p class="text-2xl font-semibold">Guess a riddle</p>
        {#await riddlePromise}
        <div class="w-full h-fit flex justify-center items-center" style="max-height: 8rem;">
            <div class="loader richBlack light">
                <div class="spin w-6 h-6" />
            </div>
        </div>
        {:then riddlePromise} 
        <p class="text-sm my-3 h-fit overflow-y-auto" in:fade={{duration: 500}} style="max-height: 8rem;">
            {riddleObjet.riddle} 
        </p>
        {/await}
    </span>
    <div class="flex space-x-5 items-center">
        <button class="btn solid oxfordBlue" on:click={()=>{showAnswer = true}}>Answer</button>
        {#if showAnswer}
        <p class="text-sm">
            <b>{riddleObjet.answer}</b>
        </p>
        {/if}
    </div>
    
</div>