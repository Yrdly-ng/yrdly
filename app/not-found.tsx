import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="wrap page-intro">
        <p className="eyebrow">A DIFFERENT TURN</p>
        <h1>This page has <em>moved on.</em></h1>
        <p>The link may have changed. There’s still plenty to discover around here.</p>
        <div className="inline-actions section">
          <Link href="/" className="button button-primary">Back to YRDLY ↗</Link>
          <Link href="/marketplace" className="text-link">Browse the marketplace ↗</Link>
          <Link href="/events" className="text-link">Find an event ↗</Link>
          <Link href="/contact" className="text-link">Get help ↗</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
