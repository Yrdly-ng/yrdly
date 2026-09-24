import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: "Frequently Asked Questions & Help Center - Yrdly",
  description: "Find comprehensive answers about Yrdly neighborhood verification, escrow payments, selling items, organizing local events, and safety guidelines.",
  alternates: {
    canonical: "/faq",
  },
};

const FAQ_CATEGORIES = [
  {
    category: "General & Account Verification",
    icon: "🏡",
    questions: [
      {
        q: "What is Yrdly and how does it work?",
        a: "Yrdly is a hyperlocal community platform designed specifically for Nigerian neighborhoods and estates. It connects verified residents living in the same local area so they can stay updated via a neighborhood feed, buy and sell fresh produce, secondhand items, and local services in a trusted marketplace, and organize or attend local estate events."
      },
      {
        q: "How does Yrdly verify that users actually live in a neighborhood?",
        a: "Location verification is a core foundation of Yrdly. When signing up, device GPS and location technology verify your presence in a specific estate or ward. For sellers, event hosts, and high-value transactions, additional identity checks (such as government-issued ID or NIN verification) ensure every participant is accountable."
      },
      {
        q: "Is Yrdly free to use?",
        a: "Yes! Joining your neighborhood network, browsing local listings, posting items for sale, and interacting with neighbors on the community feed is 100% free. Standard transaction processing fees apply only when using secure escrow payments or purchasing paid event tickets."
      }
    ]
  },
  {
    category: "Marketplace & Paystack / Payluk Escrow",
    icon: "🛍️",
    questions: [
      {
        q: "How does the Yrdly local marketplace protect buyers and sellers?",
        a: "Unlike open social platforms where fraudulent sellers operate anonymously, Yrdly limits listing discovery to verified local community members. For physical goods and higher-value deals, Yrdly integrates licensed escrow payments. The buyer's funds are safely locked until the buyer inspects the item in person and confirms satisfactory delivery."
      },
      {
        q: "What happens if a delivered item is not as described?",
        a: "If an item is defective, misrepresented, or not delivered, the buyer can flag a dispute before confirming order completion. Funds remain securely in escrow while our support team reviews the order details and chat records to issue a prompt refund."
      },
      {
        q: "How do sellers receive payouts after a successful sale?",
        a: "Once the buyer confirms delivery via the app, escrow funds are instantly released into the seller's Yrdly wallet balance. Sellers can withdraw their earnings directly to any Nigerian commercial bank account 24/7."
      }
    ]
  },
  {
    category: "Events & QR Ticket Verification",
    icon: "🎟️",
    questions: [
      {
        q: "How do I host an event in my estate or community?",
        a: "Any verified resident or local organization can create an event on Yrdly. Simply set your event name, date, venue location, ticket prices (free or paid), and capacity. Yrdly generates custom event pages, manages ticket sales via Paystack, and provides event organizers with a built-in QR scanner tool."
      },
      {
        q: "How do attendees receive and present their tickets?",
        a: "Upon purchasing or reserving a spot, attendees receive a digital ticket containing a unique QR code. At the venue gate, event staff scan the code using the Yrdly Scanner to validate entry instantly."
      }
    ]
  },
  {
    category: "Trust, Safety & Community Rules",
    icon: "🛡️",
    questions: [
      {
        q: "What community guidelines govern Yrdly users?",
        a: "Yrdly maintains strict zero-tolerance policies against fraud, harassment, misleading listings, counterfeit items, and spam. All users must treat neighbors with respect. Violations result in immediate account suspension and blacklisting across the network."
      },
      {
        q: "How do I report suspicious behavior or a bad listing?",
        a: "You can tap the 'Report' button on any post, listing, or user profile, or message our support team directly. Reports are reviewed by our safety compliance team within 24 hours."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)", display: "flex", flexDirection: "column" }}>
      <Header />

      {/* Hero */}
      <section style={{ paddingTop: 96, paddingBottom: "4rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", background: "var(--section-alt)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
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
          <span className="pill" style={{ marginBottom: "1rem", display: "inline-flex" }}>Help Center</span>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 600,
              color: "var(--fg)",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--fg-muted)", fontWeight: 300, maxWidth: 540 }}>
            Everything you need to know about using Yrdly, buyer protection, escrow payments, verified accounts, and estate events.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section style={{ padding: "4rem 1.5rem 6rem", flex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: "3rem" }}>
          {FAQ_CATEGORIES.map((cat, idx) => (
            <div key={idx}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "1.75rem" }}>{cat.icon}</span>
                <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 600, color: "var(--fg)" }}>
                  {cat.category}
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {cat.questions.map((item, qIdx) => (
                  <div
                    key={qIdx}
                    className="redesign-card"
                    style={{ padding: "1.75rem", background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)" }}
                  >
                    <h3 className="font-display" style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.6rem", lineHeight: 1.4 }}>
                      {item.q}
                    </h3>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "var(--fg-muted)", fontWeight: 300, margin: 0 }}>
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Need help CTA */}
          <div
            style={{
              padding: "2.5rem",
              borderRadius: 16,
              background: "var(--section-alt)",
              border: "1px solid var(--border-accent)",
              textAlign: "center",
              marginTop: "2rem",
            }}
          >
            <h3 className="font-display" style={{ fontSize: "1.3rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.5rem" }}>
              Still have questions?
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--fg-muted)", fontWeight: 300, marginBottom: "1.5rem", maxWidth: 460, margin: "0 auto 1.5rem" }}>
              Our support team is available 24/7 to assist with account verification, transaction queries, or community inquiries.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-cta">Contact Support</Link>
              <Link href="/learn-more" className="btn-outline">Explore Platform Features</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
