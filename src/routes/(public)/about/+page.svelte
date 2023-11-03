<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    let showContent = false;
    onMount(() => {
        showContent = true;
    });


</script>
<svelte:head>
    <title>About</title>
</svelte:head>
<section class="dusk-waves min-h-screen h-fit flex flex-col items-center justify-center px-5 text-gray-800">
    {#if showContent}
    <div class="w-full max-w-2xl h-fit text-white" in:fly={{duration:1000,y:-400,opacity:0}}>
        <h1 class="text-4xl text-center font-bold mb-5">About Crestfallen</h1>
        <p class="text-center  px-5">
            Hi, my name is <b> Elliot Morrison👋</b> <br><br> I wanted to make a web-app with Sveltekit, where I could play around with it's features, UI libraries, design, and showcase some mini coding projects<br><br>... as well as other random ideas I'd want to implement. <br><br>This is the result of that desire. Looking to add more projects as time goes by. I hope you enjoy it.
        </p>
    </div>
    {/if}
</section>