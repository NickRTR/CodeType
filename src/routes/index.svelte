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

<svelte:window on:keydown={handleInput} />

<body>
    <h1>CodeType</h1>
    <p>Exercice: {exercice}</p>
    <p id="input" >
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

    #input {
        padding-block: .25rem;
        padding-right: .1rem;
        animation: blink 1.25s infinite;
        display: inline;
    }

    @keyframes blink {
        0% {
            border-right: 3px solid #ffc600;
        }

        50% {
            border-right: 3px solid #ffc60000;
        }

        100% {
            border-right: 3px solid #ffc600;
        }
    }
</style>