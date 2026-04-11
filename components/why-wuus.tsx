"use client";

import { motion } from "framer-motion";
import { Rocket, Gem, Clock, Palette, ShieldCheck, Handshake, HeartHandshake } from "lucide-react";

const reasons = [
  {
    title: "Performa\nNext-Gen",
    description:
      "Kami pakai teknologi yang sama dengan perusahaan besar Fortune 500. Hasilnya? Website Anda terbuka kilat tanpa bikin pengunjung kabur duluan.",
    icon: Rocket,
    gradient: "from-[#1C2733] to-[#233746]",
    iconColor: "text-accent-orange",
  },
  {
    title: "Investasi\nCerdas",
    description:
      "Kualitas desain kelas agensi besar, dengan harga yang memang masuk akal buat pemilik usaha. Semua biaya sudah jelas dari awal.",
    icon: Gem,
    gradient: "from-[#F59E0B] to-[#FBBF24]",
    iconColor: "text-primary-navy",
  },
  {
    title: "Go-Digital\ndalam 3 Hari",
    description:
      "Proses pengerjaan yang cepat dan terstruktur khas WUUS, tanpa mengorbankan detail kualitas. Bisnis Anda siap online dalam hitungan hari.",
    icon: Clock,
    gradient: "from-[#1C2733] to-[#2d4a5e]",
    iconColor: "text-accent-orange",
  },
  {
    title: "Branding\nBerkelas",
    description:
      "Desain bersih, modern, dan elegan yang membuat pelanggan percaya pada bisnis Anda sejak detik pertama mereka mampir.",
    icon: Palette,
    gradient: "from-[#F59E0B] to-[#D97706]",
    iconColor: "text-primary-navy",
  },
  {
    title: "Tidak Perlu\nPaham Teknis",
    description:
      "Tidak tahu domain, hosting, atau coding? Tidak masalah. Kami urus semuanya dari nol. Anda cukup cerita kebutuhan bisnis Anda.",
    icon: ShieldCheck,
    gradient: "from-[#1C2733] to-[#233746]",
    iconColor: "text-accent-orange",
  },
  {
    title: "Harga Jelas\nTanpa Kejutan",
    description:
      "Tidak ada biaya tersembunyi yang tiba-tiba muncul di akhir. Semua yang disepakati di awal tetap sama sampai proyek selesai.",
    icon: Handshake,
    gradient: "from-[#F59E0B] to-[#FBBF24]",
    iconColor: "text-primary-navy",
  },
  {
    title: "Ada Terus\nSetelah Launching",
    description:
      "Setelah website tayang, kami tidak hilang begitu saja. Ada pertanyaan atau perlu perubahan kecil? Hubungi kami kapan saja lewat WhatsApp.",
    icon: HeartHandshake,
    gradient: "from-[#1C2733] to-[#2d4a5e]",
    iconColor: "text-accent-orange",
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
        <div className="inline-flex items-center gap-3 mb-6 bg-accent-orange/10 px-4 py-2 rounded-full">
          <div className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
          <span className="text-xs font-extrabold tracking-[0.2em] text-accent-orange uppercase">Kenapa Pilih Kami?</span>
        </div>
        <h2 className="text-4xl md:text-7xl font-black text-primary-navy leading-none tracking-tight mb-6">
          Kenapa Bisnis Anda <br />
          <span className="font-serif italic font-light text-gray-400">Butuh WUUS?</span>
        </h2>
        <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
          WUUS bukan sekedar tempat bikin website. Kami tahu persis bagaimana tampilan digital yang tepat bisa mengubah pengunjung yang ragu menjadi pembeli yang yakin.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-64 relative flex flex-col gap-12 z-10">
        {reasons.map((reason, i) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="sticky w-full rounded-[2rem] md:rounded-[4rem] p-10 md:p-14 shadow-[0_40px_100px_-20px_rgba(28,39,51,0.12)] flex flex-col md:flex-row items-center gap-10 md:gap-14 border border-white bg-white/80 backdrop-blur-3xl"
            style={{ 
              top: `calc(10vh + ${i * 40}px)`, 
              zIndex: i + 10 
            }}
          >
            {/* Icon Block */}
            <div
              className={`w-20 h-20 md:w-44 md:h-44 rounded-2xl md:rounded-[2.5rem] shrink-0 flex items-center justify-center bg-gradient-to-br ${reason.gradient} shadow-2xl relative overflow-hidden`}
            >
              <div className="absolute inset-0 border-t border-l border-white/20" />
              <reason.icon
                className={`${reason.iconColor} relative z-10 w-8 h-8 md:w-16 md:h-16 shadow-2xl`}
                strokeWidth={1}
              />
            </div>

            {/* Text */}
            <div className="text-center md:text-left flex-1">
              <span className="text-[10px] md:text-xs font-black tracking-[0.2em] text-accent-orange uppercase mb-2 block">
                {String(i + 1).padStart(2, "0")} / {String(reasons.length).padStart(2, "0")}
              </span>
              <h3 className="text-3xl md:text-5xl font-black text-primary-navy mb-4 md:mb-6 tracking-tighter leading-tight whitespace-pre-line">
                {reason.title}
              </h3>
              <p className="text-base md:text-2xl text-gray-500 leading-relaxed font-normal">
                {reason.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ─── Bottom Trust Banner ─── */}
      <div className="mt-32 relative z-50 px-6">
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
              className="shrink-0 relative z-10 inline-flex items-center gap-3 bg-accent-orange text-white font-black text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-amber-400 transition-all shadow-[0_10px_25px_-8px_rgba(245,158,11,0.5)] hover:shadow-[0_15px_30px_-8px_rgba(245,158,11,0.6)] hover:-translate-y-0.5 whitespace-nowrap"
            >
              Konsultasi Gratis
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
