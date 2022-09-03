import supabase from "$lib/supabase";
import { parse } from "cookie";

export async function POST({ request }) {
	const stats = await request.json();

	const cookieString = request.headers.get("cookie");
	if (cookieString !== null) {
		const cookies = parse(cookieString);
		if (cookies.auth) {
			const user = await supabase.auth.api.getUser(cookies.auth);

			const { error } = await supabase.from("Stats").insert([
				{
					user_id: user.user.id,
					exercise: stats.exercise,
					input: stats.input,
					time: stats.time,
					mistakes: stats.mistakes,
					commonMistakes: stats.commonMistakes,
					accuracy: stats.accuracy,
					WPM: stats.WPM,
					CPM: stats.CPM
				}
			]);

			if (error) {
				return new Response(JSON.stringify({ error }));
			}

			return new Response(JSON.stringify({ success: "success" }));
		}
	}
	return new Response(JSON.stringify({ error: "Please login in order to persist stats." }));
}
