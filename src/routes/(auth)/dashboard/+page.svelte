<!--
This component represents the dashboard page of the Crestfallen web app. 
It imports various Svelte components and libraries, including navigation functions, transitions, and toast notifications. 
It also fetches a random quote from an external API and displays it on the page. 
If the user's profile is incomplete, a modal is displayed prompting them to complete their profile. 
The component exports a PageData object containing Supabase session and user profile data.
-->
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
    export let data: PageData;
    let { supabase, session, userProfile } = data;
    $: ({ supabase, session, userProfile } = data)
    let aboutModal = false;
    let completeProfileModal = false;
    let showContent = false;
    let quote = "";
    let author = "";
    let quotePromise: Promise<any>;
    onMount(()=>{
        showContent = true;
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

    
    
    

    
</script>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>
<Toaster />
<section class="smokey-blue-inverse pt-10 w-full h-fit min-h-screen px-3 lg:px-36 pt-36 lg:pt-44 pb-6">
    <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-200">Dashboard</h1>
            <button class="btn solid orangeWeb" on:click={()=>{aboutModal = !aboutModal}}>
            About Crestfallen
            </button>
    </div>
    <div class="divider platinum" />
    <div class="w-full h-fit flex flex-col md:grid md:grid-cols-5 gap-4">
        {#if showContent}
        <div class="flex gap-4 md:hidden" in:fly={{duration:1000,y:400,opacity:0,delay:0}}>
            <div class="h-32 col-span-2 rounded-xl w-full bg-[#ffffffc0] blur-bg custom-box-shadow flex flex-col justify-center items-center text-gray-800">
                <p class="text-center font-semibold">Total Projects Completed</p>
                <p class="text-3xl xl:text-4xl font-bold">0</p>
            </div>
            <div class="h-32 col-span-2 rounded-xl w-full bg-[#ffffffc0] blur-bg flex flex-col justify-center items-center text-gray-800">
                <img class="aspect-ratio w-16 rounded-full" src="https://robohash.org/{userProfile?.username}" alt="">
                <!-- <p class="text-2xl font-semibold text-black">CF Social</p> -->
                <a href="/profile" class="text-sm hover:underline font-bold text-[#14213D]">Coming Soon</a>
            </div>
        </div>
        <div in:fly={{duration:1000,y:200,opacity:0,delay:0}} class="h-56 col-span-3 rounded-xl w-full bg-[#ffffffc0] blur-bg custom-box-shadow flex flex-col justify-center items-center text-gray-800">
            <p class="text-xl text-center font-semibold">Latest Project Completed</p>
            <a href="/ping-pong" class="text-sm hover:underline font-bold text-[#14213D] ">Ping Pong Game</a>
        </div>
        <div in:fly={{duration:1000,y:200,opacity:0,delay:200}} class="h-56 col-span-1 rounded-xl w-full bg-[#ffffffc0] blur-bg custom-box-shadow md:flex flex-col justify-center items-center hidden text-gray-800">
            <p class="text-center font-semibold">Total Projects Completed</p>
            <p class="text-3xl xl:text-4xl text-[#14213D] font-bold">2</p>
        </div>
        <div in:fly={{duration:1000,y:200,opacity:0,delay:400}} class="h-56 col-span-1 rounded-xl w-full bg-[#ffffffc0] blur-bg custom-box-shadow md:flex flex-col justify-center items-center hidden">
            <!-- <img class="aspect-ratio w-16" src="/favicon.ico" alt=""> -->
            <p class="text-2xl italic font-extrabold text-black">Regpost</p>
            <a href="/profile" class="text-sm hover:underline font-bold text-[#14213D]">Coming Soon</a>
        </div>
        {/if}
    </div>
    <div class="flex justify-center items-center w-full h-72">
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
      <h2 class="text-xl text-center font-semibold">About Crestfallen</h2>
      <span>
        Hi, my name is <b> Elliot Morrison👋</b> <br><br> I wanted to make a web-app with Sveltekit, where I could play around with the features, UI libraries, design, and showcase some mini coding projects<br><br>... as well as other random ideas I'd want to implement. <br><br>This is the result of that desire. Looking to add more projects as time goes by. I hope you enjoy it.
        </span>
      <div class="flex justify-end">
        <button class="btn solid oxfordBlue"  on:click={()=>{aboutModal = !aboutModal}}>Ok cool 👍</button>
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


            

  