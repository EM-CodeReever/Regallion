<script>
    import { goto } from "$app/navigation";
    import "$styles";
  import { AppWindow, Menu, House, Info, Mailbox } from "lucide-svelte";
  </script>
  
  <nav class=" fixed w-full top-0 bg-[#001220] px-3 flex justify-center h-20 z-50" >
    <div class="w-full max-w-6xl h-full flex justify-between">
        <div class="flex space-x-2 items-center pl-2 lg:p-0">
            <img src="/favicon.ico" alt="Regal logo" class="w-9 h-9">
            <a href="/" class=" font-extrabold text-2xl lg:text-2xl text-gray-200">Regallion</a>
        </div>
        <ul class="hidden lg:flex text-gray-200">
            <li class="h-full flex items-center px-5 duration-300 hover:text-morningGreen-800">
                <a href="/" class="font-bold">Home</a>
            </li>
            <li class="h-full flex items-center px-5 marker:duration-300 hover:text-morningGreen-800">
                <a href="/about" class="font-bold">About</a>
            </li>
            <li class="h-full flex items-center px-5 duration-300 hover:text-morningGreen-800">
                <a href="/contact" class="font-bold">Contact</a>
            </li>
        </ul>
        <div class="hidden lg:flex items-center">
            <button class="btn light morningGreen text-black" on:click={()=>{goto('dashboard')}}>
                <AppWindow size="20" />
                Open Application</button>
        </div>
        <div class="flex justify-center items-center lg:hidden">
            
            <div class="dropdown morningGreen">
                <button class="btn">
                    <Menu size="20" />                
                </button>
                <div class="menu bottom-left !mt-5" style="width: max-content; z-index: 999;">
                    <a href="/" class="item text flex space-x-5 justify-start items-center" tabindex="-1">
                        <House size="20" />
                        Home
                    </a>
                    <a href="/about" class="item text flex space-x-5 justify-start items-center" tabindex="-1">     
                        <Info size="20" />              
                        About
                    </a>
                    <a href="/contact" class="item flex space-x-5 justify-start items-center" tabindex="-1">
                        <Mailbox size="20" />
                        Contact
                    </a>
                    <!-- for mobile... i repeat FOR MOBILE.... ELLIOT THIS BUTTON IS ONLY SEEN ON MOBILE -->
                    <button class="btn light morningGreen text-black" on:click={()=>{goto('dashboard')}}>
                        <AppWindow size="20" />
                        Open Application</button>
                  </div>
                </div>
        </div>
    </div>
</nav>
  <slot />

<footer class="h-fit w-full bg-gunMetal-400 text-sm flex p-4 justify-between">
    
    <span>
        Regallion &copy; 2023
    </span>
    <!-- <span class="space-x-3">
        <a href="/about" class="link">About</a>
        <a href="/contact" class="link">Contact</a>
        <a href="/register" class="link">Signup</a>
    </span> -->
    <span>
        <a href="https://elliotmorrisonbusiness.com/" target="_blank" class="link text-sm text-gray-400">Elliot Morrison Business</a>
    </span>
    
    
</footer>