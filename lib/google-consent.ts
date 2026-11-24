export const GOOGLE_MEASUREMENT_MODE = process.env.NEXT_PUBLIC_YRDLY_GOOGLE_MEASUREMENT === 'gtm'
export const GOOGLE_CONSENT_COOKIE = 'yrdly_cookie_consent'

export function hasGoogleConsent(cookie: string): boolean {
  const values = cookie.split(/;\s*/)
  return values.includes(`${GOOGLE_CONSENT_COOKIE}=true`) && !values.includes(`${GOOGLE_CONSENT_COOKIE}=false`)
}
export function hasGoogleConsentChoice(cookie: string): boolean {
  return cookie.split(/;\s*/).some(value => value === `${GOOGLE_CONSENT_COOKIE}=true` || value === `${GOOGLE_CONSENT_COOKIE}=false`)
}

export function queueGoogleConsent(queue: unknown[], command: 'default' | 'update', allowed: boolean): void {
  const storage = allowed ? 'granted' : 'denied'
  function gtag(...args: unknown[]) { void args; queue.push(arguments) }
  gtag('consent', command, {
    analytics_storage: storage,
    ad_storage: storage,
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

export function writeGoogleConsent(allowed: boolean): void {
  // Remove a pre-cutover host-only cookie before setting the shared preference.
  document.cookie = `${GOOGLE_CONSENT_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax; Secure`
  document.cookie = `${GOOGLE_CONSENT_COOKIE}=${allowed}; Domain=yrdly.ng; Path=/; Max-Age=31536000; SameSite=Lax; Secure`
}

export function maskedPath(pathname: string): string {
  if (pathname === '/') return '/'
  const [, section, detail] = pathname.split('/')
  const publicSections = new Set([
    'about', 'blog', 'businesses', 'campaigns', 'contact', 'events', 'faq',
    'learn-more', 'marketplace', 'privacy-policy', 'trust-and-safety', 'whats-new', 'cookie-policy',
  ])
  if (!publicSections.has(section)) return '/other'
  return detail ? `/${section}/detail` : `/${section}`
}
