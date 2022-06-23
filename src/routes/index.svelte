<script>
    import { browser } from "$app/env";

    function onMobile() {
        if (browser) {
            return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        }
    }

    let exercice = 'Hello World("Daddy");'
    let input = "";

    // stats
    let stats = {
        time: "",
        WPM: "",
        CPM: ""
    };
    let startTime;
    let mistakes = 0;

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
        const time = calcTime();

        stats = {
            time: time,
            WPM: calcWPM(time),
            CPM: calcCPM(time)
        }

        console.log(stats);
        
        input = "";
        startTime = undefined;
    }

    function calcTime() {
        let finishTime = new Date();
        const time = (finishTime.getTime() - startTime.getTime()) / 1000;
        return time;
    }

    function calcCPM(time) {
        let characterCount = 0;
        const inputCharacters = input.split("");
        const exerciceCharacters = exercice.split("");
        for (let i = 0; i < exerciceCharacters.length; i++) {
            if (inputCharacters[i] === exerciceCharacters[i]) {
                characterCount++;
            }
        }
        const CPS = characterCount / time;
        const CPM = CPS * 60;
        return CPM;
    }

    function calcWPM(time) {
        let wordCount = 0;
        const inputWords = input.split(" ");
        const exerciceWords = exercice.split(" ");
        for (let i = 0; i < exerciceWords.length; i++) {
            if (inputWords[i] === exerciceWords[i]) {
                wordCount++;
            }
        }
        const WPS = wordCount / time;
        const WPM = WPS * 60;
        return WPM;
    }
</script>

<svelte:window on:keydown={handleInput} />

<body>
    {#if !onMobile()}
        <header>
            <p>Time: {stats.time}s</p>
            <p>WPM: {Math.round(stats.WPM)}</p>
            <p>CPM: {Math.round(stats.CPM)}</p>
        </header>
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

    .mobile {
        margin-inline: 20px;
    }

    .mobile img {
        width: 50%;
        max-width: 200px;
    }

    @keyframes blink {
        50% {
            border-color: transparent;
        }
    }
</style>