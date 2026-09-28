"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const timelineTabs = [
  { id: "web", label: "Website Bisnis" },
  { id: "toko", label: "Toko Online" },
  { id: "booking", label: "Sistem Booking" },
  { id: "ai", label: "Asisten AI 24 Jam" },
];

export function Workflow() {
  const [activeTab, setActiveTab] = useState("web");

  return (
    <section id="workflow" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
            ALUR KERJA CEPAT & TRANSPARAN
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
              className={`px-4 py-2 rounded-md text-xs font-bold transition-colors ${
                activeTab === tab.id
                  ? "bg-[#1C2733] text-white"
                  : "bg-slate-100 text-slate-600 hover:text-[#1C2733]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Horizontal 3-Step Timeline */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-[#1C2733] font-bold text-xs flex items-center justify-center mb-3">
                1
              </div>
              <h4 className="text-base font-extrabold text-[#1C2733] mb-2">Hari 1</h4>
              <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs font-medium text-slate-600 leading-relaxed min-h-[88px] flex items-center justify-center">
                Konsultasi, audit kebutuhan, penentuan target pasar, dan rancangan konsep website Anda.
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-[#1C2733] font-bold text-xs flex items-center justify-center mb-3">
                2
              </div>
              <h4 className="text-base font-extrabold text-[#1C2733] mb-2">Hari 3-5</h4>
              <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs font-medium text-slate-600 leading-relaxed min-h-[88px] flex items-center justify-center">
                Live staging link aktif. Anda uji coba langsung di handphone sebelum pelunasan final.
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-[#1C2733] font-bold text-xs flex items-center justify-center mb-3">
                3
              </div>
              <h4 className="text-base font-extrabold text-[#1C2733] mb-2">Hari 7</h4>
              <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs font-medium text-slate-600 leading-relaxed min-h-[88px] flex items-center justify-center">
                Go-Live! Domain terhubung, sistem pembayaran aktif, langsung siap mendatangkan omset.
              </div>
            </div>

          </div>
        </div>

        {/* Solid Dark Card: One Modern Experience */}
        <div className="rounded-xl bg-[#1C2733] text-white p-7 sm:p-10 md:p-12">
          {/* Headline */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-8 max-w-2xl leading-snug">
            Satu standar modern untuk ekosistem bisnis Anda
          </h3>

          {/* 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-700 mb-8">
            
            {/* Col 1 */}
            <div className="flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white mb-2">
                  <span className="text-[#F59E0B]">Multi-Pembayaran</span> Otomatis
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  Terima QRIS, transfer bank nasional, dan kartu kredit secara instan langsung ke kas rekening Anda tanpa ribet.
                </p>
              </div>
              <Link
                href="/inquiries"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#F59E0B] transition-colors"
              >
                <span>Pelajari sistem pembayaran</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white mb-2">
                  <span className="text-[#F59E0B]">Asisten AI Siaga</span> 24 Jam
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  Menjawab pertanyaan calon pembeli, menjelaskan produk, dan mengarahkan kontak langsung ke WhatsApp Anda.
                </p>
              </div>
              <Link
                href="/inquiries"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#F59E0B] transition-colors"
              >
                <span>Konsultasi fitur AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white mb-2">
                  <span className="text-[#F59E0B]">Garansi 50/50</span> Staging Tanpa Risiko
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
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

          {/* Bottom Status Snapshot inside Dark Card */}
          <div className="rounded-lg bg-[#233746] border border-slate-700 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs sm:text-sm font-semibold text-slate-200">
                Infrastruktur berstandar enterprise dengan kecepatan akses instan di seluruh Indonesia
              </span>
            </div>

            <div className="flex items-center gap-6 text-xs font-mono text-slate-400">
              <span>Kecepatan: <strong className="text-emerald-400">0.6 Detik</strong></span>
              <span>Uptime: <strong className="text-emerald-400">99.99%</strong></span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
