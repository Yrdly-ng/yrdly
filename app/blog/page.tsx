import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { BLOG_ARTICLES } from "./articles-data";

export const metadata = {
  title: "Community Guides & Blog - Yrdly",
  description: "Explore in-depth articles, security guides, estate management insights, and local commerce tips for Nigerian neighborhoods.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogIndexPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)", display: "flex", flexDirection: "column" }}>
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
          <span className="pill" style={{ marginBottom: "1rem", display: "inline-flex" }}>Guides & Articles</span>
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
            Yrdly Community{" "}
            <em style={{ color: "var(--green-text)", fontStyle: "italic" }}>Journal</em>
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--fg-muted)", fontWeight: 300, maxWidth: 520 }}>
            Practical guides on estate living, neighborhood security, escrow protection, and local business growth in Nigeria.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section style={{ padding: "4rem 1.5rem 6rem", flex: 1 }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
            {BLOG_ARTICLES.map((article) => (
              <article
                key={article.slug}
                className="redesign-card"
                style={{
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  background: "var(--bg-card)",
                  borderRadius: 16,
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ position: "relative", height: 210, overflow: "hidden", background: "var(--bg-raised)" }}>
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <span className="pill" style={{ position: "absolute", top: 14, left: 14, fontSize: "0.68rem" }}>
                    {article.category}
                  </span>
                </div>
                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "0.78rem", color: "var(--fg-subtle)", marginBottom: "0.5rem" }}>
                    {article.publishedAt} · {article.readTime}
                  </div>
                  <h2
                    className="font-display"
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 600,
                      color: "var(--fg)",
                      marginBottom: "0.75rem",
                      lineHeight: 1.4,
                    }}
                  >
                    <Link href={`/blog/${article.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {article.title}
                    </Link>
                  </h2>
                  <p style={{ fontSize: "0.88rem", color: "var(--fg-muted)", lineHeight: 1.65, fontWeight: 300, marginBottom: "1.25rem", flex: 1 }}>
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/blog/${article.slug}`}
                    style={{
                      color: "var(--green-text)",
                      fontFamily: "var(--font-work-sans), sans-serif",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      marginTop: "auto",
                    }}
                  >
                    Read Full Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
