"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
    image: "/logo.png",
    isAccent: true
  },
];

export function Storytelling() {
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

                {/* Image Container with Padding for breathability */}
                <div className="w-full px-6 pt-6 md:px-8 md:pt-8 relative z-10">
                  <div className={`w-full h-48 md:h-56 relative overflow-hidden rounded-3xl transition-colors duration-700 ease-in-out
                    ${step.isAccent ? 'bg-white/5 border border-white/10 group-hover:bg-white inset-shadow' : 'bg-gray-100 border border-gray-100 shadow-inner'}
                  `}>
                    <Image 
                      src={step.image} 
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={`transition-transform duration-700 ease-in-out w-full h-full
                        ${step.isAccent ? 'object-contain scale-[0.6] group-hover:scale-[0.45]' : 'object-cover group-hover:scale-110'}
                      `}
                    />
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
