<script>
    // components
    import Input from "$lib/components/Input.svelte";
    import Stats from "$lib/components/Stats.svelte";

    // modules
    import { browser } from "$app/env";

    let displayStats = false;

    function onMobile() {
        if (browser) {
            return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        }
    }
</script>

<body>
    {#if !onMobile()}
        {#if displayStats}
            <Stats bind:displayStats />
        {:else}
            <Input bind:submitted={displayStats} />
        {/if}
    {:else}
        <article class="mobile">
            <p>Please use this app on Desktop, unless you code on your phone...</p>
            <img src="https://yt3.ggpht.com/jdxaiUL9R7okC1RlM0XJaMiG5A67ED-UftUbZES8yR53qfjAVT15PucIE675Hc2Zr2N8yVc1Gg=s900-c-k-c0x00ffffff-no-rj" alt="The Rock" title="https://yt3.ggpht.com/jdxaiUL9R7okC1RlM0XJaMiG5A67ED-UftUbZES8yR53qfjAVT15PucIE675Hc2Zr2N8yVc1Gg=s900-c-k-c0x00ffffff-no-rj">
        </article>
    {/if}
</body>

<style>
    .mobile {
        margin-inline: 20px;
    }

    .mobile img {
        width: 50%;
        max-width: 200px;
    }
</style>