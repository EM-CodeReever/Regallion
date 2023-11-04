<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { cubicOut } from "svelte/easing";
    import { fly, blur } from "svelte/transition";
    import { inview } from 'svelte-inview';
    import type { ObserverEventDetails, ScrollDirection, Options } from 'svelte-inview';

    let sectionOneINVIEW = false;
    let sectionTwoINVIEW = false;

    let show = false;
    onMount(() => {
      show = true;
    });

    const options: Options = {
      rootMargin: '-20%',
      unobserveOnEnter: true,
    };

</script>
<svelte:head>
    <title>Home</title>
</svelte:head>
<section class="w-full dusk-waves text-gray-200 h-screen">

{#if show}
<div class="flex  space-y-8  justify-center items-center flex-col h-full" in:fly={{duration:1000,y:500,opacity:.3,easing:cubicOut}}>
    <h1 class="font-bold xl:text-5xl xs:text-3xl text-2xl">Continue Scrolling Down!</h1>
    <p class="px-5 max-w-lg text-center text-sm lg:text-base">"Adversity reveals the true character of a person, for it is in facing life's challenges with courage, wisdom, and resilience that we truly find our inner strength and virtue. Embrace hardship as an opportunity to grow and learn, for it is through adversity that we become the masters of our own destiny." - Epictetus</p>
    <span class="flex space-x-3">
        <button class="btn bw solid lg:lg" on:click={()=>{goto('register')}}>Create an account</button>
        <button class="btn orangeWeb solid lg:lg" on:click={()=>{goto('login')}}>Log in</button>
    </span>
</div>
{/if}
</section>


<section use:inview={options} on:inview_change={({detail})=>{sectionOneINVIEW = detail.inView}} class="w-full flex flex-col space-y-5 justify-center items-center bg-[#B76D68]" style="height: 30rem;" data-theme="custom"  >
  {#if sectionOneINVIEW}
<p in:fly={{duration:1000,y:500,opacity:.3,easing:cubicOut}} class="lg:text-3xl text-lg px-5 text-gray-900 font-bold text-center"> "On-scroll animations using svelte-inview and svelte transistions 😎" <br> - <span class="italic text-sm lg:text-xl">Elliot Morrison</span></p>
<p in:fly={{duration:1000,y:200,opacity:0,easing:cubicOut,delay:500}} class="text-gray-900 max-w-3xl text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga praesentium quisquam optio eaque eveniet sunt dignissimos, esse suscipit eum labore culpa consectetur repellat obcaecati explicabo officiis eligendi tenetur distinctio ad! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum ab mollitia laborum molestias, quam, animi fugiat eligendi est, id asperiores rem harum. Itaque necessitatibus aliquam cumque quae, eaque vitae laboriosam.</p>

{/if}
</section>


<section use:inview={options} on:inview_change={({detail})=>{sectionTwoINVIEW = detail.inView}} class="w-full dusk-waves-inverse flex flex-col space-y-5 justify-center items-center relative" style="height: 80rem;" data-theme="custom">
  {#if sectionTwoINVIEW}
  <p in:fly={{duration:2000,x:-500,opacity:.3,easing:cubicOut}} class="lg:text-3xl text-lg px-5 font-bold text-center"> "Beautiful seemlessly blended backgrounds courtesy of Haikei 🤩" <br> - <span class="italic text-sm lg:text-xl">Elliot Morrison</span></p>
  <p in:fly={{duration:2000,x:500,opacity:.3,easing:cubicOut}} class="text-gray-200 max-w-3xl text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga praesentium quisquam optio eaque eveniet sunt dignissimos, esse suscipit eum labore culpa consectetur repellat obcaecati explicabo officiis eligendi tenetur distinctio ad! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum ab mollitia laborum molestias, quam, animi fugiat eligendi est, id asperiores rem harum. Itaque necessitatibus aliquam cumque quae, eaque vitae laboriosam.</p>
  <p in:blur={{ amount: 10, duration: 1000, delay:1000}} class="lg:text-3xl absolute bottom-14 text-lg px-5 text-gray-200 font-bold text-center"> "This is the end of the homepage 😁" <br> - <span class="italic text-sm lg:text-xl">Elliot Morrison</span></p>
  {/if}
</section>



