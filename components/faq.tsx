"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Berapa lama proses pembuatan website?",
    answer: "Sangat cepat! Untuk paket standar, website Anda siap online dalam waktu 3-7 hari kerja setelah semua data dan materi (foto/teks) kami terima."
  },
  {
    question: "Apakah saya harus mengerti coding?",
    answer: "Sama sekali tidak! Fokus urus bisnis Anda, biar urusan pusing kode dan server kami yang tangani sepenuhnya. Ini adalah sistem beres terima jadi."
  },
  {
    question: "Apakah sudah termasuk Domain dan Hosting?",
    answer: "Ya! Paket layanan kami sudah mencakup nama domain profesional (.com/.id) dan hosting berkecepatan tinggi selama 1 tahun pertama."
  },
  {
    question: "Bagaimana jika saya ingin tambah halaman di kemudian hari?",
    answer: "Anda cukup membeli Add-ons berupa halaman tambahan dengan biaya yang sangat terjangkau, tanpa harus membuat website baru dari nol."
  }
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-[0.2em] text-accent-orange uppercase mb-4 block">
            Informasi Tambahan
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-navy">
            Pertanyaan yang Sering<br className="hidden md:block" />
            <span className="italic font-serif text-gray-500">Diajukan Klien</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-accent-orange shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left bg-white"
              >
                <span className={`font-bold text-lg ${openIndex === index ? 'text-primary-navy' : 'text-gray-700'}`}>
                  {faq.question}
                </span>
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? 'bg-accent-orange text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

