<script lang="ts">
    import { goto, invalidateAll } from '$app/navigation';
    import { fade, fly } from 'svelte/transition';
    import type { PageData } from '../dashboard/$types';
    import ChooseUsername  from '$components/ChooseUsername.svelte';
    import { onMount } from 'svelte';
    import LabelledInput from '$components/LabelledInput.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { enhance } from '$app/forms';
    import Sidebar from '$components/svg/Sidebar.svelte';
    import SideNavItem from '$components/SideNavItem.svelte';
    import Project from '$components/svg/Project.svelte';
    import { page } from "$app/stores";  
    import { Club, DiamondPercent, House, LogOut, MessageSquareMore, Settings } from 'lucide-svelte';
  import RiddleBox from '$components/RiddleBox.svelte';
    export let data: PageData;
    let { supabase, session, userProfile } = data;
    $: ({ supabase, session, userProfile } = data)

    let currentPath = $page.route.id;
    $: currentPath = $page.route.id;

    let completeProfileModal = false;
    let triggerContentLoadInAnimation = false;
    
    console.log(currentPath);

    onMount(()=>{
        triggerContentLoadInAnimation = true;
        if(!userProfile){
            completeProfileModal = true;
        }
    })

    let errorText = "";
    let profileUpdateLoading = false;

    function toggleDrawer(name:string) {
      let element = document.getElementById(`drawer-${name}`);
      if (element?.classList.contains('show')) {
          element?.classList.remove('show');
      } else {
          element?.classList.add('show');
      }
    }

</script>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>
<Toaster />
<section class="w-full h-fit bg-oxfordBlue-500">
    <div class="flex justify-between items-center">
        
        <span class="text-2xl sm:text-3xl font-bold text-gray-200 flex items-center space-x-2">
            <button class="btn orangeWeb -mb-1 ghost p-2 lg:hidden" on:click={()=>{toggleDrawer('left')}}>
                <Sidebar/>
            </button>   
            <div class="flex space-x-1 items-center">
                <img src="/favicon.ico" alt="Regal logo" class="w-10 h-10 hidden sm:flex">
                <a href="/dashboard" class="px-2 py-0.5 rounded-md font-extrabold text-2xl lg:text-3xl text-gray-200">Regallion</a>
              </div>
        </span>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <div class="dropdown oxfordBlue">
        <label class="flex space-x-3 p-3 rounded-2xl cursor-pointer hover:bg-black" tabindex="0">
            <!-- <button class="btn sm:md sm solid orangeWeb" on:click={()=>{aboutModal = !aboutModal}}>
                <p class="hidden screen-500:block">About Regallion</p>
                <AboutInfo/>
                
                </button> -->
                <div class="flex flex-col">
                    <p class="font-semibold">{userProfile?.username}</p>
                    <p class="text-xs font-thin">{userProfile?.auth_email}</p>
                </div>
                <div class="avatar square ring">
                    <img alt="avatar" src="https://picsum.photos/id/64/200/200" />
                </div>
            </label>
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="menu bottom-left !w-[12rem]">
                <!-- svelte-ignore a11y-missing-attribute -->
                <a class="item text-sm" tabindex="-1"><Settings class="w-4 h-4"/> Account settings</a>
                <!-- svelte-ignore a11y-missing-attribute -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <a class="item text-sm" tabindex="-1" on:click={()=>{
                    supabase.auth.signOut();
                    goto("/");
                }}><LogOut class="w-4 h-4"/>Subscriptions</a>
              </div>
            </div>
            
    </div>
    
    <div class="w-full h-fit flex flex-col space-y-5 mt-4 lg:space-x-5 ping-pong-breakpoint:space-y-0 ping-pong-breakpoint:flex-row">
        {#if triggerContentLoadInAnimation}
        <div class="w-full max-w-[16rem] text-gray-200 p-3 h-fit rounded-xl justify-start items-center space-y-3 flex-col hidden lg:flex">
    
            <SideNavItem title="Dashboard" isActive={true} linkTo="/dashboard">
                <Project/>
            </SideNavItem>
            <SideNavItem title="Ping Pong" isActive={false} linkTo="/ping-pong">
              <DiamondPercent/>
            </SideNavItem>
            <SideNavItem title="Memory Cards" isActive={false} linkTo="/profile">
                <Club/>
            </SideNavItem>
            <SideNavItem title="Regalore" isActive={false} linkTo="/account-settings">
              <MessageSquareMore/>
            </SideNavItem>
            <SideNavItem title="Homepage" isActive={false} linkTo="/">
              <House/>
            </SideNavItem>
            <SideNavItem title="Homepage" isActive={false} linkTo="#">
                <House/>
              </SideNavItem>
          </div>
          <div class="w-full ">
            <RiddleBox/>
          </div>
        {/if}
    </div>
</section>



  <div>
    {#if completeProfileModal}
    <label for="modal" class="modal-overlay show"></label>
    <!-- show class here will make modal visible -->

    <form in:fly={{delay:200, duration: 1500, y:300}} method="POST" action="?/updateProfile" class="modal rounded-md w-full lg:max-w-xl flex flex-col space-y-4 show" use:enhance={({})=>{
        return ({result})=>{
            if(result){
                profileUpdateLoading = false;
                completeProfileModal = false;
                toast.success('Successfully Updated Profile!')
                invalidateAll()
            }
            // update({reset: true})
        }
    }}>
      <h2 class="text-xl text-center font-semibold">Complete your profile</h2>
      <p class="font-extralight text-center">What should I call you?</p>
      <div class="grid grid-cols-2 gap-4">
        <!-- I dont know if this is the best way to do this, but I'm passing the session data to the form as hidden inputs -->
        <input type="text" name="sessionUserId" value={session?.user.id} class="hidden">
        <input type="text" name="sessionUserEmail" value={session?.user.email} class="hidden">
        <LabelledInput extraClasses="col-span-1" placeholder="Enter first name" name="firstName" label=""  />
        <LabelledInput  extraClasses="col-span-1" placeholder="Enter last name" name="lastName" label="" />
        <ChooseUsername  extraClasses="col-span-full" name="username" />
      </div>
      <div class="flex justify-between items-center">
        <p class="text-red-600 text-sm ml-2">{errorText}</p>
        <button class="btn light oxfordBlue {profileUpdateLoading? 'is-loading' : ''}" type="submit" on:click={()=>{profileUpdateLoading = !profileUpdateLoading}}>
            {#if !profileUpdateLoading}
            Done 👌
            {:else}
            Updating...
            {/if}
        </button>
      </div>
    </form>
    {/if}
  </div>

