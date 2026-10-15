import { describe, expect, it } from 'vitest';
import { eventIsPast, firstImage, locationLabel, priceLabel } from '../lib/public-types';
import { brandedSupabaseUrl } from '../lib/supabase-url';

describe('public preview data from the existing product', () => {
  it('accepts arrays and legacy JSON image arrays without crashing on bad data', () => {
    expect(firstImage(['https://example.test/photo.jpg'])).toBe('https://example.test/photo.jpg');
    expect(firstImage('["https://example.test/photo.jpg"]')).toBe('https://example.test/photo.jpg');
    for (const value of [null, undefined, '', 'not json', '{}', '[null]']) expect(firstImage(value)).toBe('');
  });
  it('keeps long local areas and does not invent a default city', () => {
    expect(locationLabel({ state: 'Federal Capital Territory', lga: 'Abuja Municipal Area Council' })).toBe('Abuja Municipal Area Council, Federal Capital Territory');
    expect(locationLabel({ state: 'Enugu', lga: 'Enugu North', ward: 'Independence Layout' })).toBe('Independence Layout, Enugu');
    expect(locationLabel({})).toBe('Nigeria');
  });
  it('distinguishes free items from missing prices', () => {
    expect(priceLabel(0)).toBe('Free');
    expect(priceLabel(null)).toBe('Ask for price');
    expect(priceLabel(1500)).toContain('1,500');
  });
  it('distinguishes past events without ending same-day events early', () => {
    const now = new Date('2026-10-15T14:00:00Z');
    expect(eventIsPast({ start_time: '2026-10-14T10:00:00Z' }, now)).toBe(true);
    expect(eventIsPast({ start_time: '2026-10-15T10:00:00Z' }, now)).toBe(false);
    expect(eventIsPast({ start_time: '2026-10-15T10:00:00Z', end_time: '2026-10-15T12:00:00Z' }, now)).toBe(true);
    expect(eventIsPast({ start_time: '2026-11-05T10:00:00Z' }, now)).toBe(false);
    expect(eventIsPast({}, now)).toBe(false);
  });
});

describe('existing activated branded authentication domain', () => {
  it('maps only the known production project', () => {
    expect(brandedSupabaseUrl('https://yoiyqxtpmxnrrbqqidcs.supabase.co')).toBe('https://api.yrdly.ng');
    expect(brandedSupabaseUrl('https://api.yrdly.ng')).toBe('https://api.yrdly.ng');
    expect(brandedSupabaseUrl('https://development.supabase.co')).toBe('https://development.supabase.co');
    expect(brandedSupabaseUrl('http://localhost:54321')).toBe('http://localhost:54321');
    expect(brandedSupabaseUrl('')).toBe('');
  });
});
