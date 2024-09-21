import { createClient } from '@supabase/supabase-js';

// Supabase URL and anon key retrieved from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey);
console.log('Test Variable:', process.env.NEXT_PUBLIC_TEST_VARIABLE);
console.log('All environment variables:', process.env);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or anon key is missing!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
