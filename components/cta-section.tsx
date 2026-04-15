"use client";


import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function CtaSection() {
  const whatsappNumber = "6281383521750";
  const waUrl = `https://wa.me/${whatsappNumber}?text=Halo%20tim%20WUUS,%20saya%20ingin%20konsultasi%20pembuatan%20website.`;

  return (
    <section id="cta" className="py-24 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary-navy rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(28,39,51,0.3)]"
        >
          {/* Abstract Brush Decor */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent-orange/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary-blue rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Siap untuk <span className="text-accent-orange">Mendigitalisasi</span> <br className="hidden md:block" />Bisnis Anda?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Berhenti menunda! Banyak pelanggan mencari layanan seperti milik Anda setiap hari. Website yang tepat membantu mereka menemukan Anda lebih mudah.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-accent-orange hover:bg-accent-yellow text-primary-navy rounded-sm font-black text-lg shadow-[6px_6px_0px_0px_white] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_white] transition-all uppercase tracking-wide"
              >
                <MessageCircle size={24} />
                Diskusikan Kebutuhan Website Anda
              </a>
            </div>

            <p className="mt-6 text-sm text-gray-400 font-medium">Kami membantu Anda menentukan solusi terbaik untuk bisnis Anda.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

