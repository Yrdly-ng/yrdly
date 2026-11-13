'use client'

import { useEffect } from 'react'
import {
  campaignTouch, mergeTouch, parseRecord,
  type AcquisitionRecord, type AcquisitionTouch,
} from '@/lib/acquisition'

const RECORD_COOKIE = 'yrdly_signup_attribution'
const CONSENT_COOKIE = 'yrdly_cookie_consent'
const IS_YRDLY = /(^|\.)yrdly\.ng$/

function readCookie(key: string): string | undefined {
  const entry = document.cookie.split('; ').find(value => value.startsWith(key + '='))
  if (!entry) return
  try { return decodeURIComponent(entry.slice(key.length + 1)) } catch { return }
}

function hasConsent(): boolean {
  return readCookie(CONSENT_COOKIE) === 'true'
}

function store(record: AcquisitionRecord): void {
  if (!hasConsent()) return
  const domain = IS_YRDLY.test(location.hostname) ? '; Domain=.yrdly.ng' : ''
  document.cookie = RECORD_COOKIE + '=' + encodeURIComponent(JSON.stringify(record)) +
    '; Path=/; Max-Age=7776000; SameSite=Lax' +
    (location.protocol === 'https:' ? '; Secure' : '') + domain
}

/**
 * Captures only user-approved attribution cookies on yrdly.ng.
 * Without consent, first-party outbound links still carry explicit, bounded
 * campaign tags to the app without creating a cross-domain tracking cookie.
 */
export function AcquisitionBridge() {
  useEffect(() => {
    const appHost = new URL(
      process.env.NEXT_PUBLIC_APP_URL || 'https://app.yrdly.ng',
    ).hostname
    let pending: AcquisitionTouch | null = null
    try { pending = campaignTouch(new URL(location.href), document.referrer) } catch { /* no source */ }

    const update = () => {
      if (!hasConsent() || !pending) return
      const existing = parseRecord(readCookie(RECORD_COOKIE))
      store(mergeTouch(existing, pending))
      pending = null
    }
    update()

    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return
      const anchor = event.target.closest('a[href]')
      if (!(anchor instanceof HTMLAnchorElement)) return
      let url: URL
      try { url = new URL(anchor.href) } catch { return }
      if (url.hostname !== appHost || url.protocol !== 'https:') return
      const existing = parseRecord(readCookie(RECORD_COOKIE))
      const source = pending ?? existing?.last
      if (!source) return

      // Do not overwrite explicit destination tags; append only public
      // allowlisted campaign dimensions. Never forward gclid/fbclid.
      const tags: Record<string, string | undefined> = {
        utm_source: source.source,
        utm_medium: source.medium,
        utm_campaign: source.campaign,
        utm_content: source.content,
      }
      for (const [key, value] of Object.entries(tags))
        if (value && !url.searchParams.has(key)) url.searchParams.set(key, value)
      anchor.href = url.toString()
    }
    window.addEventListener('yrdly:cookie-consent', update)
    document.addEventListener('click', onClick, true)
    return () => {
      window.removeEventListener('yrdly:cookie-consent', update)
      document.removeEventListener('click', onClick, true)
    }
  }, [])

  return null
}
