"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ChevronRight, ArrowLeft, RefreshCcw, CheckCircle2 } from "lucide-react";

// --- Data Kuisioner ---
const questions = [
  {
    id: 1,
    question: "Apakah bisnis Anda sudah memiliki website resmi?",
    options: [
      { text: "Sudah, dan profesional", score: 10 },
      { text: "Sudah, tapi gratisan/kurang terawat", score: 5 },
      { text: "Sedang dalam proses pembuatan", score: 3 },
      { text: "Belum sama sekali", score: 0 },
    ],
  },
  {
    id: 2,
    question: "Bagaimana cara pelanggan baru menemukan bisnis Anda saat ini?",
    options: [
      { text: "Dari pencarian organik Google/Website", score: 10 },
      { text: "Iklan berbayar & Media Sosial", score: 7 },
      { text: "Referensi / Word of Mouth", score: 5 },
      { text: "Belum tahu / Masih mencari cara", score: 0 },
    ],
  },
  {
    id: 3,
    question: "Ketika dicari di Google menggunakan nama bisnis, apa yang muncul?",
    options: [
      { text: "Website resmi kami di halaman pertama", score: 10 },
      { text: "Media sosial bisnis kami", score: 7 },
      { text: "Direktori bisnis/berita", score: 5 },
      { text: "Tidak ada yang relevan / web kompetitor", score: 0 },
    ],
  },
  {
    id: 4,
    question: "Seberapa profesional alamat email yang digunakan bisnis Anda?",
    options: [
      { text: "Menggunakan domain sendiri (nama@bisnisanda.com)", score: 10 },
      { text: "Menggunakan platform gratis seperti Gmail/Yahoo", score: 5 },
      { text: "Menggunakan email pribadi", score: 2 },
      { text: "Belum menggunakan email untuk bisnis", score: 0 },
    ],
  },
  {
    id: 5,
    question: "Bagaimana cara bisnis Anda memamerkan portofolio atau layanan?",
    options: [
      { text: "Terstruktur rapi di website dengan detail lengkap", score: 10 },
      { text: "Melalui file PDF/Presentasi yang dikirim manual", score: 6 },
      { text: "Hanya melalui postingan Media Sosial", score: 4 },
      { text: "Menjelaskan secara lisan saja", score: 0 },
    ],
  },
  {
    id: 6,
    question: "Apakah bisnis Anda bisa melayani pertanyaan dasar 24/7?",
    options: [
      { text: "Ya, website memiliki FAQ lengkap & form otomatis", score: 10 },
      { text: "Sebagian, ada chatbot di media sosial", score: 6 },
      { text: "Hanya pada jam operasional melalui WhatsApp", score: 3 },
      { text: "Tidak, pelanggan harus menunggu respon manual kami", score: 0 },
    ],
  },
  {
    id: 7,
    question: "Bagaimana tingkat kepercayaan pelanggan potensial ketika pertama berinteraksi?",
    options: [
      { text: "Sangat percaya, konversi sangat mudah", score: 10 },
      { text: "Cukup percaya, tapi butuh beberapa pertanyaan konfirmasi", score: 7 },
      { text: "Sering membandingkan dengan kompetitor dulu", score: 4 },
      { text: "Sering ragu dan akhirnya batal", score: 0 },
    ],
  },
  {
    id: 8,
    question: "Apakah Anda dapat melacak berapa banyak pengunjung yang tertarik namun belum membeli?",
    options: [
      { text: "Ya, kami menggunakan Analytics/Pixel di website", score: 10 },
      { text: "Hanya melihat statistik/insight dari media sosial", score: 6 },
      { text: "Berdasarkan ingatan atau catatan manual", score: 3 },
      { text: "Tidak sama sekali", score: 0 },
    ],
  },
  {
    id: 9,
    question: "Seberapa mudah bagi pelanggan untuk mengetahui harga atau detail layanan Anda?",
    options: [
      { text: "Sangat mudah, semua informasi transparan di website", score: 10 },
      { text: "Cukup mudah, ada katalog di WhatsApp/Sosmed", score: 6 },
      { text: "Harus bertanya dulu melalui chat/telpon", score: 3 },
      { text: "Sulit, sering terjadi miskomunikasi", score: 0 },
    ],
  },
  {
    id: 10,
    question: "Dalam satu bulan terakhir, berapa persentase lead (prospek) yang datang secara organik?",
    options: [
      { text: "Di atas 50%", score: 10 },
      { text: "20% - 50%", score: 7 },
      { text: "Di bawah 20%", score: 4 },
      { text: "0% (semua dicari manual / hanya referral)", score: 0 },
    ],
  },
  {
    id: 11,
    question: "Menurut Anda, seberapa unggul citra (branding) bisnis Anda dibanding kompetitor?",
    options: [
      { text: "Sangat unggul & terlihat premium", score: 10 },
      { text: "Setara dengan kompetitor", score: 6 },
      { text: "Sedikit tertinggal", score: 3 },
      { text: "Sangat tertinggal", score: 0 },
    ],
  },
  {
    id: 12,
    question: "Jika ada prospek yang bertanya jam 2 pagi, apa yang terjadi?",
    options: [
      { text: "Mereka tetap bisa mempelajari layanan & mengisi form di web", score: 10 },
      { text: "Mereka mendapat balasan otomatis di WA/Sosmed", score: 6 },
      { text: "Pesan masuk tapi baru dibalas besok pagi secara manual", score: 3 },
      { text: "Tidak ada jalur komunikasi yang tersedia", score: 0 },
    ],
  },
  {
    id: 13,
    question: "Apakah bisnis Anda terlihat meyakinkan di mata investor/klien B2B besar?",
    options: [
      { text: "Ya, kami memiliki company profile web yang solid", score: 10 },
      { text: "Ya, kami menggunakan proposal PDF yang bagus", score: 7 },
      { text: "Cukup, walau hanya menggunakan media sosial", score: 4 },
      { text: "Tidak, kami kesulitan mendapatkan kepercayaan B2B", score: 0 },
    ],
  },
  {
    id: 14,
    question: "Seberapa cepat Anda dapat memperbarui informasi promosi ke seluruh audiens?",
    options: [
      { text: "Cepat (langsung tayang di banner web & tersebar luas)", score: 10 },
      { text: "Melalui status/story media sosial saja", score: 6 },
      { text: "Harus broadcast chat satu per satu secara manual", score: 3 },
      { text: "Sangat lambat / jarang promosi", score: 0 },
    ],
  },
  {
    id: 15,
    question: "Apakah Anda merasa bisnis Anda sudah memaksimalkan potensi digitalnya?",
    options: [
      { text: "Sudah sangat maksimal", score: 10 },
      { text: "Sudah cukup, tapi masih bisa ditingkatkan lagi", score: 7 },
      { text: "Masih banyak channel yang belum dieksplorasi", score: 4 },
      { text: "Belum maksimal sama sekali", score: 0 },
    ],
  },
];

export default function ScoreTestPage() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionSelect = (optionScore: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIdx] = optionScore;
    setAnswers(newAnswers);

    if (currentQuestionIdx < questions.length - 1) {
      setTimeout(() => setCurrentQuestionIdx((prev) => prev + 1), 300);
    } else {
      setTimeout(() => setIsFinished(true), 400);
    }
  };

  const handleBack = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    const totalRaw = answers.reduce((a, b) => a + (b === -1 ? 0 : b), 0);
    const maxRaw = 150;
    return Math.round((totalRaw / maxRaw) * 100);
  };

  const getResultFeedback = (score: number) => {
    if (score < 40) {
      return {
        title: "Sangat Membutuhkan Digitalisasi!",
        desc: "Skor Anda menunjukkan bahwa operasi bisnis masih sangat manual dan tertinggal di era digital. Anda berpotensi kehilangan banyak calon pelanggan potensial yang mencari layanan Anda melalui internet.",
        advice: "Saran: Segera bangun pondasi digital Anda. Memiliki website profesional adalah langkah pertama untuk membangun kredibilitas dan mempermudah akses informasi 24/7 bagi pelanggan Anda.",
        color: "text-red-500",
      };
    } else if (score < 70) {
      return {
        title: "Memiliki Potensi, Namun Belum Optimal",
        desc: "Bisnis Anda sudah berjalan dan memiliki beberapa channel digital (seperti sosmed), namun belum terintegrasi dengan baik. Konversi masih sering terhambat oleh proses manual.",
        advice: "Saran: Saatnya naik level dengan membuat hub pusat informasi (website). Dengan website profesional, Anda bisa meningkatkan kepercayaan pelanggan dan memangkas waktu menjawab pertanyaan yang berulang.",
        color: "text-accent-orange",
      };
    } else if (score < 90) {
      return {
        title: "Kredibilitas Sudah Baik",
        desc: "Anda memiliki pemahaman digital yang kuat dan fundamental yang baik. Pelanggan sudah bisa menemukan Anda, tapi masih ada celah untuk mengotomatisasi beberapa proses.",
        advice: "Saran: Tingkatkan kualitas visual dan user-experience (UX) Anda ke tingkat premium. Kami merekomendasikan redesign atau penambahan fitur spesifik agar Anda semakin menonjol dibanding kompetitor.",
        color: "text-secondary-blue",
      };
    } else {
      return {
        title: "Sangat Profesional & Digital-Ready!",
        desc: "Luar biasa! Sistem digital bisnis Anda sudah sangat mapan. Anda memanfaatkan teknologi untuk efisiensi dan memaksimalkan setiap prospek yang masuk.",
        advice: "Saran: Pertahankan performa ini! Jika Anda butuh pengembangan sistem kustom yang lebih kompleks (seperti dashboard manajemen, CRM, dll), kami siap membantu menskalakan bisnis Anda.",
        color: "text-green-500",
      };
    }
  };

  return (
    <main className="flex min-h-screen flex-col w-full bg-off-white">
      <Navbar />

      <section className="relative pt-32 pb-24 flex-grow flex items-center justify-center px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-blue/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto max-w-3xl relative z-10 w-full">
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl p-6 md:p-12 shadow-xl border border-gray-100 min-h-[450px] flex flex-col"
              >
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2 text-sm font-semibold text-gray-500">
                    <span>Pertanyaan {currentQuestionIdx + 1} dari {questions.length}</span>
                    <span>{Math.round(((currentQuestionIdx + 1) / questions.length) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent-orange"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="mb-8 flex-grow">
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-tight mb-6">
                    {questions[currentQuestionIdx].question}
                  </h2>

                  <div className="space-y-3">
                    {questions[currentQuestionIdx].options.map((option, idx) => {
                      const isSelected = answers[currentQuestionIdx] === option.score;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(option.score)}
                          className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${
                            isSelected
                              ? "border-accent-orange bg-accent-orange/5 text-primary-navy font-bold shadow-md"
                              : "border-gray-100 hover:border-gray-300 text-gray-600 hover:text-primary-navy"
                          }`}
                        >
                          <span>{option.text}</span>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-accent-orange bg-accent-orange text-white" : "border-gray-300 group-hover:border-gray-400"}`}>
                            {isSelected && <CheckCircle2 className="w-4 h-4" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Nav */}
                <div className="flex justify-between mt-auto pt-6 border-t border-gray-100">
                  <button
                    onClick={handleBack}
                    disabled={currentQuestionIdx === 0}
                    className={`flex items-center gap-2 px-4 py-2 font-semibold transition-colors ${
                      currentQuestionIdx === 0 ? "text-gray-300 cursor-not-allowed" : "text-primary-navy hover:text-accent-orange"
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" /> Sebelumnya
                  </button>
                  {/* Skip/Next not allowed, must click option */}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-8 md:p-14 shadow-2xl border border-gray-100 text-center"
              >
                {/* Score Circle */}
                <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full border-8 border-gray-50 flex items-center justify-center mb-8 relative shadow-inner">
                  <svg className="absolute top-0 left-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="#F3F4F6" strokeWidth="8" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="46"
                      fill="none"
                      stroke="#FF9900"
                      strokeWidth="8"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 289" }}
                      animate={{ strokeDasharray: `${(calculateScore() / 100) * 289} 289` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="text-center">
                    <span className="text-4xl md:text-5xl font-black text-primary-navy">{calculateScore()}</span>
                    <span className="text-sm font-bold text-gray-400 block mt-1">/ 100</span>
                  </div>
                </div>

                {/* Result Feedback */}
                <h2 className={`text-2xl md:text-4xl font-black mb-4 ${getResultFeedback(calculateScore()).color}`}>
                  {getResultFeedback(calculateScore()).title}
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {getResultFeedback(calculateScore()).desc}
                </p>
                <div className="bg-secondary-blue/5 border-l-4 border-secondary-blue p-6 rounded-r-xl text-left mb-10">
                  <p className="font-semibold text-primary-navy">{getResultFeedback(calculateScore()).advice}</p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                  <Link
                    href="/inquiries"
                    className="w-full sm:w-auto px-8 py-4 bg-accent-orange hover:bg-accent-yellow text-primary-navy font-black text-lg tracking-wide transition-all shadow-[6px_6px_0px_0px_#1C2733] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1C2733] border-2 border-primary-navy uppercase rounded-sm cursor-pointer"
                  >
                    Minta Proposal & Estimasi Gratis
                  </Link>
                  <button
                    onClick={() => {
                      setAnswers(Array(questions.length).fill(-1));
                      setCurrentQuestionIdx(0);
                      setIsFinished(false);
                    }}
                    className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-gray-50 text-primary-navy font-bold tracking-wide transition-all border-2 border-gray-200 hover:border-primary-navy rounded-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    <RefreshCcw className="w-5 h-5" /> Ulangi Test
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}
