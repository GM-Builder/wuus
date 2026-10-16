import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/shell";
import s from "@/components/marketing/marketing.module.css";
export const metadata: Metadata = {
  title: "Ketentuan proyek | WUUS",
  alternates: { canonical: "https://webuntukusaha.com/syarat-ketentuan" },
};
const sections = [
  [
    "Cakupan pekerjaan sebelum pengerjaan",
    "WUUS menyediakan desain dan pengembangan website dari Jakarta, Indonesia. Setiap proyek dimulai dengan penawaran tertulis yang menjelaskan identitas penyedia jasa, halaman, konten, fitur, harga, mata uang, biaya pihak ketiga, jadwal, persetujuan hasil, pembatalan dan instruksi pembayaran sebelum uang muka dibayar. Booking engine, pembayaran tamu, terjemahan, CMS dan AI live hanya tersedia bila disepakati secara khusus dalam cakupan pekerjaan; semuanya tidak termasuk paket website standar.",
  ],
  [
    "Pembayaran dan pratinjau",
    "Jadwal standar adalah uang muka (DP) 50% sebelum produksi dan pelunasan 50% setelah persetujuan pratinjau tertulis, sebelum peluncuran dan serah terima kode. Metode pembayaran, mata uang, biaya provider, pajak yang berlaku dan jumlah pembayaran dijelaskan pada penawaran atau invoice. DP dicatat setelah dana terverifikasi diterima.",
  ],
  [
    "Materi, jadwal dan revisi",
    "Anda menyediakan fakta usaha, teks dan foto yang disetujui serta memiliki izin penggunaan. Jadwal pengerjaan dimulai setelah DP dan materi lengkap. Website Mulai mencakup satu tahap revisi dengan masukan yang dikumpulkan bersama; Website Tumbuh dan Sistem Satu Alur mencakup dua tahap revisi. Tambahan halaman, bahasa, fitur atau perubahan arah desain dibahas dan disetujui sebelum dikerjakan.",
  ],
  [
    "Anggaran paket UMKM Indonesia",
    "Biaya pengerjaan Website Mulai Rp750.000, Website Tumbuh Rp1.750.000 dan Sistem Satu Alur Rp3.500.000. Total awal paket UMKM dibatasi Rp4.750.000, termasuk biaya wajib domain, hosting, layanan pihak ketiga tahun pertama dan pajak bila berlaku. Jika kebutuhan melebihi batas anggaran, kebutuhan diperkecil atau diarahkan ke alat siap pakai sebelum penawaran disetujui. Perpanjangan tahun berikutnya dan pemeliharaan opsional dijelaskan terpisah. Paket ini untuk UMKM Indonesia; penawaran hospitality internasional mengikuti halaman dan ketentuan tersendiri.",
  ],
  [
    "Pembatalan",
    "Ketentuan pembatalan, pekerjaan yang sudah dilakukan dan pengembalian dana dijelaskan pada kesepakatan proyek tertulis serta mengikuti kewajiban yang berlaku. Periksa ketentuan tersebut sebelum membayar DP.",
  ],
  [
    "Kepemilikan dan biaya berkelanjutan",
    "Setelah pelunasan, kode sumber dan konten sesuai cakupan pekerjaan diserahkan kepada Anda. Aset, font dan library pihak ketiga tetap mengikuti lisensinya. Domain dan hosting sebaiknya berada pada akun yang Anda kendalikan. Biaya domain, hosting komersial, integrasi, perpanjangan dan pemeliharaan dijelaskan terpisah dalam penawaran.",
  ],
  [
    "Dukungan setelah peluncuran",
    "Penawaran standar mencakup dukungan selama 14 hari kalender setelah peluncuran untuk kesalahan fungsi terhadap cakupan pekerjaan yang disepakati. Konten baru, fitur baru dan gangguan layanan pihak ketiga berada di luar dukungan perbaikan ini. Website tidak menjamin jumlah booking, pendapatan atau peringkat pencarian.",
  ],
  [
    "Portofolio dan kontak",
    "WUUS meminta izin tertulis sebelum menampilkan proyek sebagai studi kasus. Hubungi hallo@webuntukusaha.com untuk pertanyaan mengenai proyek atau ketentuan ini.",
  ],
];
export default function TermsPage() {
  return (
    <MarketingShell language="id">
      <main id="main" className={`${s.container} ${s.legal}`}>
        <p className={s.eyebrow}>Diperbarui 16 Oktober 2026</p>
        <h1>Ketentuan proyek</h1>
        <div className="mt-10 space-y-8">
          {sections.map(([title, content]) => (
            <section key={title}>
              <h2>{title}</h2>
              <p className="mt-3">{content}</p>
            </section>
          ))}
        </div>
        <p className="mt-10">
          <Link href="/kebijakan-privasi">Informasi privasi</Link> ·{" "}
          <Link href="/hospitality/terms" lang="en">
            English version
          </Link>
        </p>
      </main>
    </MarketingShell>
  );
}
