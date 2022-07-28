export async function handle({ event, resolve }) {
	// const userAgent = event.request.headers.get("user-agent");

	// event.locals.desktop = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

	const response = await resolve(event);
	return response;
}

// export function getSession(event) {
// 	return {
// 		desktop: event.locals.desktop
// 	};
// }
