import { writable } from "svelte/store";

export const stats = writable({
	time: 0,
	mistakes: 0,
	accuracy: 100,
	WPM: 0,
	CPM: 0
});

export function resetStats() {
	stats.set({
		time: 0,
		mistakes: 0,
		accuracy: 100,
		WPM: 0,
		CPM: 0
	});
}
