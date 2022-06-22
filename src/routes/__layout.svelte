<script>
    import Nav from "$lib/components/Nav.svelte";
</script>

<body>
    <Nav />

    <slot></slot>
</body>

<style>
    :global(:root) {
        --accent: #FFC600;
        --accentTransparent: #FFC60000;
        --background: white;
        --text: black;
    }

    :global(body) {
        margin: 0;
        background-color: var(--background);
        color: var(--text);
        font-family: Consolas;
        font-size: large;
        text-align: center;
    }
</style>