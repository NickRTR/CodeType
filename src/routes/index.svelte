<script>
    let key = "";

    function handleInput(event) {
        console.log(event.key);
        key = event.key
    }
</script>

<svelte:window on:keydown={handleInput}/>

<body>
    <h1>CodeType</h1>
    <p>Current key: {key}</p>
</body>