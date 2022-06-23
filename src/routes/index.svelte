<script>
    import { browser } from "$app/env";

    function onMobile() {
        if (browser) {
            return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        } else {
            return true;
        }
    }

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
    {#if !onMobile()}
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
    {:else}
        <article class="mobile">
            <p>Please use this app on Desktop, unless you code on your phone...</p>
            <img src="https://yt3.ggpht.com/jdxaiUL9R7okC1RlM0XJaMiG5A67ED-UftUbZES8yR53qfjAVT15PucIE675Hc2Zr2N8yVc1Gg=s900-c-k-c0x00ffffff-no-rj" alt="The Rock" title="https://yt3.ggpht.com/jdxaiUL9R7okC1RlM0XJaMiG5A67ED-UftUbZES8yR53qfjAVT15PucIE675Hc2Zr2N8yVc1Gg=s900-c-k-c0x00ffffff-no-rj">
        </article>
    {/if}
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

    .mobile {
        margin-inline: 20px;
    }

    .mobile img {
        width: 50%;
    }

    @keyframes blink {
        50% {
            border-color: transparent;
        }
    }
</style>