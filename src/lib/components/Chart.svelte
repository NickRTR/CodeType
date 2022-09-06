<script>
	import Chart from "chart.js/auto";
	import { onMount } from "svelte";

	export let width;

	export let height;

	export let data;
	export let labels;
	export let title;

	let canvas;

	onMount(() => {
		new Chart(canvas, {
			type: "line",
			data: {
				labels,
				datasets: [
					{
						label: `${title}`,
						data,
						fill: true,
						backgroundColor: "#FFC60090"
					}
				]
			}
		});
	});
</script>

<figure style="width: {width}; heigth: {height}">
	<canvas id="chart" bind:this={canvas} />
</figure>

<style>
	figure {
		margin-left: auto;
	}

	figure canvas {
		background-color: white;
	}
</style>
