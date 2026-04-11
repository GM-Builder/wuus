"use client";

import { motion } from "framer-motion";

const brands = [
  "Warung Kopi Senja", "Laundry Express", "Berkah Motor", "Toko Maju Jaya", 
  "Klinik Gigi Sehat", "Bimbel Prestasi", "Cafe Ruang Hati", "Distro Kekinian",
  "Apotek Keluarga", "Catering Ibu"
];

export function MarqueeBrands() {
  return (
    <section className="bg-secondary-blue text-white pb-16 pt-4 relative z-10 border-b-8 border-accent-orange">
      <div className="container mx-auto px-4 max-w-7xl mb-12 relative z-30 -mt-8 md:-mt-20">
        {/* DDI Style Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
          <div className="p-4">
            <h3 className="text-5xl font-bold mb-2 tracking-tight">8,750+</h3>
            <p className="text-xs uppercase tracking-widest text-gray-300 font-bold">Jam Terselamatkan</p>
            <p className="text-xs text-gray-400 mt-1">Setiap Tahunnya</p>
          </div>
          <div className="p-4">
            <h3 className="text-5xl font-bold mb-2 tracking-tight">300%</h3>
            <p className="text-xs uppercase tracking-widest text-gray-300 font-bold">Peningkatan Omzet</p>
            <p className="text-xs text-gray-400 mt-1">Rata-rata UMKM</p>
          </div>
          <div className="p-4">
            <h3 className="text-5xl font-bold mb-2 tracking-tight">1.5</h3>
            <p className="text-xs uppercase tracking-widest text-gray-300 font-bold">Detik Load Time</p>
            <p className="text-xs text-gray-400 mt-1">Sangat Cepat</p>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-[0.2em]">
          Dipercaya oleh UMKM Seluruh Indonesia
        </p>
      </div>
      
      {/* Marquee Animation */}
      <div className="w-full flex overflow-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex whitespace-nowrap items-center gap-16 px-8"
        >
          {/* Double array for seamless looping */}
          {[...brands, ...brands].map((brand, i) => (
            <div key={i} className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-lg">
                {brand.charAt(0)}
              </div>
              <span className="text-xl font-bold text-gray-300 tracking-wide">{brand}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
