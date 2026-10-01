import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Websites for independent hotels | WUUS",
  description: "Fast, simple websites for independent hotels, with an optional AI assistant. Free 1-page review.",
  alternates: {
    canonical: "https://www.webuntukusaha.com/hospitality",
  },
  openGraph: {
    title: "Websites for independent hotels | WUUS",
    description: "Fast, simple websites for independent hotels. Free 1-page review.",
    url: "https://www.webuntukusaha.com/hospitality",
    siteName: "WUUS",
    images: [{ url: "/images/hospitality/coastal-retreat.jpg", width: 1200, height: 630, alt: "Websites for independent hotels" }],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Websites for independent hotels | WUUS",
    description: "Fast, simple websites for independent hotels. Free 1-page review.",
  }
};

export default function HospitalityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
