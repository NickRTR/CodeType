<script>
    import Nav from "$lib/components/Nav.svelte";
    import Footer from "../lib/components/Footer.svelte";
</script>

<body>
    <Nav />

    <main><slot></slot></main>

    <Footer />
</body>

<style>
    body {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    :global(:root) {
        --accent: #FFC600;
        --accentTransparent: #FFC60000;
        --background: black;
        --text: white;
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