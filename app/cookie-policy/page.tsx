import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: "Cookie Policy - Yrdly",
  description: "Comprehensive information regarding how Yrdly uses cookies, local storage, and analytics technologies on our website.",
  alternates: {
    canonical: "/cookie-policy",
  },
};

const P = { fontSize: "0.9rem", lineHeight: 1.8, color: "var(--fg-muted)", fontWeight: 300 } as const;

export default function CookiePolicyPage() {
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
          <span className="pill" style={{ marginBottom: "1rem", display: "inline-flex" }}>Legal &amp; Privacy</span>
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
            Cookie Policy
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
            This Cookie Policy explains how <strong>Yrdly Technologies Limited</strong> (&ldquo;Yrdly&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) uses cookies and similar tracking technologies on our public website (yrdly.ng) and associated web services.
          </p>
          <p style={{ ...P, marginBottom: "2.5rem" }}>
            Cookies are small text files stored on your computer or mobile device when you visit a website. They help us remember your preferences, keep you signed in securely across services, measure advertising performance, and improve site operation.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            <div>
              <h2 className="font-display" style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                1. Cookies Used on This Site
              </h2>
              <p style={{ ...P, marginBottom: "1rem" }}>
                We maintain a strict inventory of cookies used on yrdly.ng. The cookies set or read on this site include:
              </p>
              <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <li style={P}>
                  <strong style={{ color: "var(--fg)", fontWeight: 600 }}>yrdly_cookie_consent</strong>: First-party cookie set when you click Accept on our consent banner. It stores your cookie preference so you are not prompted on every visit. Duration: 365 days.
                </li>
                <li style={P}>
                  <strong style={{ color: "var(--fg)", fontWeight: 600 }}>sb-yoiyqxtpmxnrrbqqidcs-auth-token</strong>: First-party authentication cookie set on the root domain (.yrdly.ng) when you sign in through yrdly.ng. It keeps you securely signed in across yrdly.ng and app.yrdly.ng for a seamless handoff. Duration: 365 days. Essential for authentication.
                </li>
                <li style={P}>
                  <strong style={{ color: "var(--fg)", fontWeight: 600 }}>Google Advertising &amp; Measurement Cookies (Google Ads &amp; AdSense)</strong>: Third-party cookies and measurement tags set by Google to measure ad conversions, analyze marketing campaign effectiveness, and serve relevant advertisements based on prior visits to our site or other websites. For complete details on how Google processes data, review the <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer" style={{ color: "var(--green-text)", textDecoration: "underline" }}>Google Advertising Privacy Policy</a>.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display" style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                2. Analytics &amp; Browser Storage Technologies
              </h2>
              <p style={{ ...P, marginBottom: "1rem" }}>
                In addition to cookies, our website utilizes specific non-cookie storage and privacy-focused measurement tools:
              </p>
              <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <li style={P}>
                  <strong style={{ color: "var(--fg)", fontWeight: 600 }}>Vercel Web Analytics</strong>: Vercel Web Analytics allows you to track your website traffic and gather valuable insights without using any third-party cookies, instead end users are identified by a hash created from the incoming request.
                </li>
                <li style={P}>
                  <strong style={{ color: "var(--fg)", fontWeight: 600 }}>Theme Preference Storage</strong>: Your display mode selection (light or dark mode) is saved in your browser&apos;s HTML5 <code style={{ fontSize: "0.85rem", background: "var(--bg-raised)", padding: "0.15rem 0.4rem", borderRadius: 4 }}>localStorage</code> (key: <code style={{ fontSize: "0.85rem", background: "var(--bg-raised)", padding: "0.15rem 0.4rem", borderRadius: 4 }}>theme</code>), not in an HTTP cookie.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display" style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                3. How to Manage &amp; Control Cookies
              </h2>
              <p style={{ ...P, marginBottom: "1rem" }}>
                You have the right to control and manage how cookies are stored on your device. Most web browsers allow you to manage cookie settings through their preferences menu:
              </p>
              <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <li style={P}>
                  <strong style={{ color: "var(--fg)" }}>Google Chrome:</strong> Settings &rarr; Privacy and security &rarr; Third-party cookies.
                </li>
                <li style={P}>
                  <strong style={{ color: "var(--fg)" }}>Apple Safari:</strong> Settings &rarr; Safari &rarr; Privacy &amp; Security &rarr; Block All Cookies.
                </li>
                <li style={P}>
                  <strong style={{ color: "var(--fg)" }}>Mozilla Firefox:</strong> Options &rarr; Privacy &amp; Security &rarr; Enhanced Tracking Protection.
                </li>
                <li style={P}>
                  <strong style={{ color: "var(--fg)" }}>Microsoft Edge:</strong> Settings &rarr; Cookies and site permissions &rarr; Manage and delete cookies and site data.
                </li>
              </ul>
              <p style={{ ...P, marginTop: "1rem" }}>
                To opt out of third-party personalized advertising from Google and other ad networks, visit <a href="https://adssettings.google.com" target="_blank" rel="noreferrer" style={{ color: "var(--green-text)", textDecoration: "underline" }}>Google Ads Settings</a> or <a href="https://aboutads.info" target="_blank" rel="noreferrer" style={{ color: "var(--green-text)", textDecoration: "underline" }}>AboutAds Consumer Opt-Out</a>.
              </p>
            </div>

            <div>
              <h2 className="font-display" style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                4. Related Policies &amp; Contact Information
              </h2>
              <p style={P}>
                For complete information on how we handle personal data, please read our full{" "}
                <Link href="/privacy-policy" style={{ color: "var(--green-text)", textDecoration: "underline" }}>
                  Privacy Policy
                </Link>
                . If you have any questions regarding our cookie practices, please contact our support team at{" "}
                <a href="mailto:support@yrdly.ng" style={{ color: "var(--green-text)", textDecoration: "underline" }}>
                  support@yrdly.ng
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
