"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AlertCircle, MousePointerClick, Zap, ChevronRight, Plus } from "lucide-react";

const STEPS = [
  {
    id: 1,
    label: "01",
    keyword: "MASALAH",
    title: "Momen Kritis Pertama",
    desc: "Loading lambat dan tampilan kaku membuat calon pelanggan ragu dalam hitungan detik pertama.",
    image: "/images/step1-storytelling.png",
    accent: "#ef4444",
    bg: "#090505",
    icon: AlertCircle,
  },
  {
    id: 2,
    label: "02",
    keyword: "DAMPAK",
    title: "Kabur ke Kompetitor",
    desc: "Traffic tinggi tak berarti jika mereka kabur ke kompetitor yang tampil lebih meyakinkan.",
    image: "/images/step2-storytelling.png",
    accent: "#f59e0b",
    bg: "#0a0600",
    icon: MousePointerClick,
  },
  {
    id: 3,
    label: "03",
    keyword: "SOLUSI",
    title: "Mesin Sales Profesional",
    desc: "Kami merombak website Anda menjadi ekosistem digital premium yang dirancang murni untuk konversi.",
    image: "/wuus-bg-navy.jpg",
    accent: "#f97316",
    bg: "#020617",
    icon: Zap,
  },
];

export function Storytelling() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative h-auto lg:h-[120vh] bg-[#020617] overflow-hidden flex flex-col" id="storytelling">

      {/* Title Header */}
      <div className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 px-6 container mx-auto z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            Kenapa Traffic Banyak, <br />
            <span className="font-serif italic font-light text-accent-orange lowercase">Tapi Closing Seret?</span>
          </h2>
          <div className="h-1 w-12 lg:w-16 bg-accent-orange mt-6 mx-auto" />
        </motion.div>
      </div>

      {/* Panels Container */}
      <div className={`relative z-10 w-full flex flex-col lg:flex-row ${isMobile ? "px-6 space-y-4 pb-20" : "flex-1"}`}>
        {STEPS.map((step, index) => {
          const isHovered = hoveredIndex === index;
          const isSomethingHovered = hoveredIndex !== null;

          if (isMobile) {
            return (
              <motion.div
                key={step.id}
                onClick={() => setHoveredIndex(isHovered ? null : index)}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
                animate={{ height: isHovered ? "auto" : "90px" }}
                transition={{ duration: 0.4, ease: "circOut" }}
              >
                {/* Slim Header */}
                <div className="flex items-center gap-4 p-6 h-[90px]">
                  <span className="font-serif italic text-accent-orange text-2xl">{step.label}</span>
                  <h3 className="flex-1 font-black text-white uppercase tracking-tight text-sm leading-none">
                    {step.title}
                  </h3>
                  <div className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${isHovered ? "rotate-45" : ""}`}>
                    <Plus size={16} className="text-white/40" />
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="px-6 pb-8 pt-2 space-y-6"
                    >
                      {/* Small Thumbnail Image */}
                      <div className="relative w-full h-[180px] rounded-2xl overflow-hidden">
                        <Image src={step.image} alt={step.title} fill className="object-cover opacity-60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent" />
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed font-medium">
                        {step.desc}
                      </p>

                      {index === 2 && (
                        <Link href="/inquiries" className="w-full py-4 bg-accent-orange text-white font-black uppercase tracking-widest text-[10px] rounded-xl flex items-center justify-center">
                          Estimasi Project
                        </Link>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          }

          {/* Desktop Version (Kinetic Triptych) */ }
          return (
            <motion.div
              key={step.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={false}
              animate={{
                flex: isSomethingHovered ? (isHovered ? 2 : 0.6) : 1,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-w-0 border-r border-white/5 overflow-hidden group cursor-pointer h-full"
              style={{ backgroundColor: step.bg }}
            >
              {/* Background Keyword */}
              <motion.div
                animate={{
                  x: isHovered ? "5%" : "0%",
                  opacity: isHovered ? 0.08 : 0.02
                }}
                className="absolute inset-0 flex items-center justify-center whitespace-nowrap pointer-events-none z-0"
              >
                <span className="text-[30vh] font-black text-white leading-none tracking-tighter uppercase">
                  {step.keyword}
                </span>
              </motion.div>

              {/* Image Layer */}
              <div className="absolute inset-0 z-0">
                <motion.div
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                    opacity: isSomethingHovered && !isHovered ? 0.3 : 0.7
                  }}
                  className="relative w-full h-full transition-all duration-1000"
                >
                  <Image src={step.image} alt={step.title} fill className="object-cover" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </motion.div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-10 p-16 flex flex-col justify-end pointer-events-none">
                <div className="max-w-md pointer-events-auto">
                  <motion.div
                    animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0.5 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                      <step.icon size={28} style={{ color: step.accent }} />
                    </div>
                    <span className="font-black tracking-[0.4em] text-[10px] text-white/40 uppercase">STEP {step.label}</span>
                  </motion.div>
                  <h3 className="text-5xl font-black text-white mb-6 leading-none uppercase italic">{step.title}</h3>
                  <motion.div
                    initial={false}
                    animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xl font-bold text-gray-400 leading-relaxed mb-8">{step.desc}</p>
                    {index === 2 && (
                      <Link href="/inquiries" className="inline-flex px-8 py-4 bg-accent-orange text-white font-black uppercase tracking-widest text-xs hover:scale-105 transition-all items-center gap-3 w-fit">
                        Estimasi Project <ChevronRight size={18} />
                      </Link>
                    )}
                  </motion.div>
                </div>
                <div className="absolute top-12 right-10 opacity-20">
                  <span className="text-6xl font-black text-white rotate-90 block origin-right">{step.label}</span>
                </div>
              </div>

              <motion.div animate={{ width: isHovered ? "100%" : "0%", backgroundColor: step.accent }} className="absolute bottom-0 left-0 h-2 z-20" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
