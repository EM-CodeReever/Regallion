<script lang="ts">
    import Badge from '$components/Badge.svelte';
    import LabelledInput from '$components/LabelledInput.svelte';
  import { Globe, SquarePlus, ArrowBigRightDash } from 'lucide-svelte';
    import type { PageData } from './$types';
  import { goto } from '$app/navigation';
  import { enhance } from '$app/forms';
    export let data: PageData;
    let { supabase, session,userProfile } = data;
    let roomCode = '';
    let password = '';
    let errorText = '';
</script>
<svelte:head>
    <title>Regalore - Chat Room</title>
</svelte:head>
<section class="w-full flex flex-col justify-center space-y-16">
    <span class="flex flex-col items-center space-y-3 ">
        <h1 class="text-7xl font-semibold">Regalore</h1>
        <p >Welcome to the chat room (coming soon)</p>
    </span>
    <div class="flex flex-col justify-center items-center space-y-3 w-full">
        <span class="flex space-x-2 w-full max-w-md">
            <button class="btn flex-grow w-full max-w-md solid bw">Join Global Chat
                <Globe size="20" />
            </button>
            <button class="btn flex-grow w-full max-w-md solid oxfordBlue">Create a room
                <SquarePlus size="20" />
            </button>

        </span>
        <div class="divider info max-w-md">or</div>
        <form  method="POST" action="?/validateRoom" class="grid w-full max-w-md gap-y-3 grid-cols-1" use:enhance>
            <input type="text" class="input morningGreen solid placeholder:text-gray-300" name="room_code" placeholder="Enter a room code" bind:value={roomCode} />
            <input type="text" class="input morningGreen solid placeholder:text-gray-300" name="password" placeholder="Password" bind:value={password} />
            <button type="submit" class="btn flex-grow w-full max-w-md solid morningGreen">Join Room 
                <ArrowBigRightDash />
            </button>
            <p class="text-orangeWeb-800  text-center">{errorText}</p>
        </form>
    </div>
</section>