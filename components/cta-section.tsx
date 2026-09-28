"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
  const whatsappNumber = "6281383521750";
  const waUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Faisal%20and%20WUUS%20Studio,%20I'd%20like%20to%20discuss%20a%20project.`;

  return (
    <section id="cta" className="py-24 md:py-32 bg-[#FAFAFA] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-[#090D16] border border-slate-800 p-10 sm:p-14 md:p-20 text-center relative overflow-hidden shadow-2xl text-white"
        >
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-semibold text-indigo-400 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready for Measurable Direct Growth?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Stop Leaking 20% to Middlemen. <br />
              <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
                Deploy Your High-Speed Engine.
              </span>
            </h2>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
              From sub-800ms direct booking architecture to 24/7 autonomous guest care in 20+ languages. Verified on your private mobile staging link before you pay the final balance.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-10">
              <Link
                href="/inquiries"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-md transition-all duration-200"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </Link>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 font-semibold text-sm transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Direct WhatsApp Consultation</span>
              </a>
            </div>

            {/* Guarantees Pill row */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>50/50 Staging-First Guarantee</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instant Card & SEPA IBAN Settlement</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No Lock-In, 100% Owned By You</span>
              </span>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

