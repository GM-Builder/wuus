"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const servicesList = [
  {
    title: "Website Profil & Portofolio Bisnis",
    description: "Tampil meyakinkan di hadapan klien, calon mitra, dan investor dengan desain eksklusif yang membedakan Anda dari kompetitor.",
    mockup: (
      <div className="bg-white rounded-xl p-5 space-y-3 min-h-[195px] flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Waktu Muat Halaman</span>
            <span className="font-bold text-[#1C2733] font-mono">0.6 Detik</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Skor Kecepatan Mobile</span>
            <span className="font-bold text-[#1C2733] font-mono">100 / 100</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Keamanan Enkripsi SSL</span>
            <span className="font-bold text-[#1C2733]">Aktif & Terlindungi</span>
          </div>
        </div>
        <div className="w-full py-2.5 rounded-lg bg-[#1C2733] text-white text-center text-xs font-bold">
          Uji Coba Staging Langsung
        </div>
      </div>
    ),
    link: "/inquiries",
  },
  {
    title: "Toko Online & Katalog Produk",
    description: "Jualan mandiri secara online tanpa terpotong komisi tinggi marketplace. Pelanggan belanja praktis langsung di website Anda.",
    mockup: (
      <div className="bg-white rounded-xl p-5 space-y-3 min-h-[195px] flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Penjualan Bulan Ini</span>
            <span className="font-bold text-[#1C2733] text-sm font-mono">Rp 12.450.000</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Komisi Pihak Ketiga</span>
            <span className="font-bold text-[#1C2733]">Rp 0 (100% Milik Anda)</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Pesanan Masuk</span>
            <span className="font-bold text-[#1C2733]">Otomatis ke WhatsApp</span>
          </div>
        </div>
        <div className="w-full py-2.5 rounded-lg bg-[#1C2733] text-white text-center text-xs font-bold">
          Pesanan Masuk Otomatis
        </div>
      </div>
    ),
    link: "/inquiries",
  },
  {
    title: "Sistem Booking & Reservasi Langsung",
    description: "Solusi mandiri untuk villa, boutique hotel, klinik, dan studio. Tamu memesan langsung tanpa potongan komisi agen perantara.",
    mockup: (
      <div className="bg-white rounded-xl p-5 space-y-3 min-h-[195px] flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Reservasi Tamu</span>
            <span className="font-bold text-[#1C2733]">Deluxe Suite (2 Malam)</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Status Pembayaran</span>
            <span className="font-bold text-[#1C2733]">Terkonfirmasi Otomatis</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Potongan Komisi OTA</span>
            <span className="font-bold text-[#1C2733]">0% (Tanpa Potongan)</span>
          </div>
        </div>
        <div className="w-full py-2.5 rounded-lg bg-[#1C2733] text-white text-center text-xs font-bold">
          Konfirmasi Terkirim ke Tamu
        </div>
      </div>
    ),
    link: "/hospitality",
  },
  {
    title: "Sistem Pembayaran Otomatis",
    description: "Terima pembayaran QRIS semua e-wallet, Virtual Account seluruh bank nasional, hingga kartu kredit langsung ke rekening Anda.",
    mockup: (
      <div className="bg-white rounded-xl p-5 space-y-3 min-h-[195px] flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Kanal Pembayaran</span>
            <span className="font-bold text-[#1C2733]">QRIS, VA Bank & Kartu</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Jadwal Pencairan</span>
            <span className="font-bold text-[#1C2733]">Real-Time Langsung</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Rekening Tujuan</span>
            <span className="font-bold text-[#1C2733]">Bank Bisnis Anda</span>
          </div>
        </div>
        <div className="w-full py-2.5 rounded-lg bg-[#1C2733] text-white text-center text-xs font-bold">
          Settlement Kas Otomatis
        </div>
      </div>
    ),
    link: "/inquiries",
  },
  {
    title: "Asisten AI Customer Service 24 Jam",
    description: "Asisten cerdas menjawab pertanyaan calon pembeli di website dan mengarahkan transaksi ke WhatsApp Anda secara otomatis.",
    mockup: (
      <div className="bg-white rounded-xl p-5 space-y-3 min-h-[195px] flex flex-col justify-between text-left">
        <div className="space-y-3">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 mb-0.5">Pertanyaan Calon Pelanggan</div>
            <div className="text-xs text-[#1C2733] font-medium">&ldquo;Apakah website ini sudah termasuk sistem pembayaran?&rdquo;</div>
          </div>
          <div className="pt-2 border-t border-slate-100">
            <div className="text-[11px] font-semibold text-slate-400 mb-0.5">Respon Asisten AI (0.8 Detik)</div>
            <div className="text-xs text-[#1C2733] font-medium">&ldquo;Sudah termasuk QRIS, bank transfer, dan terhubung langsung ke WhatsApp Anda.&rdquo;</div>
          </div>
        </div>
        <div className="w-full py-2.5 rounded-lg bg-[#1C2733] text-white text-center text-xs font-bold">
          Respon 24 Jam Tanpa Libur
        </div>
      </div>
    ),
    link: "/inquiries",
  },
  {
    title: "Garansi Staging-First 50/50",
    description: "Tanpa risiko. DP 50% di awal. Uji coba website di ponsel Anda sendiri. Pelunasan sisa 50% hanya setelah Anda 100% puas.",
    mockup: (
      <div className="bg-white rounded-xl p-5 space-y-3 min-h-[195px] flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Tahap 1</span>
            <span className="font-bold text-[#1C2733]">DP 50% Mulai Pengerjaan</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Tahap 2</span>
            <span className="font-bold text-[#1C2733]">Uji Coba di HP Anda</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Tahap 3</span>
            <span className="font-bold text-[#1C2733]">Pelunasan Saat Anda 100% Puas</span>
          </div>
        </div>
        <div className="w-full py-2.5 rounded-lg bg-[#1C2733] text-white text-center text-xs font-bold">
          Garansi Kepuasan 100%
        </div>
      </div>
    ),
    link: "/inquiries",
  },
];

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
            LAYANAN UNGGULAN WUUS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C2733] tracking-tight leading-tight max-w-3xl">
            Solusi digital lengkap untuk meningkatkan omset & kredibilitas bisnis Anda.
          </h2>
        </div>

        {/* 6 Clean Bento Cards in 3x2 Grid (Deel-Inspired Flat Aesthetic, No Border-on-Border Clutter) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-[#F8F9FA] rounded-2xl p-7 sm:p-8 flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-xl font-bold text-[#1C2733] tracking-tight mb-2 group-hover:text-[#F59E0B] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 font-normal leading-relaxed mb-8">
                  {service.description}
                </p>
              </div>

              {/* Crisp White Floating Panel without Layered Borders */}
              <div>
                <div className="mb-6">
                  {service.mockup}
                </div>

                <Link
                  href={service.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1C2733] hover:text-[#F59E0B] transition-colors"
                >
                  <span>Pelajari lebih lanjut</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Contact Box */}
        <div className="max-w-2xl mx-auto rounded-2xl bg-[#F8F9FA] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#1C2733] text-white flex items-center justify-center text-xs font-bold">
              W
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#1C2733]">
              Ingin diskusi langsung tentang kebutuhan website bisnis Anda?
            </span>
          </div>

          <a
            href="https://wa.me/6281383521750?text=Halo%20WUUS,%20saya%20ingin%20konsultasi%20website%20bisnis%20saya"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white text-xs font-bold transition-colors text-center shrink-0 cursor-pointer"
          >
            Hubungi Tim via WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
