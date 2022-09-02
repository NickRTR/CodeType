<script>
	import { stats, resetStats } from "$lib/stores";

	export let displayStats;

	function handleInput(event) {
		// generate new exercise and exit stats if esc, enter or space is pressed
		if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
			resume();
		}
	}

	function resume() {
		displayStats = false;
		resetStats();
	}
</script>

<svelte:window on:keydown={handleInput} />

<body>
	<main>
		<article>
			<p>Time: {$stats.time}s</p>
			<p>Mistakes: {$stats.mistakes}</p>
			<p>Accuracy: {Math.round($stats.accuracy)}%</p>
			<p>WPM: {Math.round($stats.WPM)}</p>
			<p>CPM: {Math.round($stats.CPM)}</p>
		</article>

		<section>
			<button
				type="button"
				title="Resume"
				on:click={() => {
					resume();
				}}
			>Resume</button>
		</section>
	</main>
</body>

<style>
	article {
		display: flex;
		justify-content: center;
	}

	article p {
		margin-inline: 1rem;
	}
</style>
