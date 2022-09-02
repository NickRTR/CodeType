<script>
	import Nav from "$lib/components/Nav.svelte";
	import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
	<title>Syntype</title>
</svelte:head>

<body>
	<Nav />

	<slot />

	<Footer />
</body>

<style>
	body {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	:global(:root) {
		--accent: #ffc600;
		--grey: grey;
		--background: black;
		--text: white;
	}

	:global(body) {
		margin: 0;
		background-color: var(--background);
		color: var(--text);
		font-family: Consolas, "Courier New", monospace;
		font-size: large;
		text-align: center;
	}

	/* Global button styles */
	:global(button) {
		cursor: pointer;
		border-radius: 1rem;
		padding: 0.6rem 0.7rem;
		font-weight: bold;
		font-size: 1rem;
		background-color: var(--accent);
		outline: none;
		border: none;
		transition: box-shadow 0.2s ease-in-out;
	}

	:global(button:is(:focus, :hover)) {
		box-shadow: 2px 3px 10px var(--grey);
	}
</style>
