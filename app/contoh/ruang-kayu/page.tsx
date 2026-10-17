import type { Metadata } from 'next';
import { RuangKayu } from '@/components/concepts/ruang-kayu';

export const metadata: Metadata = {
  title: 'Ruang Kayu — Furniture yang Mengisi Cerita | Contoh Desain WUUS',
  description: 'Contoh website furniture dengan katalog, pilihan material, ukuran dan ringkasan kebutuhan lokal.',
  alternates: { canonical: 'https://webuntukusaha.com/contoh/ruang-kayu' },
  robots: { index: false, follow: true },
  openGraph: { title: 'Ruang Kayu · Contoh desain WUUS', description: 'Eksplorasi furniture dan konfigurasi kebutuhan ruang.', url: 'https://webuntukusaha.com/contoh/ruang-kayu', locale: 'id_ID', images: ['/images/concepts/ruang-kayu/hero.webp'] },
};
export default function Page() { return <RuangKayu />; }
