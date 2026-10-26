import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: "Child Safety Standards - YRDLY",
  description: "YRDLY's standards against child sexual abuse and exploitation, how to report a concern, and how we respond.",
  alternates: { canonical: "/child-safety" },
};

const paragraph = { fontSize: "1rem", lineHeight: 1.8, color: "var(--fg-muted)" } as const;
const heading = { fontSize: "1.35rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" } as const;
const link = { color: "var(--green-text)", textDecoration: "underline", textUnderlineOffset: "3px" } as const;

export default function ChildSafetyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)", display: "flex", flexDirection: "column" }}>
      <Header />
      <main id="main-content" className="legacy-content">
        <section style={{ padding: "55px 1.5rem 3rem", background: "var(--section-alt)" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <Link href="/trust-and-safety" style={{ ...link, display: "inline-block", padding: "0.75rem 0", marginBottom: "1rem" }}>
              ← Trust &amp; Safety
            </Link>
            <h1 className="font-display" style={{ fontSize: "clamp(2.4rem, 5vw, 3.5rem)", fontWeight: 600, lineHeight: 1.15, marginBottom: "1rem" }}>
              Child Safety Standards
            </h1>
            <p style={paragraph}>YRDLY · Yrdly Technologies Limited</p>
            <p style={{ ...paragraph, fontSize: "0.875rem", marginTop: "0.5rem" }}>Last updated: October 26, 2026</p>
          </div>
        </section>

        <section style={{ padding: "3rem 1.5rem 5rem" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            <div>
              <p style={paragraph}>
                YRDLY prohibits child sexual abuse and exploitation (CSAE). These standards protect
                everyone under 18, whether or not they have a YRDLY account. They apply to profiles,
                posts, comments, images, videos, private messages, communities, listings, businesses,
                events, and conduct connected to meetups or transactions arranged through YRDLY.
              </p>
              <p style={{ ...paragraph, marginTop: "1rem" }}>
                You must be at least 18 to hold an account or use YRDLY&apos;s community, messaging,
                marketplace and event services. Adults must not help children evade this requirement.
                Anyone, including a young person or a parent, can contact us to report a safety concern.
              </p>
            </div>

            <section id="prohibited-conduct" aria-labelledby="prohibited-heading">
              <h2 id="prohibited-heading" className="font-display" style={heading}>What is prohibited</h2>
              <ul style={{ ...paragraph, paddingLeft: "1.25rem", listStyle: "disc", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <li>Creating, uploading, requesting, selling, sharing or linking to child sexual abuse material (CSAM), including altered or computer-generated depictions.</li>
                <li>Grooming or manipulating a child for sexual purposes, sexual solicitation, or attempts to arrange sexual contact with a child.</li>
                <li>Sextortion: threatening or coercing a child using intimate material, or demanding money, more material or sexual activity.</li>
                <li>Trafficking, facilitating sexual exploitation, sexualizing children, or encouraging or normalizing child sexual abuse.</li>
                <li>Using accounts, events, listings, payments or private messages to facilitate this conduct, or helping someone bypass a safety restriction.</li>
              </ul>
            </section>

            <section id="report" aria-labelledby="report-heading">
              <h2 id="report-heading" className="font-display" style={heading}>Report a child-safety concern</h2>
              <p style={paragraph}>
                In the app, use Report on the relevant account or content, or open Settings → Report
                an Issue and select Child safety. You can also email{" "}
                <a href="mailto:support@yrdly.ng?subject=Child%20safety%20concern" style={link}>support@yrdly.ng</a>{" "}
                with the subject &ldquo;Child safety concern&rdquo;. This email route is available
                without an account.
              </p>
              <p style={{ ...paragraph, marginTop: "1rem" }}>
                Include the username, a link or reference to the content or conversation, when it
                happened, and a brief description. Share only the personal information needed to
                locate and assess the concern. You do not need to investigate or confront the person.
              </p>
              <p style={{ ...paragraph, marginTop: "1rem", color: "var(--fg)", fontWeight: 600 }}>
                Do not download, screenshot, upload, email or forward suspected child sexual abuse
                imagery as evidence. Report where you encountered it so authorized reviewers can
                locate it safely.
              </p>
              <p style={{ ...paragraph, marginTop: "1rem" }}>
                You can block an account to stop unwanted contact. If a child is in immediate danger,
                contact local emergency services or law enforcement. YRDLY support is not an emergency
                response service.
              </p>
            </section>

            <section id="response" aria-labelledby="response-heading">
              <h2 id="response-heading" className="font-display" style={heading}>How we respond</h2>
              <p style={paragraph}>
                We review reported concerns and prioritize risks to a child&apos;s safety. We may
                restrict access to content or accounts while assessing a report. When we identify
                violations, we remove the content and may suspend or permanently disable the account.
                We act to remove CSAM when we become aware of it and report confirmed material to
                the appropriate authority where required by applicable law.
              </p>
              <p style={{ ...paragraph, marginTop: "1rem" }}>
                Information needed for safety investigations or legal reporting is handled with
                restricted access and retained only for the applicable purpose or legal obligation.
                We may limit the details we share about a case to protect a child, the person who
                reported it, or an investigation. See our{" "}
                <Link href="/privacy-policy" style={link}>Privacy Policy</Link> for how we handle personal data.
              </p>
            </section>

            <section id="review" aria-labelledby="review-heading">
              <h2 id="review-heading" className="font-display" style={heading}>Request a review or contact us</h2>
              <p style={paragraph}>
                If you believe we made a mistake, email{" "}
                <a href="mailto:support@yrdly.ng?subject=Child%20safety%20review" style={link}>support@yrdly.ng</a>{" "}
                with your account or report reference and the reason for your request. Do not attach
                prohibited imagery. We will review the information without requiring you to contact
                the reported person.
              </p>
              <p style={{ ...paragraph, marginTop: "1rem" }}>
                These standards form part of our <Link href="/terms" style={link}>Terms of Service</Link>{" "}
                and apply alongside our <Link href="/trust-and-safety" style={link}>Trust &amp; Safety guidance</Link>.
              </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
