'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Check, 
  Smartphone, 
  Globe, 
  BedDouble, 
  Clock, 
  MessageSquare, 
  ChevronDown, 
  Sparkles, 
  FileText, 
  ShieldCheck,
  CalendarCheck,
  Compass,
  Zap,
  Send
} from 'lucide-react';

export default function HospitalityPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    hotelName: '',
    websiteUrl: '',
    contactName: '',
    email: '',
    notes: '',
  });

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate async submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      <style jsx global>{`
        #floating-ai-builder {
          display: none !important;
        }
      `}</style>

      {/* Global Studio Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0F172A]/85 border-b border-slate-800/80 transition-all">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/hospitality" className="flex items-center gap-2 group">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                WUUS
              </span>
              <span className="text-[11px] uppercase tracking-widest text-slate-400 px-2 py-0.5 rounded border border-slate-800 bg-slate-900/60 font-medium">
                Hospitality
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#guest-journey" className="hover:text-white transition-colors">Guest Journey</a>
            <a href="#what-we-improve" className="hover:text-white transition-colors">What We Improve</a>
            <a href="#adra-concept" className="hover:text-white transition-colors">ADRA Concept</a>
            <a href="#async-process" className="hover:text-white transition-colors">How We Work</a>
            <a href="#pricing" className="hover:text-white transition-colors">Scope & Rates</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="#review-request" 
              className="text-xs font-semibold px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-sm hover:shadow-amber-500/20"
            >
              Get Free Review
            </a>
          </div>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden border-b border-slate-800/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(245,158,11,0.12),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-medium tracking-wide mb-8">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Digital Experiences for Independent Hospitality</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-6">
            Modern websites for <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-300">
              independent boutique hotels.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            We design and engineer calm, high-performance websites that help boutique stays showcase their character, respect guest attention, and clarify the path to direct enquiries.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <a
              href="#review-request"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-amber-500/10"
            >
              <span>Request a Free Website Review</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#adra-concept"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-medium text-sm transition-colors"
            >
              <span>View ADRA Concept</span>
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-xs text-slate-400 border-t border-slate-800/80 pt-6">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> Fixed scope & turnaround
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> 100% Async-first workflow
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> No generic templates
            </span>
          </div>
        </div>
      </section>

      {/* 2. THE REALITY: Why hotel websites need more than a pretty homepage */}
      <section className="py-20 md:py-28 border-b border-slate-800/60 bg-[#0B1120]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3 block">
              The Reality
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              A hotel website needs more than a pretty homepage.
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Most independent hotels already have authentic hospitality and picturesque properties. But online, potential guests often experience friction that pulls them away from direct contact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-7 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 text-amber-400 font-mono text-sm font-bold">
                  01
                </div>
                <h3 className="text-lg font-semibold text-white mb-2.5">Mobile Navigation Friction</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Over 70% of boutique hotel research begins on smartphones. When room galleries take seconds to load or inquiry forms are unoptimized for touch, guests retreat to third-party apps.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 text-amber-400 font-mono text-sm font-bold">
                  02
                </div>
                <h3 className="text-lg font-semibold text-white mb-2.5">Unclear Room Differentiation</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Travelers want to quickly distinguish between suite tiers, views, and specific amenities without wading through cluttered PDFs or buried tables.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 text-amber-400 font-mono text-sm font-bold">
                  03
                </div>
                <h3 className="text-lg font-semibold text-white mb-2.5">Fragmented Communication</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Whether guests prefer an integrated booking engine, a direct WhatsApp message, or an email reservation inquiry, the communication channels should be unified and effortless.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE GUEST JOURNEY */}
      <section id="guest-journey" className="py-20 md:py-28 border-b border-slate-800/60">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3 block">
              Intuitive Flow
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              Built around the natural guest journey.
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              We structure digital touchpoints to mirror how modern guests actually discover, compare, and reserve their stays.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 relative">
              <span className="text-xs font-mono text-amber-400/80 mb-2 block font-semibold">Step 01</span>
              <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                Atmosphere & Story
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fast-loading high-resolution visuals that immediately convey your property's ambiance and unique setting.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 relative">
              <span className="text-xs font-mono text-amber-400/80 mb-2 block font-semibold">Step 02</span>
              <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                <BedDouble className="w-4 h-4 text-amber-400" />
                Room Discovery
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Clear distinction between room types, view highlights, bed configurations, and inclusive perks.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 relative">
              <span className="text-xs font-mono text-amber-400/80 mb-2 block font-semibold">Step 03</span>
              <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-amber-400" />
                Direct Inquiry
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Seamless integration with your existing PMS/engine or an elegant direct reservation form with instant WhatsApp link.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 relative">
              <span className="text-xs font-mono text-amber-400/80 mb-2 block font-semibold">Step 04</span>
              <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400" />
                Local Context
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Essential neighborhood dining, airport transfer notes, and curated local guides that build guest confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT WUUS IMPROVES */}
      <section id="what-we-improve" className="py-20 md:py-28 border-b border-slate-800/60 bg-[#0B1120]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3 block">
              Core Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              What we refine for independent properties.
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              We do not sell generic web templates or bloated enterprise software. We engineer the exact pillars that matter for small-to-midsize hotels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1.5">Mobile-First Performance</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Sub-second page transitions and ultra-responsive layout engineered with Next.js. Fast loading ensures international guests don't bounce on cellular connections.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400">
                <BedDouble className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1.5">Curated Room & Suite Showcase</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Clean galleries with high-resolution imagery, verified amenities, capacity icons, and transparent pricing structure that make choosing effortless.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1.5">Direct Communication Channels</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Direct WhatsApp click-to-chat with pre-filled room dates, structured inquiry forms, and compatibility with your existing booking widget (Cloudbeds, Sirvoy, etc.).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1.5">Multilingual Ready Structure</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Clean architecture for displaying English alongside your regional language (Albanian, Bosnian, Macedonian, German, Italian) without clumsy layout breaks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ADRA CONCEPT SPOTLIGHT */}
      <section id="adra-concept" className="py-20 md:py-28 border-b border-slate-800/60">
        <div className="max-w-5xl mx-auto px-6">
          <div className="p-8 md:p-12 rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-800 text-amber-400 text-xs font-mono font-medium mb-3">
                <span>Featured Concept Study</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
                ADRA — Boutique Hotel & Suites
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                A fictional 18-room heritage property in the Western Balkans created by WUUS to demonstrate how modern typography, fluid room discovery, and clear direct contact work together.
              </p>
            </div>

            {/* Mockup Card */}
            <div className="border border-slate-800 rounded-xl bg-slate-950 overflow-hidden shadow-2xl mb-8">
              <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
                  <span className="ml-2 text-slate-300">adra-suites.wuus.dev</span>
                </div>
                <span className="text-[11px] text-emerald-400">● Live Prototype</span>
              </div>
              
              <div className="p-6 md:p-10 bg-gradient-to-b from-[#111827] to-[#0B0F19]">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-800/80 pb-6 mb-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-1">Concept Architecture</span>
                    <h3 className="text-xl font-bold text-white">Adria Old Town Heritage Experience</h3>
                    <p className="text-xs text-slate-300 mt-1">Lightweight Next.js frontend • Direct reservation modal • Multi-currency display</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs text-slate-400 block">Typical Lighthouse Score</span>
                    <span className="text-2xl font-bold text-emerald-400 font-mono">98 / 100</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 text-xs text-slate-300">
                  <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/60">
                    <span className="font-semibold text-white block mb-1">01. Room Hierarchy</span>
                    Tailored suite comparisons with amenity badges and capacity details.
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/60">
                    <span className="font-semibold text-white block mb-1">02. Direct WhatsApp Flow</span>
                    Pre-fills check-in dates and room choice for direct management response.
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/60">
                    <span className="font-semibold text-white block mb-1">03. Fast Asset Loading</span>
                    Optimized WebP imaging and adaptive responsive breakpoints.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#review-request"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
              >
                <span>Request a review for your hotel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ASYNC-FIRST PROCESS */}
      <section id="async-process" className="py-20 md:py-28 border-b border-slate-800/60 bg-[#0B1120]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3 block">
              Working Principles
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              Async-first. Respecting your operating hours.
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Managing a hotel is a full-time operational commitment. We do not demand hours of recurring Zoom calls. We operate with structured, transparent written updates from scope to deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50">
              <Clock className="w-6 h-6 text-amber-400 mb-4" />
              <h3 className="text-base font-semibold text-white mb-2">Clear Scope in Writing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Before writing any code, we document every page, asset, and feature in an accessible project brief. You know exactly what is included.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50">
              <FileText className="w-6 h-6 text-amber-400 mb-4" />
              <h3 className="text-base font-semibold text-white mb-2">Structured Weekly Demos</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Instead of scheduling meetings across timezones, we send concise Loom video walkthroughs and staging links for you to review whenever convenient.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50">
              <ShieldCheck className="w-6 h-6 text-amber-400 mb-4" />
              <h3 className="text-base font-semibold text-white mb-2">Guaranteed Delivery Window</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Most hotel projects are completed within 1 to 3 weeks depending on property size and content readiness. No open-ended hourly billing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRANSPARENT SCOPE & PRICING */}
      <section id="pricing" className="py-20 md:py-28 border-b border-slate-800/60">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3 block">
              Transparent Framework
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              Fixed-scope investment.
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Straightforward pricing tailored for independent hotels, boutique villas, and regional guesthouses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Tier 1: Hotel Digital Refresh */}
            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/70 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">Tier 01</span>
                <h3 className="text-2xl font-bold text-white mt-1 mb-2">Boutique Refresh</h3>
                <p className="text-xs text-slate-300 mb-6">
                  Ideal for small properties (under 15 rooms) looking to modernize their mobile presentation and direct inquiry channels.
                </p>
                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-white">from €750</span>
                  <span className="text-xs text-slate-400 block mt-1">One-time fixed scope • 1–2 weeks turnaround</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-6">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Up to 5 key pages (Home, Rooms, Story, Contact, Dining)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Mobile-first UI & speed optimization
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Direct WhatsApp & inquiry email flow
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Compatibility with your current booking link
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Bilingual content structure
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <a
                  href="#review-request"
                  className="block text-center text-xs font-semibold py-3 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                >
                  Request a Free Review First
                </a>
              </div>
            </div>

            {/* Tier 2: Comprehensive Experience */}
            <div className="p-8 rounded-2xl border border-amber-500/40 bg-slate-900/90 flex flex-col justify-between relative shadow-xl shadow-amber-500/5">
              <div className="absolute -top-3 right-6 bg-amber-500 text-slate-950 font-bold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full">
                Most Popular
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">Tier 02</span>
                <h3 className="text-2xl font-bold text-white mt-1 mb-2">Hospitality Complete</h3>
                <p className="text-xs text-slate-300 mb-6">
                  For boutique hotels and villas seeking advanced room filtering, direct calendar engine integration, and local area guides.
                </p>
                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-white">from €1,450</span>
                  <span className="text-xs text-slate-400 block mt-1">One-time fixed scope • 2–3 weeks turnaround</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-6">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Everything in Boutique Refresh
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Individual room showcase subpages
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Direct booking engine / PMS widget integration
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Local guide / curated experience directory
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Basic SEO setup & Google Business profile alignment
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <a
                  href="#review-request"
                  className="block text-center text-xs font-semibold py-3 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
                >
                  Request a Free Review First
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section id="faq" className="py-20 md:py-28 border-b border-slate-800/60 bg-[#0B1120]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3 block">
              Common Inquiries
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-3">
              Frequently asked questions.
            </h2>
            <p className="text-slate-300 text-sm">
              Clear answers regarding integrations, language, and ongoing care.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Can we keep our existing PMS or booking software?",
                a: "Yes. If your property uses Cloudbeds, Sirvoy, Beds24, Guesty, or any standard booking engine, we seamlessly embed and style your existing booking widget so guests experience zero disruption."
              },
              {
                q: "What if we don't have an online booking system yet?",
                a: "We can set up a direct reservation inquiry system with room selection, date requests, and direct WhatsApp / email notifications that your front desk can easily manage without expensive monthly software licenses."
              },
              {
                q: "How does the Async-First working process work in practice?",
                a: "We agree on the project brief in writing, receive your photos and details via a shared folder, and share video walkthroughs (Loom) of the staging site as we build. You provide feedback whenever convenient. If an urgent question arises, a focused 15-minute alignment call is always available."
              },
              {
                q: "Can the website support multiple languages?",
                a: "Yes. We frequently structure sites for English alongside local languages (e.g., Albanian, Bosnian, Macedonian, Italian, or German) with clean language switchers."
              },
              {
                q: "Do you offer ongoing hosting and maintenance after launch?",
                a: "Yes. We offer an optional Website Care retainer (typically €75–€120/month) covering high-speed cloud hosting, daily backups, uptime monitoring, and small monthly content/rate adjustments."
              }
            ].map((faq, i) => (
              <div 
                key={i} 
                className="border border-slate-800 rounded-xl bg-slate-900/60 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-amber-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === i ? 'rotate-180 text-amber-400' : ''}`} />
                </button>
                {activeFaq === i && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. REVIEW REQUEST FORM (PRIMARY CTA) */}
      <section id="review-request" className="py-20 md:py-28 relative">
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3 block">
              Zero Pressure
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              Request a free 1-page website review.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-lg mx-auto">
              Share your current property website. We will manually inspect your mobile navigation, room presentation, and inquiry journey, and send a concise 1-page PDF teardown. No automated spam, no sales call required.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl">
            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Review Request Received</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you. We will manually inspect <strong>{formData.hotelName || 'your property'}</strong> and send your tailored 1-page teardown PDF to <strong>{formData.email}</strong> within 24–48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Hotel / Property Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hotel Riva Boutique"
                      value={formData.hotelName}
                      onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Website URL *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://yourhotel.com"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Elena Marković"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="reservations@yourhotel.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Any specific concern? (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Mobile speed is slow, or we are preparing for the upcoming season..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Analyzing Request...</span>
                  ) : (
                    <>
                      <span>Send Me the 1-Page Website Review</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-400 text-center mt-3">
                  We respect your privacy. No automated phone calls or spam newsletters.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* STUDIO FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-bold text-white tracking-wider">WUUS</span>
            <p className="text-slate-400 text-[11px] mt-1">
              An independent async-first digital studio based in Indonesia, partnering with boutique businesses internationally.
            </p>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-slate-300">
            <Link href="/hospitality" className="hover:text-white transition-colors">Hospitality Edition</Link>
            <Link href="/" className="hover:text-white transition-colors">Indonesian Studio (ID)</Link>
            <a href="mailto:hello@webuntukusaha.com" className="hover:text-white transition-colors">hello@webuntukusaha.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
