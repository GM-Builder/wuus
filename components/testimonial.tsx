"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Mas Angga",
    role: "Pemilik Kopi Senja",
    content: "Semenjak dibuatkan website oleh WUUS, banyak reservasi datang langsung dari Google. Loadnya cepat sekali, tidak seperti web saya sebelumnya yang bikin pelanggan kabur.",
    img: "/foto-testi2.png"
  },
  {
    id: 2,
    name: "Ibu Resti",
    role: "Butik Cantika",
    content: "Desainnya terasa sangat profesional dan membuat bisnis kami tampil lebih percaya diri di hadapan pelanggan.",
    img: "/foto-testi1.png"
  },
  {
    id: 3,
    name: "Bapak Anton",
    role: "Jasa Laundry Express",
    content: "Fitur tombol WhatsApp otomatisnya sangat membantu konversi. Orang buka web, lihat harga transparan, lalu klik tombol WA langsung terhubung ke admin kami. Sangat praktis!",
    img: "/foto-testi3.png"
  }
];

export function Testimonial() {
  return (
    <section className="py-24 bg-light-grey relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-200 opacity-20 transform -skew-x-12 translate-x-32" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold text-primary-navy">
            Lebih dari Sekadar Klien,<br className="hidden md:block" />
            <span className="italic font-serif text-accent-orange">Mereka adalah Rekan Tumbuh Kami.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-transparent gap-4 md:gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 md:p-10 flex flex-col bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(245,158,11,0.15)] hover:border-accent-orange/20 hover:-translate-y-2 transition-all duration-500 group"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="text-accent-orange fill-accent-orange" />
                ))}
              </div>

              <p className="text-gray-500 mb-8 leading-relaxed font-medium flex-grow">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 relative shrink-0">
                  <Image
                    src={testimonial.img}
                    alt={testimonial.name}
                    fill
                    sizes="48px"
                    className="object-cover grayscale"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-primary-navy text-sm">{testimonial.name}</h3>
                  <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
