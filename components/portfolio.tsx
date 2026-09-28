"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const caseStudies = [
  {
    id: "savoria",
    name: "Savoria Dining & Lounge",
    location: "Jakarta & Bali",
    badge: "F&B / Restoran & Kuliner",
    headline: "Website Eksklusif & Sistem Reservasi Meja Otomatis",
    description: "Restoran fine dining dengan konsep kuliner premium. Dilengkapi katalog menu visual interaktif, reservasi meja langsung, dan konfirmasi WhatsApp otomatis tanpa hambatan.",
    metrics: "Akses 0.6 Detik • Reservasi Langsung • Tampilan Elegan",
    image: "/Savoria-mockup.png",
    link: "/inquiries"
  },
  {
    id: "trust",
    name: "Trust Architect & Engineering",
    location: "Surabaya & Jabodetabek",
    badge: "B2B Corporate & Konsultan",
    headline: "Profil Perusahaan Berkelas untuk Tender & Klien Korporat",
    description: "Konsultan arsitektur dan konstruksi ternama. Membutuhkan website berkecepatan tinggi yang menampilkan portofolio proyek berskala besar untuk memenangkan tender klien.",
    metrics: "Kredibilitas 100% • Tampilan Presisi • Bebas Loading Lemot",
    image: "/trust-mockup.png",
    link: "/inquiries"
  },
  {
    id: "urban-threads",
    name: "Urban Threads Apparel",
    location: "Bandung & Jakarta",
    badge: "E-Commerce & Retail Brand",
    headline: "Toko Online Mandiri dengan Pembayaran Instan",
    description: "Brand fashion modern dengan ratusan produk aktif. Menerima pembayaran QRIS, transfer bank, dan kartu kredit secara otomatis tanpa potongan komisi marketplace.",
    metrics: "Profit 100% Milik Brand • Checkout Cepat • Terhubung WhatsApp",
    image: "/urbanThreads-mockup.png",
    link: "/inquiries"
  },
  {
    id: "villa-stay",
    name: "Vila Kliment Boutique Stays",
    location: "Bali & Yogyakarta",
    badge: "Hospitality & Villa",
    headline: "Direct Booking Engine & Asisten Tamu AI 24 Jam",
    description: "Akomodasi villa butik privat. Menerima reservasi langsung dari tamu lokal dan mancanegara tanpa potongan komisi agen 18% - 25%, didukung asisten AI multibahasa.",
    metrics: "0% Komisi Calo • Asisten 24 Jam • Kalender Reservasi",
    image: "/images/hospitality/savoria-wine-estate.jpg",
    link: "/hospitality"
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
    <section id="portfolio" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
              STUDI KASUS & PORTOFOLIO
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C2733] tracking-tight">
              Karya terpilih & dampak bisnis nyata
            </h2>
          </div>

          <p className="text-sm text-slate-600 font-medium max-w-md">
            Pelajari bagaimana klien kami mentransformasi website mereka menjadi aset bisnis yang menghasilkan reputasi dan omset nyata.
          </p>
        </div>

        {/* Carousel Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Active Case Study Card */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between">
            {/* Visual Frame */}
            <div className="relative w-full h-[260px] sm:h-[340px] rounded-lg overflow-hidden bg-slate-900 mb-6 group">
              <Image
                src={current.image}
                alt={current.name}
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-contain object-center p-2"
              />
              
              <div className="absolute top-4 left-4 bg-white rounded-md px-3 py-1 text-[11px] font-bold text-[#1C2733]">
                {current.badge}
              </div>

              <div className="absolute bottom-4 right-4 bg-[#1C2733] text-white rounded-md px-3 py-1.5 text-xs font-semibold">
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

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <Link
                  href={current.link}
                  className="px-5 py-2.5 rounded-lg border border-slate-300 hover:border-[#1C2733] text-xs font-bold text-[#1C2733] hover:bg-[#1C2733] hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>Pelajari Studi Kasus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {/* Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="w-9 h-9 rounded-md border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-[#1C2733] transition-colors cursor-pointer"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-9 h-9 rounded-md border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-[#1C2733] transition-colors cursor-pointer"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Peek Preview Card */}
          <div
            onClick={nextSlide}
            className="hidden lg:flex lg:col-span-4 bg-slate-50 rounded-xl border border-slate-200 p-6 flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="relative w-full h-[220px] rounded-lg overflow-hidden bg-slate-200 mb-5">
                <Image
                  src={nextItem.image}
                  alt={nextItem.name}
                  fill
                  sizes="30vw"
                  className="object-contain p-2"
                />
              </div>

              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                BERIKUTNYA
              </span>
              <h4 className="text-lg font-bold text-[#1C2733] mt-1 mb-2">
                {nextItem.name}
              </h4>
              <p className="text-xs text-slate-600 line-clamp-3 font-medium leading-relaxed">
                {nextItem.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-[#1C2733]">
              <span>Lihat proyek ini</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}