"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Bapak Budi",
    role: "Pemilik Cafe Senja",
    content: "Semenjak dibuatkan website oleh WUUS, banyak reservasi datang langsung dari Google. Loadnya cepat sekali, tidak seperti web saya sebelumnya yang bikin pelanggan kabur.",
    img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Ibu Siti",
    role: "Klinik Kecantikan Mawar",
    content: "Desainnya benar-benar terasa mewah layaknya perusahaan besar, padahal harganya sangat ramah untuk UMKM seperti kami. Adminnya juga komunikatif saat konsultasi.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Anton",
    role: "Jasa Laundry Express",
    content: "Fitur tombol WhatsApp otomatisnya sangat membantu konversi. Orang buka web, lihat harga transparan, lalu klik tombol WA langsung terhubung ke admin kami. Sangat praktis!",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  }
];

export function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide effect for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-light-grey relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-200 opacity-20 transform -skew-x-12 translate-x-32" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-[0.2em] text-accent-orange uppercase mb-4 block">
            Kisah Sukses
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-navy">
            Lebih dari Sekadar Klien,<br className="hidden md:block" />
            <span className="italic font-serif text-gray-500">Mereka adalah Rekan Tumbuh Kami.</span>
          </h2>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative pt-12 mt-12"
            >
              {/* Profile Image Overlapping */}
              <div className="absolute -top-12 left-8 w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-gray-100">
                <Image 
                  src={testimonial.img} 
                  alt={testimonial.name} 
                  fill 
                  sizes="80px"
                  className="object-cover transition-transform duration-500 hover:scale-110" 
                />
              </div>
              
              {/* Quote Mark */}
              <div className="absolute top-8 right-8 text-accent-orange/20">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21L16.411 14.283C18.498 12.015 19.387 9.871 19.387 6.471H14V2H22V6.471C22 12.015 20.254 16.486 16.643 21H14.017ZM5.017 21L7.411 14.283C9.498 12.015 10.387 9.871 10.387 6.471H5V2H13V6.471C13 12.015 11.254 16.486 7.643 21H5.017Z" />
                </svg>
              </div>

              <div className="flex gap-1 mb-6 mt-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} size={16} className="text-accent-orange fill-accent-orange" />
                ))}
              </div>

              <p className="text-gray-600 mb-8 italic text-lg leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="mt-auto border-t border-gray-100 pt-6">
                <h4 className="font-bold text-primary-navy text-lg">{testimonial.name}</h4>
                <p className="text-sm font-bold tracking-widest text-gray-400 uppercase">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Slider View */}
        <div className="md:hidden relative px-2">
          <div className="overflow-hidden">
            <motion.div 
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex w-full"
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full shrink-0 px-2 pt-12 mt-12">
                   <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative min-h-[400px] flex flex-col">
                    <div className="absolute -top-12 left-8 w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-gray-100">
                      <Image src={testimonial.img} alt={testimonial.name} fill sizes="80px" className="object-cover" />
                    </div>
                    
                    <div className="absolute top-8 right-8 text-accent-orange/20">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L16.411 14.283C18.498 12.015 19.387 9.871 19.387 6.471H14V2H22V6.471C22 12.015 20.254 16.486 16.643 21H14.017ZM5.017 21L7.411 14.283C9.498 12.015 10.387 9.871 10.387 6.471H5V2H13V6.471C13 12.015 11.254 16.486 7.643 21H5.017Z" /></svg>
                    </div>

                    <div className="flex gap-1 mb-6 mt-4">
                      {[1,2,3,4,5].map((s) => <Star key={s} size={16} className="text-accent-orange fill-accent-orange" />)}
                    </div>

                    <p className="text-gray-600 mb-8 italic text-lg leading-relaxed flex-grow">
                      "{testimonial.content}"
                    </p>

                    <div className="mt-auto border-t border-gray-100 pt-6 text-left">
                      <h4 className="font-bold text-primary-navy text-lg">{testimonial.name}</h4>
                      <p className="text-sm font-bold tracking-widest text-gray-400 uppercase">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* IG-style Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === activeIndex ? "w-6 h-2 bg-accent-orange" : "w-2 h-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
