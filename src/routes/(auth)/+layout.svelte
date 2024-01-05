<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import SideNavItem from "$components/SideNavItem.svelte";
    import Chatroom from "$components/svg/Chatroom.svelte";
    import Home from "$components/svg/Home.svelte";
    import Logout from "$components/svg/Logout.svelte";
    import Overview from "$components/svg/Overview.svelte";
    import Profile from "$components/svg/Profile.svelte";
    import Project from "$components/svg/Project.svelte";
    import Settings from "$components/svg/Settings.svelte";
    import Sidebar from "$components/svg/Sidebar.svelte";
    export let data;
    let { session, supabase,userProfile } = data;
    $: ({ session, supabase,userProfile } = data);
    let currentPath = $page.route.id;
    $: currentPath = $page.route.id;
    
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

  <section class="flex gunmetal-waves w-full h-fit min-h-screen p-5 screen-400:p-12 screen-400:pb-0">
    <!-- <nav class="blur-bg fixed px-3 w-full top-0 bg-transparent flex justify-between items-center h-16 z-50">
        <div class="flex justify-center items-center py-5 px-1">
            <button class="btn" on:click={()=>{toggleDrawer('left')}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#e5e5e5" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                  </svg> 
            </button>             
        </div>
        <div class="flex space-x-2 items-center">
          <img src="/favicon.ico" alt="Regal logo" class="w-9 h-9 hidden sm:flex">
          <a href="/dashboard" class="bg-richBlack-200 px-2 py-1 rounded-md font-extrabold text-2xl lg:text-2xl text-gray-200">Regallion</a>
        </div>
        <div class="p-5">
            <div class="dropdown bw">
            <button class="avatar ring-1" tabindex="0">
                <img alt="avatar" src="https://robohash.org/{userProfile?.username}" />
            </button>
            <div class="menu bottom-left" style="width: 20rem;">
                <p class="subtitle text-center">Signed in as: <span class="font-bold text-success-800">
                  {userProfile?.username}
                </span></p>
                <div class="is-divider" role="separator"></div>
                <button class="item text-sm btn" tabindex="-1" on:click={()=>{goto('/')}}>Homepage</button>
                <button class="item text-sm btn" tabindex="-1" on:click={()=>{goto('profile')}}>Profile</button>
                <button class="item text-sm btn" tabindex="-1" on:click={()=>{goto('account-settings')}}>Account Settings</button>
                <button class="item text-sm btn" tabindex="-1" on:click={()=>{logOut()}}>Logout</button>
              </div>
            </div>
        </div>
    </nav> -->
    <div class="h-fit w-full flex justify-center">
       {#if !(currentPath == "/(auth)/dashboard")}
      <button class="btn orangeWeb absolute top-5 left-5 ghost p-2 " on:click={()=>{toggleDrawer('left')}}>
        <Sidebar/>
      </button> 
      {/if}
        <slot />
    </div>
  </section>

  
  <div data-theme="dark">
    <label class="drawer-overlay" on:click={()=>{toggleDrawer('left')}}></label>
    <div class="drawer left" id="drawer-left">
      <div class="content flex flex-col h-full">
        <label class="btn sm circle bw solid absolute right-3 top-3" on:click={()=>{toggleDrawer('left')}}>✕</label>
        <div class="flex space-x-1 items-center m-3 mb-0">
          <img src="/favicon.ico" alt="Regal logo" class="w-9 h-9 hidden sm:flex">
          <a href="/dashboard" class="bg-oxfordBlue-600 px-2 py-0.5 rounded-md font-extrabold text-2xl lg:text-2xl text-gray-200">Regallion</a>
        </div>
        <div class="divider platinum" />
        <SideNavItem title="Overview" isActive={false} linkTo="/dashboard">
          <Overview/>
        </SideNavItem>
        <!-- <SideNavItem title="Projects" isActive={false} linkTo="/projects">
          <Project/>
        </SideNavItem> -->
        <SideNavItem title="Profile" isActive={false} linkTo="/profile">
          <Profile/>
        </SideNavItem>
        <SideNavItem title="Account Settings" isActive={false} linkTo="/account-settings">
          <Settings/>
        </SideNavItem>
        <SideNavItem title="Homepage" isActive={false} linkTo="/">
          <Home/>
        </SideNavItem>
        <button class="cursor-pointer flex justify-start items-center font-semibold space-x-3 hover:bg-oxfordBlue-600 hover:text-gray-300 w-full p-3 rounded-lg relative"
                on:click={()=>{
                    logOut();
                }}>
                <Logout />
                <p>Logout</p>
            </button>
      </div>
    </div>
  </div>