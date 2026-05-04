"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Building2, ShoppingCart, LayoutTemplate, Bot, Workflow, FileCode2, Blocks, Wrench, ArrowRight } from "lucide-react";

const services = [
  {
    id: "01",
    category: "Web Development",
    title: "Custom Corporate Website",
    shortDesc: "Desain eksklusif & performa Next.js.",
    icon: Building2,
    image: "/images/services/service-1.png",
  },
  {
    id: "02",
    category: "Web Development",
    title: "High-Performance E-Commerce",
    shortDesc: "Sistem belanja otomatis & terintegrasi.",
    icon: ShoppingCart,
    image: "/images/services/service-2.png",
  },
  {
    id: "03",
    category: "Web Development",
    title: "Landing Page Optimization",
    shortDesc: "Optimasi konversi untuk iklan Anda.",
    icon: LayoutTemplate,
    image: "/images/services/service-3.png",
  },
  {
    id: "04",
    category: "AI & Automation",
    title: "Autonomous AI Agents",
    shortDesc: "Asisten otonom untuk tugas operasional.",
    icon: Bot,
    image: "/images/services/service-4.png",
  },
  {
    id: "05",
    category: "AI & Automation",
    title: "Workflow Automation",
    shortDesc: "Integrasi alur kerja tanpa manual.",
    icon: Workflow,
    image: "/images/services/service-5.png",
  },
  {
    id: "06",
    category: "Web3 & Future Tech",
    title: "Smart Contract Development",
    shortDesc: "Keamanan transaksi berbasis Blockchain.",
    icon: FileCode2,
    image: "/images/services/service-6.png",
  },
  {
    id: "07",
    category: "Web3 & Future Tech",
    title: "dApps & Web3 Integration",
    shortDesc: "Integrasi dompet digital & dApps.",
    icon: Blocks,
    image: "/images/services/service-7.png",
  },
  {
    id: "08",
    category: "Growth & Technical",
    title: "Technical Audit & Migration",
    shortDesc: "Modernisasi sistem & perbaikan error.",
    icon: Wrench,
    image: "/images/services/service-8.png",
  }
];

export function Services() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate translation based on scroll progress
  // At p=0, x = 0. At p=1, x = -100% of the container width + 100vw to ensure the last item is visible.
  const x = useTransform(scrollYProgress, (p) => `calc(${p * -100}% + ${p * 100}vw)`);

  return (
    <section ref={targetRef} className={`relative bg-[#F8F7F4] text-primary-navy ${isMobile ? 'h-auto py-20' : 'h-[300vh]'}`}>
      <div className={isMobile ? 'flex flex-col' : 'sticky top-0 h-screen flex flex-col justify-center overflow-hidden'}>
        
        <div className="container mx-auto px-6 md:px-12 xl:px-24 mb-10 md:mb-14 relative z-20 mt-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h2 className="text-sm md:text-base font-bold text-accent-orange uppercase tracking-widest mb-4">
              Layanan & Solusi
            </h2>
            <h3 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              Lebih dari sekadar website<br/> 
            </h3>

            {/* Mobile Swipe Indicator */}
            {isMobile && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex items-center gap-2 text-gray-500 text-sm font-medium"
              >
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight size={18} className="text-accent-orange" />
                </motion.div>
                <span>Geser untuk melihat semua layanan</span>
              </motion.div>
            )}
          </motion.div>
        </div>

        <div className={isMobile ? 'px-4 pb-20' : ''}>
          <motion.div 
            style={isMobile ? {} : { x }} 
            className={isMobile 
              ? "grid grid-cols-2 gap-3" 
              : "flex gap-6 md:gap-8 px-6 md:px-12 xl:px-24 w-max pb-12 pt-10"
            }
          >
            {services.map((service) => (
            <div 
              key={service.id}
              className={`relative group cursor-pointer drop-shadow-[0_15px_30px_rgba(28,39,51,0.08)] ${
                isMobile ? "w-full aspect-[4/5]" : "w-[280px] md:w-[340px] aspect-[4/5] shrink-0"
              }`}
            >
              {/* SVG Mask Definition */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <defs>
                  <mask id={`notch-mask-${service.id}`}>
                    <rect width="100%" height="100%" fill="white" rx={isMobile ? 12 : 16} />
                    {isMobile ? (
                      /* Mobile Notch: 60px total, 12px radii */
                      <path d="M0 0 H60 Q48 0 48 12 V36 Q48 48 36 48 H12 Q0 48 0 60 Z" fill="black" />
                    ) : (
                      /* Desktop Notch: 108px total, 24px radii */
                      <path d="M0 0 H108 Q84 0 84 24 V60 Q84 84 60 84 H24 Q0 84 0 108 Z" fill="black" />
                    )}
                  </mask>
                </defs>
              </svg>

              {/* Masked Card Container */}
              <div 
                className="relative w-full h-full bg-gray-200"
                style={{ 
                  mask: `url(#notch-mask-${service.id})`, 
                  WebkitMask: `url(#notch-mask-${service.id})` 
                }}
              >
                {/* Full Cover Image */}
                <div className="absolute inset-0 bg-gray-300">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    priority
                    sizes={isMobile ? "50vw" : "(max-width: 768px) 280px, 340px"}
                    className="object-cover" 
                  />
                </div>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/95 via-primary-navy/40 to-transparent opacity-80" />

                {/* Content over Image */}
                <div className={`absolute bottom-0 left-0 w-full flex flex-col z-10 ${isMobile ? 'p-3' : 'p-6'}`}>
                  <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-bold text-accent-orange uppercase tracking-widest mb-1`}>
                    {service.category}
                  </span>
                  <h4 className={`${isMobile ? 'text-sm' : 'text-xl'} font-black text-white mb-1 leading-tight`}>
                    {service.title}
                  </h4>
                  <p className={`text-gray-300 ${isMobile ? 'text-[10px]' : 'text-sm'} font-medium leading-relaxed line-clamp-2`}>
                    {service.shortDesc}
                  </p>
                </div>
              </div>

              {/* Icon box */}
              <div className={`absolute bg-white rounded-xl shadow-sm flex items-center justify-center z-30 border border-gray-100 ${
                isMobile 
                  ? "top-2 left-2 w-9 h-9" 
                  : "top-4 left-4 w-14 h-14"
              }`}>
                <service.icon 
                  className="text-accent-orange" 
                  size={isMobile ? 18 : 24} 
                  strokeWidth={2} 
                />
              </div>

            </div>
          ))}
          {!isMobile && <div className="w-[10vw] flex-shrink-0" />}
        </motion.div>
        </div>
      </div>
    </section>
  );
}
