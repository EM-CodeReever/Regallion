<script lang="ts">
  import {  } from "lucide-svelte";

    export let label:string;
    export let name:string;
    export let placeholder:string = "";
    export let extraClasses:string = "";

</script>
<div class="input morningGreen solid rounded-md select-none {extraClasses}">
    <div style="color: #E5E5E5;" class="select-none">{label}</div>
    <input {name} {placeholder} type="text" />
    
</div>

<style>
    input::placeholder {
  color: #e5e7ebbb;
  opacity: .75; /* Firefox */
}
</style>