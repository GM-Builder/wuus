"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { motion } from "framer-motion";
import {
  Eye,
  Database,
  ShieldCheck,
  Users,
  Cookie,
  CheckCircle2,
  Calendar,
  MessageCircle,
} from "lucide-react";

export default function KebijakanPrivasi() {
  const lastUpdated = "14 April 2026";

  const sections = [
    {
      title: "1. Informasi yang Kami Kumpulkan",
      icon: <Database className="w-6 h-6 text-accent-orange" />,
      content:
        "Kami hanya mengumpulkan informasi yang diperlukan untuk menjalankan proyek Anda, mencakup: Nama dan identitas bisnis, Nomor WhatsApp yang diberikan saat konsultasi, serta Detail kebutuhan website (teks, foto, logo). Kami tidak mengumpulkan informasi keuangan sensitif seperti nomor rekening atau data kartu kredit.",
    },
    {
      title: "2. Keamanan & Penanganan Data",
      icon: <ShieldCheck className="w-6 h-6 text-accent-orange" />,
      content:
        "Kami menegaskan bahwa kami tidak pernah menjual data Anda kepada pihak manapun. Data yang dikumpulkan (Nama, WhatsApp, Detail Bisnis) hanya digunakan untuk keperluan komunikasi proyek.",
    },
    {
      title: "3. Penggunaan Layanan Pihak Ketiga",
      icon: <Users className="w-6 h-6 text-accent-orange" />,
      content:
        "Dalam menjalankan proyek, data teknis Anda mungkin bersinggungan dengan layanan pihak ketiga resmi yang kami gunakan untuk menjamin performa website Anda, seperti: Vercel/Hosting Provider untuk deployment kode sumber, Registrar Domain untuk pendaftaran nama domain resmi atas nama Anda, dan WhatsApp sebagai media komunikasi utama.",
    },
    {
      title: "4. Hak Penghapusan Data",
      icon: <CheckCircle2 className="w-6 h-6 text-accent-orange" />,
      content:
        "Kami menyimpan data proyek untuk keperluan dukungan teknis di masa depan. Namun, Anda memiliki hak penuh untuk meminta penghapusan seluruh data aset atau kredensial akses Anda dari database internal kami kapan saja melalui konfirmasi tertulis via WhatsApp.",
    },
    {
      title: "5. Penggunaan Cookie",
      icon: <Cookie className="w-6 h-6 text-accent-orange" />,
      content:
        "Website webuntukusaha.com mungkin menggunakan cookie — file data kecil yang disimpan di perangkat Anda — untuk meningkatkan pengalaman penelusuran Anda. Cookie tidak mengandung informasi identitas pribadi. Anda dapat mengatur browser Anda untuk menolak cookie, meskipun beberapa fitur situs mungkin tidak berfungsi optimal karenanya.",
    },
    {
      title: "6. Perubahan Kebijakan Privasi",
      icon: <Eye className="w-6 h-6 text-accent-orange" />,
      content:
        "WUUS berhak mengubah kebijakan privasi ini sewaktu-waktu seiring perkembangan layanan. Perubahan material akan diinformasikan melalui halaman ini dengan memperbarui tanggal 'Terakhir Diperbarui'. Melanjutkan penggunaan layanan kami setelah perubahan diterbitkan dianggap sebagai penerimaan atas kebijakan yang diperbarui.",
    },
  ];


  return (
    <main className="flex min-h-screen flex-col w-full bg-light-grey">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-primary-navy relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-accent-orange/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-blue/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-accent-orange text-sm font-bold tracking-widest uppercase mb-4 block">
              Transparansi & Kepercayaan
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Kebijakan{" "}
              <span className="text-accent-orange">Privasi</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
              WUUS berkomitmen menjaga kepercayaan Anda. Berikut adalah penjelasan
              lengkap tentang bagaimana kami mengumpulkan, menggunakan, dan
              melindungi informasi Anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Intro Notice Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 p-6 bg-accent-orange/10 border border-accent-orange/30 rounded-2xl flex items-start gap-4"
          >
            <ShieldCheck className="w-6 h-6 text-accent-orange mt-0.5 shrink-0" />
            <p className="text-primary-navy font-medium text-sm leading-relaxed">
              Dengan menggunakan layanan WebUntukUsaha (WUUS), Anda menyetujui
              pengumpulan dan penggunaan informasi sesuai dengan kebijakan ini.
              Kami menegaskan bahwa kami{" "}
              <strong>tidak pernah menjual data Anda</strong> kepada pihak
              manapun.
            </p>
          </motion.div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-primary-navy/5 p-8 md:p-12">
            {/* Last Updated */}
            <div className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-10 border-b border-gray-100 pb-6">
              <Calendar className="w-4 h-4" />
              <span>Terakhir diperbarui: {lastUpdated}</span>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group"
                >
                  <div className="flex items-start gap-6">
                    <div className="mt-1 w-12 h-12 shrink-0 bg-accent-orange/10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-black text-primary-navy mb-3 group-hover:text-accent-orange transition-colors">
                        {section.title}
                      </h2>
                      <p className="text-gray-500 leading-relaxed text-base md:text-lg">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 p-8 bg-primary-navy rounded-3xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-secondary-blue/30 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <MessageCircle className="w-10 h-10 text-accent-orange mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">
                  Ada Pertanyaan tentang Data Anda?
                </h3>
                <p className="text-gray-300 text-sm mb-8 max-w-md mx-auto">
                  Kami sangat terbuka. Hubungi kami langsung jika Anda ingin
                  mengakses, mengkoreksi, atau menghapus data pribadi Anda.
                </p>
                <a
                  href="https://wa.me/6281383521750?text=Halo%20WUUS%2C%20saya%20ingin%20bertanya%20mengenai%20Kebijakan%20Privasi."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent-orange text-white px-8 py-4 rounded-xl font-bold hover:bg-amber-400 transition-all shadow-lg hover:shadow-accent-orange/30 hover:-translate-y-1"
                >
                  <MessageCircle className="w-5 h-5" />
                  Hubungi Kami via WhatsApp
                </a>
              </div>
            </motion.div>
          </div>

          {/* Cross-link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center text-sm text-gray-400"
          >
            Lihat juga:{" "}
            <a
              href="/syarat-ketentuan"
              className="font-semibold text-primary-navy hover:text-accent-orange transition-colors underline underline-offset-4"
            >
              Syarat & Ketentuan WUUS
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}
