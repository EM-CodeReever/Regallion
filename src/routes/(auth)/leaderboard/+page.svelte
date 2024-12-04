<script lang="ts">
    import LeaderboardTable from '$components/LeaderboardTable.svelte';
    import { ArrowBigLeft, ArrowBigRight } from 'lucide-svelte';
    import type { PageData } from './$types';
    export let data: PageData
    data.lb_memory_cards

</script>

<svelte:head>
    <title>Leaderboard</title>
</svelte:head>

<section class="w-full h-full flex flex-col space-y-5">
    <div class="flex flex-col items-center space-y-3 lg:flex-row justify-between">
        <h1 class="text-3xl text-center lg:text-left lg:text-5xl">Top 10 Standings</h1>
        <div class="flex items-center space-x-3">
            <button class="btn light compact morningGreen xs"><ArrowBigLeft/></button>
            <div>
                Memory Cards
            </div>
            <button class="btn light compact morningGreen xs"><ArrowBigRight/></button>
        </div>
    </div>
<LeaderboardTable records={data.lb_memory_cards}/>
</section>


