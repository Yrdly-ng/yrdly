import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { eventIsPast } from '@/lib/public-types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Connects to the Web App's Supabase project to read live published events.
// Uses the anon key — RLS on the events table must allow public SELECT on
// visible, published events (which it does by default in the app project).
const APP_SUPABASE_URL = process.env.NEXT_PUBLIC_APP_SUPABASE_URL;
const APP_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_APP_SUPABASE_ANON_KEY;

export async function GET(request: Request) {
  try {
    if (!APP_SUPABASE_URL || !APP_SUPABASE_ANON_KEY) {
      console.error('[events/api] App Supabase env vars not set. Returning empty list.');
      return NextResponse.json([], { status: 503 });
    }

    const supabase = createClient(APP_SUPABASE_URL, APP_SUPABASE_ANON_KEY);

    const eventId = new URL(request.url).searchParams.get("id");
    let query = supabase
      .from('events')
      .select(`
        id,
        title,
        description,
        category,
        cover_image_url,
        location_address,
        location_online,
        lga,
        state,
        start_time,
        end_time,
        status,
        visibility,
        attendee_count,
        ticket_tiers (
          id,
          name,
          price,
          capacity,
          sold,
          is_visible
        )
      `)
      .eq('status', 'PUBLISHED')
      .eq('visibility', 'PUBLIC')
      .order('start_time', { ascending: true })
      .limit(20);
    if (eventId) query = query.eq('id', eventId);
    const { data: events, error } = await query.abortSignal(AbortSignal.timeout(8000));

    if (error) {
      console.error('[events/api] Supabase query error:', error.message);
      return NextResponse.json([], { status: 503 });
    }

    // Transform to match the shape expected by the marketing events page
    const transformed = (events || []).map((event) => {
      const tiers = ((event.ticket_tiers as any[]) || []).filter(t => t.is_visible !== false);
      const lowestPrice = tiers.length
        ? Math.min(...tiers.map((t) => Number(t.price)))
        : 0;
      const totalCapacity = tiers.reduce(
        (sum, t) => sum + (t.capacity ?? 0),
        0
      );
      const totalSold = tiers.reduce((sum, t) => sum + (t.sold ?? 0), 0);
      const remainingTickets = Math.max(0, totalCapacity - totalSold);

      const startDate = new Date(event.start_time);
      const formattedDate = startDate.toLocaleDateString('en-NG', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: 'Africa/Lagos',
      });

      const location = event.location_online
        ? 'Online Event'
        : [event.location_address, event.lga, event.state]
            .filter(Boolean)
            .join(', ');

      const attendeesLabel =
        totalCapacity > 0
          ? remainingTickets === 0
            ? 'Sold Out'
            : `${remainingTickets} tickets left`
          : `${event.attendee_count ?? 0} attending`;

      return {
        id: event.id,
        name: event.title,
        date: formattedDate,
        time: startDate.toLocaleTimeString('en-NG', { hour: 'numeric', minute: '2-digit', timeZone: 'Africa/Lagos' }),
        start_time: event.start_time,
        end_time: event.end_time,
        state: event.state,
        lga: event.lga,
        location,
        attendees: attendeesLabel,
        image: event.cover_image_url || '',
        description: event.description || '',
        category: event.category || '',
        ticketCapacity: totalCapacity || null,
        lowestPrice,
        // Used by the events page to build the deep-link to app.yrdly.ng
        appEventUrl: `/events/${event.id}`,
      };
    });

    const now = new Date();
    transformed.sort((a, b) => {
      const aPast = eventIsPast(a, now);
      const bPast = eventIsPast(b, now);
      if (aPast !== bPast) return aPast ? 1 : -1;
      const delta = Date.parse(a.start_time) - Date.parse(b.start_time);
      return aPast ? -delta : delta;
    });
    return NextResponse.json(transformed);
  } catch (error) {
    console.error('[events/api] Unexpected error:', error);
    return NextResponse.json([], { status: 503 });
  }
}
