<script lang="ts">
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import toast from "svelte-french-toast";
  import { fly } from "svelte/transition";
  import LabelledInput from "./LabelledInput.svelte";
  import ChooseUsername from "./ChooseUsername.svelte";

    let profileUpdateLoading = false;
    let errorText = "";
    export let IsVisible: boolean;
    export let session: any;
</script>


<label for="modal" class="modal-overlay blur-bg show"></label>
    <!-- show class here will make modal visible -->

    <form in:fly={{delay:200, duration: 1500, y:300}} method="POST" action="?/updateProfile" class="modal bg-[#001220] rounded-md w-full lg:max-w-xl flex flex-col space-y-4 show" use:enhance={({})=>{
        return ({result})=>{
            if(result){
                profileUpdateLoading = false;
                IsVisible = false;
                toast.success('Successfully Updated Profile!')
                invalidateAll()
            }
            // update({reset: true})
        }
    }}>
      <h2 class="text-xl text-center font-semibold">Complete your profile</h2>
      <p class="font-extralight text-center">What should I call you?</p>
      <div class="grid grid-cols-2 gap-4">
        <!-- I dont know if this is the best way to do this, but I'm passing the session data to the form as hidden inputs -->
        <input type="text" name="sessionUserId" value={session?.user.id} class="hidden">
        <input type="text" name="sessionUserEmail" value={session?.user.email} class="hidden">
        <LabelledInput extraClasses="col-span-1" placeholder="Enter first name" name="firstName" label=""  />
        <LabelledInput  extraClasses="col-span-1" placeholder="Enter last name" name="lastName" label="" />
        <ChooseUsername  extraClasses="col-span-full" name="username" />
      </div>
      <div class="flex justify-between items-center">
        <p class="text-red-600 text-sm ml-2">{errorText}</p>
        <button class="btn light morningGreen {profileUpdateLoading? 'is-loading' : ''}" type="submit" on:click={()=>{profileUpdateLoading = !profileUpdateLoading}}>
            {#if !profileUpdateLoading}
            Done 👌
            {:else}
            Updating...
            {/if}
        </button>
      </div>
    </form>