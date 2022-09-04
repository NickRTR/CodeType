<script>
	let error;
	let success;

	let email = "";

	async function login() {
		// reset error and success messages
		error = undefined;
		success = undefined;

		const res = await fetch("/account/login", {
			method: "POST",
			body: JSON.stringify({ email }),
			headers: { accept: "application/json" }
		});

		let response;

		try {
			response = await res.json();
		} catch (error) {
			console.log(error);
			// Ignore "Unexpected end of JSON input" error
			if (error.message.includes("Unexpected end of JSON input")) {
				success = "Success 🚀!";
			} else {
				throw new Error(error);
			}
		}

		if (response.errors) {
			error = response.errors.message;
		} else {
			success = "Success 🚀!";
		}

		email = "";
	}
</script>

<body>
	<h1>Login / Signup</h1>

	<p id="description">Enter your email address to login or signup. You will then receive an email, maybe tagged as spam, with a confirmation link.</p>

	<form on:submit|preventDefault={login} autocomplete="off">
		<div>
			<input id="email" name="email" placeholder="email" type="email" bind:value={email} required />
		</div>

		<button type="submit" title="Login">Login</button>

		{#if success}
			<p class="success">{success}</p>
		{/if}

		{#if error}
			<p class="error">Error: {error}</p>
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

	button {
		padding: 0.6rem 1.1rem;
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
