<script>
	import { page } from "$app/stores";

	const token = new URLSearchParams($page.url.hash.substring(1)).get("access_token");

	if (token) {
		console.log("Access Token: " + token);
		setCookie();
	}

	async function setCookie() {
		fetch("/account/cookie", {
			method: "POST",
			body: JSON.stringify({ token })
		}).then(console.log("done"));
	}

	// these props are passed from the page endpoint
	// so the user can get feedback if JavaScript doesn't work
	export let errors;

	// this runs on the client when JavaScript is available
	// so we can just reuse the existing `error` and `success` props
	async function login(event) {
		const form = event.target;
		const res = await fetch(form.action, {
			method: form.method,
			body: new FormData(form),
			headers: { accept: "application/json" }
		});
		let response = await res.json();

		console.log(response);

		if (response.error) {
			errors.error = response.error;
		}

		form.reset();
	}
</script>

<form on:submit|preventDefault={login} method="post" autocomplete="off">
	<div>
		<label for="email">email</label>
		<input id="email" name="email" type="email" required />
	</div>

	{#if errors?.error}
		<p class="error">{errors.error}</p>
	{/if}

	<button type="submit">Login</button>
</form>

<style>
	.error {
		color: tomato;
	}
</style>
