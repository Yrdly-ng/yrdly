import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactEmail } from '@/lib/resend-email';

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = contactSchema.parse(body);
    const { name, email, subject, message } = validatedData;

    // Log the contact form submission
    console.log('Contact form submission:', { 
      name, 
      email, 
      subject, 
      messageLength: message.length,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    });
    
    // Send contact email to support team
    const emailResult = await sendContactEmail({
      name,
      email,
      subject: subject || 'Contact Form Submission',
      message,
    });
    
    if (!emailResult.success) {
      console.error('Failed to send contact email:', emailResult.error);
      // Don't fail the contact form if email fails, just log it
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully! We\'ll get back to you within 24 hours.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please check your input and try again',
          errors: error.errors 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send message. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
