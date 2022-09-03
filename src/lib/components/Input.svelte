<script>
	import { stats } from "$lib/stores";
	import { settings } from "$lib/persistentStores";
	import generateExercise from "$lib/exercises/generator";

	export let submitted = false;

	let input = "";

	let exercise = generateExercise();

	// generate new exercise on settings change
	settings.subscribe(() => {
		exercise = generateExercise();
		input = "";
	});

	let startTime;

	function handleInput(event) {
		submitted = false;

		// delete last letter on backspace
		if (event.key === "Backspace") {
			// restrict deleting to the last word that was wrong
			let inputWords = input.split(" ");
			let exerciseWords = exercise.split(" ");
			if (inputWords[inputWords.length - 2] !== exerciseWords[inputWords.length - 2] || input[input.length - 1] !== " ") {
				input = input.slice(0, -1);
			}
		}

		// reset on esc
		if (event.key === "Escape") {
			input = "";
			exercise = generateExercise();
		}

		if (event.key.length > 1) return; // exit key codes like shift

		// on first input, set start time
		if (input.length === 0 && startTime === undefined) {
			startTime = new Date();
		}

		// on mistake, increase mistakes counter
		if (event.key !== exercise[input.length]) {
			$stats.mistakes++;
			$stats.commonMistakes = [...$stats.commonMistakes, exercise[input.length]];
		}

		input += event.key;

		$stats.time = calcTime();
		$stats.WPM = calcWPM($stats.time);
		$stats.CPM = calcCPM($stats.time);

		if (input.length === exercise.length) {
			submitInput();
		}
	}

	function submitInput() {
		if ($settings.persistStats) persistStats();

		submitted = true;

		$stats.accuracy = 100 - ($stats.mistakes / exercise.length) * 100;

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
		const exerciseCharacters = exercise.split("");
		for (let i = 0; i < exerciseCharacters.length; i++) {
			if (inputCharacters[i] === exerciseCharacters[i]) {
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
		const exerciseWords = exercise.split(" ");
		for (let i = 0; i < exerciseWords.length; i++) {
			if (inputWords[i] === exerciseWords[i]) {
				wordCount++;
			}
		}
		const WPS = wordCount / time;
		return WPS * 60;
	}

	async function persistStats() {
		const res = await fetch("/api/persistStats", {
			method: "POST",
			body: JSON.stringify({
				exercise,
				input,
				time: $stats.time,
				mistakes: $stats.mistakes,
				commonMistakes: $stats.commonMistakes,
				accuracy: $stats.accuracy,
				WPM: $stats.WPM,
				CPM: $stats.CPM
			})
		});

		const data = await res.json();

		if (data.error) {
			// TODO: Use Notification Toasts
			alert("Error while persisting stats: " + data.error);
		} else {
			console.log("Successfully saved stats.");
		}
	}
</script>

<svelte:window on:keydown={handleInput} />

<body>
	<form>
		<!-- <p id="input" class:animateCursor={input.length === 0}> -->
		<p id="input" class="animateCursor">
			{#each input as letter, i}
				{#if letter !== exercise[i]}
					{#if exercise[i] === " "}
						<!-- &nbsp is a space -->
						<span class="incorrectLetter">_</span>
					{:else}
						<span class="incorrectLetter">{exercise[i]}</span>
					{/if}
				{:else if letter === " "}
					<span>&nbsp</span>
				{:else}
					<span>{letter}</span>
				{/if}
			{/each}
		</p>
		<p id="exercise">
			{#each exercise.slice(input.length) as letter}
				{#if letter === " "}
					<span class="exerciseLetter">&nbsp</span>
				{:else}
					<span class="exerciseLetter">{letter}</span>
				{/if}
			{/each}
		</p>
	</form>
</body>

<style>
	form {
		display: inline-flex;
		padding-block: 0.25rem;
	}

	form p {
		margin: 0;
		font-size: 1.5rem;
		user-select: none;
	}

	#input {
		border-right: 2px solid #ffc600;
		/* normalize cursor */
		margin-inline: -1px;
	}

	.animateCursor {
		animation: blink 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) forwards infinite;
	}

	.incorrectLetter {
		color: red;
	}

	.exerciseLetter {
		color: var(--grey);
	}

	@keyframes blink {
		50% {
			border-color: transparent;
		}
	}
</style>
