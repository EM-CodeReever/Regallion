<script lang="ts">
    export let data:string;
    export let label:string;
    export let name:string;
    export let placeholder:string = "";

</script>
<div class="input grapePurple solid col-span-full sm:col-span-2">
    <div style="color: #e5e7ebbb;" class="">{label}</div>
    <div class="is-divider" style="background-color: #8c07d9;" />
    <input {name} {placeholder} type="text" bind:value={data} />
    <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
    </svg>
</div>

<style>
    input::placeholder {
  color: #e5e7ebbb;
  opacity: 1; /* Firefox */
}
</style>