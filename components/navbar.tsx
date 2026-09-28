"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Boutique Stays & Villa", href: "/hospitality" },
  { name: "Layanan", href: "/#services" },
  { name: "Alur Kerja", href: "/#workflow" },
  { name: "Portofolio", href: "/#portfolio" },
  { name: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 15 && !isScrolled) setIsScrolled(true);
    else if (latest <= 15 && isScrolled) setIsScrolled(false);
  });

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-white ${
          isScrolled
            ? "border-b border-slate-200 py-3"
            : "border-b border-slate-100 py-4"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">

          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="WUUS Logo"
              width={130}
              height={36}
              priority
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-wider text-slate-400 border-l border-slate-200 pl-3">
              Studio
            </span>
          </Link>

          {/* Desktop Nav (Clean, No Gimmick Badges) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-tight text-[#1C2733] hover:text-[#F59E0B] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/hospitality"
              className="text-xs font-semibold px-3.5 py-2 rounded-lg text-slate-700 hover:text-[#1C2733] hover:bg-slate-100 transition-colors flex items-center gap-1"
            >
              <span>Showcase Hospitality</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/inquiries"
              className="bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <span>Konsultasi Proyek</span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-[#1C2733] p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-white w-full h-screen flex flex-col pt-6 px-6 pb-10 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-5">
              <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/logo.png"
                  alt="WUUS Logo"
                  width={130}
                  height={36}
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 bg-slate-100 rounded-lg text-slate-700 hover:bg-slate-200 cursor-pointer"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-2 mb-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-semibold py-2.5 px-3 rounded-lg text-[#1C2733] hover:bg-slate-50 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-slate-100">
              <Link
                href="/hospitality"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-slate-100 text-[#1C2733] hover:bg-slate-200 px-5 py-3 rounded-lg font-bold text-sm transition-colors"
              >
                Hospitality Engine Showcase
              </Link>
              <Link
                href="/inquiries"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-[#1C2733] text-white px-5 py-3 rounded-lg font-bold text-sm"
              >
                Mulai Konsultasi Proyek
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
