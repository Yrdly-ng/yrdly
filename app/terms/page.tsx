import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: "Terms & Conditions - Yrdly",
  description: "The Terms and Conditions governing your use of the Yrdly web application.",
  alternates: {
    canonical: "/terms",
  },
};

const P = { fontSize: "0.9rem", lineHeight: 1.8, color: "var(--fg-muted)", fontWeight: 300 } as const;

const SECTIONS: { title: string; paras?: string[]; list?: string[]; special?: "privacy" | "contact" }[] = [
  {
    title: "1. Eligibility",
    paras: [
      "You must be at least 18 years old to use Yrdly.",
      "By accessing or using the App, you confirm that you meet this requirement.",
    ],
  },
  {
    title: "2. User Accounts",
    paras: [
      "You are responsible for maintaining the confidentiality of your login credentials.",
      "You agree to provide accurate, complete, and up-to-date information when creating your profile.",
      "You may not create false, misleading, or duplicate accounts.",
    ],
  },
  {
    title: "3. Verified Profiles",
    paras: [
      "Yrdly offers a verified profile status to enhance user safety.",
      "You are strongly advised to interact primarily with verified profiles.",
      "Verification involves additional checks as determined by Yrdly, but we do not guarantee the authenticity, conduct, or intentions of any verified profile.",
    ],
  },
  {
    title: "4. User Conduct",
    paras: ["You agree not to:"],
    list: [
      "Engage in fraud, scams, or misrepresentation.",
      "Use the App for any unlawful purpose.",
      "Harass, abuse, or harm other users.",
      "Post, transmit, or share offensive, misleading, or prohibited content.",
    ],
  },
  {
    title: "5. Fraud and Disputes",
    paras: ["Yrdly is not liable for any fraudulent activity, scams, or losses suffered by users.", "If you believe you have been defrauded:"],
    list: [
      "Contact your local law enforcement agency (e.g., police or relevant authority) immediately.",
      "Upon request by law enforcement, Yrdly may provide relevant user information or communication logs, subject to applicable privacy laws.",
    ],
  },
  {
    title: "6. Disclaimers",
    paras: [
      "The App is provided \u201cas is\u201d and \u201cas available.\u201d",
      "We make no guarantees regarding the accuracy or reliability of user profiles.",
      "We do not screen all users and cannot guarantee their behavior or intentions.",
    ],
  },
  {
    title: "7. Limitation of Liability",
    paras: ["To the maximum extent permitted by law:"],
    list: [
      "Yrdly is not liable for any indirect, incidental, special, or consequential damages.",
      "Yrdly is not responsible for interactions between users or for any harm resulting from such interactions.",
      "Our total liability for any claim relating to the App shall not exceed the amount you have paid us, if any, in the twelve (12) months prior to the claim.",
    ],
  },
  { title: "8. Privacy", special: "privacy" },
  {
    title: "9. Termination",
    paras: [
      "We reserve the right to suspend or terminate your account if you violate these Terms or engage in conduct harmful to the community or platform.",
    ],
  },
  {
    title: "10. Modifications",
    paras: [
      "We may update these Terms from time to time.",
      "Changes will be communicated via email or in-app notifications.",
      "Continued use of the App after updates constitutes acceptance of the revised Terms.",
    ],
  },
  {
    title: "11. Governing Law",
    paras: [
      "These Terms shall be governed by and construed in accordance with the laws of Nigeria, without regard to conflict of law principles.",
    ],
  },
  { title: "12. Contact Us", special: "contact" },
];

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
            Terms &amp; Conditions
          </h1>
          <p style={{ fontSize: "0.9rem", color: "var(--fg-muted)", fontWeight: 300 }}>Yrdly — Your Neighborhood Network</p>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: "4rem 1.5rem 6rem", flex: 1 }}>
        <div
          className="redesign-card"
          style={{ maxWidth: 800, margin: "0 auto", padding: "2.5rem 2rem", background: "var(--bg-card)" }}
        >
          <p style={{ ...P, marginBottom: "0.75rem" }}>
            Welcome to Yrdly. These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use of the Yrdly web application
            (the &ldquo;App&rdquo;). By creating an account or using the App, you agree to be legally bound by these Terms.
          </p>
          <p style={{ ...P, marginBottom: "2.5rem" }}>Please read them carefully before using the App.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                  {s.title}
                </h2>
                {s.special === "privacy" && (
                  <>
                    <p style={P}>
                      Your information will be collected, used, and stored in accordance with our{" "}
                      <Link href="/privacy-policy" style={{ color: "var(--green-text)", textDecoration: "underline" }}>
                        Privacy Policy
                      </Link>
                      .
                    </p>
                    <p style={{ ...P, marginTop: "0.5rem" }}>
                      By using the App, you consent to the collection and use of your data as described in that policy.
                    </p>
                  </>
                )}
                {s.special === "contact" && (
                  <>
                    <p style={P}>If you have any questions or need assistance, please contact us at:</p>
                    <p style={{ ...P, marginTop: "0.5rem" }}>
                      Email:{" "}
                      <a href="mailto:support@yrdly.ng" style={{ color: "var(--green-text)", textDecoration: "underline" }}>
                        support@yrdly.ng
                      </a>
                    </p>
                    <p style={{ ...P, marginTop: "0.5rem" }}>
                      Support:{" "}
                      <a href="mailto:support@yrdly.ng" style={{ color: "var(--green-text)", textDecoration: "underline" }}>
                        support@yrdly.ng
                      </a>
                    </p>
                  </>
                )}
                {s.paras?.map((p, i) => (
                  <p key={i} style={{ ...P, marginTop: i === 0 ? 0 : "0.5rem" }}>
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                    {s.list.map((li, i) => (
                      <li key={i} style={P}>
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <p style={{ ...P, marginTop: "2.5rem", textAlign: "center", fontSize: "0.85rem" }}>
            By clicking &ldquo;Agree&rdquo; or creating an account, you acknowledge that you have read, understood, and agree
            to be bound by these Terms and Conditions.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
