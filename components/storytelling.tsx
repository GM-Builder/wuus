"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const steps = [
  {
    id: 1,
    title: "Momen Kritis Pertama",
    description: "Loading lambat dan tampilan yang kaku membuat calon pelanggan ragu. Kesan pertama melemah, dan perhatian mereka cepat beralih.",
    image: "/images/step1-storytelling.png",
  },
  {
    id: 2,
    title: "Kabur ke Kompetitor",
    description: "Traffic meningkat, tetapi konversi tidak mengikuti. Calon pelanggan membandingkan, dan memilih bisnis yang tampil lebih meyakinkan.",
    image: "/images/step2-storytelling.png",
  },
  {
    id: 3,
    title: "Mesin Sales Profesional",
    description: "Lebih dari sekadar tampilan. Website dirancang cepat, elegan, dan mendukung keputusan pelanggan dengan lebih percaya diri.",
    image: "/wuus-bg-navy.jpg",
    hoverImage: "/logo.png",
    isAccent: true
  },
];

export function Storytelling() {
  const [isAccentHovered, setIsAccentHovered] = useState(false);

  return (
    <section className="py-24 md:py-32 bg-accent-orange relative overflow-hidden">
      
      {/* Animated Glowing Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-yellow-400 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0], x: [0, -40, 0], y: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[0%] w-[400px] h-[400px] bg-amber-300 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        <div className="text-center mb-24 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white mt-4 leading-[1.1] tracking-tight">
            Kenapa Traffic Banyak, <br className="hidden md:block" /> Tapi <span className="text-primary-navy">Closing Seret?</span>
          </h2>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-stretch relative z-10 shadow-[0_30px_60px_-20px_rgba(28,39,51,0.3)] rounded-[3rem] md:rounded-[4rem] bg-white border border-white/20">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => step.isAccent && setIsAccentHovered(true)}
                onMouseLeave={() => step.isAccent && setIsAccentHovered(false)}
                className={`flex-1 relative flex flex-col items-center text-center transition-all duration-700 group overflow-hidden
                  ${index === 0 ? "rounded-t-[3rem] md:rounded-t-none md:rounded-l-[4rem]" : ""}
                  ${index === 2 ? "rounded-b-[3rem] md:rounded-b-none md:rounded-r-[4rem]" : ""}
                  ${step.isAccent ? 'bg-primary-navy text-white shadow-2xl z-20 transform md:scale-[1.10] md:-translate-y-4 rounded-[3rem] md:rounded-[2.5rem]' : 'bg-white z-10 border-b md:border-b-0 md:border-r border-gray-100/80'}
                `}
              >
                {/* Decorative fade behind accent */}
                {step.isAccent && (
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-[inherit] pointer-events-none" />
                )}

                {/* Image Container */}
                <div className={`w-full relative z-10 ${step.isAccent ? '' : 'px-6 pt-6 md:px-8 md:pt-8'}`}>
                  <div className={`w-full relative overflow-hidden transition-colors duration-700 ease-in-out
                    ${step.isAccent ? 'h-56 md:h-64 bg-white/5 border-b border-white/10 group-hover:bg-white inset-shadow' : 'h-48 md:h-56 bg-gray-100 border border-gray-100 shadow-inner rounded-3xl'}
                  `}>
                    {step.isAccent ? (
                      <>
                        <Image 
                          src={step.image} 
                          alt={step.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {step.hoverImage && (
                          <motion.div 
                            initial={false}
                            animate={{ clipPath: isAccentHovered ? 'inset(0 0 0 0)' : 'inset(0 0 0 100%)' }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 bg-white flex items-center justify-center"
                          >
                            <div className="relative w-full h-full p-12">
                                <Image 
                                src={step.hoverImage} 
                                alt={`${step.title} Hover`}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-contain p-12"
                                />
                            </div>
                            
                            {/* Vertical Divider Line */}
                            <motion.div 
                                initial={false}
                                animate={{ left: isAccentHovered ? '0%' : '100%' }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute top-0 bottom-0 w-1 bg-accent-orange z-30 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                                style={{ transform: 'translateX(-50%)' }}
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                                    <div className="flex gap-1">
                                        <div className="w-1 h-3 bg-white rounded-full opacity-50" />
                                        <div className="w-1 h-3 bg-white rounded-full" />
                                        <div className="w-1 h-3 bg-white rounded-full opacity-50" />
                                    </div>
                                </div>
                            </motion.div>
                          </motion.div>
                        )}
                      </>
                    ) : (
                      <Image 
                        src={step.image} 
                        alt={step.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                    )}
                  </div>
                </div>
                
                <div className="px-8 pb-10 xl:px-10 flex-grow flex flex-col items-center justify-center">
                  <h3 className={`text-2xl font-black mb-4 tracking-tight ${step.isAccent ? 'text-white' : 'text-primary-navy'}`}>
                    {step.title}
                  </h3>
                  <p className={`leading-relaxed text-sm md:text-base font-medium ${step.isAccent ? 'text-gray-300' : 'text-gray-500'}`}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
