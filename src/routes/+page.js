import { redirect } from "@sveltejs/kit";

export async function load({ parent }) {
	const { desktop } = await parent();
	if (desktop === false) {
		throw redirect(302, "/mobile");
	}
}
