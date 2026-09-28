"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, ArrowRight, Zap, Bot, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const businessNeeds = [
  { id: "corporate", label: "Web Profil Perusahaan & Bisnis" },
  { id: "store", label: "Toko Online & Katalog Siap Jual" },
  { id: "booking", label: "Sistem Reservasi & Booking Langsung" },
  { id: "payment", label: "Pembayaran Otomatis QRIS & Bank" },
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
    <section className="pt-10 pb-16 md:pt-14 md:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Two-Box Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-14">
          
          {/* Left Box: Solid Deep Abu Kebiruan (#1C2733) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-6 rounded-xl bg-[#1C2733] text-white p-7 sm:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#233746] text-slate-200 text-xs font-semibold mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Studio Pembuatan Website Bisnis & Otomasi Digital</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5">
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
                      className={`text-left p-3.5 rounded-lg border transition-colors flex items-center gap-3 cursor-pointer ${
                        isChecked
                          ? "bg-[#233746] border-[#F59E0B] text-white"
                          : "bg-[#233746] border-slate-700 text-slate-300 hover:border-slate-600"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                          isChecked
                            ? "bg-[#F59E0B] text-[#1C2733]"
                            : "border border-slate-500 text-transparent"
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
                className="w-full py-4 rounded-lg bg-white hover:bg-[#F59E0B] text-[#1C2733] font-bold text-center text-sm sm:text-base tracking-tight transition-colors flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Konsultasi Proyek Bisnis Sekarang</span>
                <ArrowRight className="w-4 h-4 text-[#1C2733] group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-300 mt-6 pt-5 border-t border-slate-700">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                  <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                  <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                  <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                  <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                </div>
                <span>4.9/5 Rating dari 50+ Klien Bisnis & Brand di Seluruh Indonesia</span>
              </div>
            </div>
          </motion.div>

          {/* Right Box: Clean Image Container without Low-Opacity Gradients or Shadows */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-6 rounded-xl overflow-hidden relative min-h-[460px] lg:min-h-full border border-slate-200 bg-slate-100"
          >
            <Image
              src="/Hero1.png"
              alt="Pemilik Usaha Mengelola Penjualan Digital"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />

            {/* Floating Card 1: Penjualan Masuk (Flat, Solid, No Shadows) */}
            <div className="absolute top-6 left-6 bg-white rounded-lg p-4 border border-slate-200 max-w-[260px] sm:max-w-[280px] z-10">
              <div className="flex items-center justify-between text-[11px] font-bold text-emerald-700 mb-1">
                <span>TRANSAKSI MASUK</span>
                <span className="w-4 h-4 rounded bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#1C2733] tracking-tight">
                Rp 4.850.000 <span className="text-xs font-bold text-emerald-600">Lunas</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">
                Langsung masuk kas rekening tanpa potongan komisi perantara
              </div>
            </div>

            {/* Floating Badge 1: Speed */}
            <div className="absolute top-36 right-6 bg-white rounded-md px-3.5 py-2 border border-slate-200 text-xs font-bold text-[#1C2733] flex items-center gap-2 z-10">
              <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Akses Kilat: 0.6 Detik [TERVERIFIKASI]</span>
            </div>

            {/* Floating Badge 2: AI CS 24 Jam */}
            <div className="absolute bottom-28 left-6 bg-white rounded-md px-3.5 py-2 border border-slate-200 text-xs font-bold text-[#1C2733] flex items-center gap-2 z-10">
              <Bot className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Asisten AI Siaga [AKTIF 24/7]</span>
            </div>

            {/* Floating Card 2: Quote Testimoni Klien */}
            <div className="absolute bottom-6 right-6 bg-white rounded-lg p-4 border border-slate-200 max-w-[270px] z-10">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded bg-[#1C2733] text-white flex items-center justify-center text-xs font-bold">
                  W
                </span>
                <div>
                  <div className="text-xs font-bold text-[#1C2733]">Savoria Dining</div>
                  <div className="text-[10px] text-slate-500 font-medium">Restoran & Lounge</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 font-medium italic leading-relaxed">
                "Pelanggan kami langsung percaya pesan lewat web karena tampilannya sangat rapi dan cepat."
              </p>
            </div>

          </motion.div>

        </div>

        {/* Industry / Trust Sectors Row */}
        <div className="pt-6 border-t border-slate-200 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-5">
            Dipercaya Oleh Pemilik Bisnis & Pengusaha di Berbagai Sektor
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {industries.map((ind) => (
              <span
                key={ind.name}
                className="text-xs sm:text-sm font-semibold text-slate-700 tracking-tight px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200"
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