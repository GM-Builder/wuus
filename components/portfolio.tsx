"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Play, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const caseStudies = [
  {
    id: "muslibegovic",
    name: "Muslibegovic House",
    location: "Mostar, Bosnia & Herzegovina",
    badge: "Heritage Stay & Luxury Boutique",
    headline: "Direct Booking Engine & Multilingual AI Concierge",
    description: "Situs cagar budaya nasional abad ke-18 dengan 12 kamar boutique. Berhasil mengaktifkan direct booking engine 0% komisi OTA dan AI concierge 20+ bahasa dalam 7 hari kerja.",
    metrics: "+38% Direct Booking • €0 Komisi OTA • 1.2s AI Respon",
    image: "/Savoria-mockup.png",
    link: "/hospitality"
  },
  {
    id: "city-boutique",
    name: "City Boutique Hotel",
    location: "Sarajevo, Baščaršija",
    badge: "Eco-Friendly 4-Star Hotel",
    headline: "Fast Edge Architecture & WhatsApp Direct Integration",
    description: "Hotel butik bintang empat di pusat Sarajevo. Menggantikan sistem booking pihak ketiga yang mahal dengan direct engine modern dan konfirmasi WhatsApp otomatis.",
    metrics: "720ms Load Time • 100% Margin Terselamatkan • 4.9★ Review",
    image: "/trust-mockup.png",
    link: "/hospitality"
  },
  {
    id: "urban-threads",
    name: "Urban Threads & Retail",
    location: "Jakarta, Indonesia",
    badge: "Modern Apparel & E-Commerce",
    headline: "Instant Mayar Settlement & High-Speed Catalog",
    description: "Brand fashion premium dengan ribuan SKU. Dilengkapi checkout kilat Mayar.id dengan settlement instan QRIS dan kartu kredit tanpa downtime.",
    metrics: "99/100 Lighthouse • Transaksi Instan • Nol Lag Server",
    image: "/urbanThreads-mockup.png",
    link: "/inquiries"
  }
];

export function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));
  };

  const current = caseStudies[currentIndex];
  const nextItem = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-[#F8F9FA] border-b border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header (Deel Reference Image 4 Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
              STUDI KASUS & HASIL NYATA
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C2733] tracking-tight">
              Ulasan klien & dampak bisnis
            </h2>
          </div>

          <p className="text-sm text-slate-500 font-medium max-w-md">
            Pelajari bagaimana klien kami melipatgandakan direct booking dan menghemat ribuan Euro dari potongan komisi pihak ketiga.
          </p>
        </div>

        {/* Carousel Showcase (Exact Deel Image 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Active Case Study Card */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            {/* Visual Device Frame */}
            <div className="relative w-full h-[260px] sm:h-[340px] rounded-2xl overflow-hidden bg-slate-900 mb-6 group">
              <Image
                src={current.image}
                alt={current.name}
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-contain object-center p-2 group-hover:scale-[1.02] transition-transform duration-500"
              />
              
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 text-[11px] font-bold text-[#1C2733] shadow-xs">
                {current.badge}
              </div>

              <div className="absolute bottom-4 right-4 bg-[#1C2733]/90 text-white rounded-full px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5 backdrop-blur-sm">
                <span>{current.location}</span>
              </div>
            </div>

            {/* Description & Link */}
            <div>
              <div className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider mb-1">
                {current.metrics}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1C2733] tracking-tight mb-2">
                {current.name}
              </h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
                {current.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <Link
                  href={current.link}
                  className="px-5 py-2.5 rounded-full border border-slate-300 hover:border-[#1C2733] text-xs font-bold text-[#1C2733] hover:bg-[#1C2733] hover:text-white transition-all flex items-center gap-2"
                >
                  <span>Pelajari Studi Kasus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {/* Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="w-9 h-9 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-[#1C2733] transition-colors"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-9 h-9 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-[#1C2733] transition-colors"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Peek Preview Card (Deel-Style Blurred Next Item) */}
          <div
            onClick={nextSlide}
            className="hidden lg:flex lg:col-span-4 bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/70 p-6 flex-col justify-between opacity-70 hover:opacity-100 transition-opacity cursor-pointer group"
          >
            <div>
              <div className="relative w-full h-[220px] rounded-2xl overflow-hidden bg-slate-100 mb-5">
                <Image
                  src={nextItem.image}
                  alt={nextItem.name}
                  fill
                  sizes="30vw"
                  className="object-contain p-2 filter blur-[1px] group-hover:blur-none transition-all"
                />
              </div>

              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                BERIKUTNYA
              </span>
              <h4 className="text-lg font-bold text-[#1C2733] mt-1 mb-2">
                {nextItem.name}
              </h4>
              <p className="text-xs text-slate-500 line-clamp-3 font-medium leading-relaxed">
                {nextItem.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-[#1C2733]">
              <span>Lihat proyek ini</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}