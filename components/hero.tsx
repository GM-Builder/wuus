"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, ArrowRight, Zap, Bot, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const businessNeeds = [
  { id: "corporate", label: "Web Profil Perusahaan & Bisnis" },
  { id: "store", label: "Toko Online / Katalog Siap Jual" },
  { id: "booking", label: "Sistem Reservasi & Booking Langsung" },
  { id: "payment", label: "Pembayaran Otomatis (QRIS & Bank)" },
  { id: "ai", label: "Asisten AI Respon Chat 24 Jam" },
  { id: "redesign", label: "Redesain Tampilan Lebih Mewah" },
];

const industries = [
  { name: "Hospitality & Villa" },
  { name: "Retail & Brand Fesyen" },
  { name: "Perusahaan & B2B Corporate" },
  { name: "Restoran & F&B Kuliner" },
  { name: "Klinik & Jasa Profesional" },
  { name: "Properti & Arsitektur" },
];

export function Hero() {
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(["corporate", "payment"]);

  const toggleNeed = (id: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-white pt-6 pb-16 md:pt-10 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Two-Box Split Hero (Deel-Inspired Quiet Luxury) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-16">
          
          {/* Left Box: Deep Abu Kebiruan (#1C2733) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-6 rounded-[32px] bg-[#1C2733] text-white p-7 sm:p-10 md:p-12 flex flex-col justify-between shadow-xl relative overflow-hidden"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold mb-6 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Studio Pembuatan Website Bisnis & Otomasi Digital</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.14] mb-6">
                Tingkatkan kelas bisnis Anda dengan website cepat &{" "}
                <span className="text-[#F59E0B]">tanpa ribet.</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base font-medium mb-6 leading-relaxed">
                Pilih kebutuhan utama yang ingin Anda wujudkan untuk website bisnis Anda:
              </p>

              {/* 2-Column Checklist Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {businessNeeds.map((item) => {
                  const isChecked = selectedNeeds.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleNeed(item.id)}
                      className={`text-left p-3.5 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${
                        isChecked
                          ? "bg-white/10 border-[#F59E0B] text-white"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                          isChecked
                            ? "bg-[#F59E0B] text-[#1C2733]"
                            : "border border-white/30 text-transparent"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold tracking-tight">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Button & Reviews */}
            <div>
              <Link
                href="/inquiries"
                className="w-full py-4 rounded-full bg-white hover:bg-[#F59E0B] text-[#1C2733] font-bold text-center text-sm sm:text-base tracking-tight transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Konsultasi Proyek Bisnis Sekarang</span>
                <ArrowRight className="w-4 h-4 text-[#1C2733] group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-300 mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-1 text-[#F59E0B]">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span>4.9/5 Rating dari 50+ Klien Bisnis & Brand di Seluruh Indonesia</span>
              </div>
            </div>
          </motion.div>

          {/* Right Box: Real Authentic Lifestyle & Indonesian Business Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-6 rounded-[32px] overflow-hidden relative min-h-[460px] lg:min-h-full border border-slate-200/90 shadow-xl bg-slate-100"
          >
            {/* Real Lifestyle Photo */}
            <Image
              src="/Hero1.png"
              alt="Pemilik Usaha Mengelola Penjualan Digital"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />

            {/* Subtle Gradient Shade for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Floating Card 1: Penjualan Masuk / Transaksi Sukses */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
              className="absolute top-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-100 max-w-[260px] sm:max-w-[290px] z-20"
            >
              <div className="flex items-center justify-between text-[11px] font-bold text-emerald-600 mb-1">
                <span>TRANSAKSI MASUK</span>
                <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">✓</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#1C2733] tracking-tight">
                Rp 4.850.000 <span className="text-xs font-bold text-emerald-600">Lunas</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">
                Langsung masuk kas rekening tanpa potongan komisi perantara
              </div>
            </motion.div>

            {/* Floating Badge 1: Speed */}
            <div className="absolute top-36 right-6 bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-2 shadow-lg border border-slate-100 text-xs font-bold text-[#1C2733] flex items-center gap-2 z-20">
              <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Akses Kilat: 0.6 Detik <span className="text-emerald-600 font-semibold">[VERIFIED]</span></span>
            </div>

            {/* Floating Badge 2: AI CS 24 Jam */}
            <div className="absolute bottom-28 left-6 bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-2 shadow-lg border border-slate-100 text-xs font-bold text-[#1C2733] flex items-center gap-2 z-20">
              <Bot className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Asisten AI Siaga <span className="text-emerald-600 font-semibold">[AKTIF 24/7]</span></span>
            </div>

            {/* Floating Card 2: Quote Testimoni Klien */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-slate-100 max-w-[270px] z-20"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-[#1C2733] text-white flex items-center justify-center text-xs font-bold">
                  W
                </span>
                <div>
                  <div className="text-xs font-bold text-[#1C2733]">Savoria Dining</div>
                  <div className="text-[10px] text-slate-400 font-medium">Restoran & Lounge</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 font-medium italic leading-relaxed">
                &ldquo;Pelanggan kami langsung percaya pesan lewat web karena tampilannya sangat elegan dan cepat.&rdquo;
              </p>
            </motion.div>

          </motion.div>

        </div>

        {/* Industry / Trust Sectors Row (No Tech Stack Spills!) */}
        <div className="pt-6 border-t border-slate-100 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
            Dipercaya Oleh Pemilik Bisnis & Pengusaha di Berbagai Sektor
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-70">
            {industries.map((ind) => (
              <span
                key={ind.name}
                className="text-xs sm:text-sm font-bold text-slate-700 tracking-tight px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/60"
              >
                {ind.name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}