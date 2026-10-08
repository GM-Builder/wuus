import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell, StudioAvatar } from "@/components/marketing/shell";
import { Examples } from "@/components/marketing/examples";
import { ServiceIcon } from "@/components/marketing/service-icon";
import { SalesHero } from "@/components/marketing/sales-hero";
import s from "@/components/marketing/marketing.module.css";

export const metadata: Metadata = {
  title: "WUUS — Website yang jelas untuk usaha Anda",
  description:
    "Studio website independen di Jakarta. Desain yang rapi, informasi yang jelas, dan cara mudah bagi pelanggan untuk menghubungi usaha Anda.",
  openGraph: {
    title: "WUUS — Website yang jelas untuk usaha Anda",
    description:
      "Desain website, scope tertulis, preview dan source-code handover.",
    locale: "id_ID",
  },
};
const steps = [
  [
    "Bahas kebutuhan",
    "Ceritakan usaha dan tujuan website. Kirim tautan website yang ada jika tersedia.",
  ],
  [
    "Setujui penawaran",
    "Sepakati scope, biaya, jadwal dan ketentuan. Produksi dimulai setelah DP terverifikasi dan materi lengkap.",
  ],
  [
    "Lihat preview",
    "Periksa website pada tautan preview. Revisi mengikuti jumlah ronde yang disepakati.",
  ],
  [
    "Launch dan serah terima",
    "Setelah persetujuan dan pelunasan, website diluncurkan serta kode dan panduan diserahkan.",
  ],
];
const questions = [
  [
    "Berapa biaya pembuatan website?",
    "Biaya mengikuti jumlah halaman, fitur, materi dan kebutuhan usaha. Penawaran tertulis menjelaskan total biaya serta domain, hosting dan layanan lain sebelum DP. Penawaran hospitality dapat dilihat pada halaman berbahasa Inggris.",
  ],
  [
    "Siapa yang menyiapkan materi?",
    "Anda menyiapkan teks, informasi usaha dan foto yang boleh digunakan. Bantuan konten atau bahasa tambahan dibahas dalam scope.",
  ],
  [
    "Apakah saya bisa mengedit sendiri?",
    "CMS dan fitur edit mandiri disiapkan jika disepakati dalam scope. Tanpa CMS, perubahan konten dapat dikerjakan WUUS dengan biaya yang disetujui.",
  ],
  [
    "Apakah website menjadi milik saya?",
    "Kode dan konten sesuai scope diserahkan setelah pelunasan. Domain dan hosting sebaiknya berada pada akun Anda. Lisensi aset pihak ketiga tetap berlaku.",
  ],
];
export default function Home() {
  return (
    <MarketingShell language="id">
      <main id="main">
        <SalesHero language="id" />
        <div className={`${s.container} ${s.proofLine}`}>
          <span>Nyaman dibuka di ponsel</span>
          <span>Scope dan harga tertulis</span>
          <span>Preview sebelum pelunasan</span>
          <span>Serah terima kode website</span>
        </div>
        <section id="services" className={`${s.container} ${s.section}`}>
          <div className={s.sectionHead}>
            <p className={s.eyebrow}>Layanan WUUS</p>
            <h2>
              Informasi yang dibutuhkan.
              <br />
              Tampilan yang tertata.
            </h2>
            <p>
              Mulai dari kebutuhan usaha Anda. Jumlah halaman, fitur, materi dan
              jadwal ditulis dalam penawaran.
            </p>
          </div>
          <div className={s.three}>
            {[
              [
                "Website usaha",
                "Profil, layanan, galeri, lokasi dan kontak agar pelanggan dapat mengenal usaha Anda.",
              ],
              [
                "Website hospitality",
                "Kamar, fasilitas, informasi properti, inquiry dan tautan ke booking engine yang sudah Anda gunakan.",
              ],
              [
                "Perapihan website",
                "Evaluasi tampilan mobile, susunan konten dan tombol kontak. Pengerjaan mengikuti kondisi website yang ada.",
              ],
            ].map(([title, body], index) => (
              <article className={s.feature} key={title}>
                <ServiceIcon
                  kind={
                    index === 0
                      ? "layout"
                      : index === 1
                        ? "message"
                        : "handover"
                  }
                  className={s.serviceIcon}
                />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/hospitality" className={s.textLink}>
              Hotel atau guesthouse? Lihat penawaran hospitality{" "}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
        <section id="examples" className={`${s.section} ${s.blueSection}`}>
          <div className={s.container}>
            <div className={s.sectionHead}>
              <p className={s.eyebrow}>Contoh desain</p>
              <h2>
                Lihat bentuknya.
                <br />
                Coba alurnya.
              </h2>
              <p>
                Tiga konsep hospitality untuk memperlihatkan susunan konten dan
                alur inquiry. Properti dan foto merupakan contoh fiktif, bukan
                hasil proyek klien.
              </p>
            </div>
            <Examples language="id" />
          </div>
        </section>
        <section
          id="process"
          className={`${s.container} ${s.section} ${s.split}`}
        >
          <div>
            <p className={s.eyebrow}>Cara kerja</p>
            <h2>
              Dari kebutuhan
              <br />
              ke website yang siap diserahkan.
            </h2>
            <p>
              Anda berhubungan langsung dengan pembuat website. Materi, batas
              revisi dan biaya layanan pihak ketiga dijelaskan sejak awal.
            </p>
            <div className={s.processIllustration} aria-hidden="true" />
          </div>
          <ol className={s.steps}>
            {steps.map(([title, body], index) => (
              <li key={title}>
                <span className={s.number}>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className={`${s.section} ${s.darkSection}`}>
          <div className={`${s.container} ${s.about}`}>
            <StudioAvatar />
            <div>
              <p className={s.eyebrow}>Tentang studio</p>
              <h2>
                Satu penanggung jawab.
                <br />
                Komunikasi langsung.
              </h2>
              <p>
                WUUS adalah studio website independen yang dijalankan satu orang
                di Jakarta. Anda bekerja langsung dengan orang yang mendesain
                dan membangun website.
              </p>
              <p>
                Kepercayaan dibangun melalui scope yang jelas, update tertulis,
                preview yang bisa diperiksa, dan serah terima yang rapi.
              </p>
            </div>
          </div>
        </section>
        <section id="faq" className={`${s.container} ${s.section} ${s.split}`}>
          <div>
            <p className={s.eyebrow}>Sebelum mulai</p>
            <h2>Yang perlu Anda tahu.</h2>
          </div>
          <div className={s.faq}>
            {questions.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section
          id="contact"
          className={`${s.section} ${s.contactSection} ${s.needsSection}`}
        >
          <div className={`${s.container} ${s.needsStory}`}>
            <div>
              <div className={s.sectionHead}>
                <p className={s.eyebrow}>Mulai dari kebutuhan Anda</p>
                <h2>
                  Ceritakan usaha Anda.
                  <br />
                  Kita tentukan langkah berikutnya.
                </h2>
                <p>
                  Kirim jenis usaha, tautan website jika ada, dan hal yang ingin
                  diperbaiki. WUUS akan membalas melalui email dalam dua hari
                  kerja.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:hallo@webuntukusaha.com?subject=Diskusi%20website%20usaha"
                  className={s.button}
                >
                  Email WUUS
                </a>
                <a
                  href="https://wa.me/6281383521750?text=Halo%20WUUS%2C%20saya%20ingin%20membahas%20website%20usaha."
                  className={s.buttonLight}
                >
                  Hubungi via WhatsApp
                </a>
              </div>
              <p className={s.smallPrint}>
                hallo@webuntukusaha.com · Jakarta, Indonesia
              </p>
            </div>
            <div className={s.needsIllustration} aria-hidden="true" />
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
