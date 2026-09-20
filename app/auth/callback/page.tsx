'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabaseAuthClient } from '@/lib/supabase-auth-client';
import { Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.yrdly.ng';

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Completing sign in...');

  useEffect(() => {
    if (!supabaseAuthClient) {
      setStatus('error');
      setMessage('Authentication is not configured.');
      return;
    }

    // Check for OAuth errors in query params OR hash fragment
    const errorParam = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const hashParams = new URLSearchParams(hash.replace('#', ''));
    const hashError = hashParams.get('error');

    if (errorParam || hashError) {
      setStatus('error');
      setMessage(
        errorDescription ||
        hashParams.get('error_description') ||
        'Authentication was cancelled or denied.'
      );
      return;
    }

    // Listen for auth state change — this fires for BOTH:
    // • PKCE flow   (?code=xxx  → client calls exchangeCodeForSession internally)
    // • Implicit flow (#access_token=xxx → client parses hash internally)
    // because detectSessionInUrl:true is set in the Supabase client config.
    const { data: { subscription } } = supabaseAuthClient.auth.onAuthStateChange(
      (event, session) => {
        if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session) {
          setStatus('success');
          setMessage('Signed in! Redirecting…');
          setTimeout(() => {
            // If the account was created within the last 30 s, treat as a new sign-up
            const createdAt = session.user?.created_at
              ? new Date(session.user.created_at).getTime()
              : 0;
            const isNewUser = Date.now() - createdAt < 30_000;
            window.location.href = isNewUser
              ? `${APP_URL}/onboarding/profile`
              : `${APP_URL}/home`;
          }, 1000);
          subscription.unsubscribe();
        }
      }
    );

    // PKCE explicit fallback: if ?code= is in the URL, exchange it manually.
    // (detectSessionInUrl handles this automatically but we keep this as a belt-and-braces.)
    const code = searchParams.get('code');
    if (code) {
      supabaseAuthClient.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) {
          setStatus('error');
          setMessage(error.message || 'Failed to complete sign in.');
          subscription.unsubscribe();
        }
        // On success, onAuthStateChange fires SIGNED_IN above.
      });
    }

    // Timeout: if nothing happens in 12 s, show an error
    const timeout = setTimeout(() => {
      setStatus('error');
      setMessage('Sign in timed out. Please try again.');
      subscription.unsubscribe();
    }, 12000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
        <img src="/logo.png" alt="Yrdly Logo" className="h-20 w-auto mx-auto mb-8 drop-shadow-sm hover:scale-105 transition-transform" />

        {status === 'loading' && (
          <>
            <Loader2 className="w-8 h-8 text-green-600 animate-spin mx-auto mb-4" />
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">{message}</h2>
            <p className="text-sm text-gray-400 mt-2">Setting up your neighborhood session…</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">You're in!</h2>
            <p className="text-sm text-gray-400 mt-2">Taking you to your neighborhood…</p>
          </>
        )}

        {status === 'error' && (
          <>
            <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Sign In Failed</h2>
            <p className="text-sm text-gray-500 mt-2 mb-6">{message}</p>
            <button
              onClick={() => router.push('/')}
              className="w-full h-11 bg-gray-900 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors text-sm"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function CallbackSkeleton() {
  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
        <img src="/logo.png" alt="Yrdly Logo" className="h-20 w-auto mx-auto mb-8 drop-shadow-sm hover:scale-105 transition-transform" />
        <Loader2 className="w-8 h-8 text-green-600 animate-spin mx-auto mb-4" />
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">Signing you in…</h2>
        <p className="text-sm text-gray-400 mt-2">Just a moment</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<CallbackSkeleton />}>
      <CallbackHandler />
    </Suspense>
  );
}
