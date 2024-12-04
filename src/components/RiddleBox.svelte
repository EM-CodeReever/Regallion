<script lang="ts">
  import { RefreshCcw } from "lucide-svelte";
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

<div class="h-fit max-h-72 relative rounded-xl  w-full mr-5 lg:mr-0 p-5 flex flex-col justify-between text-gray-200" >
    <button class="btn rounded-full p-2 light morningGreen absolute top-4 right-4" on:click={()=>{
        refreshRiddle()
    }}>
    <RefreshCcw size="20" />
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
        <button class="btn light morningGreen" on:click={()=>{showAnswer = true}}>Answer</button>
        {#if showAnswer}
        <p class="text-sm">
            <b>{riddleObjet.answer}</b>
        </p>
        {/if}
    </div>
    
</div>