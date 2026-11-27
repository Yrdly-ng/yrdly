import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { CampaignBanner } from "@/components/campaigns/CampaignBanner";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { DiscoveryBrowser } from "@/components/discovery/discovery-browser";
import { getPublicDiscovery } from "@/lib/public-discovery";
import { appLink } from "@/lib/app-links";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { PwaInstallSection } from "@/components/PwaInstallSection";
import { BLOG_ARTICLES } from "./blog/articles-data";

// Homepage discovery data is cached for 60 seconds; updates remain fresh without
// forcing an uncached render and Supabase read on every anonymous visit.
export const revalidate = 60;

export default async function HomePage() {
  const discovery = await getPublicDiscovery();
  return (
    <>
      <Header />
      <main id="main-content">
        <CampaignBanner />
        <section className="home-hero wrap">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> YOUR NEIGHBOURHOOD, A LITTLE
              CLOSER
            </p>
            <h1>
              Good things.
              <br />
              Good people.
              <br />
              <em>Closer than you think.</em>
            </h1>
            <p className="hero-description">
              The place down the road. The plans for the weekend. The people who
              make it feel like home. Find your corner of Nigeria on YRDLY.
            </p>
            <div className="hero-actions">
              <a href={appLink()} className="button button-primary">
                Explore YRDLY <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a href="#discover" className="text-link">
                Take a look around <ArrowDown size={14} aria-hidden="true" />
              </a>
            </div>
            <p className="hero-footnote">
              Your people. Your places. Your everyday.
            </p>
          </div>
          <div className="hero-editorial">
            <figure className="hero-photo">
              <Image
                src="/editorial/gathering.webp"
                alt="Friends spending an afternoon together outdoors"
                preload
                sizes="(max-width: 900px) 100vw, 50vw"
                width={1500}
                height={1000}
              />
              <figcaption>
                <span>OFFLINE MOMENTS. ONLINE CONNECTIONS.</span>
                <span aria-hidden="true">01 / YRDLY</span>
              </figcaption>
            </figure>
            <div className="hero-note">
              <span className="note-number">
                Hello,
                <br />
                <em>neighbour.</em>
              </span>
              <p>
                There’s a whole world
                <br />
                just around your corner.
              </p>
              <a
                href="#discover"
                aria-label="Discover public listings"
                className="note-arrow"
              >
                <ArrowDownRight size="1em" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
        <nav
          className="discovery-index wrap"
          aria-label="Discover your neighbourhood"
        >
          <span>A LITTLE OF EVERYTHING</span>
          <Link href="/marketplace">
            A good find <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <Link href="/events">
            A plan to make <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <Link href="/businesses">
            A local favourite <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <a href={appLink("/communities")}>
            Your kind of people <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </nav>
        <section id="discover" className="section wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE NEIGHBOURHOOD EDIT</p>
              <h2>
                Have a look <em>around.</em>
              </h2>
            </div>
            <p>
              Real finds and familiar places.
              <br />
              Start anywhere. See what catches your eye.
            </p>
          </div>
          <DiscoveryBrowser {...discovery} compact />
        </section>
        <section className="local-story">
          <div className="wrap story-grid">
            <figure>
              <img
                src="/editorial/market.webp"
                alt="A trader surrounded by fresh produce at a local market"
                loading="lazy"
                width="1000"
                height="800"
              />
              <figcaption>
                Behind every local favourite, there’s a person.
              </figcaption>
            </figure>
            <div className="story-copy">
              <p className="eyebrow">GOOD THINGS GROW CLOSE TO HOME</p>
              <h2>
                Someone nearby
                <br />
                has just what
                <br />
                <em>you’re looking for.</em>
              </h2>
              <p>
                A tailor who gets the fit right. A lunch spot you’ll go back to.
                A neighbour with something you need. YRDLY brings those everyday
                discoveries a little closer.
              </p>
              <Link href="/businesses" className="text-link">
                Meet your local businesses <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              <div className="story-footer">
                <span>Made for local life.</span>
                <span>All across Nigeria.</span>
              </div>
            </div>
          </div>
        </section>
        <section className="section wrap weekend-section">
          <div>
            <p className="eyebrow">MAKE ROOM FOR A GOOD TIME</p>
            <h2>
              Less “what’s the plan?”
              <br />
              More <em>“see you there.”</em>
            </h2>
            <p>
              A small gathering. A big celebration. Something you didn’t know
              was happening. Find a reason to step out.
            </p>
            <Link href="/events" className="button button-dark">
              Find your next plan <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <figure>
            <img
              src="/editorial/celebration.webp"
              alt="Guests dancing together at a celebration"
              width="1000"
              height="700"
              loading="lazy"
            />
            <figcaption>There’s always a reason to come together.</figcaption>
          </figure>
        </section>
        <section className="nationwide-section">
          <div className="wrap nationwide-inner">
            <p className="eyebrow">WHEREVER YOU CALL HOME</p>
            <h2>
              Different places.
              <br />
              The same feeling of <em>belonging.</em>
            </h2>
            <p>
              From a busy street in Kano to a quiet corner of Uyo. From Ibadan
              to Abuja, Enugu to Benin City, Port Harcourt to Lagos. Your
              neighbourhood has its own rhythm. There’s room for it here.
            </p>
            <a href={appLink("/communities")} className="text-link">
              Find your community <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <div className="place-line" aria-hidden="true">
              <span>Jos</span>
              <span>Abeokuta</span>
              <span>Kaduna</span>
              <span>Owerri</span>
              <span>Ilorin</span>
              <span>Akure</span>
              <span>Asaba</span>
            </div>
          </div>
        </section>
        <PwaInstallSection />
        <section className="section wrap journal-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">NOTES FROM THE NEIGHBOURHOOD</p>
              <h2>
                A little local <em>knowledge.</em>
              </h2>
            </div>
            <Link href="/blog" className="text-link">
              Read the journal <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="journal-list">
            {BLOG_ARTICLES.slice(0, 3).map((article, index) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <span className="journal-number">0{index + 1}</span>
                <div>
                  <p className="card-overline">
                    {article.category} · {article.readTime}
                  </p>
                  <h3>{article.title}</h3>
                </div>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
        <section className="newsletter-section wrap">
          <div>
            <p className="eyebrow">A NOTE NOW AND THEN</p>
            <h2>
              Keep a little YRDLY
              <br />
              in your inbox.
            </h2>
          </div>
          <div>
            <p>Product news, neighbourhood stories and things worth knowing.</p>
            <NewsletterSignup
              placeholder="Your email address"
              source="homepage"
            />
            <small>Unsubscribe whenever you like.</small>
          </div>
        </section>
        <section className="closing-section wrap">
          <p>Your neighbourhood is already full of possibility.</p>
          <h2>
            Go on. <em>Say hello.</em>
          </h2>
          <a href={appLink()} className="button button-primary">
            Explore YRDLY <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <Link href="/faq" className="text-link">
            A few questions first? <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
