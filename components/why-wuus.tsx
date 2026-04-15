"use client";

import { motion } from "framer-motion";
import { Rocket, Gem, Clock, Palette, ShieldCheck, Handshake, HeartHandshake } from "lucide-react";

const reasons = [
  {
    title: "Selesai dalam\n7 Hari",
    description: "Waktu adalah aset bisnis. Website Anda disiapkan dengan sistem yang efisien dan terukur.",
    icon: Clock,
    gradient: "from-[#1C2733] to-[#233746]",
    iconColor: "text-accent-orange",
  },
  {
    title: "Pendekatan\nMenyeluruh",
    description: "Kami menangani seluruh kebutuhan teknis, dari awal hingga website siap digunakan.",
    icon: ShieldCheck,
    gradient: "from-[#F59E0B] to-[#FBBF24]",
    iconColor: "text-primary-navy",
  },
  {
    title: "Desain yang\nTerukur",
    description: "Setiap elemen dirancang dengan standar visual yang konsisten dan elegan.",
    icon: Palette,
    gradient: "from-[#1C2733] to-[#2d4a5e]",
    iconColor: "text-accent-orange",
  },
  {
    title: "Sangat Ringan &\nMudah Diakses",
    description: "Website kami dirancang agar terbuka instan di HP tipe apa pun, bahkan dengan koneksi internet yang terbatas sekalipun.",
    icon: Rocket,
    gradient: "from-[#F59E0B] to-[#D97706]",
    iconColor: "text-primary-navy",
  },
  {
    title: "Harga Jujur &\nTransparan",
    description: "Semua biaya jelas sejak awal. Tidak ada biaya tambahan yang tiba-tiba muncul di tengah jalan.",
    icon: Handshake,
    gradient: "from-[#1C2733] to-[#233746]",
    iconColor: "text-accent-orange",
  },
  {
    title: "Pendampingan\nPersonal",
    description: "Butuh bantuan setelah website jadi? Tim kami siap mendampingi lewat WhatsApp kapan pun Anda butuh penyesuaian.",
    icon: HeartHandshake,
    gradient: "from-[#F59E0B] to-[#FBBF24]",
    iconColor: "text-primary-navy",
  },
];

export function WhyWuus() {
  return (
    <section id="why-wuus" className="relative bg-[#F8F7F4] py-32">
      {/* Background Soul (Optional, matching BDN pattern) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent-orange/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-primary-navy/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center mb-32 relative z-10">

        <h2 className="text-4xl md:text-7xl font-black text-primary-navy leading-none tracking-tight mb-6">
          Mengapa Banyak Bisnis<br />
          <span className="font-serif italic font-light text-accent-orange">Memilih WUUS?</span>
        </h2>
        <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
          WUUS bukan sekedar tempat bikin website. Kami tahu persis bagaimana tampilan digital yang tepat bisa mengubah pengunjung yang ragu menjadi pembeli yang yakin.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-32 relative flex flex-col gap-12 z-10">
        {reasons.map((reason, i) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="sticky w-full rounded-[3rem] md:rounded-[4rem] p-12 md:p-16 shadow-[0_30px_80px_-20px_rgba(28,39,51,0.12)] flex flex-col md:flex-row items-center gap-10 md:gap-20 border border-white bg-white/95 backdrop-blur-xl overflow-hidden group will-change-transform transform-gpu hover:shadow-[0_50px_100px_-20px_rgba(28,39,51,0.2)] transition-shadow duration-700"
            style={{
              top: `calc(10vh + ${i * 40}px)`,
              zIndex: i + 10,
              transform: 'translateZ(0)'
            }}
          >
            {/* Luxury Glass Reflection Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
            {/* Background Decor: Floating Circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-orange/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary-navy/5 rounded-full blur-3xl pointer-events-none" />

            {/* Typography Number Block */}
            <div className="w-20 h-20 md:w-32 md:h-32 shrink-0 flex flex-col items-center justify-center relative z-10 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3">
              <span className="text-[5rem] md:text-[8rem] font-serif italic text-gray-200 group-hover:text-accent-orange group-hover:drop-shadow-[0_10px_15px_rgba(245,158,11,0.3)] transition-all duration-500 leading-none">
                0{i + 1}
              </span>
            </div>

            {/* Text */}
            <div className="text-center md:text-left flex-1 relative z-10">
              <h3 className="text-4xl md:text-6xl font-black text-primary-navy mb-5 md:mb-8 tracking-tighter leading-[0.95] whitespace-pre-line">
                {reason.title.split('\n').map((line, idx) => (
                  <span key={idx} className="block">
                    {idx === 1 ? <span className="font-serif italic font-light text-gray-400">{line}</span> : line}
                  </span>
                ))}
              </h3>

              <p className="text-base md:text-2xl text-gray-500 leading-relaxed font-normal max-w-2xl">
                {reason.description}
              </p>
            </div>

          </motion.div>
        ))}
      </div>

      {/* ─── Bottom Trust Banner ─── */}
      <div className="mt-16 relative z-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-primary-navy rounded-[2rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-secondary-blue/40 rounded-full blur-[80px] pointer-events-none" />
            <p className="text-white text-xl md:text-2xl font-bold leading-relaxed max-w-xl relative z-10">
              Bukan sekadar website, tapi{" "}
              <span className="text-accent-orange italic font-serif font-normal">partner digital</span>{" "}
              untuk pertumbuhan usaha Anda. Mari mulai konsultasi gratis hari ini.
            </p>
            <a
              href="#cta"
              className="shrink-0 relative z-10 inline-flex items-center gap-3 bg-accent-orange text-white font-black text-sm px-8 py-4 rounded-full hover:bg-amber-400 transition-all shadow-[0_10px_25px_-8px_rgba(245,158,11,0.5)] hover:shadow-[0_15px_30px_-8px_rgba(245,158,11,0.6)] hover:-translate-y-0.5 whitespace-nowrap"
            >
              Konsultasi Gratis
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
