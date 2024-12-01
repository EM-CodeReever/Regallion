<script lang="ts">
    import type { PageData } from './$types';
    import PartySocket from "partysocket";
    import { page } from "$app/stores";
  import { SendHorizonal, SendHorizonalIcon } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { set } from 'zod';
    let messages:string[] = [];
    let message = "";
    let element: HTMLDivElement
    let messageInput: HTMLInputElement
    export let data: PageData;
    let { supabase, session, userProfile } = data;
    
    
    const scrollToBottom = async (node:HTMLDivElement) => {
        node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
    }; 

// connect to our server
const partySocket = new PartySocket({
  host: "https://regallion-party.em-codereever.partykit.dev",
  room: data.roomCode as string,
  id: userProfile?.username as string, 
});

// print each incoming message from the server to console
partySocket.addEventListener("message", (e) => {
    messages = [e.data,...messages];
});



</script>

<svelte:head>
    <title>[{data.roomName}]</title>
</svelte:head>

<section class="w-full h-fit">
    <div class="w-full flex justify-between">
       <div class="flex flex-col">
        {#if data.isGlobal}
            <p class="text-2xl font-bold">Welcome to GlobalChat!</p>
        {:else if !data.isGlobal}
            <p class="text-2xl font-bold">{data.roomName}</p>
            <p class="text-sm"> Owner: {data.roomOwner}</p>
            <p class="text-sm"> Code: {data.roomCode}</p>
        {/if}
        
       </div>
       <button class="btn sm morningGreen solid">
        Leave Room
       </button>
    </div>
    <div bind:this={element} class="bg-black flex flex-col-reverse px-3 rounded-xl overflow-y-auto my-3 bg-opacity-20 w-full h-[calc(100vh-15.5rem)]">
        {#each messages as message}
            <div class="w-full">
                <p>{message}</p>
            </div>
        {/each}
    </div>
    <form class="flex items-center relative">
        <input bind:this={messageInput} type="text" class="input morningGreen solid h-12" placeholder="Type a message" bind:value={message} />
        <button class="absolute right-3 top-3" on:click={()=>{
            if(message != ''){
                partySocket.send(message)
                scrollToBottom(element);
                setTimeout(()=>{
                    messageInput?.focus();
                },1)
                message = "";
            }
            }}>
            <SendHorizonalIcon />
        </button>
    </form>
</section>