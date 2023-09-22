import { redirect } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const { token } = await request.json();

	cookies.set('auth', token, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 30
	});

	throw redirect(307, '/account');
}
