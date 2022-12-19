<script>
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	const token = new URLSearchParams($page.url.hash.substring(1)).get("access_token");

	onMount(async () => {
		if (token) {
			await fetch("/api/verification", {
				method: "POST",
				body: JSON.stringify({ token })
			});
		}
	});
</script>

<h1>Waiting for verification...</h1>
