<script lang="ts">
    import type { PageData } from '../$types';
    import PartySocket from "partysocket";
    export let data: PageData;
    let { supabase, session, userProfile } = data;
    import { page } from "$app/stores";
  import { SendHorizonal, SendHorizonalIcon } from 'lucide-svelte';
    let roomCode = $page.params.room_code;

    let messages:string[] = [];

    let message = "";
    

// connect to our server
const partySocket = new PartySocket({
  host: "localhost:1999",
  room: roomCode,
  id: userProfile?.username as string,
});

// print each incoming message from the server to console
partySocket.addEventListener("message", (e) => {
    messages = [...messages, e.data];
    console.log(e.data);
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
    <div class="bg-black p-3 rounded-xl overflow-y-auto my-3 bg-opacity-20 w-full h-[30rem]">
        {#each messages as message}
            <div class="w-full">
                <p>{message}</p>
            </div>
        {/each}
    </div>
    <form class="flex items-center">
        <input type="text" class="input morningGreen solid h-12 rounded-r-none" placeholder="Type a message" bind:value={message} />
        <button class="btn morningGreen solid rounded-l-none" on:click={()=>{
            partySocket.send(message)
            message = "";
            }}>
            <SendHorizonalIcon />
        </button>
    </form>
</section>