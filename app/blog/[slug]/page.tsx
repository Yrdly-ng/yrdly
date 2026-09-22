import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { BLOG_ARTICLES } from "../articles-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: `${article.title} - Yrdly Journal`,
    description: article.excerpt,
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)", display: "flex", flexDirection: "column" }}>
      <Header />

      {/* Header Band */}
      <section style={{ paddingTop: 96, paddingBottom: "3.5rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", background: "var(--section-alt)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link
            href="/blog"
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
            ← Back to All Guides
          </Link>
          <span className="pill" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            {article.category}
          </span>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)",
              fontWeight: 600,
              color: "var(--fg)",
              lineHeight: 1.2,
              marginBottom: "1rem",
            }}
          >
            {article.title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.85rem", color: "var(--fg-muted)" }}>
            <span>By {article.author.name}</span>
            <span>•</span>
            <span>{article.publishedAt}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section style={{ padding: "3rem 1.5rem 6rem", flex: 1 }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ position: "relative", height: 380, borderRadius: 16, overflow: "hidden", marginBottom: "3rem", border: "1px solid var(--border)" }}>
            <Image src={article.coverImage} alt={article.title} fill priority style={{ objectFit: "cover" }} />
          </div>

          <div className="redesign-card" style={{ padding: "2.5rem 2rem", background: "var(--bg-card)" }}>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--fg)", fontWeight: 400, marginBottom: "2.5rem", borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}>
              {article.content.intro}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {article.content.sections.map((sec, idx) => (
                <div key={idx}>
                  <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 600, color: "var(--fg)", marginBottom: "1rem" }}>
                    {sec.heading}
                  </h2>
                  {sec.body.map((p, pIdx) => (
                    <p key={pIdx} style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "var(--fg-muted)", fontWeight: 300, marginBottom: "1rem" }}>
                      {p}
                    </p>
                  ))}
                  {sec.keyTakeaway && (
                    <div style={{ padding: "1.25rem 1.5rem", borderRadius: 12, background: "var(--pill-bg)", borderLeft: "4px solid var(--green-text)", marginTop: "1rem" }}>
                      <p style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--fg)", margin: 0, lineHeight: 1.6 }}>
                        💡 <strong>Key Takeaway:</strong> {sec.keyTakeaway}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
              <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                Summary
              </h3>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--fg-muted)", fontWeight: 300 }}>
                {article.content.conclusion}
              </p>
            </div>
          </div>

          {/* Bottom Back Button */}
          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <Link href="/blog" className="btn-cta">
              Explore More Articles
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
