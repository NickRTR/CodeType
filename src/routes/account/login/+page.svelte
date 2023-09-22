<script>
	import { enhance } from '$app/forms';

	export let form;
</script>

<body>
	<h1>Login / Signup</h1>

	<p id="description">
		Enter your email address to login or signup. You will then receive an email, maybe tagged as
		spam, with a confirmation link.
	</p>

	<form method="POST" use:enhance autocomplete="off">
		<input
			id="email"
			name="email"
			placeholder="email"
			type="email"
			value={form?.email ?? ''}
			required
		/><br />

		<button type="submit" title="Login">Login</button>

		{#if form?.error}<p class="error">Error: {form.error}</p>{/if}

		{#if form?.success}
			<p class="success">Success! 🎉</p>
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
