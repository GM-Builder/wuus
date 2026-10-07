import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free hotel website review | WUUS',
  description: 'Request a personal review of your hotel website and direct enquiry experience.',
  alternates: { canonical: 'https://webuntukusaha.com/review' },
  openGraph: { url: 'https://webuntukusaha.com/review', title: 'Free hotel website review | WUUS' },
};

export default function ReviewLayout({ children }: { children: React.ReactNode }) { return children; }
