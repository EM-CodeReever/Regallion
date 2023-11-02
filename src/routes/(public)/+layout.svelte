<script>
    import { goto } from "$app/navigation";
    import "$styles";
  </script>
  

  <nav class="blur-bg fixed w-full top-0 bg-oxfordBlue-300 px-3 flex justify-center h-20 z-50" >
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
            <button class="btn solid orangeWeb" on:click={()=>{goto('dashboard')}}>Open App</button>
        </div>
        <div class="flex justify-center items-center lg:hidden">
            
            <div class="dropdown bw">
                <button class="btn ghost bw">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>                  
                </button>
                <div class="menu bottom-left" style="width: 10rem; z-index: 999;">
                    <a href="/" class="item text-sm flex space-x-3 items-center" tabindex="-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                          </svg>                          
                        Home
                    </a>
                    <a href="/about" class="item text-sm flex space-x-3 items-center" tabindex="-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                          </svg>                          
                        About
                    </a>
                    <a href="/contact" class="item text-sm flex space-x-3 items-center" tabindex="-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                          </svg>
                        Contact
                    </a>
                    <!-- for mobile... i repeat FOR MOBILE.... ELLIOT THIS BUTTON IS ONLY SEEN ON MOBILE -->
                    <button class="btn sm solid oxfordBlue w-full" on:click={()=>{goto('dashboard')}}>open app</button>
                  </div>
                </div>
        </div>
    </div>
</nav>
  <slot />

