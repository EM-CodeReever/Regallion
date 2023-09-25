<script>
    import { goto } from "$app/navigation";

</script>
<svelte:head>
    <title>Home</title>
</svelte:head>
<section class="w-full wave-red text-white" style="height: 65rem;" data-theme="">


<div class="flex space-y-8 justify-center items-center flex-col h-full">
    <h1 class="font-bold text-5xl rounded-lg ">Continue Scrolling Down!</h1>
    <p class="max-w-lg text-center text-white">Been playing around with these SVG Backgrounds courtesy of Haikei. <br> <br> I've been using them for my personal projects and I thought I'd share them with you guys. <br> <br> I hope you guys like it! 😁</p>
    <span class="flex space-x-3">
        <button class="btn sunsetFire solid lg" on:click={()=>{goto('register')}}>Create an account</button>
        <button class="btn  bw underline lg" on:click={()=>{goto('login')}}>Log in</button>
    </span>
</div>
</section>

<section class="w-full flex justify-center items-center bg-[#001220]" style="height: 30rem;" data-theme="custom">
<p class="text-3xl text-gray-200 font-bold"> "This is the dark part of the homepage 😎" <br> - <span class="italic text-xl">Elliot Morrison</span></p>
</section>
<section class="w-full wave-yellow flex justify-center items-center" style="height: 60rem;" data-theme="custom">
  <p class="text-3xl font-bold"> "I am SERIOUSLY addicted Haikei backgrounds! 🤩" <br> - <span class="italic text-xl">Elliot Morrison</span></p>

</section>
<section class="w-full flex justify-center items-center bg-[#c4c4c4]" style="height: 30rem;" data-theme="custom">
  <p class="text-3xl text-gray-800 font-bold"> "This is the Light part of the homepage 😁" <br> - <span class="italic text-xl">Elliot Morrison</span></p>
  </section>
<section class="w-full wave-blue flex justify-center items-end p-10" style="height: 60rem;" data-theme="custom">
  <p class="text-3xl text-gray-200 font-bold"> "This is the end of our awesome, fabulous, amazing color journey 😢" <br> - <span class="italic text-xl">Elliot Morrison</span></p>

</section>