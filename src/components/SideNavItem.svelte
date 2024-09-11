<script lang="ts">
    import { goto } from "$app/navigation";
    export let isActive = false;
    export let title = "";
    export let linkTo = "";

</script>

<button class="cursor-pointer flex justify-start items-center font-semibold space-x-3 {isActive ? 'bg-oxfordBlue-200' : 'hover:bg-gray-300 hover:text-gray-800'} w-full p-3 rounded-lg relative"
on:click={()=>{
    goto(linkTo);
    let element = document.getElementById('drawer-left');
    element?.classList.remove('show');
}}>
    <slot />
    <p>{title}</p>
    {#if isActive}
    <span class="absolute w-1 h-9 rounded-tr-lg rounded-br-lg -left-3 top-1.5 bg-gray-300"></span>
    {/if}
  </button>