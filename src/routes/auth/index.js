// import * as cookie from "cookie";

import supabase from "$lib/supabase";

export async function POST({ request }) {
	const form = await request.formData();
	const email = form.get("email");

	if (typeof email !== "string") {
		return {
			status: 400,
			body: {
				error: "Enter a valid email."
			}
		};
	}

	if (!email) {
		return {
			status: 400,
			body: {
				error: "email is required."
			}
		};
	}

	const response = await supabase.auth.signIn({ email });

	if (response.error) {
		return {
			status: 400,
			body: {
				error: response.error
			}
		};
	}

	return {
		status: 200,
		body: {
			success: "Success, Look into your inbox."
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
