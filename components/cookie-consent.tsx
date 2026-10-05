'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'yrdly_cookie_consent';

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
    Cookies.set(COOKIE_NAME, 'true', { expires: 365 });
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex flex-col sm:flex-row items-center justify-between z-50 gap-2">
      <p className="text-sm text-center sm:text-left">
        We use cookies to enhance your experience. Third-party services, including Google for advertising and measurement, may set cookies on your browser. By continuing to visit this site, you agree to our{' '}
        <Link href="/cookie-policy" className="underline">Cookie Policy</Link>,{' '}
        <Link href="/privacy-policy" className="underline">Privacy Policy</Link>, and{' '}
        <Link href="/terms" className="underline">Terms of Service</Link>.
      </p>
      <Button onClick={acceptConsent} className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
        Accept
      </Button>
    </div>
  );
}