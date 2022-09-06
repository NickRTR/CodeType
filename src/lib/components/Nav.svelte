<script>
	import { settings } from "$lib/persistentStores";
	import { page } from "$app/stores";

	import Divider from "$lib/components/Divider.svelte";
</script>

<nav>
	<article>
		<aside class="settings">
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
				class="disabled"
				class:enabled={$settings.persistStats}
				on:click={() => {
					$settings.persistStats = !$settings.persistStats;
				}}
			>
				persistStats
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
		</aside>
		<h1><a href="/" title="Home" sveltekit-data-prefetch>Syntype</a></h1>
		<aside class="authentication">
			{#if $page.data.user}
				<a href="/account" title="authentication" sveltekit-data-prefetch>Dashboard</a>
				<span class="authDivider" />
				<a href="/account/logout" title="logout" sveltekit-data-prefetch>Logout</a>
			{:else}
				<a href="/account/login" title="login" sveltekit-data-prefetch>Login</a>
			{/if}
		</aside>
	</article>
	<Divider />
</nav>

<style>
	article {
		display: grid;
		grid-template-columns: 2fr 1fr 2fr;
		align-items: center;
		padding-inline: 1rem;
	}

	h1 {
		text-align: center;
		margin-block: 0;
		font-size: 2rem;
	}

	h1 a {
		color: var(--text);
		text-decoration: none;
	}

	.settings {
		margin: 0;
		display: flex;
		justify-content: left;
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
		margin-inline: 0.5rem;
	}

	.authentication {
		display: flex;
		justify-content: right;
	}

	.authentication a {
		color: var(--text);
	}

	.authDivider {
		margin-inline: 0.25rem;
	}
</style>
