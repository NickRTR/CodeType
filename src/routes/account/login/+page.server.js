import { redirect, invalid } from '@sveltejs/kit';
import supabase from '$lib/supabase';

export async function load({ parent }) {
	const { user } = await parent();
	if (user) {
		throw redirect(307, '/account');
	}
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email');

		if (!email) {
			return invalid(400, { error: 'Please enter a valid email.' });
		}

		const response = await supabase.auth.signInWithOtp({ email });

		if (response.error) {
			return invalid(400, { error: JSON.stringify(response.error.message) });
		}

		return {
			success: true
		};
	}
};
