import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "WUUS - Jasa Pembuatan Website Untuk Usaha (UMKM)",
  description: "Website Beres, Usaha Sukses! Jasa pembuatan website mewah, profesional, dengan harga ramah untuk mendigitalisasi UMKM Anda. Proses cepat secepat WUUS!",
  keywords: ["Jasa Web Murah", "Web Untuk Usaha", "Jasa Website UMKM", "Bikin Web Murah", "Website Siap Pakai", "Website Mewah Harga Ramah"],
  alternates: {
    canonical: "https://www.webuntukusaha.com",
  },
  openGraph: {
    title: "WUUS - Website Beres, Usaha Sukses",
    description: "Jasa pembuatan website all-in-one berfokus pada kecepatan akses dan kemudahan untuk pemilik usaha.",
    url: "https://www.webuntukusaha.com",
    siteName: "WebUntukUsaha",
    locale: "id_ID",
    type: "website",
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
      className={`${plusJakarta.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-light-grey text-primary-navy">
        {children}
      </body>
    </html>
  );
}
