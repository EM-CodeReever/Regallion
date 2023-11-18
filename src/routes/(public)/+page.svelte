<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { fly, blur, fade } from "svelte/transition";
  import { inview } from "svelte-inview";
  import type {
    ObserverEventDetails,
    ScrollDirection,
    Options,
  } from "svelte-inview";
    import Svelte from "$components/svg/Svelte.svelte";
    import Tailwind from "$components/svg/Tailwind.svelte";
    import Typescript from "$components/svg/Typescript.svelte";
    import Supabase from "$components/svg/Supabase.svelte";
    import Haikei from "$components/svg/Haikei.svelte";
    import SiraUi from "$components/svg/SiraUI.svelte";
    import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
    import '@splidejs/splide/dist/css/themes/splide-default.min.css';

  let sectionOneINVIEW = false;
  let sectionTwoINVIEW = false;

  let fruitEmojiArray = ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌽', '🥕']

  let show = false;
  onMount(() => {
    show = true;
  });

  const options: Options = {
    rootMargin: "-20%",
    unobserveOnEnter: true,
  };
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>
<section class="w-full dusk-waves text-gray-200 h-screen">
  {#if show}
    <div
      class="flex space-y-8 justify-center items-center flex-col h-full"
      in:fly={{ duration: 1000, y: 100, opacity: 0.3, easing: cubicOut }}
    >
      <h1 class="font-bold xl:text-5xl xs:text-3xl text-2xl">
        Continue Scrolling Down!
      </h1>
      <p class="px-5 max-w-lg text-center text-sm lg:text-base">
        "Adversity reveals the true character of a person, for it is in facing
        life's challenges with courage, wisdom, and resilience that we truly
        find our inner strength and virtue. Embrace hardship as an opportunity
        to grow and learn, for it is through adversity that we become the
        masters of our own destiny." - Epictetus
      </p>
      <span
        class="flex space-x-3"
        in:fade={{ duration: 800, easing: cubicOut, delay: 500 }}
      >
        <button
          class="btn bw solid lg:lg"
          on:click={() => {
            goto("register");
          }}>Create an account</button
        >
        <button
          class="btn orangeWeb solid lg:lg"
          on:click={() => {
            goto("login");
          }}>Log in</button
        >
      </span>
    </div>
  {/if}
</section>

<section
  use:inview={options}
  on:inview_change={({ detail }) => {
    sectionOneINVIEW = detail.inView;
  }}
  class="w-full flex flex-col space-y-5 justify-center items-center bg-[#B76D68] text-gray-900"
  style="height: 30rem;"
  data-theme="custom"
>
  {#if sectionOneINVIEW}
    <p
      in:fly={{ duration: 1000, y: 500, opacity: 0.3, easing: cubicOut }}
      class="lg:text-4xl text-2xl px-5 font-bold text-center"
    >
      Regallion Project Showcase
    </p>
    <Splide options={ {
      rewind  : true,
      pauseOnHover: false,
      gap     : '1rem',
      autoplay: true,
      arrows  : false,
      height  : '22rem',
      // width   : '100%',

    } } hasTrack={ false } class="bg-indieRed-900 rounded-lg p-1 w-full max-w-4xl m-5">
      <div style="position: relative">
        <SplideTrack >
            <SplideSlide class="flex justify-center items-center space-x-5 p-3">
                <span class="flex flex-col space-y-2">
                  <p class="text-2xl font-bold">Ping-Pong</p>
                  <p class="text-sm max-w-sm">Simple Ping pong game, built using HTML Canvas. Grab a paddle and hit the ball back and forth until it scores. Doesn't work on mobile  </p>
                  <button class="btn sm bw light ml-auto sm:m-0">Check it out</button>
                </span>
                <div class="rounded-lg w-96 h-72 bg-gray-900 aspect-video sm:flex hidden relative justify-center">
                  <span class="text-3xl mt-3 font-bold text-indieRed-900">0 - 0</span>
                  <span class="w-4 rounded-md h-24 bg-indieRed-900 absolute left-3 bottom-5"></span>
                  <div class="w-4 h-4 bg-indieRed-900 rounded-full absolute top-1/2 right-1/2"></div>
                  <span class="w-4 rounded-md h-24 bg-indieRed-900 absolute right-3 top-5"></span>
                </div>
            </SplideSlide>
            <SplideSlide class="flex justify-center items-center space-x-5 p-3">
              <span class="flex flex-col space-y-2">
                <p class="text-2xl font-bold">Memory card</p>
                <p class="text-sm max-w-sm"> Memory cards is a game of cards, that can be flipped over and matched. If a match is found, the cards stay flipped, if not, they will turn back. The game continues until all cards are flipped.</p>
                <button class="btn sm bw light ml-auto sm:m-0">Check it out</button>
              </span>
              <div class="rounded-lg w-96 h-72 aspect-video sm:flex justify-center hidden p-3">
                <div class="aspect-square w-72  max-w-sm border-2 border-gray-900 rounded-md grid grid-cols-5 grid-rows-5 gap-3 p-3">
                  {#each Array(25) as _, i}
                  <div class="w-full h-full bg-gray-900 rounded-md cursor-pointer hover:bg-gray-700 hover:border-gray-200 hover:border-2 flex justify-center items-center">
                      <p>{fruitEmojiArray[Math.floor(Math.random()*fruitEmojiArray.length)]}</p>
                  </div>
                  {/each}
              </div>
              </div>
          </SplideSlide>
          <SplideSlide class="flex justify-center items-center space-x-5 p-3">
            <span class="flex flex-col space-y-2">
              <p class="text-2xl font-bold">Regpost</p>
              <p class="text-sm max-w-sm">A basic social media platform for posting, and communicating with other users. Has all the typical social stuff, user profiles, posts and</p>
              <button class="btn sm bw light ml-auto sm:m-0">Check it out</button>
            </span>
            <div class="rounded-lg w-96 h-72 bg-gray-900 aspect-video sm:flex flex-col hidden">
              <div class="flex justify-between items-center px-4 w-full p-3">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#B76D68" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg> 
               </div>
                <div class="w-24 h-6 bg-indieRed-900 rounded-md "></div>
                <div class="avatar bg-indieRed-900"></div>
              </div>
              <div class="w-full h-full bg-indieRed-900 border-2 border-gray-900 rounded-b-lg relative">
                <div class="w-36 h-6 rounded-xl absolute right-4 top-5 bg-gray-900"></div>
                <div class="w-20 h-6 rounded-xl absolute left-4 top-11 bg-gray-900"></div>
                <div class="w-40 h-6 rounded-xl absolute left-4 top-20 bg-gray-900"></div>
                <div class="flex justify-center items-center w-24 h-24 rounded-xl absolute right-4 top-24 bg-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#B76D68" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>                  
                </div>
              </div>
            </div>
        </SplideSlide>
        </SplideTrack>
      </div>
  
      <div class="splide__progress mt-3">
        <div class="splide__progress__bar">
        </div>
      </div>
    </Splide>

    
    
    
  {/if}
</section>

<section
  use:inview={options}
  on:inview_change={({ detail }) => {
    sectionTwoINVIEW = detail.inView;
  }}
  class="w-full dusk-waves-inverse flex flex-col space-y-10 justify-center items-center relative"
  style="height: 60rem;"
  data-theme="custom"
>
  {#if sectionTwoINVIEW}
    <p
      in:fly={{ duration: 2000, y: 100, opacity: 0.3, easing: cubicOut }}
      class="lg:text-3xl text-lg px-5 font-bold text-center "
    >
      Tools used to build this website
    </p>
    <p
      in:fly={{ duration: 2000, y: 100, opacity: 0.3, easing: cubicOut }}
      class="text-gray-200 max-w-3xl text-center mx-3"
    >
     Svelte is cool, Tailwind is super-cool, Typescript is cool, Supabase is cool, but I will always say haikei is a slept on background design tool. Sira UI is cool too, a bit weird to use but cool.

    </p>
    <div class="md:flex md:justify-between gap-y-5 xs:gap-y-10 grid grid-rows-2 grid-cols-3 w-full max-w-3xl">
      <!-- svelte logo -->
      <div class="md:hover:scale-125 duration-100 flex justify-center items-center cursor-pointer" in:fly={{duration:800,opacity:0,y:200,easing:cubicOut}}>
        <Svelte />
      </div>
      <!-- tailwind logo -->
      <div class="md:hover:scale-125 duration-100 flex justify-center items-center cursor-pointer"  in:fly={{duration:800,opacity:0,y:200,easing:cubicOut,delay:100}}>
        <Tailwind />
      </div>
      <!-- typeScript logo -->
      <div class="md:hover:scale-125 duration-100 flex justify-center items-center cursor-pointer" in:fly={{duration:800,opacity:0,y:200,easing:cubicOut,delay:200}}>
        <Typescript />
      </div>
      <!-- supabase logo -->
      <div class="md:hover:scale-125 duration-100 flex justify-center items-center cursor-pointer" in:fly={{duration:800,opacity:0,y:200,easing:cubicOut,delay:300}}>
        <Supabase />
      </div>
      <!-- haikei logo -->
      <div class="md:hover:scale-125 duration-100 flex justify-center items-center cursor-pointer" in:fly={{duration:800,opacity:0,y:200,easing:cubicOut,delay:400}}>
        <Haikei />
      </div>
      <!-- Sira ui logo -->
      <div class="md:hover:scale-125 duration-100 flex justify-center items-center cursor-pointer" in:fly={{duration:800,opacity:0,y:200,easing:cubicOut,delay:500}}>
        <SiraUi />
      </div>
    </div>
  {/if}
</section>

<style>
  .splide__progress__bar{
    background-color: #000;
  }
</style>