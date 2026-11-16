"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { campaignTouch, marketingSignupAttribution } from "@/lib/acquisition";

const CONSENT_COOKIE = "yrdly_cookie_consent";
const SESSION_ID_KEY = "yrdly_marketing_analytics_session";
const VISITOR_ID_KEY = "yrdly_marketing_analytics_visitor";
const SAFE_TAG = /^[a-z0-9][a-z0-9._-]{0,63}$/;

function hasMeasurementConsent(): boolean {
  return document.cookie.split("; ").some(
    (part) => part === CONSENT_COOKIE + "=true",
  );
}

// Report only route templates, never arbitrary paths, query strings, emails,
// campaign click IDs, profile data or full referral URLs.
function safePagePath(pathname: string): string {
  if (pathname === "/") return "/";
  const segments = pathname.split("/").filter(Boolean);
  if (!segments.length || !/^[a-z-]{1,32}$/.test(segments[0])) return "/other";
  return segments.length > 1 ? `/${segments[0]}/[detail]` : `/${segments[0]}`;
}

function anonymousId(key: string): string | null {
  try {
    const current = window.sessionStorage.getItem(key);
    if (current && /^[0-9a-f-]{36}$/i.test(current)) return current;
    const created = window.crypto.randomUUID();
    window.sessionStorage.setItem(key, created);
    return created;
  } catch {
    return null;
  }
}

function captureConsentedPageview(): void {
  const token = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!token || !hasMeasurementConsent()) return;
  if (!["yrdly.ng", "www.yrdly.ng"].includes(window.location.hostname)) return;

  const sessionId = anonymousId(SESSION_ID_KEY);
  const visitorId = anonymousId(VISITOR_ID_KEY);
  if (!sessionId || !visitorId) return;

  const touch = campaignTouch(new URL(window.location.href), document.referrer);
  const stored = marketingSignupAttribution().last;
  const source = touch ?? (stored.source === "unknown" ? null : stored);
  const path = safePagePath(window.location.pathname);
  const tags: Record<string, string> = {};
  for (const [key, value] of Object.entries({
    $utm_source: source?.source,
    $utm_medium: source?.medium,
    $utm_campaign: source?.campaign,
    acquisition_source: source?.source,
    acquisition_medium: source?.medium,
    acquisition_campaign: source?.campaign,
  })) {
    if (typeof value === "string" && SAFE_TAG.test(value)) tags[key] = value;
  }

  const endpoint = (process.env.NEXT_PUBLIC_POSTHOG_HOST || "").startsWith("https://eu")
    ? "https://eu.i.posthog.com/capture/"
    : "https://us.i.posthog.com/capture/";

  void fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      api_key: token,
      event: "$pageview",
      properties: {
        distinct_id: visitorId,
        $session_id: sessionId,
        $current_url: "https://yrdly.ng" + path,
        $host: "yrdly.ng",
        $pathname: path,
        $geoip_disable: true,
        $process_person_profile: false,
        app_platform: "web",
        app_environment: "production",
        website: "marketing",
        ...tags,
      },
    }),
  }).catch(() => {
    // Analytics cannot interfere with the marketing website.
  });
}

/** Consent-gated, privacy-bounded website measurement in the same YRDLY
 * PostHog project as the web app. Does not set cross-domain analytics cookies.
 */
export function MarketingTrafficTracker() {
  const pathname = usePathname();
  const recordedPath = useRef<string | null>(null);

  useEffect(() => {
    const capture = () => {
      if (!hasMeasurementConsent()) return;
      const current = window.location.pathname;
      if (recordedPath.current === current) return;
      recordedPath.current = current;
      captureConsentedPageview();
    };

    capture();
    window.addEventListener("yrdly:cookie-consent", capture);
    return () => window.removeEventListener("yrdly:cookie-consent", capture);
  }, [pathname]);

  return null;
}
