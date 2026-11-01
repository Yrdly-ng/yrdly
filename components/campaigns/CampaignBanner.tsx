import Link from 'next/link';

export function CampaignBanner() {
  return <aside className="wrap" style={{paddingBlock: 20}}><Link href="/campaigns/small-businesses" style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:20,flexWrap:'wrap',padding:'24px 28px',borderRadius:24,background:'#F6DB13',color:'#123B27',textDecoration:'none'}}><span><span style={{fontSize:11,fontWeight:800,letterSpacing:2}}>YRDLY × SMALL BUSINESSES</span><strong style={{display:'block',fontSize:'clamp(24px,4vw,38px)',lineHeight:1.2,marginTop:6}}>Sell More. Win Big.</strong><span style={{display:'block',marginTop:8}}>₦500,000 first prize · November 2026</span></span><span style={{fontWeight:700}}>View campaign ↗</span></Link></aside>;
}
