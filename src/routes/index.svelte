<script context="module">
	export async function load({ session }) {
		try {
			if (session.desktop === false) {
				throw new Error("mobile not supported");
			}
		} catch (error) {
			console.log(error);
			return {
				status: 304,
				redirect: "/mobile"
			};
		}
	}
</script>

<script>
	import Input from "$lib/components/Input.svelte";
	import Stats from "$lib/components/Stats.svelte";

	let displayStats = false;
</script>

<body>
	{#if displayStats}
		<Stats bind:displayStats />
	{:else}
		<Input bind:submitted={displayStats} />
	{/if}
</body>
