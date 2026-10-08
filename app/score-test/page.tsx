import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/shell";
import s from "@/components/marketing/marketing.module.css";

export const metadata: Metadata = {
  title: "Evaluasi kebutuhan website | WUUS",
  description:
    "Tiga pertanyaan untuk menentukan apa yang perlu diperbaiki pada website usaha Anda.",
  alternates: { canonical: "https://webuntukusaha.com/score-test" },
};

export default function WebsiteReadinessPage() {
  return (
    <MarketingShell language="id">
      <main id="main">
        <section className={`${s.container} ${s.hero}`}>
          <p className={s.eyebrow}>Evaluasi kebutuhan website</p>
          <h1>
            Mulai dari kebutuhan.
            <br />
            <span className={s.soft}>Tentukan perbaikannya.</span>
          </h1>
          <p className={s.heroCopy}>
            Tiga pertanyaan berikut membantu Anda menyiapkan diskusi tentang
            website usaha. Gunakan jawaban berdasarkan pengalaman pelanggan
            Anda.
          </p>
        </section>
        <section
          className={`${s.container} ${s.section}`}
          aria-label="Pertanyaan evaluasi"
        >
          <div className={s.three}>
            {[
              [
                "Informasi apa yang sulit ditemukan?",
                "Periksa layanan, harga, lokasi, dan jam operasional. Catat pertanyaan yang paling sering diajukan pelanggan.",
              ],
              [
                "Bagaimana tampilannya di ponsel?",
                "Buka website dari ponsel. Periksa apakah teks terbaca, foto tampil, dan tombol kontak mudah digunakan.",
              ],
              [
                "Apa langkah berikutnya bagi pelanggan?",
                "Coba alur menghubungi usaha, meminta penawaran, atau membuka tautan pemesanan. Catat bagian yang membingungkan.",
              ],
            ].map(([title, body]) => (
              <article className={s.feature} key={title}>
                <h2>{title}</h2>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <p className={s.smallPrint}>
            Ini panduan evaluasi mandiri, bukan skor industri atau prediksi
            pendapatan. Jawaban Anda tidak dikumpulkan oleh halaman ini.
          </p>
        </section>
        <section className={`${s.section} ${s.wash}`}>
          <div className={s.container}>
            <div className={s.sectionHead}>
              <h2>Bahas temuan Anda.</h2>
              <p>
                Kirim tautan website dan bagian yang ingin diperbaiki. WUUS akan
                membantu menentukan scope serta biaya sebelum pengerjaan.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 items-center">
              <Link href="/inquiries" className={s.button}>
                Siapkan diskusi website
              </Link>
              <Link href="/hospitality" className={s.textLink}>
                Punya hotel atau guesthouse? ↗
              </Link>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
