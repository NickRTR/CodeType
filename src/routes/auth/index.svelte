<script context="module">
	export function load({ session, props }) {
		if (session.user) {
			return {
				status: 302,
				redirect: "/"
			};
		}

		return { props };
	}
</script>

<script>
	import { session } from "$app/stores";

	// these props are passed from the page endpoint
	// so the user can get feedback if JavaScript doesn't work
	export let error;

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
			error = response.error;
		}

		$session.user = response.user;

		form.reset();
	}
</script>

<form on:submit|preventDefault={login} method="post" autocomplete="off">
	<div>
		<label for="email">email</label>
		<input id="email" name="email" type="email" required />
	</div>

	{#if error}
		<p class="error">{error}</p>
	{/if}

	<button type="submit">Login</button>
</form>

<style>
	.error {
		color: tomato;
	}
</style>
