<script>
    import { stats, resetStats } from "$lib/stores";

    export let displayStats;
</script>

<body>
    <header>
        <p>Time: {$stats.time}s</p>
        <p>Mistakes: {$stats.mistakes}</p>
        <p>WPM: {Math.round($stats.WPM)}</p>
        <p>CPM: {Math.round($stats.CPM)}</p>

        <button type="button" on:click={() => {displayStats = false; resetStats()}}>Resume</button>
    </header>
</body>

<style>
    header {
        display: flex;
        justify-content: center;
    }

    header p {
        margin-inline: 1rem;
    }
</style>