<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import type { PageData } from './$types';
    export let data: PageData;
    import z from 'zod';
  import { GithubIcon } from 'lucide-svelte';
    let next = false;
    let email: string
    let password: string
    let registerProcessing = false
    let confirmPassword: string
    let errorText = ""

    function validate(){
        let {success} = z.string().email().safeParse(email)
        if(!success){
            errorText = "Please enter a valid email"
            registerProcessing = false
            return false
        }
        if(password !== confirmPassword){
            errorText = "Passwords do not match"
            registerProcessing = false
            return false
        }
        let {success: success2} = z.string().min(8).safeParse(password)
        if(!success2){
            errorText = "Password must be at least 8 characters long"
            registerProcessing = false
            return false
        }
        // registerProcessing = false
        return true
    }



    let { supabase } = data
    $: ({ supabase } = data)



    let githubSignUp = async () => {
        await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: `${location.origin}/auth/callback`,
                },
        })
    }
    let emailSignup = async () => {
        registerProcessing = true
            if(!validate()){
            return
            }
            await supabase.auth.signUp({
                email,
                password,
            })
            next = true
            registerProcessing = false
    }
</script>
<svelte:head>
    <title>Register</title>
</svelte:head>

<section class="misty-waves h-screen flex px-5 items-center justify-center">
    <!-- initail box -->
    {#if !next}
    <div class="w-full max-w-xl h-fit flex items-center flex-col space-y-5 px-3 pt-40 pb-10">
        <h1 class="text-center text-3xl font-bold text-gray-200 mb-5">Account Creation</h1>
        
        
        <div class="grid gap-3 grid-cols-4 px-5 mt-10 w-full min-w-fit">
            <button class="btn solid morningGreen flex-grow w-full col-span-full" on:click={()=>{githubSignUp()}}>Sign Up with Github <GithubIcon/></button>
            <div class="divider info col-span-full text-gray-200">or</div>
                <p class="text-center font-semibold text-gray-200 col-span-full">Sign up with Email</p>
                <input class="input solid info col-span-full" placeholder="Email" bind:value={email}/>
                <input class="input solid info col-span-full md:col-span-2" type="password" placeholder="Choose password" bind:value={password}/>
                <input class="input solid info col-span-full md:col-span-2" type="password" placeholder="Confirm password" bind:value={confirmPassword}/>

                <div class="flex col-span-4 justify-between items-center">
                    <p class="text-red-700">{errorText}</p>
                    <button class="btn morningGreen solid col-span-1 justify-self-end {registerProcessing
                        ? 'is-loading'
                        : ''}"
                    on:click={()=>{
                        emailSignup()
                        }}>Submit</button>
                </div>
        </div>
    </div>
    {/if}
    {#if next}
    <!-- next box -->
    <div in:fade={{ duration : 300, delay : 300 }} class="sm:w-full min-w-fit max-w-xl mx-3 h-fit flex items-center flex-col space-y-2 px-5 py-10 relative">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
          </svg>          
        <h1 class="text-center text-3xl font-bold text-gray-200 m-0">Verify your account</h1>
        <p class="font-semibold text-center sm:w-96 text-gray-200"> 
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
