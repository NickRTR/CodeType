import supabase from "$lib/supabase";

export async function handle({ event, resolve }) {
	// console.log(supabase.auth.api.getUserByCookie());

	const userAgent = event.request.headers.get("user-agent");

	event.locals.desktop = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

	const response = await resolve(event);
	return response;
}

export function getSession(event) {
	return {
		desktop: event.locals.desktop
	};
}
