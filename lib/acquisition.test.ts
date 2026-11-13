import { afterEach, describe, expect, it, vi } from 'vitest'
import { campaignTouch, mergeTouch, parseRecord, rememberMarketingTouch, marketingSignupAttribution, appendMarketingOAuthAttribution, marketingOAuthAttribution } from './acquisition'
import { readFileSync } from 'node:fs'

describe('privacy-bounded YRDLY acquisition tags', () => {
  it('recognizes explicit Instagram and TikTok campaign tags', () => {
    expect(campaignTouch(
      new URL('https://yrdly.ng/?utm_source=instagram&utm_medium=social&utm_campaign=bio_launch'),
      '',
    )).toMatchObject({
      source: 'instagram', medium: 'social', campaign: 'bio_launch',
    })
    expect(campaignTouch(
      new URL('https://yrdly.ng/?utm_source=tiktok&utm_medium=social&utm_campaign=creator_01'),
      '',
    )).toMatchObject({
      source: 'tiktok', campaign: 'creator_01',
    })
  })
  it('counts Google campaign with gclid but omitted medium as paid CPC', () => {
    const actual = campaignTouch(new URL('https://yrdly.ng/?utm_source=google&gclid=do-not-store'), '')
    expect(actual?.source).toBe('google')
    expect(actual?.medium).toBe('cpc')
    expect(JSON.stringify(actual)).not.toContain('do-not-store')
  })
  it('recognizes a Google ad without retaining the gclid', () => {
    const touch = campaignTouch(new URL('https://yrdly.ng/?gclid=do-not-save-click-id'), '')
    expect(touch).toMatchObject({ source: 'google', medium: 'cpc' })
    expect(JSON.stringify(touch)).not.toContain('do-not-save-click-id')
  })
  it('recognizes organic search from a referrer domain, never the search query', () => {
    const touch = campaignTouch(new URL('https://yrdly.ng/about'), 'https://www.google.com/search?q=private')
    expect(touch).toMatchObject({ source: 'google', medium: 'organic' })
    expect(JSON.stringify(touch)).not.toContain('private')
  })
  it('never trusts arbitrary URL queries, emails or internal referrers', () => {
    expect(campaignTouch(new URL('https://yrdly.ng/?utm_source=user%40email.com'), '')).toBeNull()
    expect(campaignTouch(new URL('https://yrdly.ng/'), 'https://app.yrdly.ng/home')).toBeNull()
  })
  it('stores first and latest touches without overwriting first source', () => {
    const first = campaignTouch(new URL('https://yrdly.ng/?utm_source=instagram&utm_medium=social'), '')
    const last = campaignTouch(new URL('https://yrdly.ng/?utm_source=google&utm_medium=cpc'), '')
    if (!first || !last) throw Error('Missing test sources')
    const initial = mergeTouch(null, first, '2026-11-01T00:00:00.000Z')
    const updated = mergeTouch(initial, last, '2026-11-13T00:00:00.000Z')
    expect(updated.first.source).toBe('instagram')
    expect(updated.last.source).toBe('google')
    expect(updated.captured_at).toBe(initial.captured_at)
    expect(parseRecord(JSON.stringify(updated))).toEqual(updated)
  })
  afterEach(() => vi.unstubAllGlobals())

  it('preserves Instagram first touch across marketing homepage to /signup without cookies', () => {
    const stored = new Map<string, string>()
    const mockStorage = {
      getItem: (name: string) => stored.get(name) ?? null,
      setItem: (name: string, value: string) => { stored.set(name, value) },
    }
    vi.stubGlobal('window', {
      sessionStorage: mockStorage,
      location: { href: 'https://yrdly.ng/signup' },
    })
    vi.stubGlobal('document', { cookie: '', referrer: 'https://yrdly.ng/' })
    const instagram = campaignTouch(new URL('https://yrdly.ng/?utm_source=instagram&utm_medium=social&utm_campaign=profile_bio'), '')
    if (!instagram) throw Error('Missing Instagram attribution')
    rememberMarketingTouch(instagram)
    const saved = marketingSignupAttribution()
    expect(saved.first.source).toBe('instagram')
    expect(saved.last.campaign).toBe('profile_bio')
    expect(saved.version).toBe(1)
  })

  it('carries only sanitized Google OAuth campaign values through marketing callback', () => {
    const stored = new Map<string, string>()
    vi.stubGlobal('window', {
      sessionStorage: { getItem: (n: string) => stored.get(n) ?? null,
        setItem: (n: string, v: string) => { stored.set(n, v) } },
      location: { href: 'https://yrdly.ng/login?utm_source=tiktok&utm_medium=social&utm_campaign=profile_bio' },
    })
    vi.stubGlobal('document', { cookie: '', referrer: '' })
    const callback = new URL('https://yrdly.ng/auth/callback?next=%2Fhome')
    appendMarketingOAuthAttribution(callback, marketingSignupAttribution())
    expect(callback.searchParams.get('next')).toBe('/home')
    expect(marketingOAuthAttribution(callback).first.source).toBe('tiktok')
    expect(marketingOAuthAttribution(callback).last.campaign).toBe('profile_bio')
    expect(callback.toString()).not.toContain('gclid')
    const signupForm = readFileSync('components/auth/HeroLoginForm.tsx', 'utf8')
    expect(signupForm).toContain('signup_attribution: attribution')
    expect(signupForm).toContain('reportMarketingNewAccount(signUpData.user.id')
    expect(signupForm).toContain('signUpData.user.identities.length === 0')
  })

  it('rejects corrupt stored payloads and PII-bearing source values', () => {
    expect(parseRecord('not JSON')).toBeNull()
    expect(parseRecord(JSON.stringify({
      first: { source: 'x@private.com', medium: 'social' },
      last: { source: 'instagram', medium: 'social' },
      captured_at: '2026-11-13T00:00:00Z',
    }))).toBeNull()
  })
})
