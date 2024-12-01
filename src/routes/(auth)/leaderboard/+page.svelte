<script lang="ts">
    import LeaderboardTable from '$components/LeaderboardTable.svelte';
import type { PageData } from './$types';

</script>

<section class="w-full h-full flex flex-col space-y-5">
    <div class="">
        <h1 class="text-5xl">Leaderboard</h1>
        <div>

        </div>
    </div>
    
    <!-- <script src="https://cdn.lordicon.com/lordicon.js"></script>
<lord-icon
    src="https://cdn.lordicon.com/fwkrbvja.json"
    trigger="loop"
    stroke="bold"
    state="loop-oscillate"
    colors="primary:#ffffff,secondary:#ffffff"
    style="width:200px;height:200px">
</lord-icon>
<p class="text-center text-lg mt-3">Work in Progress. Coming soon!</p> -->
<LeaderboardTable/>
</section>


