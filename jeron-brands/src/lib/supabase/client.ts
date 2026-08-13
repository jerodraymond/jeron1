import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * The public site never signs anyone in — every table it touches is either
 * publicly readable (published content) or insert-only (contact messages),
 * both enforced by RLS. A plain client is enough; no cookie/session plumbing
 * needed like TapCard's auth-driven app.
 */
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
