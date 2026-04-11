import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "WUUS - Jasa Pembuatan Website Untuk Usaha (UMKM)",
  description: "Website Beres, Usaha Sukses! Jasa pembuatan website mewah, profesional, dengan harga ramah untuk mendigitalisasi UMKM Anda. Proses cepat secepat WUUS!",
  keywords: ["Jasa Web Murah", "Web Untuk Usaha", "Jasa Website UMKM", "Bikin Web Murah", "Website Siap Pakai", "Website Mewah Harga Ramah, bikin website murah, bikin web Tasikmalaya, Bikin Web Jakarta Barat, Jasa Buat Website Jakarta, Jasa Pembuatan Website Jakarta Barat, Jasa Pembuatan Website Jakarta Selatan, Jasa Pembuatan Website Jakarta Pusat, Jasa Pembuatan Website Jakarta Timur, Jasa Pembuatan Website Jakarta Utara, Jasa Pembuatan Website Depok, Jasa Pembuatan Website Tangerang, Jasa Pembuatan Website Bekasi, Jasa Pembuatan Website Bogor, Jasa Pembuatan Website Bandung, Jasa Pembuatan Website Surabaya, Jasa Pembuatan Webiste UMKM, "],
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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WUUS - Siap Bawa Usaha Anda Naik Kelas?",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WUUS - Jasa Pembuatan Website Untuk Usaha (UMKM)",
    description: "Website Beres, Usaha Sukses! Jasa pembuatan website mewah standar korporat untuk UMKM hebat.",
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
      className={`${plusJakarta.variable} ${caveat.variable} antialiased scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-light-grey text-primary-navy">
        {children}
      </body>
    </html>
  );
}
