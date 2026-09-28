"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const stats = [
  { value: "50+", label: "Proyek Sukses Dikerjakan" },
  { value: "100%", label: "Margin Milik Pemilik Bisnis" },
  { value: "< 800ms", label: "Kecepatan Akses Global" },
  { value: "98%", label: "Kepuasan Klien & Retensi" },
];

const reviews = [
  {
    name: "Faruk D.",
    role: "Heritage Boutique Stay Host",
    stars: 5,
    text: "Solusi direct booking terbaik. Kami menghemat komisi 18% dari Booking.com setiap pekan. Tamu reservasi langsung lewat sistem yang cepat dan profesional.",
  },
  {
    name: "Elena R.",
    role: "General Manager Hotel",
    stars: 5,
    text: "Sangat membantu operasional hotel. AI Concierge melayani tamu berbahasa Jerman dan Italia tengah malam secara akurat tanpa staf kami harus terjaga.",
  },
  {
    name: "Hendra K.",
    role: "Founder Brand & Retail",
    stars: 5,
    text: "Integrasi checkout Mayar.id sangat mulus. Klien bayar lewat QRIS atau kartu kredit langsung masuk ke kas bank tanpa ada delay atau kendala teknis.",
  },
  {
    name: "Sarah M.",
    role: "Villa Host & Owner",
    stars: 5,
    text: "Garansi staging 50/50 memberi rasa aman maksimal. Kami menguji website langsung di HP kami sendiri sebelum pelunasan final. Sangat recommended.",
  },
];

export function Testimonial() {
  const [activePage, setActivePage] = useState(0);

  return (
    <section className="bg-white border-b border-slate-200/80">
      
      {/* Top Part: Big Stats & Centered Button (Deel Reference Image 5) */}
      <div className="py-20 md:py-28 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C2733] tracking-tight max-w-3xl mx-auto mb-14 leading-tight">
          WUUS membuat pertumbuhan bisnis dan sistem website modern menjadi efisien & tanpa beban
        </h2>

        {/* 4 Big Numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1C2733] tracking-tight mb-2">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Center Pill Button */}
        <div>
          <Link
            href="/inquiries"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white text-sm font-bold transition-all shadow-md"
          >
            <span>Konsultasi Proyek Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Bottom Part: Dark Navy Section with 5-Star Reviews (Deel Image 5) */}
      <div className="bg-[#1C2733] text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-10 border-b border-white/10 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F59E0B] text-[#1C2733] flex items-center justify-center font-black text-lg">
                ★
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Ulasan Bintang 5 dari Klien Bisnis
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  4.9/5 berdasarkan 50+ ulasan klien terverifikasi
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActivePage((p) => Math.max(0, p - 1))}
                className="w-10 h-10 rounded-full border border-white/20 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                aria-label="Previous Reviews"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActivePage((p) => Math.min(1, p + 1))}
                className="w-10 h-10 rounded-full border border-white/20 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                aria-label="Next Reviews"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4 Review Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="text-sm font-bold text-white mb-0.5">{rev.name}</div>
                  <div className="text-[11px] text-slate-400 font-medium mb-3">{rev.role}</div>

                  <div className="flex items-center gap-1 text-[#F59E0B] mb-4">
                    {[...Array(rev.stars)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Floating Banner (Deel Image 5 Style) */}
          <div className="mt-14 max-w-2xl mx-auto rounded-full bg-white/10 border border-white/15 p-2 sm:p-2.5 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
            <div className="flex items-center gap-3 pl-3">
              <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-[#1C2733] flex items-center justify-center text-xs font-bold">
                W
              </div>
              <span className="text-xs sm:text-sm font-semibold text-white">
                Siap mentransformasi website bisnis Anda?
              </span>
            </div>

            <a
              href="https://wa.me/6281383521750?text=Halo%20WUUS,%20saya%20ingin%20konsultasi%20website%20bisnis%20saya"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-[#1C2733] text-xs font-bold transition-all text-center flex-shrink-0"
            >
              Konsultasi WhatsApp Sekarang
            </a>
          </div>

        </div>
      </div>

    </section>
  );
}
