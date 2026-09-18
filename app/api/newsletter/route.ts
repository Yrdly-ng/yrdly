import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendWelcomeEmail, addAttendeeContact } from '@/lib/resend-email';
import { checkRateLimit, recordRateLimit } from '@/lib/supabase-client';

// Validation schema for newsletter signup
const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  source: z.string().optional().default('newsletter-signup'),
});

// Re-use the same Supabase-backed rate limit pattern as register-v2:
// max 5 newsletter signups per IP per event window ('newsletter' as the eventId key)
const RATE_LIMIT_MAX = 5;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = newsletterSchema.parse(body);
    const { email, source } = validatedData;

    // ── IP Rate Limiting ──────────────────────────────────────────────────────
    try {
      const forwardedFor = request.headers.get('x-forwarded-for');
      const ip = (
        forwardedFor
          ? forwardedFor.split(',')[0].trim()
          : request.headers.get('x-real-ip') || 'unknown'
      ).substring(0, 45);

      const rateLimitCount = await checkRateLimit(ip, 'newsletter');
      if (rateLimitCount >= RATE_LIMIT_MAX) {
        return NextResponse.json(
          { success: false, message: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }
      await recordRateLimit(ip, 'newsletter');
    } catch (rlError) {
      console.warn('Rate limiting non-fatal error:', rlError);
    }

    // ── Send welcome email ────────────────────────────────────────────────────
    const emailResult = await sendWelcomeEmail({
      email,
      source,
      name: undefined,
    });

    if (!emailResult.success) {
      console.error('Failed to send welcome email:', emailResult.error);
    }

    // ── Persist contact to Resend audience ───────────────────────────────────
    await addAttendeeContact({ email, name: undefined, eventName: 'Newsletter' });

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to newsletter! Check your email for a welcome message.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter signup error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email address',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}
