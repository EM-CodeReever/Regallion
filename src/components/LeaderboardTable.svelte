<script lang="ts">
  import GradientText from "./GradientText.svelte";


</script>

<div class="w-full">
	<table class="table morningGreen bordered">
		<thead>
			<tr>
				<th>Rank</th>
				<th>Name</th>
				<th>Score</th>
				<th>Date</th>
			</tr>
		</thead>
		<tbody>
			<tr >
				<th><GradientText classlist="text-yellow-500" text="1"/></th>
				<td><GradientText classlist="text-yellow-500" text="E-Morrison"/></td>
				<td><GradientText classlist="text-yellow-500" text="720"/></td>
				<td><GradientText classlist="text-yellow-500" text="1-12-2024"/></td>
			</tr>
			<tr class="indigo">
                <th>2</th>
				<td>idev</td>
				<td>600</td>
				<td>1-12-2024</td>
			</tr>
			<tr class="oxfordBlue">
				<th>3</th>
				<td>Developer</td>
				<td>600</td>
				<td>1-12-2024</td>
			</tr>
            
            {#each {length: 7} as _, i}
            <tr class="platinum">
				<th>{i + 4}</th>
				<td>Sample Username</td>
				<td>55{i}</td>
				<td>1-12-2024</td>
			</tr>
            {/each}
		</tbody>
	</table>
    
</div>

