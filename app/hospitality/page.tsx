'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { 
  ArrowRight, 
  Check, 
  Send, 
  ChevronDown, 
  MapPin, 
  PhoneCall, 
  Mail, 
  Bot, 
  Languages, 
  ShieldCheck, 
  Sliders, 
  Smartphone,
  ExternalLink,
  QrCode,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

// Sample AI Assistant Scenarios (Section D1 & D2)
const assistantScenarios = [
  {
    id: 'de',
    lang: 'Deutsch (German)',
    code: 'DE',
    guestName: 'Hans & Claudia M.',
    location: 'Munich, Germany',
    time: '23:42',
    inquiry: 'Guten Abend! Wir reisen mit einem Kombi an. Haben Sie sichere Parkplätze im Innenhof, und können wir nach 22:30 Uhr kontaktlos einchecken?',
    response: 'Guten Abend! Ich bin der digitale Assistent (KI) von Villa Magnolia. Ja, wir haben private Parkplätze im Innenhof, für Hotelgäste kostenfrei, auch für größere Fahrzeuge wie Kombis. Ein kontaktloser Late Check-in nach 22:30 Uhr ist über die Schlüsselbox am Haupteingang möglich. Für eine Reservierung oder die aktuelle Verfügbarkeit leite ich Ihre Anfrage gerne an unser Team weiter, per WhatsApp, Viber oder E-Mail.',
    sourceCitation: 'Source: house information, "Parking" & "Check-in"',
    previewSummary: 'Dates: Late arrival • Vehicle: Station wagon • Inquired about: Courtyard parking & 22:30 contactless keybox'
  },
  {
    id: 'it',
    lang: 'Italiano (Italian)',
    code: 'IT',
    guestName: 'Matteo & Sofia B.',
    location: 'Milano, Italy',
    time: '22:15',
    inquiry: 'Buonasera! Viaggiamo con un cagnolino di 5 kg. È ammesso nelle camere con balcone? E la colazione è inclusa nelle richieste dirette?',
    response: 'Buonasera! Sono l\'assistente digitale (IA) di Villa Magnolia. I cani di piccola taglia (fino a 10 kg) sono i benvenuti nelle camere con balcone con un piccolo supplemento di 15€ a soggiorno. Con le richieste dirette, la colazione in terrazza è sempre inclusa. Per disponibilità o prenotazione, posso inoltrare la vostra richiesta all\'host via WhatsApp, Viber o email.',
    sourceCitation: 'Source: house information, "Pet Policy" & "Direct Perks"',
    previewSummary: 'Guests: 2 + small dog (5kg) • Inquired about: Balcony suite pet policy & direct breakfast inclusion'
  },
  {
    id: 'en',
    lang: 'English (UK / International)',
    code: 'EN',
    guestName: 'Eleanor V.',
    location: 'London, United Kingdom',
    time: '00:18',
    inquiry: 'Hello! We are looking at a 4-night stay in July. What are the perks of booking direct with you, and can you arrange airport transfer?',
    response: 'Hello! I am the digital assistant (AI) of Villa Magnolia. When you book directly with us, we offer a complimentary bottle of local wine and flexible check-in. We also arrange private taxi transfers from the airport (approx. €45 fixed, paid to the driver). For dates and reservations, I can connect you with the host on WhatsApp, Viber or email.',
    sourceCitation: 'Source: house information, "Direct Perks" & "Airport Transfer"',
    previewSummary: 'Stay: 4 nights in July • Inquired about: Direct booking perks & airport transfer coordination'
  },
  {
    id: 'fr',
    lang: 'Français (French)',
    code: 'FR',
    guestName: 'Camille & Julien D.',
    location: 'Lyon, France',
    time: '21:05',
    inquiry: 'Bonjour, proposez-vous des dégustations de vins du domaine le vendredi soir ? Et quelles sont les options végétariennes ?',
    response: 'Bonjour ! Je suis l\'assistant virtuel (IA) de Villa Magnolia. Des dégustations commentées ont lieu chaque vendredi à 18h30 dans le cellier (35€ par personne). Notre chef propose également un menu dégustation végétarien 4 plats avec les produits du potager. Pour réserver votre table, je transmets volontiers votre demande à l\'hôte.',
    sourceCitation: 'Source: house information, "Wine Tasting" & "Restaurant"',
    previewSummary: 'Inquired about: Friday 18:30 wine tasting & 4-course vegetarian tasting menu'
  }
];

export default function HospitalityPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [isTypingSim, setIsTypingSim] = useState(false);
  const [liveConceptModalOpen, setLiveConceptModalOpen] = useState(false);

  // Form State (Section E1)
  const [formData, setFormData] = useState({
    hotelName: '',
    onlineLink: '',
    yourName: '',
    yourRole: '',
    email: '',
    requestType: 'Free 1-page review',
    notes: '',
    consent: false
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScenarioChange = (idx: number) => {
    if (idx === activeScenarioIdx) return;
    setIsTypingSim(true);
    setActiveScenarioIdx(idx);
    setTimeout(() => {
      setIsTypingSim(false);
    }, 250);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("Please agree to the privacy policy to submit your review request.");
      return;
    }
    setIsSubmitting(true);
    
    try {
      const formattedNotes = `[Type: ${formData.requestType}] [Role: ${formData.yourRole || 'Not specified'}] ${formData.notes ? '• Note: ' + formData.notes : ''}`.trim();
      await supabase.from('hospitality_inquiries').insert([
        {
          hotel_name: formData.hotelName,
          website_url: formData.onlineLink,
          contact_name: formData.yourName,
          email: formData.email,
          notes: formattedNotes,
          created_at: new Date().toISOString()
        }
      ]);
    } catch (err) {
      console.error("Database save error:", err);
    }

    setIsSubmitting(false);
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-[#F59E0B] selection:text-slate-900">
      <style jsx global>{`
        #floating-ai-builder {
          display: none !important;
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────────
          1. HEADER / NAVBAR
      ────────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-xs" 
            : "bg-white border-b border-slate-100 py-4"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo & Category */}
          <div className="flex items-center gap-3">
            <Link href="/hospitality" className="flex items-center gap-2 group">
              <Image
                src="/logo.png"
                alt="WUUS Logo"
                width={130}
                height={36}
                priority
                className="h-8 md:h-9 w-auto object-contain"
              />
            </Link>
            <div className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-slate-600 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              Hospitality
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <a href="#concepts" className="hover:text-[#F59E0B] transition-colors">
              Live concepts
            </a>
            <a href="#how-it-works" className="hover:text-[#F59E0B] transition-colors">
              How it works
            </a>
            <a href="#ai-assistant" className="hover:text-[#F59E0B] transition-colors">
              AI Assistant
            </a>
            <a href="#pricing" className="hover:text-[#F59E0B] transition-colors">
              Pricing
            </a>
            <a href="#about-faisal" className="hover:text-[#F59E0B] transition-colors">
              About me
            </a>
            <a href="#faq" className="hover:text-[#F59E0B] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Header Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/" 
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200"
              title="Halaman utama bahasa Indonesia"
            >
              <span className="text-[10px] font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">ID</span>
              <span>Bahasa Indonesia</span>
            </Link>
            <a
              href="#review-request"
              className="bg-slate-900 hover:bg-[#F59E0B] hover:text-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs"
            >
              Free review
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-2.5">
            <a
              href="#review-request"
              className="bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold"
            >
              Free review
            </a>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-slate-800 bg-white rounded-md border border-slate-200"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-white w-full h-screen flex flex-col pt-6 px-6 pb-12 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <Link href="/hospitality" onClick={() => setMobileMenuOpen(false)}>
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
                className="p-2 bg-slate-100 rounded-full text-slate-800 border border-slate-200"
                aria-label="Close Navigation Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-5 mb-8 text-lg font-bold text-slate-900">
              <a
                href="#concepts"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-slate-100 pb-3"
              >
                Live concepts
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-slate-100 pb-3"
              >
                How it works
              </a>
              <a
                href="#ai-assistant"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-slate-100 pb-3"
              >
                AI Assistant
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-slate-100 pb-3"
              >
                Pricing & Scope
              </a>
              <a
                href="#about-faisal"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-slate-100 pb-3"
              >
                Who you work with
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-slate-100 pb-3"
              >
                FAQ
              </a>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-600 pt-2 flex items-center gap-2"
              >
                <span className="font-bold text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">ID</span>
                <span>Halaman Utama Indonesia</span>
              </Link>
            </nav>

            <div className="mt-auto">
              <a
                href="#review-request"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center bg-slate-900 hover:bg-[#F59E0B] text-white hover:text-slate-900 px-6 py-4 rounded-full font-bold text-base transition-all"
              >
                Get a free 1-page review
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION
      ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden border-b border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl relative z-20">
          
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-6 border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              <span>Websites for independent hotels in the Balkans</span>
            </div>

            {/* H1 */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12] mb-6">
              A faster way for guests to reach your hotel directly.
            </h1>

            {/* Subhead (18px for strong legibility) */}
            <p className="text-base sm:text-lg text-slate-700 max-w-2xl mb-8 font-normal leading-relaxed">
              I design and build fast, mobile-first websites for independent hotels and guesthouses. Guests can ask a question or send an enquiry straight to you on WhatsApp, Viber or email. An optional AI assistant answers their common questions at night, in German, Italian, French and English.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md mx-auto mb-6">
              <a
                href="#review-request"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 hover:bg-[#F59E0B] hover:text-slate-900 text-white font-bold text-sm tracking-tight transition-all text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Get a free 1-page review</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#concepts"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold text-sm tracking-tight transition-all text-center"
              >
                View live concept
              </a>
            </div>

            {/* Microcopy under CTA (High contrast 14px) */}
            <p className="text-sm text-slate-600 max-w-lg mb-8 leading-relaxed">
              I&apos;ll look at your hotel on a phone, the way a guest would, and send you a one-page note within 2 working days. Free, no obligation.
            </p>

            {/* Trust line */}
            <div className="pt-5 border-t border-slate-200 w-full max-w-xl text-xs text-slate-600 font-medium flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
              <span>Based in Jakarta</span>
              <span>·</span>
              <span>Fixed price</span>
              <span>·</span>
              <span>You own the code</span>
              <span>·</span>
              <span>50% to start, 50% after you approve it</span>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. FEATURED LIVE CONCEPT SHOWCASE (BIG VISUAL PROOF + QR CODE)
      ────────────────────────────────────────────────────────────── */}
      <section id="concepts" className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800 text-[#F59E0B] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Visual Proof</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Test the mobile experience right now.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 mt-3 leading-relaxed">
              These are live concept designs I built to demonstrate how an independent property should feel on a guest&apos;s smartphone: fast loading, clear photography, and direct enquiry in two taps.
            </p>
          </div>

          {/* Large Hero Concept Showcase */}
          <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-10 border border-slate-700 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-12">
            
            {/* Left: Big Smartphone Frame Viewport */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] bg-slate-950 rounded-[42px] p-3 shadow-2xl border-4 border-slate-700">
                {/* Speaker & camera notch */}
                <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-2" />
                
                {/* Smartphone Screen Content */}
                <div className="relative h-[560px] w-full rounded-[32px] overflow-hidden bg-white text-slate-900 flex flex-col">
                  {/* Photo area */}
                  <div className="relative h-64 w-full shrink-0">
                    <Image
                      src="/images/hospitality/savoria-wine-estate.jpg"
                      alt="Lakeside wine estate concept"
                      fill
                      priority
                      sizes="400px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-900">
                      Lake Ohrid, North Macedonia
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs font-medium text-amber-300 uppercase tracking-wider">Independent Wine Estate</p>
                      <h4 className="text-xl font-bold leading-tight">Heritage Balcony Suite</h4>
                    </div>
                  </div>

                  {/* Room details & direct perks */}
                  <div className="p-4 flex-1 flex flex-col justify-between text-xs space-y-3 bg-slate-50">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-slate-600 font-semibold text-[11px] border-b border-slate-200 pb-2">
                        <span>42 m² · King Bed · Lake View</span>
                        <span className="text-emerald-700 font-bold">Breakfast Included</span>
                      </div>
                      <p className="text-slate-700 text-xs leading-relaxed">
                        Private vineyard terrace, stone fireplace, and organic breakfast served daily. Direct bookings receive a welcome bottle of reserve Vranec.
                      </p>
                    </div>

                    {/* 1-Tap Direct Inquiry Buttons inside phone */}
                    <div className="space-y-2 pt-2 border-t border-slate-200">
                      <button 
                        onClick={() => setLiveConceptModalOpen(true)}
                        className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-[#F59E0B] hover:text-slate-900 transition-colors cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>Ask Host on WhatsApp / Viber</span>
                      </button>
                      <p className="text-[10px] text-center text-slate-500 font-medium">
                        Opens with room details and dates pre-filled
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom home indicator bar */}
                <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto mt-2" />
              </div>
            </div>

            {/* Right: Editorial Narrative + Live Test QR Code */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">
                  Featured Concept Design
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Lakeside wine estate with rooms
                </h3>
                <p className="text-base text-slate-300 leading-relaxed">
                  Designed for an independent wine estate on Lake Ohrid: full-screen photography optimized for mobile roaming networks, transparent room specs, and a direct inquiry button that connects high-intent travelers straight to the host.
                </p>
              </div>

              {/* Concrete Specs (16px high contrast text) */}
              <div className="space-y-3 pt-2 text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Opens in under 1 second:</strong> Photos resized and compressed to prevent mobile drop-off.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Direct Host Inquiries:</strong> Guests send dates directly to your WhatsApp, Viber or email with 0% commissions.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>No Complex Software:</strong> Keep your existing booking engine or use clean direct messaging.</span>
                </div>
              </div>

              {/* Action Buttons & Desktop QR Code Scan */}
              <div className="pt-4 border-t border-slate-700 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                
                <button
                  onClick={() => setLiveConceptModalOpen(true)}
                  className="px-6 py-3.5 bg-[#F59E0B] hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Open live concept</span>
                  <ExternalLink className="w-4 h-4" />
                </button>

                {/* QR Code Card for Desktop Users */}
                <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-700 flex items-center gap-3.5">
                  {/* Clean SVG QR Code */}
                  <div className="w-16 h-16 bg-white p-1.5 rounded-xl shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 29 29" className="w-full h-full text-slate-900 fill-current">
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
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-white flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>Test on your phone</span>
                    </p>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Scan with phone camera to test speed and mobile layout.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* 2 Complementary Concepts in Rich 2-Column Format */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Concept 2 */}
            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 flex flex-col justify-between group">
              <div>
                <div className="relative h-64 w-full rounded-xl overflow-hidden bg-slate-900 mb-5 border border-slate-700">
                  <Image
                    src="/images/hospitality/coastal-retreat.jpg"
                    alt="Seaside guesthouse concept in Albanian Riviera"
                    fill
                    sizes="500px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/90 text-white px-2.5 py-1 rounded text-xs font-bold">
                    Concept design · Albanian Riviera
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Seaside guesthouse</h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Full-screen photography, a short &quot;getting here&quot; section, and room cards that show size, bed type, and what is included. Built to load fast on regional mobile data.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between">
                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, notes: 'Interested in something like the Seaside guesthouse concept.' }));
                    const elem = document.getElementById('review-request');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-[#F59E0B] hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Ask about something like this</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Concept 3 */}
            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 flex flex-col justify-between group">
              <div>
                <div className="relative h-64 w-full rounded-xl overflow-hidden bg-slate-900 mb-5 border border-slate-700">
                  <Image
                    src="/images/hospitality/urban-loft.jpg"
                    alt="City apartments concept in Sarajevo"
                    fill
                    sizes="500px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/90 text-white px-2.5 py-1 rounded text-xs font-bold">
                    Concept design · Sarajevo, Bosnia
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">City apartments</h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Rooms compared on one screen, check-in instructions in four languages, and an enquiry button that sends check-in details directly to your WhatsApp or Viber.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between">
                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, notes: 'Interested in something like the City apartments concept.' }));
                    const elem = document.getElementById('review-request');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-[#F59E0B] hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Ask about something like this</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. UNIFIED STORYTELLING: WHAT CHANGES ON YOUR WEBSITE
          (Merges Problem, What I Build, How I Build It, and Solutions)
      ────────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              EDITORIAL CRAFT
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mt-2 mb-4">
              What changes when I build your website.
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Most independent hotels already have a wonderful property and warm hospitality. The problem is usually technical friction on a small screen that drives guests back to Booking.com.
            </p>
          </div>

          {/* Pillar 1: Full-width Editorial Split (Photos & Speed) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20 pb-16 border-b border-slate-200">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">
                01 · The First Impression
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-950">
                Show the place, not a waiting spinner.
              </h3>
              <p className="text-base text-slate-700 leading-relaxed">
                A typical gallery of fourteen uncompressed photos can exceed 12 MB. On a mobile phone using roaming data, guests wait 6 to 9 seconds. Most give up before the first bedroom appears.
              </p>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-sm text-slate-800">
                <p className="font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>What I do instead:</span>
                </p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  I hand-optimize, resize, and convert every image into modern formats so your photography fills the screen immediately without lag.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-6">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <Image
                  src="/images/hospitality/coastal-retreat.jpg"
                  alt="High speed visual storytelling"
                  fill
                  sizes="600px"
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs rounded-xl p-3 text-xs font-semibold text-slate-800 flex items-center justify-between">
                  <span>Full-width visual presentation</span>
                  <span className="text-emerald-700 font-bold">Loads under 1 second</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 2: Editorial Split (Direct Enquiries vs Broken Widgets) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20 pb-16 border-b border-slate-200">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Direct Enquiry Architecture
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                    <p className="font-bold text-sm text-slate-900">1. Clear Room Comparison</p>
                    <p className="text-xs text-slate-600">Guests see room dimensions, bed arrangements, and included amenities on one screen.</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                    <p className="font-bold text-sm text-slate-900">2. 1-Tap Host Handoff</p>
                    <p className="text-xs text-slate-600">A prominent enquiry button opens WhatsApp, Viber, or email with requested dates pre-filled.</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                    <p className="font-bold text-sm text-slate-900">3. Direct Rate Defense</p>
                    <p className="text-xs text-slate-600">Highlight direct booking perks (welcome wine, terrace breakfast, free parking) so guests don&apos;t go to OTAs.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">
                02 · The Direct Enquiry Journey
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-950">
                Make it easy to ask, instead of forcing a clunky widget.
              </h3>
              <p className="text-base text-slate-700 leading-relaxed">
                Many boutique hotel websites embed complicated booking widgets with microscopic calendar popups. Travelers get frustrated on mobile and retreat to Booking.com, where you lose 15-20% in commissions.
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                I build clean direct enquiry channels. If you already have a booking engine (like Cloudbeds, Sirvoy, or Beds24), I link to it neatly without breaking your layout.
              </p>
            </div>
          </div>

          {/* Pillar 3: Heritage & Host Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">
                03 · Character & Story
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-950">
                Tell the story an OTA listing cannot show.
              </h3>
              <p className="text-base text-slate-700 leading-relaxed">
                Booking sites reduce every property to a price per night and a list of checkmarks. Discerning guests choose boutique hotels for the human touch: your family history, the courtyard breakfast, the quiet spot by the lake.
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                I write and structure short, warm editorial sections that celebrate your property&apos;s unique character so guests remember your name, not just a room number.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <Image
                  src="/images/hospitality/palazzo-suites.jpg"
                  alt="Historic boutique palace narrative"
                  fill
                  sizes="600px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                  <p className="text-white text-sm font-semibold">
                    &quot;Guests book boutique stays for the host&apos;s warmth, not a commodity room number.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. AI ASSISTANT DEMO (Section D1 & D2)
      ────────────────────────────────────────────────────────────── */}
      <section id="ai-assistant" className="py-20 md:py-28 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-5xl">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              OPTIONAL AFTER-HOURS ASSISTANT
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-1 mb-3">
              Answers common guest questions at night.
            </h2>
            <p className="text-base text-slate-700 leading-relaxed">
              Travelers from Germany, Italy, France, and the UK research trips late in the evening. An assistant answers common questions immediately in their mother tongue using only your approved information.
            </p>
          </div>

          {/* Interactive Chat Conversation Widget */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden mb-12">
            
            {/* Header / Language tabs */}
            <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold uppercase tracking-wider bg-slate-800 text-amber-300 px-3 py-1 rounded-md border border-slate-700">
                  AI assistant
                </span>
                <span className="text-xs text-slate-300">
                  Sample conversation (fictional hotel)
                </span>
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl">
                {assistantScenarios.map((sc, idx) => (
                  <button
                    key={sc.id}
                    onClick={() => handleScenarioChange(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeScenarioIdx === idx
                        ? 'bg-[#F59E0B] text-slate-950'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {sc.code}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat conversation preview */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Guest message */}
              <div className="flex items-start gap-3 justify-end">
                <div className="bg-slate-900 text-white rounded-2xl rounded-tr-xs p-4 sm:p-5 max-w-lg text-sm sm:text-base leading-relaxed">
                  <p>{assistantScenarios[activeScenarioIdx].inquiry}</p>
                  <span className="text-xs text-slate-400 block text-right mt-2 font-mono">
                    {assistantScenarios[activeScenarioIdx].guestName} ({assistantScenarios[activeScenarioIdx].location}) • {assistantScenarios[activeScenarioIdx].time}
                  </span>
                </div>
              </div>

              {/* Assistant message */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 text-slate-800 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div className="bg-slate-50 text-slate-900 rounded-2xl rounded-tl-xs p-4 sm:p-5 max-w-xl text-sm sm:text-base leading-relaxed border border-slate-200">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 text-xs text-slate-500 font-medium">
                    <span className="font-bold text-slate-800">Digital Assistant (AI)</span>
                    <span className="font-mono text-xs text-slate-600">
                      {assistantScenarios[activeScenarioIdx].sourceCitation}
                    </span>
                  </div>

                  {isTypingSim ? (
                    <div className="flex items-center gap-1.5 py-2">
                      <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  ) : (
                    <p className="text-slate-800 leading-relaxed font-normal">
                      {assistantScenarios[activeScenarioIdx].response}
                    </p>
                  )}
                </div>
              </div>

              {/* Handoff Explanation */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs sm:text-sm text-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-slate-900">
                    Direct handoff to host
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    On a real hotel site, this button opens WhatsApp or Viber with a summary of the chat already filled in.
                  </p>
                </div>
                <div className="text-xs font-mono bg-white px-3 py-1.5 rounded-lg border border-slate-300 text-slate-800 shrink-0">
                  {assistantScenarios[activeScenarioIdx].previewSummary}
                </div>
              </div>

            </div>

          </div>

          {/* 4 Feature Highlights with High Contrast (text-sm/base) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <Languages className="w-6 h-6 text-[#F59E0B] mb-3" />
              <h4 className="font-bold text-base text-slate-900 mb-1">Languages</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                German, Italian, French and English. Replies in the guest&apos;s language in a polite, welcoming tone.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <ShieldCheck className="w-6 h-6 text-[#F59E0B] mb-3" />
              <h4 className="font-bold text-base text-slate-900 mb-1">Stays within your info</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Answers only from the house information you approve. Never quotes unapproved discounts or fake availability.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <Check className="w-6 h-6 text-[#F59E0B] mb-3" />
              <h4 className="font-bold text-base text-slate-900 mb-1">Direct-booking perks</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Highlights direct booking perks you choose: welcome wine, terrace breakfast, or flexible arrival.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <Sliders className="w-6 h-6 text-[#F59E0B] mb-3" />
              <h4 className="font-bold text-base text-slate-900 mb-1">Low maintenance</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                I set it up and look after it. If a rule or price changes, send me a message or update a simple shared sheet.
              </p>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
            * The assistant does not take bookings, quote live room availability, or process payments. Guests are asked not to share payment card or passport numbers in the chat.
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. PRICING & SCOPE
      ────────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              PRICING & SCOPE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mt-1 mb-3">
              Fixed prices in euros.
            </h2>
            <p className="text-base text-slate-700 leading-relaxed">
              50% to start, 50% after you approve the staging site. You own the code.
            </p>
          </div>

          {/* Booking engine notice */}
          <div className="mb-10 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700 max-w-2xl mx-auto text-center leading-relaxed">
            <strong className="text-slate-900">Already have a booking engine?</strong> Keep it. I&apos;ll connect it to your new website, or add a direct enquiry button next to it. I don&apos;t replace your booking system, and I don&apos;t process payments for you.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-12">
            
            {/* Tier 1 */}
            <div className="bg-[#F8F9FA] rounded-3xl p-8 sm:p-10 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Showcase Website</span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1 mb-2">Showcase Website</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  A fast mobile website for your hotel with room cards, story, and direct enquiry buttons.
                </p>

                <div className="mb-6 pb-6 border-b border-slate-200">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-950">€690</span>
                    <span className="text-xs font-semibold text-slate-600 uppercase">Fixed fee</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">Delivery in 7-10 working days once content is received</p>
                </div>

                <ul className="space-y-3.5 text-sm text-slate-800 mb-8">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                    <span>Fast mobile website for phones, tablets, and desktop</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                    <span>Room cards with size, bed type, and what is included</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                    <span>Direct enquiry buttons (WhatsApp, Viber, email)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                    <span>Domain connection and privacy-friendly analytics setup</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                    <span>2 rounds of revisions included</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                    <span>30 days of fixes after launch</span>
                  </li>
                </ul>
              </div>

              <a
                href="#review-request"
                onClick={() => setFormData(prev => ({ ...prev, requestType: 'A website for my hotel' }))}
                className="w-full py-4 bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm rounded-full border border-slate-300 text-center transition-colors shadow-xs"
              >
                Inquire about Showcase Website (€690)
              </a>
            </div>

            {/* Tier 2 */}
            <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider">Showcase + Assistant</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 mb-2">Showcase + AI Assistant</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Everything in Showcase Website, plus an assistant answering common guest questions in 4 languages.
                </p>

                <div className="mb-6 pb-6 border-b border-slate-800">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">€1,290</span>
                    <span className="text-xs text-slate-400 uppercase">Fixed fee</span>
                  </div>
                  <p className="text-xs text-[#F59E0B] mt-1 font-medium">Includes 6 months assistant hosting and maintenance</p>
                </div>

                <ul className="space-y-3.5 text-sm text-slate-200 mb-8">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>Everything included in Showcase Website</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>24/7 AI Assistant embedded on your website</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>German, Italian, French and English support</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>Trained only on your approved property handbook</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>Direct handoff to WhatsApp or Viber with chat summary</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>6 months hosting and updates (optional €29/mo thereafter)</span>
                  </li>
                </ul>
              </div>

              <div>
                <a
                  href="#review-request"
                  onClick={() => setFormData(prev => ({ ...prev, requestType: 'A website + AI assistant' }))}
                  className="block w-full py-4 bg-[#F59E0B] hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-full text-center transition-colors shadow-sm"
                >
                  Inquire about Showcase + Assistant (€1,290)
                </a>
                <p className="text-xs text-slate-400 text-center mt-2.5">
                  Recovers its cost after ~10-15 direct bookings (saving 15-20% in OTA commissions).
                </p>
              </div>
            </div>

          </div>

          {/* Clarity table: What you own vs what I run */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 text-sm mb-8 space-y-3">
            <h4 className="font-bold text-slate-950 text-base">What you own, and what I run</h4>
            <p className="text-slate-700 leading-relaxed">
              You own your website code, content, and domain. The AI assistant is a separate subscription that runs on my side. If you stop the subscription, I remove the chat widget and your website keeps working as normal. Your house information and chat history are yours: I&apos;ll export them on request and delete them from my systems afterwards.
            </p>
          </div>

          {/* Staging guarantee & payment terms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 text-sm space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-950 text-base">
                <ShieldCheck className="w-5 h-5 text-[#F59E0B]" />
                <span>Staging-first guarantee</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                I build your site on a private staging link. You check it on your own phone and ask for changes before you pay the final 50%.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 text-sm space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-950 text-base">
                <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
                <span>Invoicing & Payment</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                50% to start, 50% after you approve the staging site. Invoiced in EUR via Wise Business (SEPA bank transfer or card). You receive a proper invoice for each payment.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. ABOUT ME: FAISAL ALFARIZI (REAL PHOTO + STORYTELLING)
      ────────────────────────────────────────────────────────────── */}
      <section id="about-faisal" className="py-20 md:py-28 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-4xl">
          
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Real Founder Photo */}
            <div className="md:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-2xl overflow-hidden shadow-md border-2 border-slate-200 mb-4">
                <Image
                  src="/images/hospitality/faisal-founder.jpg"
                  alt="Faisal Alfarizi - Web Designer & Developer"
                  fill
                  sizes="260px"
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-950">Faisal Alfarizi</h3>
              <p className="text-xs text-slate-500 font-medium">Solo Designer & Developer · Jakarta, Indonesia</p>
            </div>

            {/* Storytelling Text (Conversational narrative, not a CV) */}
            <div className="md:col-span-7 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">
                Who you&apos;ll be working with
              </span>
              
              <p className="text-lg font-bold text-slate-950 leading-snug">
                I started building websites for small hotels because I saw that the most charming properties in Europe often have the most frustrating mobile websites.
              </p>

              <p>
                Uncompressed 10MB photo galleries, tiny calendar widgets that freeze on phones, and no simple way for a traveler to ask a quick question before booking.
              </p>

              <p>
                I run a one-person studio in Jakarta. That means when you send a message, you deal directly with the person who designs your layout, edits your photos, and writes the code — with no account managers or ticket queues in between.
              </p>

              <p>
                Jakarta is 5 to 6 hours ahead of the Balkans. I do the deep work while you sleep, and you&apos;ll find fresh staging links and short video walkthroughs waiting in your inbox by your morning.
              </p>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-4 text-xs font-semibold">
                <a 
                  href="mailto:faisalalfarizi@webuntukusaha.com" 
                  className="text-slate-900 hover:text-[#F59E0B] flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>faisalalfarizi@webuntukusaha.com</span>
                </a>
                <a 
                  href="https://wa.me/6281383521750" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-900 hover:text-[#F59E0B] flex items-center gap-1.5"
                >
                  <PhoneCall className="w-4 h-4 text-slate-500" />
                  <span>+62 813-8352-1750 (WhatsApp & Viber)</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. FAQ SECTION
      ────────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              COMMON QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-1 mb-3">
              Frequently asked questions.
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What is in the free 1-page review?",
                a: "I look at your hotel on a phone, the way a guest would, and send you a one-page note with three findings, the evidence for each, and one quick fix you can do yourself. It's free and there's no obligation. If you don't have a website yet, I review your Booking.com page, Google profile or Instagram instead."
              },
              {
                q: "Can the AI assistant make mistakes?",
                a: "It can. It's set up to answer only from the information you approve, and when it doesn't know, it offers to pass the guest to you. It doesn't confirm bookings, quote availability, or give prices that aren't in your information. During the test period before launch, you review its answers and I fix anything that isn't right. Guests are always told they're talking to an AI."
              },
              {
                q: "Does my staff have to manage software or servers?",
                a: "No. I set up and look after the assistant and the website. If a rule or price changes, send me a message or update a shared sheet."
              },
              {
                q: "Do we have to give up our booking engine (Cloudbeds, Sirvoy, Beds24...)?",
                a: "No. Keep it. I link your website to it, or add a direct enquiry button next to it. I don't replace your booking system and I don't process payments for you."
              },
              {
                q: "How can we work together across the Balkans and Indonesia?",
                a: "Jakarta is 5-6 hours ahead of the Balkans. I reply within one working day, usually in your morning. Most of the work is done in writing and short videos, so you can review things when it suits you. If you'd prefer a call, I'll find a time that works for both of us."
              },
              {
                q: "Who owns the website after launch?",
                a: "You do. You own the website code, content, and domain. The AI assistant is a separate subscription that runs on my side. If you stop it, I remove the chat widget and your website keeps working."
              },
              {
                q: "How and when do I pay?",
                a: "50% to start, 50% after you approve the private preview. Prices are in euros. You receive an invoice for each payment via Wise Business (SEPA bank wire or card)."
              },
              {
                q: "What happens to my guests' data?",
                a: "If you use the AI assistant, you decide what happens with the chat data and I process it only on your instructions. I provide a privacy policy disclosure and Data Processing Agreement. Guests are asked not to share card or passport numbers."
              }
            ].map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#F8F9FA] rounded-2xl border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left font-bold text-base sm:text-lg text-slate-900 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#F59E0B]" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-6 pb-6 text-sm sm:text-base text-slate-700 leading-relaxed border-t border-slate-200 pt-4"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. FREE 1-PAGE REVIEW REQUEST FORM (Section E1)
      ────────────────────────────────────────────────────────────── */}
      <section id="review-request" className="py-20 md:py-28 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-2xl">
          
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-md">
                NO SALES CALLS · 2 WORKING DAYS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight mt-3 mb-2">
                Get a free 1-page review.
              </h2>
              <p className="text-sm sm:text-base text-slate-700 max-w-lg mx-auto leading-relaxed">
                Send me a link to your hotel (website, Booking.com page, Instagram or Google Maps). I&apos;ll look at it on a phone the way a guest would and send you a one-page note within 2 working days. Free, no obligation.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-slate-50 rounded-2xl p-8 text-center space-y-4 border border-slate-200">
                <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="text-xl font-bold text-slate-950">Thanks, {formData.yourName || "there"}.</h3>
                <p className="text-sm text-slate-700 leading-relaxed max-w-md mx-auto">
                  I&apos;ve received your request for <strong>{formData.hotelName || "your hotel"}</strong>. I&apos;ll look at it on a phone and send your one-page review to <strong>{formData.email}</strong> within 2 working days. If you don&apos;t see it, check your spam folder or email me directly at <a href="mailto:faisalalfarizi@webuntukusaha.com" className="underline font-semibold">faisalalfarizi@webuntukusaha.com</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                
                {/* Hotel Name */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1.5">
                    Hotel name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Villa Kliment"
                    value={formData.hotelName}
                    onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:border-[#F59E0B]"
                  />
                </div>

                {/* Online Link */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1.5">
                    Where can I find your hotel online? *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Website, Booking.com, Instagram or Google Maps link"
                    value={formData.onlineLink}
                    onChange={(e) => setFormData({ ...formData, onlineLink: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:border-[#F59E0B]"
                  />
                  <p className="text-xs text-slate-600 mt-1">
                    No website yet? That&apos;s fine. Share your Booking.com or Instagram page and I&apos;ll review that instead.
                  </p>
                </div>

                {/* Name & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-1.5">
                      Your name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena"
                      value={formData.yourName}
                      onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:border-[#F59E0B]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-1.5">
                      Your role (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Owner, Host, Manager"
                      value={formData.yourRole}
                      onChange={(e) => setFormData({ ...formData, yourRole: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:border-[#F59E0B]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1.5">
                    Email address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:border-[#F59E0B]"
                  />
                </div>

                {/* Request Type Radios */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    What would you like? *
                  </label>
                  <div className="space-y-2 text-sm text-slate-800">
                    {[
                      'Free 1-page review',
                      'A website for my hotel',
                      'A website + AI assistant',
                      'I\'m not sure yet'
                    ].map((option) => (
                      <label key={option} className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="radio"
                          name="requestType"
                          value={option}
                          checked={formData.requestType === option}
                          onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                          className="accent-slate-900 w-4 h-4"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1.5">
                    Anything you&apos;d like me to look at? (optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Many guests browse on phones but book on Booking.com"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:border-[#F59E0B] resize-none"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-0.5 accent-slate-900 w-4 h-4"
                    />
                    <span>
                      I agree that WUUS will use my details to reply to this request, as described in the{' '}
                      <Link href="/hospitality/privacy" className="text-slate-900 underline font-semibold hover:text-[#F59E0B]">
                        Privacy Policy
                      </Link>.
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-slate-900 hover:bg-[#F59E0B] hover:text-slate-900 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-4 shadow-sm"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send my free review request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-600 mt-2 font-medium">
                  I read every request myself and reply by email. I won&apos;t call you.
                </p>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. FOOTER
      ────────────────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-12">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            {/* Brand */}
            <div>
              <Link href="/hospitality" className="inline-block mb-4">
                <Image
                  src="/logo.png"
                  alt="WUUS Logo"
                  width={120}
                  height={34}
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <p className="text-sm text-slate-700 leading-relaxed mb-3">
                Websites for independent hotels.
              </p>
              <p className="text-xs text-slate-500 font-medium">
                Jakarta, Indonesia
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <a href="mailto:faisalalfarizi@webuntukusaha.com" className="hover:text-[#F59E0B]">
                    faisalalfarizi@webuntukusaha.com
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/6281383521750" target="_blank" rel="noopener noreferrer" className="hover:text-[#F59E0B]">
                    WhatsApp: +62 813-8352-1750
                  </a>
                </li>
                <li>
                  <a href="viber://chat?number=%2B6281383521750" className="hover:text-[#F59E0B]">
                    Viber: +62 813-8352-1750
                  </a>
                </li>
                <li className="text-xs text-slate-500 pt-1">
                  Reply within 1 working day.
                </li>
              </ul>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Sections</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><a href="#concepts" className="hover:text-[#F59E0B]">Live concepts</a></li>
                <li><a href="#how-it-works" className="hover:text-[#F59E0B]">How it works</a></li>
                <li><a href="#ai-assistant" className="hover:text-[#F59E0B]">AI Assistant</a></li>
                <li><a href="#pricing" className="hover:text-[#F59E0B]">Pricing & scope</a></li>
                <li><a href="#about-faisal" className="hover:text-[#F59E0B]">About me</a></li>
                <li><a href="#faq" className="hover:text-[#F59E0B]">FAQ</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Legal & Language</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <Link href="/hospitality/privacy" className="hover:text-[#F59E0B]">
                    Privacy Policy & AI Disclosure
                  </Link>
                </li>
                <li>
                  <Link href="/syarat-ketentuan" className="hover:text-[#F59E0B]">
                    Terms of Service
                  </Link>
                </li>
                <li className="pt-2">
                  <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-950 font-semibold">
                    <span className="font-bold text-[10px] bg-slate-100 px-1 py-0.5 rounded text-slate-900">ID</span>
                    <span>Bahasa Indonesia →</span>
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Sub-footer */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} WUUS. All rights reserved.</p>
            <p>
              Simple, fast websites for independent boutique hotels.
            </p>
          </div>

        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          11. LIVE CONCEPT MODAL
      ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {liveConceptModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLiveConceptModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 z-10 overflow-hidden shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider">Concept Demo</span>
                  <h3 className="text-xl font-bold text-slate-950">Lakeside Wine Estate with Rooms</h3>
                </div>
                <button
                  onClick={() => setLiveConceptModalOpen(false)}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-slate-200">
                <Image
                  src="/images/hospitality/savoria-wine-estate.jpg"
                  alt="Lake Ohrid boutique stay"
                  fill
                  sizes="500px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>
                  This concept demonstrates a clean direct enquiry flow: high-resolution photography compressed to open instantly on mobile, transparent room specifications with included perks, and a 1-tap WhatsApp button pre-filled with guest inquiries.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-600">
                  Destination: Lake Ohrid, North Macedonia · Direct Perks: Breakfast & Welcome Wine · Response: Direct to host
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`https://wa.me/6281383521750?text=${encodeURIComponent("Hi Faisal, I saw the Lakeside wine estate concept on your website. I'd like to ask a few questions about building something like this for our property.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 py-3 px-6 bg-slate-900 hover:bg-[#F59E0B] hover:text-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors text-center"
                >
                  Ask about a site like this
                </a>
                <button
                  onClick={() => setLiveConceptModalOpen(false)}
                  className="w-full sm:w-auto py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-full transition-colors cursor-pointer"
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
