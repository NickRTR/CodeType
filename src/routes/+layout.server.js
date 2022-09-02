import { parse } from "cookie";
import supabase from "$lib/supabase";

export async function load({ request }) {
	const userAgent = request.headers.get("user-agent");
	const desktop = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

	const cookieString = request.headers.get("cookie");
	if (cookieString !== null) {
		const cookies = parse(cookieString);
		if (cookies.auth) {
			const user = await supabase.auth.api.getUser(cookies.auth);
			return {
				user: {
					email: user.user.email,
					id: user.user.id
				},
				desktop
			};
		}

		return {
			desktop
		};
	}
}
