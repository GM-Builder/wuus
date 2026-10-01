import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Variable.woff2",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const outfit = localFont({
  src: "../public/fonts/Outfit-Variable.woff2",
  variable: "--font-outfit",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.webuntukusaha.com'),
  title: "WUUS Studio - High-Performance Digital Platforms & AI Automation",
  description: "Next-generation engineering studio building bespoke direct-booking engines, high-speed corporate architectures, and 24/7 autonomous AI guest concierge systems.",
  keywords: [
    "WUUS Studio",
    "Bespoke Web Development",
    "Direct Booking Engine",
    "Hospitality AI Concierge",
    "Next.js High Performance Agency",
    "Autonomous Business Automation"
  ],
  alternates: {
    canonical: "https://www.webuntukusaha.com",
  },
  openGraph: {
    title: "WUUS Studio - Engineering Next-Gen Digital Platforms",
    description: "Bespoke digital architecture, direct booking engines, and autonomous AI systems built for modern business growth.",
    url: "https://www.webuntukusaha.com",
    siteName: "WUUS Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WUUS Studio - High-Performance Web & AI Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WUUS Studio - High-Performance Digital Platforms",
    description: "Bespoke digital architecture, direct booking engines, and autonomous AI systems.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${satoshi.variable} ${outfit.variable} font-sans antialiased scroll-smooth selection:bg-amber-500/20 selection:text-[#1C2733]`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700,800,900&display=swap" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#1C2733] antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
