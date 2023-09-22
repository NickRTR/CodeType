import { redirect } from '@sveltejs/kit';

export async function load({ parent }) {
	const { desktop } = await parent();
	if (desktop === true) {
		throw redirect(302, '/');
	}
}
