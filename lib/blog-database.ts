import 'server-only';
import { createClient } from '@supabase/supabase-js';

// Server lookup stays dynamic; NEXT_PUBLIC values otherwise freeze during build.
export function blogDatabaseConfigured(service = false) {
  const env = process.env;
  return Boolean(Reflect.get(env, 'NEXT_PUBLIC_SUPABASE_URL') && (service ? env.SUPABASE_SERVICE_ROLE_KEY : Reflect.get(env, 'NEXT_PUBLIC_SUPABASE_ANON_KEY')));
}

export function blogDatabase(service = false) {
  const env = process.env;
  const url: string | undefined = Reflect.get(env, 'NEXT_PUBLIC_SUPABASE_URL');
  const key: string | undefined = service ? env.SUPABASE_SERVICE_ROLE_KEY : Reflect.get(env, 'NEXT_PUBLIC_SUPABASE_ANON_KEY');
  if (!url || !key) throw Error('BLOG_DATABASE_NOT_CONFIGURED');
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store', signal: AbortSignal.timeout(10000) }) },
  });
}
