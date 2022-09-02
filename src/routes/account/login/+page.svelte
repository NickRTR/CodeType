<script>
	let error;
	let success;

	// this runs on the client when JavaScript is available
	// so we can just reuse the existing `error` and `success` props
	async function login(event) {
		// reset error and success messages
		error = undefined;
		success = undefined;

		const form = event.target;
		const res = await fetch(form.action, {
			method: form.method,
			body: new FormData(form),
			headers: { accept: "application/json" }
		});
		let response = await res.json();

		if (response.errors) {
			error = response.errors.message;
		} else {
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

		<button type="submit" title="Login">Login</button>

		{#if error}
			<p class="error">Error: {error}</p>
		{/if}

		{#if success}
			<p class="success">{success}</p>
		{/if}
	</form>
</body>

<style>
	body {
		max-width: 400px;
		margin-inline: auto;
	}

	#description {
		margin-block: 0;
	}

	input {
		border-radius: 0.7rem;
		border: 2px solid var(--text);
		padding: 0.2rem 0.25rem;
		outline: none;
		transition: border 0.1s ease-in-out;
		font-size: 0.95rem;
		margin-block: 0.75rem;
	}

	input:hover,
	input:focus {
		border-color: var(--accent);
	}

	.error {
		color: tomato;
		margin-block: 0.5rem;
	}

	.success {
		color: lime;
		margin-block: 0.5rem;
	}
</style>
