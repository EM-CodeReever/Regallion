<script lang="ts">
    import { goto } from "$app/navigation";
    export let isActive = false;
    export let title = "";
    export let linkTo = "";

</script>

<button class="cursor-pointer flex justify-start items-center font-semibold space-x-3 {isActive ? 'bg-gray-200' : 'hover:bg-oxfordBlue-600 hover:text-gray-300'} w-full p-3 rounded-lg relative"
on:click={()=>{
    goto(linkTo);
    let element = document.getElementById('drawer-left');
    element?.classList.remove('show');
}}>
    <slot />
    <p>{title}</p>
    {#if isActive}
    <span class="absolute w-1 h-9 rounded-tr-lg rounded-br-lg -left-3 top-1.5 bg-gray-800"></span>
    {/if}
  </button>