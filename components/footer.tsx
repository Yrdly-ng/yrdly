"use client";

import Link from "next/link";

const PRODUCT_LINKS = [
  { label: "Features", href: "/learn-more" },
  { label: "Events", href: "/events" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Learn More", href: "/learn-more" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "3.5rem 1.5rem 2rem", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: "span 2" }}>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                marginBottom: "1rem",
                display: "block",
              }}
            >
              <span
                className="font-display"
                style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--green-text)" }}
              >
                Yrdly
              </span>
            </Link>
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.7,
                fontWeight: 300,
                color: "var(--fg-muted)",
                maxWidth: 280,
                marginBottom: "1.25rem",
              }}
            >
              Your community &amp; street, connected. Built for Nigerians, by Nigerians.
              Governed by the laws of the Federal Republic of Nigeria.
            </p>
            <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
              <a
                href="https://www.instagram.com/yrdly.ng?stkn=MTEzbzYzZ2J3dWR4dA=="
                target="_blank"
                rel="noreferrer"
                className="pill"
              >
                📸 Yrdly.ng
              </a>
              <a href="mailto:support@yrdly.ng" className="pill">
                ✉️ Email
              </a>
              <a href="tel:09166368783" className="pill">
                📱 Call
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--fg-subtle)",
                marginBottom: "1rem",
              }}
            >
              Product
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {PRODUCT_LINKS.map((l) => (
                <FooterLink key={l.label + l.href} href={l.href} label={l.label} />
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--fg-subtle)",
                marginBottom: "1rem",
              }}
            >
              Company
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {COMPANY_LINKS.map((l) => (
                <FooterLink key={l.label} href={l.href} label={l.label} />
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "0.75rem",
            fontSize: "0.78rem",
            color: "var(--fg-subtle)",
          }}
        >
          <span>© {new Date().getFullYear()} Yrdly. All rights reserved.</span>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            <Link
              href="/privacy-policy"
              style={{
                textDecoration: "none",
                fontSize: "0.78rem",
                color: "var(--fg-subtle)",
                fontFamily: "var(--font-work-sans), sans-serif",
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={{
                textDecoration: "none",
                fontSize: "0.78rem",
                color: "var(--fg-subtle)",
                fontFamily: "var(--font-work-sans), sans-serif",
              }}
            >
              Terms
            </Link>
          </div>
          <span>Oyo State, Nigeria 🇳🇬</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: "var(--font-work-sans), sans-serif",
        fontSize: "0.875rem",
        color: "var(--fg-muted)",
        textAlign: "left",
        textDecoration: "none",
        transition: "color 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--green-text)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
    >
      {label}
    </Link>
  );
}
