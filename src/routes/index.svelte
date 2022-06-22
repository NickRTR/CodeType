<script>
    let exercice = "Hello World()!"
    let input = "";

    // stats
    let mistakes = 0;
    let startTime;

    function handleInput(event) {
        // delete last letter on backspace
        if (event.key === "Backspace") {
            input = input.slice(0, -1);
        }

        if (event.key.length > 1) return; // exit key codes like shift

        // on first input, set start time
        if (input.length === 0 && startTime === undefined) {
            startTime = new Date();
        }

        // on mistake, increase mistakes counter
        if (event.key !== exercice[input.length - 1]) mistakes++;
        
        input += event.key;

        if (input.length === exercice.length) {
            submitInput();
        }
    }

    function submitInput() {
        let finishTime = new Date();
        let timer = finishTime.getSeconds() - startTime.getSeconds();
        console.log("Time: " + timer);
        console.log("Mistakes: " + mistakes);

        input = "";
        startTime = undefined;
    }
</script>

<svelte:window on:keydown={handleInput} />

<body>
    <main>
        <p id="input" >
            {#each input as letter, i}
                {#if letter !== exercice[i]}
                    {#if exercice[i] === " "}
                        <!-- &nbsp is a space -->
                        <span class="incorrectLetter">_</span>
                    {:else}
                        <span class="incorrectLetter">{exercice[i]}</span>
                    {/if}
                {:else}
                    {#if letter === " "}
                        <span>&nbsp</span>
                    {:else}
                        <span>{letter}</span>
                    {/if}
                {/if}
            {/each}
        </p>
        <p id="exercice">
            {#each exercice.slice(input.length) as letter}
                {#if letter === " "}
                    <span class="exerciceLetter">&nbsp</span>
                {:else}
                    <span class="exerciceLetter">{letter}</span>
                {/if}
            {/each}
        </p>
    </main>
</body>

<style>
    main {
        display: inline-flex;
        padding-block: .25rem;
        margin-top: 1rem;
    }

    main p {
        margin: 0;
        letter-spacing: .025rem;
    }

    #input {
        border-right: 2px solid transparent;
        animation: blink 1.5s cubic-bezier(.215, .61, .355, 1) forwards infinite;
        /* outplay the moving cursor */
        margin-right: -2px; 
    }

    .incorrectLetter {
        color: red;
    }

    .exerciceLetter {
        color: gray;
    }

    @keyframes blink {
        50% {
            border-color: #ffc600;
        }
    }
</style>