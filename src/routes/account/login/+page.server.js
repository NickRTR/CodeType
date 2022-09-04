import { redirect } from "@sveltejs/kit";
import supabase from "$lib/supabase";

export async function load({ parent }) {
	const { user } = await parent();
	if (user) {
		throw redirect(307, "/account");
	}
}

export async function POST({ request }) {
	const { email } = await request.json();

	const response = await supabase.auth.signIn({ email });

	if (response.error) {
		return {
			status: response.error.status,
			errors: {
				message: JSON.stringify(response.error.message)
			}
		};
	}
}
