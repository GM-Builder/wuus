"use client";

import { MapPin, PhoneCall, Mail, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-light-grey border-t border-gray-200 pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand & Map Info */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center mb-6">
              <img src="/logo.png" alt="WUUS Logo" className="h-10 w-auto object-contain" />
            </a>
            <p className="text-gray-500 mb-8 max-w-md leading-relaxed">
              WUUS adalah solusi digitalisasi khusus untuk UMKM di Indonesia. Kami membuat website mewah dengan harga yang bersahabat agar bisnis Anda dapat berkembang maksimal.
            </p>

            <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200 h-48 max-w-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.24009761565!2d106.75936496677943!3d-6.22974653696894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x100c5e82dd4b820!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1689000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-primary-navy text-lg mb-6">Navigasi</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="text-gray-500 hover:text-accent-orange transition-colors">Layanan Biz</a></li>
              <li><a href="#portfolio" className="text-gray-500 hover:text-accent-orange transition-colors">Portfolio Karya</a></li>
              <li><a href="#pricing" className="text-gray-500 hover:text-accent-orange transition-colors">Harga Paket</a></li>
              <li><a href="#roi" className="text-gray-500 hover:text-accent-orange transition-colors">Kalkulator Modal</a></li>
              <li><a href="#faq" className="text-gray-500 hover:text-accent-orange transition-colors">Pusat Bantuan</a></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-bold text-primary-navy text-lg mb-6">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500">
                <MapPin size={18} className="text-accent-orange mt-1 shrink-0" />
                <span>Gedung Graha WUUS, Lt. 3<br />Jakarta Selatan 12340</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <PhoneCall size={18} className="text-accent-orange shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Mail size={18} className="text-accent-orange shrink-0" />
                <span>hello@webuntukusaha.com</span>
              </li>
            </ul>

            <div className="flex gap-4 mt-8">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary-navy hover:text-white hover:bg-accent-orange transition-colors shadow-sm">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary-navy hover:text-white hover:bg-accent-orange transition-colors shadow-sm">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>


        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} WebUntukUsaha.com. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-400 font-medium">
            <a href="#" className="hover:text-primary-navy">Syarat & Ketentuan</a>
            <span>|</span>
            <a href="#" className="hover:text-primary-navy">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
