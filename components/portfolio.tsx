"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Savoria Elegance",
    category: "Kuliner",
    tagline: "Website Restoran Fine-Dining dengan Nuansa Elegan.",
    detail: "Website multi-halaman dengan estetika gelap yang dirancang untuk menghadirkan pengalaman visual yang berkelas.",
    img: "/Savoria-mockup.png"
  },
  {
    id: 2,
    title: "Trust Architect",
    category: "Jasa Profesional",
    tagline: "Presisi dalam Setiap Struktur.",
    detail: "Platform profil perusahaan untuk firma arsitektur B2B yang menekankan pada portofolio proyek dan kepercayaan klien.",
    img: "/trust-mockup.png"
  },
  {
    id: 3,
    title: "Urban Threads",
    category: "Toko Online",
    tagline: "Fashion Minimalis & Berkelanjutan.",
    detail: "Katalog e-commerce dengan desain bersih yang menonjolkan produk koleksi fashion dengan navigasi yang sangat halus.",
    img: "/urbanThreads-mockup.png"
  }
];

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>

            <h2 className="text-4xl md:text-5xl font-bold text-primary-navy">
              Karya Website Berkualitas <br className="hidden md:block" />
              <span className="italic font-serif text-accent-orange">Milik Klien Kami</span>
            </h2>
          </div>
          <a href="https://preview.webuntukusaha.com" target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex px-8 py-3 bg-secondary-blue text-white font-bold text-sm tracking-wide transition-all shadow-[4px_4px_0px_0px_#F59E0B] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#F59E0B] border-2 border-secondary-blue">
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
                  priority={index < 2}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary-navy/20 group-hover:bg-transparent transition-colors duration-500" />

                {/* Floating Tag */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-primary-navy transform-gpu" style={{ transform: "translateZ(0)" }}>
                  {project.category}
                </div>
              </div>

              <h3 className="text-xl font-bold text-primary-navy mb-1 group-hover:text-accent-orange transition-colors">
                {project.title}
              </h3>
              <p className="font-semibold text-sm text-secondary-blue mb-2 italic">
                "{project.tagline}"
              </p>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                {project.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 md:hidden flex justify-center">
          <a href="https://preview.webuntukusaha.com" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-secondary-blue text-white font-bold text-sm tracking-wide">
            Lihat Lebih Banyak
          </a>
        </div>

      </div>
    </section>
  );
}