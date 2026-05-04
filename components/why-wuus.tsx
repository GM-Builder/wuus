"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Rocket, Gem, Clock, Palette, ShieldCheck, Handshake, HeartHandshake } from "lucide-react";

const reasons = [
  {
    title: "Selesai dalam\n7 Hari",
    description: "Waktu adalah aset bisnis. Website Anda disiapkan dengan sistem yang efisien dan terukur.",
    icon: Clock,
    iconColor: "text-accent-orange",
  },
  {
    title: "Pendekatan\nMenyeluruh",
    description: "Kami menangani seluruh kebutuhan teknis, dari awal hingga website siap digunakan.",
    icon: ShieldCheck,
    iconColor: "text-primary-navy",
  },
  {
    title: "Desain yang\nTerukur",
    description: "Setiap elemen dirancang dengan standar visual yang konsisten dan elegan.",
    icon: Palette,
    iconColor: "text-accent-orange",
  },
  {
    title: "Sangat Ringan &\nMudah Diakses",
    description: "Website kami dirancang agar terbuka instan di HP tipe apa pun, bahkan dengan koneksi terbatas.",
    icon: Rocket,
    iconColor: "text-primary-navy",
  },
  {
    title: "Harga Jujur &\nTransparan",
    description: "Semua biaya jelas sejak awal. Tidak ada biaya tambahan yang tiba-tiba muncul di tengah jalan.",
    icon: Handshake,
    iconColor: "text-accent-orange",
  },
  {
    title: "Pendampingan\nPersonal",
    description: "Butuh bantuan setelah website jadi? Tim kami siap mendampingi lewat WhatsApp kapan pun Anda butuh.",
    icon: HeartHandshake,
    iconColor: "text-primary-navy",
  },
];

function StickyHorizontalCard({ reason, i, scrollX, dims, isMobile }: { reason: any, i: number, scrollX: any, dims: any, isMobile: boolean }) {
  const startPos = dims.startOffset + i * (dims.cardW + dims.gap);
  const stickyOffset = dims.startOffset + i * dims.stackOffset;

  // Simulate native position: sticky
  const x = useTransform(scrollX, (sx: number) => Math.max(startPos - sx, stickyOffset));

  return (
    <motion.div
      style={{ x, zIndex: i, width: dims.cardW }}
      className={`absolute top-0 bottom-0 left-0 my-auto ${isMobile ? 'h-[400px] p-6' : 'h-[450px] md:h-[480px] p-8 md:p-12'} rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(28,39,51,0.12)] bg-white/95 backdrop-blur-xl border border-gray-100 flex flex-col justify-center origin-left group hover:shadow-[0_30px_80px_-15px_rgba(28,39,51,0.2)] transition-shadow duration-500`}
    >
      {/* Luxury Glass Reflection Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50" />
      
      {/* Background Decor */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-orange/5 rounded-full blur-2xl pointer-events-none" />

      {/* Number and Icon Block */}
      <div className={`flex justify-between items-start ${isMobile ? 'mb-4' : 'mb-8'} relative z-10`}>
        <span className={`${isMobile ? 'text-[3.5rem]' : 'text-[4rem] md:text-[5rem]'} font-serif italic text-gray-100 leading-none group-hover:text-accent-orange/30 transition-colors duration-500`}>
          0{i + 1}
        </span>
        <div className={`${isMobile ? 'w-10 h-10' : 'w-14 h-14'} rounded-2xl bg-gray-50 flex items-center justify-center ${reason.iconColor} border border-gray-100 group-hover:scale-110 transition-transform duration-500`}>
          <reason.icon size={isMobile ? 20 : 28} strokeWidth={1.5} />
        </div>
      </div>

      {/* Text Content */}
      <div className="relative z-10">
        <h3 className={`${isMobile ? 'text-xl' : 'text-3xl md:text-4xl'} font-black text-primary-navy mb-4 tracking-tight whitespace-pre-line leading-tight`}>
          {reason.title.split('\n').map((line: string, idx: number) => (
            <span key={idx} className="block">
              {idx === 1 ? <span className="font-serif italic font-light text-accent-orange">{line}</span> : line}
            </span>
          ))}
        </h3>
        <p className={`text-gray-500 leading-relaxed font-medium ${isMobile ? 'text-xs' : 'md:text-lg'}`}>
          {reason.description}
        </p>
      </div>
    </motion.div>
  );
}

export function WhyWuus() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef });

  const [dims, setDims] = useState({ cardW: 500, gap: 48, startOffset: 100, stackOffset: 40 });

  useEffect(() => {
    const w = window.innerWidth;
    if (w < 768) {
      setDims({
        cardW: w * 0.85,
        gap: 24,
        startOffset: 24,
        stackOffset: 12
      });
    } else {
      setDims({
        cardW: 500,
        gap: 48,
        startOffset: Math.max(60, w * 0.05),
        stackOffset: 40
      });
    }
  }, [isMobile]);

  // Total scrolling distance calculation
  const maxScroll = (reasons.length - 1) * (dims.cardW + dims.gap);
  const scrollX = useTransform(scrollYProgress, [0, 1], [0, maxScroll + 200]);

  return (
    <section id="why-wuus" ref={targetRef} className="relative bg-[#F8F7F4] h-[350vh]">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center pt-10 pb-10">
        
        {/* Background Soul */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent-orange/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-primary-navy/5 rounded-full blur-[120px]" />
        </div>

        {/* Header Text */}
        <div className="container mx-auto px-6 text-left md:text-center mb-8 relative z-10" style={{ paddingLeft: isMobile ? 24 : dims.startOffset }}>
          <h2 className="text-4xl md:text-5xl font-black text-primary-navy leading-none tracking-tight mb-4 md:mb-6">
            Mengapa Banyak Bisnis<br />
            <span className="font-serif italic font-light text-accent-orange">Memilih WUUS?</span>
          </h2>
          <p className="text-gray-500 md:text-lg leading-relaxed max-w-2xl md:mx-auto">
            Kami merancang tampilan digital yang elegan untuk mengubah pengunjung menjadi pembeli yang yakin.
          </p>
        </div>

        {/* Stacking Cards Area */}
        <div className={`relative w-full ${isMobile ? 'h-[400px]' : 'h-[450px] md:h-[480px]'} mb-8`}>
          {reasons.map((reason, i) => (
            <StickyHorizontalCard 
              key={reason.title} 
              reason={reason} 
              i={i} 
              scrollX={scrollX} 
              dims={dims} 
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Bottom Trust Banner */}
        {/* <div className="container mx-auto px-6 relative z-20 mt-auto" style={{ paddingLeft: isMobile ? 24 : dims.startOffset, paddingRight: isMobile ? 24 : dims.startOffset }}>
          <div className="bg-primary-navy rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-secondary-blue/40 rounded-full blur-[60px] pointer-events-none" />
            <p className="text-white text-base md:text-lg font-bold leading-relaxed max-w-xl relative z-10 text-center md:text-left">
              Mari mulai <span className="text-accent-orange italic font-serif font-normal">pertumbuhan usaha</span> Anda hari ini.
            </p>
            <a
              href="#cta"
              className="shrink-0 relative z-10 inline-flex items-center gap-2 bg-accent-orange text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-amber-400 transition-all shadow-[0_10px_25px_-8px_rgba(245,158,11,0.5)] whitespace-nowrap"
            >
              Konsultasi Gratis
            </a>
          </div>
        </div> */}

      </div>
    </section>
  );
}
