<script lang="ts">
    import type { PageData } from '../$types';
    import PartySocket from "partysocket";
    export let data: PageData;
    let { supabase, session, userProfile } = data;
    import { page } from "$app/stores";
  import { SendHorizonal, SendHorizonalIcon } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { set } from 'zod';
    let roomCode = $page.params.room_code;
    let messages:string[] = [];
    let message = "";
    let element: HTMLDivElement
    let messageInput: HTMLInputElement

    
    
    const scrollToBottom = async (node:HTMLDivElement) => {
        node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
    }; 

// connect to our server
const partySocket = new PartySocket({
  host: "https://regallion-party.em-codereever.partykit.dev",
  room: roomCode,
  id: userProfile?.username as string,
});

// print each incoming message from the server to console
partySocket.addEventListener("message", (e) => {
    messages = [e.data,...messages];
});



</script>

<svelte:head>
    <title>Regalore - [{roomCode}]</title>
</svelte:head>

<section class="w-full h-fit">
    <div class="w-full flex justify-between">
       <p class="text-3xl"> Room: {roomCode}</p>
       <button class="btn morningGreen solid">
        Leave
       </button>
    </div>
    <div bind:this={element} class="bg-black flex flex-col-reverse px-3 rounded-xl overflow-y-auto my-3 bg-opacity-20 w-full h-[calc(100vh-15.5rem)]">
        {#each messages as message}
            <div class="w-full">
                <p>{message}</p>
            </div>
        {/each}
    </div>
    <form class="flex items-center">
        <input bind:this={messageInput} type="text" class="input morningGreen solid h-12 rounded-r-none" placeholder="Type a message" bind:value={message} />
        <button class="btn morningGreen solid rounded-l-none" on:click={()=>{
            partySocket.send(message)
            scrollToBottom(element);
            setTimeout(()=>{
                messageInput?.focus();
            },1)
            message = "";
            }}>
            <SendHorizonalIcon />
        </button>
    </form>
</section>