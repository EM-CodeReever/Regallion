<script lang="ts">
    import { goto } from '$app/navigation';
    import { fly } from 'svelte/transition';
    import type { PageData } from './$types';
    import { onMount } from 'svelte';
    
    export let data: PageData;
    let load = false;

    onMount(()=>{
        load = true;
    })
</script>

<svelte:head>
    <title>Authentication Success</title>
</svelte:head>


<section class="text-white flex justify-center items-center" style="height: calc(100vh - 5rem);">
    {#if load}
    <div in:fly={{duration:1000,y:250,opacity:.5}} class="w-full h-fit flex justify-center items-center space-y-5 flex-col">
        <h1 class="text-3xl sm:text-5xl text-center font-bold">Welcome to Crestfallen</h1>
        <p class="text-center">You have successfully authenticated</p>
        <button class="btn lg mx-auto solid grapePurple" on:click={()=>{goto('/dashboard')}}>Go To Dashboard</button>
    </div>
    {/if}
</section>
