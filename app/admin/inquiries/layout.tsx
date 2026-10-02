import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Inquiries | WUUS',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminInquiriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
