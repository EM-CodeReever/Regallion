<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import type { PageData } from './$types';
    export let data: PageData;
    import z from 'zod';
    let next = false;
    let email: string
    let password: string
    let confirmPassword: string
    let errorText = ""

    function validate(){
        let {success} = z.string().email().safeParse(email)
        if(!success){
            errorText = "Please enter a valid email"
            return false
        }
        if(password !== confirmPassword){
            errorText = "Passwords do not match"
            return false
        }
        let {success: success2} = z.string().min(8).safeParse(password)
        if(!success2){
            errorText = "Password must be at least 8 characters long"
            return false
        }
        return true
    }



    let { supabase } = data
    $: ({ supabase } = data)

    

    const handleSignUp = async (type: 'email' | 'github') => {
        if(!validate()){
            return
        }
        if(type === 'email'){
            await supabase.auth.signUp({
                email,
                password,
            })
            next = true
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
            <div class="divider info col-span-full text-black">or</div>
            <p class="text-center font-semibold text-black col-span-full">Sign up with Email</p>
            <input class="input solid info col-span-full" placeholder="Email" bind:value={email}/>
            <input class="input solid info col-span-full md:col-span-2" type="password" placeholder="Choose password" bind:value={password}/>
            <input class="input solid info col-span-full md:col-span-2" type="password" placeholder="Confirm password" bind:value={confirmPassword}/>

            <div class="flex col-span-4 justify-between items-center">
                <p class="text-red-700 font-thin">{errorText}</p>
                <button class="btn light info col-span-1 justify-self-end" 
                on:click={()=>{
                    handleSignUp('email')
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
