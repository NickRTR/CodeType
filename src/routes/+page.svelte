<script>
	import Input from "$lib/components/Input.svelte";
	import Stats from "$lib/components/Stats.svelte";
	import { page } from "$app/stores";

	console.log($page.url.hash);

	let displayStats = false;
</script>

<body>
	{#if displayStats}
		<Stats bind:displayStats />
	{:else}
		<Input bind:submitted={displayStats} />
	{/if}
</body>
