import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { appLink } from "@/lib/app-links";

export const metadata = { title: "YRDLY is open — Come take a look" };

export default function ComingSoonPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="wrap page-intro">
        <p className="eyebrow">THE WAIT IS OVER</p>
        <h1>Your neighbourhood.<br /><em>Ready when you are.</em></h1>
        <p>
          YRDLY is open. Discover local businesses, marketplace finds, events
          and communities across Nigeria. Have a look around here or step into
          the full experience in the app.
        </p>
        <div className="inline-actions section">
          <a href={appLink()} className="button button-primary">Explore YRDLY ↗</a>
          <Link href="/#discover" className="text-link">Take a look around ↗</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
