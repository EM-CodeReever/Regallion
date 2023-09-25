<script>
    import { goto } from "$app/navigation";
    import "$styles";
  </script>
  

  <nav class="blur-bg fixed w-full top-0 bg-[#ffffffc0] flex justify-center h-20">
    <div class="w-full max-w-6xl h-full flex justify-between">
        <div class="flex items-center underline">
            <a href="/" class="italic font-extrabold text-3xl text-gray-800">Crestfallen</a>
        </div>
        <ul class="flex text-gray-800">
            <li class="h-full flex items-center px-5 duration-300 hover:text-indigo-600">
                <a href="/" class="font-bold">Home</a>
            </li>
            <li class="h-full flex items-center px-5 marker:duration-300 hover:text-indigo-600">
                <a href="/about" class="font-bold">About</a>
            </li>
            <li class="h-full flex items-center px-5 duration-300 hover:text-indigo-600">
                <a href="/contact" class="font-bold">Contact</a>
            </li>
        </ul>
        <div class="flex items-center">
            <button class="btn light bw" on:click={()=>{goto('login')}}>Open App</button>
        </div>
    </div>
</nav>
  <slot />

