import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: "Terms of Service - Yrdly",
  description: "The Terms of Service governing your use of the Yrdly platform and services.",
  alternates: {
    canonical: "/terms",
  },
};

const P = { fontSize: "0.9rem", lineHeight: 1.8, color: "var(--fg-muted)", fontWeight: 300 } as const;

export default function TermsPage() {
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
          <span className="pill" style={{ marginBottom: "1rem", display: "inline-flex" }}>Legal</span>
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
            Terms of Service
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
            These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you and <strong>Yrdly Technologies Limited</strong> (&ldquo;Yrdly&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), a company incorporated in Nigeria with RC Number 9267059. These Terms govern your access to and use of the Yrdly website (yrdly.ng), mobile applications (app.yrdly.ng), and related tools (collectively, the &ldquo;Platform&rdquo;).
          </p>
          <p style={{ ...P, marginBottom: "2.5rem" }}>
            By creating an account, browsing listings, or using any feature on Yrdly, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, you must immediately cease accessing the Platform.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            <div>
              <h2 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                1. Acceptance &amp; Eligibility
              </h2>
              <p style={P}>You must be at least 18 years old or the legal age of majority in your jurisdiction to register an account on Yrdly. By registering, you warrant that you have full legal capacity to enter into a binding agreement under the laws of the Federal Republic of Nigeria.</p>
            </div>

            <div>
              <h2 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                2. Account Registration &amp; Security
              </h2>
              <p style={P}>You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate, current, and complete profile information during registration. Creating fake profiles, impersonating neighbours, or operating duplicate accounts is strictly prohibited and will result in immediate account suspension.</p>
            </div>

            <div>
              <h2 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                3. Marketplace &amp; Escrow Rules
              </h2>
              <p style={P}>Yrdly provides a peer-to-peer neighborhood marketplace connecting local buyers and sellers. When transacting through our integrated payment features:</p>
              {/* LAWYER REVIEW: escrow holder wording */}
              <p style={{ ...P, marginTop: "0.5rem" }}>
                Payments for marketplace purchases are processed through our payment partner, Payluk, and held in escrow until the buyer confirms the transaction.
              </p>
              <p style={{ ...P, marginTop: "0.5rem" }}>
                When you buy an item using escrow, your payment is held securely until you meet the seller and verify the item is in the described condition. Once you inspect and approve the item in the app, funds are released to the seller. If you inspect an item and find it significantly misrepresented, you must file a dispute before releasing funds.
              </p>
            </div>

            <div>
              <h2 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                4. Prohibited Conduct &amp; Content Standards
              </h2>
              <p style={P}>Users are strictly forbidden from engaging in the following conduct on the Platform:</p>
              <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                <li style={P}>Posting stolen, illegal, counterfeit, or prohibited goods or services.</li>
                <li style={P}>Attempting financial fraud, advance-fee scams, or misrepresenting identity.</li>
                <li style={P}>Harassing, threatening, or defaming neighbours, or posting hateful content.</li>
                <li style={P}>Scraping data or attempting unauthorized access to server infrastructure.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                5. User Content &amp; Intellectual Property
              </h2>
              <p style={P}>You retain ownership of photos, listings, text, and media you upload to Yrdly. By uploading content, you grant Yrdly a non-exclusive, worldwide, royalty-free license to display and distribute that content to operate and promote the Platform. Yrdly owns all software, logos, trademarks, and design systems associated with the Platform.</p>
            </div>

            <div>
              <h2 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                6. Limitation of Liability
              </h2>
              <p style={P}>To the maximum extent permitted by applicable law, Yrdly Technologies Limited, its directors, employees, and agents shall not be liable for any indirect, incidental, special, or consequential damages resulting from user interactions, off-platform transactions, or unverified claims. All services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.</p>
            </div>

            <div>
              <h2 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                7. Dispute Resolution &amp; Governing Law
              </h2>
              {/* LAWYER REVIEW: dispute resolution clause */}
              <p style={P}>These Terms are governed by the laws of the Federal Republic of Nigeria. If a dispute arises, please contact support@yrdly.ng so we can try to resolve it in good faith.</p>
            </div>

            <div>
              <h2 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                8. Account Termination &amp; Policy Changes
              </h2>
              <p style={P}>We reserve the right to suspend or terminate accounts that violate these Terms or threaten community safety. We may update these Terms periodically, notifying users via email or site banner. Continued platform use following updates constitutes acceptance of the revised Terms.</p>
            </div>

            <div>
              <h2 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                9. Contact &amp; Legal Notices
              </h2>
              <p style={P}>For legal notices or questions regarding these Terms, contact us at:</p>
              <p style={{ ...P, marginTop: "0.5rem" }}>
                <strong>Yrdly Technologies Limited</strong> (RC: 9267059)<br />
                Oyo State, Nigeria<br />
                Email: <a href="mailto:support@yrdly.ng" style={{ color: "var(--green-text)", textDecoration: "underline" }}>support@yrdly.ng</a>
              </p>
            </div>
          </div>

          <p style={{ ...P, marginTop: "2.5rem", textAlign: "center", fontSize: "0.85rem" }}>
            By creating an account or using Yrdly, you acknowledge that you have read, understood, and agreed to these Terms of Service.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
