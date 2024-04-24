<script lang="ts">
    import { goto, invalidateAll } from '$app/navigation';
    import { fade, fly } from 'svelte/transition';
    import type { PageData } from '../dashboard/$types';
    import ChooseUsername  from '$components/ChooseUsername.svelte';
    import { onMount } from 'svelte';
    import LabelledInput from '$components/LabelledInput.svelte';
    import DateInput from '$components/DateInput.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { enhance } from '$app/forms';
    import z from 'zod';
    import SwiftCartLogo from '$components/svg/SwiftCartLogo.svelte';
    import Sidebar from '$components/svg/Sidebar.svelte';
    import AboutInfo from '$components/svg/AboutInfo.svelte';
    import ChatBubble from '$components/svg/ChatBubble.svelte';
    import SideNavItem from '$components/SideNavItem.svelte';
    import Overview from '$components/svg/Overview.svelte';
    import Home from '$components/svg/Home.svelte';
    import Logout from '$components/svg/Logout.svelte';
    import Profile from '$components/svg/Profile.svelte';
    import Project from '$components/svg/Project.svelte';
    import Settings from '$components/svg/Settings.svelte';
    export let data: PageData;
    let { supabase, session, userProfile } = data;
    $: ({ supabase, session, userProfile } = data)
    let aboutModal = false;
    let completeProfileModal = false;
    let triggerContentLoadInAnimation = false;
    let showInternalProjects = true;
    let showExternalProjects = false;
    let quote = "";
    let author = "";
    let quotePromise: Promise<any>;
    let riddlePromise: Promise<any>;
    let riddleObjet = {
        riddle: "",
        answer: ""
    }
    let showAnswer = false;
    onMount(()=>{
        triggerContentLoadInAnimation = true;
        riddlePromise = fetch('https://riddles-api.vercel.app/random').then(res => res.json()).then(data => {
            riddleObjet = data;
        });
        quotePromise = fetch('https://stoic-quotes.com/api/quote').then(res => res.json()).then(data => {
        quote = data.text;
        author = data.author;
        });

        if(userProfile){
        console.log('This is user profile:' + userProfile);
        }else{
            console.log('This is user profile null:' + userProfile);
            completeProfileModal = true;
        }
    })

    function refreshRiddle(){
        riddlePromise = fetch('https://riddles-api.vercel.app/random').then(res => res.json()).then(data => {
            riddleObjet = data;
        });
        showAnswer = false;
    }

    let errorText = "";
    let username = "";
    let firstName = "";
    let lastName = "";
    let dateOfBirth: Date;
    let userGender = "";
    let phone = "";
    let profileUpdateLoading = false;
    
    function validate(){
        if(!z.string().min(1).safeParse(firstName).success || !z.string().min(1).safeParse(lastName).success){
            errorText = 'Please enter a first and last name'
            return false
        }
        if(!z.string().min(1).safeParse(username).success){
            errorText = 'Please enter a username'
            return false
        }
        if(!z.string().min(1).safeParse(userGender).success){
            errorText = 'Please choose a gender option'
            return false
        }
        if(!dateOfBirth){
            errorText = 'Please enter a valid date of birth'
            return false
        }
        if(!z.string().min(1).safeParse(phone).success){
            errorText = 'Please enter a phone number'
            return false
        }

        return true
    }

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
<section class="w-full h-fit gunmetal-waves">
    <div class="flex justify-between items-center">
        
        <span class="text-2xl sm:text-3xl font-bold text-gray-200 flex items-center space-x-2">
            <button class="btn orangeWeb -mb-1 ghost p-2 lg:hidden" on:click={()=>{toggleDrawer('left')}}>
                <Sidebar/>
            </button>   
            {#if userProfile?.username}
            <p>Hello, {userProfile?.first_name}! 👋</p>
            {:else}
            <p>Hello, {session?.user.email}! 👋</p>
            {/if}
        </span>
            <button class="btn sm:md sm solid orangeWeb" on:click={()=>{aboutModal = !aboutModal}}>
            <p class="hidden screen-500:block">About Regallion</p>
            <AboutInfo/>
            </button>
    </div>
    <div class="divider platinum" />
    
    <div class="w-full h-fit flex flex-col space-y-5  lg:space-x-5 ping-pong-breakpoint:space-y-0 ping-pong-breakpoint:flex-row">
        {#if triggerContentLoadInAnimation}
        <div class="w-56 bg-orangeWeb-800 text-gray-800 p-3 h-fit rounded-xl justify-start items-center space-y-3 flex-col hidden lg:flex">
            <div class="flex space-x-1 items-center m-3 mb-0">
              <img src="/favicon.ico" alt="Regal logo" class="w-9 h-9 hidden sm:flex">
              <a href="/dashboard" class="bg-oxfordBlue-600 px-2 py-0.5 rounded-md font-extrabold text-2xl lg:text-2xl text-gray-200">Regallion</a>
            </div>
    
            <div class="divider w-48" />
    
            <SideNavItem title="Overview" isActive={false} linkTo="/dashboard">
              <Overview/>
            </SideNavItem>
            <SideNavItem title="Projects" isActive={false} linkTo="/projects">
              <Project/>
            </SideNavItem>
            <SideNavItem title="Projects" isActive={false} linkTo="/projects">
                <Project/>
              </SideNavItem>
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
                    supabase.auth.signOut();
                    goto("/");
                }}>
                <Logout />
                <p>Logout</p>
            </button>
          </div>
        <div class="h-72 relative rounded-xl bg-[#ffffffc0] w-full mr-5 lg:mr-0 p-5 flex flex-col justify-between text-gray-800" >
            <button class="btn rounded-full p-1 solid orangeWeb absolute top-4 right-4" on:click={()=>{
                refreshRiddle()
            }}>
                <svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.9381 13C19.979 12.6724 20 12.3387 20 12C20 7.58172 16.4183 4 12 4C9.49942 4 7.26681 5.14727 5.7998 6.94416M4.06189 11C4.02104 11.3276 4 11.6613 4 12C4 16.4183 7.58172 20 12 20C14.3894 20 16.5341 18.9525 18 17.2916M15 17H18V17.2916M5.7998 4V6.94416M5.7998 6.94416V6.99993L8.7998 7M18 20V17.2916" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
            <span>
                <p class="text-2xl font-semibold">Guess a riddle</p>
                {#await riddlePromise}
                <div class="w-full h-fit flex justify-center items-center" style="max-height: 8rem;">
                    <div class="loader richBlack light">
                        <div class="spin w-6 h-6" />
                    </div>
                </div>
                {:then riddlePromise} 
                <p class="text-sm my-3 h-fit overflow-y-auto" in:fade={{duration: 500}} style="max-height: 8rem;">
                    {riddleObjet.riddle} 
                </p>
                {/await}
            </span>
            <div class="flex space-x-5 items-center">
                <button class="btn solid oxfordBlue" on:click={()=>{showAnswer = true}}>Answer</button>
                {#if showAnswer}
                <p class="text-sm">
                    <b>{riddleObjet.answer}</b>
                </p>
                {/if}
            </div>
            
        </div>
        <div class="p-2 w-full ping-pong-breakpoint:max-w-sm h-72 mt-2 rounded-lg flex flex-col space-y-2 bg-[#ffffffc0] text-gray-800">
            <span class="flex justify-between items-center px-2">
                <p class="font-semibold">Projects</p>
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="tabs boxed orangeWeb w-fit pill">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="tab p-4 {showInternalProjects ? 'active' : ''}" on:click={()=>{
                        showInternalProjects = true;
                        showExternalProjects = false;
                    }}>Internal</div>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="tab p-4 {showExternalProjects ? 'active' : ''}" on:click={()=>{
                        showExternalProjects = true;
                        showInternalProjects = false;
                    }}>External</div>
                </div>
            </span>
            <div class="flex space-y-2 overflow-y-auto overflow-x-hidden w-full h-48 flex-col pr-2">
                {#if showInternalProjects}
                <button class="m-1 w-full btn light bw h-16 rounded-md flex justify-start" on:click={()=>{goto("/ping-pong")}}>
                    <svg version="1.1" class="w-10" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" width="65px" height="65px" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="8.348" y="89.733" style="fill:#A1D8F6;" width="495.304" height="331.386"></rect> <rect x="43.542" y="117.136" style="fill:#0088FF;" width="424.504" height="276.58"></rect> <rect x="255.8" y="117.136" style="fill:#016DF5;" width="212.257" height="276.58"></rect> <rect x="235.976" y="69.398" style="fill:#FFFFFF;" width="41.06" height="373.203"></rect> <path style="fill:#3C3A41;" d="M503.652,81.386H285.38V69.399c0-4.611-3.736-8.348-8.348-8.348h-41.06 c-4.61,0-8.348,3.736-8.348,8.348v11.989H99.981c-4.61,0-8.348,3.736-8.348,8.348s3.738,8.348,8.348,8.348h127.644v10.704h-77.956 H43.542c-4.61,0-8.348,3.736-8.348,8.348v138.864v137.719c0,4.611,3.738,8.348,8.348,8.348h106.126h77.956v10.704H16.696V98.082 h26.852c4.61,0,8.348-3.736,8.348-8.348s-3.738-8.348-8.348-8.348h-35.2C3.738,81.386,0,85.123,0,89.734v331.385 c0,4.611,3.738,8.348,8.348,8.348h219.276v13.134c0,4.611,3.738,8.348,8.348,8.348h41.06c4.611,0,8.348-3.736,8.348-8.348v-13.134 h130.937c4.611,0,8.348-3.736,8.348-8.348c0-4.611-3.736-8.348-8.348-8.348H285.38v-10.704h76.542h106.126 c4.611,0,8.348-3.736,8.348-8.348v-137.72V117.134c0-4.611-3.736-8.348-8.348-8.348H361.922H285.38V98.082h209.924v314.69h-27.248 c-4.611,0-8.348,3.736-8.348,8.348c0,4.611,3.736,8.348,8.348,8.348h35.596c4.611,0,8.348-3.736,8.348-8.348V89.734 C512,85.124,508.263,81.386,503.652,81.386z M51.89,125.482h89.431v122.17H51.89V125.482z M51.89,385.371V264.347h89.431v121.023 H51.89z M158.015,385.371V255.999V125.482h69.609v259.889H158.015z M268.684,434.252H244.32v-13.134v-27.4V117.134v-27.4V77.747 h24.365v11.989v27.4V393.72v27.4V434.252z M370.269,385.371V264.347H459.7v121.023H370.269z M459.7,125.482v122.17h-89.431v-122.17 H459.7z M353.574,125.482v130.518v129.371H285.38V125.482H353.574z"></path> </g></svg>
                    <div class="text-left">
                        <p class="font-semibold">Ping-Pong</p>
                        <p class="text-xs font-thin">Two paddles and a ball</p>
                    </div>
                </button>
                <button class="m-1 w-full btn light bw h-16 rounded-md flex justify-start" on:click={()=>{goto("/memory-card")}}>
                    <svg viewBox="0 0 20 20" class="w-10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#e5e5e5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>emoji_tongue_sticking_out _square_round [#442]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-300.000000, -6199.000000)" fill="#e5e5e5"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M258,6051 L259,6051 C259.552,6051 260,6051.247 260,6051.799 L260,6051.598 C260,6052.15 260,6052.611 259,6052.611 L259,6052.637 C258,6052.637 258,6053.136 258,6053.689 L258,6053.792 C258,6054.345 257.552,6055 257,6055 L255,6055 C254.448,6055 254,6054.449 254,6053.896 L254,6053.792 C254,6053.24 253.552,6053 253,6053 L249,6053 C248.448,6053 248,6052.449 248,6051.896 L248,6051.792 C248,6051.24 248.448,6051 249,6051 L254,6051 L258,6051 Z M260,6046 C260,6046.552 259.552,6047 259,6047 L257,6047 C256.448,6047 256,6046.552 256,6046 C256,6045.448 256.448,6045 257,6045 L259,6045 C259.552,6045 260,6045.448 260,6046 L260,6046 Z M252,6046 C252,6046.552 251.552,6047 251,6047 L249,6047 C248.448,6047 248,6046.552 248,6046 C248,6045.448 248.448,6045 249,6045 L251,6045 C251.552,6045 252,6045.448 252,6046 L252,6046 Z M262,6056 C262,6056.552 261.552,6057 261,6057 L247,6057 C246.448,6057 246,6056.552 246,6056 L246,6042 C246,6041.448 246.448,6041 247,6041 L261,6041 C261.552,6041 262,6041.448 262,6042 L262,6056 Z M264,6041 C264,6039.895 263.105,6039 262,6039 L246,6039 C244.895,6039 244,6039.895 244,6041 L244,6057 C244,6058.105 244.895,6059 246,6059 L262,6059 C263.105,6059 264,6058.105 264,6057 L264,6041 Z" id="emoji_tongue_sticking_out-_square_round-[#442]"> </path> </g> </g> </g> </g></svg>
                    <div class="text-left">
                        <p class="font-semibold ">Memory Cards</p>
                        <p class="text-xs font-thin">Match cards and test your memory</p>
                    </div>
                </button>
                <button class="m-1 w-full btn light bw h-16 rounded-md flex justify-start" on:click={()=>{goto("/chat-room")}}>
                    <ChatBubble/>
                    <div class="text-left">
                        <p class="font-semibold">Regalore (coming soon)</p>
                        <p class="text-xs font-thin">A socket powered Chatroom</p>
                    </div>
                </button>
                {:else if showExternalProjects}
                <button class="m-1 w-full btn light bw h-16 rounded-md flex justify-start" on:click={()=>{goto("http://localhost:5173")}}>
                    <SwiftCartLogo/>
                    <div class="text-left">
                        <p class="font-semibold">SwiftCart</p>
                        <p class="text-xs font-thin">A simple e-commerce app</p>
                    </div>
                </button>
                {/if}
            </div>
            

        </div>
        {/if}
    </div>
    <div class="flex justify-center items-center w-full h-fit mt-10">
        {#await quotePromise}
        <div class="loader bw light">
            <div class="bar-bounce" />
        </div>
        {:then quotePromise} 
        <p class="text-xl font-semibold text-center w-fit" in:fade={{duration: 500,delay:1000}}>
            "{quote}"
            <i>- {author}</i>
        </p>
        {/await}

    </div>
</section>


<div>
    <label for="modal" class="modal-overlay show"></label>
    <!-- show class here will make modal visible -->
    <div class="modal w-full lg:w-fit flex flex-col gap-5 {aboutModal ? 'show' : ''}">
      <button class="absolute right-4 top-3" on:click={()=>{aboutModal = !aboutModal}}>✕</button>
      <h2 class="text-xl text-center font-semibold">About Regallion</h2>
      <span>
        Hi, my name is <b> Elliot Morrison👋</b> <br><br> I wanted to make a web-app with Sveltekit, where I could play around with the features, UI libraries, design, and showcase some mini coding projects<br><br>... as well as other random ideas I'd want to implement. <br><br>This is the result of that desire. Looking to add more projects as time goes by. I hope you enjoy it.
        </span>
      <div class="flex justify-end">
        <button class="btn solid oxfordBlue"  on:click={()=>{aboutModal = !aboutModal}}>Ok, cool</button>
      </div>
    </div>
  </div>

  <div>
    {#if completeProfileModal}
    <label for="modal" class="modal-overlay show"></label>
    <!-- show class here will make modal visible -->

    <form in:fly={{delay:200, duration: 1500, y:300}} method="POST" action="?/updateProfile" class="modal w-full lg:w-fit flex flex-col gap-5 show" use:enhance={({cancel})=>{
        
        if(!validate()){
            profileUpdateLoading = false;
            cancel()
            return
        }
        
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
      <p class="semibold">Before you can explore the rest of the app, please add some additional data to complete your profile</p>
      <div class="grid grid-cols-4 grid-flow-row gap-4 lg:gap-8">

        <!-- I dont know if this is the best way to do this, but I'm passing the session data to the form as hidden inputs -->
        <input type="text" name="sessionUserId" value={session?.user.id} class="hidden">
        <input type="text" name="sessionUserEmail" value={session?.user.email} class="hidden">

        <LabelledInput placeholder="Enter first name" name="firstName" label="" bind:data={firstName} />
        <LabelledInput placeholder="Enter last name" name="lastName" label="" bind:data={lastName} />
        <ChooseUsername name="username" bind:username />
        <select bind:value={userGender} name="gender" class="select solid oxfordBlue col-span-full sm:col-span-1">
            <option selected disabled>Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="RNS">Rather not say</option>
        </select>
        <DateInput name="dateOfBirth" label="Date of Birth" bind:data={dateOfBirth} />
        <LabelledInput placeholder="Enter phone number" name="phoneNumber" label="📞" bind:data={phone} />
        
      </div>
      <div class="flex justify-between items-center">
        <p class="text-red-600 text-sm ml-2">{errorText}</p>
        <button class="btn solid oxfordBlue {profileUpdateLoading? 'is-loading' : ''}" type="submit" on:click={()=>{profileUpdateLoading = !profileUpdateLoading}}>
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


            

  