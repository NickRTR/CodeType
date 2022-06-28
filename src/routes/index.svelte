<script>
    // components
    import Input from "$lib/components/Input.svelte";

    // modules
    import { stats } from "$lib/stores";
    import { browser } from "$app/env";

    function onMobile() {
        if (browser) {
            return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        }
    }
</script>

<body>
    {#if !onMobile()}
        <header>
            <p>Time: {$stats.time}s</p>
            <p>Mistakes: {$stats.mistakes}</p>
            <p>WPM: {Math.round($stats.WPM)}</p>
            <p>CPM: {Math.round($stats.CPM)}</p>
        </header>
        <Input />
    {:else}
        <article class="mobile">
            <p>Please use this app on Desktop, unless you code on your phone...</p>
            <img src="https://yt3.ggpht.com/jdxaiUL9R7okC1RlM0XJaMiG5A67ED-UftUbZES8yR53qfjAVT15PucIE675Hc2Zr2N8yVc1Gg=s900-c-k-c0x00ffffff-no-rj" alt="The Rock" title="https://yt3.ggpht.com/jdxaiUL9R7okC1RlM0XJaMiG5A67ED-UftUbZES8yR53qfjAVT15PucIE675Hc2Zr2N8yVc1Gg=s900-c-k-c0x00ffffff-no-rj">
        </article>
    {/if}
</body>

<style>
    header {
        display: flex;
        justify-content: center;
    }

    header p {
        margin-inline: 1rem;
    }

    .mobile {
        margin-inline: 20px;
    }

    .mobile img {
        width: 50%;
        max-width: 200px;
    }
</style>