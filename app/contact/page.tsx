"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ContactPage() {
  const [form, setForm] = useState({ first: "", last: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const inputStyle: React.CSSProperties = {
    background: "var(--bg-raised)",
    border: "1px solid var(--border)",
    color: "var(--fg)",
    fontFamily: "var(--font-work-sans), sans-serif",
    fontSize: "0.9rem",
    borderRadius: 10,
    padding: "0.7rem 1rem",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.first} ${form.last}`.trim(),
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send message");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)", display: "flex", flexDirection: "column" }}>
      <Header />

      {/* Header */}
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
          <span className="pill" style={{ marginBottom: "1rem", display: "inline-flex" }}>Support Centre</span>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
              fontWeight: 600,
              color: "var(--fg)",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            We&apos;re just a{" "}
            <em style={{ color: "var(--green-text)", fontStyle: "italic" }}>message away.</em>
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--fg-muted)", fontWeight: 300, maxWidth: 460 }}>
            Have a question, spotted an issue, or want to host an event in your community? Reach us anytime.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "5rem 1.5rem 6rem", flex: 1 }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "start" }} className="two-col">
          {/* Contact info */}
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "3rem" }}>
              {[
                { icon: "✉️", label: "Email", val: "support@yrdly.ng", href: "mailto:support@yrdly.ng" },
                { icon: "📱", label: "Phone", val: "09166368783", href: "tel:09166368783" },
                { icon: "📸", label: "Instagram", val: "Yrdly.ng", href: "https://www.instagram.com/yrdly.ng?stkn=MTEzbzYzZ2J3dWR4dA==" },
              ].map((c) => (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "1rem", textDecoration: "none" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--pill-bg)", border: "1px solid var(--border-accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)", fontWeight: 600 }}>{c.label}</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--fg)", marginTop: 2 }}>{c.val}</div>
                  </div>
                </a>
              ))}
            </div>

            <div style={{ padding: "1.75rem", borderRadius: 14, border: "1px solid var(--border)", background: "var(--bg-card)" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>🕐</div>
              <h3 className="font-display" style={{ fontSize: "1rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.5rem" }}>Response Time</h3>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--fg-muted)", fontWeight: 300 }}>
                We respond to all messages within 24 hours on weekdays. For urgent issues, call us directly at 09166368783.
              </p>
            </div>

            <div style={{ marginTop: "1.5rem", padding: "1.75rem", borderRadius: 14, border: "1px solid var(--border-accent)", background: "var(--pill-bg)" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>📍</div>
              <h3 className="font-display" style={{ fontSize: "1rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.5rem" }}>Office</h3>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--fg-muted)", fontWeight: 300 }}>
                Oyo State, Nigeria.<br />
                Governed by the laws of the Federal Republic of Nigeria.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="redesign-card" style={{ padding: "2rem", background: "var(--bg-card)" }}>
            {sent ? (
              <div style={{ padding: "4rem 0", textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
                <h3 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.5rem" }}>Message received!</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--fg-muted)", fontWeight: 300, marginBottom: "1.5rem" }}>We&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ first: "", last: "", email: "", message: "" });
                  }}
                  className="btn-outline"
                  style={{ fontSize: "0.85rem" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", color: "var(--fg-subtle)", marginBottom: "0.4rem", textTransform: "capitalize" }}>First Name</label>
                    <input required value={form.first} onChange={set("first")} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", color: "var(--fg-subtle)", marginBottom: "0.4rem", textTransform: "capitalize" }}>Last Name</label>
                    <input required value={form.last} onChange={set("last")} style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "var(--fg-subtle)", marginBottom: "0.4rem" }}>Email</label>
                  <input type="email" required value={form.email} onChange={set("email")} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "var(--fg-subtle)", marginBottom: "0.4rem" }}>Message</label>
                  <textarea required rows={5} minLength={10} value={form.message} onChange={set("message")} style={{ ...inputStyle, resize: "vertical" }} />
                </div>
                <button type="submit" className="btn-cta" disabled={sending}>
                  {sending ? "Sending…" : "Send Message"}
                </button>
                {error && <p style={{ fontSize: "0.82rem", color: "#e57373", textAlign: "center" }}>{error}</p>}
                <p style={{ fontSize: "0.78rem", color: "var(--fg-subtle)", textAlign: "center" }}>
                  We never share your email. Read our{" "}
                  <Link href="/privacy-policy" style={{ color: "var(--green-text)", fontSize: "0.78rem", fontFamily: "var(--font-work-sans), sans-serif", textDecoration: "underline" }}>
                    Privacy Policy
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
