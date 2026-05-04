"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight, Plus, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Savoria Elegance",
    category: "F&B / Restaurant",
    img: "/Savoria-mockup.png",
    accent: "#d4af37",
    logo: "/logo.png"
  },
  {
    id: 2,
    title: "Trust Architect",
    category: "Corporate / B2B",
    img: "/trust-mockup.png",
    accent: "#0056b3",
    logo: "/logo.png"
  },
  {
    id: 3,
    title: "Urban Threads",
    category: "E-Commerce",
    img: "/urbanThreads-mockup.png",
    accent: "#a88a64",
    logo: "/logo.png"
  },
  {
    id: 4,
    title: "Dressy Rent",
    category: "Sewa Gaun Premium",
    img: "/dressy-rent-mockup.png",
    accent: "#d84d5c",
    logo: "/logo.png"
  },
  {
    id: 5,
    title: "Socks Indonesia",
    category: "E-Commerce",
    img: "/socks-indonesia-mockup.png",
    accent: "#ffcc00",
    logo: "/logo.png"
  },
  {
    id: 6,
    title: "Kain Nusantara",
    category: "Fashion & Budaya",
    img: "/kain-nusantara-mockup.png",
    accent: "#8b4513",
    logo: "/logo.png"
  }
];

export function Portfolio() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="relative py-24 lg:py-32 bg-white overflow-hidden">
      
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-16 lg:mb-20 relative z-10">
        <div className="flex items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-black text-[#020617] leading-none tracking-tight">
              Eksplorasi <br />
              <span className="font-serif italic font-light text-accent-orange text-5xl lg:text-6xl">Desain</span>
            </h2>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#020617] hover:text-white transition-all group active:scale-95"
              aria-label="Previous Project"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#020617] hover:text-white transition-all group active:scale-95"
              aria-label="Next Project"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Perspective Grid Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto pb-20 px-6 lg:px-[10vw] no-scrollbar gap-8 lg:gap-12 snap-x scroll-smooth"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 w-[85vw] lg:w-[400px] snap-center group cursor-pointer"
          >
            {/* The Slanted Card */}
            <div 
              className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden transition-all duration-700 ease-out group-hover:-translate-y-4 shadow-xl"
              style={{ 
                backgroundColor: project.accent,
                clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
                transform: "perspective(1000px) rotateY(-5deg)"
              }}
            >
              {/* Full Image Area */}
              <div className="absolute inset-0 z-10 transition-transform duration-1000 group-hover:scale-110">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
                
                {/* Visual Polish Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* Bottom Info (Outside Slant) */}
            <div className="mt-8 flex justify-between items-center px-2">
              <div>
                <span className="text-accent-orange font-bold text-[10px] tracking-[0.3em] uppercase block mb-1">
                  {project.category}
                </span>
                <h4 className="text-[#020617] font-black text-xl uppercase tracking-tight">
                  {project.title}
                </h4>
              </div>
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#020617] group-hover:border-[#020617] transition-all">
                <ArrowUpRight size={20} className="text-[#020617] group-hover:text-white transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}

        <div className="flex-shrink-0 w-[85vw] lg:w-[400px] snap-center flex items-center justify-center">
          <a 
            href="https://preview.webuntukusaha.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-6"
          >
            <div className="w-32 h-32 rounded-full border-4 border-dashed border-gray-200 flex items-center justify-center group-hover:border-accent-orange transition-colors">
              <Plus size={48} className="text-gray-300 group-hover:text-accent-orange transition-colors" />
            </div>
            <span className="font-black uppercase tracking-[0.2em] text-sm text-gray-400 group-hover:text-[#020617] transition-colors">
              Explorasi Lainnya
            </span>
          </a>
        </div>
      </div>

    </section>
  );
}