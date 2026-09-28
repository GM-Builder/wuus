"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Kenapa WUUS tidak menggunakan WordPress atau template biasa?",
    answer: "WordPress rentan plugin rusak, lambat (3–5 detik loading), dan rawan celah keamanan. Kami membangun website menggunakan Next.js 16 Edge Architecture — teknologi yang sama digunakan platform global seperti Nike dan TikTok — dengan kecepatan sub-800ms dan keamanan tingkat tinggi."
  },
  {
    question: "Bagaimana cara kerja garansi staging-first 50/50?",
    answer: "Sangat transparan: Anda membayar DP 50% untuk memulai pengerjaan. Dalam 3-5 hari kerja, kami memberikan link privat yang bisa Anda buka dan uji coba langsung di handphone Anda sendiri. Pelunasan sisa 50% hanya dibayarkan setelah Anda 100% puas dengan hasilnya."
  },
  {
    question: "Apakah sistem pembayaran Mayar mendukung kartu kredit luar negeri?",
    answer: "Ya. Mayar.id terintegrasi dengan jaringan pembayaran global, mendukung pembayaran QRIS, Virtual Account bank-bank besar Indonesia, serta Visa dan Mastercard dari tamu atau klien internasional secara instan."
  },
  {
    question: "Bagaimana cara kerja 24/7 AI Guest Concierge?",
    answer: "AI Concierge dilatih khusus menggunakan dokumen SOP, panduan kamar, fasilitas, dan peraturan tempat Anda (Strict RAG). AI dapat menjawab pertanyaan tamu dalam 20+ bahasa (Jerman, Inggris, Italia, dsb.) secara otomatis dalam 1.2 detik tanpa halusinasi, dan bisa mengalihkan pesan ke WhatsApp jika diperlukan."
  },
  {
    question: "Berapa lama proses pengerjaan dari awal hingga online?",
    answer: "Proses pengerjaan standar kami adalah 7 hari kerja. Hari 1 brief & rancangan, Hari 3–5 link staging aktif untuk uji coba di HP Anda, Hari 7 integrasi domain, pembayaran, dan serah terima penuh."
  }
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#F8F9FA] border-b border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
            PERTANYAAN UMUM
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C2733] tracking-tight">
            Semua yang perlu Anda ketahui
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white border rounded-2xl overflow-hidden transition-all ${
                  isOpen ? "border-[#F59E0B] shadow-sm" : "border-slate-200/90 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className={`font-bold text-base sm:text-lg tracking-tight pr-4 ${
                    isOpen ? "text-[#1C2733]" : "text-slate-800"
                  }`}>
                    {faq.question}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen ? "bg-[#F59E0B] text-[#1C2733]" : "bg-slate-100 text-slate-500"
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
                      <div className="px-6 pb-6 sm:px-8 sm:pb-7 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 font-medium">
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
