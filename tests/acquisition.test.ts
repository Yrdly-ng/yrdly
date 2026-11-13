import { describe, expect, it } from 'vitest'
import { campaignTouch, mergeTouch, parseRecord } from '../lib/acquisition'

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
  it('rejects corrupt stored payloads and PII-bearing source values', () => {
    expect(parseRecord('not JSON')).toBeNull()
    expect(parseRecord(JSON.stringify({
      first: { source: 'x@private.com', medium: 'social' },
      last: { source: 'instagram', medium: 'social' },
      captured_at: '2026-11-13T00:00:00Z',
    }))).toBeNull()
  })
})
