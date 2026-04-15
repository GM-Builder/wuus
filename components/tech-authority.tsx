"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const stacks = [
  { name: "Next.js", color: "bg-black text-white border-black" },
  { name: "Tailwind CSS", color: "bg-[#0ea5e9] text-white border-[#0ea5e9]" },
  { name: "Vercel", color: "bg-black text-white border-black" },
  { name: "Framer Motion", color: "bg-pink-500 text-white border-pink-500" },
];

const scores = [
  { label: "Performance", value: 100 },
  { label: "Accessibility", value: 100 },
  { label: "Best Practices", value: 100 },
  { label: "SEO", value: 100 },
];

export function TechAuthority() {
  return (
    <section className="py-24 bg-primary-navy relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-orange/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Teknologi Modern <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-yellow">Dengan Standar Global.</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Kami tidak menggunakan platform lambat. Website Anda dibangun menggunakan infrastruktur modern yang sama dengan yang digunakan oleh perusahaan teknologi global, Memberikan performa tinggi, stabilitas, dan keamanan yang dirancang untuk kebutuhan jangka panjang.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {stacks.map((stack) => (
                <div key={stack.name} className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${stack.color} flex items-center gap-2`}>
                  {stack.name}
                </div>
              ))}
            </div>

            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white font-medium">
                <CheckCircle2 className="text-green-400 w-5 h-5 flex-shrink-0" />
                <span>Hosting langsung di jaringan Edge global.</span>
              </li>
              <li className="flex items-center gap-3 text-white font-medium">
                <CheckCircle2 className="text-green-400 w-5 h-5 flex-shrink-0" />
                <span>Anti-DDoS tingkat enterprise murni.</span>
              </li>
              <li className="flex items-center gap-3 text-white font-medium">
                <CheckCircle2 className="text-green-400 w-5 h-5 flex-shrink-0" />
                <span>Skor performa sempurna di Google Lighthouse.</span>
              </li>
            </ul>
          </motion.div>

          {/* Lighthouse CSS Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Fake Laptop Frame */}
            <div className="w-full bg-gray-900 rounded-t-xl p-2 md:p-4 shadow-2xl border-t border-x border-gray-700 relative">
              <div className="w-full bg-white rounded-lg aspect-[4/3] md:aspect-video overflow-hidden flex items-center justify-center relative">

                {/* Simplified Lighthouse Score UI directly with CSS */}
                <div className="bg-gray-50 flex flex-col items-center justify-center p-4 md:p-8 w-full h-full">
                  <div className="text-center mb-4 md:mb-8">
                    <span className="text-[8px] md:text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1 md:mb-2">Simulasi Hasil Audit Independen</span>
                    <h3 className="text-lg md:text-2xl font-bold text-gray-800 leading-tight">Google Lighthouse Score</h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-2xl">
                    {scores.map((score, i) => (
                      <motion.div
                        key={score.label}
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 + (i * 0.1), type: "spring" }}
                        className="flex flex-col items-center"
                      >
                        <div className="w-12 h-12 md:w-20 lg:w-24 md:h-20 lg:h-24 rounded-full border-[4px] md:border-[6px] border-green-500 flex items-center justify-center bg-green-50 shadow-[0_0_15px_rgba(34,197,94,0.3)] mb-2 md:mb-3">
                          <span className="text-base md:text-2xl lg:text-3xl font-black text-green-600">{score.value}</span>
                        </div>
                        <span className="text-[8px] md:text-[10px] lg:text-xs font-bold text-gray-600 uppercase text-center max-w-[60px] md:max-w-[80px]">
                          {score.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
            {/* Laptop Base */}
            <div className="w-[110%] -ml-[5%] h-4 bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-xl shadow-2xl border-b border-x border-gray-400 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-1 bg-gray-400 rounded-b-md"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
