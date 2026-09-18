import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@yrdly.ng';

if (!RESEND_API_KEY) {
  console.warn('WARNING: RESEND_API_KEY is not defined in environment variables.');
}

// Initialize Resend — will throw on first use if key is missing (functions guard with early throws)
const resend = new Resend(RESEND_API_KEY);

export interface EmailData {
  email: string;
  name?: string;
  source?: string;
}

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendWelcomeEmail({ email, name, source }: EmailData) {
  try {
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured');

    const data = await resend.emails.send({
      from: `Yrdly Team <${FROM_EMAIL}>`,
      to: [email],
      subject: "Welcome to Yrdly Newsletter! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Yrdly</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px;">
              <!-- Header -->
              <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #16a34a;">
                <h1 style="color: #16a34a; margin: 0; font-size: 28px;">Welcome to Yrdly!</h1>
                <p style="color: #666; margin: 10px 0 0 0;">Your Neighborhood Network</p>
              </div>
              
              <!-- Main Content -->
              <div style="padding: 30px 20px;">
                <h2 style="color: #333; margin-bottom: 20px;">Thanks for joining our community! 🎉</h2>
                
                <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                  Hi${name ? ` ${name}` : ''}! We're excited to have you as part of the Yrdly community. 
                  You'll now receive updates about what's happening in your neighborhood.
                </p>
                
                <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 20px; margin: 20px 0;">
                  <h3 style="color: #16a34a; margin-top: 0;">What you'll receive:</h3>
                  <ul style="color: #555; line-height: 1.8;">
                    <li>🏠 <strong>New local listings</strong> - Items for sale in your area</li>
                    <li>🎉 <strong>Community events</strong> - Meetups and local happenings</li>
                    <li>💰 <strong>Special deals</strong> - Exclusive offers from local businesses</li>
                    <li>📱 <strong>Platform updates</strong> - New features and improvements</li>
                  </ul>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <p style="color: #16a34a; font-weight: bold; font-size: 18px;">
                    Stay tuned for the Yrdly app launch!
                  </p>
                </div>
                
                <p style="color: #666; font-size: 14px; line-height: 1.5;">
                  <strong>Signup Source:</strong> ${source || 'Newsletter'}<br>
                  <strong>Date:</strong> ${new Date().toLocaleDateString()}
                </p>
              </div>
              
              <!-- Footer -->
              <div style="border-top: 1px solid #eee; padding: 20px; text-align: center; color: #666; font-size: 12px;">
                <p>© 2026 Yrdly. All rights reserved.</p>
                <p>
                  <a href="https://yrdly.ng/unsubscribe" style="color: #16a34a;">Unsubscribe</a> | 
                  <a href="https://yrdly.ng/privacy-policy" style="color: #16a34a;">Privacy Policy</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `
    });

    if (data.error) {
      throw new Error(data.error.message);
    }

    console.log('Resend welcome email sent successfully:', {
      email,
      messageId: data.data?.id
    });
    
    return { success: true, messageId: data.data?.id };
  } catch (error) {
    console.error('Resend welcome email error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function sendContactEmail({ name, email, subject, message }: ContactData) {
  try {
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured');

    const data = await resend.emails.send({
      from: `Contact Form <${FROM_EMAIL}>`,
      to: ['support@yrdly.ng'],
      replyTo: email,
      subject: `Contact Form: ${subject || 'Inquiry'}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px;">
              <h2 style="color: #16a34a;">New Message via Yrdly</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <div style="background-color: #f9f9f9; padding: 15px; margin-top: 20px; border-radius: 4px;">
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          </body>
        </html>
      `
    });

    if (data.error) {
      throw new Error(data.error.message);
    }

    return { success: true, messageId: data.data?.id };
  } catch (error) {
    console.error('Resend contact email error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function sendTicketEmail({ 
  email, 
  name, 
  eventName, 
  ticketId, 
  qrCodeDataUrl,
  qrCode 
}: EmailData & { eventName: string, ticketId: string, qrCodeDataUrl?: string, qrCode?: string }) {
  try {
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured');
    
    const finalQrCode = qrCode || qrCodeDataUrl;
    if (!finalQrCode) throw new Error('QR code data is missing');

    const base64Content = finalQrCode.split(',')[1];
    if (!base64Content) throw new Error('Invalid QR code format');

    const data = await resend.emails.send({
      from: `Yrdly Events <${FROM_EMAIL}>`,
      to: [email],
      subject: `Your Ticket for ${eventName} - ${ticketId}`,
      attachments: [{
        filename: 'ticket-qr.png',
        content: base64Content
      }],
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Your Ticket</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb;">
            <div style="max-width: 600px; margin: 40px auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              <div style="background-color: #16a34a; padding: 32px 20px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">YOUR TICKET</h1>
                <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0;">Yrdly Community Events</p>
              </div>
              <div style="padding: 40px 32px; text-align: center;">
                <p style="color: #6b7280; font-size: 14px; text-transform: uppercase;">Event Details</p>
                <h2 style="color: #111827; margin: 8px 0 32px 0;">${eventName}</h2>
                <div style="background-color: #f3f4f6; border-radius: 8px; padding: 24px; display: inline-block;">
                  <!-- Note: Resend supports attaching files, but cid: inline images can be tricky. We'll attach it. -->
                  <p style="font-size: 14px; margin-bottom: 12px;">See attached QR Code (ticket-qr.png)</p>
                  <div style="border-top: 1px dashed #d1d5db; padding-top: 16px;">
                     <p style="margin: 0; font-family: monospace; font-size: 18px; color: #111827; font-weight: 700;">${ticketId}</p>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `
    });

    if (data.error) throw new Error(data.error.message);

    return { success: true, messageId: data.data?.id };
  } catch (error) {
    console.error('Resend ticket email error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

let cachedAudienceId = process.env.RESEND_AUDIENCE_ID;

export async function addAttendeeContact({ email, name, eventName }: { email: string, name?: string, eventName: string }) {
  try {
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured');
    
    let targetAudienceId = process.env.RESEND_AUDIENCE_ID || cachedAudienceId;

    if (!targetAudienceId) {
      const audiences = await resend.audiences.list();
      if (audiences.data?.data && audiences.data.data.length > 0) {
        targetAudienceId = audiences.data.data[0].id;
        cachedAudienceId = targetAudienceId;
      }
    }
    
    if (targetAudienceId) {
      await resend.contacts.create({
        email,
        firstName: name,
        audienceId: targetAudienceId
      });
      console.log('Added contact to Resend audience', email, 'Audience ID:', targetAudienceId);
    } else {
      console.warn('Skipping contact addition: No Resend audience ID found');
    }
    return { success: true };
  } catch (error) {
    console.error('Resend contact add error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
