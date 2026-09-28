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
    <main className="flex min-h-screen flex-col w-full bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="rounded-xl bg-[#1C2733] text-white p-8 md:p-14 text-center">
            <span className="text-[#F59E0B] text-xs font-bold tracking-widest uppercase mb-3 block">
              Legalitas & Transparansi
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight">
              Syarat & <span className="text-[#F59E0B]">Ketentuan</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Kesepakatan ini dibuat untuk melindungi hak dan kewajiban antara WebUntukUsaha (WUUS) dan Anda sebagai Klien demi kenyamanan bersama.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="bg-white rounded-xl border border-slate-200 p-7 md:p-10">
            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm font-medium mb-10 border-b border-slate-100 pb-5">
              <Calendar className="w-4 h-4" />
              <span>Terakhir diperbarui: {lastUpdated}</span>
            </div>

            <div className="space-y-10">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="group"
                >
                  <div className="flex items-start gap-5">
                    <div className="mt-1 w-10 h-10 shrink-0 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-center">
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-[#1C2733] mb-2 group-hover:text-[#F59E0B] transition-colors">
                        {section.title}
                      </h2>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 p-6 sm:p-8 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <h3 className="text-lg font-bold text-[#1C2733] mb-2">Punya Pertanyaan Mengenai S&K?</h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-lg mx-auto">
                Tim kami siap membantu menjelaskan setiap poin agar Anda merasa aman dan nyaman bekerja sama dengan kami.
              </p>
              <a 
                href="https://wa.me/6281383521750?text=Halo%20WUUS%2C%20saya%20ingin%20bertanya%20mengenai%20Syarat%20dan%20Ketentuan." 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white px-7 py-3 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Hubungi Konsultasi WhatsApp
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
