import type { MarketingSignupAttribution } from './acquisition';

// Public Google Ads conversion ID from the existing YRDLY tag.
const GOOGLE_CONVERSION = 'AW-18468457055/8KtMCNjnzYEdEN-UueZE';
const UUID = /^[0-9a-f-]{36}$/i;

/**
 * Only call after Supabase confirms a *new* account. No email, name, phone,
 * full URL, search term, click ID or raw referrer is included in analytics.
 */
export async function reportMarketingNewAccount(
  userId: string,
  signupMethod: 'email' | 'google',
  attribution: MarketingSignupAttribution,
): Promise<void> {
  if (typeof window === 'undefined' ||
      !['yrdly.ng', 'www.yrdly.ng'].includes(window.location.hostname) ||
      !UUID.test(userId)) return;
  try {
    const marker = 'yrdly_marketing_signup_sent_' + userId;
    if (window.sessionStorage.getItem(marker) === '1') return;
    window.sessionStorage.setItem(marker, '1');

    const win = window as typeof window & {
      gtag?: (...args: unknown[]) => void;
      dataLayer?: unknown[];
    };
    const conversion = {
      send_to: GOOGLE_CONVERSION,
      transaction_id: window.crypto.randomUUID(),
    };
    if (typeof win.gtag === 'function') {
      win.gtag('event', 'conversion', conversion);
    } else if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push(['event', 'conversion', conversion]);
    }

    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!apiKey) return;
    const endpoint = (process.env.NEXT_PUBLIC_POSTHOG_HOST || '').includes('eu')
      ? 'https://eu.i.posthog.com/capture/'
      : 'https://us.i.posthog.com/capture/';
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        api_key: apiKey,
        event: 'account_created',
        properties: {
          distinct_id: userId,
          app_platform: 'web',
          app_environment: 'production',
          $geoip_disable: true,
          signup_method: signupMethod,
          acquisition_first_source: attribution.first.source,
          acquisition_first_medium: attribution.first.medium,
          acquisition_first_campaign: attribution.first.campaign,
          acquisition_last_source: attribution.last.source,
          acquisition_last_medium: attribution.last.medium,
          acquisition_last_campaign: attribution.last.campaign,
        },
      }),
      signal: AbortSignal.timeout(1600),
    });
  } catch {
    // A marketing analytics failure must not prevent authentication.
  }
}
