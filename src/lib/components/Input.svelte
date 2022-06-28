<script>
    import { stats, resetStats } from "$lib/stores";

    export let submitted = false;

    let exercice = 'Hello World("Peter");'
    let input = "";

    let startTime;

    function handleInput(event) {
        submitted = false;

        // delete last letter on backspace
        if (event.key === "Backspace") {
            input = input.slice(0, -1);
        }

        // reset on esc
        if (event.key === "Escape") {
            input = "";
            resetStats();
        }

        if (event.key.length > 1) return; // exit key codes like shift

        // on first input, set start time
        if (input.length === 0 && startTime === undefined) {
            startTime = new Date();
        }

        // on mistake, increase mistakes counter
        if (event.key !== exercice[input.length]) {
            $stats.mistakes++;
        };

        input += event.key;

        $stats.time = calcTime();
        $stats.WPM = calcWPM($stats.time);
        $stats.CPM = calcCPM($stats.time);
        
        if (input.length === exercice.length) {
            submitInput();
        }
    }

    function submitInput() {     
        submitted = true;
        
        input = "";
        startTime = undefined;
    }

    function calcTime() {
        let finishTime = new Date();
        const time = (finishTime.getTime() - startTime.getTime()) / 1000;
        return time;
    }

    function calcCPM(time) {
        if (time < 0.1) return 0;
        let characterCount = 0;
        const inputCharacters = input.split("");
        const exerciceCharacters = exercice.split("");
        for (let i = 0; i < exerciceCharacters.length; i++) {
            if (inputCharacters[i] === exerciceCharacters[i]) {
                characterCount++;
            }
        }
        const CPS = characterCount / time;
        return CPS * 60;
    }

    function calcWPM(time) {
        if (time < 0.1) return 0;
        let wordCount = 0;
        const inputWords = input.split(" ");
        const exerciceWords = exercice.split(" ");
        for (let i = 0; i < exerciceWords.length; i++) {
            if (inputWords[i] === exerciceWords[i]) {
                wordCount++;
            }
        }
        const WPS = wordCount / time;
        return WPS * 60;
    }
</script>

<svelte:window on:keydown={handleInput} />

<body>
    <form>
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
    </form>
</body>

<style>
    form {
        display: inline-flex;
        padding-block: .25rem;
        margin-top: 1rem;
    }

    form p {
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