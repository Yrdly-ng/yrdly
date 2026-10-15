import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { appLink } from "@/lib/app-links";
export const metadata = {
  title: "Our story — YRDLY",
  description: "Built in Nigeria, for the people and possibilities around you.",
  alternates: { canonical: "/about" },
};
export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="wrap page-intro">
          <p className="eyebrow">OUR STORY</p>
          <h1>
            A neighbourhood is a place.
            <br />
            <em>Belonging is a feeling.</em>
          </h1>
          <p>
            We built YRDLY to bring a little more of that feeling into everyday
            life.
          </p>
        </section>
        <section className="wrap about-story">
          <img
            src="/editorial/gathering.webp"
            alt="People gathering outdoors for an afternoon together"
            width="1500"
            height="1000"
          />
          <div>
            <p className="eyebrow">IT STARTED CLOSE TO HOME</p>
            <h2>
              So much happens nearby.
              <br />
              Too much goes unnoticed.
            </h2>
            <p>
              A neighbour selling something you need. A small business that
              deserves a bigger audience. A gathering you hear about a day too
              late.
            </p>
            <p>
              YRDLY started with a simple thought: it should be easier to
              discover the people, places and possibilities around us. To find a
              good recommendation. To make a plan. To feel a little more
              connected to the place we live.
            </p>
            <p>
              We’re building that connection for neighbourhoods across Nigeria.
              Big cities, smaller towns, busy streets and quiet corners. Every
              place has its own stories. YRDLY makes room for them.
            </p>
          </div>
        </section>
        <section className="wrap section about-principles">
          <p className="eyebrow">WHAT MATTERS TO US</p>
          <div>
            <article>
              <span>01</span>
              <h2>People make the place.</h2>
              <p>
                A useful connection, a familiar face, a business down the road.
                Local life starts with people.
              </p>
            </article>
            <article>
              <span>02</span>
              <h2>Every neighbourhood counts.</h2>
              <p>
                There is no single Nigerian experience. Your community’s
                language, pace and personality belong here.
              </p>
            </article>
            <article>
              <span>03</span>
              <h2>Trust takes care.</h2>
              <p>
                Clear information, reporting tools and thoughtful community
                guidelines help us look out for one another.
              </p>
              <Link href="/trust-and-safety" className="text-link">
                Read about trust & safety ↗
              </Link>
            </article>
          </div>
        </section>
        <section className="wrap directory-promo">
          <div>
            <h2>A little closer starts with hello.</h2>
            <p>Find your corner of YRDLY.</p>
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
