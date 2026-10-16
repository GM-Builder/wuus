import type { Metadata } from 'next';
import { DapurSaji } from '@/components/concepts/dapur-saji';

export const metadata: Metadata = {
  title: 'Dapur Saji — Katering untuk Hari-Hari Penting | Contoh Desain WUUS',
  description: 'Contoh desain website katering: pilihan menu, paket makan siang, snack box dan penyusunan pesanan.',
  alternates: {canonical:'https://webuntukusaha.com/contoh/dapur-saji'},
  robots: {index:false,follow:true},
  openGraph: { title:'Dapur Saji · Contoh desain WUUS', description:'Website katering dengan katalog dan penyusunan pesanan.', url:'https://webuntukusaha.com/contoh/dapur-saji', locale:'id_ID' },
};
export default function Page() { return <DapurSaji />; }
