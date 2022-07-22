<script>
	import Divider from "$lib/components/Divider.svelte";
	import { settings } from "$lib/stores";
</script>

<nav>
	<h1>Syntype</h1>
	<div class="settings">
		<p
			class="disabled"
			class:enabled={$settings.semicolon}
			on:click={() => {
				$settings.semicolon = !$settings.semicolon;
			}}
		>
			semicolon
		</p>
		<span class="settingsDivider" />
		<p
			on:click={() => {
				$settings.doubleQuotes = !$settings.doubleQuotes;
			}}
		>
			{#if $settings.doubleQuotes}
				double quotes
			{:else}
				single quotes
			{/if}
		</p>
	</div>
	<Divider />
</nav>

<style>
	h1 {
		margin-top: 0.8rem;
		margin-bottom: 0;
		font-size: 2rem;
	}

	.settings {
		margin: 0;
		display: flex;
		justify-content: center;
	}

	.settings p {
		text-decoration: underline;
		cursor: pointer;
		user-select: none;
	}

	.settings .disabled {
		color: gray;
	}

	.settings .enabled {
		color: var(--minor);
	}

	.settingsDivider {
		margin-inline: 1rem;
	}
</style>
