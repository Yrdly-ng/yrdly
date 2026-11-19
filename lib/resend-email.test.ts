import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const newsletterSegment = 'newsletter-segment';
const existingContact = { id: 'existing-contact', unsubscribed: false };

const api = vi.hoisted(() => ({
  get: vi.fn(),
  create: vi.fn(),
  list: vi.fn(),
  add: vi.fn(),
}));

vi.mock('resend', () => ({
  Resend: class {
    contacts = {
      get: api.get,
      create: api.create,
      segments: { list: api.list, add: api.add },
    };
  },
}));

beforeEach(() => {
  vi.resetModules();
  vi.resetAllMocks();
  vi.stubEnv('RESEND_API_KEY', 'test-key');
  vi.stubEnv('RESEND_NEWSLETTER_SEGMENT_ID', newsletterSegment);
  vi.stubEnv('RESEND_AUDIENCE_ID', 'old-waitlist');
});

afterEach(() => vi.unstubAllEnvs());

describe('newsletter segment signup', () => {
  it('creates a new contact in the newsletter segment only', async () => {
    api.get.mockResolvedValue({ error: { statusCode: 404 } });
    api.create.mockResolvedValue({ data: { id: 'new-contact' } });
    const { subscribeNewsletterContact } = await import('./resend-email');

    await expect(subscribeNewsletterContact('reader+tag@example.com')).resolves.toBe('new-contact');
    expect(api.get).toHaveBeenCalledWith('reader%2Btag%40example.com');
    expect(api.create).toHaveBeenCalledWith({
      email: 'reader+tag@example.com',
      segments: [{ id: newsletterSegment }],
    });
    expect(api.add).not.toHaveBeenCalled();
  });

  it('adds an existing opted-in contact without changing its global status', async () => {
    api.get.mockResolvedValue({ data: existingContact });
    api.list.mockResolvedValue({ data: { data: [{ id: 'old-waitlist' }], has_more: false } });
    api.add.mockResolvedValue({ data: { id: existingContact.id } });
    const { subscribeNewsletterContact } = await import('./resend-email');

    await expect(subscribeNewsletterContact('reader@example.com')).resolves.toBe(existingContact.id);
    expect(api.add).toHaveBeenCalledWith({ contactId: existingContact.id, segmentId: newsletterSegment });
    expect(api.create).not.toHaveBeenCalled();
  });

  it('honors a prior unsubscribe, including on a concurrent create', async () => {
    api.get.mockResolvedValueOnce({ error: { statusCode: 404 } })
      .mockResolvedValueOnce({ data: { ...existingContact, unsubscribed: true } });
    api.create.mockResolvedValue({ error: { statusCode: 409 } });
    const { subscribeNewsletterContact } = await import('./resend-email');

    await expect(subscribeNewsletterContact('reader@example.com')).resolves.toBeNull();
    expect(api.add).not.toHaveBeenCalled();
  });

  it('does not trigger another welcome for an existing newsletter subscriber', async () => {
    api.get.mockResolvedValue({ data: existingContact });
    api.list.mockResolvedValue({ data: { data: [{ id: newsletterSegment }], has_more: false } });
    const { subscribeNewsletterContact } = await import('./resend-email');

    await expect(subscribeNewsletterContact('reader@example.com')).resolves.toBeNull();
    expect(api.add).not.toHaveBeenCalled();
  });

  it('never falls back to the event audience when the newsletter segment is missing', async () => {
    vi.stubEnv('RESEND_NEWSLETTER_SEGMENT_ID', '');
    const { subscribeNewsletterContact } = await import('./resend-email');

    await expect(subscribeNewsletterContact('reader@example.com')).rejects.toThrow('Newsletter segment is not configured');
    expect(api.get).not.toHaveBeenCalled();
  });
});
