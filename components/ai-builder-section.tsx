"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export function AIBuilderSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="bg-primary-navy rounded-[40px] p-8 md:p-16 relative overflow-hidden border-4 border-accent-orange/30">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-blue/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-orange/20 text-accent-orange rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-4 h-4" />
                AI Builder (Instan)
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                Lagi buru-buru? <br />
                Coba <span className="text-accent-orange">AI Builder</span> kami.
              </h2>
              
              <p className="text-gray-400 text-lg mb-8 max-w-xl leading-relaxed">
                Masukkan ide bisnis Anda, biarkan AI kami merakitkan strukturnya, edit sesuka hati, dan website Anda langsung siap Live! Tanpa ribet, tanpa lama.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link 
                  href="https://build.webuntukusaha.com" 
                  className="w-full sm:w-auto px-8 py-4 bg-accent-orange hover:bg-accent-yellow text-primary-navy font-bold rounded-xl transition-all shadow-[4px_4px_0px_0px_#ffffff20] hover:translate-x-[2px] hover:translate-y-[2px] flex items-center justify-center gap-2 group"
                >
                  Mulai Rakit Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="text-gray-500 text-sm font-medium">
                  Gratis digunakan untuk eksplorasi
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-md">
              <div className="relative">
                <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 shadow-2xl rotate-2">
                   <div className="aspect-video bg-slate-900 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-orange/10 to-transparent"></div>
                      <Sparkles className="w-12 h-12 text-accent-orange animate-pulse" />
                   </div>
                   <div className="space-y-3">
                      <div className="h-4 w-3/4 bg-slate-700 rounded-full"></div>
                      <div className="h-4 w-full bg-slate-700 rounded-full opacity-50"></div>
                      <div className="h-4 w-1/2 bg-slate-700 rounded-full opacity-30"></div>
                   </div>
                </div>
                <div className="absolute -top-6 -left-6 bg-accent-orange text-primary-navy p-4 rounded-2xl shadow-xl font-bold -rotate-6 border-4 border-white">
                  1x Klik Saja!
                </div>
                <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white p-4 rounded-2xl shadow-xl font-bold rotate-6 border-4 border-white flex items-center gap-2">
                  <Zap className="w-5 h-5" /> Instan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
