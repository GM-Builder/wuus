"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ChevronRight, ArrowLeft, RefreshCcw, CheckCircle2, Store, Megaphone, ShoppingCart, Globe, Layout, TrendingUp } from "lucide-react";

// --- Components ---

const RadarChart = ({ data }: { data: { name: string; score: number }[] }) => {
  const size = 200;
  const center = size / 2;
  const radius = size * 0.4;
  const angleStep = (Math.PI * 2) / data.length;

  const points = data.map((d, i) => {
    const r = (d.score / 100) * radius;
    const x = center + r * Math.sin(i * angleStep);
    const y = center - r * Math.cos(i * angleStep);
    return `${x},${y}`;
  }).join(" ");

  const bgCircles = [0.2, 0.4, 0.6, 0.8, 1].map((p) => {
    const r = p * radius;
    return <circle key={p} cx={center} cy={center} r={r} fill="none" stroke="#E5E7EB" strokeWidth="1" />;
  });

  const axes = data.map((d, i) => {
    const x = center + radius * Math.sin(i * angleStep);
    const y = center - radius * Math.cos(i * angleStep);
    return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#E5E7EB" strokeWidth="1" />;
  });

  return (
    <div className="relative w-full aspect-square flex items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {bgCircles}
        {axes}
        <polygon points={points} fill="rgba(255, 153, 0, 0.2)" stroke="#FF9900" strokeWidth="2" />
        {data.map((d, i) => {
          const x = center + (radius + 20) * Math.sin(i * angleStep);
          const y = center - (radius + 20) * Math.cos(i * angleStep);
          return (
            <text
              key={i}
              x={x}
              y={y}
              fontSize="10"
              fontWeight="800"
              textAnchor="middle"
              className="fill-gray-400 uppercase tracking-tighter"
            >
              {d.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

const LineChart = () => (
  <div className="w-full h-24 mt-4">
    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="line-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF9900" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FF9900" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0,80 C50,70 100,90 150,60 S250,20 300,50 S350,10 400,30 V100 H0 Z" fill="url(#line-grad)" />
      <path d="M0,80 C50,70 100,90 150,60 S250,20 300,50 S350,10 400,30" fill="none" stroke="#FF9900" strokeWidth="3" strokeLinecap="round" />
      {[0, 100, 200, 300, 400].map((x, i) => {
        const y = [80, 85, 40, 50, 30][i];
        return <circle key={i} cx={x} cy={y} r="4" fill="white" stroke="#FF9900" strokeWidth="2" />;
      })}
    </svg>
  </div>
);

const DonutChart = () => (
  <div className="relative w-24 h-24 mx-auto">
    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="15" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#FF9900" strokeWidth="15" strokeDasharray="180 251" strokeLinecap="round" />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
       <span className="text-xs font-black text-primary-navy">72%</span>
    </div>
  </div>
);

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

  const calculateScore = () => {
    const totalRaw = answers.reduce((a, b) => a + (b === -1 ? 0 : b), 0);
    const maxRaw = 150;
    return Math.round((totalRaw / maxRaw) * 100);
  };

  const getCategoryScores = () => {
    const presence = [answers[0], answers[2], answers[3]].reduce((a, b) => a + (b === -1 ? 0 : b), 0);
    const marketing = [answers[1], answers[6], answers[9], answers[10], answers[13]].reduce((a, b) => a + (b === -1 ? 0 : b), 0);
    const operations = [answers[4], answers[5], answers[11]].reduce((a, b) => a + (b === -1 ? 0 : b), 0);
    const technology = [answers[7], answers[8], answers[12], answers[14]].reduce((a, b) => a + (b === -1 ? 0 : b), 0);

    return [
      { name: "Presence", score: Math.round((presence / 30) * 100), icon: Globe },
      { name: "Marketing", score: Math.round((marketing / 50) * 100), icon: Megaphone },
      { name: "Operations", score: Math.round((operations / 30) * 100), icon: Store },
      { name: "Tech", score: Math.round((technology / 40) * 100), icon: ShoppingCart },
    ];
  };

  const getResultFeedback = (score: number) => {
    if (score < 40) {
      return {
        title: "Sangat Membutuhkan Digitalisasi!",
        desc: "Skor Anda menunjukkan bahwa operasi bisnis masih sangat manual dan tertinggal di era digital. Anda berpotensi kehilangan banyak calon pelanggan potensial.",
        advice: "Saran: Segera bangun pondasi digital Anda. Memiliki website profesional adalah langkah pertama untuk membangun kredibilitas.",
        color: "text-red-500",
      };
    } else if (score < 70) {
      return {
        title: "Memiliki Potensi, Namun Belum Optimal",
        desc: "Bisnis Anda sudah berjalan dan memiliki beberapa channel digital (seperti sosmed), namun belum terintegrasi dengan baik.",
        advice: "Saran: Saatnya naik level dengan membuat hub pusat informasi (website). Dengan website profesional, Anda bisa meningkatkan kepercayaan pelanggan.",
        color: "text-accent-orange",
      };
    } else if (score < 90) {
      return {
        title: "Kredibilitas Sudah Baik",
        desc: "Anda memiliki pemahaman digital yang kuat dan fundamental yang baik. Pelanggan sudah bisa menemukan Anda.",
        advice: "Saran: Tingkatkan kualitas visual dan user-experience (UX) Anda ke tingkat premium. Kami merekomendasikan redesign fitur spesifik.",
        color: "text-secondary-blue",
      };
    } else {
      return {
        title: "Sangat Profesional & Digital-Ready!",
        desc: "Luar biasa! Sistem digital bisnis Anda sudah sangat mapan. Anda memanfaatkan teknologi untuk efisiensi.",
        advice: "Saran: Pertahankan performa ini! Jika Anda butuh pengembangan sistem kustom yang lebih kompleks, kami siap membantu.",
        color: "text-green-500",
      };
    }
  };

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

  return (
    <main className="flex min-h-screen flex-col w-full bg-[#F8F9FA]">
      <Navbar />

      <section className="relative pt-32 pb-24 flex-grow flex flex-col items-center px-4">
        <div className="container mx-auto max-w-6xl relative z-10 w-full">
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-3xl mx-auto bg-white rounded-[2rem] p-6 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 min-h-[500px] flex flex-col"
              >
                {/* Progress */}
                <div className="mb-10">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-orange block mb-1">Digital Maturity Test</span>
                      <h2 className="text-xl font-black text-primary-navy">Langkah {currentQuestionIdx + 1} dari {questions.length}</h2>
                    </div>
                    <span className="text-2xl font-black text-primary-navy/20 italic">{Math.round(((currentQuestionIdx + 1) / questions.length) * 100)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent-orange"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="mb-10 flex-grow">
                  <h3 className="text-2xl md:text-3xl font-black text-primary-navy leading-tight mb-10">
                    {questions[currentQuestionIdx].question}
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    {questions[currentQuestionIdx].options.map((option, idx) => {
                      const isSelected = answers[currentQuestionIdx] === option.score;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(option.score)}
                          className={`w-full text-left px-8 py-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group relative overflow-hidden ${
                            isSelected
                              ? "border-accent-orange bg-accent-orange/5 text-primary-navy font-bold"
                              : "border-gray-50 hover:border-gray-200 bg-gray-50/50 text-gray-500 hover:text-primary-navy"
                          }`}
                        >
                          <span className="relative z-10 text-lg">{option.text}</span>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "border-accent-orange bg-accent-orange text-white" : "border-gray-200 group-hover:border-gray-400"}`}>
                            {isSelected && <CheckCircle2 className="w-4 h-4" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Nav */}
                <div className="flex justify-between mt-auto pt-8 border-t border-gray-100">
                  <button
                    onClick={handleBack}
                    disabled={currentQuestionIdx === 0}
                    className={`flex items-center gap-2 px-6 py-2 font-black uppercase tracking-widest text-[10px] transition-colors ${
                      currentQuestionIdx === 0 ? "text-gray-300 cursor-not-allowed" : "text-primary-navy hover:text-accent-orange"
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" /> Sebelumnya
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
              >
                {/* Result Dashboard Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left Column: Main Score & Analysis */}
                  <div className="lg:col-span-8 space-y-6">
                    
                    {/* Hero Score Card */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange/5 rounded-full blur-[80px] -mr-32 -mt-32" />
                      
                      {/* Gauge */}
                      <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="44" fill="none" stroke="#F1F5F9" strokeWidth="10" />
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="44"
                            fill="none"
                            stroke="#FF9900"
                            strokeWidth="10"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: "0 276" }}
                            animate={{ strokeDasharray: `${(calculateScore() / 100) * 276} 276` }}
                            transition={{ duration: 2, ease: "circOut" }}
                          />
                          {/* Accent Navy segment like in image */}
                          <circle 
                            cx="50" cy="50" r="44" 
                            fill="none" 
                            stroke="#1C2733" 
                            strokeWidth="10" 
                            strokeDasharray="20 276" 
                            strokeDashoffset="-10"
                            className="opacity-20"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <motion.span 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-6xl md:text-7xl font-black text-primary-navy tabular-nums"
                          >
                            {calculateScore()}
                          </motion.span>
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Total Score</span>
                        </div>
                      </div>

                      <div className="flex-grow text-center md:text-left z-10">
                        <div className="inline-block px-4 py-1.5 bg-accent-orange/10 rounded-full mb-6">
                           <span className="text-[10px] font-black uppercase tracking-widest text-accent-orange">Analysis Report</span>
                        </div>
                        <h2 className={`text-3xl md:text-5xl font-black mb-4 leading-tight ${getResultFeedback(calculateScore()).color}`}>
                          {getResultFeedback(calculateScore()).title}
                        </h2>
                        <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                          {getResultFeedback(calculateScore()).desc}
                        </p>
                        <p className="mt-4 text-sm text-gray-500">
                          Skor dihitung di browser Anda. Jawaban dan hasil tes tidak dikirim ke WUUS.
                        </p>
                      </div>
                    </div>

                    {/* Dimension Grid */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-50">
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                          {getCategoryScores().map((cat, i) => (
                            <motion.div 
                              key={cat.name}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.8 + (i * 0.1) }}
                              className="flex flex-col items-center text-center group transition-all"
                            >
                              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-accent-orange/10 transition-colors border border-gray-100">
                                <cat.icon size={24} className="text-primary-navy group-hover:text-accent-orange transition-colors" />
                              </div>
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{cat.name}</h4>
                              <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden mb-3">
                                <motion.div 
                                  className="h-full bg-accent-orange"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${cat.score}%` }}
                                  transition={{ duration: 1.5, delay: 1 }}
                                />
                              </div>
                              <span className="text-lg font-black text-primary-navy">{cat.score}%</span>
                            </motion.div>
                          ))}
                       </div>
                       
                       {/* Line Chart below Dimension Grid */}
                       <div className="mt-12 pt-8 border-t border-gray-50">
                          <div className="flex items-center justify-between mb-6">
                             <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-navy">Growth Projection & Industry Benchmarks</h4>
                             <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                   <div className="w-2 h-2 rounded-full bg-accent-orange" />
                                   <span className="text-[10px] font-bold text-gray-400">Current</span>
                                </div>
                                <div className="flex items-center gap-2">
                                   <div className="w-2 h-2 rounded-full bg-gray-200" />
                                   <span className="text-[10px] font-bold text-gray-400">Average</span>
                                </div>
                             </div>
                          </div>
                          <LineChart />
                       </div>
                    </div>

                    {/* Advice Card */}
                    <div className="bg-primary-navy rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full" />
                       <div className="flex items-start gap-6 relative z-10">
                          <div className="w-12 h-12 rounded-2xl bg-accent-orange flex items-center justify-center shrink-0">
                             <TrendingUp className="text-white" size={24} />
                          </div>
                          <div>
                             <h3 className="text-xl font-black uppercase tracking-widest mb-3 italic">Strategic Advice</h3>
                             <p className="text-gray-400 text-lg leading-relaxed font-medium">
                                {getResultFeedback(calculateScore()).advice}
                             </p>
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* Right Column: Radar Chart & Metrics */}
                  <div className="lg:col-span-4 space-y-6">
                    
                    {/* Radar Chart Card */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-50">
                      <div className="text-center mb-6">
                         <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary-navy">Digital Maturity Map</h4>
                      </div>
                      <RadarChart data={getCategoryScores()} />
                    </div>

                    {/* Segment Analysis like in image */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-50">
                       <div className="text-center mb-8">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-navy mb-6">Engagement Score</h4>
                          <DonutChart />
                       </div>
                       <div className="space-y-6">
                          <div className="flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-accent-orange" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Industry Avg</span>
                             </div>
                             <span className="text-xs font-bold tabular-nums">64%</span>
                          </div>
                          <div className="flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary-navy" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Your Potential</span>
                             </div>
                             <span className="text-xs font-bold text-green-500 tabular-nums">92%</span>
                          </div>
                       </div>
                    </div>

                    {/* CTAs */}
                    <div className="space-y-4 pt-4">
                      <Link
                        href="/inquiries"
                        className="flex w-full px-8 py-5 bg-accent-orange hover:bg-accent-yellow text-primary-navy font-black text-xs tracking-[0.2em] transition-all shadow-[6px_6px_0px_0px_#1C2733] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1C2733] border-2 border-primary-navy uppercase rounded-xl cursor-pointer justify-center items-center text-center"
                      >
                        Minta Estimasi & Proposal
                      </Link>
                      <button
                        onClick={() => {
                          setAnswers(Array(questions.length).fill(-1));
                          setCurrentQuestionIdx(0);
                          setIsFinished(false);
                        }}
                        className="w-full px-8 py-5 bg-white hover:bg-gray-50 text-primary-navy font-black text-[10px] tracking-[0.2em] transition-all border-2 border-gray-200 hover:border-primary-navy rounded-xl uppercase flex items-center justify-center gap-2"
                      >
                        <RefreshCcw className="w-4 h-4" /> Ulangi Test
                      </button>
                    </div>

                  </div>

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
