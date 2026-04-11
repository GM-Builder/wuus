"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  { id: 1, title: "Company Profile Manufaktur", category: "B2B Industri", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "E-Commerce Lokal", category: "Retail & F&B", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Klinik Kecantikan Web", category: "Kesehatan & Beauty", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-sm font-bold tracking-[0.2em] text-accent-orange uppercase mb-4 block">
              Bukti Nyata
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-navy">
              Karya Website Berkualitas <br className="hidden md:block"/>
              <span className="italic font-serif text-gray-500">Milik Klien Kami</span>
            </h2>
          </div>
          <a href="#cta" className="hidden md:inline-flex px-8 py-3 bg-secondary-blue text-white font-bold text-sm tracking-wide transition-all shadow-[4px_4px_0px_0px_#F59E0B] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#F59E0B] border-2 border-secondary-blue">
            Lihat Lebih Banyak
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[300px] w-full rounded-2xl overflow-hidden mb-6 border border-gray-200">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary-navy/20 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Floating Tag */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-primary-navy">
                  {project.category}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-primary-navy mb-2 group-hover:text-accent-orange transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-500 text-sm font-medium">
                Desain responsif dengan load time &lt; 1.5 detik.
              </p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 md:hidden flex justify-center">
          <a href="#cta" className="px-8 py-3 bg-secondary-blue text-white font-bold text-sm tracking-wide">
            Lihat Lebih Banyak
          </a>
        </div>

      </div>
    </section>
  );
}
