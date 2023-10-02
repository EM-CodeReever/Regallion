<script>
    import { goto } from "$app/navigation";

</script>
<svelte:head>
    <title>Home</title>
</svelte:head>
<section class="w-full wave-red  text-white" style="height: 65rem;">


<div class="flex space-y-8 justify-center items-center flex-col h-full">
    <h1 class="font-bold xl:text-5xl text-2xl">Continue Scrolling Down!</h1>
    <p class="px-5 max-w-lg text-center text-sm lg:text-base text-white">Been playing around with these SVG Backgrounds courtesy of Haikei. <br> <br> I've been using them for my personal projects and I thought I'd share them with you guys. <br> <br> I hope you guys like it! 😁</p>
    <span class="flex space-x-3">
        <button class="btn sunsetFire solid lg:lg" on:click={()=>{goto('register')}}>Create an account</button>
        <button class="btn  bw underline lg:lg" on:click={()=>{goto('login')}}>Log in</button>
    </span>
</div>
</section>

<section class="w-full flex justify-center items-center bg-[#001220]" style="height: 30rem;" data-theme="custom">
<p class="lg:text-3xl text-lg px-5 text-gray-200 font-bold text-center"> "This is the dark part of the homepage 😎" <br> - <span class="italic text-sm lg:text-xl">Elliot Morrison</span></p>
</section>
<section class="w-full wave-yellow flex justify-center items-center" style="height: 60rem;" data-theme="custom">
  <p class="lg:text-3xl text-lg px-5 font-bold text-center"> "I am SERIOUSLY addicted Haikei backgrounds! 🤩" <br> - <span class="italic text-sm lg:text-xl">Elliot Morrison</span></p>

</section>
<section class="w-full flex justify-center items-center bg-[#c4c4c4]" style="height: 30rem;" data-theme="custom">
  <p class="lg:text-3xl text-lg px-5 text-gray-800 font-bold text-center"> "This is the Light part of the homepage 😁" <br> - <span class="italic text-sm lg:text-xl">Elliot Morrison</span></p>
  </section>
<section class="w-full wave-blue flex justify-center items-end p-10" style="height: 60rem;" data-theme="custom">
  <p class="lg:text-3xl text-lg px-5 text-gray-200 font-bold text-center"> "This is the end of our awesome, fabulous, amazing color journey 😢" <br> - <span class="italic text-sm lg:text-xl">Elliot Morrison</span></p>

</section>