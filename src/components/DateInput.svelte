<script lang="ts">
    export let data:Date;
    export let label:string;
    export let name:string;

</script>
<div class="input oxfordBlue solid col-span-full sm:col-span-2">
    <div style="color: #e5e5e5;" class="select-none">{label}</div>
    <div class="is-divider" style="background-color: #14213D;" />
    <input {name} type="date"  bind:value={data} />
    <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
    </svg>
</div>