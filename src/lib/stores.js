import { writable } from 'svelte/store';
import generateExercise from '$lib/exercises/generator';

export const exercise = writable(generateExercise(false));

export const practiceMode = writable(true);

export const stats = writable({
	time: 0,
	mistakes: 0,
	commonMistakes: [],
	accuracy: 100,
	WPM: 0,
	CPM: 0
});

export function resetStats() {
	stats.set({
		time: 0,
		mistakes: 0,
		commonMistakes: [],
		accuracy: 100,
		WPM: 0,
		CPM: 0
	});
}
