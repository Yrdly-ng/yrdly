export const dynamic = 'force-dynamic';
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_APP_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_APP_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false } });
}

async function getLiveListings(supabase: any) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, text, author_name, image_urls, price, category, sub_category, state, lga, ward')
      .eq('category', 'For Sale')
      .eq('is_sold', false)
      .order('timestamp', { ascending: false })
      .limit(6);
      
    if (error || !data || data.length === 0) return null;
    return data;
  } catch (e) {
    return null;
  }
}

async function getLiveCategories(supabase: any) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('category, sub_category')
      .eq('category', 'For Sale')
      .eq('is_sold', false)
      .limit(1000);
      
    if (error || !data) return null;

    const counts: Record<string, number> = {};
    data.forEach((post: any) => {
      const cat = post.sub_category || post.category;
      if (cat) {
        counts[cat] = (counts[cat] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  } catch (e) {
    return null;
  }
}

const CATEGORY_ICONS: Record<string, string> = {
  "Fresh Produce": "🥬",
  "Home Services": "🔧",
  "Clothing & Fashion": "👗",
  "Clothing": "👗",
  "Electronics": "📱",
  "Food & Catering": "🍱",
  "Food": "🍱",
  "Furniture": "🛋️",
  "Beauty & Wellness": "💄",
  "Books & Education": "📚",
  "General": "📦",
  "Event": "🎉",
  "Vehicles": "🚗",
  "Property": "🏠",
  "Services": "🛠️"
};
const DEFAULT_ICON = "🏷️";

const CATEGORIES = [
  { icon: "🥬", name: "Fresh Produce", count: 142 },
  { icon: "🔧", name: "Home Services", count: 89 },
  { icon: "👗", name: "Clothing & Fashion", count: 216 },
  { icon: "📱", name: "Electronics", count: 74 },
  { icon: "🍱", name: "Food & Catering", count: 183 },
  { icon: "🛋️", name: "Furniture", count: 55 },
  { icon: "💄", name: "Beauty & Wellness", count: 127 },
  { icon: "📚", name: "Books & Education", count: 43 },
];

const LISTINGS = [
  { title: "Fresh Garden Eggs & Tomatoes", seller: "Mama Chika", estate: "Bodija Estate, Ibadan", price: "₦2,500/basket", tag: "Fresh Produce", img: "/images/market.jpg" },
  { title: "Professional Generator Repair", seller: "Tunde Electricals", estate: "GRA, Port Harcourt", price: "From ₦5,000", tag: "Home Services", img: "/images/trust.jpg" },
  { title: "Ankara Fabric & Tailoring", seller: "Bisi Fabrics", estate: "Maitama, Abuja", price: "₦8,000/yard", tag: "Clothing", img: "/images/market-2.jpg" },
  { title: "Home Catering — Parties & Events", seller: "Chef Kemi", estate: "Trans-Ekulu, Enugu", price: "From ₦35,000", tag: "Food", img: "/images/community-banner.jpg" },
  { title: "Used iPhone 13 — Excellent Condition", seller: "Adekola O.", estate: "Asokoro, Abuja", price: "₦420,000", tag: "Electronics", img: "/images/hero-community.jpg" },
  { title: "3-Seater Sofa — Moving Sale", seller: "Ngozi A.", estate: "Bompai, Kano", price: "₦75,000", tag: "Furniture", img: "/images/market.jpg" },
];

const HOW = [
  { n: "01", title: "Post in 60 seconds", body: "Add a photo, set a price, write a short description. Your listing goes live immediately to everyone in your community." },
  { n: "02", title: "Neighbours discover it", body: "Your listing appears in the neighbourhood feed and marketplace for every verified member of your community." },
  { n: "03", title: "Chat and agree", body: "Interested buyers message you directly in-app. Negotiate, agree terms, and arrange a meeting — all on Yrdly." },
  { n: "04", title: "Pay safely", body: "For large transactions, Paystack escrow holds payment until both sides confirm the deal. Zero risk." },
];

export const metadata = {
  title: "Marketplace - Yrdly",
  description: "Buy and sell with verified neighbours on your street — fresh produce, trusted services, secondhand items and more.",
  alternates: {
    canonical: "/marketplace",
  },
};

export default async function MarketplacePage() {
  const supabase = getSupabaseClient();
  const [liveData, liveCategories] = supabase 
    ? await Promise.all([getLiveListings(supabase), getLiveCategories(supabase)])
    : [null, null];
  
  const displayCategories = liveCategories && liveCategories.length > 0
    ? liveCategories.map((c: any) => ({
        icon: CATEGORY_ICONS[c.name] || DEFAULT_ICON,
        name: c.name,
        count: c.count
      }))
    : CATEGORIES;

  const displayListings = liveData ? liveData.map((post: any) => {
    const community = [post.ward || post.lga, post.state].filter(Boolean).join(', ');
    const formattedPrice = post.price 
      ? new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(post.price)
      : 'Contact for price';
      
    return {
      title: post.title || post.text || 'Untitled',
      seller: post.author_name || 'Anonymous',
      community: community || 'Nigeria',
      price: formattedPrice,
      tag: post.sub_category || post.category || 'For Sale',
      img: post.image_urls?.[0] || '/images/market.jpg',
      id: post.id
    };
  }) : LISTINGS.map(l => ({ ...l, community: l.estate, id: l.title }));

  return (
    <div style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <Header />

      {/* Hero */}
      <section style={{ paddingTop: 96, paddingBottom: "5rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", position: "relative", overflow: "hidden", minHeight: 520 }}>
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/images/market.jpg" alt="Nigerian marketplace" fill priority style={{ objectFit: "cover" }} />
        </div>
        {/* Dark overlay — always dark regardless of theme so white text reads */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right, rgba(8,22,8,0.90) 40%, rgba(8,22,8,0.68) 100%)" }} />
        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1152, margin: "0 auto", paddingTop: "4rem", paddingBottom: "3rem" }}>
          <Link
            href="/"
            style={{
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.7)",
              fontFamily: "var(--font-work-sans), sans-serif",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: 4,
              textDecoration: "none",
              width: "fit-content",
            }}
          >
            ← Back to Home
          </Link>
          <span className="pill" style={{ marginBottom: "1.25rem", display: "inline-flex", color: "#82DB7E", borderColor: "rgba(130,219,126,0.35)", background: "rgba(130,219,126,0.12)" }}>Neighbourhood Market</span>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 600,
              color: "#f0ede8",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
              maxWidth: 560,
            }}
          >
            Buy &amp; sell with{" "}
            <em style={{ color: "#82DB7E", fontStyle: "italic" }}>people you know.</em>
          </h1>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(240,237,232,0.75)", fontWeight: 300, maxWidth: 460, marginBottom: "2rem" }}>
            A local marketplace for your community — fresh produce, trusted services, secondhand items and more from verified neighbours.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <a href="https://app.yrdly.ng" target="_blank" rel="noreferrer" className="btn-cta">Browse Listings</a>
            <a href="https://app.yrdly.ng" target="_blank" rel="noreferrer" className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.35)", color: "#f0ede8" }}>Post a Listing Free</a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--section-alt)" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <span className="pill" style={{ marginBottom: "1rem", display: "inline-flex" }}>Browse by Category</span>
            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)", fontWeight: 600, color: "var(--fg)", lineHeight: 1.2 }}>
              What&apos;s available near you.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1rem" }}>
            {displayCategories.map((c, i) => (
              <a
                key={i}
                href="https://app.yrdly.ng"
                target="_blank"
                rel="noreferrer"
                className="redesign-card"
                style={{ padding: "1.5rem 1rem", textAlign: "center", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
              >
                <div style={{ fontSize: "1.75rem" }}>{c.icon}</div>
                <div className="font-display" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--fg)" }}>{c.name}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--fg-muted)" }}>{c.count} listings</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sample listings */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", marginBottom: "2.5rem" }}>
            <div>
              <span className="pill" style={{ marginBottom: "1rem", display: "inline-flex" }}>Recent Listings</span>
              <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)", fontWeight: 600, color: "var(--fg)", lineHeight: 1.2 }}>Fresh from your community.</h2>
            </div>
            <a href="https://app.yrdly.ng" target="_blank" rel="noreferrer" className="btn-outline" style={{ fontSize: "0.85rem" }}>See All Listings →</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {displayListings.map((l: any, i: number) => (
              <a key={l.id || i} href={l.id !== l.title ? `https://app.yrdly.ng/marketplace/${l.id}` : "https://app.yrdly.ng"} target="_blank" rel="noreferrer" className="redesign-card" style={{ overflow: "hidden", textDecoration: "none", display: "flex", flexDirection: "column" }}>
                <div style={{ height: 160, overflow: "hidden", background: "var(--bg-raised)" }}>
                  <Image src={l.img} alt={l.title} width={400} height={300} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }} />
                </div>
                <div style={{ padding: "1rem 1.25rem 1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <span className="pill" style={{ fontSize: "0.62rem", alignSelf: "flex-start", marginBottom: "0.5rem" }}>{l.tag}</span>
                  <h3 className="font-display" style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.3rem", lineHeight: 1.35 }}>{l.title}</h3>
                  <p style={{ fontSize: "0.78rem", color: "var(--fg-muted)", marginBottom: "0.625rem" }}>By {l.seller} · {l.community}</p>
                  <div className="font-display" style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--green-text)", marginTop: "auto" }}>{l.price}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "6rem 1.5rem", background: "var(--section-alt)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="pill" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>How It Works</span>
            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 600, color: "var(--fg)", lineHeight: 1.2 }}>
              Sell in four easy steps.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
            {HOW.map((h, i) => (
              <div key={i} style={{ padding: "1.75rem", borderRadius: 14, border: "1px solid var(--border)", background: "var(--bg-card)" }}>
                <div className="font-display" style={{ fontSize: "2rem", fontWeight: 300, color: "var(--green-text)", opacity: 0.5, marginBottom: "0.75rem", lineHeight: 1 }}>{h.n}</div>
                <h3 className="font-display" style={{ fontSize: "1rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.5rem" }}>{h.title}</h3>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--fg-muted)", fontWeight: 300 }}>{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust CTA */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🛡️</div>
          <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 600, color: "var(--fg)", lineHeight: 1.25, marginBottom: "0.75rem" }}>
            Trade with full confidence.
          </h2>
          <p style={{ fontSize: "0.93rem", lineHeight: 1.75, color: "var(--fg-muted)", fontWeight: 300, marginBottom: "2rem", maxWidth: 440, margin: "0 auto 2rem" }}>
            Every seller on Yrdly is a verified neighbour. Paystack escrow protects payments on larger transactions. You already know where they live — the safest marketplace in Nigeria.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
            <a href="https://app.yrdly.ng" target="_blank" rel="noreferrer" className="btn-cta">Start Buying &amp; Selling</a>
            <Link href="/learn-more" className="btn-outline">Learn About Trust &amp; Safety</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
