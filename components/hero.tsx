"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, ArrowRight, ShieldCheck, Zap, Globe, CreditCard, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const needs = [
  { id: "direct", label: "Direct Booking (0% Fee)" },
  { id: "company", label: "Web Profil & Toko Online" },
  { id: "concierge", label: "24/7 AI Guest Concierge" },
  { id: "mayar", label: "Integrasi Pembayaran Mayar" },
  { id: "speed", label: "Optimasi Kecepatan Edge" },
  { id: "redesign", label: "Redesain Tampilan Mewah" },
];

const partners = [
  { name: "Next.js 16" },
  { name: "Vercel Edge" },
  { name: "Supabase" },
  { name: "Mayar.id" },
  { name: "Cloudflare" },
  { name: "Tailwind CSS" },
  { name: "Google Cloud" },
];

export function Hero() {
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(["direct", "concierge"]);

  const toggleNeed = (id: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-white pt-6 pb-16 md:pt-10 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Two-Box Split Hero (Deel-Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-16">
          
          {/* Left Box: Deep Abu Kebiruan (#1C2733) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-6 rounded-[32px] bg-[#1C2733] text-white p-7 sm:p-10 md:p-12 flex flex-col justify-between shadow-xl relative overflow-hidden"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-6">
                Rancang, bangun, & <br />
                otomasi website bisnis Anda, <br />
                <span className="text-[#F59E0B]">tanpa ribet.</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base font-medium mb-6">
                Apa kebutuhan utama website bisnis Anda?
              </p>

              {/* 2-Column Checklist Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {needs.map((item) => {
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
                className="w-full py-4 rounded-full bg-white hover:bg-[#F59E0B] text-[#1C2733] font-bold text-center text-sm sm:text-base tracking-tight transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Konsultasi Proyek Sekarang</span>
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
                <span>4.9/5 Rating dari 50+ Klien Bisnis & Boutique Stays</span>
              </div>
            </div>
          </motion.div>

          {/* Right Box: Authentic Lifestyle Photo with Floating Deel-Style UI Cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-6 rounded-[32px] overflow-hidden relative min-h-[460px] lg:min-h-full border border-slate-200/90 shadow-xl bg-slate-100"
          >
            {/* Real Lifestyle Photo */}
            <Image
              src="/Hero2.png"
              alt="Business Owner Workspace"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />

            {/* Subtle Gradient Shade for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

            {/* Floating Card 1: Top Direct Booking Complete */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
              className="absolute top-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-100 max-w-[250px] sm:max-w-[280px] z-20"
            >
              <div className="flex items-center justify-between text-[11px] font-bold text-emerald-600 mb-1">
                <span>DIRECT ENGINE ACTIVE</span>
                <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">✓</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#1C2733] tracking-tight">
                €1,290 <span className="text-xs font-bold text-slate-400">/ 0% Fee</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                Hemat komisi 18% dari Booking.com & Airbnb
              </div>
            </motion.div>

            {/* Floating Badge 1: Speed */}
            <div className="absolute top-36 right-6 bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-2 shadow-lg border border-slate-100 text-xs font-bold text-[#1C2733] flex items-center gap-2 z-20">
              <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Speed: 720ms <span className="text-emerald-600 font-semibold">[VERIFIED]</span></span>
            </div>

            {/* Floating Badge 2: AI Concierge */}
            <div className="absolute bottom-28 left-6 bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-2 shadow-lg border border-slate-100 text-xs font-bold text-[#1C2733] flex items-center gap-2 z-20">
              <Globe className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>20+ Bahasa Tamu <span className="text-emerald-600 font-semibold">[24/7 AKTIF]</span></span>
            </div>

            {/* Floating Card 2: Bottom Right Testimonial Quote */}
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
                  <div className="text-xs font-bold text-[#1C2733]">Muslibegovic House</div>
                  <div className="text-[10px] text-slate-400">Boutique Stay & Heritage</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 font-medium italic leading-relaxed">
                &ldquo;Website kami langsung berstandar global dan direct booking masuk tanpa potongan komisi.&rdquo;
              </p>
            </motion.div>

          </motion.div>

        </div>

        {/* Monochrome Logos Row (Exact Deel Image 1) */}
        <div className="pt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
            Dipercaya Oleh Puluhan Bisnis & Didukung Infrastruktur Kelas Dunia
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            {partners.map((partner) => (
              <span
                key={partner.name}
                className="text-sm md:text-base font-bold text-slate-600 tracking-tight"
              >
                {partner.name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}