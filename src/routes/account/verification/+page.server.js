import * as cookie from "cookie";
import { redirect } from "@sveltejs/kit";

export async function POST({ request, setHeaders }) {
	const { token } = await request.json();

	setHeaders({
		"Set-Cookie": cookie.serialize("auth", token, {
			// send cookie for every page
			path: "/",
			// server side only cookie so you can"t use `document.cookie`
			httpOnly: true,
			// only requests from same site can send cookies
			// and serves to protect from CSRF
			// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
			sameSite: "strict",
			// only sent over HTTPS
			secure: process.env.NODE_ENV === "production",
			// set cookie to expire after a month
			maxAge: 60 * 60 * 24 * 30
		})
	});

	throw redirect(307, "/account");
}
