'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { 
  ArrowRight, 
  Check, 
  Clock, 
  Send, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  PhoneCall, 
  Mail, 
  AlertCircle, 
  CheckCircle2, 
  Menu, 
  X, 
  Bot, 
  Languages, 
  ShieldCheck, 
  Sliders, 
  HelpCircle,
  Smartphone,
  ExternalLink
} from 'lucide-react';

// 3 Honest Concept Designs (Section A1)
const conceptProjects = [
  {
    id: 1,
    title: "Lakeside wine estate with rooms",
    location: "Lake Ohrid, North Macedonia",
    img: "/images/hospitality/savoria-wine-estate.jpg",
    badge: "Concept design",
    description: "A concept for a small wine estate: tasting requests, suite pages with real room details, and one clear \"Ask the host\" button.",
    alt: "Concept design for a lakeside wine estate with rooms on Lake Ohrid"
  },
  {
    id: 2,
    title: "Seaside guesthouse",
    location: "Albanian Riviera",
    img: "/images/hospitality/coastal-retreat.jpg",
    badge: "Concept design",
    description: "Full-screen photography, a short \"getting here\" section, and room cards that show size, bed type, and what is included.",
    alt: "Concept design for a seaside guesthouse on the Albanian Riviera"
  },
  {
    id: 3,
    title: "City apartments",
    location: "Sarajevo, Bosnia and Herzegovina",
    img: "/images/hospitality/urban-loft.jpg",
    badge: "Concept design",
    description: "Rooms compared on one screen, check-in instructions in four languages, and an enquiry in two taps.",
    alt: "Concept design for boutique city apartments in Sarajevo"
  }
];

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
    previewSummary: 'Dates: Late arrival • Vehicle: Station wagon • Inquired about: Courtyard parking & 22:30 contactless keybox check-in'
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

// Comparison points (Section B5.4)
const comparisonRows = [
  {
    problem: "Slow, heavy photo galleries",
    solution: "Resize and compress all images so the site loads quickly on a phone."
  },
  {
    problem: "Booking widgets hard to use on phones",
    solution: "Link to your existing booking engine, or provide a simple direct enquiry button."
  },
  {
    problem: "Plugins that need constant updates",
    solution: "Build with clean, modern code that requires little maintenance."
  },
  {
    problem: "Hard to edit prices or rules",
    solution: "Update by sending me a quick message or editing a simple shared sheet."
  }
];

export default function HospitalityPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [isTypingSim, setIsTypingSim] = useState(false);

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

  const scrollRef = useRef<HTMLDivElement>(null);

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
    }, 280);
  };

  const scrollPortfolio = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - offset : scrollLeft + offset,
        behavior: 'smooth'
      });
    }
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
    <div className="min-h-screen bg-white text-[#1C2733] font-sans antialiased selection:bg-[#F59E0B] selection:text-[#1C2733]">
      <style jsx global>{`
        #floating-ai-builder {
          display: none !important;
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────────
          1. HEADER / NAVBAR (Section H5)
      ────────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-xs border-b border-slate-200 py-3" 
            : "bg-white border-b border-slate-100 py-4"
        }`}
      >
        <div className="w-full mx-auto px-6 md:px-[max(60px,5vw)] flex items-center justify-between">
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
            <div className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              Hospitality
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-700">
            <a href="#how-it-works" className="hover:text-[#F59E0B] transition-colors">
              How it works
            </a>
            <a href="#concepts" className="hover:text-[#F59E0B] transition-colors">
              Examples
            </a>
            <a href="#ai-assistant" className="hover:text-[#F59E0B] transition-colors">
              AI Assistant
            </a>
            <a href="#pricing" className="hover:text-[#F59E0B] transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-[#F59E0B] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Header Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/" 
              className="text-xs font-medium text-slate-500 hover:text-[#1C2733] transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200"
              title="Halaman utama bahasa Indonesia"
            >
              <span className="text-[10px] font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">ID</span>
              <span>Bahasa Indonesia</span>
            </Link>
            <a
              href="#review-request"
              className="bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all"
            >
              Free review
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-2.5">
            <a
              href="#review-request"
              className="bg-[#1C2733] text-white px-3.5 py-1.5 rounded-full text-xs font-bold"
            >
              Free review
            </a>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-slate-700 bg-white rounded-md border border-slate-200"
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
                className="p-2 bg-slate-100 rounded-full text-slate-700 border border-slate-200"
                aria-label="Close Navigation Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-5 mb-8 text-lg font-bold text-[#1C2733]">
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-slate-100 pb-3"
              >
                How it works
              </a>
              <a
                href="#concepts"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-slate-100 pb-3"
              >
                Examples
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
                href="#about-me"
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
                className="text-sm font-semibold text-slate-500 pt-2 flex items-center gap-2"
              >
                <span className="font-bold text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">ID</span>
                <span>Halaman Utama Indonesia</span>
              </Link>
            </nav>

            <div className="mt-auto">
              <a
                href="#review-request"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center bg-[#1C2733] hover:bg-[#F59E0B] text-white hover:text-[#1C2733] px-6 py-4 rounded-full font-bold text-sm transition-all"
              >
                Get a free 1-page review
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION (Section B4)
      ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-20">
          
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              <span>Websites for independent hotels in the Balkans</span>
            </div>

            {/* H1 */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1C2733] tracking-tight leading-[1.12] mb-6">
              A faster way for guests to reach your hotel directly.
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mb-8 font-normal leading-relaxed">
              I design and build fast, mobile-first websites for independent hotels and guesthouses. Guests can ask a question or send an enquiry straight to you on WhatsApp, Viber or email. An optional AI assistant answers their common questions at night, in German, Italian, French and English.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center max-w-md mx-auto mb-4">
              <a
                href="#review-request"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white font-bold text-xs sm:text-sm tracking-tight transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Get a free 1-page review</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#1C2733] border border-slate-300 font-bold text-xs sm:text-sm tracking-tight transition-all text-center"
              >
                See how it works
              </a>
            </div>

            {/* Microcopy under CTA */}
            <p className="text-xs text-slate-500 max-w-lg mb-6 leading-relaxed">
              I&apos;ll look at your hotel on a phone, the way a guest would, and send you a one-page note within 2 working days. Free, no obligation.
            </p>

            {/* Trust line */}
            <div className="pt-4 border-t border-slate-200/80 w-full max-w-xl text-[11px] sm:text-xs text-slate-500 font-medium flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <span>Based in Jakarta</span>
              <span>·</span>
              <span>Fixed price</span>
              <span>·</span>
              <span>You own the code</span>
              <span>·</span>
              <span>50% to start, 50% after you approve it</span>
            </div>

          </div>

          {/* Visual Showcase (Phone Concept Mockup) */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="bg-[#F8F9FA] rounded-2xl p-4 sm:p-6 border border-slate-200 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-full sm:w-48 h-64 rounded-xl overflow-hidden bg-white shrink-0 border border-slate-200">
                <Image
                  src="/images/hospitality/mobile-stay-ui.jpg"
                  alt="Mobile phone view of boutique stay website"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
              <div className="text-left space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F59E0B] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                  Concept preview
                </span>
                <h3 className="text-lg font-bold text-[#1C2733]">Built for guests browsing on a smartphone</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clear photos that load without waiting, transparent room amenities, and direct buttons that open WhatsApp, Viber or email with the guest&apos;s request already prepared.
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" /> Fast mobile load</span>
                  <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" /> 0% commission on direct stays</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. WHO I AM (Short Intro Block, Section A3)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-8 bg-slate-50 border-y border-slate-200/80">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-[#1C2733] text-white flex items-center justify-center font-bold text-sm shrink-0">
              FA
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-[#1C2733]">
                Hi, I&apos;m Faisal.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                I design and build websites for independent hotels and guesthouses. I work on my own from Jakarta, so you always deal directly with the person who builds your site.
              </p>
              <div className="pt-1 flex items-center justify-center sm:justify-start gap-4 text-xs">
                <a href="#about-me" className="font-semibold text-slate-700 hover:text-[#F59E0B] underline">
                  Read more about how I work →
                </a>
                <a 
                  href="mailto:faisalalfarizi@webuntukusaha.com" 
                  className="text-slate-500 hover:text-slate-800"
                >
                  faisalalfarizi@webuntukusaha.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. THE PROBLEM SECTION (Section B5.1)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          
          <div className="max-w-2xl mx-auto text-center mb-14">
            <h2 className="text-2xl md:text-4xl font-black text-[#1C2733] tracking-tight mb-4">
              Guests find you, like what they see, and book through an OTA instead.
            </h2>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Most small hotels already have a good story. Three common things make it hard for a guest to act on it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Problem 1 */}
            <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-7 h-7 rounded-full bg-slate-200 text-[#1C2733] flex items-center justify-center font-bold text-xs">
                    1
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Illustration</span>
                </div>
                <h3 className="text-base font-bold text-[#1C2733] mb-2">
                  Photos that are too heavy
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  A gallery of fourteen full-size photos can be over 10 MB. On a phone using roaming data, that is a long wait, and many guests leave before the first room appears.
                </p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-slate-200 text-[11px] font-mono space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Photo gallery</span>
                  <span className="text-red-600 font-bold">12.8 MB</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full w-[85%]" />
                </div>
                <p className="text-[10px] text-slate-600">Guests tap back before rooms render</p>
              </div>
            </div>

            {/* Problem 2 */}
            <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-7 h-7 rounded-full bg-slate-200 text-[#1C2733] flex items-center justify-center font-bold text-xs">
                    2
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Illustration</span>
                </div>
                <h3 className="text-base font-bold text-[#1C2733] mb-2">
                  A booking widget hard to use on phones
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Small calendars and pop-ups are easy to miss on a small screen. A guest who can&apos;t finish the form goes back to the OTA, where you pay 15-20% commission.
                </p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-slate-200 text-[11px] font-mono space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Calendar widget</span>
                  <span className="text-amber-600 font-bold">Small screen</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[60%]" />
                </div>
                <p className="text-[10px] text-slate-600">Guest returns to OTA (-15% to -20%)</p>
              </div>
            </div>

            {/* Problem 3 */}
            <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-7 h-7 rounded-full bg-slate-200 text-[#1C2733] flex items-center justify-center font-bold text-xs">
                    3
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Direct Enquiry</span>
                </div>
                <h3 className="text-base font-bold text-[#1C2733] mb-2">
                  No simple way to ask a question
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Many guests want to check one thing before booking: parking, late check-in, pets, airport transfer. If the answer takes a day, they book somewhere that answers faster.
                </p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-slate-200 text-[11px] font-mono space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Question at night</span>
                  <span className="text-slate-700 font-bold">11:30 PM</span>
                </div>
                <p className="text-[10px] text-slate-600">Assistant answers common facts instantly</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. WHAT I BUILD (Section B5.2)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="container mx-auto px-6 max-w-5xl">
          
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-black text-[#1C2733] tracking-tight mb-3">
              What I build
            </h2>
            <p className="text-sm text-slate-600">
              Clear, practical tools designed specifically for independent boutique stays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider">Core Product</span>
                <h3 className="text-xl font-bold text-[#1C2733] mt-2 mb-3">A fast hotel website</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Room pages with real sizes and what&apos;s included, a short &quot;getting here&quot; section, your story, and one clear way to ask or book directly. Built to load quickly on a phone. You own the code and content.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>You own the files & domain</span>
                <span className="text-emerald-700">Mobile-optimized</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider">Optional Addition</span>
                <h3 className="text-xl font-bold text-[#1C2733] mt-2 mb-3">An assistant for after-hours questions</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Answers common questions (parking, check-in, breakfast, pets) using only the house information you approve. If it doesn&apos;t know, it hands the guest over to you on WhatsApp, Viber or email. It doesn&apos;t take bookings or quote availability.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>German, Italian, French, English</span>
                <span className="text-emerald-700">No new software to learn</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. DESIGN CONCEPTS / EXAMPLES (Section A1)
      ────────────────────────────────────────────────────────────── */}
      <section id="concepts" className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                DESIGN CONCEPTS
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-[#1C2733] tracking-tight">
                Simple, character-rich layouts
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl mt-2 leading-relaxed">
                These are concept designs I made to show how different kinds of small hotels can present themselves. They are not client projects. Each one opens as a live page you can test on your phone.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => scrollPortfolio('left')}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Previous Concept"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => scrollPortfolio('right')}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Next Concept"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Exactly 3 Concept Cards */}
          <div 
            ref={scrollRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {conceptProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-[#F8F9FA] rounded-2xl p-5 border border-slate-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-60 w-full rounded-xl overflow-hidden bg-white mb-5 border border-slate-200">
                    <Image
                      src={project.img}
                      alt={project.alt}
                      fill
                      sizes="400px"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#1C2733] text-white px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase">
                      {project.badge}
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 mb-1 font-medium">
                    {project.location}
                  </div>

                  <h3 className="text-lg font-bold text-[#1C2733] mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80">
                  <button
                    onClick={() => {
                      setFormData(prev => ({ ...prev, notes: `Interested in something like the "${project.title}" concept.` }));
                      const formElem = document.getElementById('review-request');
                      if (formElem) formElem.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#1C2733] hover:text-[#F59E0B] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Ask about something like this</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. AI ASSISTANT DEMO & CLAIMS (Section D1, D2)
      ────────────────────────────────────────────────────────────── */}
      <section id="ai-assistant" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="container mx-auto px-6 max-w-5xl">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              OPTIONAL AFTER-HOURS ASSISTANT
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-[#1C2733] tracking-tight mt-2 mb-4">
              Answers common guest questions at night
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              European travelers from Germany, Italy, France, and the UK often research trips late in the evening. An assistant answers common questions immediately in their language from your approved information.
            </p>
          </div>

          {/* Sample Conversation Widget */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-12">
            
            {/* Header / Language tabs */}
            <div className="bg-[#1C2733] text-white p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold uppercase tracking-wider bg-slate-800 text-slate-300 px-2.5 py-1 rounded">
                  AI assistant
                </span>
                <span className="text-xs text-slate-400">
                  Sample conversation (fictional hotel)
                </span>
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-1 bg-[#16202B] p-1 rounded-xl">
                {assistantScenarios.map((sc, idx) => (
                  <button
                    key={sc.id}
                    onClick={() => handleScenarioChange(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activeScenarioIdx === idx
                        ? 'bg-[#F59E0B] text-[#1C2733] font-bold'
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
                <div className="bg-[#1C2733] text-white rounded-2xl rounded-tr-xs p-4 max-w-lg text-xs sm:text-sm leading-relaxed">
                  <p>{assistantScenarios[activeScenarioIdx].inquiry}</p>
                  <span className="text-[10px] text-slate-400 block text-right mt-1.5 font-mono">
                    {assistantScenarios[activeScenarioIdx].guestName} ({assistantScenarios[activeScenarioIdx].location}) • {assistantScenarios[activeScenarioIdx].time}
                  </span>
                </div>
              </div>

              {/* Assistant message */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-[#F8F9FA] text-[#1C2733] rounded-2xl rounded-tl-xs p-4 max-w-xl text-xs sm:text-sm leading-relaxed border border-slate-200/80">
                  <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-200 text-[11px] text-slate-500 font-medium">
                    <span>Digital Assistant (AI)</span>
                    <span className="font-mono text-[10px] text-slate-500">
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
                    <p className="text-slate-800 leading-relaxed">
                      {assistantScenarios[activeScenarioIdx].response}
                    </p>
                  )}
                </div>
              </div>

              {/* Handoff Explanation (Section D5) */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-slate-800">
                    Direct handoff to host
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    On a real hotel site, this button opens WhatsApp or Viber with a summary of the chat already filled in so guests never have to repeat themselves.
                  </p>
                </div>
                <div className="text-[10px] font-mono bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 shrink-0">
                  {assistantScenarios[activeScenarioIdx].previewSummary}
                </div>
              </div>

            </div>

          </div>

          {/* 4 Feature Cards (Section D2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <Languages className="w-5 h-5 text-[#F59E0B] mb-2.5" />
              <h4 className="font-bold text-sm text-[#1C2733] mb-1">Languages</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                German, Italian, French and English. Replies in the guest&apos;s language in a polite, welcoming tone.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <ShieldCheck className="w-5 h-5 text-[#F59E0B] mb-2.5" />
              <h4 className="font-bold text-sm text-[#1C2733] mb-1">Stays within your info</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Answers only from the house information you approve. If it isn&apos;t covered, it offers to pass the guest to you on WhatsApp, Viber or email.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-[#F59E0B] mb-2.5" />
              <h4 className="font-bold text-sm text-[#1C2733] mb-1">Direct-booking perks</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                When guests ask about booking direct, it highlights the perks you choose (welcome drink, breakfast on terrace, flexible arrival).
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <Sliders className="w-5 h-5 text-[#F59E0B] mb-2.5" />
              <h4 className="font-bold text-sm text-[#1C2733] mb-1">Low maintenance</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                I set it up and look after it. If a rule or price changes, send me a message or update a shared sheet.
              </p>
            </div>
          </div>

          {/* Honest Limitation Note */}
          <div className="text-center text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
            * The assistant does not take bookings, quote live room availability, or process payments. Guests are asked not to share payment card or passport numbers in the chat.
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. HOW I BUILD IT (Section B5.3)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl md:text-4xl font-black text-[#1C2733] tracking-tight mb-3">
              How I build it
            </h2>
            <p className="text-sm text-slate-600">
              Three clear principles for every boutique hotel website.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-slate-200">
              <span className="font-bold text-[#F59E0B] text-xl">1</span>
              <h3 className="text-base font-bold text-[#1C2733] mt-2 mb-2">Show the place</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full-width photography, resized and compressed so it opens quickly on a phone using mobile data.
              </p>
            </div>

            <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-slate-200">
              <span className="font-bold text-[#F59E0B] text-xl">2</span>
              <h3 className="text-base font-bold text-[#1C2733] mt-2 mb-2">Make it easy to ask</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear room cards and an enquiry button that opens WhatsApp, Viber or email with the details already filled in.
              </p>
            </div>

            <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-slate-200">
              <span className="font-bold text-[#F59E0B] text-xl">3</span>
              <h3 className="text-base font-bold text-[#1C2733] mt-2 mb-2">Tell your story</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A short section on your family, your breakfast, your neighbourhood: the things a booking platform can&apos;t show.
              </p>
            </div>

          </div>

          {/* Comparison Table (Section B5.4) */}
          <div className="mt-16 bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 bg-slate-50 border-b border-slate-200">
              <h3 className="font-bold text-base text-[#1C2733]">
                Common problems on hotel websites, and what I do about them
              </h3>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {comparisonRows.map((row, idx) => (
                <div key={idx} className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                  <div className="text-slate-500 flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>{row.problem}</span>
                  </div>
                  <div className="text-slate-800 font-medium flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{row.solution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. HOW IT WORKS (Section B5.5)
      ────────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-16 md:py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="container mx-auto px-6 max-w-5xl">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl md:text-4xl font-black text-[#1C2733] tracking-tight mb-3">
              How it works
            </h2>
            <p className="text-sm text-slate-600">
              A calm, straightforward process without long meetings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#F59E0B]">Step 1</span>
                <h3 className="text-base font-bold text-[#1C2733] mt-1 mb-2">Free review</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  I look at your hotel on a phone and send a one-page note within 2 working days.
                </p>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 mt-4 pt-3 border-t border-slate-100">
                Free, no obligation
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#F59E0B]">Step 2</span>
                <h3 className="text-base font-bold text-[#1C2733] mt-1 mb-2">Proposal</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If it&apos;s useful, I send a fixed-price proposal with scope and timeline within 2 working days.
                </p>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 mt-4 pt-3 border-t border-slate-100">
                Fixed price in EUR
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#F59E0B]">Step 3</span>
                <h3 className="text-base font-bold text-[#1C2733] mt-1 mb-2">Build</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You get a private staging link and short video walkthroughs. Delivery in 7-14 days once photos and text are received.
                </p>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 mt-4 pt-3 border-t border-slate-100">
                Private preview link
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#F59E0B]">Step 4</span>
                <h3 className="text-base font-bold text-[#1C2733] mt-1 mb-2">Launch</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  I connect your domain, set up analytics, check it on real phones, and hand over the code.
                </p>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 mt-4 pt-3 border-t border-slate-100">
                100% code ownership
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. PRICING & SCOPE (Section F1, F3, C1, C2, C3)
      ────────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              PRICING & SCOPE
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-[#1C2733] tracking-tight mt-1 mb-3">
              Fixed prices in euros.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              50% to start, 50% after you approve the staging site. You own the code.
            </p>
          </div>

          {/* Booking engine notice (Section C1) */}
          <div className="mb-8 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-2xl mx-auto text-center leading-relaxed">
            <strong className="text-slate-800">Already have a booking engine?</strong> Keep it. I&apos;ll connect it to your new website, or add a direct enquiry button next to it. I don&apos;t replace your booking system, and I don&apos;t process payments for you.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-10">
            
            {/* Tier 1 */}
            <div className="bg-[#F8F9FA] rounded-2xl p-8 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Showcase Website</span>
                <h3 className="text-2xl font-black text-[#1C2733] mt-1 mb-2">Showcase Website</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  A fast mobile website for your hotel with room cards, story, and direct enquiry buttons.
                </p>

                <div className="mb-6 pb-6 border-b border-slate-200">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-[#1C2733]">€690</span>
                    <span className="text-xs text-slate-500 uppercase">Fixed fee</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Delivery in 7-10 working days once content is received</p>
                </div>

                <ul className="space-y-3 text-xs text-slate-700 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                    <span>Fast mobile website for phones, tablets, and desktop</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                    <span>Room cards with size, bed type, and what is included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                    <span>Direct enquiry buttons (WhatsApp, Viber, email)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                    <span>Domain connection and privacy-friendly analytics setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                    <span>2 rounds of revisions included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                    <span>30 days of fixes after launch</span>
                  </li>
                </ul>
              </div>

              <a
                href="#review-request"
                onClick={() => setFormData(prev => ({ ...prev, requestType: 'A website for my hotel' }))}
                className="w-full py-3.5 bg-white hover:bg-slate-100 text-[#1C2733] font-bold text-xs rounded-full border border-slate-300 text-center transition-colors"
              >
                Inquire about Showcase Website (€690)
              </a>
            </div>

            {/* Tier 2 */}
            <div className="bg-[#1C2733] text-white rounded-2xl p-8 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider">Showcase + Assistant</span>
                <h3 className="text-2xl font-black text-white mt-1 mb-2">Showcase + AI Assistant</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Everything in Showcase Website, plus an assistant answering common guest questions in 4 languages.
                </p>

                <div className="mb-6 pb-6 border-b border-slate-700">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">€1,290</span>
                    <span className="text-xs text-slate-400 uppercase">Fixed fee</span>
                  </div>
                  <p className="text-[11px] text-[#F59E0B] mt-1">Includes 6 months assistant hosting and maintenance</p>
                </div>

                <ul className="space-y-3 text-xs text-slate-200 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>Everything included in Showcase Website</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>24/7 AI Assistant embedded on your website</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>German, Italian, French and English support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>Trained only on your approved property handbook</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>Direct handoff to WhatsApp or Viber with chat summary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>6 months hosting and updates (optional €29/mo thereafter)</span>
                  </li>
                </ul>
              </div>

              <div>
                <a
                  href="#review-request"
                  onClick={() => setFormData(prev => ({ ...prev, requestType: 'A website + AI assistant' }))}
                  className="block w-full py-3.5 bg-[#F59E0B] hover:bg-amber-500 text-[#1C2733] font-bold text-xs rounded-full text-center transition-colors"
                >
                  Inquire about Showcase + Assistant (€1,290)
                </a>
                <p className="text-[10px] text-slate-400 text-center mt-2">
                  Recovers its cost after ~10-15 direct bookings (saving 15-20% in OTA commissions).
                </p>
              </div>
            </div>

          </div>

          {/* Clarity table: What you own vs what I run (Section C2) */}
          <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-slate-200 text-xs mb-8">
            <h4 className="font-bold text-[#1C2733] text-sm mb-3">What you own, and what I run</h4>
            <p className="text-slate-600 leading-relaxed mb-4">
              You own your website code, content, and domain. The AI assistant is a separate subscription that runs on my side. If you stop the subscription, I remove the chat widget and your website keeps working as normal. Your house information and chat history are yours: I&apos;ll export them on request and delete them from my systems afterwards.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200 text-[11px]">
              <div>
                <strong className="text-slate-800">You own:</strong> Website code, text, photos, domain name, and booking links.
              </div>
              <div>
                <strong className="text-slate-800">I run:</strong> The cloud assistant, language models, and monthly updates.
              </div>
            </div>
          </div>

          {/* Staging-first guarantee & payment terms (Section C3 & F3) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-5 border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
                <span>Staging-first: see it before you pay the second half</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                I build your site on a private staging link. You check it on your own phone and ask for changes before you pay the final 50%.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Invoicing & Payment</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                50% to start, 50% after you approve the staging site. Invoiced in EUR via Wise Business (SEPA bank transfer or card). You receive a proper invoice for each payment.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          11. WHO YOU'LL BE WORKING WITH (Full Section, Section A3)
      ────────────────────────────────────────────────────────────── */}
      <section id="about-me" className="py-16 md:py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="container mx-auto px-6 max-w-3xl">
          
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              WHO YOU&apos;LL BE WORKING WITH
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1C2733] tracking-tight mt-1">
              Faisal Alfarizi
            </h2>
            <p className="text-xs text-slate-500 mt-1">Independent web designer and developer in Jakarta, Indonesia</p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-5 text-sm text-slate-700 leading-relaxed">
            <p>
              Hi, I&apos;m Faisal. I&apos;m a one-person studio in Jakarta, Indonesia.
            </p>
            <p>
              That has two practical effects. First, you always talk to the person who actually designs and builds your site, with no account managers in between. Second, there is a time difference: Jakarta is 5-6 hours ahead of the Balkans (5 in summer, 6 in winter). I reply to messages within one working day, usually in your morning, which is my afternoon.
            </p>
            <p>
              Most of the work happens in writing and short video notes, so you can review things when it suits your hotel&apos;s schedule. If you&apos;d rather talk, I&apos;m happy to set up a call at a time that works for you.
            </p>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
              <a 
                href="mailto:faisalalfarizi@webuntukusaha.com" 
                className="text-[#1C2733] hover:text-[#F59E0B] flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4 text-slate-500" />
                <span>faisalalfarizi@webuntukusaha.com</span>
              </a>
              <a 
                href="https://wa.me/6281383521750" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#1C2733] hover:text-[#F59E0B] flex items-center gap-1.5"
              >
                <PhoneCall className="w-4 h-4 text-slate-500" />
                <span>+62 813-8352-1750 (WhatsApp & Viber)</span>
              </a>
              <span className="text-slate-500">Replies within 1 working day</span>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          12. FAQ SECTION (Lampiran 1)
      ────────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              QUESTIONS & ANSWERS
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-[#1C2733] tracking-tight mt-1 mb-3">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-3">
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
              },
              {
                q: "What happens if you can't be reached?",
                a: "You own the code and the domain, and I give you a short handover document with all access details and deployment instructions so any developer can maintain it."
              }
            ].map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left font-bold text-sm sm:text-base text-[#1C2733] flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#F59E0B]" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3"
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
          13. FREE 1-PAGE REVIEW REQUEST FORM (Section E1)
      ────────────────────────────────────────────────────────────── */}
      <section id="review-request" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="container mx-auto px-6 max-w-2xl">
          
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                NO SALES CALLS · 2 WORKING DAYS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1C2733] tracking-tight mt-1 mb-2">
                Get a free 1-page review
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Send me a link to your hotel (website, Booking.com page, Instagram or Google Maps). I&apos;ll look at it on a phone the way a guest would and send you a one-page note within 2 working days. Free, no obligation.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-[#F8F9FA] rounded-xl p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#1C2733] text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="text-lg font-bold text-[#1C2733]">Thanks, {formData.yourName || "there"}.</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                  I&apos;ve received your request for <strong>{formData.hotelName || "your hotel"}</strong>. I&apos;ll look at it on a phone and send your one-page review to <strong>{formData.email}</strong> within 2 working days. If you don&apos;t see it, please check your spam folder or write directly to <a href="mailto:faisalalfarizi@webuntukusaha.com" className="underline font-semibold">faisalalfarizi@webuntukusaha.com</a>.
                </p>

                <div className="pt-3 border-t border-slate-200">
                  <a
                    href={`https://wa.me/6281383521750?text=${encodeURIComponent(`Hi Faisal, I just requested a 1-page review for ${formData.hotelName || "our hotel"}. My email is ${formData.email}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#1C2733] underline"
                  >
                    <span>Send a note on WhatsApp instead</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                {/* Hotel Name */}
                <div>
                  <label className="block text-xs font-bold text-[#1C2733] mb-1">
                    Hotel name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Villa Kliment"
                    value={formData.hotelName}
                    onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B]"
                  />
                </div>

                {/* Online Link (URL Optional: Website, Booking.com, Instagram, or Google Maps) */}
                <div>
                  <label className="block text-xs font-bold text-[#1C2733] mb-1">
                    Where can I find your hotel online? *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Website, Booking.com, Instagram or Google Maps link"
                    value={formData.onlineLink}
                    onChange={(e) => setFormData({ ...formData, onlineLink: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B]"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    No website yet? That&apos;s fine. Share your Booking.com or Instagram page and I&apos;ll review that instead.
                  </p>
                </div>

                {/* Name & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1C2733] mb-1">
                      Your name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena"
                      value={formData.yourName}
                      onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1C2733] mb-1">
                      Your role (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Owner, Host, Manager"
                      value={formData.yourRole}
                      onChange={(e) => setFormData({ ...formData, yourRole: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-[#1C2733] mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B]"
                  />
                </div>

                {/* Request Type Radios */}
                <div>
                  <label className="block text-xs font-bold text-[#1C2733] mb-2">
                    What would you like? *
                  </label>
                  <div className="space-y-2 text-xs text-slate-700">
                    {[
                      'Free 1-page review',
                      'A website for my hotel',
                      'A website + AI assistant',
                      'I\'m not sure yet'
                    ].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="requestType"
                          value={option}
                          checked={formData.requestType === option}
                          onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                          className="accent-[#1C2733]"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold text-[#1C2733] mb-1">
                    Anything you&apos;d like me to look at? (optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. We have trouble getting guests to book direct instead of Booking.com"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B] resize-none"
                  />
                </div>

                {/* Consent Checkbox (Section E1) */}
                <div className="pt-2">
                  <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-0.5 accent-[#1C2733]"
                    />
                    <span>
                      I agree that WUUS will use my details to reply to this request, as described in the{' '}
                      <Link href="/hospitality/privacy" className="text-[#1C2733] underline hover:text-[#F59E0B]">
                        Privacy Policy
                      </Link>.
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send my free review request</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-slate-500 mt-2">
                  I read every request myself and reply by email. I won&apos;t call you.
                </p>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          14. FOOTER (Section H5, A6)
      ────────────────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-12">
        <div className="w-full mx-auto px-6 md:px-[max(60px,5vw)]">
          
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
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Websites for independent hotels.
              </p>
              <p className="text-xs text-slate-500">
                Jakarta, Indonesia
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Contact</h4>
              <ul className="space-y-2 text-xs text-slate-600">
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
                <li className="text-[11px] text-slate-500 pt-1">
                  Reply within 1 working day.
                </li>
              </ul>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Sections</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><a href="#how-it-works" className="hover:text-[#F59E0B]">How it works</a></li>
                <li><a href="#concepts" className="hover:text-[#F59E0B]">Design concepts</a></li>
                <li><a href="#ai-assistant" className="hover:text-[#F59E0B]">AI Assistant</a></li>
                <li><a href="#pricing" className="hover:text-[#F59E0B]">Pricing & scope</a></li>
                <li><a href="#faq" className="hover:text-[#F59E0B]">FAQ</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Legal & Language</h4>
              <ul className="space-y-2 text-xs text-slate-600">
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
                  <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#1C2733]">
                    <span className="font-bold text-[10px] bg-slate-100 px-1 py-0.5 rounded text-slate-700">ID</span>
                    <span>Bahasa Indonesia →</span>
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Sub-footer */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} WUUS. All rights reserved.</p>
            <p className="text-[11px]">
              Simple, fast websites for independent boutique hotels.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
