<script lang="ts">
    import Badge from '$components/Badge.svelte';
    import LabelledInput from '$components/LabelledInput.svelte';
    import type { PageData } from './$types';
    export let data: PageData;
    let { supabase, session,userProfile } = data;
    let roomCode = '';
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
        <button class="btn flex-grow w-full max-w-md solid morningGreen">Join Global Chat</button>
        <div class="divider richBlack max-w-md">or</div>
        <span class="grid w-full max-w-md gap-y-3 grid-cols-1">
            <LabelledInput label="Join with room code" placeholder="Enter a room code" name="CodeInput" />
            <button class="btn flex-grow w-full max-w-md solid oxfordBlue">Join</button>
        </span>

    </div>
</section>