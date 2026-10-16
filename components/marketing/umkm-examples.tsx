"use client";

import { useState } from "react";
import s from "./marketing.module.css";

const concepts = [
  { name: "Kuliner & produk", brand: "Dapur Saji", title: "Menu untuk acara Anda", intro: "Lihat pilihan menu, porsi dan cara pemesanan tanpa harus menanyakan semuanya lewat chat.", items: [["Paket makan siang", "Isi menu dan pilihan porsi"], ["Snack box", "Pilihan kue dan jumlah pesanan"], ["Menu acara", "Pilihan menu sesuai kebutuhan"]], note: "Katalog, informasi pesanan dan tombol WhatsApp." },
  { name: "Jasa & layanan", brand: "Bersih Laundry", title: "Pilih layanan yang Anda butuhkan", intro: "Informasi layanan, jam buka dan area antar jemput tersedia dalam satu halaman.", items: [["Cuci & setrika", "Rincian layanan dan estimasi waktu"], ["Laundry satuan", "Daftar barang dan ketentuan"], ["Antar jemput", "Area layanan dan jadwal"]], note: "Daftar layanan, ketentuan dan kontak usaha." },
  { name: "Usaha & pemasok", brand: "Ruang Kayu", title: "Furnitur sesuai kebutuhan ruang", intro: "Bandingkan bahan dan ukuran, lalu kirim kebutuhan Anda untuk mendapatkan penawaran.", items: [["Meja kerja", "Pilihan bahan dan ukuran"], ["Rak penyimpanan", "Spesifikasi dan pilihan finishing"], ["Pesanan khusus", "Formulir kebutuhan dan konsultasi"]], note: "Katalog produk, spesifikasi dan permintaan penawaran." },
];

export function UmkmExamples({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState(0);
  const concept = concepts[selected];
  return (
    <div className={s.businessExamples}>
      {!compact && <div className={s.businessChoices} role="group" aria-label="Pilih contoh jenis usaha">
        {concepts.map((item, index) => <button key={item.name} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.name}</button>)}
      </div>}
      <div className={s.businessPreview} aria-live={compact ? "off" : "polite"}>
        <div className={s.businessBar}><strong>{concept.brand}</strong><span>Contoh website usaha</span></div>
        <div className={s.businessBody}>
          <h3>{concept.title}</h3><p>{concept.intro}</p>
          <div className={s.businessProducts}>{concept.items.map(([title, detail]) => <div key={title}><h4>{title}</h4><p>{detail}</p></div>)}</div>
          <div className={s.businessBottom}><span>{concept.note}</span><a href="#contact" className={s.buttonLight}>Bahas website seperti ini</a></div>
        </div>
      </div>
      {!compact && <p className={s.smallPrint}>Nama usaha dan isi di atas adalah contoh untuk menjelaskan susunan website, bukan proyek klien. Tampilan dan fitur akhir mengikuti paket yang disepakati.</p>}
    </div>
  );
}
