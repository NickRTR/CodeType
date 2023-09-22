<script>
	import { practiceMode } from '$lib/stores';

	import Input from '$lib/components/Input.svelte';
	import Stats from '$lib/components/Stats.svelte';
</script>

<body>
	{#if $practiceMode}
		<Input />
	{:else}
		<Stats />
	{/if}
</body>
