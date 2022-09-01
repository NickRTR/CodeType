import supabase from "$lib/supabase";

export async function POST({ request }) {
	const form = await request.formData();
	const email = form.get("email");

	let errorMessage;

	// TODO: Add email validation
	if (!email || typeof email !== "string") {
		errorMessage = "Enter a valid email.";
	}

	const response = await supabase.auth.signIn({ email });

	if (response.error) {
		errorMessage = response.error;
	}

	if (errorMessage) {
		return {
			errors: {
				error: errorMessage
			}
		};
	}
}
