import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";

const FEATURES = [
  {
    icon: "📡",
    title: "Neighbourhood Feed",
    body: "A real-time stream of everything happening in your community. Announcements, listings, events, alerts — all from verified neighbours who actually live around you. No noise from outside your boundary.",
    details: ["Location-gated content", "Real-time notifications", "Post text, photos, and links", "React and comment with neighbours"],
  },
  {
    icon: "🛒",
    title: "Local Marketplace",
    body: "Buy and sell with people a few streets away. Fresh produce, electronics, furniture, services — everything from trusted neighbours. No delivery surprises, no random strangers.",
    details: ["Verified seller profiles", "Paystack escrow for large transactions", "In-app direct messaging", "Saved items and wishlists"],
  },
  {
    icon: "🏪",
    title: "Business Directory",
    body: "Every community has talented people running small businesses. Yrdly puts them in front of their closest customers — the people living around them.",
    details: ["Free business listings", "Customer reviews from neighbours", "Direct WhatsApp and call links", "Category browsing (food, repairs, beauty...)"],
  },
  {
    icon: "🎉",
    title: "Events & Activities",
    body: "Create events, sell tickets, and manage attendance — all within Yrdly. Attendees get QR-coded tickets on their phone. Organisers scan at the gate.",
    details: ["Paystack ticket payments", "QR code check-in tool", "Event co-hosting", "RSVP and waiting lists"],
  },
  {
    icon: "💬",
    title: "Direct Messaging",
    body: "Message any verified neighbour directly. Negotiate a price, ask about an event, or just say hello. Private, secure, and only available to verified members.",
    details: ["End-to-end encrypted DMs", "Share listings in chat", "Group chats for community committees", "Read receipts and media sharing"],
  },
  {
    icon: "🛡️",
    title: "Safety & Trust",
    body: "Safety is not a feature — it's the product. Location verification, Paystack escrow, and a one-tap reporting system mean every interaction on Yrdly is accountable.",
    details: ["Location verification at signup", "Government ID optional verification", "Paystack escrow for transactions", "One-tap reporting with 24hr response"],
  },
];

const ADVANTAGE = [
  { icon: "📍", title: "Hyperlocal", body: "Your feed only shows what's within your community boundary. No noise from across the country." },
  { icon: "🤝", title: "Community First", body: "Built for people who know their neighbours' names. Relationships over transactions, always." },
  { icon: "⚡", title: "Real-time Alerts", body: "Security notices, last-minute event spots — know before the street gist goes cold." },
  { icon: "🔐", title: "Community Verified", body: "No anonymous accounts. Every person on Yrdly has been verified to actually live in their community." },
];

const STEPS = [
  { n: "1", title: "Download & Sign Up", body: "Get the Yrdly app on your phone. Sign up with your email or Google account." },
  { n: "2", title: "Verify Your Location", body: "We use your device location to confirm which community you live in. This is what keeps your feed local." },
  { n: "3", title: "Complete Your Profile", body: "Add your name, a photo, and a short bio. Neighbours trust people who show up properly." },
  { n: "4", title: "Join Your Community", body: "Select your community from the list. You're now part of your neighbourhood community." },
  { n: "5", title: "Start Engaging", body: "Browse the feed, post a listing, discover events — your community is waiting for you." },
];

export const metadata = {
  title: "Learn More - Yrdly",
  description: "A full breakdown of every Yrdly feature — feed, marketplace, business directory, events, messaging, and safety.",
  alternates: {
    canonical: "/learn-more",
  },
};

export default function LearnMorePage() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <Header />

      {/* Hero */}
      <section style={{ paddingTop: 96, paddingBottom: "4rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", background: "var(--section-alt)" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <Link
            href="/"
            style={{
              fontSize: "0.82rem",
              color: "var(--fg-muted)",
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
          <span className="pill" style={{ marginBottom: "1rem", display: "inline-flex" }}>Platform Deep Dive</span>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 600,
              color: "var(--fg)",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Everything Yrdly{" "}
            <em style={{ color: "var(--green-text)", fontStyle: "italic" }}>can do for your community.</em>
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--fg-muted)", fontWeight: 300, maxWidth: 520 }}>
            A full breakdown of every feature — built around how Nigerians actually live in their communities.
          </p>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div style={{ display: "grid", gap: "2rem" }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="redesign-card feat-card">
                <div>
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{f.icon}</div>
                  <h3 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>{f.title}</h3>
                  <p style={{ fontSize: "0.93rem", lineHeight: 1.75, color: "var(--fg-muted)", fontWeight: 300 }}>{f.body}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "1rem" }}>What&apos;s included</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {f.details.map((d, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                        <span style={{ color: "var(--green-text)", fontSize: "0.8rem", fontWeight: 600, flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: "0.875rem", color: "var(--fg-muted)" }}>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Yrdly Advantage */}
      <section style={{ padding: "6rem 1.5rem", background: "var(--section-alt)" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="pill" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>The Yrdly Advantage</span>
            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 600, color: "var(--fg)", lineHeight: 1.2 }}>
              Why Yrdly is different.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {ADVANTAGE.map((a, i) => (
              <div key={i} className="redesign-card" style={{ padding: "1.75rem" }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "0.875rem" }}>{a.icon}</div>
                <h3 className="font-display" style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.5rem" }}>{a.title}</h3>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--fg-muted)", fontWeight: 300 }}>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section style={{ padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="two-col">
            <div>
              <span className="pill" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>Security & Trust</span>
              <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 600, color: "var(--fg)", lineHeight: 1.2, marginBottom: "1.25rem" }}>
                Your safety is the{" "}
                <em style={{ color: "var(--green-text)", fontStyle: "italic" }}>whole product.</em>
              </h2>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--fg-muted)", fontWeight: 300, marginBottom: "1.5rem" }}>
                Security isn&apos;t a feature we bolted on. It&apos;s the foundation everything else is built on. Here&apos;s what protects you on Yrdly:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { icon: "📍", title: "Location Verification", body: "Verified at signup using your device's GPS. Can't fake your community." },
                  { icon: "💳", title: "Paystack Escrow", body: "Payments are held in escrow until both parties confirm the deal is done." },
                  { icon: "🔒", title: "Privacy Controls", body: "Your address, phone number, and full name are never publicly visible." },
                  { icon: "🚨", title: "One-Tap Reporting", body: "Report anything suspicious in one tap. Response within 24 hours, guaranteed." },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--pill-bg)", border: "1px solid var(--border-accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>{s.icon}</div>
                    <div>
                      <div className="font-display" style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--fg)", marginBottom: 3 }}>{s.title}</div>
                      <div style={{ fontSize: "0.85rem", color: "var(--fg-muted)", lineHeight: 1.6 }}>{s.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--border-accent)" }}>
              <Image src="/images/trust.jpg" alt="Community trust" width={700} height={420} style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding */}
      <section style={{ padding: "6rem 1.5rem", background: "var(--section-alt)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="pill" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>Getting Started</span>
            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 600, color: "var(--fg)", lineHeight: 1.2 }}>
              Up and running in 5 steps.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden", background: "var(--bg-card)" }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: "1.5rem", padding: "1.5rem 2rem", borderBottom: i < STEPS.length - 1 ? "1px solid var(--border)" : "none", alignItems: "flex-start" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--pill-bg)", border: "1px solid var(--border-accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700, color: "var(--green-text)", flexShrink: 0 }}>{s.n}</div>
                <div>
                  <h3 className="font-display" style={{ fontWeight: 600, fontSize: "1rem", color: "var(--fg)", marginBottom: "0.3rem" }}>{s.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--fg-muted)", lineHeight: 1.65, fontWeight: 300 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <a href="https://app.yrdly.ng" target="_blank" rel="noreferrer" className="btn-cta">Get Started Free</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "var(--fg)", lineHeight: 1.2, marginBottom: "1rem" }}>
            Still have questions?
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--fg-muted)", fontWeight: 300, marginBottom: "2rem" }}>
            Our team is always available to help. Whether you want to host an event, join a new community, or just understand how things work — reach out.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
            <a href="https://app.yrdly.ng" target="_blank" rel="noreferrer" className="btn-cta">Open Yrdly App</a>
            <Link href="/contact" className="btn-outline">Contact Support</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
