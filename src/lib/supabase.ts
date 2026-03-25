import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Only create client if env vars are set — prevents crash during dev without Supabase
let supabase: SupabaseClient | null = null
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }

/* ═══ Lead types ═══ */
export interface Lead {
  name: string
  phone: string
  email?: string
  destination?: string
  travel_date?: string
  message?: string
  source?: string
  cta_location?: string
}

export async function submitLead(lead: Lead) {
  if (!supabase) {
    // Dev fallback — log to console if Supabase not configured
    console.log("📋 Lead captured (Supabase not configured):", lead)
    return null
  }

  const { data, error } = await supabase.from("leads").insert([
    {
      ...lead,
      source: lead.source || "website",
    },
  ])

  if (error) throw error
  return data
}
