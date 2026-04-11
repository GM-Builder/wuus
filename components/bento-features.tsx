"use client";

import { motion } from "framer-motion";
import { Briefcase, Activity, CheckCircle, ArrowRight, TrendingUp } from "lucide-react";
import Image from "next/image";

const features = [
  {
    id: 1,
    title: "Profil Profesional",
    description: "Ubah kesan pertama klien menjadi keyakinan. Tampil kredibel dengan desain yang membuat calon pelanggan langsung percaya.",
    icon: <Briefcase className="w-6 h-6 text-accent-orange" />,
    delay: 0.1,
    hoverRotate: "-2deg",
    shadow: "rgba(245,158,11,0.45)",
  },
  {
    id: 2,
    title: "Kecepatan Akses",
    description: "Berhenti membiarkan pelanggan menunggu. Website Anda akan terbuka super cepat sehingga tidak ada lagi yang kabur sebelum melihat tawaran Anda.",
    icon: <Activity className="w-6 h-6 text-accent-orange" />,
    delay: 0.2,
    hoverRotate: "2deg",
    shadow: "rgba(245,158,11,0.45)",
  },
  {
    id: 3,
    title: "Tampilan Premium",
    description: "Wajah bisnis Anda akan terlihat sekelas brand nasional. Tampilan elegan yang membuat calon pembeli langsung serius merespons.",
    icon: <TrendingUp className="w-6 h-6 text-accent-orange" />,
    delay: 0.3,
    hoverRotate: "-1deg",
    shadow: "rgba(245,158,11,0.45)",
    bgImage: "/images/premium-design.png",
  },
  {
    id: 4,
    title: "Kelancaran Bisnis",
    description: "Dari pemasangan hingga pemeliharaan, semua beres tanpa perlu Anda ikut pusing. Fokus saja pada penjualan.",
    icon: <CheckCircle className="w-6 h-6 text-accent-orange" />,
    delay: 0.4,
    hoverRotate: "3deg",
    shadow: "rgba(245,158,11,0.45)",
  },
];

export function BentoFeatures() {
  return (
    <section id="services" className="py-24 bg-light-grey relative overflow-hidden">
      
      {/* Background texture localized */}
      <div className="absolute inset-0 bg-[url('/patterns/cubes.png')] opacity-[1.75] pointer-events-none z-0" />
      
      {/* Depth lighting blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="inline-block relative mb-4">
            <div className="absolute inset-0 bg-gray-200 opacity-60 rounded-sm transform -rotate-1 scale-x-110" style={{ filter: "blur(2px)" }} />
            <span className="relative text-sm font-bold tracking-[0.2em] text-gray-500 uppercase px-4 z-10 block py-1">
              Solusi Website UMKM
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-primary-navy max-w-4xl mx-auto leading-tight">
            Bikin Usaha Anda Naik Kelas dengan <br className="hidden md:block" />
            <span className="italic font-serif text-accent-orange">Website Premium</span> & Super Cepat
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: feature.delay }}
              whileHover={{
                rotate: feature.hoverRotate,
                y: -8,
                boxShadow: `0 14px 28px -6px ${feature.shadow}`,
              }}
              className="bg-white rounded-2xl md:rounded-[2rem] flex flex-col group cursor-pointer relative overflow-hidden border border-gray-100/60 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] transition-colors duration-300"
              style={{ transformOrigin: "center bottom" }}
            >
              {/* Background image optimized */}
              {feature.bgImage && (
                <div className="absolute inset-0 z-0">
                  <Image
                    src={feature.bgImage}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/95" />
                </div>
              )}

              {/* No top accent line */}

              <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                <div className="mb-4 md:mb-6 bg-accent-orange/10 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-primary-navy mb-3 md:mb-4">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-500 font-medium mb-8 md:mb-12 flex-grow leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="mt-auto border-t border-gray-100 pt-6">
                  <a href="#cta" className="flex items-center justify-between text-sm font-bold text-primary-navy group-hover:text-accent-orange transition-colors">
                    <span className="uppercase tracking-widest text-[10px]">Pelajari Lebih</span>
                    <div className="w-8 h-8 rounded-full bg-primary-navy text-white flex items-center justify-center group-hover:bg-accent-orange transition-colors duration-300">
                      <ArrowRight size={14} />
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Paper Clipping Quote */}


        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-28 max-w-md mx-auto relative"
        >
          {/* Outer slight shadow so it looks pinned */}
          <div
            className="relative px-6 py-8 bg-[#fdfaf0] border border-gray-200/60 cursor-default"
            style={{
              transform: "rotate(3deg)",
              boxShadow: "4px 8px 32px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.06)",
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "rotate(1deg)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "rotate(3deg)")}
          >
            {/* Tape strip */}
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-7 bg-white/75 border border-white/30"
              style={{
                transform: "translateX(-50%) rotate(-2deg)",
                backdropFilter: "blur(4px)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            />
            
            <div className="text-[9px] font-black tracking-[0.25em] text-gray-400 uppercase mb-5 text-center">
              Strategic Partnership
            </div>
            <p
              className="text-2xl text-primary-navy leading-relaxed text-center px-2"
              style={{ fontFamily: "var(--font-caveat)", fontWeight: 600 }}
            >
              "WUUS menyadari bahwa masa depan usaha Anda dipertaruhkan oleh kualitas tampilan digital. Kami membuatnya sempurna."
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
