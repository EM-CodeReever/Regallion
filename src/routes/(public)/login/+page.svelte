<script lang="ts">
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    export let data: PageData;
    import z from 'zod';
    let { supabase } = data
    $: ({ supabase } = data)
    let email: string
    let password: string
    let loginProcessing = false
    let errorText = ""

    supabase.auth.getSession().then((session) => {
        console.log(session);
        
    })
    // $: console.log(z.string().email().safeParse(email));
    
    const handleSignIn = async (type: 'email' | 'github') => {
        if(type === 'email'){
            loginProcessing = true
            let {success} = z.string().email().safeParse(email)
            if(!success){
                errorText = "Please enter a valid email"
                loginProcessing = false
                return
            }
            const {error} = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if(error){
                errorText = error.message
                loginProcessing = false
            }else{
                goto('/dashboard')
            }
        }else if(type === 'github'){
            await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: `${location.origin}/auth/callback`,
                }
            })
        }
    }


</script>
<svelte:head>
    <title>Login</title>
</svelte:head>
<section class="wave-red h-fit min-h-screen flex items-center justify-center w-full" data-theme="custom">
    <div class="w-full min-w-fit max-w-xl blur-bg bg-[#ffffff91] h-fit flex items-center flex-col space-y-5 my-32 mx-5 pt-10 pb-5 custom-box-shadow rounded-xl">
        <h1 class="text-center text-3xl font-bold text-black">Login</h1>
        <div class="w-full px-5">
            <button class="btn light bw flex-grow w-full" on:click={()=>{handleSignIn('github')}}>Continue with Github</button>
        </div>
        <div class="divider px-5">or</div>
        <p class="text-center font-semibold text-black">Enter your account credentials and login</p>
        <!-- change this span to a form in the future -->
        <span class="flex flex-col space-y-7 px-5 mt-10 w-full">
            <div class="input info solid">
                <div style="color: #FA7268;">Email</div>
                <div class="is-divider" style="background-color: #FA7268;" />
                <input class="text-[#FA7268]" bind:value={email} />
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                </svg>
            </div>

            <div class="input info solid">
                <div style="color: #FA7268;">Password</div>
                <div class="is-divider" style="background-color: #FA7268;" />
                <input type="password" style="color: #FA7268;" bind:value={password}/>
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                </svg>
            </div>
            <div class="flex justify-between items-center">
                <p class="text-red-600 text-sm font-thin">{errorText}</p>
                <button class="btn sunsetFire solid ml-auto {loginProcessing? 'is-loading' : ''}" on:click={()=>{handleSignIn('email')}}>Login</button>
            </div>
        </span>
    </div>
</section>