"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Briefcase, Activity, TrendingUp, CheckCircle } from "lucide-react";
import Image from "next/image";

const features = [
  {
    id: 1,
    title: "Citra Profesional",
    description: "Desain yang membangun kepercayaan sejak interaksi pertama.",
    image: "/images/card1-carousel.png",
  },
  {
    id: 2,
    title: "Performa Cepat",
    description: "Website yang responsif dan siap melayani pengunjung tanpa jeda.",
    image: "/images/card2-carousel.png",
  },
  {
    id: 3,
    title: "Estetika Premium",
    description: "Tampilan yang dirancang dengan standar visual modern dan elegan.",
    image: "/images/card3-carousel.png",
  },
  {
    id: 4,
    title: "Operasional Lancar",
    description: "Kami menangani teknisnya, sehingga Anda dapat fokus pada pertumbuhan bisnis.",
    image: "/images/card4-carousel.png",
  },
];

export function BentoFeatures() {
  const [index, setIndex] = useState(1);

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => setIndex((prev) => (prev + 1) % features.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + features.length) % features.length);

  const getCardStyle = (i: number) => {
    const diff = (i - index + features.length) % features.length;
    if (diff === 0) return "active";
    if (diff === 1 || diff === -(features.length - 1)) return "right";
    if (diff === features.length - 1 || diff === -1) return "left";
    return "hidden";
  };

  return (
    <section id="services" className="py-24 bg-light-grey relative overflow-hidden">

      {/* Background texture localized - From your source code */}
      <div className="absolute inset-0 bg-[url('/patterns/cubes.png')] opacity-[1.75] pointer-events-none z-0" />

      {/* Depth lighting blobs - From your source code */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* Header - From your source code style */}
        <div className="text-center mb-24 relative">
          <div className="inline-block relative mb-4">
            <div className="absolute inset-0 bg-gray-200 opacity-60 rounded-sm transform -rotate-1 scale-x-110" style={{ filter: "blur(2px)" }} />
            <span className="relative text-sm font-bold tracking-[0.2em] text-gray-500 uppercase px-4 z-10 block py-1">
              Solusi Website UMKM
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-primary-navy max-w-4xl mx-auto leading-tight">
            Bikin Usaha Anda Naik Kelas dengan <br className="hidden md:block" />
            <span className="italic font-serif text-accent-orange">Website Premium</span> Performa Tinggi
          </h2>
        </div>

        {/* 3D Center-Focused Carousel - Preserved logic */}
        <div className="relative h-[450px] md:h-[600px] flex items-center justify-center max-w-6xl mx-auto mb-20">
          <button
            onClick={handlePrev}
            className="absolute left-0 md:-left-8 z-50 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all text-primary-navy"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="relative w-full h-full flex items-center justify-center">
            {features.map((feature, i) => {
              const style = getCardStyle(i);
              if (style === "hidden") return null;

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    scale: style === "active" ? 1 : 0.8,
                    x: style === "active" ? 0 : style === "right" ? "60%" : "-60%",
                    opacity: style === "active" ? 1 : 0.5,
                    zIndex: style === "active" ? 20 : 10,
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute w-[300px] md:w-[480px] p-4 md:p-6 bg-primary-navy rounded-[3rem] border border-white/5 shadow-2xl cursor-pointer
                    ${style === "active" ? 'border-accent-orange/30' : ''}
                  `}
                  onClick={() => setIndex(i)}
                >
                  {/* Dark Hybrid Card Style */}
                  <div className="bg-secondary-blue/50 rounded-[2rem] w-full aspect-[16/10] relative overflow-hidden mb-8 shadow-inner">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      priority
                      loading="eager"
                      className="object-cover opacity-80"
                      sizes="600px"
                    />
                  </div>

                  <div className="px-4 pb-8 text-center">
                    <h3 className="text-white text-2xl md:text-3xl font-black mb-3 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed max-w-sm mx-auto">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            className="absolute right-0 md:-right-8 z-50 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all text-primary-navy"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mb-24">
          {features.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 transition-all duration-500 rounded-full ${i === index ? 'w-12 bg-primary-navy' : 'w-6 bg-gray-200'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Paper Clipping Quote - From your source code */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-28 max-w-md mx-auto relative"
        >
          <div
            className="relative px-6 py-8 bg-[#fdfaf0] border border-gray-200/60 cursor-default"
            style={{
              transform: "rotate(3deg)",
              boxShadow: "4px 8px 32px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.06)",
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "rotate(1deg)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "rotate(3deg)")}
          >
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-7 bg-white/90 border border-white/40"
              style={{
                transform: "translateX(-50%) rotate(-2deg)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            />

            <div className="text-[9px] font-black tracking-[0.25em] text-gray-400 uppercase mb-5 text-center">
              Strategic Partnership
            </div>
            <p
              className="text-2xl text-primary-navy leading-relaxed text-center px-2"
              style={{ fontWeight: 600 }}
            >
              "Website yang dirancang dengan baik bukan sekadar tampilan, tapi fondasi kepercayaan digital."
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}