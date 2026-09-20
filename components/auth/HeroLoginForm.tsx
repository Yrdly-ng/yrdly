'use client';

import { useState } from 'react';
import { supabaseAuthClient } from '@/lib/supabase-auth-client';
import { Loader2, Mail, Eye, EyeOff, AlertTriangle } from 'lucide-react';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.yrdly.ng';
// The marketing site's own callback URL so the shared cookie is set correctly
const OAUTH_REDIRECT = typeof window !== 'undefined'
  ? `${window.location.origin}/auth/callback`
  : 'https://yrdly.ng/auth/callback';

export function HeroLoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = async () => {
    if (process.env.NODE_ENV === 'development') console.log('Google Sign In clicked!');
    if (!supabaseAuthClient) {
      setError('Authentication is not configured properly.');
      return;
    }
    
    try {
      setGoogleLoading(true);
      setError('');
      if (process.env.NODE_ENV === 'development') console.log('Calling signInWithOAuth with redirect:', OAUTH_REDIRECT);
      
      const { data, error: oauthError } = await supabaseAuthClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: OAUTH_REDIRECT,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      
      if (process.env.NODE_ENV === 'development') console.log('Result:', { data, oauthError });
      
      if (oauthError) {
        setError(oauthError.message);
        setGoogleLoading(false);
      } else if (data?.url) {
        // Fallback in case Supabase doesn't automatically redirect
        if (process.env.NODE_ENV === 'development') console.log('Redirecting to Google...', data.url);
        window.location.href = data.url;
      }
    } catch (err: any) {
      console.error('Exception during Google Sign In:', err);
      setError(err?.message || 'An unexpected error occurred during Google Sign In.');
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabaseAuthClient) {
      setError('Authentication is not configured properly.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { data: signUpData, error: signUpError } = await supabaseAuthClient.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });

        if (signUpError) {
          setError(signUpError.message);
          setLoading(false);
          return;
        }

        if (signUpData?.session) {
          window.location.href = `${APP_URL}/onboarding/profile`;
        } else {
          window.location.href = `${APP_URL}/onboarding/verify-email?email=${encodeURIComponent(email)}`;
        }
      } else {
        const { error: signInError } = await supabaseAuthClient.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          // Provide a helpful message for Google-only accounts
          if (signInError.message?.toLowerCase().includes('invalid login credentials')) {
            setError(
              'Incorrect email or password. If you signed up with Google, use the "Continue with Google" button below.'
            );
          } else {
            setError(signInError.message);
          }
          setLoading(false);
          return;
        }

        window.location.href = `${APP_URL}/home`;
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-6 sm:p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 font-sans">
          {isSignUp ? 'Join your neighborhood' : 'Welcome back'}
        </h2>
        <p className="text-sm text-gray-500 mt-2 font-sans">
          {isSignUp ? 'Connect with your neighbors today.' : 'Sign in to see what is happening locally.'}
        </p>
      </div>

      {error && (
        <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-600 text-sm">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Google OAuth Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={googleLoading || loading}
        className="w-full h-12 mb-4 flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors font-medium text-gray-700 text-sm font-sans shadow-sm disabled:opacity-70"
      >
        {googleLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        )}
        {googleLoading ? 'Redirecting…' : 'Continue with Google'}
      </button>

      {/* Divider */}
      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-gray-400 font-sans uppercase tracking-wider">or</span>
        </div>
      </div>

      {/* Email / Password form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div className="relative">
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={isSignUp}
              className="w-full h-12 pl-4 pr-4 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#388E3C]/50 focus:border-[#388E3C] transition-all font-sans text-gray-900"
            />
          </div>
        )}

        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Mail className="h-5 w-5" />
          </div>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#388E3C]/50 focus:border-[#388E3C] transition-all font-sans text-gray-900"
          />
        </div>

        <div className="relative">
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-12 pl-4 pr-12 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#388E3C]/50 focus:border-[#388E3C] transition-all font-sans text-gray-900"
          />
        </div>

        <button
          type="submit"
          disabled={loading || googleLoading}
          className="w-full h-12 mt-2 bg-[#388E3C] hover:bg-[#2e7d32] text-white font-medium rounded-xl transition-colors flex items-center justify-center font-sans shadow-sm disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            isSignUp ? 'Sign Up' : 'Log In'
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-100 text-center font-sans">
        <p className="text-sm text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
            className="text-[#388E3C] font-semibold hover:underline"
          >
            {isSignUp ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}
