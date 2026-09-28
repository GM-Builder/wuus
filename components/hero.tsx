"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Bot, CreditCard, Sparkles, CheckCircle2, Globe2 } from "lucide-react";
import Link from "next/link";

const tabs = [
  {
    id: "booking",
    title: "Direct Booking Engine",
    badge: "0% OTA Fee",
    icon: Zap,
    headline: "Stop leaking 18%–25% to Booking.com & Airbnb.",
    description: "Built on Next.js Edge infrastructure with sub-800ms load times, instant calendar sync, and zero middleman commissions.",
    metrics: [
      { label: "Commission Saved", value: "100%", sub: "Kept by host" },
      { label: "Page Load Speed", value: "720ms", sub: "Global Edge CDN" },
      { label: "Mobile Conversion", value: "+34%", sub: "Frictionless checkout" },
    ],
    snippet: "Guest clicks 'Book Direct' → Confirmation received in 4 seconds."
  },
  {
    id: "ai-concierge",
    title: "24/7 AI Concierge",
    badge: "Strictly Grounded",
    icon: Bot,
    headline: "Answers in 20+ languages while you sleep.",
    description: "Strict RAG architecture grounded strictly on your hotel handbook. Zero hallucinations, zero tech overhead, automatic WhatsApp escalation.",
    metrics: [
      { label: "Response Latency", value: "1.2s", sub: "Near instant" },
      { label: "Guest Languages", value: "24+", sub: "Auto-detected" },
      { label: "Host Interruption", value: "-85%", sub: "Automated FAQ" },
    ],
    snippet: "🇩🇪 'Ist spätes Einchecken möglich?' → 'Ja, mit Schlüsselcode #4092.'"
  },
  {
    id: "settlement",
    title: "Frictionless Settlement",
    badge: "Mayar & SEPA",
    icon: CreditCard,
    headline: "Cross-border B2B payments without bureaucratic friction.",
    description: "Receive instant corporate card deposits via Mayar link or direct SEPA IBAN transfers for European hotel accounting.",
    metrics: [
      { label: "Deposit Milestone", value: "50 / 50", sub: "Staging-first" },
      { label: "Card Processing", value: "Instant", sub: "Visa / Mastercard" },
      { label: "Invoice Compliance", value: "0% VAT", sub: "Export of services" },
    ],
    snippet: "Client verifies live staging on their phone before final balance."
  },
];

export function Hero() {
  const [activeTab, setActiveTab] = useState("booking");
  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 bg-[#FAFAFA] overflow-hidden border-b border-slate-200/80">
      {/* Background Fintech Grid */}
      <div className="absolute inset-0 bg-grid-fintech opacity-60 pointer-events-none" />

      {/* Subtle radial ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-indigo-500/10 via-slate-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
        
        {/* Header Text Section */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center mb-16 md:mb-20">
          
          {/* Authority Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-sm text-xs font-semibold text-slate-700 mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="tracking-tight">WUUS Studio</span>
            <span className="text-slate-300">•</span>
            <span className="text-indigo-600 font-bold">Boutique Hospitality & Modern Web Engineering</span>
          </motion.div>

          {/* Master Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.08] mb-6"
          >
            Engineering Digital Platforms That Turn Strangers Into <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-slate-900 bg-clip-text text-transparent">Direct Bookings.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed mb-10"
          >
            Bespoke Next.js direct-booking engines, sub-800ms speed architecture, and 24/7 multilingual AI concierges. Engineered for independent European stays and businesses that refuse to look amateur.
          </motion.p>

          {/* Dual Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
          >
            <Link
              href="/hospitality"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span>Explore Hospitality Engine</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </Link>

            <Link
              href="/inquiries"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-semibold text-sm shadow-sm transition-all duration-200"
            >
              <span>Request Project Inquiry</span>
            </Link>
          </motion.div>

          {/* Trust Guarantees Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-10 text-xs font-medium text-slate-500"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Staging-First Guarantee</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>50/50 Milestone Protection</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Instant Mayar Card Checkout</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Strict RAG Zero-Hallucination AI</span>
            </span>
          </motion.div>
        </div>

        {/* Live Interactive Engine Preview (Deel / Mayar Aesthetic) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="w-full max-w-5xl mx-auto rounded-2xl bg-white border border-slate-200/90 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.08)] overflow-hidden"
        >
          {/* Top Control Bar */}
          <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-400 border-l border-slate-700 pl-3">
                wuus-engine // live-production v0.2.5
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Edge Global CDN: 720ms
              </span>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200/90 bg-slate-50/70">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left p-5 transition-all relative flex flex-col gap-1 ${
                    isActive
                      ? "bg-white text-slate-900 border-b-2 border-indigo-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Icon className={`w-3.5 h-3.5 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                      {tab.title}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? "bg-indigo-50 text-indigo-700 border border-indigo-200" : "bg-slate-200/70 text-slate-600"
                    }`}>
                      {tab.badge}
                    </span>
                  </div>
                  <p className="text-sm font-semibold tracking-tight text-slate-900 line-clamp-1">
                    {tab.headline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Tab Body */}
          <div className="p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left explanation */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Engine Capability</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                    {currentTab.headline}
                  </h3>

                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                    {currentTab.description}
                  </p>

                  <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs flex items-center gap-2 border border-slate-800">
                    <span className="text-emerald-400">✓</span>
                    <span>{currentTab.snippet}</span>
                  </div>
                </div>

                {/* Right Metrics Grid */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3.5">
                  {currentTab.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-medium text-slate-500">{m.label}</div>
                        <div className="text-[11px] text-slate-400">{m.sub}</div>
                      </div>
                      <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}