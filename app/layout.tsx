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
  metadataBase: new URL("https://webuntukusaha.com"),
  title: "WUUS - Web Design & Digital Solutions",
  description:
    "WUUS is an independent web development and digital design studio building fast and thoughtful websites for businesses and hospitality.",
  alternates: {
    canonical: "https://webuntukusaha.com",
  },
  openGraph: {
    title: "WUUS — Independent web design studio",
    description:
      "Clear websites for businesses and independent properties. Written scope, private preview and source code handover.",
    url: "https://webuntukusaha.com",
    siteName: "WUUS Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WUUS — Independent web design studio",
    description:
      "Websites for businesses and independent properties. Clear scope and a personal point of contact.",
    images: ["/opengraph-image"],
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
      <body className="min-h-full flex flex-col font-sans bg-white text-[#1C2733] antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
