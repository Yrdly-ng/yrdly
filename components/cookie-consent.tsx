"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { GOOGLE_MEASUREMENT_MODE, hasGoogleConsentChoice, writeGoogleConsent } from "@/lib/google-consent";

const COOKIE_NAME = "yrdly_cookie_consent";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const shared = GOOGLE_MEASUREMENT_MODE && ['https://yrdly.ng', 'https://www.yrdly.ng'].includes(window.location.origin);
    if (shared ? !hasGoogleConsentChoice(document.cookie) : !Cookies.get(COOKIE_NAME)) setShowConsent(true);
    const open = () => { if (shared) setShowConsent(true); };
    window.addEventListener('yrdly:open-cookie-settings', open);
    return () => window.removeEventListener('yrdly:open-cookie-settings', open);
  }, []);

  const chooseConsent = (allowed: boolean) => {
    const shared = GOOGLE_MEASUREMENT_MODE && ['https://yrdly.ng', 'https://www.yrdly.ng'].includes(window.location.origin);
    if (shared) writeGoogleConsent(allowed);
    else Cookies.set(COOKIE_NAME, String(allowed), { expires: 365 });
    setShowConsent(false);
    window.dispatchEvent(new Event("yrdly:cookie-consent"));
    // Explicit withdrawal also unloads any already-initialized Google container.
    if (shared && !allowed && document.getElementById('yrdly-gtm')) window.location.reload();
  };

  if (!showConsent) {
    return null;
  }

  return (
    <aside className="cookie-notice" aria-label="Cookie notice">
      <p>
        We use cookies for site features, advertising and measurement. Read our{" "}
        <Link href="/cookie-policy" className="underline">
          cookie policy
        </Link>
        ,{" "}
        <Link href="/privacy-policy" className="underline">
          privacy policy
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="underline">
          terms
        </Link>
        .
      </p>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => chooseConsent(true)}>Accept</button>
        {GOOGLE_MEASUREMENT_MODE && <button onClick={() => chooseConsent(false)}>Decline optional measurement</button>}
      </div>
    </aside>
  );
}

export function CookiePreferencesButton() {
  if (!GOOGLE_MEASUREMENT_MODE) return null;
  return <button type="button" className="underline" onClick={() => window.dispatchEvent(new Event('yrdly:open-cookie-settings'))}>Manage optional measurement cookies</button>;
}
