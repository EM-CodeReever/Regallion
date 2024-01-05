<script lang="ts">
    import type { PageData } from '../$types';
    import { afterUpdate, tick } from 'svelte';
    export let data: PageData;
    let { supabase, session,userProfile } = data;
    import { page } from "$app/stores";
    import ChatMessage from '$components/ChatMessage.svelte';
    let roomCode = $page.params.room_code;
    let messageString = "";
    let element: HTMLDivElement
    let chatArray = [] as any[];
    function leaveRoom(){
        console.log("leave room");
    }
    function addMessage(message: string, self: boolean, username?: string,){
        chatArray.push({
            username: username ?? "username",
            message: message,
            self
        });
        messageString = "";
        chatArray = chatArray
    }
    afterUpdate(() => {
            console.log("afterUpdate");
            if(chatArray) scrollToBottom(element);
        });
    
        $: if(chatArray && element) {
            scrollToBottom(element);
        }

    const scrollToBottom = async (node:any) => {
        node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
    }; 
    
</script>

<svelte:head>
    <title>Regalore - [{roomCode}]</title>
</svelte:head>

<section class="w-full h-fit flex flex-col items-center relative">
    <div class="h-14 mt-10 max-w-4xl w-full flex justify-between bg-[#000000aa] rounded-lg rounded-b-none py-3 items-center px-16">
        <p>Room code: {roomCode}</p>
        <div class="divider vertical"></div>
        <p>Room name: {roomCode}</p>
        <div class="divider vertical"></div>
        <p>Memebers: 0</p>
        <div class="divider vertical"></div>
        <p>Online: 0</p>
        <!-- <div class="divider vertical"></div>
        <button class="btn danger solid  -ml-6 w-32">Leave</button> -->
    </div>
    <div bind:this={element} class="w-full max-w-4xl bg-[#000000aa] flex flex-col rounded-lg rounded-t-none pb-20 overflow-y-scroll pl-16 pr-14 space-y-2" style="height: 565px;" on:load={()=>{
        scrollToBottom(element);
    }}>
        {#each chatArray as chatMessage}
            <ChatMessage messageData={chatMessage} />
        {/each}
        
    </div> 
    <form class="absolute bottom-5 mx-auto flex w-full max-w-4xl px-3 items-center justify-center btn-group">
        <input class="w-full max-w-3xl flex-grow input platinum solid rounded-r-none" placeholder="Type here . . ." bind:value={messageString} />
        <button type="submit"  class="btn success sm solid rounded-l-none" on:click|preventDefault={()=>{
            addMessage(messageString, true);
        }}>send</button>
    </form>

</section>