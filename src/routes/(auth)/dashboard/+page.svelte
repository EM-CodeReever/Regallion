<script lang="ts">
    import type { PageData } from '../dashboard/$types';
    import { onMount } from 'svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { page } from "$app/stores";  
    import { Club, DiamondPercent, House, LogOut, MessageSquareMore, Settings } from 'lucide-svelte';
  import RiddleBox from '$components/RiddleBox.svelte';
  import CompleteProfileModal from '$components/CompleteProfileModal.svelte';
    export let data: PageData;
    let { supabase, session, userProfile } = data;
    $: ({ supabase, session, userProfile } = data)

    let currentPath = $page.route.id;
    $: currentPath = $page.route.id;

    let completeProfileModal = false;
    let triggerContentLoadInAnimation = false;
    
    console.log(currentPath);

    onMount(()=>{
        triggerContentLoadInAnimation = true;
        if(!userProfile){
            completeProfileModal = true;
        }
    })


</script>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>
<Toaster />
<section class="w-full h-fit">
    
    <RiddleBox/>
    
</section>



  <div>
    {#if completeProfileModal}
      <CompleteProfileModal {session} bind:IsVisible={completeProfileModal} />
    {/if}
  </div>

