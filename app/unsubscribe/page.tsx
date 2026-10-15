import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = { title: "Email preferences — YRDLY", robots: { index: false, follow: true } };

export default function UnsubscribePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="wrap page-intro">
        <p className="eyebrow">YOUR INBOX, YOUR CHOICE</p>
        <h1>A little less <em>in your inbox.</em></h1>
        <p>
          To stop receiving YRDLY newsletters, email our support team from the
          address you subscribed with. We’ll help remove it from the mailing list.
          This won’t close your YRDLY account.
        </p>
        <div className="inline-actions section">
          <a className="button button-primary" href="mailto:support@yrdly.ng?subject=Unsubscribe%20from%20YRDLY%20newsletters">Request unsubscribe ↗</a>
          <Link className="text-link" href="/contact">Contact support another way ↗</Link>
        </div>
        <Link href="/" className="text-link">← Back to YRDLY</Link>
      </main>
      <Footer />
    </>
  );
}
