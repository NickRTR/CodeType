<script>
	import { stats, exercise, practiceMode } from '$lib/stores';
	import { settings } from '$lib/persistentStores';
	import { onMount } from 'svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import generateExercise from '$lib/exercises/generator';

	let input = '';

	// generate new exercise on settings change
	settings.subscribe(() => {
		$exercise = generateExercise();
	});

	let startTime;
	let lastInput;

	$: AFK = false;

	$: {
		if (AFK == true)
			console.log(
				'Detected user being AFK. Therefore not persisting this exercise to the database.'
			);
	}

	exercise.subscribe(() => ((input = ''), (startTime = undefined)));

	// AFK detection
	onMount(() => {
		if (!AFK) {
			window.setInterval(function () {
				if (startTime === undefined || lastInput === undefined) return;
				const startToNow = new Date().getTime() - startTime.getTime();
				const startToLastInput = lastInput.getTime() - startTime.getTime();
				AFK = startToNow - startToLastInput > 5000;
				// if (AFK) {
				// 	if (confirm("Thinking about your next step? Small Hint, the next character you should type is the one in grey, located on the right side of your cursor ;).")) {
				// 		console.log("Resetting");
				// 		lastInput = undefined;
				// 		startTime = undefined;
				// 		input = "";
				// 	}
				// }
			}, 2000);
		}
	});

	function handleInput(event) {
		$practiceMode = true;

		// delete last letter on backspace
		if (event.key === 'Backspace') {
			// restrict deleting to the last word that was wrong
			let inputWords = input.split(' ');
			let exerciseWords = $exercise.split(' ');
			if (
				inputWords[inputWords.length - 2] !== exerciseWords[inputWords.length - 2] ||
				input[input.length - 1] !== ' '
			) {
				input = input.slice(0, -1);
			}
		}

		if (event.key.length > 1) return; // exit key codes like shift

		// on first input, set start time
		if (input.length === 0 && startTime === undefined) {
			startTime = new Date();
		}

		// on mistake, increase mistakes counter
		if (event.key !== $exercise[input.length]) {
			$stats.mistakes++;
			$stats.commonMistakes = [...$stats.commonMistakes, $exercise[input.length]];
		}

		input += event.key;

		lastInput = new Date();

		$stats.time = calcTime();
		$stats.WPM = calcWPM($stats.time);
		$stats.CPM = calcCPM($stats.time);

		if (input.length === $exercise.length) {
			submitInput();
		}
	}

	function submitInput() {
		$stats.accuracy = 100 - ($stats.mistakes / $exercise.length) * 100;

		// don't persist stats if user was afk to preserve statistic falsification
		if ($settings.persistStats && !AFK) persistStats();

		$practiceMode = false;

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
		const inputCharacters = input.split('');
		const exerciseCharacters = $exercise.split('');
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
		const inputWords = input.split(' ');
		const exerciseWords = $exercise.split(' ');
		for (let i = 0; i < exerciseWords.length; i++) {
			if (inputWords[i] === exerciseWords[i]) {
				wordCount++;
			}
		}
		const WPS = wordCount / time;
		return WPS * 60;
	}

	async function persistStats() {
		const res = await fetch('/api/persistStats', {
			method: 'POST',
			body: JSON.stringify({
				exercise: $exercise,
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
			console.log(data.error);
			toast.push('Error while persisting stats: ' + data.error);
		} else {
			console.log('Successfully saved stats.');
		}
	}
</script>

<svelte:window on:keydown={handleInput} />

<body>
	<form>
		<!-- <p id="input" class:animateCursor={input.length === 0}> -->
		<p id="input" class="animateCursor">
			{#each input as letter, i}
				{#if letter !== $exercise[i]}
					{#if $exercise[i] === ' '}
						<!-- &nbsp is a space -->
						<span class="incorrectLetter">_</span>
					{:else}
						<span class="incorrectLetter">{$exercise[i]}</span>
					{/if}
				{:else if letter === ' '}
					<span>&nbsp</span>
				{:else}
					<span>{letter}</span>
				{/if}
			{/each}
		</p>
		<p id="exercise">
			{#each $exercise.slice(input.length) as letter}
				{#if letter === ' '}
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
		border-right: 2px solid var(--accent);
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
