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
  class="w-full flex flex-col space-y-5 justify-center items-center bg-[#B76D68]"
  style="height: 30rem;"
  data-theme="custom"
>
  {#if sectionOneINVIEW}
    <p
      in:fly={{ duration: 1000, y: 500, opacity: 0.3, easing: cubicOut }}
      class="lg:text-3xl text-lg px-5 text-gray-900 font-bold text-center"
    >
      Welcome to Regallion, have a look around
    </p>
    <Splide options={ {
      rewind  : true,
      pauseOnHover: false,
      gap     : '1rem',
      autoplay: true,
      arrows  : false,
      height  : '22rem',
      // width   : '100%',

    } } hasTrack={ false } class="bg-indieRed-900 rounded-lg p-5 w-full max-w-4xl m-5">
      <div style="position: relative">
        <SplideTrack >
            <SplideSlide class="flex justify-center items-center">
               <div class="bg-black h-full max-w-3xl w-full rounded"></div>
            </SplideSlide>
            <SplideSlide class="flex justify-center items-center">
              <div class="bg-black h-full max-w-3xl w-full rounded"></div>
           </SplideSlide>
           <SplideSlide class="flex justify-center items-center">
            <div class="bg-black h-full max-w-3xl w-full rounded"></div>
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
  class="w-full dusk-waves-inverse flex flex-col space-y-16 justify-center items-center relative"
  style="height: 60rem;"
  data-theme="custom"
>
  {#if sectionTwoINVIEW}
    <p
      in:fly={{ duration: 2000, y: -100, opacity: 0.3, easing: cubicOut }}
      class="lg:text-3xl text-lg px-5 font-bold text-center "
    >
      Tools used to build this website
    </p>
    <p
      in:fly={{ duration: 2000, y: -100, opacity: 0.3, easing: cubicOut }}
      class="text-gray-200 max-w-3xl text-center"
    >
     Svelte is cool, Tailwind is super-cool, Typescript is cool, Supabase is cool, but I will always say haikei is a slept on background design tool. Sira UI is cool too, a bit weird to use but cool.

    </p>
    <div class="md:flex md:justify-between gap-y-5 xs:gap-y-10 grid grid-rows-2 grid-cols-3 w-full max-w-3xl">
      <!-- svelte logo -->
      <div class="hover:scale-125 duration-100 flex justify-center items-center cursor-pointer" in:fly={{duration:800,opacity:.2,y:200,easing:cubicOut}}>
        <Svelte />
      </div>
      <!-- tailwind logo -->
      <div class="hover:scale-125 duration-100 flex justify-center items-center cursor-pointer"  in:fly={{duration:800,opacity:.2,y:200,easing:cubicOut,delay:100}}>
        <Tailwind />
      </div>
      <!-- typeScript logo -->
      <div class="hover:scale-125 duration-100 flex justify-center items-center cursor-pointer" in:fly={{duration:800,opacity:.2,y:200,easing:cubicOut,delay:200}}>
        <Typescript />
      </div>
      <!-- supabase logo -->
      <div class="hover:scale-125 duration-100 flex justify-center items-center cursor-pointer" in:fly={{duration:800,opacity:.2,y:200,easing:cubicOut,delay:300}}>
        <Supabase />
      </div>
      <!-- haikei logo -->
      <div class="hover:scale-125 duration-100 flex justify-center items-center cursor-pointer" in:fly={{duration:800,opacity:.2,y:200,easing:cubicOut,delay:400}}>
        <Haikei />
      </div>
      <!-- Sira ui logo -->
      <div class="hover:scale-125 duration-100 flex justify-center items-center cursor-pointer" in:fly={{duration:800,opacity:.2,y:200,easing:cubicOut,delay:500}}>
        <SiraUi />
      </div>
    </div>
    <p
      in:blur={{ amount: 10, duration: 1000, delay: 1000 }}
      class="lg:text-3xl absolute bottom-14 text-lg px-5 text-gray-200 font-bold text-center"
    >
      "This is the end of the homepage 😁" <br /> -
      <span class="italic text-sm lg:text-xl">Elliot Morrison</span>
    </p>
  {/if}
</section>
