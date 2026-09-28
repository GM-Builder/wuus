"use client";

import { motion } from "framer-motion";
import { Server, Database, Globe, Shield, Cpu, CreditCard, Sparkles, Zap } from "lucide-react";

const stacks = [
  { name: "Next.js 16 Edge", category: "Core Framework", icon: Zap },
  { name: "Vercel Global CDN", category: "Global Edge", icon: Server },
  { name: "Supabase Postgres", category: "Database & Auth", icon: Database },
  { name: "24/7 RAG AI Engine", category: "AI Concierge", icon: Cpu },
  { name: "Mayar Settlement", category: "Payment Engine", icon: CreditCard },
  { name: "SEPA IBAN Network", category: "EU Banking", icon: Globe },
  { name: "Cloudflare Security", category: "DDoS & SSL", icon: Shield },
  { name: "Boutique Hospitality", category: "Bespoke Practice", icon: Sparkles },
];

export function MarqueeBrands() {
  return (
    <section className="bg-white py-10 border-b border-slate-200/80 overflow-hidden">
      <div className="container mx-auto px-6 mb-6 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">
          Powered By Enterprise-Grade Architecture & Global Settlement Infrastructure
        </p>
      </div>

      {/* Marquee Animation */}
      <div className="w-full flex overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          className="flex whitespace-nowrap items-center gap-10 px-6 transform-gpu will-change-transform"
          style={{ transform: "translateZ(0)" }}
        >
          {[...stacks, ...stacks].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex-shrink-0 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-indigo-300 transition-colors group cursor-default"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 group-hover:text-indigo-600 transition-colors shadow-xs">
                  <Icon size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 tracking-tight">{item.name}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{item.category}</div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}