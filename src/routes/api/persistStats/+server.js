import supabase from '$lib/supabase';

export async function POST({ request, cookies }) {
	const stats = await request.json();

	const token = cookies.get('auth');

	if (token) {
		const user = await supabase.auth.api.getUser(token);

		const { error } = await supabase.from('Stats').insert([
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

		return new Response(JSON.stringify({ success: 'success' }));
	}
	return new Response(JSON.stringify({ error: 'Please login in order to persist stats.' }));
}
