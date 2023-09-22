<script>
	import { stats } from '$lib/stores';
	import Divider from '$lib/components/Divider.svelte';
</script>

<footer>
	<Divider />
	<main>
		<div class="liveStats">
			<p>Mistakes: {$stats.mistakes}</p>
		</div>
		<p>©2023 Nick Reutlinger</p>
	</main>
</footer>

<style>
	main {
		padding: 0.5rem;
	}

	p {
		margin: 0;
		line-height: 2rem;
	}

	.liveStats {
		display: flex;
		justify-content: center;
	}
</style>
