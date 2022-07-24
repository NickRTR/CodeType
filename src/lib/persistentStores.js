import { writable } from "svelte-local-storage-store";

export const settings = writable("settings", {
	semicolon: true,
	doubleQuotes: false
});
