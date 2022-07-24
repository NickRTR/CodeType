<script>
	import { stats, resetStats } from "$lib/stores";

	export let displayStats;
</script>

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
				on:click={() => {
					displayStats = false;
					resetStats();
				}}>Resume</button
			>
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

	section button {
		cursor: pointer;
		border-radius: 1rem;
		padding: 0.5rem;
		font-weight: bold;
		font-size: 1rem;
		background-color: var(--accent);
		outline: none;
		border: none;
		transition: box-shadow 0.2s ease-in;
	}

	section button:is(:focus, :hover) {
		box-shadow: 2px 3px 10px var(--grey);
	}
</style>
