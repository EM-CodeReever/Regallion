<script lang="ts">
    import { goto } from "$app/navigation";
    export let data;
    let { session, supabase,userProfile } = data;
    $: ({ session, supabase,userProfile } = data);
    import "$styles";


    function toggleDrawer(name:string) {
      let element = document.getElementById(`drawer-${name}`);
      if (element?.classList.contains('show')) {
          element?.classList.remove('show');
      } else {
          element?.classList.add('show');
      }
    }

    function logOut(){
      supabase.auth.signOut();
      goto("/");
    }

  </script>

  <section class="flex flex-col">
    <nav class="blur-bg fixed px-3 w-full top-0 bg-[#ffffffc0] flex justify-between items-center h-20 z-50">
        <div class="flex justify-center items-center py-5 px-1 hover:bg-[#]">
            <button class="btn ghost bw" on:click={()=>{toggleDrawer('left')}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                  </svg> 
            </button>             
        </div>
        <div class="flex items-center underline">
            <a href="/" class="italic font-extrabold text-3xl text-gray-800">Crestfallen</a>
        </div>
        <div class="p-5">
            <div class="dropdown bw">
            <button class="avatar ring success" tabindex="0">
                <img alt="avatar" src="https://robohash.org/{userProfile?.username}" />
            </button>
            <div class="menu bottom-left" style="width: 20rem;">
                <p class="subtitle text-center">Signed in as: <span class="font-bold text-success-800">
                  {userProfile?.username}
                </span></p>
                <div class="is-divider" role="separator"></div>
                <button class="item text-sm btn" tabindex="-1" on:click={()=>{goto('dashboard')}}>Dashboard</button>
                <button class="item text-sm btn" tabindex="-1" on:click={()=>{goto('profile')}}>Profile</button>
                <button class="item text-sm btn" tabindex="-1">Account settings</button>
                <button class="item text-sm btn" tabindex="-1" on:click={()=>{logOut()}}>Logout</button>
              </div>
            </div>
        </div>
    </nav>
    <div class=" wave-purple h-fit w-full pt-20  flex justify-center items-center">
        <slot />
    </div>
  </section>

  
  <div data-theme="dark">
    <label class="drawer-overlay" on:click={()=>{toggleDrawer('left')}}></label>
    <div class="drawer left" id="drawer-left">
      <div class="content flex flex-col h-full">
        <label class="btn sm circle grapePurple solid absolute right-3 top-3" on:click={()=>{toggleDrawer('left')}}>✕</label>
        <h2 class="text-xl text-white">Pages</h2>
        <div class="is-divider" role="separator"></div>
        <div class="grid grid-cols-2 gap-8 grid-flow-row w-72 mt-10 mx-auto">
          <div class="btn ghost w-32 h-32 grapePurple rounded-lg col-span-1 flex flex-col">
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>    
            Gears of the 3rd motion
          </div>
          <div class="btn ghost w-32 h-32 grapePurple rounded-lg col-span-1 flex flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            A place to call home       
          </div>
          <div class="btn ghost w-32 h-32 grapePurple rounded-lg col-span-1 flex flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
              That's cap! academic cap...                     
          </div>
          <div class="btn ghost w-32 h-32 grapePurple rounded-lg col-span-1 flex flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
            </svg>            
            The 4th dimension                    
          </div>
        </div>

      </div>
    </div>
  </div>