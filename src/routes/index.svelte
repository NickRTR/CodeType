<script>
    let exercice = 'Hello Word("Mommy");'
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
        console.log(startTime.getMilliseconds());
        console.log(finishTime.getMilliseconds());
        let time = (finishTime.getTime() - startTime.getTime()) / 1000;
        console.log("WPM: " + calcWPM(time));
        console.log("Time: " + time + "s");
        console.log("Mistakes: " + mistakes);

        input = "";
        startTime = undefined;
    }

    function calcWPM(time) {
        const wordCount = exercice.split(" ").length;
        const WPS = wordCount / time;
        const WPM = WPS * 60;
        return WPM;
    }
</script>

<svelte:window on:keydown={handleInput} />

<body>
    <main>
        <p id="input" class:animateCursor={input.length === 0}>
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
    }

    #input {
        border-right: 2px solid #ffc600;
        /* normalize the moving cursor */
        margin-right: -2px;
    }
    
    .animateCursor {
        animation: blink 1.5s cubic-bezier(.215, .61, .355, 1) forwards infinite;
    }

    .incorrectLetter {
        color: red;
    }

    .exerciceLetter {
        color: gray;
    }

    @keyframes blink {
        50% {
            border-color: transparent;
        }
    }
</style>