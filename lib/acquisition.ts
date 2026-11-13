/**
 * Privacy-bounded acquisition tags for the YRDLY marketing → app journey.
 * No query strings, click IDs, IP addresses, emails or raw referrer URLs.
 */
export type AcquisitionTouch = {
  source: string
  medium: string
  campaign?: string
  content?: string
  referring_domain?: string
}
export type AcquisitionRecord = {
  first: AcquisitionTouch
  last: AcquisitionTouch
  captured_at: string
}
const SAFE_VALUE = /^[a-z0-9][a-z0-9._-]{0,63}$/
const INTERNAL = /(^|\.)yrdly\.ng$/

function clean(input: string | null, max = 64): string | undefined {
  if (!input) return undefined
  const candidate = input.trim().toLowerCase()
  return candidate.length <= max && SAFE_VALUE.test(candidate) ? candidate : undefined
}

function referringDomain(referrer: string): string | undefined {
  try {
    const parsed = new URL(referrer)
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return
    const domain = parsed.hostname.toLowerCase()
    if (INTERNAL.test(domain)) return
    return clean(domain)
  } catch {
    return
  }
}

export function campaignTouch(page: URL, referrer: string): AcquisitionTouch | null {
  if (!['https:', 'http:'].includes(page.protocol)) return null
  const query = page.searchParams
  const domain = referringDomain(referrer)
  let source = clean(query.get('utm_source'))
  let medium = clean(query.get('utm_medium'))
  const googleAdClick = ['gclid', 'gad_source', 'wbraid', 'gbraid']
    .some(key => query.has(key))
  if (!source && googleAdClick) source = 'google'
  if (!medium && source === 'google' && googleAdClick) medium = 'cpc'
  if (!source && query.has('msclkid')) {
    source = 'bing'
    medium = 'cpc'
  }
  if (!source && domain) {
    source = /(^|\.)google\.[a-z.]+$/.test(domain) ? 'google'
      : /(^|\.)bing\.com$/.test(domain) ? 'bing'
      : /(^|\.)(instagram\.com|l\.instagram\.com)$/.test(domain) ? 'instagram'
      : /(^|\.)(tiktok\.com)$/.test(domain) ? 'tiktok'
      : /(^|\.)(twitter\.com|t\.co|x\.com)$/.test(domain) ? 'x'
      : /(^|\.)(facebook\.com|fb\.com|l\.facebook\.com)$/.test(domain) ? 'facebook'
      : domain
    medium = source === 'google' || source === 'bing' ? 'organic' : 'referral'
  }
  if (!source) return null
  const touch: AcquisitionTouch = { source, medium: medium || 'referral' }
  const campaign = clean(query.get('utm_campaign'))
  const content = clean(query.get('utm_content'))
  if (campaign) touch.campaign = campaign
  if (content) touch.content = content
  if (domain) touch.referring_domain = domain
  return touch
}

export function parseRecord(raw: string | undefined): AcquisitionRecord | null {
  if (!raw || raw.length > 1400) return null
  try {
    const item: unknown = JSON.parse(raw)
    if (!item || typeof item !== 'object') return null
    const value = item as Partial<AcquisitionRecord>
    const valid = (t: AcquisitionTouch | undefined): t is AcquisitionTouch =>
      !!t && !!clean(t.source) && !!clean(t.medium) &&
      (!t.campaign || !!clean(t.campaign)) &&
      (!t.content || !!clean(t.content)) &&
      (!t.referring_domain || !!clean(t.referring_domain))
    if (!valid(value.first) || !valid(value.last) ||
        typeof value.captured_at !== 'string' ||
        Number.isNaN(Date.parse(value.captured_at))) return null
    return {
      first: value.first,
      last: value.last,
      captured_at: value.captured_at,
    }
  } catch {
    return null
  }
}

export function mergeTouch(
  existing: AcquisitionRecord | null,
  touch: AcquisitionTouch,
  now = new Date().toISOString(),
): AcquisitionRecord {
  return {
    first: existing?.first ?? touch,
    last: touch,
    captured_at: existing?.captured_at ?? now,
  }
}
