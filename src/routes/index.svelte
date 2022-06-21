<script>
    let exercice = "Hello World()!"

    let input = "";

    function handleInput(event) {
        // delete last letter on backspace
        if (event.key === "Backspace") {
            input = input.slice(0, -1);
        }

        if (event.key.length > 1) return; // exit key codes like shift

        if (event.key !== exercice[input.length] && event.key === " ") {
            input += "_" // add _ to show wrong spaces
        } else {
            input += event.key;
        }

        if (input.length === exercice.length) {
            submitInput();
        }
    }

    function submitInput() {
        if (input === exercice) {
            alert("100 points!");
            input = "";
        } else {
            alert("nope, 0 points.");

        }
    }
</script>

<svelte:window on:keydown={handleInput}/>

<body>
    <h1>CodeType</h1>
    <p>Exercice: {exercice}</p>
    <p>
        {#each input as letter, i}
            {#if letter !== exercice[i]}
                <span class="incorrect">{letter}</span>
            {:else}
                <span>{letter}</span>
            {/if}
        {/each}
    </p>
</body>

<style>
    .incorrect {
        color: tomato;
    }
</style>