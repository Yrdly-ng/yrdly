import Header from "@/components/header";
import Footer from "@/components/footer";
import { DiscoveryBrowser } from "@/components/discovery/discovery-browser";
import { appLink } from "@/lib/app-links";
export default function EventsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="page-intro wrap">
          <p className="eyebrow">SOMETHING TO LOOK FORWARD TO</p>
          <h1>
            Good company.
            <br />
            <em>Great reasons to go out.</em>
          </h1>
          <p>
            Find a gathering, make a plan, bring a friend. Browse public events
            and continue on YRDLY for tickets and the latest details.
          </p>
        </section>
        <section className="wrap directory-section" aria-label="Public events">
          <DiscoveryBrowser initialKind="events" fixedKind />
        </section>
        <section className="wrap directory-promo">
          <div>
            <h2>Bring your people together.</h2>
            <p>
              Create an event, manage tickets and welcome your guests in the
              app.
            </p>
          </div>
          <a href={appLink("/events/create")} className="button button-primary">
            Host an event ↗
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
