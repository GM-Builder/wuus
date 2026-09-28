"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Bot, ShieldCheck, CreditCard, Sparkles, Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const timelineTabs = [
  { id: "web", label: "Website Peluncuran" },
  { id: "ai", label: "AI Concierge Otonom" },
  { id: "mayar", label: "Integrasi Pembayaran Mayar" },
  { id: "staging", label: "Garansi Staging 50/50" },
];

export function Workflow() {
  const [activeTab, setActiveTab] = useState("web");

  return (
    <section id="workflow" className="py-20 md:py-28 bg-white border-b border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header (Deel Reference Image 3 Style) */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
            KECEPATAN & EFISIENSI WUUS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C2733] tracking-tight">
            Selesaikan lebih banyak dalam waktu lebih singkat
          </h2>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {timelineTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-slate-100 text-[#1C2733] shadow-xs border border-slate-300/80"
                  : "bg-transparent text-slate-500 hover:text-[#1C2733]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Horizontal 3-Step Timeline with Connected Dotted Line */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative">
            {/* Dotted horizontal track */}
            <div className="hidden sm:block absolute top-2.5 left-[16%] right-[16%] h-0.5 border-t-2 border-dotted border-slate-300 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-5 h-5 rounded-full bg-slate-300 mb-3 border-2 border-white shadow-xs" />
                <h4 className="text-base font-extrabold text-[#1C2733] mb-3">Hari 1</h4>
                <div className="w-full bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-4 text-xs font-medium text-slate-600 leading-relaxed shadow-xs min-h-[88px] flex items-center justify-center">
                  Konsultasi, audit kebutuhan, target audiens, dan penetapan arsitektur web Anda.
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-5 h-5 rounded-full bg-[#F59E0B] mb-3 border-2 border-white shadow-xs" />
                <h4 className="text-base font-extrabold text-[#1C2733] mb-3">Hari 3–5</h4>
                <div className="w-full bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-4 text-xs font-medium text-slate-600 leading-relaxed shadow-xs min-h-[88px] flex items-center justify-center">
                  Live staging link aktif. Anda uji coba langsung di handphone sebelum pelunasan final.
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-5 h-5 rounded-full bg-slate-300 mb-3 border-2 border-white shadow-xs" />
                <h4 className="text-base font-extrabold text-[#1C2733] mb-3">Hari 7</h4>
                <div className="w-full bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-4 text-xs font-medium text-slate-600 leading-relaxed shadow-xs min-h-[88px] flex items-center justify-center">
                  Go-Live! Domain terhubung, sistem pembayaran aktif, langsung siap hasilkan penjualan.
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Massive Dark Card: One Modern Experience (Exact Deel Image 3) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[32px] bg-[#1C2733] text-white p-8 sm:p-12 md:p-14 shadow-2xl relative overflow-hidden"
        >
          {/* Headline */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-10 max-w-2xl leading-snug">
            Satu standar modern untuk ekosistem bisnis Anda
          </h3>

          {/* 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-white/10 mb-10">
            
            {/* Col 1 */}
            <div className="flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white mb-2">
                  <span className="text-[#F59E0B]">150+ Mata Uang</span> & Pembayaran Instan
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Terima QRIS, transfer bank lokal, dan kartu kredit internasional via Mayar.id tanpa hambatan birokrasi berbelit.
                </p>
              </div>
              <Link
                href="/inquiries"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#F59E0B] transition-colors"
              >
                <span>Pelajari integrasi Mayar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white mb-2">
                  <span className="text-[#F59E0B]">Actionable AI</span> Concierge 24/7
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Menjawab tamu dalam 20+ bahasa, menjawab pertanyaan umum hotel/toko, dan mengarahkan transaksi ke WhatsApp otomatis.
                </p>
              </div>
              <Link
                href="/hospitality#ai-concierge"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#F59E0B] transition-colors"
              >
                <span>Uji coba demo AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white mb-2">
                  <span className="text-[#F59E0B]">Garansi 50/50</span> Staging Tanpa Risiko
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Uji coba website Anda di smartphone pribadi. Sisa pembayaran 50% hanya ditagihkan setelah Anda benar-benar puas.
                </p>
              </div>
              <Link
                href="/inquiries"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#F59E0B] transition-colors"
              >
                <span>Konsultasi Proyek</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* Bottom Live Workspace Snapshot inside Dark Card */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-slate-200">
                Infrastruktur Next.js 16 + Global Edge CDN aktif di seluruh dunia
              </span>
            </div>

            <div className="flex items-center gap-6 text-xs font-mono text-slate-400">
              <span>Latency: <strong className="text-emerald-400">24ms</strong></span>
              <span>Uptime: <strong className="text-emerald-400">99.99%</strong></span>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
