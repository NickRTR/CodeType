import { redirect, error } from '@sveltejs/kit';
import supabase from '$lib/supabase';

export async function load({ parent }) {
	const { user } = await parent();
	if (!user) {
		throw redirect(307, '/account/login');
	}

	let { data, error: err } = await supabase.from('Stats').select('*');

	if (err) {
		throw error(400, err.message);
	}

	return {
		stats: data,
		user
	};
}
