"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={containerRef} className="relative bg-off-white pt-36 pb-32 lg:pt-48 lg:pb-48 overflow-hidden z-10" style={{ position: "relative" }}>
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-secondary-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent-orange/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-20 flex flex-col items-center">

        {/* Main Content constraints */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center px-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center w-full"
          >


            <h1 className="text-[2.5rem] min-[375px]:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-primary-navy tracking-tight leading-[1.05] mb-8">
              Jangan Biarkan <br className="hidden md:block" />
              Bisnis Anda <br className="hidden md:block" />
              Terlihat <span className="bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent italic">Amatir.</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-gray-500 max-w-2xl mb-12 font-medium leading-relaxed">
              Kami merancang website yang cepat, elegan, dan dirancang untuk membangun kepercayaan sejak interaksi pertama.
            </p>

            {/* Action Buttons (DDI Style: Solid Orange & White w/ Outline) */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-2xl mx-auto relative z-30">
              <Link href="https://build.webuntukusaha.com" className="w-full sm:w-auto px-8 py-3 bg-accent-orange hover:bg-accent-yellow text-primary-navy font-bold text-xs md:text-sm tracking-wide transition-all shadow-[4px_4px_0px_0px_#1C2733] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1C2733] border-2 border-primary-navy uppercase rounded-sm cursor-pointer pointer-events-auto text-center flex items-center justify-center gap-2 group">
                🚀 Bikin Web 1x Klik
              </Link>
              <Link href="/inquiries" className="w-full sm:w-auto px-8 py-3 bg-white hover:bg-gray-50 text-primary-navy font-bold text-xs md:text-sm tracking-wide transition-all shadow-[4px_4px_0px_0px_#1C2733] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1C2733] border-2 border-primary-navy uppercase rounded-sm cursor-pointer pointer-events-auto text-center">
                Estimasi Proyek Gratis
              </Link>
            </div>
          </motion.div>

        </div>

        {/* Floating Mockup Elements alongside text as requested */}
        {/* Left Floating Image Box */}
        <motion.div
          style={{ y: y1 }}
          className="absolute lg:left-0 2xl:-left-12 top-48 z-10 lg:scale-[0.6] xl:scale-[0.8] 2xl:scale-100 origin-left hidden lg:block"
        >
          <div className="relative">
            <div className="absolute -left-6 -top-6 w-[120px] fill-accent-orange/20 z-0">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M40.5 12C45.2 3.5 54.8 3.5 59.5 12L88.7 64C93.4 72.5 88.6 83 79.2 83H20.8C11.4 83 6.6 72.5 11.3 64L40.5 12Z" />
              </svg>
            </div>
            <div className="w-[260px] h-[300px] bg-white rounded-3xl p-3 shadow-2xl relative z-10 border border-gray-100 flex flex-col">
              <div className="w-full h-full rounded-2xl bg-gray-100 overflow-hidden relative">
                <Image
                  src="/Hero1.png"
                  alt="Business Owner"
                  fill
                  priority
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-accent-orange rounded-2xl flex items-center justify-center shadow-lg transform rotate-6 border-4 border-white">
                <Globe className="text-white w-8 h-8" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Floating Stat Box */}
        <motion.div
          style={{ y: y2 }}
          className="absolute lg:right-0 2xl:-right-12 top-64 z-10 lg:scale-[0.6] xl:scale-[0.8] 2xl:scale-100 origin-right hidden lg:block"
        >
          <div className="relative">
            {/* DDI style brush accent under right photo */}
            <div className="absolute -inset-8 bg-[url('/patterns/cubes.png')] opacity-10 z-0" />

            <div className="w-[280px] sm:w-[320px] bg-white rounded-3xl p-3 shadow-2xl relative z-10 border border-gray-100 rotate-8">
              <div className="h-[200px] sm:h-[220px] rounded-2xl bg-gray-100 overflow-hidden relative">
                <Image
                  src="/Hero2.png"
                  alt="Team Working"
                  fill
                  priority
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="absolute -top-8 -right-8 w-20 h-20">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rotate-12">
                  <circle cx="50" cy="50" r="40" fill="#FF9900" fillOpacity="0.2" />
                  <circle cx="50" cy="50" r="25" fill="#FF9900" />
                  <path d="M40 50L46.5 56.5L60 43" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      <div className="absolute bottom-0 left-0 w-full h-[100px] md:h-[150px] bg-secondary-blue brush-edge-bottom z-10 translate-y-[2px]"></div>
    </section>
  );
}