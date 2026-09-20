import { createClient } from '@supabase/supabase-js'
import Cookies from 'js-cookie'

const supabaseUrl = process.env.NEXT_PUBLIC_APP_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_APP_SUPABASE_ANON_KEY
const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || '.yrdly.ng'

// Custom cookie-based storage adapter so the auth session cookie is set
// on the shared root domain (e.g. .yrdly.ng), making it readable by
// both yrdly.ng and app.yrdly.ng for the seamless handoff.
const cookieStorage = {
  getItem: (key: string) => {
    return Cookies.get(key) ?? null
  },
  setItem: (key: string, value: string) => {
    Cookies.set(key, value, {
      domain: cookieDomain,
      expires: 365,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  },
  removeItem: (key: string) => {
    Cookies.remove(key, { domain: cookieDomain, path: '/' })
  },
}

// This client connects to the Web App's Supabase project so tokens are
// compatible with app.yrdly.ng after the user logs in on the marketing site.
export const supabaseAuthClient =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          storageKey: 'sb-yoiyqxtpmxnrrbqqidcs-auth-token',
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
          storage: cookieStorage,
        },
      })
    : null
