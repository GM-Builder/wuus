"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const servicesList = [
  {
    title: "Website Profil & Portofolio Bisnis",
    description: "Tampil meyakinkan di hadapan klien, calon mitra, dan investor dengan desain eksklusif yang membedakan Anda dari kompetitor.",
    mockup: (
      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-2.5">
        <div className="flex items-center justify-between p-2 rounded-md bg-white border border-slate-200">
          <span className="text-xs font-semibold text-slate-600">Skor Kepercayaan Klien</span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Tinggi & Kredibel</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-md bg-white border border-slate-200">
          <span className="text-xs font-semibold text-slate-600">Kecepatan Buka di HP</span>
          <span className="text-xs font-bold text-[#1C2733] bg-slate-100 px-2 py-0.5 rounded">0.6 Detik (Ringan)</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-md bg-white border border-slate-200">
          <span className="text-xs font-semibold text-slate-600">Keamanan Enkripsi SSL</span>
          <span className="text-xs font-bold text-emerald-700">Aktif & Terlindungi</span>
        </div>
      </div>
    ),
    link: "/inquiries",
  },
  {
    title: "Toko Online & Katalog Produk",
    description: "Jualan mandiri secara online tanpa terpotong komisi tinggi marketplace. Pelanggan belanja praktis langsung di website Anda.",
    mockup: (
      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
          <span className="font-semibold text-slate-500">Omset Penjualan:</span>
          <span className="font-black text-[#1C2733] text-sm">Rp 12.450.000</span>
        </div>
        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
          <span className="font-semibold text-slate-500">Komisi Pihak Ketiga:</span>
          <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">Rp 0 (100% Milik Anda)</span>
        </div>
        <div className="w-full py-2 rounded-md bg-[#1C2733] text-white text-center text-xs font-bold mt-1">
          Pesanan Otomatis Masuk ke Admin
        </div>
      </div>
    ),
    link: "/inquiries",
  },
  {
    title: "Sistem Booking & Reservasi Langsung",
    description: "Solusi mandiri untuk villa, boutique hotel, klinik, dan studio. Tamu memesan langsung tanpa potongan komisi agen perantara.",
    mockup: (
      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
          <span className="font-semibold text-slate-500">Reservasi Masuk:</span>
          <span className="font-black text-[#1C2733] text-sm">Suite 2 Malam</span>
        </div>
        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
          <span className="font-semibold text-slate-500">Status DP:</span>
          <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">Terkonfirmasi Otomatis</span>
        </div>
        <div className="flex items-center justify-between text-xs pt-1 text-slate-500 font-medium">
          <span>Notifikasi:</span>
          <span className="text-emerald-800 font-bold">Terkirim ke WhatsApp Tamu & Host</span>
        </div>
      </div>
    ),
    link: "/hospitality",
  },
  {
    title: "Sistem Pembayaran Otomatis",
    description: "Terima pembayaran QRIS semua e-wallet, Virtual Account seluruh bank nasional, hingga kartu kredit langsung ke rekening Anda.",
    mockup: (
      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
        <div className="grid grid-cols-3 gap-1.5 text-center">
          <div className="p-2 rounded-md bg-white border border-slate-200 text-[11px] font-bold text-slate-800">QRIS</div>
          <div className="p-2 rounded-md bg-white border border-slate-200 text-[11px] font-bold text-slate-800">VA Bank</div>
          <div className="p-2 rounded-md bg-white border border-slate-200 text-[11px] font-bold text-slate-800">Kartu Kredit</div>
        </div>
        <div className="p-2.5 rounded-md bg-emerald-50 border border-emerald-200 text-left">
          <div className="text-[10px] font-bold text-emerald-800">SETTLEMENT OTOMATIS</div>
          <div className="text-xs font-bold text-emerald-950">Uang langsung masuk ke rekening bank Anda</div>
        </div>
        <div className="text-[11px] text-slate-500 font-semibold text-center">
          Tanpa cek mutasi manual • Bukti transfer otomatis
        </div>
      </div>
    ),
    link: "/inquiries",
  },
  {
    title: "Asisten AI Customer Service 24 Jam",
    description: "Asisten cerdas menjawab pertanyaan calon pembeli di website dan mengarahkan transaksi ke WhatsApp Anda secara otomatis.",
    mockup: (
      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-2.5">
        <div className="bg-white p-2.5 rounded-md border border-slate-200 text-left">
          <div className="text-[10px] font-bold text-slate-400 mb-0.5">Calon Pelanggan</div>
          <div className="text-xs text-slate-700 font-medium">"Halo, apakah paket ini sudah termasuk domain dan garansi?"</div>
        </div>
        <div className="bg-amber-50 p-2.5 rounded-md border border-amber-200 text-left">
          <div className="text-[10px] font-bold text-[#D97706] mb-0.5">Asisten AI Bisnis</div>
          <div className="text-xs text-[#1C2733] font-medium">"Sudah termasuk domain, hosting, dan garansi staging 50/50. Bisa langsung konsultasi gratis sekarang."</div>
        </div>
        <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500 font-semibold">
          <span>Respon: 1 Detik</span>
          <span className="text-emerald-700 font-bold">Aktif 24 Jam Penuh</span>
        </div>
      </div>
    ),
    link: "/inquiries",
  },
  {
    title: "Garansi Staging-First 50/50",
    description: "Tanpa risiko. DP 50% di awal. Uji coba website di ponsel Anda sendiri. Pelunasan sisa 50% hanya setelah Anda 100% puas.",
    mockup: (
      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-2.5">
        <div className="flex items-center gap-2.5 p-2 rounded-md bg-white border border-slate-200">
          <span className="w-5 h-5 rounded bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">
            1
          </span>
          <span className="text-xs font-semibold text-slate-700">DP 50% Mulai Pengerjaan</span>
        </div>
        <div className="flex items-center gap-2.5 p-2 rounded-md bg-amber-50 border border-amber-200">
          <span className="w-5 h-5 rounded bg-[#F59E0B] text-[#1C2733] flex items-center justify-center text-xs font-bold">
            2
          </span>
          <span className="text-xs font-bold text-[#1C2733]">Uji Coba di HP Anda Sebelum Rilis</span>
        </div>
        <div className="flex items-center gap-2.5 p-2 rounded-md bg-white border border-slate-200">
          <span className="w-5 h-5 rounded bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">
            3
          </span>
          <span className="text-xs font-semibold text-slate-600">Pelunasan Saat Anda 100% Puas</span>
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

        {/* 6 Clean Bento Cards in 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1C2733] tracking-tight mb-2 group-hover:text-[#F59E0B] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Realistic Software UI Mockup Box */}
              <div>
                <div className="mb-5">
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
        <div className="max-w-2xl mx-auto rounded-lg bg-slate-50 border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
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
