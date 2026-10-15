import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discover Events Near You - Yrdly',
  description: "Find your next plan. Discover public events, gatherings and celebrations across Nigeria on YRDLY.",
  alternates: {
    canonical: '/events',
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
