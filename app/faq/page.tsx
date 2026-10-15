import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
export const metadata = {
  title: "A few questions — YRDLY",
  description:
    "Help with exploring YRDLY, your account, marketplace listings, events and community safety.",
  alternates: { canonical: "/faq" },
};
const groups = [
  {
    title: "Getting to know YRDLY",
    questions: [
      [
        "What is YRDLY?",
        "YRDLY is a neighbourhood discovery and community platform for Nigeria. Find local businesses, browse marketplace listings, discover events and connect with people through neighbourhood conversations and communities.",
      ],
      [
        "Do I need an account to look around?",
        "You can preview public listings, businesses and events on this website without logging in. For the full experience, including messaging, selling, joining communities and booking tickets, continue to app.yrdly.ng and sign in.",
      ],
      [
        "Is YRDLY only for Lagos or private estates?",
        "No. YRDLY is for neighbourhoods across Nigeria, in cities and towns of every size. In the app, choose your state and local area to make discovery more relevant to you.",
      ],
      [
        "Is it free to join?",
        "Creating an account and browsing YRDLY is free. Paid items, services and event tickets have their own prices. Review the fees and total shown at checkout before you pay.",
      ],
      [
        "How do I set my location?",
        "Follow the location steps when setting up your account in the app. You can also change the area you browse. Public previews on this website can be filtered by the states and local areas available in the current results.",
      ],
    ],
  },
  {
    title: "Buying, selling & businesses",
    questions: [
      [
        "How do I sell an item?",
        "Open Marketplace in the app and choose Sell Item. Add clear photographs, a description and a price, then follow the publishing steps. You can manage the listing from your account.",
      ],
      [
        "How do payments work?",
        "Where supported, YRDLY uses escrow to hold payment while a transaction is completed. Read the checkout details, fees and delivery terms carefully. Keep your payment and transaction communication in the app.",
      ],
      [
        "What if an item is not as described?",
        "Use the transaction’s dispute option before confirming completion. Include clear evidence and follow the instructions in the app. Support will review the issue; the outcome depends on the transaction and the evidence.",
      ],
      [
        "How do sellers receive their money?",
        "Manage your payout details and available balance in the app. Follow the payout steps shown for your account. Availability, fees and processing times are shown in the relevant payment screens.",
      ],
      [
        "Can I introduce my business?",
        "Yes. Open the business hub in the app to create and manage your business profile, showcase what you offer and connect with people looking for your services.",
      ],
    ],
  },
  {
    title: "Events & community",
    questions: [
      [
        "How do I attend an event?",
        "Browse the public event previews and open an event to see more. Continue in the app for current ticket availability and booking. Keep your digital ticket ready for check-in.",
      ],
      [
        "Can I host an event?",
        "Open Events in the app and choose to create an event. Add the date, place, description and ticket details, then follow the publishing steps. Manage attendance and check-in from your event tools.",
      ],
      [
        "How do I report a problem?",
        "Use the reporting tools on the relevant content in the app, or contact support@yrdly.ng. Include enough detail to help the team understand what happened.",
      ],
      [
        "What are the community rules?",
        "Be respectful, describe listings honestly and protect other people’s privacy. Fraud, harassment and misleading content have no place on YRDLY. Read our Trust & Safety page and the community guidelines in the app.",
      ],
    ],
  },
];
export default function FAQPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="page-intro wrap">
          <p className="eyebrow">A FEW QUESTIONS FIRST</p>
          <h1>
            Make yourself
            <br />
            <em>at home.</em>
          </h1>
          <p>
            A little help with looking around, joining in and finding your way.
          </p>
        </section>
        <div className="wrap faq-layout">
          <nav aria-label="Help topics">
            {groups.map((group, index) => (
              <a key={group.title} href={`#help-${index}`}>
                {group.title} ↓
              </a>
            ))}
            <Link href="/contact" className="text-link">
              Talk to us ↗
            </Link>
          </nav>
          <div>
            {groups.map((group, index) => (
              <section id={`help-${index}`} key={group.title}>
                <h2>{group.title}</h2>
                {group.questions.map(([question, answer]) => (
                  <details key={question}>
                    <summary>
                      {question}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
