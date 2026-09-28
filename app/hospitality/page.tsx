'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { 
  ArrowRight, 
  Check, 
  Globe, 
  Sparkles, 
  ShieldCheck,
  Clock,
  Send,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  PhoneCall,
  Mail,
  Zap,
  MousePointerClick,
  AlertCircle,
  Eye,
  CheckCircle2,
  Menu,
  X,
  Bot,
  MessageSquare,
  Languages,
  MessageCircle,
  Star,
  Users,
  Sliders
} from 'lucide-react';

// Portfolio / Mockup Projects for Hospitality
const hospitalityProjects = [
  {
    id: 1,
    title: "Savoria Residence & Terroir",
    category: "Boutique Wine Estate & Stays",
    location: "Lake Ohrid / Adriatic Coast",
    img: "/images/hospitality/savoria-wine-estate.jpg",
    accent: "#D97706",
    tag: "Terroir & Heritage",
    description: "Custom digital home designed for a historic lakeside wine estate. Emphasizes curated wine tastings, private suites, and seamless direct inquiries."
  },
  {
    id: 2,
    title: "Vila Kliment Heritage & Suites",
    category: "Lakeview Boutique Residence",
    location: "Ohrid / North Macedonia",
    img: "/images/hospitality/mobile-stay-ui.jpg",
    accent: "#1C2733",
    tag: "Mobile-First Direct Flow",
    description: "Designed thumb-first for discerning travelers. Instant visual room discovery, transparent direct rates, and effortless WhatsApp/Email inquiries with the host."
  },
  {
    id: 3,
    title: "Artisan Coastal Retreat",
    category: "Curated Boutique Stays",
    location: "Ionian Riviera / Tirana",
    img: "/kain-nusantara-mockup.png",
    accent: "#B45309",
    tag: "Atmospheric Visuals",
    description: "Full-bleed imagery of sunset terraces, local culinary experiences, and private guest suites engineered for instantaneous mobile loading."
  },
  {
    id: 4,
    title: "The Metropolitan Loft Suites",
    category: "Design Urban Boutique",
    location: "Sarajevo / Central Quarter",
    img: "/urbanThreads-mockup.png",
    accent: "#2563EB",
    tag: "Bespoke Urban Stays",
    description: "Minimalist urban lodging interface that allows busy international travelers to inspect room types and reserve directly in under 45 seconds."
  },
  {
    id: 5,
    title: "Palazzo Concierge & Suites",
    category: "Historic Boutique Palace",
    location: "Dubrovnik / Kotor Bay",
    img: "/dressy-rent-mockup.png",
    accent: "#DC2626",
    tag: "Guest Concierge Experience",
    description: "A tailored digital experience showcasing yacht charters, private terrace breakfasts, and bespoke concierge arrangements."
  }
];

// 24/7 Multilingual AI Concierge Scenarios
const conciergeScenarios = [
  {
    id: 'de',
    lang: 'Deutsch (German)',
    flag: '🇩🇪',
    guestName: 'Hans & Claudia M.',
    location: 'Munich, Germany',
    time: '23:42 · Late-Night Drive',
    inquiry: 'Guten Abend! Wir reisen mit einem Kombi an. Haben Sie sichere Parkplätze im Innenhof, und können wir nach 22:30 Uhr kontaktlos einchecken?',
    response: 'Guten Abend Herr Müller! Ja, wir verfügen über private, videoüberwachte Parkplätze direkt im geschützten Innenhof (für Hotelgäste kostenfrei, auch für große Kombis & SUVs geeignet). Ein kontaktloser Late Check-in nach 22:30 Uhr ist über unsere Schlüsselbox am Haupteingang jederzeit problemlos möglich. Sollen wir Ihnen die Heritage Balcony Suite mit Innenhofblick unverbindlich vormerken?',
    sourceCitation: 'Verified: Host Property Handbook §2.1 (Courtyard Parking) & §1.4 (Keybox Access)',
    latency: '1.2s',
    confidence: '99.8% Grounded',
    whatsappMessage: 'Hi! I saw the answers regarding parking and late check-in on your website. We would like to inquire about reserving the Heritage Balcony Suite for 3 nights.'
  },
  {
    id: 'it',
    lang: 'Italiano (Italian)',
    flag: '🇮🇹',
    guestName: 'Matteo & Sofia B.',
    location: 'Milano, Italy',
    time: '22:15 · Weekend Getaway',
    inquiry: 'Buonasera! Viaggiamo con un cagnolino di 5 kg. È ammesso nelle camere con balcone? E la colazione artigianale è inclusa nelle prenotazioni dirette?',
    response: 'Buonasera! I cani di piccola taglia (fino a 10 kg) sono i benvenuti nelle nostre Balcony Suites con un piccolo supplemento pulizia di 15€ per soggiorno. Inoltre, prenotando direttamente con noi, la ricca colazione artigianale sulla terrazza panoramica è sempre inclusa gratuitamente (risparmiando circa il 15% rispetto alle tariffe terze). Desidera ricevere disponibilità diretta per il vostro weekend?',
    sourceCitation: 'Verified: Host Property Handbook §3.8 (Pet Policy) & §5.2 (Direct Rate Perks)',
    latency: '1.4s',
    confidence: '99.9% Grounded',
    whatsappMessage: 'Buonasera! Vorrei informazioni sulla disponibilità della Balcony Suite per noi e il nostro cagnolino con la colazione inclusa.'
  },
  {
    id: 'en',
    lang: 'English (UK / US)',
    flag: '🇬🇧',
    guestName: 'Eleanor Vance',
    location: 'London, United Kingdom',
    time: '00:18 · Planning Summer Stay',
    inquiry: 'Hi there! We are looking at a 4-night stay in July. Is it better to book directly on your site or via Booking.com? Also, can you coordinate private airport transfer from Tirana?',
    response: 'Hello Eleanor! Booking directly with us guarantees our best flexible rate (approx. 12–15% lower than third-party platforms) plus a complimentary welcome bottle of regional vintage wine. We also coordinate private Mercedes transfer directly from Tirana Airport (fixed at €45, payable directly to the driver). Would you like me to connect you with our host on WhatsApp to secure these dates with zero deposit?',
    sourceCitation: 'Verified: Direct Booking Best Rate Guarantee & Concierge Transfer Protocol',
    latency: '0.9s',
    confidence: '100% Grounded',
    whatsappMessage: 'Hi! I inquired through your website concierge regarding the 4-night stay in July and airport transfer. Would love to confirm availability directly.'
  },
  {
    id: 'fr',
    lang: 'Français (French)',
    flag: '🇫🇷',
    guestName: 'Camille & Julien D.',
    location: 'Lyon, France',
    time: '21:05 · Wine & Gastronomy',
    inquiry: 'Bonjour, proposez-vous des dégustations de vins du domaine pour les non-résidents le vendredi soir ? Et quelles sont les options végétariennes au dîner ?',
    response: 'Bonjour Camille ! Absolument. Nos dégustations commentées avec accords mets & vins ont lieu chaque vendredi à 18h30 dans le cellier historique (35€ par personne). Notre chef propose également un menu dégustation végétarien 4 plats mettant à l\'honneur les produits biologiques du potager. Les places étant limitées à 12 convives, souhaitez-vous que nous vous réservions une table pour ce vendredi ?',
    sourceCitation: 'Verified: Terroir Tasting Schedule & Cellar Dietary Specs',
    latency: '1.3s',
    confidence: '99.7% Grounded',
    whatsappMessage: 'Bonjour ! Nous souhaiterions réserver la dégustation de vins du vendredi soir et le dîner dégustation végétarien.'
  }
];

// ADRA Framework Pillars
const adraPillars = [
  {
    letter: "A",
    title: "Atmosphere First",
    subtitle: "Showcase Character, Not Generic Templates",
    desc: "Discerning guests book boutique hotels for their soul — the limestone walls, the morning light in the courtyard, the host's private wine cellar. We showcase this atmosphere with optimized full-screen visuals and zero lag.",
    highlight: "Sub-second image rendering",
    icon: Sparkles
  },
  {
    letter: "D",
    title: "Direct Inquiry Clarity",
    subtitle: "Frictionless Paths for High-Intent Guests",
    desc: "When travelers want to book directly, confusing third-party booking widgets or hidden rates send them straight back to OTAs. We build clear room comparison cards and instant WhatsApp/Email inquiry channels.",
    highlight: "Zero clunky third-party frames",
    icon: Send
  },
  {
    letter: "R",
    title: "Respectful Performance",
    subtitle: "Ultra-Lightweight on Mobile Networks",
    desc: "International travelers research hotels while on 4G trains, regional ferries, or roaming mobile connections. Our Next.js architecture loads in under 800ms without bloated scripts or battery-draining trackers.",
    highlight: "Lighthouse Score 95+",
    icon: Zap
  },
  {
    letter: "A",
    title: "Architectural Storytelling",
    subtitle: "Heritage & Host Narrative",
    desc: "Your hotel is not a commodity room number. We craft subtle narrative sections that celebrate your family heritage, local culinary pairings, and neighborhood insider guides that guests cannot find on Booking.com.",
    highlight: "Uniquely memorable identity",
    icon: ShieldCheck
  }
];

// Honest Comparison Points
const comparisonPoints = [
  {
    feature: "First Impression & Speed",
    generic: "Clunky 5–8s loading with heavy WordPress plugins",
    wuus: "Sub-1s instant paint powered by Next.js & Turbopack"
  },
  {
    feature: "Direct Reservation Journey",
    generic: "Impersonal third-party iframe with small, unreadable text on mobile",
    wuus: "Bespoke, human-touch inquiry flow (WhatsApp, Email, or Direct PMS)"
  },
  {
    feature: "Mobile Guest Experience",
    generic: "Broken photo grids, crowded tables, slow touch gestures",
    wuus: "Fluid, app-like native feel designed thumb-first for smartphones"
  },
  {
    feature: "Maintenance & Independence",
    generic: "Constant security plugin updates and vendor lock-in",
    wuus: "Zero maintenance overhead, 100% client code ownership & static hosting"
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
  const [formData, setFormData] = useState({
    hotelName: '',
    websiteUrl: '',
    contactName: '',
    email: '',
    packageInterest: 'Tier 2: The Complete AI Hospitality Engine (€1,290)',
    notes: '',
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax transform for hero floating cards
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

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
    }, 350);
  };

  const scrollPortfolio = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - offset : scrollLeft + offset,
        behavior: 'smooth'
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Save lead to Supabase database
    try {
      const formattedNotes = `[Interest: ${formData.packageInterest}] ${formData.notes ? '• ' + formData.notes : ''}`.trim();
      await supabase.from('hospitality_inquiries').insert([
        {
          hotel_name: formData.hotelName,
          website_url: formData.websiteUrl,
          contact_name: formData.contactName,
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
    <div className="min-h-screen bg-light-grey text-primary-navy font-sans antialiased selection:bg-accent-orange selection:text-primary-navy">
      {/* Suppress root layout floating Indonesian builder button on international hospitality page */}
      <style jsx global>{`
        #floating-ai-builder {
          display: none !important;
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────────
          1. HEADER / NAVBAR (Exact same design language as Indonesian site)
      ────────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform-gpu ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="w-full mx-auto px-6 md:px-[max(60px,5vw)] flex items-center justify-between">
          {/* Logo with Brand Asset */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo.png"
                alt="WUUS Logo"
                width={142}
                height={40}
                priority
                className="h-9 w-auto object-contain"
              />
            </Link>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-gray-200 bg-white/80 text-[10px] font-bold tracking-widest uppercase text-primary-navy shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Hospitality
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            <a href="#philosophy" className="font-semibold text-sm text-primary-navy hover:text-accent-orange transition-colors">
              The Problem
            </a>
            <a href="#portfolio" className="font-semibold text-sm text-primary-navy hover:text-accent-orange transition-colors">
              Selected Works
            </a>
            <a href="#ai-concierge" className="font-semibold text-sm text-primary-navy hover:text-accent-orange transition-colors flex items-center gap-1.5 group">
              <span>AI Concierge</span>
              <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-200 px-1.5 py-0.2 rounded font-bold uppercase group-hover:bg-accent-orange group-hover:text-primary-navy transition-colors">
                24/7
              </span>
            </a>
            <a href="#framework" className="font-semibold text-sm text-primary-navy hover:text-accent-orange transition-colors">
              ADRA Framework
            </a>
            <a href="#pricing" className="font-semibold text-sm text-primary-navy hover:text-accent-orange transition-colors">
              Pricing & Scope
            </a>
            <a href="#faq" className="font-semibold text-sm text-primary-navy hover:text-accent-orange transition-colors">
              FAQ
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/" 
              className="text-xs font-semibold text-gray-500 hover:text-primary-navy transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded border border-gray-200 hover:border-gray-300"
              title="Kembali ke halaman utama bahasa Indonesia"
            >
              <span>🇮🇩</span>
              <span>Versi ID</span>
            </Link>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-accent-orange hover:bg-accent-yellow text-primary-navy px-5 py-2.5 rounded text-xs md:text-sm font-bold transition-all shadow-sm border border-primary-navy/20 cursor-pointer"
            >
              Get Free 1-Page Review
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-accent-orange text-primary-navy px-3.5 py-1.5 rounded text-xs font-bold"
            >
              Review
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-primary-navy p-2 bg-white rounded-md border border-gray-200 shadow-xs"
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
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-white w-full h-screen flex flex-col pt-6 px-6 pb-12 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10">
              <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/logo.png"
                  alt="WUUS Logo"
                  width={142}
                  height={40}
                  className="h-9 w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 bg-gray-100 rounded-full text-primary-navy border border-gray-200"
                aria-label="Close Navigation Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-5 mb-10">
              <a
                href="#philosophy"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-bold text-primary-navy border-b border-gray-100 pb-3"
              >
                The Friction in Booking
              </a>
              <a
                href="#portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-bold text-primary-navy border-b border-gray-100 pb-3"
              >
                Selected Boutique Works
              </a>
              <a
                href="#ai-concierge"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-bold text-primary-navy border-b border-gray-100 pb-3 flex items-center justify-between"
              >
                <span>24/7 AI Guest Concierge</span>
                <span className="text-xs font-bold uppercase bg-accent-orange text-primary-navy px-2 py-0.5 rounded">Live Demo</span>
              </a>
              <a
                href="#framework"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-bold text-primary-navy border-b border-gray-100 pb-3"
              >
                The ADRA Framework
              </a>
              <a
                href="#workflow"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-bold text-primary-navy border-b border-gray-100 pb-3"
              >
                How We Work Asynchronously
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-bold text-primary-navy border-b border-gray-100 pb-3"
              >
                Studio Pricing & Scope
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-bold text-primary-navy border-b border-gray-100 pb-3"
              >
                Frequently Asked Questions
              </a>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-gray-500 pt-2 flex items-center gap-2"
              >
                <span>🇮🇩</span> Buka Halaman Utama (Indonesia)
              </Link>
            </nav>

            <div className="mt-auto">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setModalOpen(true);
                }}
                className="w-full text-center bg-accent-orange hover:bg-accent-yellow text-primary-navy px-6 py-4 rounded-lg font-bold text-base shadow-sm"
              >
                Request Free 1-Page Website Review
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION (Identical visual structure to Indonesian Hero)
      ────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative bg-off-white pt-36 pb-28 lg:pt-48 lg:pb-44 overflow-hidden z-10">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-secondary-blue/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent-orange/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-20 flex flex-col items-center">
          
          {/* Main Headline & Context */}
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center w-full"
            >
              {/* Studio Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200 bg-white text-gray-700 text-xs font-semibold tracking-wide mb-6 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
                <span>Next.js Architecture + 24/7 Multilingual AI Guest Concierge</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-[2.25rem] min-[375px]:text-4xl md:text-6xl lg:text-7xl font-black text-primary-navy tracking-tight leading-[1.08] mb-6">
                Quiet Luxury Web Design for <br className="hidden md:block" />
                <span className="font-serif italic font-light text-accent-orange">Independent Boutique Hotels.</span>
              </h1>

              {/* Subhead */}
              <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mb-10 font-normal leading-relaxed">
                We engineer calm, high-performance websites and 24/7 multilingual AI concierges that highlight your property&apos;s character, answer late-night international inquiries in 2 seconds, and capture direct bookings on WhatsApp.
              </p>

              {/* Neo-brutalist Action Buttons matching the Indonesian version */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-xl mx-auto relative z-30">
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-3.5 bg-accent-orange hover:bg-accent-yellow text-primary-navy font-bold text-xs md:text-sm tracking-wide transition-all shadow-[4px_4px_0px_0px_#1C2733] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1C2733] border-2 border-primary-navy uppercase rounded-xs cursor-pointer text-center flex items-center justify-center gap-2 group"
                >
                  <span>Request Free 1-Page Review</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#portfolio"
                  className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-gray-50 text-primary-navy font-bold text-xs md:text-sm tracking-wide transition-all shadow-[4px_4px_0px_0px_#1C2733] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1C2733] border-2 border-primary-navy uppercase rounded-xs cursor-pointer text-center"
                >
                  Explore Selected Stays
                </a>
              </div>

              {/* Trust Signal */}
              <div className="mt-8 flex items-center gap-6 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No sales pitch or cold calls
                </span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Delivered within 48 hours
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Handcrafted by humans
                </span>
              </div>
            </motion.div>
          </div>

          {/* Left Floating Photo Frame (Using Project Asset Hero1.png) */}
          <motion.div
            style={{ y: y1 }}
            className="absolute lg:left-2 2xl:-left-8 top-44 z-10 lg:scale-[0.7] xl:scale-[0.85] 2xl:scale-100 origin-left hidden lg:block"
          >
            <div className="relative">
              {/* Background accent */}
              <div className="absolute -left-6 -top-6 w-[120px] fill-accent-orange/20 z-0">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40.5 12C45.2 3.5 54.8 3.5 59.5 12L88.7 64C93.4 72.5 88.6 83 79.2 83H20.8C11.4 83 6.6 72.5 11.3 64L40.5 12Z" />
                </svg>
              </div>
              <div className="w-[270px] h-[320px] bg-white rounded-3xl p-3 shadow-2xl relative z-10 border border-gray-100 flex flex-col rotate-[-2deg]">
                <div className="w-full h-full rounded-2xl bg-gray-100 overflow-hidden relative">
                  <Image
                    src="/images/hospitality/host-portrait.jpg"
                    alt="Independent Boutique Hotel Host"
                    fill
                    priority
                    sizes="300px"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-primary-navy text-white px-3.5 py-2 rounded-xl shadow-lg border-2 border-white text-[11px] font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Independent Host · Adriatic Stays
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Floating Photo Frame (Using Custom Hospitality Mobile Mockup) */}
          <motion.div
            style={{ y: y2 }}
            className="absolute lg:right-2 2xl:-right-8 top-56 z-10 lg:scale-[0.7] xl:scale-[0.85] 2xl:scale-100 origin-right hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-8 bg-[url('/patterns/cubes.png')] opacity-10 z-0" />
              <div className="w-[280px] bg-white rounded-3xl p-3 shadow-2xl relative z-10 border border-gray-100 rotate-[3deg]">
                <div className="h-[210px] rounded-2xl bg-gray-100 overflow-hidden relative">
                  <Image
                    src="/images/hospitality/mobile-stay-ui.jpg"
                    alt="Boutique Hotel Mobile Guest Experience"
                    fill
                    priority
                    sizes="300px"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="pt-3 px-1 pb-1">
                  <p className="text-[11px] font-bold text-primary-navy uppercase tracking-wider">Sub-1s Mobile Experience</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Vila Kliment · Direct Guest Inquiries</p>
                </div>
                <div className="absolute -top-6 -right-6 w-14 h-14 bg-accent-orange rounded-2xl flex items-center justify-center shadow-lg rotate-12 border-3 border-white">
                  <Globe className="text-primary-navy w-7 h-7" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Brush Edge Bottom Transition (Exact same visual element as Indonesian Hero) */}
        <div className="absolute bottom-0 left-0 w-full h-[60px] md:h-[100px] bg-secondary-blue brush-edge-bottom z-10 translate-y-[2px]" />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. MARQUEE / STUDIO PRINCIPLES STRIP
      ────────────────────────────────────────────────────────────── */}
      <section className="bg-secondary-blue text-white py-6 overflow-hidden relative z-20">
        <div className="w-full flex items-center justify-around gap-8 text-xs font-semibold uppercase tracking-widest text-slate-300 px-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
            <span>Adriatic & Balkan Boutique Stays</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
            <span>Zero Third-Party iFrame Lag</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
            <span>Direct WhatsApp & Email Inquiries</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
            <span>Sub-800ms Mobile Performance</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
            <span>100% Async Collaboration (No Zoom Fatigue)</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. THE PROBLEM / STORYTELLING SECTION (Dark #020617 Theme)
          Matches `components/storytelling.tsx` from Indonesian site
      ────────────────────────────────────────────────────────────── */}
      <section id="philosophy" className="relative py-28 lg:py-36 bg-[#020617] text-white overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          
          <div className="max-w-3xl mx-auto text-center mb-20">
            <span className="text-accent-orange text-xs font-bold tracking-widest uppercase">The Guest Journey Reality</span>
            <h2 className="text-3xl md:text-5xl font-black mt-3 mb-6 leading-tight tracking-tight">
              Why do high-intent travelers admire your hotel, <br />
              <span className="font-serif italic font-light text-accent-orange lowercase">yet book somewhere else?</span>
            </h2>
            <div className="h-1 w-16 bg-accent-orange mx-auto mb-6" />
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Independent hoteliers spend years curating authentic decor, locally sourced breakfasts, and warm host hospitality. But on their website, guests often encounter three invisible friction points.
            </p>
          </div>

          {/* 3 Human Friction Points */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Step 1 */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col justify-between hover:border-accent-orange/40 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif italic text-accent-orange text-3xl">01</span>
                  <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">The Heavy Loading Wall</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Uncompressed 12MB gallery photos and slow legacy plugins take 6 to 9 seconds to render on international mobile networks. Discerning guests tap back before the room preview ever appears.
                </p>
              </div>

              {/* Bespoke Interactive English UI Simulation (Replaces Indonesian step1 graphic) */}
              <div className="relative h-44 rounded-2xl overflow-hidden border border-red-500/20 bg-slate-950/90 p-4 mt-4 flex flex-col justify-between font-mono text-[11px] shadow-inner">
                {/* Simulated Browser Bar */}
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/80" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[10px] text-slate-400 truncate max-w-[150px]">hotel-example.com/suites</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold">8.4s LCP</span>
                </div>

                {/* Simulated Slow Loading State */}
                <div className="space-y-2 my-auto">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                      Loading 14 uncompressed photos...
                    </span>
                    <span className="text-red-400 font-bold">12.8 MB</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
                    <div className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full w-[35%] animate-pulse" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1 opacity-30">
                    <div className="h-8 rounded bg-slate-800" />
                    <div className="h-8 rounded bg-slate-800" />
                    <div className="h-8 rounded bg-slate-800" />
                  </div>
                </div>

                {/* Alert Footnote */}
                <div className="flex items-center justify-between text-[10px] pt-2 border-t border-white/5 text-slate-400">
                  <span className="text-red-400 font-medium">⚠ 82% Mobile Drop-off Rate</span>
                  <span className="text-slate-400">3G/4G Roaming</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col justify-between hover:border-accent-orange/40 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif italic text-accent-orange text-3xl">02</span>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-accent-orange border border-amber-500/20">
                    <MousePointerClick className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">The Clunky Booking Widget</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Small, non-responsive calendar popups and confusing date pickers alienate smartphone users. Rather than struggling with the form, guests return to Booking.com — where you pay 15–20% commission.
                </p>
              </div>

              {/* Bespoke Interactive English UI Simulation (Replaces Indonesian step2 graphic) */}
              <div className="relative h-44 rounded-2xl overflow-hidden border border-amber-500/20 bg-slate-950/90 p-4 mt-4 flex flex-col justify-between font-sans text-[11px] shadow-inner">
                {/* Simulated iFrame Header */}
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-slate-400 font-mono">
                  <span className="text-[10px] text-amber-300/80 flex items-center gap-1 truncate max-w-[180px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    booking-engine-v1.com/widget
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">iFrame</span>
                </div>

                {/* Simulated Broken Widget Flow */}
                <div className="my-auto space-y-1.5">
                  <div className="bg-slate-900/90 rounded-lg p-2.5 border border-white/10 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-300">Select Stay Dates</span>
                      <span className="text-red-400 text-[9px] font-mono">Popup blocked on iOS</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 py-1 px-2 rounded bg-slate-800/80 border border-red-500/30 text-[10px] text-slate-400 flex items-center justify-between">
                        <span>Check-in</span>
                        <span className="text-red-400">✕</span>
                      </div>
                      <div className="flex-1 py-1 px-2 rounded bg-slate-800/80 border border-slate-700 text-[10px] text-slate-400">
                        <span>2 Guests</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Revenue Leak Warning */}
                <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-white/5 text-slate-400">
                  <span className="text-amber-300 font-medium">Guest returns to OTA</span>
                  <span className="font-bold text-red-400 bg-red-500/20 px-2 py-0.5 rounded text-[9px] font-mono">
                    -18% Commission
                  </span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-3xl border border-accent-orange/30 bg-accent-orange/5 p-8 flex flex-col justify-between hover:border-accent-orange transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif italic text-accent-orange text-3xl">03</span>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Zap className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">The Calm Direct Alternative</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  A bespoke, fast-loading digital home that greets guests warmly, lays out room options with transparent amenities, and invites direct questions via WhatsApp, clean forms, or your existing engine.
                </p>
              </div>

              {/* Bespoke Tailored Asset with Live Metrics Badge */}
              <div className="relative h-44 rounded-2xl overflow-hidden border border-emerald-500/30 group mt-4">
                <Image
                  src="/images/hospitality/savoria-wine-estate.jpg"
                  alt="The Calm Direct Web Experience"
                  fill
                  sizes="350px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] text-white">
                  <span className="flex items-center gap-1.5 font-bold text-emerald-400 bg-slate-950/85 px-2.5 py-1 rounded-full border border-emerald-500/30 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Sub-800ms · Direct Host Inquiries
                  </span>
                  <span className="font-mono text-emerald-300 font-bold bg-slate-950/85 px-2 py-1 rounded-full border border-emerald-500/30">
                    0% OTA Fee
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. SELECTED WORKS / PORTFOLIO (Matches Indonesian Portfolio)
      ────────────────────────────────────────────────────────────── */}
      <section id="portfolio" className="relative py-28 lg:py-36 bg-white overflow-hidden border-b border-gray-100">
        <div className="container mx-auto px-6 mb-16 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent-orange">Selected Hospitality Concepts</span>
              <h2 className="text-4xl lg:text-5xl font-black text-primary-navy tracking-tight mt-2">
                Crafted for Character, <br />
                <span className="font-serif italic font-light text-accent-orange text-4xl lg:text-5xl">Engineered for Stays.</span>
              </h2>
            </div>

            {/* Carousel Navigation Arrows */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => scrollPortfolio('left')}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-primary-navy hover:bg-primary-navy hover:text-white transition-all active:scale-95 shadow-xs"
                aria-label="Previous Project"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => scrollPortfolio('right')}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-primary-navy hover:bg-primary-navy hover:text-white transition-all active:scale-95 shadow-xs"
                aria-label="Next Project"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Horizontal Scroll Showcase (Project Mockups) */}
          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-8 pt-2 no-scrollbar snap-x snap-mandatory"
          >
            {hospitalityProjects.map((project) => (
              <div 
                key={project.id}
                className="min-w-[320px] sm:min-w-[420px] lg:min-w-[500px] shrink-0 snap-start bg-light-grey rounded-3xl border border-gray-200 p-6 flex flex-col justify-between group hover:shadow-xl transition-all duration-500"
              >
                <div>
                  <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-white mb-6 border border-gray-100">
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      sizes="500px"
                      className="object-contain p-2 group-hover:scale-[1.03] transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-primary-navy border border-gray-100 shadow-xs">
                      {project.tag}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="font-semibold">{project.category}</span>
                    <span>{project.location}</span>
                  </div>

                  <h3 className="text-xl font-bold text-primary-navy mb-2 group-hover:text-accent-orange transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-200/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-primary-navy">Bespoke Design & Next.js Architecture</span>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="text-xs font-bold text-accent-orange hover:text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    Request Similar Concept <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5.5 THE 24/7 MULTILINGUAL AI GUEST CONCIERGE SHOWCASE
          The High-Leverage Unfair Advantage for Boutique Hoteliers
      ────────────────────────────────────────────────────────────── */}
      <section id="ai-concierge" className="py-28 lg:py-36 bg-white border-t border-b border-gray-200 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-navy/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-900 text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-accent-orange" />
              <span>The 24/7 Guest Concierge Advantage</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-primary-navy tracking-tight leading-tight">
              Capture Direct Bookings <br />
              <span className="font-serif italic font-light text-accent-orange">While Your Front Desk Sleeps.</span>
            </h2>
            <div className="h-1 w-16 bg-accent-orange mx-auto my-6" />
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              European travelers from Germany, Italy, France, and the UK research trips late in the evening. When they ask about courtyard parking, pet policies, or airport transfers at 11:30 PM, waiting 10 hours for an email reply loses the reservation to Booking.com. 
              <br className="hidden md:block" />
              Our grounded AI Concierge answers in 2 seconds in their mother tongue, and hands them off directly to your WhatsApp.
            </p>
          </div>

          {/* Interactive Simulation Dashboard */}
          <div className="bg-light-grey rounded-3xl border-2 border-primary-navy shadow-[8px_8px_0px_0px_#1C2733] overflow-hidden mb-16">
            
            {/* Top Bar / Language Selector */}
            <div className="bg-primary-navy text-white p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b-2 border-primary-navy">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-orange text-primary-navy flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm sm:text-base">Interactive Concierge Simulation</h3>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Grounded Preview
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">Test how the concierge answers real European guest inquiries</p>
                </div>
              </div>

              {/* Language Selector Pills */}
              <div className="flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-2xl border border-white/10 overflow-x-auto max-w-full">
                {conciergeScenarios.map((sc, idx) => (
                  <button
                    key={sc.id}
                    onClick={() => handleScenarioChange(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                      activeScenarioIdx === idx 
                        ? 'bg-accent-orange text-primary-navy shadow-sm' 
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{sc.flag}</span>
                    <span>{sc.lang.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulation Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 bg-off-white">
              
              {/* Left Column: Guest Context & Grounding Metrics (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent-orange">Verified Guest Context</span>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xl shadow-xs">
                      {conciergeScenarios[activeScenarioIdx].flag}
                    </div>
                    <div>
                      <h4 className="font-bold text-primary-navy text-sm sm:text-base">
                        {conciergeScenarios[activeScenarioIdx].guestName}
                      </h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-accent-orange" />
                        {conciergeScenarios[activeScenarioIdx].location} • {conciergeScenarios[activeScenarioIdx].time}
                      </p>
                    </div>
                  </div>

                  {/* Grounded RAG Citation Guardrail */}
                  <div className="mt-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs">
                    <div className="flex items-center gap-2 font-bold text-amber-950 mb-1">
                      <ShieldCheck className="w-4 h-4 text-accent-orange shrink-0" />
                      <span>Zero-Hallucination Guardrail</span>
                    </div>
                    <p className="text-amber-900/90 leading-relaxed font-mono text-[11px]">
                      {conciergeScenarios[activeScenarioIdx].sourceCitation}
                    </p>
                    <p className="text-[10px] text-amber-800/80 mt-2 italic">
                      *Trained exclusively on your hotel&apos;s verified handbook. Never invents policies or unauthorized discounts.
                    </p>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                  <div className="bg-white p-3 rounded-xl border border-gray-200">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Response Speed</p>
                    <p className="text-lg font-black text-primary-navy mt-0.5 flex items-center gap-1">
                      <Zap className="w-4 h-4 text-accent-orange" />
                      {conciergeScenarios[activeScenarioIdx].latency}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-gray-200">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Grounding Score</p>
                    <p className="text-lg font-black text-emerald-700 mt-0.5 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {conciergeScenarios[activeScenarioIdx].confidence}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Chat Visual Window (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 bg-white flex flex-col justify-between">
                
                {/* Simulated Chat Messages */}
                <div className="space-y-4 mb-6">
                  
                  {/* Guest Message */}
                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-primary-navy text-white rounded-2xl rounded-tr-xs p-4 max-w-md shadow-xs text-xs sm:text-sm leading-relaxed">
                      <p>{conciergeScenarios[activeScenarioIdx].inquiry}</p>
                      <span className="text-[10px] text-slate-400 block text-right mt-1.5 font-mono">
                        {conciergeScenarios[activeScenarioIdx].time.split('·')[0].trim()} • Sent via Web
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-700 shrink-0">
                      {conciergeScenarios[activeScenarioIdx].guestName.charAt(0)}
                    </div>
                  </div>

                  {/* Concierge Response */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent-orange text-primary-navy flex items-center justify-center shrink-0 shadow-xs">
                      <Bot className="w-5 h-5" />
                    </div>
                    
                    <div className="bg-light-grey border border-gray-200 text-primary-navy rounded-2xl rounded-tl-xs p-4 max-w-lg shadow-xs text-xs sm:text-sm leading-relaxed">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200/60 text-[11px] font-bold text-gray-500">
                        <span className="flex items-center gap-1.5 text-primary-navy">
                          <Sparkles className="w-3.5 h-3.5 text-accent-orange" />
                          Hotel AI Concierge
                        </span>
                        <span className="text-emerald-700 font-mono text-[10px]">Instant · Grounded</span>
                      </div>

                      {isTypingSim ? (
                        <div className="flex items-center gap-1.5 py-3 px-2">
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]" />
                        </div>
                      ) : (
                        <p className="text-gray-800 leading-relaxed">
                          {conciergeScenarios[activeScenarioIdx].response}
                        </p>
                      )}
                    </div>
                  </div>

                </div>

                {/* 1-Tap WhatsApp Lead Hand-off Action */}
                <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-left">
                    <p className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                      Automatic WhatsApp Lead Pass-off
                    </p>
                    <p className="text-[11px] text-emerald-800 mt-0.5">
                      Guests can tap once to pass this entire conversation into the host&apos;s WhatsApp with zero retyping.
                    </p>
                  </div>
                  <a
                    href={`https://wa.me/6281383521750?text=${encodeURIComponent(conciergeScenarios[activeScenarioIdx].whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
                  >
                    <span>Test WhatsApp Link</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

              </div>

            </div>

          </div>

          {/* 4 Architectural Pillars for Hoteliers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-light-grey rounded-2xl p-6 border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-primary-navy mb-4 shadow-xs">
                  <Languages className="w-5 h-5 text-accent-orange" />
                </div>
                <h4 className="font-bold text-base text-primary-navy mb-2">20+ Native Languages</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  German, Italian, French, Polish, Dutch, and English. Answers in the exact polite, welcoming tone of a high-end European host without hiring night receptionists.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200 text-[11px] font-bold text-accent-orange">
                Zero translation delay
              </div>
            </div>

            <div className="bg-light-grey rounded-2xl p-6 border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-primary-navy mb-4 shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-accent-orange" />
                </div>
                <h4 className="font-bold text-base text-primary-navy mb-2">Zero Hallucinations</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Constrained exclusively to your verified property handbook, room specs, and house rules. If an answer isn&apos;t approved, it offers to connect the host on WhatsApp.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200 text-[11px] font-bold text-accent-orange">
                Strict RAG guardrails
              </div>
            </div>

            <div className="bg-light-grey rounded-2xl p-6 border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-primary-navy mb-4 shadow-xs">
                  <Sparkles className="w-5 h-5 text-accent-orange" />
                </div>
                <h4 className="font-bold text-base text-primary-navy mb-2">Direct Rate Defense</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  When guests ask about Booking.com rates, the AI politely highlights your direct booking perks (complimentary wine, breakfast on the terrace, or free cancellation).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200 text-[11px] font-bold text-accent-orange">
                Protects 15–20% margins
              </div>
            </div>

            <div className="bg-light-grey rounded-2xl p-6 border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-primary-navy mb-4 shadow-xs">
                  <Sliders className="w-5 h-5 text-accent-orange" />
                </div>
                <h4 className="font-bold text-base text-primary-navy mb-2">Zero Host Bottleneck</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  No complex software to learn. We train, deploy, and maintain the concierge for you. If you change a house rule or price, simply message us or update a shared sheet.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200 text-[11px] font-bold text-accent-orange">
                100% turnkey managed
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. THE ADRA ARCHITECTURE FRAMEWORK (Why WUUS Style)
          Matches the luxury sticky-card styling in `components/why-wuus.tsx`
      ────────────────────────────────────────────────────────────── */}
      <section id="framework" className="py-28 lg:py-36 bg-light-grey relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-orange">The Engineering Method</span>
            <h2 className="text-3xl md:text-5xl font-black text-primary-navy mt-2 mb-6 tracking-tight">
              The ADRA Hospitality Framework
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              We don&apos;t install generic multi-purpose templates. Every boutique stay website is designed around four non-negotiable principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {adraPillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={pillar.letter}
                  className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-[0_15px_40px_-15px_rgba(28,39,51,0.08)] flex flex-col justify-between hover:shadow-[0_25px_60px_-15px_rgba(28,39,51,0.15)] transition-all duration-300 relative group"
                >
                  {/* Subtle top reflection line */}
                  <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-primary-navy font-black text-2xl group-hover:bg-accent-orange group-hover:text-primary-navy transition-colors">
                        {pillar.letter}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-accent-orange bg-amber-50/80 px-3 py-1 rounded-full border border-amber-100">
                        {pillar.highlight}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-primary-navy mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                      {pillar.subtitle}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-8 mt-6 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-primary-navy">
                    <IconComponent className="w-4 h-4 text-accent-orange" />
                    <span>Included in every hospitality build</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Honest Comparison Table */}
          <div className="mt-20 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-6 md:p-8 bg-primary-navy text-white">
              <h3 className="text-xl md:text-2xl font-bold">Standard Agency Template vs. WUUS Studio Build</h3>
              <p className="text-xs text-slate-300 mt-1">Why boutique hotel owners choose our focused approach over bloated software</p>
            </div>
            <div className="divide-y divide-gray-100">
              {comparisonPoints.map((pt, idx) => (
                <div key={idx} className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="font-bold text-sm text-primary-navy">{pt.feature}</div>
                  <div className="text-xs text-gray-500 md:pr-4 flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>{pt.generic}</span>
                  </div>
                  <div className="text-xs font-semibold text-emerald-800 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>{pt.wuus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. HOW WE WORK (Async-First Human Studio Process)
      ────────────────────────────────────────────────────────────── */}
      <section id="workflow" className="py-28 lg:py-36 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-orange">Calm Collaboration</span>
            <h2 className="text-3xl md:text-5xl font-black text-primary-navy mt-2 mb-6 tracking-tight">
              Async-First. Zero Timezone Friction.
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              We collaborate with boutique hotels across Albania, Bosnia, North Macedonia, and the wider Adriatic. We respect your busy hotel operations: no recurring 90-minute meetings, no endless email threads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {/* Step 1 */}
            <div className="bg-light-grey rounded-3xl p-6 border border-gray-200 flex flex-col justify-between">
              <div>
                <span className="font-serif italic text-accent-orange text-3xl font-light">Stage 01</span>
                <h3 className="text-lg font-bold text-primary-navy mt-2 mb-2">Observation & Audit</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We walk through your existing website as an international guest on mobile. We prepare a short 1-page visual report highlighting 3 high-impact friction points.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-[11px] font-bold text-gray-500">
                Cost: Free & No Pitch
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-light-grey rounded-3xl p-6 border border-gray-200 flex flex-col justify-between">
              <div>
                <span className="font-serif italic text-accent-orange text-3xl font-light">Stage 02</span>
                <h3 className="text-lg font-bold text-primary-navy mt-2 mb-2">Fixed-Scope Proposal</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  If the audit resonates, we provide a transparent 1-page proposal outlining the exact scope, deliverable mockups, timeline, and flat-rate fee. No hidden extras.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-[11px] font-bold text-gray-500">
                Timeline: 24 Hours
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-light-grey rounded-3xl p-6 border border-gray-200 flex flex-col justify-between">
              <div>
                <span className="font-serif italic text-accent-orange text-3xl font-light">Stage 03</span>
                <h3 className="text-lg font-bold text-primary-navy mt-2 mb-2">Rapid Crafting</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We build your bespoke Next.js site in 7 to 14 days. You receive interactive staging links and brief Loom video walkthroughs to review at your convenience.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-[11px] font-bold text-gray-500">
                Duration: 7–14 Days
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-light-grey rounded-3xl p-6 border border-gray-200 flex flex-col justify-between">
              <div>
                <span className="font-serif italic text-accent-orange text-3xl font-light">Stage 04</span>
                <h3 className="text-lg font-bold text-primary-navy mt-2 mb-2">Turnkey Launch</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We connect your custom domain, set up analytics, verify mobile loading, and deliver full code ownership to your team. Zero vendor lock-in.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-[11px] font-bold text-gray-500">
                Result: 100% Code Ownership
              </div>
            </div>

          </div>

          {/* Transparent Investment Tiers */}
          <div id="pricing" className="mt-20 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-orange">Transparent Studio Investment</span>
              <h3 className="text-2xl md:text-4xl font-black text-primary-navy mt-1 mb-3">
                Two Clear Ways to Partner With WUUS
              </h3>
              <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
                Flat-rate, turnkey engagements for independent boutique hotels. No hourly billing, no surprise extra fees, and full source code ownership.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              
              {/* Tier 1: Boutique Direct Showcase */}
              <div className="bg-white rounded-3xl p-8 md:p-10 border-2 border-primary-navy shadow-[6px_6px_0px_0px_#1C2733] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      Tier 01 · Flagship Website
                    </span>
                  </div>
                  <h4 className="text-2xl font-black text-primary-navy mb-2">Boutique Direct Showcase</h4>
                  <p className="text-xs text-gray-600 leading-relaxed mb-6">
                    A custom, sub-second digital flagship designed to celebrate your property&apos;s architectural soul and eliminate booking engine lag.
                  </p>

                  <div className="mb-8 pb-6 border-b border-gray-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-primary-navy">€690</span>
                      <span className="text-xs text-gray-500 font-semibold uppercase">One-time flat fee</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">Delivery in 7–10 days • 100% code ownership</p>
                  </div>

                  <ul className="space-y-3.5 text-xs text-gray-700 mb-8">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                      <span><strong>Bespoke Next.js Architecture</strong> (No generic WordPress templates)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                      <span><strong>Sub-800ms Mobile Performance</strong> (95+ Google Lighthouse)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                      <span><strong>Visual Room Discovery</strong> with transparent direct inquiry cards</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                      <span><strong>Frictionless WhatsApp & Email Booking Flow</strong> (0% commissions)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                      <span><strong>Zero Vendor Lock-in</strong>: Full GitHub repository & domain delivery</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                      <span><strong>Free High-Speed Global Hosting</strong> setup on Vercel / Cloudflare</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, packageInterest: 'Tier 1: Boutique Direct Showcase (€690)' }));
                    setModalOpen(true);
                  }}
                  className="w-full py-3.5 bg-white hover:bg-gray-50 text-primary-navy font-bold text-xs uppercase tracking-wide rounded-xl border-2 border-primary-navy shadow-[3px_3px_0px_0px_#1C2733] transition-all cursor-pointer text-center"
                >
                  Inquire for Tier 1 (€690)
                </button>
              </div>

              {/* Tier 2: The Complete AI Hospitality Engine (Featured) */}
              <div className="bg-amber-50/60 rounded-3xl p-8 md:p-10 border-2 border-primary-navy shadow-[8px_8px_0px_0px_#1C2733] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-accent-orange text-primary-navy text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-xl border-l-2 border-b-2 border-primary-navy">
                  Most Popular · Highest Direct ROI
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4 mt-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-accent-orange bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200">
                      Tier 02 · Full Digital Suite
                    </span>
                  </div>
                  <h4 className="text-2xl font-black text-primary-navy mb-2">The AI Hospitality Engine</h4>
                  <p className="text-xs text-gray-600 leading-relaxed mb-6">
                    Everything in Tier 1 plus our 24/7 Multilingual AI Concierge to capture midnight inquiries from European guests without adding staff.
                  </p>

                  <div className="mb-8 pb-6 border-b border-amber-200/80">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-primary-navy">€1,290</span>
                      <span className="text-xs text-gray-500 font-semibold uppercase">One-time flat fee</span>
                    </div>
                    <p className="text-[11px] text-emerald-800 font-medium mt-1">Includes 6 Months AI Concierge Hosting & Model Tuning</p>
                  </div>

                  <ul className="space-y-3.5 text-xs text-gray-800 mb-8">
                    <li className="flex items-start gap-2.5 font-semibold text-primary-navy">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                      <span><strong>Everything included in Tier 1</strong> (Next.js flagship website)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                      <span><strong>24/7 Multilingual AI Guest Concierge</strong> embedded on your site</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                      <span><strong>20+ European Languages</strong> (German, Italian, French, Polish, Dutch)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                      <span><strong>Grounded strictly in your Property Handbook</strong> (Zero Hallucination)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                      <span><strong>1-Tap Pre-filled WhatsApp Booking Lead Hand-off</strong></span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                      <span><strong>6 Months Turnkey Concierge Cloud Hosting</strong> (Optional €29/mo thereafter)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <button
                    onClick={() => {
                      setFormData(prev => ({ ...prev, packageInterest: 'Tier 2: The Complete AI Hospitality Engine (€1,290)' }));
                      setModalOpen(true);
                    }}
                    className="w-full py-4 bg-accent-orange hover:bg-accent-yellow text-primary-navy font-black text-xs uppercase tracking-wide rounded-xl border-2 border-primary-navy shadow-[4px_4px_0px_0px_#1C2733] transition-all cursor-pointer text-center"
                  >
                    Select AI Hospitality Engine (€1,290)
                  </button>
                  <p className="text-[10px] text-gray-500 text-center mt-2">
                    Equivalent to approx. 4–5 nights of direct bookings (less than 1 month of OTA commissions).
                  </p>
                </div>
              </div>

            </div>

            {/* Staging-First Quality Guarantee Callout */}
            <div className="mt-8 bg-amber-50/80 rounded-2xl p-5 border border-amber-200/80 flex items-center gap-4 text-left">
              <div className="w-10 h-10 rounded-xl bg-accent-orange text-primary-navy flex items-center justify-center font-bold shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-xs text-primary-navy uppercase tracking-wider">
                  Staging-First Quality Guarantee · Zero Financial Risk
                </p>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  We build your interactive Next.js site and test the live AI Concierge on a private staging link first. You review and verify the real mobile experience on your own phone before making the final balance payment.
                </p>
              </div>
            </div>

            {/* Zero-Risk Evaluation Callout */}
            <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
              <div>
                <p className="font-bold text-sm text-primary-navy">Prefer to see your property&apos;s mobile friction points first?</p>
                <p className="text-xs text-gray-500 mt-0.5">We provide a free 1-page visual assessment with zero commitment or sales pressure.</p>
              </div>
              <button
                onClick={() => {
                  setFormData(prev => ({ ...prev, packageInterest: 'Free 1-Page Website Review' }));
                  setModalOpen(true);
                }}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-primary-navy font-bold text-xs rounded-xl border border-gray-300 transition-colors shrink-0 cursor-pointer"
              >
                Request Free 1-Page Review
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. FAQ SECTION (Matches Indonesian FAQ design)
      ────────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-24 lg:py-32 bg-light-grey">
        <div className="container mx-auto px-6 max-w-4xl">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-orange">Answers for Hoteliers</span>
            <h2 className="text-3xl md:text-4xl font-black text-primary-navy mt-2 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What exactly is in the free 1-page website review?",
                a: "Our lead designer manually inspects your property's website on modern smartphones. We highlight 3 specific friction points in your guest journey (e.g. mobile photo sizing, rate visibility, inquiry flow) and mock up a suggested visual improvement. It is 100% human-crafted with no automated bot scoring and no sales follow-up pressure."
              },
              {
                q: "Will the AI Concierge make mistakes, invent discounts, or promise unavailable rooms?",
                a: "No. Unlike generic AI chatbots (such as ChatGPT), our concierge uses a strictly grounded RAG architecture constrained exclusively to your verified property handbook, approved room rates, and house rules. If a guest asks something outside your verified documentation (for example, a custom wedding discount or an unverified pet breed), it gracefully informs the guest and passes their contact details directly to your WhatsApp."
              },
              {
                q: "Does our staff have to manage complicated AI software or servers?",
                a: "Zero. We handle 100% of the technical setup, prompt engineering, and cloud hosting. If you ever update your house rules, breakfast hours, or seasonal tasting menus, simply send a quick note to our studio or edit a simple Google Sheet, and the concierge updates automatically."
              },
              {
                q: "Do we have to abandon our existing booking engine (e.g. Cloudbeds, Phobs, Sirvoy)?",
                a: "No. You keep your existing channel manager or booking engine. We simply build a calm, high-performance exterior and direct inquiry bridge so guests can comfortably explore your rooms and choose whether to book directly or seamlessly enter your engine."
              },
              {
                q: "How can we collaborate smoothly between the Balkans and Indonesia?",
                a: "Our studio operates async-first. We use structured Figma preview boards, short Loom video walk-throughs, and prompt WhatsApp/Email communication. Our time zone overlap allows us to work during your evening and deliver fresh updates by your morning. We do not require long meetings."
              },
              {
                q: "Can our staff update seasonal rates and photos without coding?",
                a: "Yes. We integrate lightweight, intuitive content management (or structured markdown configs) so your front desk or manager can update photos, announcements, and seasonal packages in under 2 minutes."
              },
              {
                q: "Who owns the website and code after launch?",
                a: "You do. 100%. We provide complete access to the GitHub repository, hosting accounts, and digital assets. There is zero proprietary agency lock-in."
              }
            ].map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left font-bold text-base md:text-lg text-primary-navy flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-accent-orange" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-6 pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4"
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
          9. FREE 1-PAGE REVIEW REQUEST SECTION (Form with Human Guarantee)
      ────────────────────────────────────────────────────────────── */}
      <section id="review-request" className="py-24 lg:py-32 bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 max-w-3xl">
          
          <div className="bg-light-grey rounded-3xl p-8 md:p-12 border-2 border-primary-navy shadow-[8px_8px_0px_0px_#1C2733]">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-orange">Free Honest Assessment</span>
              <h2 className="text-3xl font-black text-primary-navy mt-1 mb-3">
                Request a Free 1-Page Website Review
              </h2>
              <p className="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
                Send us your hotel link. Within 48 hours, a senior designer will manually inspect your mobile flow and return 3 actionable observations.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="text-xl font-bold text-emerald-950 mb-2">Review Request Received!</h3>
                <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto mb-6">
                  Thank you! Our lead designer is reviewing <strong>{formData.hotelName || "your hotel website"}</strong>. We will email your personalized 1-page review to <strong>{formData.email}</strong> within 48 hours.
                </p>

                <div className="pt-4 border-t border-emerald-200/60 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={`https://wa.me/6281383521750?text=${encodeURIComponent(`Hi Faisal, I just requested a 1-page website review for ${formData.hotelName || "our hotel"} (${formData.websiteUrl}). My email is ${formData.email}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                  >
                    <span>Fast-Track on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`mailto:faisalalfarizi@webuntukusaha.com?subject=Website%20Review%20Request%3A%20${encodeURIComponent(formData.hotelName || "Hotel")}&body=Hi%20Faisal%2C%0A%0AWe%20just%20requested%20a%201-page%20review%20for%20${encodeURIComponent(formData.hotelName)}%20(${encodeURIComponent(formData.websiteUrl)}).%0A%0AContact%3A%20${encodeURIComponent(formData.contactName)}%20(${encodeURIComponent(formData.email)})%0ANotes%3A%20${encodeURIComponent(formData.notes)}`}
                    className="text-xs font-semibold text-emerald-800 underline hover:text-emerald-950"
                  >
                    Send Direct Email Copy
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy mb-2">
                      Hotel or Villa Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muslibegovic House"
                      value={formData.hotelName}
                      onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-sm text-primary-navy focus:outline-hidden focus:border-accent-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy mb-2">
                      Current Website URL *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. hotel-example.com"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-sm text-primary-navy focus:outline-hidden focus:border-accent-orange"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy mb-2">
                      Your Name / Role *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena (Owner / General Manager)"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-sm text-primary-navy focus:outline-hidden focus:border-accent-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy mb-2">
                      Email for Review Delivery *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="info@hotel-example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-sm text-primary-navy focus:outline-hidden focus:border-accent-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy mb-2">
                    Package or Request Type *
                  </label>
                  <select
                    value={formData.packageInterest}
                    onChange={(e) => setFormData({ ...formData, packageInterest: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-sm text-primary-navy focus:outline-hidden focus:border-accent-orange"
                  >
                    <option value="Tier 2: The Complete AI Hospitality Engine (€1,290)">
                      Tier 2: The Complete AI Hospitality Engine (€1,290) — Most Popular
                    </option>
                    <option value="Tier 1: Boutique Direct Showcase (€690)">
                      Tier 1: Boutique Direct Showcase (€690)
                    </option>
                    <option value="Free 1-Page Website Review">
                      Free 1-Page Website Review (No Obligation)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy mb-2">
                    Any specific friction or questions? (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. We get many international visitors but most book through Booking.com instead of our direct site."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-sm text-primary-navy focus:outline-hidden focus:border-accent-orange resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? (
                    <span>Preparing Request...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry ({formData.packageInterest.split('(')[0].trim()})</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-gray-500 mt-3">
                  100% human evaluation. No bots, no spam, no sales calls. Your information is kept strictly confidential.
                </p>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. FOOTER (Exact structure & assets as Indonesian Footer)
      ────────────────────────────────────────────────────────────── */}
      <footer className="bg-light-grey border-t border-gray-200 pt-20 pb-12">
        <div className="w-full mx-auto px-6 md:px-[max(60px,5vw)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* Brand & Studio Location */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center mb-6">
                <Image
                  src="/logo.png"
                  alt="WUUS Logo"
                  width={142}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <p className="text-gray-500 mb-8 max-w-md leading-relaxed text-sm">
                WUUS is an independent digital design studio partnering with forward-thinking boutique stays and ambitious businesses worldwide. We craft digital spaces with measurable technical and aesthetic standards.
              </p>

              {/* Office Google Maps Embed (Matches Indonesian site) */}
              <div className="rounded-[2rem] overflow-hidden shadow-xl border-4 border-white h-48 max-w-md group transition-all duration-500">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.533838466155!2d106.7541558118344!3d-6.193067260650871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f710ddd28e99%3A0x4fda30c569b2e71d!2sApartmen%20Puri%20Parkview!5e0!3m2!1sid!2sid!4v1775916857687!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-[1.02]"
                  title="WUUS Digital Studio Office Location"
                />
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="font-bold text-primary-navy text-base mb-6 uppercase tracking-wider text-xs">
                Hospitality Practice
              </h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#philosophy" className="text-gray-500 hover:text-accent-orange transition-colors">The Guest Journey</a></li>
                <li><a href="#portfolio" className="text-gray-500 hover:text-accent-orange transition-colors">Selected Concepts</a></li>
                <li><a href="#framework" className="text-gray-500 hover:text-accent-orange transition-colors">ADRA Framework</a></li>
                <li><a href="#workflow" className="text-gray-500 hover:text-accent-orange transition-colors">Async Process</a></li>
                <li><a href="#faq" className="text-gray-500 hover:text-accent-orange transition-colors">Hotelier FAQ</a></li>
              </ul>
            </div>

            {/* Direct Studio Contact */}
            <div>
              <h3 className="font-bold text-primary-navy text-base mb-6 uppercase tracking-wider text-xs">
                Studio Direct
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3 text-gray-500">
                  <MapPin size={18} className="text-accent-orange mt-0.5 shrink-0" />
                  <span><strong>WUUS Digital Studio</strong> <br /> Jakarta Barat, DKI Jakarta <br /> 11620, Indonesia</span>
                </li>
                <li className="flex items-center gap-3 text-gray-500">
                  <PhoneCall size={18} className="text-accent-orange shrink-0" />
                  <a
                    href="https://wa.me/6281383521750?text=Hi%20Faisal%2C%20I'm%20reaching%20out%20from%20a%20boutique%20hotel%20regarding%20a%20website%20review."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent-orange transition-colors font-medium"
                  >
                    +62 813-8352-1750 (WhatsApp Direct)
                  </a>
                </li>
                <li className="flex items-center gap-3 text-gray-500">
                  <Mail size={18} className="text-accent-orange shrink-0" />
                  <a
                    href="mailto:faisalalfarizi@webuntukusaha.com?subject=Inquiry%20from%20Boutique%20Hotelier"
                    className="hover:text-accent-orange transition-colors font-medium"
                  >
                    faisalalfarizi@webuntukusaha.com
                  </a>
                </li>
              </ul>

              <div className="mt-8 pt-4 border-t border-gray-200">
                <Link 
                  href="/" 
                  className="text-xs font-semibold text-primary-navy hover:text-accent-orange flex items-center gap-2"
                >
                  <span>🇮🇩</span> Menuju Halaman Utama Indonesia →
                </Link>
              </div>
            </div>

          </div>

          {/* Copyright & Sub-footer */}
          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
            <p>© {new Date().getFullYear()} WUUS Digital Studio. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/kebijakan-privasi" className="hover:text-primary-navy transition-colors">Privacy Policy</Link>
              <Link href="/syarat-ketentuan" className="hover:text-primary-navy transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          11. REVIEW MODAL POPUP (Triggered by CTAs across the page)
      ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-primary-navy/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-primary-navy z-10 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent-orange">
                    {formData.packageInterest.includes('Tier') ? 'Direct Studio Inquiry' : 'Human Audit'}
                  </span>
                  <h3 className="text-xl font-bold text-primary-navy">
                    {formData.packageInterest.includes('Tier') ? formData.packageInterest.split('(')[0].trim() : 'Free 1-Page Website Review'}
                  </h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
                  aria-label="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {formSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-950 mb-1">Inquiry Received!</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed mb-4">
                    Thank you! We will review <strong>{formData.hotelName || "your hotel website"}</strong> and respond to <strong>{formData.email}</strong> within 48 hours. Zero spam or cold calling guaranteed.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 border-t border-emerald-200/60">
                    <a
                      href={`https://wa.me/6281383521750?text=${encodeURIComponent(`Hi Faisal, I just submitted an inquiry for ${formData.packageInterest} for ${formData.hotelName || "our hotel"} (${formData.websiteUrl}). My email is ${formData.email}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
                    >
                      <span>Fast-Track on WhatsApp</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-primary-navy mb-1.5">
                      Hotel / Villa Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. City Boutique Hotel"
                      value={formData.hotelName}
                      onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-primary-navy focus:outline-hidden focus:border-accent-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-primary-navy mb-1.5">
                      Website URL *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. cityboutiquehotel.ba"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-primary-navy focus:outline-hidden focus:border-accent-orange"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-primary-navy mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Faruk / Host"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-primary-navy focus:outline-hidden focus:border-accent-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-primary-navy mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="info@hotel.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-primary-navy focus:outline-hidden focus:border-accent-orange"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-primary-navy mb-1.5">
                      Package or Request Type *
                    </label>
                    <select
                      value={formData.packageInterest}
                      onChange={(e) => setFormData({ ...formData, packageInterest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-primary-navy focus:outline-hidden focus:border-accent-orange bg-white"
                    >
                      <option value="Tier 2: The Complete AI Hospitality Engine (€1,290)">
                        Tier 2: The Complete AI Hospitality Engine (€1,290)
                      </option>
                      <option value="Tier 1: Boutique Direct Showcase (€690)">
                        Tier 1: Boutique Direct Showcase (€690)
                      </option>
                      <option value="Free 1-Page Website Review">
                        Free 1-Page Website Review (No Obligation)
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer mt-3"
                  >
                    {isSubmitting ? "Submitting..." : `Submit Request (${formData.packageInterest.split('(')[0].trim()})`}
                  </button>
                  <p className="text-center text-[10px] text-gray-500">
                    Handcrafted evaluation by a human designer. Zero spam.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
