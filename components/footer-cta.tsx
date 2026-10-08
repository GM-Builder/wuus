"use client";

import { MapPin, MessageCircle, PhoneCall, Mail } from "lucide-react";

export function FooterCta() {
  const whatsappNumber = "6281383521750"; // Tim WUUS Official
  const waUrl = `https://wa.me/${whatsappNumber}?text=Halo%20tim%20WUUS,%20saya%20ingin%20konsultasi%20pembuatan%20website%20untuk%20usaha%20saya.`;

  return (
    <footer className="bg-gray-900 border-t-8 border-electric-blue text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-bright-teal/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          
          {/* CTA & Contact Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Mulai Digitalisasi <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-bright-teal to-electric-blue">Sekarang Juga.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-md">
              Jangan biarkan kompetitor mengambil pelanggan Anda. Konsultasikan kebutuhan website usaha Anda gratis bersama tim kami.
            </p>
            
            <a 
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-5 bg-[#25D366] hover:bg-[#20BE5B] text-white rounded-full font-bold text-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all mb-12"
            >
              <MessageCircle size={24} />
              Chat WhatsApp Sekarang
            </a>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <PhoneCall size={18} className="text-bright-teal" />
                </div>
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <Mail size={18} className="text-bright-teal" />
                </div>
                <a href="mailto:hallo@webuntukusaha.com" className="hover:text-bright-teal transition-colors">hallo@webuntukusaha.com</a>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <MapPin size={18} className="text-bright-teal" />
                </div>
                <span>Jakarta Selatan, Indonesia</span>
              </div>
            </div>
          </div>
          
          {/* Map Embed */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-electric-blue to-bright-teal opacity-30 blur-2xl rounded-3xl" />
            <div className="relative bg-gray-800 p-2 rounded-[2rem] border border-gray-700 h-[400px] shadow-2xl overflow-hidden">
               {/* Dummy map iframe (Using generic Google map embed structure for demonstration) */}
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.24009761565!2d106.75936496677943!3d-6.22974653696894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x100c5e82dd4b820!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1689000000000!5m2!1sid!2sid" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0, borderRadius: "1.5rem" }} 
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
               />
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-white tracking-tighter">WUUS!</span>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} WebUntukUsaha.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
