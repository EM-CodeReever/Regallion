<script lang="ts">
  import { goto } from "$app/navigation";


    
</script>

<section class="w-full h-fit">
    <div class="w-full flex justify-center items-center">
        <span class="flex flex-col items-center space-y-3 ">
            <script src="https://cdn.lordicon.com/lordicon.js"></script>
<lord-icon
    src="https://cdn.lordicon.com/lltgvngb.json"
    trigger="in"
    delay="0"
    state="in-reveal"
    colors="primary:#ffffff,secondary:#ffffff"
    style="width:200px;height:200px">
</lord-icon>
            <h1 class="text-5xl font-semibold">Room Not Found</h1>
            <p >Invalid room code, double check to ensure you got it right</p>
            <button class="btn flex-grow w-full max-w-md solid oxfordBlue" on:click={()=>{goto("/chat-room")}}>Return to Chat Home
            </button>
        </span>
    </div>
</section>