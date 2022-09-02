import { redirect } from "@sveltejs/kit";
import supabase from "$lib/supabase";

export async function POST({ request }) {
	const form = await request.formData();
	const email = form.get("email");

	const response = await supabase.auth.signIn({ email });

	if (response.error) {
		return {
			status: response.error.status,
			errors: {
				message: response.error.message
			}
		};
	}

	throw redirect(307, "/account");
}
