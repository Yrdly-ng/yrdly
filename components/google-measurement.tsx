'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { campaignTouch } from '@/lib/acquisition'

import { hasGoogleConsent, queueGoogleConsent, maskedPath } from '@/lib/google-consent'

export function GoogleMeasurement() {
  const pathname = usePathname()
  useEffect(() => {
    if (!['https://yrdly.ng', 'https://www.yrdly.ng'].includes(location.origin)) return
    const track = () => {
      const target = window as Window & { dataLayer?: unknown[]; yrdlyLastMeasuredPath?: string; yrdlyConsentActive?: boolean }
      if (!hasGoogleConsent(document.cookie)) {
        if (target.yrdlyConsentActive && target.dataLayer) queueGoogleConsent(target.dataLayer, 'update', false)
        target.yrdlyConsentActive = false
        target.yrdlyLastMeasuredPath = undefined
        return
      }
      if (target.yrdlyLastMeasuredPath === pathname) return
      const queue = target.dataLayer ??= []
      if (!document.getElementById('yrdly-gtm')) {
        queueGoogleConsent(queue, 'default', false)
        queueGoogleConsent(queue, 'update', true)
        target.yrdlyConsentActive = true
        const script = document.createElement('script')
        script.id = 'yrdly-gtm'
        script.async = true
        script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-M9WNM5GG'
        queue.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
        document.head.appendChild(script)
      } else if (!target.yrdlyConsentActive) {
        queueGoogleConsent(queue, 'update', true)
        target.yrdlyConsentActive = true
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
      queue.push({ event: 'yrdly_page_view', measurement_page_location: safeURL.href, measurement_page_referrer: '', measurement_page_title: 'YRDLY' })
      target.yrdlyLastMeasuredPath = pathname
    }
    track()
    window.addEventListener('yrdly:cookie-consent', track)
    window.addEventListener('focus', track)
    document.addEventListener('visibilitychange', track)
    return () => {
      window.removeEventListener('yrdly:cookie-consent', track)
      window.removeEventListener('focus', track)
      document.removeEventListener('visibilitychange', track)
    }
  }, [pathname])
  return null
}
