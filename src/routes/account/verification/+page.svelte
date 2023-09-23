<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const token = $page.url.hash.substring(14).split('&')[0];

	onMount(async () => {
		if (token) {
			await fetch('/api/verification', {
				method: 'POST',
				body: JSON.stringify({ token })
			});
		}
	});
</script>

<h1>Waiting for verification...</h1>
