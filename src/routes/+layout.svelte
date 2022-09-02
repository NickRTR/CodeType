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
</style>
