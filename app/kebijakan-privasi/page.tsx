import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/shell";
import s from "@/components/marketing/marketing.module.css";
export const metadata: Metadata = {
  title: "Informasi privasi | WUUS",
  alternates: { canonical: "https://webuntukusaha.com/kebijakan-privasi" },
};
const sections = [
  [
    "Siapa yang menangani permintaan Anda",
    "WUUS adalah studio website independen di Jakarta, Indonesia. Hubungi hallo@webuntukusaha.com untuk pertanyaan tentang informasi pribadi atau pemberitahuan ini.",
  ],
  [
    "Informasi yang Anda kirim",
    "Form review mengumpulkan nama properti, tautan online, nama kontak, email, pesan dan jenis permintaan untuk membalas, menyiapkan review dan membahas proyek. ID permintaan, sumber, waktu dan versi persetujuan juga dicatat. Jika Anda memilih email atau WhatsApp, layanan tersebut menangani pesan yang Anda kirim. Jangan sertakan data tamu, password, detail kartu pembayaran atau dokumen identitas pada form.",
  ],
  [
    "Pengamanan dan layanan yang digunakan",
    "Website menggunakan Vercel untuk hosting, Supabase untuk penyimpanan inquiry dan login owner, Resend untuk notifikasi owner, serta Vercel Analytics dan Speed Insights untuk informasi trafik dan performa. Balasan ditangani melalui email bisnis. Hash ber-key dari alamat jaringan dipakai untuk membatasi pengiriman berulang, terpisah dari inquiry. Penyedia hosting dapat memproses log teknis untuk operasi dan keamanan website. Penyedia proyek atau pembayaran tambahan dijelaskan sebelum proyek berbayar dimulai.",
  ],
  [
    "Lokasi pemrosesan",
    "WUUS menangani permintaan dari Indonesia. Infrastruktur penyedia layanan dapat berada di luar negara Anda. Hubungi WUUS untuk informasi pengaturan penyedia dan proyek yang relevan dengan permintaan Anda.",
  ],
  [
    "Penyimpanan dan permintaan data",
    "Kebijakan operasional WUUS adalah meninjau dan menghapus inquiry prospek yang tidak aktif setelah 90 hari. Korespondensi proyek aktif dan catatan yang diperlukan untuk pembukuan disimpan sesuai kebutuhan proyek dan periode pencatatan yang berlaku. Catatan pembatasan jaringan dibersihkan dalam pemeliharaan rutin setelah tidak diperlukan. Anda dapat meminta salinan, koreksi, penghapusan inquiry atau penghentian kontak melalui email bisnis. WUUS memeriksa permintaan dan menjelaskan bila ada catatan yang harus disimpan.",
  ],
  [
    "Demo dan AI",
    "Contoh properti merupakan konsep fiktif. Respons chat pada demo disiapkan sebelumnya dan tidak dikirim ke provider AI live. Layanan AI live dan pembelian kredit sedang tidak tersedia.",
  ],
];
export default function PrivacyPage() {
  return (
    <MarketingShell language="id">
      <main id="main" className={`${s.container} ${s.legal}`}>
        <p className={s.eyebrow}>Diperbarui 8 Oktober 2026</p>
        <h1>Informasi privasi</h1>
        <div className="mt-10 space-y-8">
          {sections.map(([title, content]) => (
            <section key={title}>
              <h2>{title}</h2>
              <p className="mt-3">{content}</p>
            </section>
          ))}
        </div>
        <p className="mt-10">
          <Link href="/syarat-ketentuan">Ketentuan proyek</Link> ·{" "}
          <Link href="/hospitality/privacy" lang="en">
            English version
          </Link>
        </p>
      </main>
    </MarketingShell>
  );
}
