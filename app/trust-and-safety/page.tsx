import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: "Trust & Safety Guidelines - Yrdly",
  description: "Learn how Yrdly marketplace escrow, in-app reporting, payout bank account-name lookups, and community guidance protect your neighborhood transactions.",
  alternates: {
    canonical: "/trust-and-safety",
  },
};

const P = { fontSize: "0.9rem", lineHeight: 1.8, color: "var(--fg-muted)", fontWeight: 300 } as const;

export default function TrustAndSafetyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)", display: "flex", flexDirection: "column" }}>
      <Header />

      {/* Header band */}
      <section style={{ paddingTop: 96, paddingBottom: "4rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", background: "var(--section-alt)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
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
          <span className="pill" style={{ marginBottom: "1rem", display: "inline-flex" }}>Community Standards</span>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
              fontWeight: 600,
              color: "var(--fg)",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}
          >
            Trust &amp; Safety
          </h1>
          <p style={{ fontSize: "0.9rem", color: "var(--fg-muted)", fontWeight: 300 }}>Last updated: October 5, 2026 • Yrdly Technologies Limited (RC: 9267059)</p>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: "4rem 1.5rem 6rem", flex: 1 }}>
        <div
          className="redesign-card"
          style={{ maxWidth: 800, margin: "0 auto", padding: "2.5rem 2rem", background: "var(--bg-card)" }}
        >
          <p style={{ ...P, marginBottom: "1.5rem" }}>
            At Yrdly, building local community connections requires accountability, secure commerce tools, and clear safety guidance. We provide platform protections for local transactions alongside community standards for all members.
          </p>
          <p style={{ ...P, marginBottom: "2.5rem" }}>
            This document outlines the active trust controls built into the Yrdly platform, followed by practical safety advice for conducting peer-to-peer exchanges in your neighborhood.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            <div>
              <h2 className="font-display" style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                1. Platform Safety Features
              </h2>
              <p style={{ ...P, marginBottom: "1rem" }}>
                Yrdly integrates technical protections directly into the marketplace workflow to help prevent fraud and resolve issues:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <h3 className="font-display" style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.4rem" }}>
                    Marketplace Escrow Protection
                  </h3>
                  <p style={P}>
                    Payments for marketplace purchases are processed through our payment partner, Payluk, and held in escrow until the buyer confirms the transaction. When you purchase a secondhand item or marketplace product, your funds remain securely locked in escrow while you arrange delivery or handover. Once you meet the seller, inspect the physical item, and approve its condition, you release the funds to the seller inside the app.
                  </p>
                </div>
                <div>
                  <h3 className="font-display" style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.4rem" }}>
                    In-App Reporting System
                  </h3>
                  <p style={P}>
                    Users can report suspicious behaviour, spam, or safety issues directly from within the app (accessible via account settings and community guidelines at <code style={{ fontSize: "0.85rem", background: "var(--bg-raised)", padding: "0.15rem 0.4rem", borderRadius: 4 }}>settings/report</code> and <code style={{ fontSize: "0.85rem", background: "var(--bg-raised)", padding: "0.15rem 0.4rem", borderRadius: 4 }}>settings/guidelines</code>). When a report is submitted, your account information and report details are routed to our moderation system for review and appropriate compliance action.
                  </p>
                </div>
                <div>
                  <h3 className="font-display" style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.4rem" }}>
                    Payout Bank Account-Name Lookup
                  </h3>
                  <p style={P}>
                    Before any seller can withdraw funds or receive payouts on Yrdly, sellers&apos; payout account names are checked through our payment partner before payouts. This check confirms that the destination bank account number matches the official account title provided during payout setup.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display" style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                2. Guidance: Safe Meetups &amp; Item Inspection
              </h2>
              <p style={{ ...P, marginBottom: "1rem" }}>
                While our escrow system protects your payment, physical safety during local handovers is equally important. Please observe the following recommendations when meeting neighbours:
              </p>
              <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <li style={P}>
                  <strong style={{ color: "var(--fg)" }}>Meet in Public Places:</strong> Choose well-lit, busy locations such as estate security gates, neighborhood commercial plazas, or popular cafes for item exchanges.
                </li>
                <li style={P}>
                  <strong style={{ color: "var(--fg)" }}>Schedule During Daylight Hours:</strong> Arrange all physical meetings during daytime hours whenever possible.
                </li>
                <li style={P}>
                  <strong style={{ color: "var(--fg)" }}>Bring a Friend or Companion:</strong> Inform a friend, family member, or neighbor about your meeting location, or invite them to accompany you.
                </li>
                <li style={P}>
                  <strong style={{ color: "var(--fg)" }}>Inspect Items Thoroughly Before Releasing Funds:</strong> Carefully test electronic devices, examine furniture, or check product authenticity before confirming completion in the app. Do not release escrow funds until you are satisfied with the item.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display" style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                3. Guidance: Recognizing Scam Warning Signs
              </h2>
              <p style={{ ...P, marginBottom: "1rem" }}>
                Protect yourself from common fraud tactics by staying alert to these red flags:
              </p>
              <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <li style={P}>
                  <strong style={{ color: "var(--fg)" }}>Pressure to Pay Outside the App:</strong> Be cautious if a buyer or seller asks you to bypass in-app escrow and send direct bank transfers or cash off-platform. Off-platform transactions cannot be protected by our dispute process.
                </li>
                <li style={P}>
                  <strong style={{ color: "var(--fg)" }}>Prices Too Good to Be True:</strong> Extremely low prices on high-value electronics or luxury items are often indicators of counterfeit goods or fraudulent offers.
                </li>
                <li style={P}>
                  <strong style={{ color: "var(--fg)" }}>Refusal to Meet or Inspect:</strong> Be suspicious if a party refuses to allow physical inspection or insists on using third-party couriers without escrow protection.
                </li>
                <li style={P}>
                  <strong style={{ color: "var(--fg)" }}>Requests for Personal Financial Credentials:</strong> Yrdly staff will never ask for your account password, PIN, or credit card details over chat or phone.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display" style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                4. Guidance: How to Report an Incident
              </h2>
              <p style={{ ...P, marginBottom: "1rem" }}>
                If you encounter inappropriate behavior, listing misrepresentation, or suspicious activity:
              </p>
              <ol style={{ listStyle: "decimal", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <li style={P}>
                  Tap the <strong style={{ color: "var(--fg)" }}>Report</strong> button on the listing, post, or user profile in the app.
                </li>
                <li style={P}>
                  Select the appropriate category (e.g., Fraud, Misleading Information, Harassment, or Spam) and provide details.
                </li>
                <li style={P}>
                  Alternatively, email our support team directly at{" "}
                  <a href="mailto:support@yrdly.ng" style={{ color: "var(--green-text)", textDecoration: "underline" }}>
                    support@yrdly.ng
                  </a>{" "}
                  with screenshots and listing links.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
