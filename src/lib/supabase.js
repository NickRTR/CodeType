import { SUPABASE_KEY, SUPABASE_URL } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';

console.log(SUPABASE_KEY, SUPABASE_URL);

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
