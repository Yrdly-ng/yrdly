import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { getPublicDiscovery } from "@/lib/public-discovery";
import { DiscoveryBrowser } from "@/components/discovery/discovery-browser";
import { appLink } from "@/lib/app-links";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Marketplace — YRDLY",
  description:
    "Find something good from someone nearby. Browse public marketplace listings across Nigeria.",
  alternates: { canonical: "/marketplace" },
};
export default async function MarketplacePage() {
  const discovery = await getPublicDiscovery();
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="page-intro wrap">
          <p className="eyebrow">THE LOCAL MARKETPLACE</p>
          <h1>
            Your next good find.
            <br />
            <em>Someone’s next chapter.</em>
          </h1>
          <p>
            Pre-loved furniture, everyday essentials and unexpected finds. Take
            a look at what people are sharing and selling on YRDLY.
          </p>
        </section>
        <section
          className="wrap directory-section"
          aria-label="Public marketplace listings"
        >
          <DiscoveryBrowser {...discovery} fixedKind />
        </section>
        <section className="wrap directory-promo">
          <div>
            <h2>Something good, ready for a new home?</h2>
            <p>
              Post your item, talk with buyers and manage your listing in the
              app.
            </p>
            <Link href="/trust-and-safety" className="text-link">
              A few tips for trading safely ↗
            </Link>
          </div>
          <a
            href={appLink("/marketplace/create")}
            className="button button-primary"
          >
            Sell an item ↗
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
