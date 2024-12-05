<script lang="ts">
  import type { LB_MemoryCards, Profile } from "@prisma/client";

export let records: (LB_MemoryCards & { Profile : Profile }) []

</script>

<div class="w-full">
    <script src="https://cdn.lordicon.com/lordicon.js"></script>
	<table class="table richBlack bordered">
		<thead>
			<tr>
				<th class="w-20"><p class="w-full text-center">Rank</p></th>
				<th>Name</th>
				<th>Score</th>
				<th class="hidden md:flex">Time</th>
			</tr>
		</thead>
		<tbody>
			<tr class="sunGold [&>*]:!text-xl">
                <td class="!p-0">
                    <lord-icon
                        src="https://cdn.lordicon.com/vttzorhw.json"
                        trigger="in"
                        delay="1000"
                        stroke="bold"
                        state="in-reveal"
                        colors="primary:#facc15,secondary:#facc15"
                        style="width:75px;height:75px"
                        class="ml-1">
                    </lord-icon>
                </td>
				<td>{(records[0] == undefined) ? '--' : records[0].Profile.username}</td>
				<td>{(records[0] == undefined) ? '--' : records[0].score}</td>
				<td class="hidden md:table-cell">{(records[0] == undefined) ? '--' : records[0].time}</td>
			</tr>
			<tr class="indigo [&>*]:!text-xl">
                <th class="!p-0">
                    <lord-icon
                        src="https://cdn.lordicon.com/aqpxuwsk.json"
                        trigger="in"
                        delay="500"
                        stroke="bold"
                        state="in-reveal"
                        colors="primary:#ab38ff,secondary:#ab38ff"
                        style="width:45px;height:45px"
                        class="ml-[18px]">
                        
                    </lord-icon></th>
                    <td>{(records[1] == undefined) ? '--' : records[1].Profile.username}</td>
                    <td>{(records[1] == undefined) ? '--' : records[1].score}</td>
                    <td class="hidden md:flex">{(records[1] == undefined) ? '--' : records[1].time}</td>
			</tr>
			<tr class="morningGreen [&>*]:!text-lg">
				<th class="!p-0">
                    <lord-icon
                        src="https://cdn.lordicon.com/dmjnplby.json"
                        trigger="in"
                        delay="0"
                        stroke="bold"
                        state="in-reveal"
                        colors="primary:#55e2da,secondary:#55e2da"
                        style="width:40px;height:40px"
                        class="ml-5">
                    </lord-icon>
                </th>
				<td>{(records[2] == undefined) ? '--' : records[2].Profile.username}</td>
				<td>{(records[2] == undefined) ? '--' : records[2].score}</td>
				<td class="hidden md:flex">{(records[2] == undefined) ? '--' : records[2].time}</td>
			</tr>
            
            {#each {length: 7} as _, i}
            <tr class="platinum">
				<th><p class="w-full text-center">{i + 4}</p></th>
				<td>{(records[i + 3] == undefined) ? '--' : records[i + 3].Profile.username}</td>
				<td>{(records[i + 3] == undefined) ? '--' : records[i + 3].score}</td>
				<td class="hidden md:flex">{(records[i + 3] == undefined) ? '--' : records[i + 3].time}</td>
			</tr>
            {/each}
		</tbody>
	</table>
    
</div>
