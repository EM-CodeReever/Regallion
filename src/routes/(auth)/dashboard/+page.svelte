<script lang="ts">
    import { goto, invalidateAll } from '$app/navigation';
    import { fade, fly } from 'svelte/transition';
    import type { PageData } from '../dashboard/$types';
    import type { LayoutData } from '../$types';
    import ChooseUsername  from '$components/ChooseUsername.svelte';
    import { onMount } from 'svelte';
    import LabelledInput from '$components/LabelledInput.svelte';
    // import { Gender } from '$lib';
    import DateInput from '$components/DateInput.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { enhance } from '$app/forms';
    export let data: PageData;
    let { supabase, session, userProfile } = data;
    $: ({ supabase, session, userProfile } = data)
    let aboutModal = false;
    let completeProfileModal = false;
    let quote = "";
    let author = "";
    let quotePromise: Promise<any>;
    onMount(()=>{
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

    let username: string;
    let firstName: string;
    let lastName: string;
    let dateOfBirth: Date;
    let userGender: 'RNS';
    let phone: string;
    let profileUpdateLoading = false;
    
    

    
</script>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>
<Toaster />
<section class="w-full h-fit px-3 lg:px-36 pt-10 lg:pt-24 pb-6">
    <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-white">Dashboard</h1>
            <button class="btn light bw" on:click={()=>{aboutModal = !aboutModal}}>
            About Crestfallen
            </button>
    </div>
    <div class="divider blankWhite" />
    <div class="w-full h-fit flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-5 mt-5">
        <div class="h-56 rounded-xl w-full bg-[#ffffffc0] blur-bg flex flex-col justify-center items-center text-gray-800">
            <p class="text-2xl font-semibold">Total Projects Completed</p>
            <p class="text-4xl font-bold">0</p>
        </div>
        <div class="h-56 rounded-xl w-full bg-[#ffffffc0] blur-bg flex flex-col justify-center items-center text-gray-800">
            <p class="text-2xl font-semibold">Latest Project Completed</p>
            <a href="/profile" class="text-sm hover:underline font-bold text-purple-700">Some random project name</a>
        </div>
        <div class="h-56 rounded-xl w-full bg-[#ffffffc0] blur-bg flex flex-col justify-center items-center">
            <!-- <img class="aspect-ratio w-16 rounded-full" src="https://robohash.org/{userProfile?.username}" alt=""> -->
            <img class="aspect-ratio w-16 rounded-full" src="https://robohash.org/cope" alt="">
            <p class="text-2xl font-semibold text-black">CF Social</p>
            <a href="/profile" class="text-sm hover:underline font-bold text-purple-700">Go to Feed</a>
        </div>
    </div>
    <div class="flex justify-center items-center w-full h-72">
        {#await quotePromise}
        <div class="loader bw">
            <div class="bar-bounce" />
        </div>
        {:then quotePromise} 
        <p class="text-xl text-center w-fit" in:fade={{duration: 500}}>
            {quote}
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
        </span
      >
      <div class="flex justify-end">
        <button class="btn solid grapePurple "  on:click={()=>{aboutModal = !aboutModal}}>Ok cool 👍</button>
      </div>
    </div>
  </div>

  <div>
    {#if completeProfileModal}
    <label for="modal" class="modal-overlay show"></label>
    <!-- show class here will make modal visible -->

    <form in:fly={{delay:200, duration: 1500, y:300}} method="POST" action="?/updateProfile" class="modal w-full lg:w-fit flex flex-col gap-5 show" use:enhance={()=>{
        return ({result,})=>{
            if(result){
                profileUpdateLoading = false;
                completeProfileModal = false;
                toast.success('Successfully Updated Profile!')
                invalidateAll()
            }
            // update({reset: true})
        }
    }}>
      <!-- <button class="absolute right-4 top-3" on:click={()=>{completeProfileModal = !completeProfileModal}}>✕</button> -->
      <h2 class="text-xl text-center font-semibold">Complete your profile</h2>
      <p class="semibold">Before you can explore the rest of the app, please add some additional data to complete your profile</p>
      <div class="grid grid-cols-4 grid-flow-row gap-4 lg:gap-8">

        <!-- I dont know if this is the best way to do this, but I'm passing the session data to the form as hidden inputs -->
        <input type="text" name="sessionUserId" value={session?.user.id} class="hidden">
        <input type="text" name="sessionUserEmail" value={session?.user.email} class="hidden">

        <LabelledInput placeholder="Enter first name" name="firstName" label="" bind:data={firstName} />
        <LabelledInput placeholder="Enter last name" name="lastName" label="" bind:data={lastName} />
        <ChooseUsername name="username" bind:username />
        <select bind:value={userGender} name="gender" class="select solid grapePurple col-span-full sm:col-span-1">
            <option selected disabled>Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="RNS">Rather not say</option>
        </select>
        <DateInput name="dateOfBirth" label="Date of Birth" bind:data={dateOfBirth} />
        <LabelledInput placeholder="Enter phone number" name="phoneNumber" label="📞" bind:data={phone} />
        
      </div>
      <div class="flex justify-between items-center">
        <p class="text-red-600 text-sm ml-2">Errors go here when validated</p>
        <button class="btn solid grapePurple {profileUpdateLoading? 'is-loading' : ''}" type="submit" on:click={()=>{profileUpdateLoading = !profileUpdateLoading}}>
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


            

  