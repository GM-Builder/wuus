"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { motion } from "framer-motion";
import { ShieldCheck, Scale, FileText, Calendar, Lock, HelpCircle, Globe } from "lucide-react";

export default function TermsAndConditions() {
  const lastUpdated = "14 April 2026";

  const sections = [
    {
      title: "1. Ketentuan Umum",
      icon: <Globe className="w-6 h-6 text-accent-orange" />,
      content: "WebUntukUsaha (WUUS) adalah agensi penyedia layanan pengembangan website premium, desain ulang (redesign), dan optimasi digital yang berbasis di Indonesia. Dengan menggunakan layanan kami, Anda secara sadar menyetujui seluruh syarat dan ketentuan yang berlaku.",
    },
    {
      title: "2. Ruang Lingkup Layanan & Showcase",
      icon: <FileText className="w-6 h-6 text-accent-orange" />,
      content: "Layanan kami berfokus pada pengerjaan Project Custom yang disesuaikan dengan kebutuhan spesifik klien. Halaman preview.webuntukusaha.com adalah galeri portofolio (showcase) untuk menunjukkan standar kualitas pengerjaan WUUS. Desain di dalamnya dapat digunakan sebagai referensi inspirasi, namun spesifikasi akhir dan fitur akan disepakati melalui dokumen Penawaran (Quotation) resmi. Fitur atau layanan tambahan (Add-ons) saat ini hanya tersedia sebagai bagian dari paket bundling pengerjaan kustom.",
    },
    {
      title: "3. Domain dan Hosting",
      icon: <ShieldCheck className="w-6 h-6 text-accent-orange" />,
      content: "Paket bundling kami sudah termasuk biaya registrasi Domain dan Hosting selama 1 (satu) tahun pertama. Perpanjangan di tahun berikutnya merupakan tanggung jawab Klien sepenuhnya. Kelalaian dalam perpanjangan yang mengakibatkan website tidak dapat diakses atau hilangnya kepemilikan nama domain bukan merupakan tanggung jawab WUUS.",
    },
    {
      title: "4. Hak Kekayaan Intelektual",
      icon: <Lock className="w-6 h-6 text-accent-orange" />,
      content: "Seluruh desain orisinal, struktur kode sumber (source code), dan logika pemrograman yang dikembangkan oleh WUUS tetap menjadi hak milik intelektual WUUS. Klien diberikan lisensi penggunaan selamanya untuk satu domain yang disepakati. Materi konten (logo, foto, teks) yang disediakan Klien sepenuhnya tetap menjadi hak milik Klien.",
    },
    {
      title: "5. Kewajiban & Legalitas Konten",
      icon: <Scale className="w-6 h-6 text-accent-orange" />,
      content: "Klien wajib memberikan data yang akurat. WUUS berhak menolak atau memutus layanan secara sepihak jika website digunakan untuk kegiatan yang melanggar hukum di Indonesia, termasuk namun tidak terbatas pada: Perjudian, Penipuan, Asusila, atau Pelanggaran Hak Cipta pihak lain.",
    },
    {
      title: "6. Kebijakan Revisi & Perubahan Cakupan",
      icon: <Calendar className="w-6 h-6 text-accent-orange" />,
      content: "Batas revisi ditentukan dalam dokumen penawaran. Revisi hanya mencakup penyesuaian elemen yang sudah ada. Permintaan fitur baru di luar kesepakatan awal saat proses pengerjaan berlangsung akan dianggap sebagai Project baru dan dapat dikenakan biaya tambahan.",
    },
    {
      title: "7. Pembayaran & Pembatalan",
      icon: <HelpCircle className="w-6 h-6 text-accent-orange" />,
      content: "Pengerjaan dimulai segera setelah DP (Uang Muka) sebesar 50% dikonfirmasi. Jika Klien membatalkan pesanan secara sepihak setelah proses pengerjaan/desain dimulai, maka uang muka tidak dapat dikembalikan sebagai kompensasi waktu pengerjaan dan alokasi sumber daya.",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col w-full bg-light-grey">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-primary-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary-blue/20 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-accent-orange text-sm font-bold tracking-widest uppercase mb-4 block">
              Legalitas & Transparansi
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              Syarat & <span className="text-accent-orange">Ketentuan</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
              Kesepakatan ini dibuat untuk melindungi hak dan kewajiban antara WebUntukUsaha (WUUS) dan Anda sebagai Klien demi kenyamanan bersama.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-primary-navy/5 p-8 md:p-12">
            <div className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-10 border-b border-gray-100 pb-6">
              <Calendar className="w-4 h-4" />
              <span>Terakhir diperbarui: {lastUpdated}</span>
            </div>

            <div className="space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start gap-6">
                    <div className="mt-1 w-12 h-12 shrink-0 bg-accent-orange/10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-primary-navy mb-4 group-hover:text-accent-orange transition-colors">
                        {section.title}
                      </h2>
                      <p className="text-gray-500 leading-relaxed text-lg">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-20 p-8 bg-light-grey rounded-3xl border border-gray-100 text-center">
              <h3 className="text-xl font-bold text-primary-navy mb-4">Punya Pertanyaan Mengenai S&K?</h3>
              <p className="text-gray-500 mb-8">Tim kami siap membantu menjelaskan setiap poin agar Anda merasa aman dan nyaman bekerja sama dengan kami.</p>
              <a 
                href="https://wa.me/6281383521750?text=Halo%20WUUS%2C%20saya%20ingin%20bertanya%20mengenai%20Syarat%20dan%20Ketentuan." 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary-navy text-white px-8 py-4 rounded-xl font-bold hover:bg-accent-orange transition-all shadow-lg hover:shadow-accent-orange/20"
              >
                Hubungi Bantuan Hukum
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}
