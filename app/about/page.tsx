import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";

const VALUES = [
  { icon: "🏘️", title: "Community First", body: "Every decision we make starts with one question: does this bring neighbours closer together? Not engagement metrics. Not growth rates. Community." },
  { icon: "🔒", title: "Trust as Default", body: "Every member is verified. Unverified people don't get in. This isn't a nice-to-have — it's the entire foundation of what Yrdly is." },
  { icon: "🇳🇬", title: "Proudly Nigerian", body: "We don't aspire to be a Nigerian copy of something foreign. We're building for how Nigerians actually live — communal, loud, warm, and deeply local." },
  { icon: "⚡", title: "Real-time or Nothing", body: "Stale information is useless in a community. We prioritise speed so that when something happens in your yard, you know about it now — not tomorrow." },
];

export const metadata = {
  title: "About Us - Yrdly",
  description: "We missed the spirit of the old neighbourhood. So we rebuilt it. Built for Nigerians, by Nigerians.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <Header />

      {/* Hero */}
      <section style={{ paddingTop: 96, paddingBottom: "5rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", position: "relative", overflow: "hidden", minHeight: 520 }}>
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/market-2.jpg"
            alt="Nigerian community gathering"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
        {/* Dark overlay — hardcoded so text always reads regardless of light/dark mode */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right, rgba(8,22,8,0.90) 40%, rgba(8,22,8,0.65) 100%)" }} />
        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1152, margin: "0 auto", paddingTop: "4rem", paddingBottom: "4rem" }}>
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
          <span className="pill" style={{ marginBottom: "1.25rem", display: "inline-flex", color: "#82DB7E", borderColor: "rgba(130,219,126,0.35)", background: "rgba(130,219,126,0.12)" }}>Our DNA</span>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 600,
              color: "#f0ede8",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
              maxWidth: 600,
            }}
          >
            About Us
          </h1>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.75, color: "rgba(240,237,232,0.75)", fontWeight: 300, maxWidth: 460 }}>
            We missed the spirit of the old neighbourhood. So we rebuilt it.
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="two-col">
          <div>
            <span className="pill" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>Our Story</span>
            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 600, color: "var(--fg)", lineHeight: 1.2, marginBottom: "1.5rem" }}>
              Built for Nigerians,{" "}
              <em style={{ color: "var(--green-text)", fontStyle: "italic" }}>by Nigerians.</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.95rem", lineHeight: 1.8, color: "var(--fg-muted)", fontWeight: 300 }}>
              <p>
                There was a time when you knew every face on your street. The woman whose jollof rice could settle any argument. The man who fixed your generator before yours even made smoke. That warm, spontaneous community spirit — deeply Nigerian — has been fading from our communities.
              </p>
              <p>
                Yrdly started from a simple frustration: we kept missing the best things happening around us. A neighbour selling homemade chin-chin two streets over. A block party with the best afrobeats DJ. A trusted mechanic in the next community.
              </p>
              <p>
                We built Yrdly so none of that gets missed. Not a platform that tries to make Nigerian neighbourhoods look like somewhere else — but one that makes them feel like Nigeria again.
              </p>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--border-accent)" }}>
              <Image src="/images/community-banner.jpg" alt="Nigerian neighbourhood community" width={700} height={380} style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }} />
            </div>
            <div className="redesign-card" style={{ position: "absolute", bottom: -20, left: -24, padding: "1rem 1.25rem", maxWidth: 200, background: "var(--bg-card)" }}>
              <div style={{ fontSize: "1.3rem", marginBottom: 4 }}>🏘️</div>
              <p style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--fg)", lineHeight: 1.4 }}>10+ communities across Nigeria and counting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--section-alt)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <span className="pill" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>Our Mission</span>
          <blockquote
            className="font-display"
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--fg)",
              lineHeight: 1.45,
              margin: 0,
            }}
          >
            &ldquo;To rebuild the spirit of Nigerian community — one community at a time — by connecting neighbours through trust, commerce, and celebration.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="pill" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>What We Stand For</span>
            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 600, color: "var(--fg)", lineHeight: 1.2 }}>Our values.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {VALUES.map((v, i) => (
              <div key={i} className="redesign-card" style={{ padding: "2rem" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>{v.icon}</div>
                <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.625rem" }}>{v.title}</h3>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--fg-muted)", fontWeight: 300 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where we are */}
      <section style={{ padding: "6rem 1.5rem", background: "var(--section-alt)" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="two-col">
            <div>
              <span className="pill" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>Where We Are</span>
              <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 600, color: "var(--fg)", lineHeight: 1.2, marginBottom: "1.25rem" }}>
                From Kano to Port Harcourt,{" "}
                <em style={{ color: "var(--green-text)", fontStyle: "italic" }}>we&apos;re growing.</em>
              </h2>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--fg-muted)", fontWeight: 300, marginBottom: "2rem" }}>
                We started in a single community in Ibadan. Today, Yrdly communities exist across Oyo, Lagos, Abuja, Rivers, Enugu, Kano, and Delta States. Every week, a new community joins — and we&apos;re just getting started.
              </p>
            </div>
            <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)", position: "relative" }}>
                <Image src="/images/hero-community.jpg" alt="Nigerian community event" width={700} height={380} style={{ width: "100%", height: 380, objectFit: "cover", display: "block", position: "absolute", inset: 0 }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0, 0, 0, 0.4)", zIndex: 1 }} />
              </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "var(--fg)", lineHeight: 1.2, marginBottom: "1rem" }}>
            Ready to join your yard?
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--fg-muted)", fontWeight: 300, marginBottom: "2rem" }}>
            Thousands of Nigerians are already connecting with their neighbours on Yrdly. Don&apos;t miss out on what&apos;s happening in your community.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
            <a href="https://app.yrdly.ng" target="_blank" rel="noreferrer" className="btn-cta">Join Your Community</a>
            <Link href="/contact" className="btn-outline">Get in Touch</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
