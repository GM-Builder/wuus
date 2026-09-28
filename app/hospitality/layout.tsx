import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WUUS - Modern Websites for Independent Boutique Hotels",
  description: "We engineer calm, high-performance websites and direct digital experiences for independent boutique hotels and hospitality stays. Async-first workflow, fixed scope.",
  keywords: [
    "boutique hotel website design",
    "hospitality digital studio",
    "direct booking website",
    "independent hotel web development",
    "hotel mobile UX",
    "WUUS hospitality"
  ],
  openGraph: {
    title: "WUUS - Modern Websites for Independent Boutique Hotels",
    description: "Digital experiences that help boutique stays showcase character and clarify direct guest inquiries.",
    siteName: "WUUS Digital Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WUUS - Modern Websites for Independent Boutique Hotels",
    description: "Digital experiences that help boutique stays showcase character and clarify direct guest inquiries.",
  }
};

export default function HospitalityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
