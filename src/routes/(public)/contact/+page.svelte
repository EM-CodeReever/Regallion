<script lang="ts">
    
    import { onMount } from 'svelte';
    import type { ActionData, PageData } from './$types';
    import { fade, fly } from 'svelte/transition';
    import { enhance, applyAction } from '$app/forms';
    import toast, { Toaster } from 'svelte-french-toast';
    export let data: PageData;
    export let form: ActionData;

    let contactSending = false;


    let showHeading = false;
    let showContent = false;

    onMount(() => {
        showHeading = true;
        showContent = true;
    });


</script>
<svelte:head>
    <title>Contact</title>
</svelte:head>
<Toaster />
<section class="wave-sunset min-h-screen h-fit flex flex-col items-center space-y-10 justify-center px-5 pb-20 pt-32 text-gray-200">
    {#if showHeading}
    <h1 class="text-4xl text-center font-bold" in:fade={{duration:1000}}>Contact Me</h1>
    <p class="max-w-3xl text-center px-5" in:fade={{duration:1000}}>
        I am always open to new opportunities and collaborations. If you would like to get in touch with me, please feel free to send me a message using the form below. I will get back to you as soon as possible.
    </p>
    {/if}
    
    <div class="flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-5 justify-center w-full" >
        {#if showContent}
        <div in:fly={{duration:1000,y:400,opacity:0}} class=" w-full max-w-sm md:w-fit blur-bg bg-[#ffffff91] h-fit md:h-96 flex flex-col justify-start space-y-2 items-center p-5 custom-box-shadow rounded-xl text-[#001220] text-sm font-semibold">
            <div class="flex space-x-5 w-full p-3 rounded-lg hover:text-[#C62368] items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <p class="text-left">
                    elliotmorrison58@gmail.com
                    <br>
                    contact@elliotmorrisonbusiness.com 
                  </p>
            </div>
            <div class="flex space-x-5 items-center w-full  p-3 rounded-lg hover:text-[#C62368]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <p>+1 876 863-3668  </p>            
            </div>
            <div class="flex space-x-5 items-center  w-full  p-3 rounded-lg hover:text-[#C62368] hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>              
                  <a href="https://elliotmorrisonbusiness.com/">elliotmorrisonbusiness.com</a>           
            </div>
            <div class="flex space-x-5 items-center w-full  p-3 rounded-lg hover:text-[#C62368] hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <a href="https://github.com/EM-CodeReever">EM-CodeReever</a>  
            </div>
        </div>
        <div in:fly={{duration:1000,y:400,opacity:0,delay:300}} class="w-full max-w-sm h-96 md:max-w-3xl blur-bg bg-[#ffffff91] flex flex-col p-5 custom-box-shadow rounded-xl">
            <hi class="text-3xl text-center font-bold text-gray-800 mb-4">Leave a message</hi>
            <form class="w-full h-full rounded-xl flex flex-col px-5 space-y-4" method="POST" action="?/sendContactMail" use:enhance={({})=>{
                contactSending = true;
                return async ({result,update})=>{
                    update({reset:true})
                    await applyAction(result)
                    console.log(form);
                    
                    if(form?.success){
                        toast.success(form?.message);
                    }else{
                        toast.error('An error occured while sending your message. Please try again later.');
                    }
                    contactSending = false;
                }
                }}>
                <input class="input sunsetRed" placeholder="Name" name="contactSender"/>
                <input class="input sunsetRed" placeholder="Email address" name="contactEmail"/>
                <textarea  class="input h-full sunsetRed" placeholder="Write your message" name="contactMessage" />
                <div class="flex justify-end w-full">
                    <button class="btn light bw {contactSending? 'is-loading' : ''}">Send</button>
                </div>
            </form>
        </div>
        {/if}
    </div>
</section>

<style>
    input,textarea{
        background-color: #ffffff91 !important;
        resize: none;
        color: black;
    }
    input::placeholder,textarea::placeholder{
        color: black;
    }
</style>