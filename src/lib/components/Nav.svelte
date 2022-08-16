<script>
	import Divider from "$lib/components/Divider.svelte";
	import { settings } from "$lib/persistentStores";
</script>

<nav>
	<article>
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
		<h1>Syntype</h1>
		<a class="authentication" href="/auth" title="authentication">Auth</a>
	</article>
	<Divider />
</nav>

<style>
	article {
		display: grid;
		grid-template-columns: 1fr 2fr 1fr;
		align-items: center;
		padding-inline: 1rem;
	}

	h1 {
		text-align: center;
		margin-block: 0;
		font-size: 2rem;
	}

	.settings {
		margin: 0;
		display: flex;
		justify-content: left;
	}

	.authentication {
		display: flex;
		justify-content: right;
		color: var(--text);
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
