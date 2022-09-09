import { redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
	cookies.set("auth", "", {
		path: "/",
		expires: new Date(0)
	});

	throw redirect(307, "/account/login");
}
