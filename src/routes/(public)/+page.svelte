<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { cubicOut } from "svelte/easing";
    import { fly, blur } from "svelte/transition";
    import { inview } from 'svelte-inview';
    import type { ObserverEventDetails, ScrollDirection, Options } from 'svelte-inview';

    let sectionOneINVIEW = false;
    let sectionTwoINVIEW = false;
    let sectionThreeINVIEW = false;
    let sectionFourINVIEW = false;

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
<section class="w-full wave-red text-gray-200" style="height: 50rem;">

{#if show}
<div class="flex space-y-8 justify-center items-center flex-col h-full" in:fly={{duration:1000,y:500,opacity:.3,easing:cubicOut}}>
    <h1 class="font-bold xl:text-5xl text-3xl">Continue Scrolling Down!</h1>
    <p class="px-5 max-w-lg text-center text-sm lg:text-base">"Adversity reveals the true character of a person, for it is in facing life's challenges with courage, wisdom, and resilience that we truly find our inner strength and virtue. Embrace hardship as an opportunity to grow and learn, for it is through adversity that we become the masters of our own destiny." - Epictetus</p>
    <span class="flex space-x-3">
        <button class="btn sunsetFire solid lg:lg" on:click={()=>{goto('register')}}>Create an account</button>
        <button class="btn light bw lg:lg" on:click={()=>{goto('login')}}>Log in</button>
    </span>
</div>
{/if}
</section>


<section use:inview={options} on:inview_change={({detail})=>{sectionOneINVIEW = detail.inView}} class="w-full flex justify-center items-center bg-[#001220]" style="height: 30rem;" data-theme="custom"  >
  {#if sectionOneINVIEW}
<p in:fly={{duration:2000,y:500,opacity:.3,easing:cubicOut}} class="lg:text-3xl text-lg px-5 text-gray-200 font-bold text-center"> "On-scroll animations using svelte-inview and svelte transistions 😎" <br> - <span class="italic text-sm lg:text-xl">Elliot Morrison</span></p>
{/if}
</section>


<section use:inview={options} on:inview_change={({detail})=>{sectionTwoINVIEW = detail.inView}} class="w-full wave-yellow flex justify-center items-center" style="height: 60rem;" data-theme="custom">
  {#if sectionTwoINVIEW}
  <p in:fly={{duration:2000,x:-500,opacity:.3,easing:cubicOut}} class="lg:text-3xl text-lg px-5 font-bold text-center"> "Beautiful seemlessly blended backgrounds courtesy of Haikei 🤩" <br> - <span class="italic text-sm lg:text-xl">Elliot Morrison</span></p>
  {/if}
</section>
<section use:inview={options} on:inview_change={({detail})=>{sectionThreeINVIEW = detail.inView}} class="w-full flex justify-center items-center bg-[#c4c4c4]" style="height: 30rem;" data-theme="custom">
  {#if sectionThreeINVIEW}
  <p in:blur={{ amount: 10, duration: 1000}} class="lg:text-3xl text-lg px-5 text-gray-800 font-bold text-center"> "This is the Light part of the homepage 😁" <br> - <span class="italic text-sm lg:text-xl">Elliot Morrison</span></p>
  {/if}
  </section>
<section use:inview={{rootMargin: '0px',unobserveOnEnter: true}} on:inview_change={({detail})=>{sectionFourINVIEW = detail.inView}} class="w-full wave-blue flex justify-center items-end p-10" style="height: 60rem;" data-theme="custom">
  {#if sectionFourINVIEW}
  <p in:fly={{duration:2000,y:-500,opacity:.3,easing:cubicOut}} class="lg:text-3xl text-lg px-5 text-gray-200 font-bold text-center"> "This is the end of our awesome, fabulous, amazing color journey 😢" <br> - <span class="italic text-sm lg:text-xl">Elliot Morrison</span></p>
  {/if}

</section>

