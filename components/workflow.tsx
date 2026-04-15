"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";

const phases = [
  {
    id: "01",
    title: "Diskusi & Perencanaan",
    description: "Kami memulai dengan memahami tujuan bisnis, target pelanggan, dan arah strategi digital Anda.",
    icon: <Search className="w-7 h-7 text-primary-navy" />,
  },
  {
    id: "02",
    title: "Merajut Pesan & Desain",
    description: "Tim ahli kami mulai merangkai kata-kata yang memikat dipadukan visual yang mewah, mengubah pengunjung yang mampir menjadi pelanggan yang lebih percaya.",
    icon: <PenTool className="w-7 h-7 text-primary-navy" />,
  },
  {
    id: "03",
    title: "Pembangunan & Uji Coba",
    description: "Perakitan mesin dimulai. Kami tekun merakit kode, memastikan semua tombol berfungsi dengan baik, ringan dibuka, dan bebas dari eror-eror menyebalkan.",
    icon: <Code className="w-7 h-7 text-primary-navy" />,
  },
  {
    id: "04",
    title: "Rilis & Pengawalan Terus",
    description: "Akhirnya, toko digital Anda resmi buka 24 jam! Anda cukup fokus urus pesanan, sementara kami berjaga di belakang memastikan web tetap aman dan lancar.",
    icon: <Rocket className="w-7 h-7 text-primary-navy" />,
  },
];

export function Workflow() {
  return (
    <section className="py-24 bg-light-grey relative overflow-hidden">

      {/* Square grid pattern — workspace aesthetic */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(0,0,0,0.055) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(0,0,0,0.055) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '44px 44px',
        }}
      />

      {/* Corner vignette — darkens edges, clears the center */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.22) 100%)',
        }}
      />

      <div className="w-full mx-auto px-4 md:px-12 lg:px-20 relative z-10">

        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-navy leading-tight">
            Alur Kerja Sistematis<br className="hidden md:block" />
            <span className="italic font-serif text-accent-orange">Standar Premium</span>
          </h2>
        </div>

        {/* ── Desktop: Zigzag Timeline ── */}
        <div className="hidden md:block relative" style={{ minHeight: '600px' }}>

          {/* Animated center line */}
          <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-gray-200 rounded-full z-0 overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-accent-orange"
            />
          </div>

          {/* Cards — absolute flex filling the container */}
          <div className="absolute inset-0 flex gap-5 xl:gap-8">
            {phases.map((phase, index) => {
              const isTop = index % 2 === 0;
              const rotation = [2, -2, -3, 3][index % 4];

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    rotate: rotation,
                    boxShadow: "0 10px 30px -10px rgba(245, 158, 11, 0.15)",
                  }}
                  whileHover={{ scale: 1.04, rotate: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  style={{ alignSelf: isTop ? "flex-start" : "flex-end" }}
                  className="flex-1 bg-white/95 backdrop-blur-xl p-6 xl:p-8 rounded-[2.5rem] border border-gray-100 flex flex-col items-start gap-3 hover:border-accent-orange/40 relative group"
                >
                  {/* Dot at center-line level */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-white bg-accent-orange shadow-lg z-20"
                    style={{ [isTop ? 'bottom' : 'top']: '-2.75rem' }}
                  />
                  {/* Short vertical connector */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gray-200 z-0"
                    style={{
                      [isTop ? 'bottom' : 'top']: '-2.5rem',
                      height: '2.5rem',
                    }}
                  />

                  <div className="w-14 h-14 rounded-3xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    {phase.icon}
                  </div>

                  <div>
                    <div className="flex items-end gap-3 mb-3">
                      <span className="text-4xl font-serif italic font-light text-gray-200 leading-none group-hover:text-accent-orange/20 transition-colors duration-500">
                        {phase.id}
                      </span>
                      <h3 className="text-xl xl:text-2xl font-black text-primary-navy tracking-tight leading-tight">
                        {phase.title}
                      </h3>
                    </div>
                    <p className="text-gray-500 font-medium leading-relaxed text-sm">
                      {phase.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile: Vertical Stack ── */}
        <div className="flex flex-col gap-5 md:hidden">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/95 p-6 rounded-[2.5rem] border border-gray-100 flex flex-col gap-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100">
                {phase.icon}
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-serif italic text-gray-200">{phase.id}</span>
                <h3 className="text-lg font-black text-primary-navy">{phase.title}</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{phase.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
