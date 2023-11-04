<script>
    import { goto } from "$app/navigation";
    import "$styles";
  </script>
  
  <!-- bg-[#14213D] -->
  <nav class=" fixed w-full top-0 bg-[#121420] px-3 flex justify-center h-20 z-50" >
    <div class="w-full max-w-6xl h-full flex justify-between">
        <div class="flex space-x-2 items-center pl-2 lg:p-0">
            <img src="/favicon.ico" alt="Regal logo" class="w-9 h-9">
            <a href="/" class=" font-extrabold text-2xl lg:text-2xl text-gray-200">Regallion</a>
        </div>
        <ul class="hidden lg:flex text-gray-200">
            <li class="h-full flex items-center px-5 duration-300 hover:text-[#FAC311]">
                <a href="/" class="font-bold">Home</a>
            </li>
            <li class="h-full flex items-center px-5 marker:duration-300 hover:text-[#FAC311]">
                <a href="/about" class="font-bold">About</a>
            </li>
            <li class="h-full flex items-center px-5 duration-300 hover:text-[#FAC311]">
                <a href="/contact" class="font-bold">Contact</a>
            </li>
        </ul>
        <div class="hidden lg:flex items-center">
            <button class="btn solid orangeWeb text-black" on:click={()=>{goto('dashboard')}}>Open App</button>
        </div>
        <div class="flex justify-center items-center lg:hidden">
            
            <div class="dropdown bw">
                <button class="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>                  
                </button>
                <div class="menu bottom-left" style="width: 10rem; z-index: 999;">
                    <a href="/" class="item text-sm flex space-x-3 justify-center items-center" tabindex="-1">
                        Home
                    </a>
                    <a href="/about" class="item text-sm flex space-x-3 justify-center items-center" tabindex="-1">                     
                        About
                    </a>
                    <a href="/contact" class="item text-sm flex space-x-3 justify-center items-center" tabindex="-1">
                        Contact
                    </a>
                    <!-- for mobile... i repeat FOR MOBILE.... ELLIOT THIS BUTTON IS ONLY SEEN ON MOBILE -->
                    <button class="btn sm solid orangeWeb w-full" on:click={()=>{goto('dashboard')}}>Open App</button>
                  </div>
                </div>
        </div>
    </div>
</nav>
  <slot />

