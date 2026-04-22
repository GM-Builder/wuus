"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Globe, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Layanan Kami", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  // { name: "Kalkulator ROI", href: "#roi" },
  { name: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20 && !isScrolled) setIsScrolled(true);
    else if (latest <= 20 && isScrolled) setIsScrolled(false);
  });

  // Handle resize to close mobile menu on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform-gpu will-change-transform ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3" : "bg-transparent py-5"
          }`}
        style={{ transform: "translateZ(0)" }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Logo Area */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="WUUS Logo"
              width={142}
              height={40}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-primary-navy font-semibold text-sm hover:text-accent-orange transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <a href="#cta" className="bg-primary-navy hover:bg-secondary-blue text-white px-6 py-2.5 rounded text-sm font-bold transition-all shadow-sm">
              Konsultasi Gratis
            </a>
            <a href="#cta" className="bg-accent-orange hover:bg-accent-yellow text-primary-navy px-6 py-2.5 rounded text-sm font-bold transition-all shadow-sm">
              Mulai Sekarang
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-primary-navy p-2 bg-gray-100 rounded-md"
              aria-label="Buka Menu"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[100] !bg-white w-full h-screen flex flex-col pt-6 px-6 pb-12 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12">
              <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/logo.png"
                  alt="WUUS Logo"
                  width={142}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 bg-gray-100 rounded-full text-primary-navy border border-gray-200"
                aria-label="Tutup Menu"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 mb-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-bold text-primary-navy border-b border-gray-100 pb-4"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-4">
              <a href="#cta" onClick={() => setMobileMenuOpen(false)} className="w-full text-center bg-primary-navy text-white px-6 py-4 rounded-lg font-bold text-lg">
                Konsultasi Gratis
              </a>
              <a href="#cta" onClick={() => setMobileMenuOpen(false)} className="w-full text-center bg-accent-orange text-primary-navy px-6 py-4 rounded-lg font-bold text-lg">
                Mulai Sekarang
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
