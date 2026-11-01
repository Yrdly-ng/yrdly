import { NextResponse } from 'next/server';
import { APP_URL } from '@/lib/app-links';
import { publicCampaignSchema } from '@/lib/campaign-schema';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const response = await fetch(`${APP_URL.replace(/\/$/, '')}/api/campaigns/small-businesses`, { cache: 'no-store', signal: AbortSignal.timeout(10000) });
    if (!response.ok) return NextResponse.json({ error: 'Leaderboard temporarily unavailable' }, { status: 503 });
    return NextResponse.json(publicCampaignSchema.parse(await response.json()), { headers: { 'Cache-Control': 'no-store' } });
  } catch { return NextResponse.json({ error: 'Leaderboard temporarily unavailable' }, { status: 503 }); }
}
