"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

const COOKIE_NAME = "yrdly_cookie_consent";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = Cookies.get(COOKIE_NAME);
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptConsent = () => {
    setShowConsent(false);
    Cookies.set(COOKIE_NAME, "true", { expires: 365 });
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
      <button onClick={acceptConsent}>Accept</button>
    </aside>
  );
}
