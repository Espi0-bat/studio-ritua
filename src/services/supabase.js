import { createClient } from '@supabase/supabase-js'
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
// Lido antes de createClient: o cliente limpa o endereço ao recuperar a sessão,
// e o evento PASSWORD_RECOVERY pode disparar antes de o painel montar.
export const arrivedFromRecovery = typeof window !== 'undefined' && window.location.hash.includes('type=recovery')
export const supabase = url && key ? createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }) : null
