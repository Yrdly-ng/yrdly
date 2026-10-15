import Link from "next/link";
import { appLink } from "@/lib/app-links";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Link href="/" className="footer-wordmark">
              yrdly.
            </Link>
            <p>
              A little closer to the people
              <br />
              and possibilities around you.
            </p>
            <a href={appLink()} className="text-link">
              Find your neighbourhood <span aria-hidden="true">↗</span>
            </a>
          </div>
          <nav aria-label="Explore YRDLY">
            <h2>Take a look around</h2>
            <Link href="/marketplace">Marketplace</Link>
            <Link href="/events">Events</Link>
            <Link href="/businesses">Local businesses</Link>
            <a href={appLink("/communities")}>Communities ↗</a>
            <Link href="/learn-more">How YRDLY works</Link>
          </nav>
          <nav aria-label="About YRDLY">
            <h2>A little about us</h2>
            <Link href="/about">Our story</Link>
            <Link href="/blog">The journal</Link>
            <Link href="/trust-and-safety">Trust & safety</Link>
            <Link href="/faq">Help & FAQ</Link>
            <Link href="/contact">Get in touch</Link>
          </nav>
          <div>
            <h2>Stay in the neighbourhood</h2>
            <a
              href="https://www.instagram.com/yrdly.ng"
              target="_blank"
              rel="noreferrer"
            >
              Instagram ↗
            </a>
            <a href="mailto:support@yrdly.ng">support@yrdly.ng</a>
            <a href="tel:09166368783">0916 636 8783</a>
            <p className="footer-origin">
              Made in Nigeria.
              <br />
              For wherever you call home.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Yrdly Technologies Limited · RC 9267059
          </span>
          <div>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cookie-policy">Cookies</Link>
          </div>
          <span>Oyo State, Nigeria</span>
        </div>
      </div>
    </footer>
  );
}
