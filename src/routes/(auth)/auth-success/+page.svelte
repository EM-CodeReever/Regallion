<script lang="ts">
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<section class="text-white flex justify-center items-center space-y-5 flex-col">
    <h1 class="text-2xl text-center">Auth Success</h1>
    <p class="text-center">You have successfully authenticated</p>
    <button class="btn lg mx-auto solid grapePurple" on:click={()=>{goto('/dashboard')}}>Go To Dashboard</button>
</section>