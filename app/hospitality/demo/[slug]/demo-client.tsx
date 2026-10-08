'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  MapPin, 
  PhoneCall, 
  X, 
  Send, 
  ShieldCheck, 
  MessageSquare, 
  Printer, 
  Calendar, 
  Sparkles, 
  ChevronDown, 
  ArrowUpRight,
  Wifi,
  Coffee,
  Wind,
  Maximize2
} from 'lucide-react';
import { PropertyData, Room, RatePlan } from './demo-data';

export function DemoPropertyClient({ property, slug }: { property: PropertyData; slug: string }) {
  // Language state
  const [lang, setLang] = useState<'EN' | 'DE' | 'IT'>('EN');

  // Search Bar / Availability Engine State
  const [checkIn, setCheckIn] = useState('2026-10-12');
  const [checkOut, setCheckOut] = useState('2026-10-15');
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [roomsCount, setRoomsCount] = useState(1);
  const [guestPickerOpen, setGuestPickerOpen] = useState(false);

  // Dynamic Night Calculation
  const calculateNights = () => {
    try {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 3;
    }
  };
  const nights = calculateNights();

  // Active gallery view for room cards
  const [activePhoto, setActivePhoto] = useState<Record<string, string>>({
    [property.rooms[0]?.id || '']: property.rooms[0]?.gallery[0] || property.rooms[0]?.image || '',
    [property.rooms[1]?.id || '']: property.rooms[1]?.gallery[0] || property.rooms[1]?.image || ''
  });

  // Filter state for rooms
  const [roomFilter, setRoomFilter] = useState<'all' | 'breakfast' | 'view'>('all');

  // Booking Checkout Flow State
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [selectedRoom, setSelectedRoom] = useState<Room>(property.rooms[0]);
  const [selectedRatePlan, setSelectedRatePlan] = useState<RatePlan>(
    property.rooms[0]?.ratePlans?.find(p => p.recommended) || property.rooms[0]?.ratePlans?.[0]
  );

  // Guest details form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+49');
  const [country, setCountry] = useState('Germany');
  const [arrivalTime, setArrivalTime] = useState('14:00 - 16:00');
  const [specialRequests, setSpecialRequests] = useState<string[]>([
    'Quiet room with best view'
  ]);
  const [bookingRef, setBookingRef] = useState('WUUS-HM-84920');

  // Digital Concierge chat state
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'host' | 'user'; text: string }>>([
    { 
      sender: 'host', 
      text: `Hello and welcome to ${property.name}. How can we assist you with parking, arrival times, breakfast, or booking direct today?` 
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');

  // Handle Room Selection & Trigger Checkout
  const handleOpenCheckout = (room: Room, plan?: RatePlan) => {
    setSelectedRoom(room);
    setSelectedRatePlan(plan || room.ratePlans?.find(p => p.recommended) || room.ratePlans[0]);
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const prefix = slug === 'seaside-guesthouse' ? 'VR' : slug === 'lakeside-wine-estate' ? 'SO' : 'BH';
    setBookingRef(`WUUS-${prefix}-${randomNum}`);
    setCheckoutStep(1);
    setCheckoutOpen(true);
  };

  // Price calculations
  const calculateTotal = (rate: number) => rate * nights;
  const calculateOtaTotal = (otaRate: number) => otaRate * nights;
  const savings = calculateOtaTotal(selectedRatePlan.otaRate) - calculateTotal(selectedRatePlan.rate);

  // WhatsApp formatted booking trigger
  const handleSendWhatsAppBooking = () => {
    const text = `*DIRECT RESERVATION INQUIRY*\n*Property:* ${property.name}\n*Reference:* ${bookingRef}\n*Guest:* ${firstName} ${lastName}\n*Email:* ${email || 'guest@direct.com'}\n*Phone:* ${countryCode} ${phone || 'Not provided'}\n*Country:* ${country}\n\n*STAY DETAILS:*\n• Room: ${selectedRoom.name}\n• Plan: ${selectedRatePlan.name}\n• Dates: ${checkIn} to ${checkOut} (${nights} nights)\n• Guests: ${adults} Adults${childrenCount > 0 ? `, ${childrenCount} Children` : ''}\n• Est. Arrival: ${arrivalTime}\n\n*RATE (0% OTA COMMISSION):*\n• €${selectedRatePlan.rate} × ${nights} nights = €${calculateTotal(selectedRatePlan.rate)}\n• Direct Savings: €${savings} vs OTA\n• Total to pay upon arrival: €${calculateTotal(selectedRatePlan.rate)}\n\n*INCLUDED:*\n${selectedRatePlan.perks.map(p => `- ${p}`).join('\n')}\n\n*Special Notes:* ${specialRequests.join(', ')}\n\nPlease confirm availability for these dates. Thank you!`;
    window.open(`https://wa.me/6281383521750?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Handle Concierge Question
  const handleAskConcierge = (qText: string) => {
    if (!qText.trim()) return;
    const userMsg = qText;
    setInputQuestion('');
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);

    setTimeout(() => {
      let reply = "Thank you for asking. Our team is also reachable directly on WhatsApp for any custom requests.";
      const lower = userMsg.toLowerCase();
      const qa = property.conciergeQA;

      if (lower.includes('park') || lower.includes('car')) reply = qa['parking'] || reply;
      else if (lower.includes('check') || lower.includes('late') || lower.includes('time') || lower.includes('arrive')) reply = qa['checkin'] || reply;
      else if (lower.includes('break') || lower.includes('food') || lower.includes('eat')) reply = qa['breakfast'] || reply;
      else if (lower.includes('perk') || lower.includes('direct') || lower.includes('rate') || lower.includes('price')) reply = qa['directPerks'] || reply;
      else if (lower.includes('beach') || lower.includes('sea')) reply = qa['beach'] || qa['directPerks'] || reply;
      else if (lower.includes('taste') || lower.includes('wine') || lower.includes('cellar')) reply = qa['tasting'] || qa['directPerks'] || reply;
      else if (lower.includes('wifi') || lower.includes('internet') || lower.includes('work')) reply = qa['wifi'] || reply;

      setChatMessages(prev => [...prev, { sender: 'host', text: reply }]);
    }, 300);
  };

  // Filtered rooms
  const filteredRooms = property.rooms.filter(room => {
    if (roomFilter === 'breakfast') return room.ratePlans.some(p => p.breakfastIncluded);
    if (roomFilter === 'view') return room.view.toLowerCase().includes('sea') || room.view.toLowerCase().includes('lake') || room.view.toLowerCase().includes('view');
    return true;
  });

  return (
    <div className="min-h-screen text-[#1C2733] font-sans antialiased selection:bg-[#F59E0B]/20 selection:text-[#1C2733]">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP DEMO INSPECTOR BAR (WUUS STUDIO EVALUATION)
      ────────────────────────────────────────────────────────────── */}
      <div className="bg-[#1C2733] text-white px-4 sm:px-6 py-2.5 sticky top-0 z-50 border-b border-[#233746] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-bold tracking-wider uppercase text-[11px] text-[#F59E0B]">
            WUUS Concept Demo
          </span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          
          {/* Concept Switcher Tabs */}
          <div className="flex items-center gap-1 text-xs">
            <Link
              href="/hospitality/demo/seaside-guesthouse"
              className={`px-3 py-1 rounded transition-colors ${
                slug === 'seaside-guesthouse'
                  ? 'bg-white/20 text-white font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Albanian Riviera
            </Link>
            <Link
              href="/hospitality/demo/lakeside-wine-estate"
              className={`px-3 py-1 rounded transition-colors ${
                slug === 'lakeside-wine-estate'
                  ? 'bg-white/20 text-white font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Lake Ohrid (Savoria)
            </Link>
            <Link
              href="/hospitality/demo/city-apartments"
              className={`px-3 py-1 rounded transition-colors ${
                slug === 'city-apartments'
                  ? 'bg-white/20 text-white font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Sarajevo
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/hospitality#review"
            className="text-slate-200 hover:text-white font-medium transition-colors"
          >
            Ask WUUS about a website →
          </Link>
          <Link
            href="/hospitality#examples"
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            Exit demo
          </Link>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. BESPOKE CONCEPT RENDERINGS
      ────────────────────────────────────────────────────────────── */}

      {/* ═════════════════════════════════════════════════════════════
          CONCEPT 02: SAVORIA ESTATE & VINEYARDS (MATCHES MOCKUP 1:1)
      ══════════════════════════════════════════════════════════════ */}
      {slug === 'lakeside-wine-estate' && (
        <div className="bg-[#FAF7F2] text-stone-900 min-h-screen">
          
          {/* Panoramic Vineyard Hero matching boutique hotel aesthetic */}
          <header className="relative w-full h-[260px] sm:h-[300px] md:h-[340px] overflow-hidden">
            <Image
              src="/images/hospitality/savoria-hero-banner.jpg"
              alt="Savoria Estate & Vineyards overlooking blue water"
              fill
              priority
              className="object-cover object-center"
            />
            <h1 className="sr-only">
              SAVORIA ESTATE & VINEYARDS
            </h1>
          </header>

          {/* Terracotta Navigation Bar (#A85A44) matching MacBook screen */}
          <nav className="w-full bg-[#A85A44] text-white py-3 px-4 sm:px-8 shadow-sm sticky top-10 z-40 border-b border-[#964E3A]">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="hidden md:flex items-center gap-10 text-[11px] sm:text-xs font-serif tracking-[0.25em] uppercase mx-auto">
                <a href="#stays" className="text-white hover:text-white/80 transition-colors border-b border-white pb-0.5 font-semibold">HOME</a>
                <a href="#vineyards" className="text-white/90 hover:text-white transition-colors">VINEYARDS</a>
                <a href="#stays" className="text-white/90 hover:text-white transition-colors">ROOMS</a>
                <a href="#experiences" className="text-white/90 hover:text-white transition-colors">EXPERIENCES</a>
                <a href="#contact" className="text-white/90 hover:text-white transition-colors">CONTACT</a>
              </div>
              <div className="flex md:hidden items-center justify-center gap-5 text-[10px] tracking-[0.2em] uppercase font-serif w-full">
                <a href="#stays" className="text-white border-b border-white pb-0.5">HOME</a>
                <a href="#stays" className="text-white/90">ROOMS</a>
                <a href="#experiences" className="text-white/90">EXPERIENCES</a>
                <a href="#contact" className="text-white/90">CONTACT</a>
              </div>
            </div>
          </nav>

          <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
            
            {/* ── EXCEPTIONAL STAYS SECTION ── */}
            <section id="stays" className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-serif uppercase tracking-[0.25em] text-stone-900 font-normal">
                  EXCEPTIONAL STAYS
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 font-serif italic">
                  Heritage suites surrounded by centuries of winemaking tradition on Lake Ohrid
                </p>
              </div>

              {/* CARD 1: THE OLIVE SUITE (Exact 3-Part Layout from Laptop Screen) */}
              <div className="bg-white rounded-2xl border border-stone-200/90 shadow-md shadow-stone-900/5 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  
                  {/* Left: Bedroom Photo with exposed wood beams & terracotta floor */}
                  <div className="lg:col-span-4 relative min-h-[300px] sm:min-h-[360px] lg:min-h-full">
                    <Image
                      src="/images/hospitality/savoria-olive-bedroom.jpg"
                      alt="The Olive Suite Rustic Luxury Bedroom"
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-stone-900/80 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-medium">
                      Exposed Timber Beams
                    </span>
                  </div>

                  {/* Center: Information, Pricing & Green Host Reservation Button */}
                  <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#F8F5EE] border-y lg:border-y-0 lg:border-x border-stone-200">
                    <div>
                      <span className="text-xs font-serif text-stone-500 italic block mb-1">
                        Luxury Suite
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif uppercase tracking-wide text-stone-900 font-normal">
                        THE OLIVE SUITE
                      </h3>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-base sm:text-lg font-serif font-bold text-stone-800">
                          Rates from €110/night
                        </span>
                        <span className="text-[11px] text-stone-500">
                          (Direct Host Rate · 0% OTA Fee)
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed mt-2.5">
                        Exposed chestnut timber beams, handcrafted limestone walls, and private double French doors opening directly to the sunlit vineyard terrace.
                      </p>

                      {/* Direct Perks */}
                      <div className="mt-4 pt-4 border-t border-stone-200 space-y-1.5 text-xs text-stone-700">
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>Daily organic vineyard breakfast included</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>Welcome bottle of estate Reserve Vranec</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>Direct reservation with winemakers Stefan & Maria</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => handleOpenCheckout(property.rooms[0])}
                        className="w-full py-3.5 px-6 bg-[#2D5A43] hover:bg-[#234E38] text-white font-medium text-xs sm:text-sm rounded-lg transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Reserve Direct with Host</span>
                        <span className="text-white/70 text-xs">→</span>
                      </button>
                      <p className="text-[11px] text-center text-stone-400 mt-2">
                        Instant WhatsApp inquiry · Free cancellation up to 48h
                      </p>
                    </div>
                  </div>

                  {/* Right: French Balcony Doors Opening to Sunny Terraced Vineyard */}
                  <div className="lg:col-span-3 relative min-h-[260px] sm:min-h-[320px] lg:min-h-full">
                    <Image
                      src="/images/hospitality/savoria-olive-view.jpg"
                      alt="The Olive Suite French Doors to Vineyard Terrace"
                      fill
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      className="object-cover"
                    />
                    <span className="absolute bottom-3 right-3 bg-stone-900/80 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-medium">
                      French Balcony View
                    </span>
                  </div>

                </div>
              </div>

              {/* CARD 2: THE CELLAR MASTER LOFT */}
              <div className="bg-white rounded-2xl border border-stone-200/90 shadow-md shadow-stone-900/5 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  
                  {/* Left: Copper Tub & Loft Photo */}
                  <div className="lg:col-span-4 relative min-h-[300px] sm:min-h-[360px] lg:min-h-full">
                    <Image
                      src="/images/hospitality/palazzo-suites.jpg"
                      alt="The Cellar Master Loft Freestanding Copper Tub"
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-stone-900/80 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-medium">
                      Copper Tub & Vaults
                    </span>
                  </div>

                  {/* Center: Info & Action */}
                  <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#F8F5EE] border-y lg:border-y-0 lg:border-x border-stone-200">
                    <div>
                      <span className="text-xs font-serif text-stone-500 italic block mb-1">
                        Loft Suite
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif uppercase tracking-wide text-stone-900 font-normal">
                        THE CELLAR MASTER LOFT
                      </h3>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-base sm:text-lg font-serif font-bold text-stone-800">
                          Rates from €135/night
                        </span>
                        <span className="text-[11px] text-stone-500">
                          (Direct Host Rate · 0% OTA Fee)
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed mt-2.5">
                        Located in the historic 1894 east wing above the aging vaults. Features a freestanding copper soaking tub, wrought-iron accents, and private sommelier wine tasting.
                      </p>

                      <div className="mt-4 pt-4 border-t border-stone-200 space-y-1.5 text-xs text-stone-700">
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>Private barrel tasting in ancient underground vault</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>Daily gourmet vineyard breakfast included</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>Freestanding copper tub with estate herb salts</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => handleOpenCheckout(property.rooms[1] || property.rooms[0])}
                        className="w-full py-3.5 px-6 bg-[#2D5A43] hover:bg-[#234E38] text-white font-medium text-xs sm:text-sm rounded-lg transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Reserve Direct with Host</span>
                        <span className="text-white/70 text-xs">→</span>
                      </button>
                      <p className="text-[11px] text-center text-stone-400 mt-2">
                        Direct reservation · No OTA middleman fees
                      </p>
                    </div>
                  </div>

                  {/* Right: Estate Grounds */}
                  <div className="lg:col-span-3 relative min-h-[260px] sm:min-h-[320px] lg:min-h-full">
                    <Image
                      src="/images/hospitality/savoria-wine-estate.jpg"
                      alt="Historic Winery Grounds and Terraces"
                      fill
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      className="object-cover"
                    />
                    <span className="absolute bottom-3 right-3 bg-stone-900/80 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-medium">
                      Historic Winery Wing
                    </span>
                  </div>

                </div>
              </div>
            </section>

            {/* ── SAVORIA AVAILABILITY & DATE ENGINE ── */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-stone-100 pb-4">
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-900 uppercase tracking-wider">
                    Check Direct Dates & Availability
                  </h3>
                  <p className="text-xs text-stone-500">
                    Guaranteed lowest rate with direct host perks and flexible cancellation.
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                  Save ~€45 vs Booking.com
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center pt-2">
                <div className="lg:col-span-3 bg-stone-50 border border-stone-200 rounded-lg p-2.5">
                  <label className="text-[11px] font-semibold text-stone-500 block mb-0.5">Check-in Date</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={e => setCheckIn(e.target.value)}
                    className="w-full text-sm font-semibold text-stone-800 bg-transparent outline-hidden cursor-pointer"
                  />
                </div>
                <div className="lg:col-span-3 bg-stone-50 border border-stone-200 rounded-lg p-2.5">
                  <label className="text-[11px] font-semibold text-stone-500 block mb-0.5">Check-out ({nights} nights)</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={e => setCheckOut(e.target.value)}
                    className="w-full text-sm font-semibold text-stone-800 bg-transparent outline-hidden cursor-pointer"
                  />
                </div>
                <div className="lg:col-span-4 bg-stone-50 border border-stone-200 rounded-lg p-2.5">
                  <span className="text-[11px] font-semibold text-stone-500 block mb-0.5">Guests & Rooms</span>
                  <span className="text-sm font-semibold text-stone-800 block truncate">
                    {adults} Adults · {roomsCount} Room · {nights} Nights
                  </span>
                </div>
                <div className="lg:col-span-2">
                  <button
                    onClick={() => handleOpenCheckout(property.rooms[0])}
                    className="w-full py-3 bg-[#A85A44] hover:bg-[#924733] text-white font-serif font-medium text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Check Rates
                  </button>
                </div>
              </div>
            </section>

            {/* ── VINEYARD EXPERIENCES ── */}
            <section id="experiences" className="space-y-6">
              <div className="text-center space-y-1">
                <span className="text-xs font-serif uppercase tracking-[0.25em] text-[#A85A44] font-semibold">
                  Estate Heritage
                </span>
                <h3 className="text-2xl font-serif uppercase tracking-wider text-stone-900 font-normal">
                  Winery & Lake Experiences
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
                  <span className="text-xs font-serif font-bold text-[#A85A44] uppercase tracking-wider block">01 · Tasting</span>
                  <h4 className="text-lg font-serif font-bold text-stone-900">Underground Barrel Vaults</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Sommelier-guided tasting of four indigenous Vranec and Stanushina vintages inside our 1894 stone cellars, accompanied by local sheep cheeses.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
                  <span className="text-xs font-serif font-bold text-[#A85A44] uppercase tracking-wider block">02 · Lake Tour</span>
                  <h4 className="text-lg font-serif font-bold text-stone-900">Private Wooden Boat to Kaneo</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Depart directly from the estate private dock on a traditional wooden boat across ancient Lake Ohrid to cliffside Byzantine churches.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
                  <span className="text-xs font-serif font-bold text-[#A85A44] uppercase tracking-wider block">03 · Cuisine</span>
                  <h4 className="text-lg font-serif font-bold text-stone-900">Organic Vineyard Breakfast</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Morning breakfast served under ancient fig trees featuring warm pastries, farm cheeses, wild mountain honey, and freshly pressed grape juice.
                  </p>
                </div>
              </div>
            </section>

            {/* ── HOST STORY & CONTACT ── */}
            <section id="contact" className="bg-[#F8F5EE] rounded-2xl p-8 sm:p-10 border border-stone-200/90 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-serif uppercase tracking-[0.25em] text-[#A85A44] font-semibold">
                  Meet Your Hosts
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
                  Stefan & Maria · Winemakers & Hosts
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  “Our family has cultivated indigenous Vranec and Stanushina grapes on these terraced slopes for four generations. We restored the estate so travelers could experience authentic wine country living with direct, personal care.”
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => setConciergeOpen(true)}
                    className="px-5 py-2.5 bg-[#2D5A43] hover:bg-[#234E38] text-white font-medium text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Chat with Concierge
                  </button>
                  <a
                    href="https://wa.me/6281383521750?text=Hello%20Stefan%20%26%20Maria,%20I%20am%20inquiring%20about%20Savoria%20Estate%20suites"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 bg-white border border-stone-300 text-stone-700 hover:text-stone-900 text-xs font-medium rounded-lg transition-colors"
                  >
                    Open Host WhatsApp
                  </a>
                </div>
              </div>
              <div className="lg:col-span-4 relative h-64 rounded-xl overflow-hidden border border-stone-200">
                <Image
                  src="/images/hospitality/savoria-wine-estate.jpg"
                  alt="Stefan & Maria Estate"
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>
            </section>

          </main>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          CONCEPT 03: THE METROPOLITAN LOFT SUITES (SARAJEVO MOCKUP)
      ══════════════════════════════════════════════════════════════ */}
      {slug === 'city-apartments' && (
        <div className="bg-[#FAF9F6] text-stone-900 min-h-screen">
          
          {/* Header matching urban-loft.jpg */}
          <header className="bg-white border-b border-stone-200 sticky top-10 z-40">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest font-serif font-bold text-stone-400">WUUS ·</span>
                <div>
                  <h1 className="text-lg sm:text-xl font-serif uppercase tracking-[0.2em] text-stone-900 font-bold m-0">
                    THE METROPOLITAN LOFT SUITES
                  </h1>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-stone-500 block">SARAJEVO</span>
                </div>
              </div>
              <button
                onClick={() => handleOpenCheckout(property.rooms[0])}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-serif uppercase tracking-wider rounded transition-colors"
              >
                Book Direct
              </button>
            </div>
          </header>

          <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
            
            {/* Dark Urban Heritage Hero Banner */}
            <div className="relative h-[280px] sm:h-[340px] rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="/images/hospitality/sarajevo-king-suite.jpg"
                alt="Sarajevo Urban Heritage Loft"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/45 flex items-center justify-center p-6 text-center">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-white tracking-[0.15em] uppercase font-normal max-w-lg leading-tight">
                  URBAN HERITAGE LUXURY IN SARAJEVO
                </h2>
              </div>
            </div>

            {/* Discover Our Suites Section Title */}
            <div className="text-center space-y-1">
              <h3 className="text-2xl font-serif text-stone-900 font-normal">
                Discover Our Suites
              </h3>
              <p className="text-xs text-stone-500 font-serif italic">
                Austrian-era brick, high ceilings, and artisan quarter views
              </p>
            </div>

            {/* KING SUITE CARD (Matching urban-loft.jpg 1:1) */}
            <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
              <div className="relative h-[280px] sm:h-[340px] rounded-xl overflow-hidden">
                <Image
                  src="/images/hospitality/sarajevo-king-suite.jpg"
                  alt="King Suite with exposed brick wall"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-2xl font-serif uppercase tracking-wider text-stone-900 font-bold m-0">
                    KING SUITE
                  </h4>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl uppercase tracking-wider">
                    TRANSPARENT DIRECT RATE
                  </span>
                </div>

                <p className="text-sm text-stone-600 leading-relaxed m-0">
                  Experience spacious modern comfort with original heritage charm. 40 sqm, historic quarter view.
                </p>

                {/* Amenities Icons Row matching mockup */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 py-3 border-y border-stone-100 text-center text-xs text-stone-700">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold">🛏 King Bed</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold">📶 300M Wi-Fi</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold">☕ Espresso</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold">🏙 Balcony</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold">📐 40 SQM</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold">❄ AC</span>
                  </div>
                </div>

                {/* Pricing & CTA Buttons matching urban-loft.jpg */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 block font-semibold">FROM</span>
                    <div className="flex items-baseline gap-1">
                      <strong className="text-3xl font-serif font-bold text-stone-900">€210</strong>
                      <span className="text-xs text-stone-500 uppercase tracking-wider">/ NIGHT</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => handleOpenCheckout(property.rooms[0])}
                      className="flex-1 sm:flex-initial px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-serif uppercase tracking-widest text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      BOOK NOW
                    </button>
                    <a
                      href="https://wa.me/6281383521750?text=Hello,%20I%20am%20inquiring%20about%20the%20King%20Suite%20at%20The%20Metropolitan%20Loft%20Suites%20Sarajevo"
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>WhatsApp Inquiry</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </main>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          CONCEPT 01: ARTISAN COASTAL RETREAT (COASTAL MOCKUP)
      ══════════════════════════════════════════════════════════════ */}
      {slug === 'seaside-guesthouse' && (
        <div className="bg-[#FAF7F2] text-stone-900 min-h-screen">
          
          {/* Header matching coastal-retreat.jpg */}
          <header className="bg-[#FAF7F2] border-b border-stone-200/80 sticky top-10 z-40">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-serif tracking-tight text-stone-900 font-normal m-0">
                  Artisan
                </h1>
                <span className="text-[10px] tracking-widest uppercase text-stone-500 block">
                  Coastal Retreat · Albanian Riviera
                </span>
              </div>

              <nav className="hidden md:flex items-center gap-8 text-xs font-serif uppercase tracking-wider text-stone-700">
                <a href="#suite" className="hover:text-stone-900">Discover</a>
                <a href="#suite" className="hover:text-stone-900 font-bold border-b border-stone-900 pb-0.5">Stays</a>
                <a href="#suite" className="hover:text-stone-900">Wellness</a>
                <a href="#suite" className="hover:text-stone-900">Gallery</a>
                <a href="#suite" className="hover:text-stone-900">Journal</a>
              </nav>

              <button
                onClick={() => handleOpenCheckout(property.rooms[0])}
                className="px-4 py-2 bg-[#1C2733] hover:bg-[#2A3B4C] text-white text-xs font-serif uppercase tracking-wider rounded transition-colors"
              >
                Booking
              </button>
            </div>
          </header>

          <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
            
            {/* Featured Ionian Vista Suite matching iPad mockup */}
            <div id="suite" className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden p-6 sm:p-10 space-y-6">
              
              {/* Featured Villa Pool Photo */}
              <div className="relative h-[340px] sm:h-[440px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/hospitality/artisan-ionian-suite.jpg"
                  alt="Ionian Vista Suite Stone Villa and Pool over Turquoise Sea"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-3xl font-serif text-stone-900 font-normal m-0">
                    Ionian Vista Suite
                  </h2>
                  <p className="text-sm text-stone-600 leading-relaxed mt-2 max-w-2xl">
                    A sanctuary of sophisticated calm overlooking the turquoise Ionian. Features a private terrace, locally sourced stone, and handcrafted olive wood details.
                  </p>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-serif uppercase tracking-wider font-bold text-stone-900 block mb-1">
                    Features
                  </span>
                  <p className="text-xs text-stone-600">
                    2 Guests • King Bed • Private Terrace • Sea View
                  </p>
                </div>

                {/* Thumbnails row */}
                <div>
                  <span className="text-xs font-serif uppercase tracking-wider font-bold text-stone-900 block mb-2">
                    Details & Amenities
                  </span>
                  <div className="grid grid-cols-4 gap-3 max-w-md">
                    <div className="relative h-20 rounded-lg overflow-hidden border border-stone-200">
                      <Image src="/images/hospitality/artisan-ionian-suite.jpg" alt="Villa Pool" fill className="object-cover" />
                    </div>
                    <div className="relative h-20 rounded-lg overflow-hidden border border-stone-200">
                      <Image src="/images/hospitality/stone-suite-main.jpg" alt="Bedroom" fill className="object-cover" />
                    </div>
                    <div className="relative h-20 rounded-lg overflow-hidden border border-stone-200">
                      <Image src="/images/hospitality/stone-suite-breakfast.jpg" alt="Breakfast" fill className="object-cover" />
                    </div>
                    <div className="relative h-20 rounded-lg overflow-hidden border border-stone-200">
                      <Image src="/images/hospitality/guesthouse.webp" alt="Courtyard" fill className="object-cover" />
                    </div>
                  </div>
                </div>

                {/* Pricing & Check Availability Button */}
                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <strong className="text-3xl font-serif font-bold text-stone-900">€120</strong>
                      <span className="text-xs text-stone-500">/ night</span>
                    </div>
                    <span className="text-xs text-stone-500 block">
                      (Including courtyard artisan breakfast & welcome chilled wine)
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenCheckout(property.rooms[0])}
                    className="px-8 py-3.5 bg-[#1C2733] hover:bg-[#2A3B4C] text-white font-serif uppercase tracking-widest text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Check Availability
                  </button>
                </div>

              </div>
            </div>

          </main>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. CLEAN MULTI-STEP RESERVATION DRAWER (ALL CONCEPTS)
      ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {checkoutOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCheckoutOpen(false)}
              className="absolute inset-0 bg-[#1C2733]/70 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              className="relative w-full max-w-xl bg-white rounded-2xl p-6 sm:p-8 z-10 max-h-[92vh] overflow-y-auto shadow-2xl space-y-5"
            >
              {/* Header with Steps */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Direct Booking Confirmation
                  </span>
                  <h3 className="text-xl font-bold text-[#1C2733]">
                    {property.name}
                  </h3>
                </div>
                <button
                  onClick={() => setCheckoutOpen(false)}
                  className="p-2 text-slate-400 hover:text-[#1C2733] rounded-xl hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Step Tracker */}
              <div className="flex items-center justify-between text-xs font-semibold px-3 py-2 bg-slate-50 rounded-lg">
                <span className={checkoutStep === 1 ? 'text-[#1C2733] font-bold' : 'text-slate-400'}>
                  1. Room & Rate
                </span>
                <span className="text-slate-300">/</span>
                <span className={checkoutStep === 2 ? 'text-[#1C2733] font-bold' : 'text-slate-400'}>
                  2. Guest Details
                </span>
                <span className="text-slate-300">/</span>
                <span className={checkoutStep === 3 ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                  3. Confirmation
                </span>
              </div>

              {/* ── STEP 1: REVIEW SELECTION ── */}
              {checkoutStep === 1 && (
                <div className="space-y-4">
                  {/* Room Card Preview */}
                  <div className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0">
                      <Image src={selectedRoom.image} alt={selectedRoom.name} fill sizes="80px" className="object-cover" />
                    </div>
                    <div className="text-xs space-y-0.5">
                      <strong className="block text-sm text-[#1C2733]">{selectedRoom.name}</strong>
                      <span className="text-slate-500">{selectedRoom.size} · {selectedRoom.bed}</span>
                      <p className="text-slate-700 font-medium pt-0.5 m-0">Plan: {selectedRatePlan.name}</p>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Check-in</span>
                      <strong className="text-[#1C2733]">{checkIn}</strong>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Check-out</span>
                      <strong className="text-[#1C2733]">{checkOut}</strong>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Duration</span>
                      <strong className="text-[#1C2733]">{nights} Nights</strong>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Guests</span>
                      <strong className="text-[#1C2733]">{adults} Adults</strong>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Rate plan per night</span>
                      <span>€{selectedRatePlan.rate}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Stay calculation</span>
                      <span>€{selectedRatePlan.rate} × {nights} nights</span>
                    </div>
                    <div className="flex justify-between text-slate-400 line-through">
                      <span>OTA comparison rate</span>
                      <span>€{calculateOtaTotal(selectedRatePlan.otaRate)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-800 font-semibold pt-1 border-t border-slate-200">
                      <span>Direct Booking Benefit</span>
                      <span>Save €{savings} (0% OTA Commission)</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#1C2733] pt-1">
                      <span>Total to Pay at Property</span>
                      <span>€{calculateTotal(selectedRatePlan.rate)}</span>
                    </div>
                  </div>

                  {/* Included Direct Benefits */}
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs space-y-1">
                    <strong className="text-emerald-900 block font-semibold">Included with your direct booking:</strong>
                    {selectedRatePlan.perks.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-emerald-800">
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setCheckoutStep(2)}
                    className="w-full py-3 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Continue to Guest Details →
                  </button>
                </div>
              )}

              {/* ── STEP 2: GUEST DETAILS ── */}
              {checkoutStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-semibold text-[#1C2733] block mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-[#1C2733]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#1C2733] block mb-1">Last Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Doe"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-[#1C2733]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-semibold text-[#1C2733] block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="john.doe@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-[#1C2733]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#1C2733] block mb-1">WhatsApp / Phone *</label>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={countryCode}
                          onChange={e => setCountryCode(e.target.value)}
                          className="w-16 p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-[#1C2733] text-center"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="170 1234567"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-[#1C2733]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-semibold text-[#1C2733] block mb-1">Country of Residence</label>
                      <select
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-[#1C2733]"
                      >
                        <option value="Germany">Germany</option>
                        <option value="Italy">Italy</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Austria">Austria</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="France">France</option>
                        <option value="United States">United States</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-semibold text-[#1C2733] block mb-1">Estimated Arrival</label>
                      <select
                        value={arrivalTime}
                        onChange={e => setArrivalTime(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-[#1C2733]"
                      >
                        <option value="14:00 - 16:00">14:00 – 16:00</option>
                        <option value="16:00 - 18:00">16:00 – 18:00</option>
                        <option value="Late Check-in (after 20:00)">Late Check-in (after 20:00)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setCheckoutStep(1)}
                      className="px-4 py-2.5 bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg hover:bg-slate-200 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCheckoutStep(3)}
                      className="flex-1 py-3 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Complete & View Voucher →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 3: VOUCHER & CONFIRMATION ── */}
              {checkoutStep === 3 && (
                <div className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                          Direct Booking Voucher
                        </span>
                        <strong className="text-base text-[#1C2733] font-mono">
                          {bookingRef}
                        </strong>
                      </div>
                      <span className="text-xs font-semibold text-emerald-800 bg-white px-2.5 py-1 rounded border border-slate-200">
                        Pay on Arrival
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block font-medium">Guest</span>
                        <strong className="text-[#1C2733]">{firstName || 'Guest'} {lastName || ''}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Room</span>
                        <strong className="text-[#1C2733]">{selectedRoom.name}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Dates</span>
                        <strong className="text-[#1C2733]">{checkIn} → {checkOut} ({nights}N)</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Total Due</span>
                        <strong className="text-base font-bold text-[#1C2733]">€{calculateTotal(selectedRatePlan.rate)}</strong>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 text-xs text-slate-500">
                      Payment is made directly upon check-in. Free cancellation up to 48 hours prior to arrival.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handleSendWhatsAppBooking}
                      className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Send Reservation to Host via WhatsApp</span>
                    </button>
                    <p className="text-[11px] text-center text-slate-400">
                      Opens WhatsApp with your booking details formatted for the host.
                    </p>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => setCheckoutStep(2)}
                      className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-200 cursor-pointer"
                    >
                      Edit Info
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex-1 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Summary</span>
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          4. GUEST INQUIRIES CONCIERGE CHAT
      ────────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50">
        {!conciergeOpen ? (
          <button
            onClick={() => setConciergeOpen(true)}
            className="px-4 py-3 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white rounded-xl shadow-lg flex items-center gap-2 font-semibold text-xs transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Host Concierge</span>
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-[340px] sm:w-[360px] bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[460px]"
          >
            <div className="bg-[#1C2733] text-white p-4 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white">Direct Host Concierge</h4>
                <p className="text-[11px] text-slate-300 m-0">{property.name}</p>
              </div>
              <button
                onClick={() => setConciergeOpen(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#1C2733] text-white'
                        : 'bg-white text-slate-800 border border-slate-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2 bg-white border-t border-slate-100 flex flex-wrap gap-1.5">
              {[
                'Free parking?',
                'Late arrival?',
                'Breakfast hours?',
                'Direct booking perks?'
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskConcierge(chip)}
                  className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded font-medium cursor-pointer transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskConcierge(inputQuestion);
              }}
              className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about parking, arrival, breakfast..."
                value={inputQuestion}
                onChange={e => setInputQuestion(e.target.value)}
                className="flex-1 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[#1C2733] focus:outline-hidden focus:border-slate-400"
              />
              <button
                type="submit"
                className="p-2.5 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white rounded-lg transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </div>

    </div>
  );
}
