<script>
	import { page } from "$app/stores";

	const token = new URLSearchParams($page.url.hash.substring(1)).get("access_token");

	if (token) {
		setCookie();
	}

	async function setCookie() {
		fetch("/api/verification", {
			method: "POST",
			body: JSON.stringify({ token })
		});
	}
</script>

<h1>Waiting for verification...</h1>
