'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { 
  ArrowRight, 
  Check, 
  Menu, 
  X, 
  Mail, 
  PhoneCall, 
  MapPin,
  ShieldCheck,
  Globe,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ArrowUpRight,
  Smartphone,
  Calendar,
  Users
} from 'lucide-react';

export default function HospitalityPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [conceptModalOpen, setConceptModalOpen] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<'guesthouse' | 'wine-estate' | 'city-apartments'>('guesthouse');
  const [activeDemoRoomIndex, setActiveDemoRoomIndex] = useState<number>(0);
  const [demoNights, setDemoNights] = useState<number>(3);
  const [demoGuests, setDemoGuests] = useState<number>(2);
  const [demoInquirySent, setDemoInquirySent] = useState<boolean>(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Multi-concept interactive demo database
  const conceptDatabase = {
    guesthouse: {
      id: 'guesthouse' as const,
      tag: "Concept design · Albanian Riviera",
      destination: "Albanian Riviera, Albania",
      title: "A quiet place by the sea.",
      subtitle: "A Seaside Guesthouse",
      overview: "Designed for small boutique coastal properties. Room-first browsing, generous natural photography, and a calm digital welcome. High-intent guests can see terrace views, bed dimensions, and send a direct booking inquiry via WhatsApp in seconds.",
      badge: "Albanian Riviera",
      url: "riviera-stays.com",
      rooms: [
        {
          name: "Stone Courtyard Suite",
          rate: 95,
          otaRate: 115,
          size: "34 m²",
          bed: "King Bed",
          view: "Garden & Patio View",
          perk: "Breakfast & Chilled White Wine Included",
          image: "/images/hospitality/guesthouse.webp",
          description: "Morning light over the stone patio, local olive grove views, and artisan breakfast. Built with native limestone and cool linen."
        },
        {
          name: "Panoramic Sea Terrace Studio",
          rate: 135,
          otaRate: 165,
          size: "48 m²",
          bed: "King Bed + Daybed",
          view: "Direct Ionian Sea View",
          perk: "Sunset Terrace, Breakfast & Late Checkout",
          image: "/images/hospitality/coastal-retreat.jpg",
          description: "Unobstructed sea views from your private sun terrace. Features an outdoor shower, espresso bar, and artisan Mediterranean breakfast."
        }
      ]
    },
    'wine-estate': {
      id: 'wine-estate' as const,
      tag: "Concept design · Lake Ohrid, North Macedonia",
      destination: "Lake Ohrid, North Macedonia",
      title: "Heritage suites amongst vineyards.",
      subtitle: "Lakeside Wine Estate with Rooms",
      overview: "Designed for an independent boutique wine estate. Features full-screen photography optimized for mobile roaming networks, transparent room specs, tasting hours, and a direct inquiry button that connects high-intent travelers straight to the host.",
      badge: "Lake Ohrid, North Macedonia",
      url: "savoria-estate.com",
      rooms: [
        {
          name: "Heritage Balcony Suite",
          rate: 110,
          otaRate: 135,
          size: "42 m²",
          bed: "King Bed",
          view: "Lake Ohrid & Vineyards",
          perk: "Welcome Bottle of Reserve Vranec + Vineyard Breakfast",
          image: "/images/hospitality/savoria-wine-estate.jpg",
          description: "Private vineyard terrace, stone fireplace, and organic breakfast served daily. Direct bookings receive a cellar tour and reserve tasting."
        },
        {
          name: "Cellar Estate Loft",
          rate: 150,
          otaRate: 185,
          size: "55 m²",
          bed: "Super King Bed",
          view: "Historic Winery Courtyard",
          perk: "Private Wine Cellar Tour & Extended Breakfast",
          image: "/images/hospitality/palazzo-suites.jpg",
          description: "Vaulted timber ceilings, vintage copper tub, and private access to the estate library and tasting barrel room."
        }
      ]
    },
    'city-apartments': {
      id: 'city-apartments' as const,
      tag: "Concept design · Sarajevo, Bosnia and Herzegovina",
      destination: "Sarajevo Old Town, Bosnia",
      title: "Old town lofts & boutique living.",
      subtitle: "Historic City Apartments",
      overview: "Designed for city apartments and urban boutique stays. Guests can compare unit sizes on a single mobile screen, view key amenities and parking details, and receive automated check-in and keycode directions directly on their WhatsApp or Viber.",
      badge: "Sarajevo Old Town",
      url: "sarajevo-lofts.com",
      rooms: [
        {
          name: "Historic Penthouse Loft",
          rate: 85,
          otaRate: 105,
          size: "40 m²",
          bed: "Queen Bed",
          view: "Sarajevo Old Town Rooftops",
          perk: "24/7 Keyless Check-in & Artisan Bosnian Coffee",
          image: "/images/hospitality/urban-loft.jpg",
          description: "Exposed brick, skylight views over old town minarets, high-speed fiber internet, and dedicated workstation."
        },
        {
          name: "Atelier Studio Suite",
          rate: 70,
          otaRate: 88,
          size: "30 m²",
          bed: "Double Bed",
          view: "Quiet Courtyard Garden",
          perk: "Contactless Check-in & Local Neighborhood Guide",
          image: "/images/hospitality/mobile-stay-ui.jpg",
          description: "Minimalist Scandinavian-Balkan aesthetic, bespoke oak furniture, walk-in rain shower, and secure keybox entry."
        }
      ]
    }
  };

  // Assistant interactive demo state
  const [activeLang, setActiveLang] = useState<'de' | 'it' | 'en' | 'fr'>('de');

  // Calculator State
  const [revenue, setRevenue] = useState<number>(9500);
  const [commission, setCommission] = useState<number>(15);
  const [shift, setShift] = useState<number>(10);

  const totalOtaCommission = Math.round(revenue * (commission / 100));
  const potentialMonthlySaving = Math.round(totalOtaCommission * (shift / 100));

  // Form State
  const [formData, setFormData] = useState({
    hotel: '',
    name: '',
    url: '',
    email: '',
    request: 'Free 1-page review',
    message: '',
    consent: false
  });
  const [formStatus, setFormStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("Please agree to the privacy statement to submit your review request.");
      return;
    }
    setIsSubmitting(true);
    setFormStatus('Preparing your request...');

    try {
      await supabase.from('hospitality_inquiries').insert([
        {
          hotel_name: formData.hotel,
          website_url: formData.url,
          contact_name: formData.name,
          email: formData.email,
          notes: `[Request: ${formData.request}] ${formData.message ? '• ' + formData.message : ''}`.trim(),
          created_at: new Date().toISOString()
        }
      ]);
    } catch (err) {
      console.error("Database save error:", err);
    }

    // Prepare mailto fallback
    const body = `Hello Faisal,\n\nI'd like: ${formData.request}\nHotel: ${formData.hotel}\nHotel link: ${formData.url}\nName: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message || ''}\n\nI agree to the use of these details to reply to my request.`;
    
    setFormStatus('Thank you! Your request has been received. I will email your 1-page review within 2 working days.');
    setIsSubmitting(false);

    // Open mailto optionally
    setTimeout(() => {
      window.location.href = `mailto:faisalalfarizi@webuntukusaha.com?subject=${encodeURIComponent('Hotel review request: ' + formData.hotel)}&body=${encodeURIComponent(body)}`;
    }, 400);
  };

  // Assistant scenarios
  const chatScenarios = {
    de: {
      question: "Guten Abend! Wir reisen mit einem Kombi an. Haben Sie sichere Parkplätze im Innenhof, und können wir nach 22:30 Uhr einchecken?",
      answer: "Guten Abend! Ja, wir haben private Parkplätze im Innenhof, kostenfrei für Hotelgäste. Ein kontaktloser Late Check-in nach 22:30 Uhr ist über die Schlüsselbox am Haupteingang möglich. Für eine Reservierung leite ich Ihre Anfrage gerne per WhatsApp oder E-Mail an unser Team weiter."
    },
    it: {
      question: "Buonasera! Viaggiamo con un cagnolino di 5 kg. È ammesso nelle camere con balcone?",
      answer: "Buonasera! I cani di piccola taglia (fino a 10 kg) sono i benvenuti nelle camere con balcone con un piccolo supplemento di 15€ a soggiorno. Con le richieste dirette, la colazione in terrazza è sempre inclusa. Posso inoltrare la richiesta all'host via WhatsApp."
    },
    en: {
      question: "Hello! We are looking at a 4-night stay in July. What are the perks of booking direct, and do you arrange airport transfer?",
      answer: "Hello! When booking directly with us, we offer a complimentary bottle of local wine and flexible check-in. We also arrange private taxi transfers from the airport (€45 fixed). Would you like to connect directly with the host on WhatsApp?"
    },
    fr: {
      question: "Bonjour, proposez-vous des dégustations de vins du domaine le vendredi soir ?",
      answer: "Bonjour ! Des dégustations commentées ont lieu chaque vendredi à 18h30 dans le cellier historique (35€ par personne). Notre chef propose également un menu végétarien 4 plats. Je transmets volontiers votre demande à l'hôte."
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1C2733] font-sans antialiased selection:bg-[#F59E0B]/20 selection:text-[#1C2733]">
      <style jsx global>{`
        #floating-ai-builder {
          display: none !important;
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────────
          1. HEADER (AUTHENTIC WUUS DNA)
      ────────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-white border-b border-slate-200/90 py-3.5">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          
          {/* Logo Area */}
          <Link href="/hospitality" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="WUUS Logo"
              width={130}
              height={36}
              priority
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-wider text-slate-400 border-l border-slate-200 pl-3">
              Hospitality
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#1C2733]">
            <a href="#process" className="hover:text-[#F59E0B] transition-colors">How it works</a>
            <a href="#examples" className="hover:text-[#F59E0B] transition-colors">Examples</a>
            <a href="#pricing" className="hover:text-[#F59E0B] transition-colors">Pricing</a>
            <a href="#calculator" className="hover:text-[#F59E0B] transition-colors">Calculator</a>
            <a href="#about" className="hover:text-[#F59E0B] transition-colors">About</a>
            <a href="#faq" className="hover:text-[#F59E0B] transition-colors">FAQ</a>
          </nav>

          {/* Action Area */}
          <div className="hidden lg:flex items-center gap-3">
            <Link 
              href="/" 
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:text-[#1C2733] hover:border-slate-300 transition-colors flex items-center gap-1.5"
              title="Halaman utama bahasa Indonesia"
            >
              <span className="text-[10px] font-bold bg-slate-100 px-1.5 py-0.5 rounded text-[#1C2733]">ID</span>
              <span>Web Utama</span>
            </Link>
            <a
              href="#review"
              className="bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white px-4.5 py-2 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>Free 1-Page Review</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="#review"
              className="bg-[#1C2733] hover:bg-[#F59E0B] text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-colors"
            >
              Free review
            </a>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#1C2733] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-white w-full h-screen flex flex-col pt-6 px-6 pb-12 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-5">
              <Link href="/hospitality" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/logo.png"
                  alt="WUUS Logo"
                  width={130}
                  height={36}
                  className="h-8 w-auto object-contain"
                />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-l border-slate-200 pl-3">
                  Hospitality
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 bg-slate-100 rounded-lg text-slate-700 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-3 text-lg font-semibold text-[#1C2733] mb-8">
              <a href="#process" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg hover:bg-slate-50">How it works</a>
              <a href="#examples" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg hover:bg-slate-50">Examples</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg hover:bg-slate-50">Pricing</a>
              <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg hover:bg-slate-50">Calculator</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg hover:bg-slate-50">About Faisal</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg hover:bg-slate-50">FAQ</a>
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-500 pt-3 border-t border-slate-100 mt-2 flex items-center justify-between">
                <span>Kembali ke Web Utama (ID)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </nav>

            <div className="mt-auto">
              <a
                href="#review"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white py-4 rounded-xl font-bold text-base transition-colors"
              >
                Get a free 1-page review
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        {/* ─────────────────────────────────────────────────────────────
            2. HERO SECTION
        ────────────────────────────────────────────────────────────── */}
        <section className="max-w-[1224px] mx-auto px-6 sm:px-9 py-14 lg:py-24 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-14 items-center">
          
          {/* Hero Copy */}
          <div className="max-w-xl">
            <p className="text-xs font-bold tracking-[2px] text-[#F59E0B] uppercase mb-4">
              INDEPENDENT HOTELS · DIRECT CONNECTIONS
            </p>
            
            <h1 className="text-5xl sm:text-6xl lg:text-[74px] leading-[1.04] font-black tracking-[-2px] text-[#1C2733] mb-6">
              A better way<br />
              for guests to<br />
              <em className="not-italic text-[#F59E0B]">reach you.</em>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-[480px] mb-8 font-normal">
              Your hotel has a story worth discovering. Give it a website that feels like your place — and makes asking you a question effortless.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <a
                href="#review"
                className="inline-flex items-center justify-center min-h-[50px] px-8 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white rounded-lg font-bold text-sm transition-all shadow-xs"
              >
                Get a free 1-page review
              </a>
              <a
                href="#process"
                className="inline-flex items-center justify-center min-h-[50px] px-6 text-sm font-semibold text-[#1C2733] hover:text-[#F59E0B] border-b border-slate-300 hover:border-[#F59E0B] pb-0.5 transition-colors"
              >
                See how it works
              </a>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              A fresh look at your hotel on a phone. Free, no obligation.
            </p>
          </div>

          {/* Hero Visual */}
          <div className="relative h-[380px] sm:h-[480px] lg:h-[510px] w-full">
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
              <Image
                src="/images/hospitality/guesthouse.webp"
                alt="Coastal boutique guesthouse stone courtyard"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute left-6 top-6 text-white text-[10px] tracking-[2px] bg-[#1C2733]/85 backdrop-blur-xs px-3.5 py-1.5 rounded-full font-bold uppercase">
                A SMALL HOTEL · A BIG FIRST IMPRESSION
              </div>
            </div>

            {/* Floating Enquiry Card */}
            <div className="absolute -bottom-6 left-4 right-4 sm:-left-6 sm:right-8 bg-white rounded-xl p-5 border border-slate-200 shadow-xl flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-amber-50 text-[#F59E0B] flex items-center justify-center font-bold text-xl shrink-0 border border-amber-200/60">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm">
                <strong className="block text-[#1C2733] font-bold text-sm">One question from a guest.</strong>
                <p className="text-xs text-slate-500 m-0">One direct conversation with you.</p>
              </div>
            </div>

            <span className="absolute -bottom-12 right-2 text-[10px] text-slate-400">
              Concept imagery · AI generated
            </span>
          </div>

        </section>

        {/* ─────────────────────────────────────────────────────────────
            3. TRUST STRIP (AUTHENTIC WUUS FOUNDER)
        ────────────────────────────────────────────────────────────── */}
        <div className="border-y border-slate-200 bg-white">
          <div className="max-w-[1224px] mx-auto px-6 sm:px-9 py-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-200">
              <Image
                src="/images/hospitality/faisal-founder.jpg"
                alt="Faisal Alfarizi"
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="text-sm">
              <p className="text-slate-600 m-0">
                <strong className="text-[#1C2733] font-bold">Hi, I&apos;m Faisal Alfarizi.</strong> I design and build websites from Jakarta, Indonesia.<br className="hidden sm:inline" />
                You talk directly to the person building your site.
              </p>
            </div>
            <a 
              href="#about" 
              className="sm:ml-auto text-xs font-semibold text-[#1C2733] hover:text-[#F59E0B] border-b border-slate-300 pb-0.5 shrink-0 transition-colors"
            >
              Meet your designer →
            </a>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. THE MISSING CONNECTION / PROBLEMS
        ────────────────────────────────────────────────────────────── */}
        <section className="max-w-[1224px] mx-auto px-6 sm:px-9 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p className="text-xs font-bold tracking-[2px] text-[#F59E0B] uppercase mb-4">
              THE MISSING CONNECTION
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] leading-tight font-black tracking-tight text-[#1C2733]">
              They love your hotel.<br />
              Make the next step easy.
            </h2>
          </div>

          <div className="space-y-6">
            <article className="flex gap-5 pb-6 border-b border-slate-200">
              <span className="text-sm font-bold text-[#F59E0B] pt-1">01</span>
              <div>
                <h3 className="text-lg font-bold text-[#1C2733] mb-2">Let the photos load, not the guest wait.</h3>
                <p className="text-sm text-slate-600 leading-relaxed m-0">
                  Optimised images help guests explore your rooms, even on a phone using roaming data.
                </p>
              </div>
            </article>

            <article className="flex gap-5 pb-6 border-b border-slate-200">
              <span className="text-sm font-bold text-[#F59E0B] pt-1">02</span>
              <div>
                <h3 className="text-lg font-bold text-[#1C2733] mb-2">Make room details easy to find.</h3>
                <p className="text-sm text-slate-600 leading-relaxed m-0">
                  Bed types, breakfast, parking and check-in. Clear answers before a guest needs to ask.
                </p>
              </div>
            </article>

            <article className="flex gap-5">
              <span className="text-sm font-bold text-[#F59E0B] pt-1">03</span>
              <div>
                <h3 className="text-lg font-bold text-[#1C2733] mb-2">Keep the conversation direct.</h3>
                <p className="text-sm text-slate-600 leading-relaxed m-0">
                  One clear enquiry button opens WhatsApp, Viber or email, instead of another complicated form.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            5. WHAT I BUILD (Light Card + Dark Navy Card)
        ────────────────────────────────────────────────────────────── */}
        <section id="build" className="bg-[#F8F9FA] py-20 lg:py-24 border-y border-slate-200">
          <div className="max-w-[1224px] mx-auto px-6 sm:px-9">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
              <div>
                <p className="text-xs font-bold tracking-[2px] text-[#F59E0B] uppercase mb-3">
                  WHAT I BUILD
                </p>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1C2733]">
                  Your place, online.<br />
                  Without the complications.
                </h2>
              </div>
              <p className="text-sm text-slate-600 sm:text-right">
                A thoughtful website first.<br />
                An assistant only if you need one.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              
              {/* Card 1: The Essential */}
              <article className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-xs">
                <div>
                  <span className="text-2xl text-[#F59E0B] block mb-4">▤</span>
                  <p className="text-[11px] font-bold tracking-[2px] text-[#F59E0B] uppercase mb-3">
                    THE ESSENTIAL
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1C2733] mb-4">
                    A website that feels like your hotel.
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    Beautiful photography, useful room details, your local story and a simple way to enquire directly.
                  </p>
                  <ul className="space-y-3 text-sm text-[#1C2733] font-medium mb-8">
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#F59E0B] font-bold">✓</span>
                      <span>Built around mobile guests</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#F59E0B] font-bold">✓</span>
                      <span>WhatsApp, Viber or email enquiries</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#F59E0B] font-bold">✓</span>
                      <span>You own your code and content</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                  Included in every website project
                </div>
              </article>

              {/* Card 2: Optional Add-on (Dark Navy Card #1C2733) */}
              <article id="ai-concierge" className="bg-[#1C2733] text-white border border-[#233746] rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-xl">
                <div>
                  <span className="text-2xl text-[#F59E0B] block mb-4">✦</span>
                  <p className="text-[11px] font-bold tracking-[2px] text-[#F59E0B] uppercase mb-3">
                    OPTIONAL ADD-ON
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    A little help after hours.
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    An AI assistant for common questions, using the house information you approve.
                  </p>

                  {/* Language Toggle */}
                  <div className="flex items-center gap-2 mb-4 bg-white/10 p-1 rounded-lg w-fit">
                    {(['de', 'it', 'en', 'fr'] as const).map(l => (
                      <button
                        key={l}
                        onClick={() => setActiveLang(l)}
                        className={`px-3 py-1 text-xs font-bold rounded uppercase transition-colors ${
                          activeLang === l ? 'bg-[#F59E0B] text-[#1C2733]' : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>

                  {/* Chat demo */}
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-3 mb-4">
                    <p className="text-xs bg-white/10 p-3 rounded-lg text-slate-200 m-0 leading-relaxed">
                      “{chatScenarios[activeLang].question}”
                    </p>
                    <p className="text-xs bg-white text-[#1C2733] p-3.5 rounded-lg font-medium m-0 leading-relaxed">
                      “{chatScenarios[activeLang].answer}”
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed m-0">
                  Illustrative conversation. The assistant does not confirm bookings, availability or payments.
                </p>
              </article>

            </div>

          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            6. DESIGN EXPLORATION / CONCEPT SECTION
        ────────────────────────────────────────────────────────────── */}
        <section id="examples" className="max-w-[1224px] mx-auto px-6 sm:px-9 py-20 lg:py-24">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
            <div>
              <p className="text-xs font-bold tracking-[2px] text-[#F59E0B] uppercase mb-3">
                DESIGN EXPLORATION
              </p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1C2733]">
                Small hotel.<br />
                Distinct character.
              </h2>
            </div>
            <p className="text-sm text-slate-600 sm:text-right">
              A design concept, not a client project.<br />
              Explore the direction below.
            </p>
          </div>

          {/* Flagship Concept 01: Seaside Guesthouse with Realistic Smartphone Device Mockup */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-xs mb-8">
            
            {/* Left: Smartphone Mockup Viewport */}
            <div className="p-6 sm:p-10 bg-slate-50 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-200">
              <div className="relative w-full max-w-[320px] sm:max-w-[340px] bg-[#141C24] rounded-[44px] p-3 shadow-2xl border-4 border-slate-700/80">
                {/* Speaker & Dynamic Notch */}
                <div className="w-24 h-4 bg-[#0F1720] rounded-full mx-auto mb-2.5 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                </div>
                
                {/* Smartphone Screen Content */}
                <div className="relative h-[530px] w-full rounded-[30px] overflow-hidden bg-white text-[#1C2733] flex flex-col justify-between border border-slate-200">
                  {/* Top Mobile Browser Bar */}
                  <div className="bg-slate-100/90 border-b border-slate-200 px-3 py-1.5 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1 font-bold text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      riviera-stays.com
                    </span>
                    <span className="text-[9px] bg-white px-1.5 py-0.5 rounded text-slate-400">AA</span>
                  </div>

                  {/* Photo area */}
                  <div className="relative h-56 w-full shrink-0">
                    <Image
                      src="/images/hospitality/guesthouse.webp"
                      alt="Coastal guesthouse design concept"
                      fill
                      priority
                      sizes="360px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-extrabold text-[#1C2733] shadow-xs">
                      Albanian Riviera
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-wider">Independent Guesthouse</p>
                      <h4 className="text-lg font-bold leading-tight">Stone Courtyard Suite</h4>
                      <p className="text-[11px] text-slate-200 mt-0.5">€95 / night · Direct booking rate</p>
                    </div>
                  </div>

                  {/* Room details & direct perks */}
                  <div className="p-3.5 flex-1 flex flex-col justify-between text-xs space-y-2.5 bg-slate-50">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-slate-600 font-semibold text-[10px] border-b border-slate-200 pb-1.5">
                        <span>34 m² · King Bed · Garden View</span>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">Breakfast Included</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-3">
                        Morning light over the stone patio, local olive grove views, and artisan breakfast. Direct booking perk: Complimentary bottle of chilled local white wine.
                      </p>
                    </div>

                    {/* 1-Tap Direct Inquiry Button inside phone */}
                    <div className="space-y-1.5 pt-1.5 border-t border-slate-200">
                      <button 
                        onClick={() => {
                          setSelectedConcept('guesthouse');
                          setActiveDemoRoomIndex(0);
                          setDemoInquirySent(false);
                          setConceptModalOpen(true);
                        }}
                        className="w-full py-2.5 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>Book Direct via WhatsApp</span>
                      </button>
                      <p className="text-[9px] text-center text-slate-500 font-medium m-0">
                        Tap to test interactive live demo
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom home bar indicator */}
                <div className="w-28 h-1 bg-slate-600 rounded-full mx-auto mt-2.5" />
              </div>
            </div>

            {/* Right: Copy & Live Demo Trigger */}
            <div className="p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold tracking-[2px] text-[#F59E0B] uppercase mb-2">
                  01 · A SEASIDE GUESTHOUSE
                </p>
                <h3 className="text-3xl sm:text-4xl font-bold text-[#1C2733] mb-4">
                  Let the place<br />
                  do the talking.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  Room-first browsing, generous photography, and a calm digital welcome. Rendered in the realistic mobile frame so you can test how high-intent guests navigate and enquire directly.
                </p>

                {/* Concrete Specs */}
                <div className="space-y-2.5 pt-1 pb-6 text-xs text-slate-700 font-medium border-y border-slate-100 mb-6">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Opens in under 1 second:</strong> Compressed photography eliminates drop-off on mobile roaming networks.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Room details on one screen:</strong> Bed dimensions, terrace views, and included perks clearly stated.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>1-Tap direct enquiry:</strong> Opens WhatsApp or email pre-filled with the guest&apos;s chosen room and dates.</span>
                  </div>
                </div>
              </div>

              {/* Action and QR Code Scanner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() => {
                    setSelectedConcept('guesthouse');
                    setActiveDemoRoomIndex(0);
                    setDemoInquirySent(false);
                    setConceptModalOpen(true);
                  }}
                  className="inline-flex items-center justify-center min-h-[46px] px-6 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-xs gap-1.5"
                >
                  <span>▶ Try Live Demo Simulator</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                {/* QR Code Scanner Card for Desktop */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center gap-3">
                  <div className="w-12 h-12 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center border border-slate-200 shadow-2xs">
                    <svg viewBox="0 0 29 29" className="w-full h-full text-[#1C2733] fill-current">
                      <path d="M0,0 h7 v7 h-7 z M1,1 v5 h5 v-5 z M2,2 h3 v3 h-3 z" />
                      <path d="M22,0 h7 v7 h-7 z M23,1 v5 h5 v-5 z M24,2 h3 v3 h-3 z" />
                      <path d="M0,22 h7 v7 h-7 z M1,23 v5 h5 v-5 z M2,24 h3 v3 h-3 z" />
                      <path d="M8,2 h2 v1 h-2 z M12,2 h1 v3 h-1 z M15,1 h2 v2 h-2 z M19,3 h2 v1 h-2 z" />
                      <path d="M9,8 h2 v2 h-2 z M13,7 h3 v2 h-3 z M18,8 h2 v2 h-2 z M22,9 h4 v1 h-4 z" />
                      <path d="M8,12 h4 v2 h-4 z M14,11 h2 v3 h-2 z M18,13 h3 v2 h-3 z M23,12 h2 v2 h-2 z" />
                      <path d="M9,17 h2 v2 h-2 z M13,16 h3 v2 h-3 z M18,17 h2 v2 h-2 z M22,18 h4 v1 h-4 z" />
                      <path d="M8,22 h2 v3 h-2 z M12,24 h3 v2 h-3 z M17,23 h2 v3 h-2 z M21,22 h3 v2 h-3 z" />
                    </svg>
                  </div>
                  <div className="text-[11px] leading-tight text-slate-500">
                    <strong className="block text-[#1C2733] font-bold">Scan to test on phone</strong>
                    Test live speed on your device
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-4 m-0">
                Interactive mockup & design concept · No client affiliation
              </p>
            </div>
          </div>

          {/* 2 Complementary Concepts in 2-Column Grid with Demo Triggers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Concept 02: Lakeside Wine Estate */}
            <article className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs group">
              <div>
                <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-slate-50 mb-6 border border-slate-200">
                  <Image
                    src="/images/hospitality/savoria-wine-estate.jpg"
                    alt="Lake Ohrid boutique wine estate"
                    fill
                    sizes="500px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#1C2733]/90 text-white px-2.5 py-1 rounded text-xs font-bold">
                    Concept design · Lake Ohrid, North Macedonia
                  </span>
                  <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-[#1C2733] font-bold text-[10px] px-2.5 py-1 rounded-full shadow-xs">
                    Demo Simulator Ready
                  </span>
                </div>

                <p className="text-[10px] font-bold tracking-[2px] text-[#F59E0B] uppercase mb-1">
                  02 · INDEPENDENT WINE ESTATE
                </p>
                <h4 className="text-2xl font-bold text-[#1C2733] mb-3">
                  Lakeside wine estate & rooms
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Balcony suites with lake views, organic breakfast details, and welcoming reserve bottle perks for guests who book direct. Includes interactive wine tasting reservations.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setSelectedConcept('wine-estate');
                    setActiveDemoRoomIndex(0);
                    setDemoInquirySent(false);
                    setConceptModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <span>▶ Try Live Demo</span>
                </button>
                <button
                  onClick={() => {
                    setFormData(prev => ({ 
                      ...prev, 
                      request: 'A website for my hotel',
                      message: 'Interested in a design direction like the Lakeside Wine Estate concept.' 
                    }));
                    const elem = document.getElementById('review');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-[#1C2733] hover:text-[#F59E0B] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Ask about a site like this</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>

            {/* Concept 03: Historic City Boutique Apartments */}
            <article className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs group">
              <div>
                <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-slate-50 mb-6 border border-slate-200">
                  <Image
                    src="/images/hospitality/urban-loft.jpg"
                    alt="Sarajevo historic boutique apartments"
                    fill
                    sizes="500px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#1C2733]/90 text-white px-2.5 py-1 rounded text-xs font-bold">
                    Concept design · Sarajevo, Bosnia
                  </span>
                  <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-[#1C2733] font-bold text-[10px] px-2.5 py-1 rounded-full shadow-xs">
                    Demo Simulator Ready
                  </span>
                </div>

                <p className="text-[10px] font-bold tracking-[2px] text-[#F59E0B] uppercase mb-1">
                  03 · BOUTIQUE URBAN APARTMENTS
                </p>
                <h4 className="text-2xl font-bold text-[#1C2733] mb-3">
                  Historic city apartments & lofts
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Multiple room layouts compared on one screen, contactless check-in instructions in four languages, and a direct enquiry button that delivers keycodes straight to WhatsApp or Viber.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setSelectedConcept('city-apartments');
                    setActiveDemoRoomIndex(0);
                    setDemoInquirySent(false);
                    setConceptModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <span>▶ Try Live Demo</span>
                </button>
                <button
                  onClick={() => {
                    setFormData(prev => ({ 
                      ...prev, 
                      request: 'A website for my hotel',
                      message: 'Interested in a design direction like the Historic City Apartments concept.' 
                    }));
                    const elem = document.getElementById('review');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-[#1C2733] hover:text-[#F59E0B] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Ask about a site like this</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>

          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            7. A SIMPLE, PERSONAL PROCESS (4 Steps)
        ────────────────────────────────────────────────────────────── */}
        <section id="process" className="bg-[#F8F9FA] py-20 lg:py-24 border-y border-slate-200">
          <div className="max-w-[1224px] mx-auto px-6 sm:px-9">
            
            <p className="text-xs font-bold tracking-[2px] text-[#F59E0B] uppercase mb-3">
              A SIMPLE, PERSONAL PROCESS
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1C2733] mb-12">
              From first look to a fresh start.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <article className="border-t border-slate-300 pt-6">
                <span className="text-sm font-bold text-[#F59E0B] block mb-4">01</span>
                <h3 className="text-xl font-bold text-[#1C2733] mb-2">Review</h3>
                <p className="text-sm text-slate-600 leading-relaxed m-0">
                  A one-page look at how a guest experiences your hotel online.
                </p>
              </article>

              <article className="border-t border-slate-300 pt-6">
                <span className="text-sm font-bold text-[#F59E0B] block mb-4">02</span>
                <h3 className="text-xl font-bold text-[#1C2733] mb-2">Proposal</h3>
                <p className="text-sm text-slate-600 leading-relaxed m-0">
                  A clear scope, fixed price and timeline before you commit.
                </p>
              </article>

              <article className="border-t border-slate-300 pt-6">
                <span className="text-sm font-bold text-[#F59E0B] block mb-4">03</span>
                <h3 className="text-xl font-bold text-[#1C2733] mb-2">Build</h3>
                <p className="text-sm text-slate-600 leading-relaxed m-0">
                  A private preview you can review around your hotel&apos;s schedule.
                </p>
              </article>

              <article className="border-t border-slate-300 pt-6">
                <span className="text-sm font-bold text-[#F59E0B] block mb-4">04</span>
                <h3 className="text-xl font-bold text-[#1C2733] mb-2">Launch</h3>
                <p className="text-sm text-slate-600 leading-relaxed m-0">
                  Your domain connected, your site checked and your code handed over.
                </p>
              </article>
            </div>

          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            8. PRICING & COMMISSION CALCULATOR
        ────────────────────────────────────────────────────────────── */}
        <section id="pricing" className="max-w-[1224px] mx-auto px-6 sm:px-9 py-20 lg:py-24">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
            <div>
              <p className="text-xs font-bold tracking-[2px] text-[#F59E0B] uppercase mb-3">
                A CLEAR STARTING POINT
              </p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1C2733]">
                A right-sized website.<br />
                A clearly scoped price.
              </h2>
            </div>
            <p className="text-sm text-slate-600 sm:text-right">
              Indicative ranges from the proposed packages.<br />
              Your final quote follows the free review.
            </p>
          </div>

          {/* 3 Pricing Packages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* Starter */}
            <article className="border border-slate-200 rounded-2xl p-8 bg-white flex flex-col shadow-xs">
              <p className="text-[10px] font-bold tracking-[2px] text-[#F59E0B] uppercase mb-2">STARTER</p>
              <h3 className="text-xl font-bold text-[#1C2733] mb-1">A first home online.</h3>
              <div className="text-3xl font-extrabold text-[#1C2733] tracking-tight my-4">€490–590</div>
              <p className="text-xs text-slate-500 mb-6">For a hotel without a website.</p>
              <ul className="space-y-2.5 text-xs text-[#1C2733] mb-8 font-medium">
                <li className="flex items-center gap-2"><span className="text-[#F59E0B] font-bold">✓</span> One-page website</li>
                <li className="flex items-center gap-2"><span className="text-[#F59E0B] font-bold">✓</span> Photo gallery & essential details</li>
                <li className="flex items-center gap-2"><span className="text-[#F59E0B] font-bold">✓</span> Direct contact links</li>
              </ul>
              <a href="#review" className="mt-auto inline-flex items-center justify-center min-h-[46px] border border-slate-300 hover:bg-slate-50 text-[#1C2733] font-bold text-xs rounded-lg transition-colors text-center">
                Start with a free review
              </a>
            </article>

            {/* Showcase (Featured) */}
            <article className="relative border-2 border-[#F59E0B] rounded-2xl p-8 bg-amber-50/20 flex flex-col shadow-md">
              <span className="absolute -top-3.5 left-6 bg-[#F59E0B] text-[#1C2733] font-extrabold text-[10px] tracking-wider px-3.5 py-1 rounded-full uppercase shadow-xs">
                THE EVERYDAY ESSENTIAL
              </span>
              <p className="text-[10px] font-bold tracking-[2px] text-[#F59E0B] uppercase mb-2">SHOWCASE</p>
              <h3 className="text-xl font-bold text-[#1C2733] mb-1">Your whole story.</h3>
              <div className="text-3xl font-extrabold text-[#1C2733] tracking-tight my-4">€690–890</div>
              <p className="text-xs text-slate-500 mb-6">For a hotel ready for a fuller website.</p>
              <ul className="space-y-2.5 text-xs text-[#1C2733] mb-8 font-medium">
                <li className="flex items-center gap-2"><span className="text-[#F59E0B] font-bold">✓</span> Room pages & your local story</li>
                <li className="flex items-center gap-2"><span className="text-[#F59E0B] font-bold">✓</span> Mobile enquiry paths</li>
                <li className="flex items-center gap-2"><span className="text-[#F59E0B] font-bold">✓</span> Domain setup and handover</li>
              </ul>
              <a href="#review" className="mt-auto inline-flex items-center justify-center min-h-[46px] bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white font-bold text-xs rounded-lg transition-all text-center shadow-xs">
                Start with a free review
              </a>
            </article>

            {/* Showcase + Assistant */}
            <article className="border border-slate-200 rounded-2xl p-8 bg-white flex flex-col shadow-xs">
              <p className="text-[10px] font-bold tracking-[2px] text-[#F59E0B] uppercase mb-2">SHOWCASE + ASSISTANT</p>
              <h3 className="text-xl font-bold text-[#1C2733] mb-1">Help after hours.</h3>
              <div className="text-3xl font-extrabold text-[#1C2733] tracking-tight my-4">€1,490–1,690</div>
              <p className="text-xs text-slate-500 mb-6">For recurring guest questions.</p>
              <ul className="space-y-2.5 text-xs text-[#1C2733] mb-8 font-medium">
                <li className="flex items-center gap-2"><span className="text-[#F59E0B] font-bold">✓</span> Everything in Showcase</li>
                <li className="flex items-center gap-2"><span className="text-[#F59E0B] font-bold">✓</span> Approved house information setup</li>
                <li className="flex items-center gap-2"><span className="text-[#F59E0B] font-bold">✓</span> Optional AI assistant</li>
              </ul>
              <a href="#review" className="mt-auto inline-flex items-center justify-center min-h-[46px] border border-slate-300 hover:bg-slate-50 text-[#1C2733] font-bold text-xs rounded-lg transition-colors text-center">
                Start with a free review
              </a>
            </article>

          </div>

          {/* Payment Terms Strip */}
          <div className="py-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between text-xs sm:text-sm text-[#1C2733] gap-2">
            <strong className="font-bold">Proposed payment terms</strong>
            <span className="text-slate-600">50% to start · 50% after staging approval · Invoiced in euros (Wise SEPA)</span>
          </div>
          <p className="text-xs text-slate-500 mt-3 mb-12">
            Pricing and payment terms are planning estimates, subject to an agreed proposal. Assistant running costs, hosting, revisions and delivery dates are confirmed in writing.
          </p>

          {/* Commission Calculator */}
          <div id="calculator" className="bg-[#F8F9FA] p-8 sm:p-10 rounded-2xl border border-slate-200 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10">
            <div>
              <p className="text-[10px] font-bold tracking-[2px] text-[#F59E0B] uppercase mb-2">
                PUT YOUR OWN NUMBERS IN
              </p>
              <h3 className="text-2xl font-bold text-[#1C2733] mb-3">
                What could a direct enquiry be worth?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">
                This estimate is based on your assumptions. It is not a promise of increased bookings.
              </p>
            </div>

            <div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <label className="text-xs font-semibold text-[#1C2733]">
                  Monthly OTA revenue (€)
                  <input
                    type="number"
                    min="0"
                    value={revenue}
                    onChange={(e) => setRevenue(Number(e.target.value) || 0)}
                    className="w-full mt-1.5 p-2.5 bg-white border border-slate-300 rounded-lg text-sm text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B]"
                  />
                </label>

                <label className="text-xs font-semibold text-[#1C2733]">
                  Commission (%)
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={commission}
                    onChange={(e) => setCommission(Number(e.target.value) || 0)}
                    className="w-full mt-1.5 p-2.5 bg-white border border-slate-300 rounded-lg text-sm text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B]"
                  />
                </label>

                <label className="text-xs font-semibold text-[#1C2733]">
                  Shift to direct (%)
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={shift}
                    onChange={(e) => setShift(Number(e.target.value) || 0)}
                    className="w-full mt-1.5 p-2.5 bg-white border border-slate-300 rounded-lg text-sm text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B]"
                  />
                </label>
              </div>

              <div className="flex gap-8 py-3 border-t border-slate-200 mb-2">
                <div>
                  <span className="text-xs text-slate-500 block">Monthly OTA commission</span>
                  <strong className="text-2xl font-bold text-[#1C2733]">
                    €{totalOtaCommission.toLocaleString()}
                  </strong>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Potential monthly saving</span>
                  <strong className="text-2xl font-bold text-[#F59E0B]">
                    €{potentialMonthlySaving.toLocaleString()}
                  </strong>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 m-0">
                Revenue × commission × assumed shift. Excludes other costs. Calculated on your device.
              </p>
            </div>
          </div>

        </section>

        {/* ─────────────────────────────────────────────────────────────
            9. ABOUT ME: FAISAL ALFARIZI
        ────────────────────────────────────────────────────────────── */}
        <section id="about" className="bg-[#F8F9FA] py-20 lg:py-24 border-y border-slate-200">
          <div className="max-w-[1224px] mx-auto px-6 sm:px-9">
            
            <p className="text-xs font-bold tracking-[2px] text-[#F59E0B] uppercase mb-4">
              WHO YOU&apos;LL BE WORKING WITH
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-[#1C2733] leading-tight mb-6">
                  One person.<br />
                  One conversation.<br />
                  <em className="not-italic text-[#F59E0B]">Your hotel.</em>
                </h2>
                
                <div className="relative w-52 h-52 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <Image
                    src="/images/hospitality/faisal-founder.jpg"
                    alt="Faisal Alfarizi"
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                <p className="text-lg text-[#1C2733] font-semibold leading-normal">
                  I&apos;m Faisal Alfarizi, an independent web designer based in Jakarta, Indonesia.
                </p>
                <p>
                  You&apos;ll work directly with me, from the first review to the final handover. Most of the work happens through written updates and short video walkthroughs, so you can review things when your hotel&apos;s schedule allows.
                </p>
                <p>
                  Jakarta is 5 to 6 hours ahead of the Balkans, so I do the deep work during your quiet hours and deliver fresh updates by your morning.
                </p>
                <div className="pt-2">
                  <a 
                    href="mailto:faisalalfarizi@webuntukusaha.com"
                    className="text-sm font-bold text-[#1C2733] hover:text-[#F59E0B] border-b border-slate-300 pb-0.5 transition-colors"
                  >
                    faisalalfarizi@webuntukusaha.com
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            10. FAQ SECTION
        ────────────────────────────────────────────────────────────── */}
        <section id="faq" className="max-w-[1224px] mx-auto px-6 sm:px-9 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16">
          <div>
            <p className="text-xs font-bold tracking-[2px] text-[#F59E0B] uppercase mb-4">
              A FEW GOOD QUESTIONS
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1C2733] leading-tight">
              Let&apos;s make<br />
              things clear.
            </h2>
          </div>

          <div className="divide-y divide-slate-200">
            <details className="py-5 group" open>
              <summary className="font-bold text-base sm:text-lg text-[#1C2733] cursor-pointer list-none flex justify-between items-center">
                <span>Is this a booking engine?</span>
                <span className="text-[#F59E0B] font-bold text-xl group-open:hidden">+</span>
                <span className="text-[#F59E0B] font-bold text-xl hidden group-open:inline">−</span>
              </summary>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                No. The website helps guests send you enquiries directly. It does not process reservations or payments. An existing booking system can be integrated or discussed separately.
              </p>
            </details>

            <details className="py-5 group">
              <summary className="font-bold text-base sm:text-lg text-[#1C2733] cursor-pointer list-none flex justify-between items-center">
                <span>I don&apos;t have a website. Can I get a review?</span>
                <span className="text-[#F59E0B] font-bold text-xl group-open:hidden">+</span>
                <span className="text-[#F59E0B] font-bold text-xl hidden group-open:inline">−</span>
              </summary>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Yes. Share your Booking.com, Instagram or Google Maps link instead.
              </p>
            </details>

            <details className="py-5 group">
              <summary className="font-bold text-base sm:text-lg text-[#1C2733] cursor-pointer list-none flex justify-between items-center">
                <span>Who owns the website?</span>
                <span className="text-[#F59E0B] font-bold text-xl group-open:hidden">+</span>
                <span className="text-[#F59E0B] font-bold text-xl hidden group-open:inline">−</span>
              </summary>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                You own the website code and content after the agreed handover. Hosting and optional assistant services are covered separately in your proposal.
              </p>
            </details>

            <details className="py-5 group">
              <summary className="font-bold text-base sm:text-lg text-[#1C2733] cursor-pointer list-none flex justify-between items-center">
                <span>What can the AI assistant do?</span>
                <span className="text-[#F59E0B] font-bold text-xl group-open:hidden">+</span>
                <span className="text-[#F59E0B] font-bold text-xl hidden group-open:inline">−</span>
              </summary>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                It answers common questions from information you approve. It can make mistakes and should refer uncertain questions to your team. It does not confirm availability or take bookings.
              </p>
            </details>

            <details className="py-5 group">
              <summary className="font-bold text-base sm:text-lg text-[#1C2733] cursor-pointer list-none flex justify-between items-center">
                <span>How long does a build take?</span>
                <span className="text-[#F59E0B] font-bold text-xl group-open:hidden">+</span>
                <span className="text-[#F59E0B] font-bold text-xl hidden group-open:inline">−</span>
              </summary>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                A timeline is agreed after the review and depends on scope and when your photos and text are ready (typically 7–14 days).
              </p>
            </details>

            <details className="py-5 group">
              <summary className="font-bold text-base sm:text-lg text-[#1C2733] cursor-pointer list-none flex justify-between items-center">
                <span>Do I need to commit after the free review?</span>
                <span className="text-[#F59E0B] font-bold text-xl group-open:hidden">+</span>
                <span className="text-[#F59E0B] font-bold text-xl hidden group-open:inline">−</span>
              </summary>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                No. The review is a starting point. You can decide whether a website project makes sense for your hotel.
              </p>
            </details>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            11. REVIEW FORM SECTION (AUTHENTIC WUUS DARK NAVY #1C2733)
        ────────────────────────────────────────────────────────────── */}
        <section id="review" className="bg-[#1C2733] text-white py-20 lg:py-28 border-t border-[#233746]">
          <div className="max-w-[1224px] mx-auto px-6 sm:px-9 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-18 items-center">
            
            {/* Left Copy */}
            <div>
              <p className="text-xs font-bold tracking-[2px] text-[#F59E0B] uppercase mb-4">
                YOUR NEXT STEP
              </p>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
                A fresh pair of eyes.<br />
                <em className="not-italic text-[#F59E0B]">A clearer next step.</em>
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
                Get a free 1-page review of your hotel&apos;s online presence, seen the way a guest sees it on a phone.
              </p>

              <div className="space-y-4 my-8 text-sm text-slate-200 font-semibold">
                <p className="flex items-center gap-3 m-0">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-[#F59E0B] flex items-center justify-center text-xs font-bold">01</span>
                  <span>Share your hotel link</span>
                </p>
                <p className="flex items-center gap-3 m-0">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-[#F59E0B] flex items-center justify-center text-xs font-bold">02</span>
                  <span>Get practical recommendations</span>
                </p>
                <p className="flex items-center gap-3 m-0">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-[#F59E0B] flex items-center justify-center text-xs font-bold">03</span>
                  <span>Decide what feels right for you</span>
                </p>
              </div>

              <p className="text-xs text-slate-400">
                No website yet? Your listing or Instagram works too.
              </p>
            </div>

            {/* Right White Form */}
            <form onSubmit={handleFormSubmit} className="bg-white text-[#1C2733] p-8 sm:p-10 rounded-2xl shadow-2xl space-y-4 border border-slate-100">
              <h3 className="text-2xl font-bold text-[#1C2733] mb-4">Get your free review</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="text-xs font-semibold text-[#1C2733]">
                  Hotel name *
                  <input
                    type="text"
                    required
                    placeholder="Your hotel or guesthouse"
                    value={formData.hotel}
                    onChange={e => setFormData({ ...formData, hotel: e.target.value })}
                    className="w-full mt-1.5 p-3 border border-slate-300 rounded-lg text-sm text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B]"
                  />
                </label>
                <label className="text-xs font-semibold text-[#1C2733]">
                  Your name *
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full mt-1.5 p-3 border border-slate-300 rounded-lg text-sm text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B]"
                  />
                </label>
              </div>

              <label className="text-xs font-semibold text-[#1C2733] block">
                Where can I find your hotel online? *
                <input
                  type="text"
                  required
                  placeholder="Website, Booking.com, Instagram or Google Maps"
                  value={formData.url}
                  onChange={e => setFormData({ ...formData, url: e.target.value })}
                  className="w-full mt-1.5 p-3 border border-slate-300 rounded-lg text-sm text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B]"
                />
              </label>

              <label className="text-xs font-semibold text-[#1C2733] block">
                Email *
                <input
                  type="email"
                  required
                  placeholder="you@yourhotel.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full mt-1.5 p-3 border border-slate-300 rounded-lg text-sm text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B]"
                />
              </label>

              <label className="text-xs font-semibold text-[#1C2733] block">
                What would you like?
                <select
                  value={formData.request}
                  onChange={e => setFormData({ ...formData, request: e.target.value })}
                  className="w-full mt-1.5 p-3 border border-slate-300 rounded-lg text-sm text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B] bg-white"
                >
                  <option>Free 1-page review</option>
                  <option>A website for my hotel</option>
                  <option>A website + AI assistant</option>
                  <option>I&apos;m not sure yet</option>
                </select>
              </label>

              <label className="text-xs font-semibold text-[#1C2733] block">
                Anything you&apos;d like me to look at? <span className="font-normal text-slate-500">(optional)</span>
                <textarea
                  rows={2}
                  placeholder="A question, a concern, an idea…"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full mt-1.5 p-3 border border-slate-300 rounded-lg text-sm text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B] resize-none"
                />
              </label>

              <label className="flex items-start gap-2.5 text-xs text-slate-600 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={e => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-0.5 accent-[#F59E0B] w-4 h-4 shrink-0"
                />
                <span>
                  I agree to share these details so WUUS can reply to my request.{' '}
                  <button
                    type="button"
                    onClick={() => setPrivacyModalOpen(true)}
                    className="underline text-[#1C2733] hover:text-[#F59E0B] font-semibold inline"
                  >
                    Privacy information
                  </button>
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white font-bold text-sm rounded-lg transition-all cursor-pointer shadow-md mt-3"
              >
                {isSubmitting ? "Sending..." : "Prepare my free review request"}
              </button>

              <p className="text-[11px] text-slate-500 text-center mt-2 m-0">
                I read every request myself and reply by email. I won&apos;t call you.
              </p>

              {formStatus && (
                <p className="text-xs font-semibold text-emerald-800 bg-emerald-50 p-3 rounded-lg border border-emerald-200 mt-3">
                  {formStatus}
                </p>
              )}
            </form>

          </div>
        </section>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          12. AUTHENTIC WUUS FOOTER
      ────────────────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-slate-200/90 pt-16 pb-12">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">

            {/* Studio Brand */}
            <div className="lg:col-span-2">
              <Link href="/hospitality" className="flex items-center gap-3 mb-5">
                <Image
                  src="/logo.png"
                  alt="WUUS Studio Logo"
                  width={130}
                  height={36}
                  className="h-8 w-auto object-contain"
                />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-l border-slate-200 pl-3">
                  Hospitality
                </span>
              </Link>

              <p className="text-sm text-slate-600 mb-6 max-w-sm leading-relaxed">
                Bespoke digital architecture, direct booking engines, and 24/7 autonomous AI guest concierges engineered for independent European boutique stays and ambitious businesses.
              </p>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Available for Q2/Q3 European Boutique Deployments</span>
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="font-bold text-[#1C2733] text-xs uppercase tracking-wider mb-4">
                Practices & Solutions
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href="#build" className="text-slate-600 hover:text-[#F59E0B] transition-colors font-medium">
                    The Essential Website
                  </a>
                </li>
                <li>
                  <a href="#ai-concierge" className="text-slate-600 hover:text-[#F59E0B] transition-colors">
                    Multilingual Guest Concierge
                  </a>
                </li>
                <li>
                  <a href="#examples" className="text-slate-600 hover:text-[#F59E0B] transition-colors">
                    Seaside Concept Showcase
                  </a>
                </li>
                <li>
                  <a href="#process" className="text-slate-600 hover:text-[#F59E0B] transition-colors">
                    4-Step Personal Workflow
                  </a>
                </li>
                <li>
                  <a href="#calculator" className="text-slate-600 hover:text-[#F59E0B] transition-colors">
                    Commission Savings Calculator
                  </a>
                </li>
              </ul>
            </div>

            {/* Process & Trust */}
            <div>
              <h4 className="font-bold text-[#1C2733] text-xs uppercase tracking-wider mb-4">
                Trust & Settlement
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href="#pricing" className="text-slate-600 hover:text-[#F59E0B] transition-colors">
                    Three-Tier Scoped Pricing
                  </a>
                </li>
                <li>
                  <span className="text-slate-500">Staging-First Guarantee</span>
                </li>
                <li>
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>50/50 Milestone Escrow</span>
                  </span>
                </li>
                <li>
                  <span className="text-slate-500">European SEPA Bank Wire</span>
                </li>
                <li>
                  <span className="text-slate-500">You Own 100% of Code & Assets</span>
                </li>
              </ul>
            </div>

            {/* Contact & Studio Location */}
            <div>
              <h4 className="font-bold text-[#1C2733] text-xs uppercase tracking-wider mb-4">
                Direct Contact
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2.5 text-slate-600">
                  <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <span>Jakarta Barat, Indonesia <br /><span className="text-xs text-slate-400">Serving Europe & Worldwide</span></span>
                </li>
                <li className="flex items-center gap-2.5 text-slate-600">
                  <Mail size={16} className="text-slate-400 shrink-0" />
                  <a href="mailto:faisalalfarizi@webuntukusaha.com" className="hover:text-[#F59E0B] transition-colors">
                    faisalalfarizi@webuntukusaha.com
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-slate-600">
                  <PhoneCall size={16} className="text-slate-400 shrink-0" />
                  <a href="https://wa.me/6281383521750" className="hover:text-[#F59E0B] transition-colors font-medium">
                    +62 813-8352-1750
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-200/90 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} WUUS Studio. Seluruh hak cipta dilindungi. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link href="/hospitality/privacy" className="hover:text-slate-900 transition-colors font-medium text-slate-600">
                Hospitality Privacy & GDPR
              </Link>
              <span>•</span>
              <Link href="/syarat-ketentuan" className="hover:text-slate-900 transition-colors">
                Terms & Conditions
              </Link>
              <span>•</span>
              <Link href="/" className="hover:text-[#F59E0B] transition-colors">
                Main Studio (ID)
              </Link>
              <span>•</span>
              <Link href="/admin/inquiries" className="hover:text-slate-900 transition-colors text-slate-400">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          13. INTERACTIVE LIVE CONCEPT DEMO & SIMULATOR MODAL
      ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {conceptModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConceptModalOpen(false)}
              className="absolute inset-0 bg-[#1C2733]/85 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-[1020px] bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 z-10 max-h-[92vh] overflow-y-auto shadow-2xl space-y-6"
            >
              {/* Modal Top Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[2px] text-[#F59E0B] uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>INTERACTIVE PROTOTYPE & LIVE MOBILE SIMULATOR</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#1C2733]">
                    {conceptDatabase[selectedConcept].subtitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {conceptDatabase[selectedConcept].destination} · Sub-800ms Edge Architecture
                  </p>
                </div>
                <button
                  onClick={() => setConceptModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-[#1C2733] hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Concept Selector Tabs */}
              <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-xl text-xs font-bold text-[#1C2733]">
                <button
                  onClick={() => {
                    setSelectedConcept('guesthouse');
                    setActiveDemoRoomIndex(0);
                    setDemoInquirySent(false);
                  }}
                  className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedConcept === 'guesthouse'
                      ? 'bg-[#1C2733] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#1C2733] hover:bg-white/70'
                  }`}
                >
                  <span>🌊</span>
                  <span>Albanian Riviera (Guesthouse)</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedConcept('wine-estate');
                    setActiveDemoRoomIndex(0);
                    setDemoInquirySent(false);
                  }}
                  className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedConcept === 'wine-estate'
                      ? 'bg-[#1C2733] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#1C2733] hover:bg-white/70'
                  }`}
                >
                  <span>🍇</span>
                  <span>Lake Ohrid (Wine Estate)</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedConcept('city-apartments');
                    setActiveDemoRoomIndex(0);
                    setDemoInquirySent(false);
                  }}
                  className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedConcept === 'city-apartments'
                      ? 'bg-[#1C2733] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#1C2733] hover:bg-white/70'
                  }`}
                >
                  <span>🏛️</span>
                  <span>Sarajevo (City Lofts)</span>
                </button>
              </div>

              {/* Interactive Prototype Simulator Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left (7 cols): The Live Mockup Phone */}
                <div className="lg:col-span-7 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-bold text-[#1C2733] flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-[#F59E0B]" />
                      <span>Live Screen Preview</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      https://{conceptDatabase[selectedConcept].url}
                    </span>
                  </div>

                  {/* Room Switcher Sub-tabs */}
                  <div className="flex gap-2 mb-3">
                    {conceptDatabase[selectedConcept].rooms.map((room, idx) => (
                      <button
                        key={room.name}
                        onClick={() => {
                          setActiveDemoRoomIndex(idx);
                          setDemoInquirySent(false);
                        }}
                        className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all text-center cursor-pointer border ${
                          activeDemoRoomIndex === idx
                            ? 'bg-white border-[#1C2733] text-[#1C2733] shadow-xs'
                            : 'bg-slate-200/70 border-transparent text-slate-600 hover:bg-white'
                        }`}
                      >
                        Room {idx + 1}: {room.name.split(' ')[0]} {room.name.split(' ')[1] || ''}
                      </button>
                    ))}
                  </div>

                  {/* Mockup Card Screen */}
                  <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    {/* Room Photo */}
                    <div className="relative h-60 w-full">
                      <Image
                        src={conceptDatabase[selectedConcept].rooms[activeDemoRoomIndex].image}
                        alt={conceptDatabase[selectedConcept].rooms[activeDemoRoomIndex].name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 500px"
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-[#1C2733]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded">
                        {conceptDatabase[selectedConcept].destination}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-black text-[#1C2733] shadow-xs">
                        Direct €{conceptDatabase[selectedConcept].rooms[activeDemoRoomIndex].rate}/night
                        <span className="text-[10px] text-slate-400 font-normal line-through ml-1.5">
                          OTA €{conceptDatabase[selectedConcept].rooms[activeDemoRoomIndex].otaRate}
                        </span>
                      </div>
                    </div>

                    {/* Room Details & Description */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h4 className="text-base font-bold text-[#1C2733]">
                          {conceptDatabase[selectedConcept].rooms[activeDemoRoomIndex].name}
                        </h4>
                        <div className="flex flex-wrap gap-2 text-[11px] text-slate-600 font-medium mt-1">
                          <span className="bg-slate-100 px-2 py-0.5 rounded">{conceptDatabase[selectedConcept].rooms[activeDemoRoomIndex].size}</span>
                          <span className="bg-slate-100 px-2 py-0.5 rounded">{conceptDatabase[selectedConcept].rooms[activeDemoRoomIndex].bed}</span>
                          <span className="bg-slate-100 px-2 py-0.5 rounded">{conceptDatabase[selectedConcept].rooms[activeDemoRoomIndex].view}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {conceptDatabase[selectedConcept].rooms[activeDemoRoomIndex].description}
                      </p>

                      <div className="p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center gap-2 text-xs text-amber-900 font-medium">
                        <Sparkles className="w-4 h-4 text-[#F59E0B] shrink-0" />
                        <span><strong>Direct Booking Perk:</strong> {conceptDatabase[selectedConcept].rooms[activeDemoRoomIndex].perk}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right (5 cols): Interactive Test Controls */}
                <div className="lg:col-span-5 space-y-5">
                  <div>
                    <h4 className="text-base font-bold text-[#1C2733] mb-1">
                      Test the Booking Flow
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Adjust nights and guests to test how direct rates and pre-filled WhatsApp hand-offs operate.
                    </p>
                  </div>

                  {/* Interactive Selector */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                    <div>
                      <label className="text-[11px] font-bold text-[#1C2733] block mb-1.5 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>Nights: {demoNights}</span>
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 5].map(n => (
                          <button
                            key={n}
                            onClick={() => {
                              setDemoNights(n);
                              setDemoInquirySent(false);
                            }}
                            className={`flex-1 py-1 text-xs font-bold rounded cursor-pointer ${
                              demoNights === n ? 'bg-[#1C2733] text-white' : 'bg-white text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#1C2733] block mb-1.5 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>Guests: {demoGuests}</span>
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3].map(g => (
                          <button
                            key={g}
                            onClick={() => {
                              setDemoGuests(g);
                              setDemoInquirySent(false);
                            }}
                            className={`flex-1 py-1 text-xs font-bold rounded cursor-pointer ${
                              demoGuests === g ? 'bg-[#1C2733] text-white' : 'bg-white text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Live Cost & Savings Readout */}
                  <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-600 font-medium">Direct Booking Total:</span>
                      <strong className="text-base text-emerald-800 font-extrabold">
                        €{conceptDatabase[selectedConcept].rooms[activeDemoRoomIndex].rate * demoNights}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-slate-500">
                      <span>OTA Estimated Total (15-20% fee):</span>
                      <span className="line-through">
                        €{conceptDatabase[selectedConcept].rooms[activeDemoRoomIndex].otaRate * demoNights}
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-700 font-semibold pt-1 border-t border-emerald-200/60 m-0">
                      ✓ Guest saves €{(conceptDatabase[selectedConcept].rooms[activeDemoRoomIndex].otaRate - conceptDatabase[selectedConcept].rooms[activeDemoRoomIndex].rate) * demoNights} while you pay €0 in OTA commissions.
                    </p>
                  </div>

                  {/* Simulated WhatsApp Lead Bubble */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#1C2733] flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>Simulated WhatsApp Inquiry Message</span>
                    </span>
                    <div className="p-3.5 bg-[#E8F8F0] border border-emerald-200/80 rounded-2xl text-xs text-slate-800 leading-relaxed font-sans shadow-2xs">
                      <p className="m-0">
                        &quot;Hi! I&apos;d like to inquire about booking the <strong>{conceptDatabase[selectedConcept].rooms[activeDemoRoomIndex].name}</strong> ({conceptDatabase[selectedConcept].destination}) for <strong>{demoNights} nights</strong> ({demoGuests} guests). We saw the direct booking rate on your website with <em>{conceptDatabase[selectedConcept].rooms[activeDemoRoomIndex].perk}</em>. Could you please confirm availability?&quot;
                      </p>
                    </div>

                    <button
                      onClick={() => setDemoInquirySent(true)}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Test WhatsApp Lead Hand-off</span>
                    </button>

                    {demoInquirySent && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-white border border-emerald-300 rounded-xl text-xs text-emerald-900 font-semibold shadow-xs"
                      >
                        ✓ Simulated hand-off triggered! In production, this opens the host&apos;s WhatsApp/Viber directly with this exact message pre-filled. No lost guests, no complicated forms.
                      </motion.div>
                    )}
                  </div>

                  {/* Modal CTA Footer */}
                  <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                    <a
                      href="#review"
                      onClick={() => {
                        setConceptModalOpen(false);
                        setFormData(prev => ({
                          ...prev,
                          request: 'A website for my hotel',
                          message: `Interested in a bespoke website inspired by the ${conceptDatabase[selectedConcept].subtitle} concept.`
                        }));
                      }}
                      className="w-full py-3.5 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white font-bold text-xs rounded-xl transition-all cursor-pointer text-center shadow-xs"
                    >
                      I want a website like this for my property
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          14. PRIVACY DIALOG MODAL
      ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {privacyModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPrivacyModalOpen(false)}
              className="absolute inset-0 bg-[#1C2733]/80 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-[620px] bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 z-10 shadow-2xl space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed"
            >
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="absolute right-4 top-4 text-2xl font-light text-[#1C2733] hover:text-[#F59E0B] p-2 cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold text-[#1C2733]">Privacy information</h2>
              
              <p>
                This form prepares your request directly for review. If you submit the form, your contact details are processed solely to evaluate your hotel&apos;s mobile experience and return your 1-page note.
              </p>
              <p>
                Only share information relevant to your request. No invasive advertising trackers, third-party pixel brokers, or marketing cookies are loaded by this page.
              </p>
              <p>
                A complete privacy policy and data processing disclosure is available on{' '}
                <Link href="/hospitality/privacy" className="text-[#1C2733] underline font-semibold hover:text-[#F59E0B]">
                  the Hospitality Privacy page
                </Link>.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setPrivacyModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#1C2733] font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
