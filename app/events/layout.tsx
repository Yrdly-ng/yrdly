import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discover Events Near You - Yrdly',
  description: "From owambe nights to farmers markets — find what's happening in your estate and secure your spot instantly.",
  alternates: {
    canonical: '/events',
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
