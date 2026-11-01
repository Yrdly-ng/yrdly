import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getTicketById, markTicketScanned } from '@/lib/supabase-client'

const scanSchema = z.object({
  ticketId: z.string().min(1, 'Ticket ID is required'),
})

export async function POST(request: NextRequest) {
  try {
    const adminPassword = process.env.SCANNER_ADMIN_PASSWORD;
    if (!adminPassword) {
      return NextResponse.json(
        { success: false, message: 'Scanner is not configured.' },
        { status: 503 }
      );
    }
    // Authenticate: caller must supply the scanner admin password in the Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: invalid or missing admin credentials' },
        { status: 401 }
      );
    }

    const body = await request.json()
    const validatedData = scanSchema.parse(body)
    const { ticketId } = validatedData

    console.log('[scanner-v2] Scan request:', { ticketId })

    // 1. Look up ticket by ID via Supabase
    const ticket = await getTicketById(ticketId);

    if (!ticket) {
      console.log('[v0] Ticket not found in Supabase:', ticketId)
      return NextResponse.json(
        { success: false, message: 'Ticket not found. Please check the ticket ID.', scanned: false },
        { status: 404 }
      )
    }

    // 2. Check if already scanned
    if (ticket.scanned) {
      console.log('[v0] Ticket already scanned:', ticketId)
      
      return NextResponse.json(
        {
          success: false,
          message: `This ticket was already scanned at ${new Date(ticket.scanned_at).toLocaleString()}`,
          scanned: true,
          attendee: {
            email: ticket.email,
            eventName: ticket.event_name,
            scannedAt: ticket.scanned_at,
            qrCode: ticket.qr_code,
          },
        },
        { status: 400 }
      )
    }

    // 3. Mark ticket as scanned in Supabase
    const updatedTicket = await markTicketScanned(ticketId);
    
    console.log('[v0] Ticket marked as scanned in Supabase:', ticketId)

    return NextResponse.json(
      {
        success: true,
        message: 'Ticket verified successfully!',
        scanned: true,
        attendee: {
          email: updatedTicket.email,
          eventName: updatedTicket.event_name,
          scannedAt: updatedTicket.scanned_at,
        },
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('[v0] Scan error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while scanning the ticket.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
