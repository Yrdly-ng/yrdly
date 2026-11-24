'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { campaignTouch } from '@/lib/acquisition'

function maskedPath(pathname: string): string {
  if (pathname === '/') return '/'
  const [, section, detail] = pathname.split('/')
  const publicSections = new Set([
    'about', 'blog', 'businesses', 'campaigns', 'contact', 'events', 'faq',
    'learn-more', 'marketplace', 'privacy-policy', 'trust-and-safety', 'whats-new',
  ])
  if (!publicSections.has(section)) return '/other'
  return detail ? `/${section}/detail` : `/${section}`
}

export function GoogleMeasurement() {
  const pathname = usePathname()
  useEffect(() => {
    if (!['yrdly.ng', 'www.yrdly.ng'].includes(location.hostname)) return
    const track = () => {
      const cookies = document.cookie.split(/;\s*/)
      if (!cookies.includes('yrdly_cookie_consent=true') || cookies.includes('yrdly_cookie_consent=false')) return
      const target = window as Window & { dataLayer?: unknown[]; yrdlyLastMeasuredPath?: string }
      if (target.yrdlyLastMeasuredPath === pathname) return
      const queue = target.dataLayer ??= []
      if (!document.getElementById('yrdly-gtm')) {
        const script = document.createElement('script')
        script.id = 'yrdly-gtm'
        script.async = true
        script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-M9WNM5GG'
        queue.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
        document.head.appendChild(script)
      }
      const safeURL = new URL(maskedPath(pathname), 'https://yrdly.ng')
      const campaign = campaignTouch(new URL(location.href), document.referrer)
      for (const [key, value] of Object.entries({
        utm_source: campaign?.source,
        utm_medium: campaign?.medium,
        utm_campaign: campaign?.campaign,
        utm_content: campaign?.content,
      })) {
        if (value && /^[a-z][a-z0-9._-]{0,63}$/i.test(value)) safeURL.searchParams.set(key, value)
      }
      queue.push({ event: 'yrdly_page_view', measurement_page_location: safeURL.href })
      target.yrdlyLastMeasuredPath = pathname
    }
    track()
    window.addEventListener('yrdly:cookie-consent', track)
    return () => window.removeEventListener('yrdly:cookie-consent', track)
  }, [pathname])
  return null
}
