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

	let error;

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

		if (response.error) {
			error = response.error;
		}

		form.reset();
	}
</script>

<body>
	<h1>Login / Signup</h1>

	<p id="description">Enter your email address to login or signup. You will then receive an email, maybe tagged as spam, with a confirmation link.</p>

	<form on:submit|preventDefault={login} method="post" autocomplete="off">
		<div>
			<input id="email" name="email" placeholder="email" type="email" required />
		</div>

		{#if error}
			<p class="error">Error: {error}</p>
		{/if}

		<button type="submit">Login</button>
	</form>
</body>

<style>
	#description {
		max-width: 400px;
		margin-inline: auto;
	}

	input {
		border-radius: 0.7rem;
		border: 2px solid var(--text);
		padding: 0.2rem 0.25rem;
		outline: none;
		transition: border 0.1s ease-in-out;
		font-size: 0.95rem;
	}

	input:hover,
	input:focus {
		border-color: var(--accent);
	}

	button {
		font-size: 1rem;
		font-weight: bold;
		background-color: var(--accent);
		margin-top: 0.75rem;
		border-radius: 1rem;
		padding: 0.6rem 1.1rem;
		outline: none;
		border: none;
		box-shadow: none;
		transition: box-shadow 0.1s ease-in-out;
	}

	button:hover,
	button:focus {
		box-shadow: 1px 1px 5px white;
	}

	.error {
		color: tomato;
	}
</style>
