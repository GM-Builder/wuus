"use client";

import { motion } from "framer-motion";
import { Coffee, WashingMachine, Wrench, Stethoscope, Shirt, Camera, Home, GraduationCap, ShoppingBag } from "lucide-react";

const brands = [
  { name: "Restoran & Cafe", icon: Coffee },
  { name: "Jasa Laundry & Cleaning", icon: WashingMachine },
  { name: "Bengkel & Otomotif", icon: Wrench },
  { name: "Klinik & Kesehatan", icon: Stethoscope },
  { name: "Fashion & Boutique", icon: Shirt },
  { name: "Studio Kreatif", icon: Camera },
  { name: "Property & Agent", icon: Home },
  { name: "Lembaga Kursus", icon: GraduationCap },
  { name: "Toko Online & UMKM", icon: ShoppingBag }
];

export function MarqueeBrands() {
  return (
    <section className="bg-secondary-blue text-white pt-8 pb-12 relative z-20 border-b-8 border-accent-orange -mt-8 md:-mt-20">
      <div className="text-center mb-8">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-[0.2em]">
          Dirancang untuk Berbagai Jenis Bisnis
        </p>
      </div>
      
      {/* Marquee Animation */}
      <div className="w-full flex overflow-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex whitespace-nowrap items-center gap-16 px-8 transform-gpu will-change-transform"
          style={{ transform: "translateZ(0)" }}
        >
          {/* Double array for seamless looping */}
          {[...brands, ...brands].map((brand, i) => {
            const Icon = brand.icon;
            return (
              <div key={i} className="flex-shrink-0 opacity-50 hover:opacity-100 transition-all duration-300 flex items-center gap-3 group grayscale hover:grayscale-0">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent-orange/30">
                  <Icon size={20} className="text-gray-400 group-hover:text-accent-orange" strokeWidth={1.5} />
                </div>
                <span className="text-xl font-bold text-gray-300 tracking-wide group-hover:text-white">{brand.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}