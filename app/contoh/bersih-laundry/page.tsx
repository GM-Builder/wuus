import type {Metadata} from 'next';
import {BersihLaundry} from '@/components/concepts/bersih-laundry';
export const metadata:Metadata={
  title:'Bersih Laundry — Pakaian Bersih, Siap Dipakai Lagi | Contoh Desain WUUS',
  description:'Contoh desain website laundry lengkap dengan pilihan layanan, estimasi biaya, rencana penjemputan dan contoh pelacakan cucian.',
  alternates:{canonical:'https://webuntukusaha.com/contoh/bersih-laundry'},
  robots:{index:false,follow:true},
  openGraph:{title:'Bersih Laundry · Contoh desain WUUS',description:'Pilihan layanan dan alur laundry dalam satu website.',locale:'id_ID',url:'https://webuntukusaha.com/contoh/bersih-laundry'},
};
export default function Page(){return <BersihLaundry/>;}
