import { persisted } from 'svelte-local-storage-store';

export const settings = persisted('settings', {
	semicolon: true,
	doubleQuotes: false,
	persistStats: false
});
