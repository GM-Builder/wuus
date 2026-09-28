"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const stats = [
  { value: "50+", label: "Proyek Bisnis Selesai" },
  { value: "100%", label: "Keuntungan Milik Pemilik Usaha" },
  { value: "< 1 Detik", label: "Kecepatan Buka di Smartphone" },
  { value: "98%", label: "Tingkat Kepuasan & Rekomendasi" },
];

const reviews = [
  {
    name: "Mas Angga",
    role: "Pemilik Kopi & Kuliner Senja",
    stars: 5,
    text: "Semenjak website baru live, reservasi meja dan pesanan langsung masuk lancar tanpa pusing. Websitenya ringan sekali dibuka di HP pelanggan.",
  },
  {
    name: "Ibu Resti",
    role: "Owner Butik & Fashion Cantika",
    stars: 5,
    text: "Tampilan visualnya sangat mewah dan berkelas. Pelanggan kami jadi jauh lebih percaya bertransaksi langsung tanpa ragu.",
  },
  {
    name: "Bapak Anton",
    role: "Direktur Jasa Teknik & Konstruksi",
    stars: 5,
    text: "Sistem pembayaran otomatis dan tombol WhatsApp-nya sangat membantu konversi harian kami. Sangat profesional dan tepat waktu.",
  },
  {
    name: "Sarah M.",
    role: "Owner Boutique Villa & Stay",
    stars: 5,
    text: "Garansi staging 50/50 memberi rasa aman total. Kami uji coba websitenya langsung di smartphone kami sendiri sebelum pelunasan final.",
  },
];

export function Testimonial() {
  const [activePage, setActivePage] = useState(0);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Top Part: Big Stats & Centered Button */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
            HASIL TERVERIFIKASI
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C2733] tracking-tight max-w-3xl mx-auto mb-12 leading-tight">
            WUUS membantu bisnis mandiri tumbuh dengan website berkecepatan tinggi & sistem otomatis
          </h2>

          {/* 4 Big Numbers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10 max-w-5xl mx-auto">
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

          {/* Center Button */}
          <div>
            <Link
              href="/inquiries"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              <span>Konsultasi Proyek Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Bottom Part: Solid Dark Navy Card with 5-Star Reviews */}
        <div className="rounded-xl bg-[#1C2733] text-white p-7 sm:p-10 md:p-12">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-slate-700 mb-8">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#F59E0B] text-[#1C2733] flex items-center justify-center">
                <Star className="w-5 h-5 fill-[#1C2733] text-[#1C2733]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Ulasan Terverifikasi dari Klien Bisnis
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  4.9/5 berdasarkan 50+ ulasan pemilik usaha terverifikasi
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActivePage((p) => Math.max(0, p - 1))}
                className="w-9 h-9 rounded-md border border-slate-700 hover:bg-[#233746] flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Previous Reviews"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActivePage((p) => Math.min(1, p + 1))}
                className="w-9 h-9 rounded-md border border-slate-700 hover:bg-[#233746] flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Next Reviews"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4 Review Cards (Flat, Solid, No Shadows) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-[#233746] border border-slate-700 rounded-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="text-sm font-bold text-white mb-0.5">{rev.name}</div>
                  <div className="text-[11px] text-slate-400 font-medium mb-3">{rev.role}</div>

                  <div className="flex items-center gap-1 text-[#F59E0B] mb-3.5">
                    {[...Array(rev.stars)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-[#F59E0B]" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Solid Banner */}
          <div className="mt-10 rounded-lg bg-[#233746] border border-slate-700 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#F59E0B] text-[#1C2733] flex items-center justify-center text-xs font-bold shrink-0">
                W
              </div>
              <span className="text-xs sm:text-sm font-semibold text-white">
                Siap mentransformasi website bisnis Anda dengan standar modern?
              </span>
            </div>

            <a
              href="https://wa.me/6281383521750?text=Halo%20WUUS,%20saya%20ingin%20konsultasi%20website%20bisnis%20saya"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-[#F59E0B] hover:bg-[#D97706] text-[#1C2733] text-xs font-bold transition-colors text-center shrink-0 cursor-pointer"
            >
              Konsultasi WhatsApp Sekarang
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
