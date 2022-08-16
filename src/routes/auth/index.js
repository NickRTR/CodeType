// import * as cookie from "cookie";

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
			status: 400,
			body: {
				error: errorMessage
			}
		};
	}

	return {
		status: 200,
		body: {
			success: "Success, look into your inbox."
		}
		// headers: {
		// 	"Set-Cookie": cookie.serialize("session", user.userAuthToken, {
		// 		// send cookie for every page
		// 		path: "/",
		// 		// server side only cookie so you can"t use `document.cookie`
		// 		httpOnly: true,
		// 		// only requests from same site can send cookies
		// 		// and serves to protect from CSRF
		// 		// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
		// 		sameSite: "strict",
		// 		// only sent over HTTPS
		// 		secure: process.env.NODE_ENV === "production",
		// 		// set cookie to expire after a month
		// 		maxAge: 60 * 60 * 24 * 30
		// 	})
		// }
	};
}
