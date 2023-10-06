<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import type { PageData } from './$types';
    export let data: PageData;
    let next = false;

    
    let { supabase } = data
    $: ({ supabase } = data)

    let email: string
    let password: string

    const handleSignUp = async (type: 'email' | 'github') => {
        if(type === 'email'){
            await supabase.auth.signUp({
                email,
                password,
            })
        }
        if(type === 'github'){
            await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: `${location.origin}/auth/callback`,
                },
            })
        }
    }
</script>
<svelte:head>
    <title>Register</title>
</svelte:head>

<section class="wave-blue h-screen flex px-5 items-center justify-center">
    <!-- initail box -->
    {#if !next}
    <div out:fade={{ duration : 300}} class="sm:w-full max-w-xl mx-5 blur-bg bg-[#ffffff91] h-fit flex items-center flex-col space-y-5 px-5 py-10 custom-box-shadow rounded-xl absolute">
        <h1 class="text-center text-3xl font-bold text-black">Account Creation</h1>
        
        
        <form class="grid gap-5 grid-cols-4 px-5 mt-10 w-full min-w-fit">
            <button class="btn light bw flex-grow w-full col-span-full" on:click={()=>{handleSignUp('github')}}>Sign Up with Github</button>
            <div class="divider info col-span-full">or</div>
            <p class="text-center font-semibold text-black col-span-full">Sign up with Email</p>
            <!-- <input class="input solid info col-span-full sm:col-span-2" placeholder="First name" bind:value={firstname} />
            <input class="input solid info col-span-full sm:col-span-2" placeholder="Last name" bind:value={lastname}/> -->
            <input class="input solid info col-span-full" placeholder="Email" bind:value={email}/>
            <input class="input solid info col-span-full" placeholder="Choose password" bind:value={password}/>

            <div class="flex col-span-4 justify-between items-center">
                <p class="text-red-700 font-semibold">error message and stuff</p>
                <button class="btn solid info col-span-1 justify-self-end" 
                on:click={()=>{
                    handleSignUp('email')
                    next = true
                    }}>Submit</button>
            </div>
            
        </form>
    </div>
    {/if}
    {#if next}
    <!-- next box -->
    <div in:fly={{y: -500, opacity : 1, duration : 500 , delay : 500}} class="sm:w-full min-w-fit max-w-xl mx-3 blur-bg bg-[#ffffff91] h-fit flex items-center flex-col space-y-5 px-5 py-10 custom-box-shadow rounded-xl relative">
        <h1 class="text-center text-3xl font-bold text-black">Verify your account</h1>
        <p class="font-semibold text-center sm:w-96 text-black"> 
            Check your email for a link to complete your registration. you may close ths tab upon successfull verification
        </p>
        </div>
    {/if}
    </section>

    <style>
        input::placeholder {
      color: #e5e7ebbb;
      opacity: 1; /* Firefox */
    }
    </style>
