'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { CampaignData } from '@/lib/campaign-types';
import { appLink } from '@/lib/app-links';
import Image from 'next/image';

export function Leaderboard() {
  const [data, setData] = useState<CampaignData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const request = useRef(0);
  const refresh = useCallback(async () => {
    const id = ++request.current;
    setLoading(true);
    try {
      const response = await fetch('/api/campaigns/small-businesses', { cache: 'no-store' });
      if (!response.ok) throw new Error('Leaderboard unavailable. Please try again.');
      const result: CampaignData = await response.json();
      if (id === request.current) { setData(result); setError(''); }
    } catch { if (id === request.current) setError('Scores could not be refreshed. Please try again.'); }
    finally { if (id === request.current) setLoading(false); }
  }, []);
  useEffect(() => { const requests = request; const initial = window.setTimeout(() => void refresh(), 0); const onFocus = () => { if (document.visibilityState === 'visible') void refresh(); }; const interval = window.setInterval(onFocus, 60000); window.addEventListener('focus', onFocus); document.addEventListener('visibilitychange', onFocus); return () => { requests.current++; window.clearTimeout(initial); window.clearInterval(interval); window.removeEventListener('focus', onFocus); document.removeEventListener('visibilitychange', onFocus); }; }, [refresh]);
  const labels = { upcoming: 'Starts 1 November', active: 'Campaign active', review: 'Campaign ended · results under review', finalized: 'Final results' };
  return <section className="campaign-board" aria-labelledby="leaderboard-title" aria-busy={loading}>
    <div className="campaign-section-heading"><div><p className="campaign-eyebrow">THE CLIMB</p><h2 id="leaderboard-title">Every completed sale counts.</h2></div><button className="campaign-outline" onClick={() => void refresh()} disabled={loading}>{loading ? 'Refreshing…' : 'Refresh scores ↻'}</button></div>
    <p>Most completed sales wins. Naira value never determines your rank.</p>
    {data?.campaign.integrityReviewRequired && <p role="status" className="campaign-error">New evidence requires additional integrity review before any winner or prize action.</p>}
    {data && <p className="campaign-status">{labels[data.campaign.status]}{data.snapshot.provisional ? ' · Provisional standings' : ''}</p>}
    <p role="status" className={error ? 'campaign-error' : 'campaign-muted'}>{error ? `${data ? 'Showing older scores. ' : ''}${error}` : data ? `Calculated ${new Date(data.snapshot.updatedAt).toLocaleString('en-NG', {timeZone:'Africa/Lagos'})} WAT · ${data.snapshot.participantCount} participants` : loading ? 'Loading campaign standings…' : 'Leaderboard unavailable.'}</p>
    {data && (data.snapshot.entries.length ? <ol className="campaign-ranking">{data.snapshot.entries.map(entry => <li key={entry.businessId}><span className="campaign-rank">{entry.rank.toString().padStart(2,'0')}</span>{entry.logoUrl ? <Image unoptimized src={entry.logoUrl} alt="" width={48} height={48} /> : <span className="campaign-monogram" aria-hidden>{entry.name.slice(0,1)}</span>}<a href={appLink(`/businesses/${entry.businessId}`)}>{entry.name}<small>Approved participant · View business ↗</small></a><strong>{entry.completedSales}<small>completed sales</small></strong></li>)}</ol> : <div className="campaign-empty"><strong>{data.snapshot.participantCount ? 'The first sale is still ahead.' : 'Your business could be first.'}</strong><p>{data.snapshot.participantCount ? 'No qualifying completed sales yet.' : 'Approved businesses will appear here once enrollment is reviewed.'}</p></div>)}
  </section>;
}
