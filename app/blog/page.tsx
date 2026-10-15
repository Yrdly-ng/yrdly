import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ContentImage } from "@/components/discovery/content-image";
import { BLOG_ARTICLES } from "./articles-data";
export const metadata = {
  title: "The neighbourhood journal — YRDLY",
  description:
    "Local knowledge, community stories and practical guides for life around you.",
  alternates: { canonical: "/blog" },
};
export default function BlogPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="page-intro wrap">
          <p className="eyebrow">THE YRDLY JOURNAL</p>
          <h1>
            A little local knowledge.
            <br />
            <em>A different perspective.</em>
          </h1>
          <p>
            Ideas and practical guides for making more of life in your
            neighbourhood.
          </p>
        </section>
        <section className="wrap journal-articles">
          {BLOG_ARTICLES.map((article, index) => (
            <article
              key={article.slug}
              className={index === 0 ? "journal-feature" : ""}
            >
              <Link href={`/blog/${article.slug}`} className="journal-cover">
                <ContentImage src={article.coverImage} alt={article.title} />
              </Link>
              <div>
                <p className="card-overline">
                  {article.category} · {article.readTime}
                </p>
                <h2>
                  <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                </h2>
                <p>{article.excerpt}</p>
                <Link href={`/blog/${article.slug}`} className="text-link">
                  Read the story ↗
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
