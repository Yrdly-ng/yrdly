import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: "Privacy Policy - Yrdly",
  description: "Comprehensive Privacy Policy detailing how Yrdly collects, uses, stores, and protects your personal information.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

const SECTIONS = [
  {
    id: "overview",
    title: "1. Overview & Scope",
    intro: "Yrdly Technologies Limited (\"Yrdly\", \"we\", \"us\", or \"our\") operates the Yrdly mobile application, web applications (including yrdly.ng and app.yrdly.ng), and related services (collectively, the \"Services\"). This Privacy Policy explains how we collect, process, share, and protect your personal information when you register an account, browse local listings, buy or sell items, organize or join neighborhood events, or use our integrated payment and escrow features.",
    items: [
      [null, "By creating an account or using our Services, you acknowledge that you have read and understood this Privacy Policy."],
      [null, "This policy applies to all users, including buyers, sellers, event organizers, and general visitors across all platforms."]
    ],
  },
  {
    id: "data-collection",
    title: "2. Information We Collect",
    intro: "We collect information to provide, secure, and improve our neighborhood marketplace services. The categories of data we collect include:",
    items: [
      ["Account & Profile Information:", " Full name, email address, phone number, profile picture, username, and password hashes created during registration."],
      ["Identity Verification Data:", " Government-issued identification documents, Bank Verification Number (BVN), National Identification Number (NIN), or selfie verification photos when required for seller verification, high-value transactions, or anti-fraud compliance."],
      ["Financial & Escrow Transaction Data:", " Bank account numbers, payout bank details, escrow transaction history, payment status, transaction reference IDs, and billing addresses. Payment card details are processed directly by our PCI-DSS compliant payment partners (such as Payluk) and are never stored on Yrdly servers."],
      ["User Content & Listings:", " Images, item descriptions, prices, categories, event details, comments, ratings, and in-app chat communications exchanged between buyers and sellers."],
      ["Location & Geographical Data:", " Precise GPS location (with your explicit permission) or approximate location based on IP address and postal/neighborhood selections. Location data is used to match you with nearby listings, calculate item distances, and verify local community boundaries."],
      ["Device & Technical Identifiers:", " IP address, unique device identifiers (IDFA, Android Advertising ID), device hardware model, operating system version, mobile network details, browser type, app version, and push notification tokens."],
      ["Usage & Log Data:", " Search queries, pages viewed, listings saved, interaction timestamps, referral URLs, crash logs, and app performance metrics."]
    ],
  },
  {
    id: "collection-methods",
    title: "3. How We Collect Your Information",
    intro: "We gather information through three main channels:",
    items: [
      ["Directly from You:", " When you sign up, complete your profile, post a listing, message a user, fund an escrow account, or contact customer support."],
      ["Automated Technologies:", " As you navigate our app or website, background processes collect technical, log, and location data via cookies, local storage, and mobile SDKs."],
      ["Third-Party Partners:", " From payment processors (e.g., Payluk), identity verification services, and authentication providers (e.g., Google or Apple sign-in)."]
    ],
  },
  {
    id: "how-we-use",
    title: "4. How We Use Your Information",
    intro: "We process your personal information for specific, lawful operational purposes, including:",
    items: [
      ["Core Marketplace Features:", " Facilitating local buying, selling, item discovery, neighborhood event coordination, and buyer-seller messaging."],
      ["Escrow & Payment Processing:", " Processing payments, holding funds in secure escrow until order delivery confirmation, executing payouts, and managing refunds or dispute resolutions."],
      ["Location-Based Services:", " Displaying distance-sorted listings, displaying local neighborhood hubs, and enabling location-filtered searches."],
      ["Account Security & Fraud Prevention:", " Authenticating user logins, monitoring suspicious activity, preventing scam listings, and verifying seller identities."],
      ["Communications & Alerts:", " Sending order updates, escrow status changes, chat notification alerts, security warnings, and customer support responses."],
      ["Analytics & System Improvement:", " Analyzing usage patterns, optimizing mobile app responsiveness, debugging software errors, and developing new features."],
      ["Legal & Regulatory Compliance:", " Complying with financial regulations, anti-money laundering (AML) laws, tax requirements, and valid law enforcement inquiries."]
    ],
  },
  {
    id: "device-permissions",
    title: "5. Mobile Device Permissions",
    intro: "Our mobile application requires access to certain device features to function properly. You can manage these permissions at any time in your device settings:",
    items: [
      ["Location Access:", " Used to calculate proximity to sellers, display nearby listings, and set your local neighborhood."],
      ["Camera & Photo Library:", " Used to capture and upload images of items for sale, event banners, and profile pictures."],
      ["Push Notifications:", " Used to send instant alerts for incoming buyer messages, offer updates, escrow releases, and account notifications."],
      ["Storage Access:", " Used to temporarily cache app images, speed up load times, and export transaction receipts."]
    ],
  },
  {
    id: "data-sharing",
    title: "6. Sharing & Disclosure of Information",
    intro: "We do not sell, rent, or trade your personal data to third parties or data brokers for marketing purposes. We share information only under the following strictly defined conditions:",
    items: [
      ["Public Marketplace Interactions:", " Your public profile name, avatar, member rating, general neighborhood location, and active listings are visible to other Yrdly users."],
      ["Payment & Escrow Service Providers:", " We share necessary transaction metadata with licensed payment processors (including Payluk at api.payluk.ng) to process payments, manage escrow accounts, and disburse bank payouts."],
      ["Infrastructure & Cloud Vendors:", " Trusted third-party service providers who host our databases (Supabase), run web servers (Vercel), deliver transactional emails/SMS (Resend), and perform error tracking (Crashlytics)."],
      ["Legal Authorities & Protection:", " When required by applicable law, court order, subpoena, or government regulation, or when necessary to investigate potential fraud, enforce our Terms of Service, or protect the safety of our users."]
    ],
  },
  {
    id: "data-retention",
    title: "7. Data Security & Storage",
    intro: "We maintain rigorous technical and organizational safeguards to protect your personal data against unauthorized access, loss, alteration, or disclosure:",
    items: [
      ["Encryption Standards:", " All data transmitted between your device and our servers is encrypted using industry-standard Transport Layer Security (TLS/SSL). Sensitive database records are encrypted at rest using AES-256 encryption."],
      ["Access Control:", " Access to personal data is restricted strictly to authorized personnel and sub-processors bound by confidentiality obligations."],
      ["Retention Period:", " We retain personal data for as long as your account remains active or as needed to provide Services. Financial and escrow transaction records are retained for up to 7 years to satisfy statutory tax, accounting, and anti-money laundering requirements."]
    ],
  },
  {
    id: "user-rights",
    title: "8. Your Data Rights & Account Deletion",
    intro: "Depending on your jurisdiction, you possess the following rights regarding your personal information:",
    items: [
      ["Access & Update:", " You can review and modify your account details, profile picture, and phone number directly within the app settings."],
      ["Opt-Out of Marketing:", " You can opt out of promotional communications at any time using the unsubscribe link in emails or disabling marketing notifications."],
      ["Location & Permission Revocation:", " You can disable location access or push notifications via your mobile device's operating system settings."],
      ["Account & Data Erasure Request:", " You have the right to request permanent deletion of your account and associated personal data. To delete your account and erase your data: (1) Open the Yrdly mobile app or web app, navigate to Settings > Profile > Delete Account, or (2) Send an explicit written deletion request to support@yrdly.ng from your registered email address. We will verify your identity and process the erasure within 30 days, subject to legally mandatory transaction retention rules."]
    ],
  },
  {
    id: "children-privacy",
    title: "9. Children's Privacy",
    intro: "Yrdly is strictly intended for individuals aged 18 and older (or 13+ with adult supervision for browsing only; financial transactions require age 18+). We do not knowingly collect personal information from children under 13. If we discover that a child under 13 has created an account or submitted personal data, we will immediately delete such data and terminate the account.",
    items: [],
  },
  {
    id: "international-transfers",
    title: "10. International Data Transfers & Compliance",
    intro: "Your information may be stored and processed in secure data centers operating in Nigeria or international cloud regions (such as AWS/Supabase infrastructure). We ensure all cross-border data transfers comply with applicable data protection regulations, including the Nigeria Data Protection Act (NDPA) and international standards.",
    items: [],
  },
  {
    id: "policy-updates",
    title: "11. Updates to This Policy",
    intro: "We may update this Privacy Policy periodically to reflect changes in our platform features, legal duties, or security practices. Material updates will be communicated via in-app notifications, email alerts, or by updating the \"Last updated\" timestamp on this page. Continued use of Yrdly after changes take effect constitutes your acceptance of the revised policy.",
    items: [],
  },
  {
    id: "contact-us",
    title: "12. Contact Us & Data Officer",
    intro: "If you have questions, concerns, or requests regarding this Privacy Policy or your data privacy rights, please contact our Data Protection Team at:",
    items: [
      ["Email Support:", " support@yrdly.ng or yardlyng234@gmail.com"],
      ["Official Website:", " https://yrdly.ng"],
      ["Data Controller:", " Yrdly Technologies Limited, Lagos, Nigeria"]
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)", display: "flex", flexDirection: "column" }}>
      <Header />

      {/* Header band */}
      <section style={{ paddingTop: 96, paddingBottom: "4rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", background: "var(--section-alt)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link
            href="/"
            style={{
              fontSize: "0.82rem",
              color: "var(--fg-muted)",
              fontFamily: "var(--font-work-sans), sans-serif",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: 4,
              textDecoration: "none",
              width: "fit-content",
            }}
          >
            ← Back to Home
          </Link>
          <span className="pill" style={{ marginBottom: "1rem", display: "inline-flex" }}>Legal & Compliance</span>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
              fontWeight: 600,
              color: "var(--fg)",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ fontSize: "0.9rem", color: "var(--fg-muted)", fontWeight: 300 }}>Last updated: September 20, 2026</p>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: "4rem 1.5rem 6rem", flex: 1 }}>
        <div
          className="redesign-card"
          style={{ maxWidth: 800, margin: "0 auto", padding: "2.5rem 2rem", background: "var(--bg-card)" }}
        >
          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--fg-muted)", fontWeight: 300, marginBottom: "2.5rem" }}>
            At Yrdly, your privacy and data security are fundamental to our operations. This Privacy Policy provides complete transparency regarding how we collect, process, store, share, and protect your personal information across all Yrdly applications and services.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {SECTIONS.map((s) => (
              <div key={s.id || s.title} id={s.id}>
                <h2 className="font-display" style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                  {s.title}
                </h2>
                {s.intro && (
                  <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "var(--fg-muted)", fontWeight: 300, marginBottom: "0.5rem" }}>
                    {s.intro}
                  </p>
                )}
                {s.items.length > 0 && (
                  <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "0.5rem" }}>
                    {s.items.map(([bold, rest], i) => (
                      <li key={i} style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--fg-muted)", fontWeight: 300 }}>
                        {bold && <strong style={{ color: "var(--fg)", fontWeight: 500 }}>{bold} </strong>}
                        {rest}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
