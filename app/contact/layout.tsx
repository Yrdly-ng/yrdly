import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us & Support - Yrdly",
  description: "Have a question, spotted an issue, or want to host an event in your community? Reach the Yrdly team anytime.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
