import { redirect } from "@sveltejs/kit";
import supabase from "$lib/supabase";

export async function load({ cookies }) {
	await supabase.auth.signOut();

	cookies.set("auth", "", {
		path: "/",
		expires: new Date(0)
	});

	throw redirect(307, "/account/login");
}
