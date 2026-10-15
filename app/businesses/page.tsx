import Header from "@/components/header";
import Footer from "@/components/footer";
import { getPublicDiscovery } from "@/lib/public-discovery";
import { DiscoveryBrowser } from "@/components/discovery/discovery-browser";
import { appLink } from "@/lib/app-links";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Local businesses — YRDLY",
  description:
    "Discover the people and businesses making your neighbourhood their own, across Nigeria.",
  alternates: { canonical: "/businesses" },
};
export default async function BusinessesPage() {
  const discovery = await getPublicDiscovery();
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="page-intro wrap">
          <p className="eyebrow">THE PEOPLE BEHIND YOUR LOCAL FAVOURITES</p>
          <h1>
            Good at what they do.
            <br />
            <em>Right around you.</em>
          </h1>
          <p>
            From your next lunch spot to someone who can fix that thing. Meet
            the businesses making everyday life a little better.
          </p>
        </section>
        <section
          className="wrap directory-section"
          aria-label="Public business directory"
        >
          <DiscoveryBrowser {...discovery} initialKind="businesses" fixedKind />
        </section>
        <section className="wrap directory-promo">
          <div>
            <h2>Your next customer could be a neighbour.</h2>
            <p>Introduce your business and manage your services on YRDLY.</p>
          </div>
          <a href={appLink("/businesses")} className="button button-primary">
            Open the business hub ↗
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
