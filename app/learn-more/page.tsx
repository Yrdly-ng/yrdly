import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { appLink } from "@/lib/app-links";
import { PwaInstallSection } from "@/components/PwaInstallSection";
export const metadata = {
  title: "How YRDLY works",
  description:
    "Discover local businesses, marketplace finds, events and communities on YRDLY.",
  alternates: { canonical: "/learn-more" },
};
const features = [
  {
    title: "A window into your neighbourhood.",
    name: "Neighbourhood activity",
    body: "Keep up with local conversations, share an update and see what people around you are talking about.",
    href: appLink("/home"),
  },
  {
    title: "Find something. Pass something on.",
    name: "Marketplace",
    body: "Browse items, check the details, save your favourites and talk with sellers in the app.",
    href: "/marketplace",
  },
  {
    title: "Your next local favourite.",
    name: "Businesses",
    body: "Discover local services and businesses. Explore their profiles, see what they offer and get in touch on YRDLY.",
    href: "/businesses",
  },
  {
    title: "Good plans start here.",
    name: "Events",
    body: "Find public gatherings and celebrations. Continue in the app for tickets, or create and manage your own event.",
    href: "/events",
  },
  {
    title: "Find your kind of people.",
    name: "Communities",
    body: "Discover groups built around places and shared interests. Join the conversation and make yourself at home.",
    href: appLink("/communities"),
  },
  {
    title: "Take the conversation further.",
    name: "Messaging",
    body: "Ask about a listing, discuss a service or stay in touch with people you meet on YRDLY. Sign in to start a conversation.",
    href: appLink("/messages"),
  },
];
export default function LearnMorePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="wrap page-intro">
          <p className="eyebrow">HOW YRDLY WORKS</p>
          <h1>
            More of the everyday.
            <br />
            <em>All around you.</em>
          </h1>
          <p>
            Look around here, then step into the full experience at
            app.yrdly.ng. One place for your neighbourhood’s many sides.
          </p>
        </section>
        <section className="wrap feature-list">
          {features.map((feature, index) => (
            <article key={feature.name}>
              <span className="journal-number">0{index + 1}</span>
              <div>
                <p className="eyebrow">{feature.name}</p>
                <h2>{feature.title}</h2>
              </div>
              <div>
                <p>{feature.body}</p>
                <Link className="text-link" href={feature.href}>
                  Explore {feature.name.toLowerCase()} ↗
                </Link>
              </div>
            </article>
          ))}
        </section>
        <PwaInstallSection />
        <section className="wrap directory-promo">
          <div>
            <h2>Start with a place you know.</h2>
            <p>Create your account, set your area and make YRDLY your own.</p>
          </div>
          <Link href="/signup" className="button button-primary">
            Join YRDLY ↗
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
