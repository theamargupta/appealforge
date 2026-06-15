/**
 * Supabase access for lead capture. Uses the publishable (anon) key — safe to expose —
 * and relies on the write-only RLS policy on `appealforge_leads` (anon may INSERT, no SELECT).
 * Returns null if not configured, so the lead route degrades instead of crashing.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { supabaseConfig } from "@/config/site";

export const LEADS_TABLE = "appealforge_leads";

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!supabaseConfig.url || !supabaseConfig.anonKey) return null;
  if (!cached) {
    cached = createClient(supabaseConfig.url, supabaseConfig.anonKey, {
      auth: { persistSession: false },
    });
  }
  return cached;
}
