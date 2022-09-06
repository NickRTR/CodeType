<script>
	import Chart from "chart.js/auto";
	import { onMount } from "svelte";

	export let width;

	export let height;

	export let data;
	export let labels;
	export let titles;

	let canvas;

	onMount(() => {
		new Chart(canvas, {
			type: "line",
			data: {
				labels,
				datasets: [
					{
						label: titles[0],
						data: data[0],
						fill: true,
						backgroundColor: "rgba(255, 99, 132, .8)"
					},
					{
						label: titles[1],
						data: data[1],
						fill: true,
						backgroundColor: "rgba(54, 162, 235, .8)"
					},
					{
						label: titles[2],
						data: data[2],
						yAxisID: "B",
						fill: true,
						backgroundColor: "rgba(255, 206, 86, .8)"
					}
				]
			},
			options: {
				scales: {
					y: {
						title: {
							display: true,
							text: "WPM and CPM"
						}
					},
					B: {
						position: "right",
						beginAtZero: true,
						title: {
							display: true,
							text: "Mistakes"
						}
					}
				}
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
		background-color: var(--text);
		border-radius: 0.75rem;
	}
</style>
