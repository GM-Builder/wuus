"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Kenapa WUUS tidak menggunakan WordPress atau template biasa?",
    answer: "WordPress rentan plugin rusak, lambat (3-5 detik loading), dan rawan celah keamanan. Kami membangun website menggunakan arsitektur modern berkecepatan tinggi dengan waktu muat di bawah 1 detik, aman dari celah peretasan, dan dirancang khusus sesuai identitas bisnis Anda."
  },
  {
    question: "Bagaimana cara kerja garansi staging-first 50/50?",
    answer: "Sangat transparan: Anda membayar DP 50% untuk memulai pengerjaan. Dalam 3-5 hari kerja, kami memberikan link privat yang bisa Anda buka dan uji coba langsung di handphone Anda sendiri. Pelunasan sisa 50% hanya dibayarkan setelah Anda 100% puas dengan hasilnya."
  },
  {
    question: "Apakah sistem pembayaran otomatis mendukung kartu kredit dan pembayaran digital?",
    answer: "Ya. Sistem pembayaran terintegrasi dengan jaringan pembayaran resmi, mendukung QRIS semua aplikasi, Virtual Account bank-bank besar Indonesia, serta kartu kredit Visa dan Mastercard internasional secara instan dan aman langsung ke rekening Anda."
  },
  {
    question: "Bagaimana cara kerja asisten AI customer service 24 jam?",
    answer: "Asisten AI dilatih khusus menggunakan panduan produk, katalog, daftar harga, dan prosedur bisnis Anda. AI dapat menjawab pertanyaan calon pembeli secara akurat dalam 1-2 detik tanpa menunggu jam kerja kantor, serta mengarahkan pesanan langsung ke WhatsApp Anda."
  },
  {
    question: "Berapa lama proses pengerjaan dari awal hingga online?",
    answer: "Proses pengerjaan standar kami adalah 7 hari kerja. Hari 1 brief dan rancangan konsep, Hari 3-5 link staging aktif untuk uji coba langsung di handphone Anda, Hari 7 integrasi domain, aktivasi pembayaran, dan serah terima penuh."
  }
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
            PERTANYAAN UMUM
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C2733] tracking-tight">
            Semua yang perlu Anda ketahui
          </h2>
        </div>

        {/* Accordion (Flat, Clean, No Shadows) */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white border rounded-xl overflow-hidden transition-colors ${
                  isOpen ? "border-[#1C2733]" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 sm:px-7 sm:py-6 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className={`font-bold text-base sm:text-lg tracking-tight pr-4 ${
                    isOpen ? "text-[#1C2733]" : "text-slate-800"
                  }`}>
                    {faq.question}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? "bg-[#1C2733] text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
