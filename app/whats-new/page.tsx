import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { PRODUCT_UPDATES, LAUNCH_STATS } from "@/lib/data/product-updates";
import { appLink } from "@/lib/app-links";

export const metadata: Metadata = {
  title: "What's new — YRDLY",
  description:
    "New features, thoughtful improvements, and fixes that make connecting with your community easier.",
  alternates: { canonical: "/whats-new" },
  openGraph: {
    type: "website",
    url: "https://yrdly.ng/whats-new",
    title: "What's new — YRDLY",
    description:
      "New features, thoughtful improvements, and fixes that make connecting with your community easier.",
    siteName: "YRDLY",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "YRDLY — What's New",
      },
    ],
  },
};

/** Inline SVG icons keyed by the name stored in product-updates data. */
const ICONS: Record<string, React.ReactNode> = {
  Scissors: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  ),
  ImagePlay: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 3H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h7" />
      <path d="M21 15V5a1 1 0 0 0-1-1h-7" />
      <path d="M3 15l4-4 4 4" />
      <path d="m14 6 3 3 3-3" />
      <circle cx="17" cy="17" r="5" />
      <path d="m15.5 15.5 3 1.5-3 1.5v-3z" fill="currentColor" stroke="none" />
    </svg>
  ),
  CalendarDays: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <circle cx="8" cy="14" r="0.5" fill="currentColor" />
      <circle cx="12" cy="14" r="0.5" fill="currentColor" />
      <circle cx="16" cy="14" r="0.5" fill="currentColor" />
      <circle cx="8" cy="18" r="0.5" fill="currentColor" />
      <circle cx="12" cy="18" r="0.5" fill="currentColor" />
    </svg>
  ),
  Zap: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  ShoppingBag: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
};

const CATEGORY_STYLES: Record<string, { label: string; className: string }> = {
  New: { label: "New", className: "update-tag update-tag--new" },
  Improved: { label: "Improved", className: "update-tag update-tag--improved" },
  Fixed: { label: "Fixed", className: "update-tag update-tag--fixed" },
  Faster: { label: "Faster", className: "update-tag update-tag--faster" },
};

export default function WhatsNewPage() {
  const [latest, ...rest] = PRODUCT_UPDATES;

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="wrap whats-new-hero section">
          <p className="eyebrow">PRODUCT UPDATES</p>
          <h1>
            A better YRDLY,
            <br />
            <em>every update.</em>
          </h1>
          <p className="whats-new-desc">
            New features, thoughtful improvements, and fixes that make
            connecting with your community easier.
          </p>
          <div className="hero-actions">
            <a href={appLink()} className="button button-primary">
              Open YRDLY ↗
            </a>
          </div>
        </section>

        {/* Launch stats */}
        <section className="whats-new-stats-band" aria-label="Launch figures">
          <div className="wrap whats-new-stats-inner">
            <p className="eyebrow" style={{ marginBottom: 0 }}>
              LAUNCH WEEK, BY THE NUMBERS
            </p>
            <div className="whats-new-stats-grid">
              {LAUNCH_STATS.map((s) => (
                <div key={s.label} className="whats-new-stat">
                  <span className="whats-new-stat-value">{s.value}</span>
                  <span className="whats-new-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest update (featured) */}
        {latest && (
          <section className="wrap section">
            <p className="eyebrow">LATEST UPDATE</p>
            <article
              className="whats-new-featured"
              aria-label="Latest update"
            >
              <div className="whats-new-featured-icon" aria-hidden="true">
                {ICONS[latest.icon]}
              </div>
              <div className="whats-new-featured-copy">
                <div className="whats-new-tag-row">
                  <span
                    className={
                      CATEGORY_STYLES[latest.category]?.className ??
                      "update-tag"
                    }
                  >
                    {CATEGORY_STYLES[latest.category]?.label ?? latest.category}
                  </span>
                  {latest.date && (
                    <time dateTime={latest.date} className="whats-new-date">
                      {new Date(latest.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  )}
                </div>
                <h2>{latest.headline}</h2>
                <p>{latest.description}</p>
                {latest.href && (
                  <a
                    href={latest.href}
                    className="text-link"
                    rel="noopener noreferrer"
                  >
                    Try it in YRDLY ↗
                  </a>
                )}
              </div>
            </article>
          </section>
        )}

        {/* Changelog timeline */}
        {rest.length > 0 && (
          <section className="wrap section" aria-label="All updates">
            <p className="eyebrow">ALL UPDATES</p>
            <ol className="whats-new-timeline" role="list">
              {rest.map((update) => (
                <li key={update.id} className="whats-new-entry">
                  <div className="whats-new-entry-icon" aria-hidden="true">
                    {ICONS[update.icon]}
                  </div>
                  <div className="whats-new-entry-copy">
                    <div className="whats-new-tag-row">
                      <span
                        className={
                          CATEGORY_STYLES[update.category]?.className ??
                          "update-tag"
                        }
                      >
                        {CATEGORY_STYLES[update.category]?.label ??
                          update.category}
                      </span>
                      {update.date && (
                        <time
                          dateTime={update.date}
                          className="whats-new-date"
                        >
                          {new Date(update.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </time>
                      )}
                    </div>
                    <h3>{update.headline}</h3>
                    <p>{update.description}</p>
                    {update.href && (
                      <a
                        href={update.href}
                        className="text-link"
                        rel="noopener noreferrer"
                      >
                        Open in YRDLY ↗
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Closing CTA */}
        <section className="wrap directory-promo">
          <div>
            <h2>Your neighbourhood is growing.</h2>
            <p>
              See what&apos;s happening around you — marketplace, events, local
              businesses, and more.
            </p>
          </div>
          <a href={appLink()} className="button button-primary">
            Explore YRDLY ↗
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
