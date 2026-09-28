"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap, ShieldCheck, Globe, CreditCard, Sparkles, MessageSquare, Smartphone, Server } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const servicesList = [
  {
    title: "Direct Booking Engine",
    description: "Sistem pemesanan mandiri tanpa potongan komisi OTA 18%–25%. Uang masuk penuh ke kas Anda.",
    mockup: (
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200/70">
          <span className="font-semibold text-slate-500">Total Reservasi:</span>
          <span className="font-black text-[#1C2733] text-sm">€1,290.00</span>
        </div>
        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200/70">
          <span className="font-semibold text-slate-500">Komisi OTA:</span>
          <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">€0 (Hemat 100%)</span>
        </div>
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-slate-500 font-medium">Tamu Terkonfirmasi:</span>
          <div className="flex -space-x-1.5 overflow-hidden">
            <span className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-[#1C2733] text-white text-[9px] font-bold flex items-center justify-center">JD</span>
            <span className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-[#F59E0B] text-[#1C2733] text-[9px] font-bold flex items-center justify-center">MK</span>
            <span className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-slate-300 text-slate-700 text-[9px] font-bold flex items-center justify-center">+2</span>
          </div>
        </div>
        <div className="w-full py-2 rounded-lg bg-[#1C2733] text-white text-center text-xs font-bold mt-2 shadow-xs">
          Konfirmasi Instan Terkirim
        </div>
      </div>
    ),
    link: "/hospitality",
  },
  {
    title: "24/7 AI Guest Concierge",
    description: "Asisten cerdas multibahasa menjawab pertanyaan tamu dalam 1.2 detik, bersumber langsung dari SOP Anda.",
    mockup: (
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/90 shadow-xs space-y-2.5">
        <div className="bg-white p-2.5 rounded-lg border border-slate-200/70 text-left">
          <div className="text-[10px] font-bold text-slate-400 mb-0.5">Tamu Jerman 🇩🇪</div>
          <div className="text-xs text-slate-700 font-medium">"Ist spätes Einchecken nach 22:00 möglich?"</div>
        </div>
        <div className="bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/80 text-left">
          <div className="text-[10px] font-bold text-[#D97706] mb-0.5">WUUS AI Host 🤖</div>
          <div className="text-xs text-[#1C2733] font-medium">"Ja, Schlüsselcode #4092 siap digunakan 24 jam. Parkir gratis."</div>
        </div>
        <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400 font-semibold">
          <span>Kecepatan Respon: 1.2s</span>
          <span className="text-emerald-600 font-bold">✓ 99.4% Akurat</span>
        </div>
      </div>
    ),
    link: "/hospitality#ai-concierge",
  },
  {
    title: "Web Perusahaan & Toko Modern",
    description: "Arsitektur Next.js 16 berkecepatan tinggi, bebas lag WordPress, dan didesain khusus konversi penjualan.",
    mockup: (
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/90 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200/70">
          <span className="text-xs font-semibold text-slate-600">Lighthouse Performance</span>
          <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">99 / 100</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200/70">
          <span className="text-xs font-semibold text-slate-600">Global Edge CDN</span>
          <span className="text-xs font-bold text-[#1C2733] bg-slate-100 px-2 py-0.5 rounded">Sub-800ms</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200/70">
          <span className="text-xs font-semibold text-slate-600">Enterprise SSL</span>
          <span className="text-xs font-bold text-emerald-600">Terenkripsi 256-bit</span>
        </div>
      </div>
    ),
    link: "/inquiries",
  },
  {
    title: "Sistem Pembayaran Mayar",
    description: "Terima pembayaran QRIS, Virtual Account, & Kartu Kredit internasional langsung tanpa birokrasi berbelit.",
    mockup: (
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/90 shadow-xs space-y-3">
        <div className="grid grid-cols-3 gap-1.5 text-center">
          <div className="p-2 rounded-lg bg-white border border-slate-200/70 text-[11px] font-bold text-slate-700">QRIS</div>
          <div className="p-2 rounded-lg bg-white border border-slate-200/70 text-[11px] font-bold text-slate-700">Visa / MC</div>
          <div className="p-2 rounded-lg bg-white border border-slate-200/70 text-[11px] font-bold text-slate-700">VA Bank</div>
        </div>
        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-left">
          <div className="text-[10px] font-bold text-emerald-700">SETTLEMENT OTOMATIS</div>
          <div className="text-xs font-bold text-emerald-900">Dana langsung diteruskan ke rekening Anda</div>
        </div>
        <div className="text-[11px] text-slate-400 font-semibold text-center">
          Transparansi penuh • Nol biaya tersembunyi
        </div>
      </div>
    ),
    link: "/inquiries",
  },
  {
    title: "Garansi Staging-First 50/50",
    description: "DP 50% di awal. Uji coba website di HP Anda sendiri. Bayar sisa 50% hanya setelah Anda 100% puas.",
    mockup: (
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/90 shadow-xs space-y-2.5">
        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-slate-200/70">
          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">✓</span>
          <span className="text-xs font-semibold text-slate-700">1. DP 50% Mulai Pengerjaan</span>
        </div>
        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-amber-50 border border-amber-200/80">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse ml-1.5 mr-1" />
          <span className="text-xs font-bold text-[#1C2733]">2. Uji Staging Privat di HP Anda</span>
        </div>
        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-slate-200/70">
          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-bold">3</span>
          <span className="text-xs font-semibold text-slate-500">3. Pelunasan Saat 100% Puas</span>
        </div>
      </div>
    ),
    link: "/inquiries",
  },
  {
    title: "Managed Cloud & Serverless",
    description: "Infrastruktur cloud berstandar korporat tanpa pusing sewa server, cPanel, atau update plugin yang rusak.",
    mockup: (
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-500">Cakupan CDN:</span>
          <span className="font-bold text-[#1C2733]">300+ Kota Global</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-500">Status Server:</span>
          <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">99.99% UPTIME</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-500">Auto-Scaling:</span>
          <span className="font-bold text-[#1C2733]">Aktif Otomatis</span>
        </div>
        <div className="text-[11px] text-slate-400 font-semibold text-center pt-1 border-t border-slate-200/70">
          Monitoring 24/7 tanpa perlu tim IT internal
        </div>
      </div>
    ),
    link: "/inquiries",
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-[#F8F9FA] border-b border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header (Deel Reference Image 2 Style) */}
        <div className="mb-14 md:mb-18">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">
            APA YANG WUUS KERJAKAN
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C2733] tracking-tight leading-tight max-w-3xl">
            Platform digital terlengkap untuk pertumbuhan bisnis Anda.
          </h2>
        </div>

        {/* 6 Clean White Bento Cards in 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200/90 p-7 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-default"
            >
              <div>
                <h3 className="text-xl font-bold text-[#1C2733] tracking-tight mb-2 group-hover:text-[#F59E0B] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
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

        {/* Bottom Floating Pill Banner (Exact Deel Image 2) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto rounded-full bg-white border border-slate-200/90 shadow-md p-2 sm:p-2.5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 pl-3">
            <div className="w-8 h-8 rounded-full bg-[#1C2733] text-white flex items-center justify-center text-xs font-bold">
              W
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#1C2733]">
              Konsultasikan kebutuhan spesifik website bisnis Anda
            </span>
          </div>

          <a
            href="https://wa.me/6281383521750?text=Halo%20WUUS,%20saya%20ingin%20konsultasi%20website%20bisnis%20saya"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white text-xs font-bold transition-all text-center flex-shrink-0"
          >
            Hubungi Tim via WhatsApp
          </a>
        </motion.div>

      </div>
    </section>
  );
}
