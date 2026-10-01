'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Check, 
  MapPin, 
  PhoneCall, 
  Mail, 
  Calendar, 
  Users, 
  Sparkles, 
  X, 
  Send,
  Star,
  ShieldCheck,
  Coffee,
  Wine,
  Clock,
  ChevronDown,
  Building,
  CheckCircle2,
  Share2,
  Heart,
  Search,
  Percent,
  SlidersHorizontal,
  Flame,
  Printer
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

  // Booking Checkout Flow State (Booking.com / Traveloka style)
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

  // 24/7 AI Concierge chat state
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    { 
      sender: 'ai', 
      text: `Hello and welcome to ${property.name}! I am the 24/7 direct digital concierge. You can ask me about free parking, breakfast, check-in, or direct perks!` 
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');

  // Handle Room Selection & Trigger Checkout
  const handleOpenCheckout = (room: Room, plan?: RatePlan) => {
    setSelectedRoom(room);
    setSelectedRatePlan(plan || room.ratePlans?.find(p => p.recommended) || room.ratePlans[0]);
    // Generate fresh booking ref
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
    const text = `*OFFICIAL DIRECT BOOKING VOUCHER*\n*Property:* ${property.name}\n*Reference:* ${bookingRef}\n*Guest:* ${firstName} ${lastName}\n*Email:* ${email || 'guest@direct.com'}\n*Phone:* ${countryCode} ${phone || 'Not provided'}\n*Country:* ${country}\n\n*STAY DETAILS:*\n• Room: ${selectedRoom.name}\n• Rate Plan: ${selectedRatePlan.name}\n• Dates: ${checkIn} → ${checkOut} (${nights} nights)\n• Guests: ${adults} Adults${childrenCount > 0 ? `, ${childrenCount} Children` : ''} · ${roomsCount} Room\n• Est. Arrival: ${arrivalTime}\n\n*PRICE BREAKDOWN (0% OTA FEE):*\n• Rate: €${selectedRatePlan.rate}/night × ${nights} nights = €${calculateTotal(selectedRatePlan.rate)}\n• OTA Fee Saved: €${savings}\n• Total Due at Property: €${calculateTotal(selectedRatePlan.rate)}\n\n*INCLUDED DIRECT PERKS:*\n${selectedRatePlan.perks.map(p => `✓ ${p}`).join('\n')}\n\n*Special Requests:* ${specialRequests.join(', ')}\n\nCould you please confirm our reservation? Thank you!`;
    window.open(`https://wa.me/6281383521750?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Handle Concierge Question
  const handleAskConcierge = (qText: string) => {
    if (!qText.trim()) return;
    const userMsg = qText;
    setInputQuestion('');
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);

    setTimeout(() => {
      let reply = "I would be delighted to help! For specific personalized requests, our host team is also available directly on WhatsApp.";
      const lower = userMsg.toLowerCase();
      const qa = property.conciergeQA;

      if (lower.includes('park') || lower.includes('car')) reply = qa['parking'] || reply;
      else if (lower.includes('check') || lower.includes('late') || lower.includes('time')) reply = qa['checkin'] || reply;
      else if (lower.includes('break') || lower.includes('food') || lower.includes('eat')) reply = qa['breakfast'] || reply;
      else if (lower.includes('perk') || lower.includes('direct') || lower.includes('wine')) reply = qa['directPerks'] || reply;
      else if (lower.includes('beach')) reply = qa['beach'] || qa['directPerks'] || reply;
      else if (lower.includes('taste') || lower.includes('wine') || lower.includes('cellar')) reply = qa['tasting'] || qa['directPerks'] || reply;
      else if (lower.includes('wifi') || lower.includes('internet') || lower.includes('work')) reply = qa['wifi'] || reply;

      setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 400);
  };

  // Filtered rooms
  const filteredRooms = property.rooms.filter(room => {
    if (roomFilter === 'breakfast') return room.ratePlans.some(p => p.breakfastIncluded);
    if (roomFilter === 'view') return room.view.toLowerCase().includes('sea') || room.view.toLowerCase().includes('lake') || room.view.toLowerCase().includes('view');
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1C2733] font-sans antialiased selection:bg-amber-500/20 selection:text-[#1C2733]">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP DEMO INSPECTOR BANNER (WUUS STUDIO EVALUATION)
      ────────────────────────────────────────────────────────────── */}
      <div className="bg-[#1C2733] text-white px-4 py-2 sticky top-0 z-50 border-b border-[#233746] shadow-md flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-extrabold tracking-wide uppercase text-[10px] text-[#F59E0B] shrink-0">
            WUUS Live Demo
          </span>
          <span className="text-slate-500 hidden md:inline">|</span>
          
          {/* Concept Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1 bg-white/10 p-0.5 rounded-lg text-[11px] font-semibold">
            <Link
              href="/hospitality/demo/seaside-guesthouse"
              className={`px-2.5 py-1 rounded transition-colors ${
                slug === 'seaside-guesthouse'
                  ? 'bg-[#F59E0B] text-[#1C2733] font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🌊 Albanian Riviera
            </Link>
            <Link
              href="/hospitality/demo/lakeside-wine-estate"
              className={`px-2.5 py-1 rounded transition-colors ${
                slug === 'lakeside-wine-estate'
                  ? 'bg-[#F59E0B] text-[#1C2733] font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🍇 Lake Ohrid
            </Link>
            <Link
              href="/hospitality/demo/city-apartments"
              className={`px-2.5 py-1 rounded transition-colors ${
                slug === 'city-apartments'
                  ? 'bg-[#F59E0B] text-[#1C2733] font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🏛️ Sarajevo
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/hospitality#review"
            className="bg-[#F59E0B] hover:bg-amber-400 text-[#1C2733] font-bold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 shadow-xs"
          >
            <span>Ask Faisal for a Bespoke Build</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/hospitality#examples"
            className="text-slate-300 hover:text-white text-xs underline font-medium"
          >
            Back to Overview
          </Link>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. HOTEL NAVBAR
      ────────────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-200 sticky top-9 z-40 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <Link href={`/hospitality/demo/${property.slug}`} className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black text-[#1C2733] tracking-tight">
              {property.name}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-[1.5px] text-[#F59E0B]">
              {property.category}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-[#1C2733]">
            <a href="#search-engine" className="hover:text-[#F59E0B] transition-colors">Availability & Prices</a>
            <a href="#rooms" className="hover:text-[#F59E0B] transition-colors">Rooms & Suites</a>
            <a href="#experience" className="hover:text-[#F59E0B] transition-colors">The Experience</a>
            <a href="#guide" className="hover:text-[#F59E0B] transition-colors">Local Guide</a>
            <a href="#faq" className="hover:text-[#F59E0B] transition-colors">Stay FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Direct Booking Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold rounded-lg">
              <Percent className="w-3.5 h-3.5 text-emerald-600" />
              <span>0% Commission Guarantee</span>
            </div>

            {/* Language Selector */}
            <div className="flex items-center bg-slate-100 rounded-lg p-1 text-[11px] font-bold text-[#1C2733]">
              {(['EN', 'DE', 'IT'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                    lang === l ? 'bg-white shadow-xs font-extrabold text-[#1C2733]' : 'text-slate-500 hover:text-[#1C2733]'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                const elem = document.getElementById('rooms');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>See Rooms</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* ─────────────────────────────────────────────────────────────
            3. AGODA / BOOKING.COM PROPERTY OVERVIEW HEADER
        ────────────────────────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="flex text-amber-400 text-sm">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {property.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1C2733] tracking-tight">
                {property.name}
              </h1>
              <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                <span>{property.location}</span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-700 font-bold">{property.locationHighlight}</span>
              </p>
            </div>

            {/* Review Score Box (Booking.com style) */}
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 self-start md:self-auto">
              <div className="text-right">
                <strong className="block text-sm font-extrabold text-[#1C2733]">
                  {property.ratingLabel}
                </strong>
                <span className="text-[11px] text-slate-500 font-medium">
                  {property.reviewsCount} verified reviews
                </span>
              </div>
              <div className="w-12 h-12 bg-[#1C2733] text-[#F59E0B] rounded-xl flex items-center justify-center font-black text-lg shadow-xs">
                {property.ratingScore}
              </div>
            </div>
          </div>

          {/* Multi-Photo Grid (Booking.com / Agoda style) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[340px] sm:h-[420px] rounded-2xl overflow-hidden">
            {/* Main Featured Photo (2 cols) */}
            <div className="md:col-span-2 relative h-full group overflow-hidden">
              <Image
                src={property.heroImage}
                alt={property.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#1C2733]/85 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-xs">
                Featured Exterior & Grounds
              </div>
            </div>

            {/* Room 1 Photo */}
            <div className="relative h-full hidden md:block group overflow-hidden">
              <Image
                src={property.rooms[0]?.image || property.heroImage}
                alt="Room Preview"
                fill
                sizes="25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/90 text-[#1C2733] text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                {property.rooms[0]?.name}
              </div>
            </div>

            {/* Room 2 / Lifestyle Photo with View All */}
            <div className="relative h-full hidden md:block group overflow-hidden">
              <Image
                src={property.rooms[1]?.image || property.rooms[0]?.gallery[1] || property.heroImage}
                alt="Room View Preview"
                fill
                sizes="25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <button 
                onClick={() => {
                  const elem = document.getElementById('rooms');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-[#1C2733] font-bold text-xs px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>View All Rooms</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B]" />
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            4. ADVANCED BOOKING ENGINE SEARCH BAR (BOOKING.COM / AGODA STYLE)
        ────────────────────────────────────────────────────────────── */}
        <section 
          id="search-engine" 
          className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#F59E0B] shadow-md sticky top-28 z-30 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#1C2733] flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Direct Stay Search & Live Availability</span>
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              ✓ Guaranteed 0% OTA Markup Rate
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            
            {/* Check-in Date (3 cols) */}
            <div className="lg:col-span-3 bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus-within:border-[#F59E0B] focus-within:bg-white transition-all">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-0.5 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#F59E0B]" />
                <span>Check-in Date</span>
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
                className="w-full text-xs font-bold text-[#1C2733] bg-transparent outline-hidden cursor-pointer"
              />
            </div>

            {/* Check-out Date (3 cols) */}
            <div className="lg:col-span-3 bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus-within:border-[#F59E0B] focus-within:bg-white transition-all">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-0.5 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#F59E0B]" />
                  <span>Check-out Date</span>
                </span>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-1.5 py-0.2 rounded">
                  {nights} {nights === 1 ? 'Night' : 'Nights'}
                </span>
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
                className="w-full text-xs font-bold text-[#1C2733] bg-transparent outline-hidden cursor-pointer"
              />
            </div>

            {/* Guests & Room Popover (4 cols) */}
            <div className="lg:col-span-4 relative">
              <div
                onClick={() => setGuestPickerOpen(!guestPickerOpen)}
                className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 cursor-pointer hover:border-[#F59E0B] transition-colors"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-0.5 flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#F59E0B]" />
                  <span>Guests & Rooms</span>
                </span>
                <span className="text-xs font-bold text-[#1C2733] block truncate">
                  {adults} Adults · {childrenCount} Children · {roomsCount} Room
                </span>
              </div>

              {/* Guest Picker Popover */}
              <AnimatePresence>
                {guestPickerOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl p-4 border border-slate-200 shadow-xl z-50 space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <strong className="block text-[#1C2733]">Adults</strong>
                        <span className="text-[10px] text-slate-500">Ages 13 and above</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-7 h-7 rounded-lg border border-slate-300 font-bold flex items-center justify-center hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold">{adults}</span>
                        <button
                          onClick={() => setAdults(Math.min(4, adults + 1))}
                          className="w-7 h-7 rounded-lg border border-slate-300 font-bold flex items-center justify-center hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                      <div>
                        <strong className="block text-[#1C2733]">Children</strong>
                        <span className="text-[10px] text-slate-500">Ages 0 to 12</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                          className="w-7 h-7 rounded-lg border border-slate-300 font-bold flex items-center justify-center hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold">{childrenCount}</span>
                        <button
                          onClick={() => setChildrenCount(Math.min(3, childrenCount + 1))}
                          className="w-7 h-7 rounded-lg border border-slate-300 font-bold flex items-center justify-center hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                      <div>
                        <strong className="block text-[#1C2733]">Rooms</strong>
                        <span className="text-[10px] text-slate-500">Number of rooms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setRoomsCount(Math.max(1, roomsCount - 1))}
                          className="w-7 h-7 rounded-lg border border-slate-300 font-bold flex items-center justify-center hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold">{roomsCount}</span>
                        <button
                          onClick={() => setRoomsCount(Math.min(2, roomsCount + 1))}
                          className="w-7 h-7 rounded-lg border border-slate-300 font-bold flex items-center justify-center hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setGuestPickerOpen(false)}
                      className="w-full py-2 bg-[#1C2733] text-white text-xs font-bold rounded-lg hover:bg-[#F59E0B] hover:text-[#1C2733] transition-colors"
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Check Rates Button (2 cols) */}
            <div className="lg:col-span-2">
              <button
                onClick={() => {
                  setGuestPickerOpen(false);
                  const elem = document.getElementById('rooms');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3.5 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Check Rates</span>
                <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
              </button>
            </div>

          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            5. ROOMS & RATE PLANS SELECTION MATRIX (BOOKING.COM STYLE)
        ────────────────────────────────────────────────────────────── */}
        <section id="rooms" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-2 border-b border-slate-200">
            <div>
              <p className="text-[11px] font-bold tracking-[2px] text-[#F59E0B] uppercase">
                AVAILABLE ACCOMMODATION
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1C2733] tracking-tight">
                Select Your Room & Direct Rate Plan
              </h2>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setRoomFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  roomFilter === 'all' ? 'bg-[#1C2733] text-white' : 'text-slate-600 hover:text-[#1C2733]'
                }`}
              >
                All Rooms ({property.rooms.length})
              </button>
              <button
                onClick={() => setRoomFilter('breakfast')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  roomFilter === 'breakfast' ? 'bg-[#1C2733] text-white' : 'text-slate-600 hover:text-[#1C2733]'
                }`}
              >
                Breakfast Included
              </button>
              <button
                onClick={() => setRoomFilter('view')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  roomFilter === 'view' ? 'bg-[#1C2733] text-white' : 'text-slate-600 hover:text-[#1C2733]'
                }`}
              >
                Best View
              </button>
            </div>
          </div>

          {/* Rooms List */}
          <div className="space-y-8">
            {filteredRooms.map((room) => {
              const currentImg = activePhoto[room.id] || room.image;
              return (
                <div
                  key={room.id}
                  className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:border-slate-300 transition-all"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    
                    {/* Room Info & Photo Gallery (5 cols) */}
                    <div className="lg:col-span-5 p-5 sm:p-6 bg-slate-50/70 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between">
                      <div className="space-y-3.5">
                        {/* Title & Badge */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-black text-[#1C2733]">
                              {room.name}
                            </h3>
                            <span className="text-xs font-semibold text-[#F59E0B]">
                              {room.view}
                            </span>
                          </div>
                          {room.urgencyText && (
                            <span className="bg-red-50 border border-red-200 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                              <Flame className="w-3 h-3 text-red-500 fill-current" />
                              <span>{room.urgencyText.split(':')[0]}</span>
                            </span>
                          )}
                        </div>

                        {/* Interactive Main Photo */}
                        <div className="relative h-60 w-full rounded-2xl overflow-hidden shadow-2xs">
                          <Image
                            src={currentImg}
                            alt={room.name}
                            fill
                            sizes="(max-width: 1024px) 100vw, 400px"
                            className="object-cover"
                          />
                          <div className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                            {room.size} · Max {room.maxGuests} Guests
                          </div>
                        </div>

                        {/* Thumbnail switcher bar */}
                        <div className="flex items-center gap-2">
                          {room.gallery.map((gImg, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActivePhoto(prev => ({ ...prev, [room.id]: gImg }))}
                              className={`relative w-16 h-11 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                                currentImg === gImg ? 'border-[#F59E0B] scale-105 shadow-xs' : 'border-transparent opacity-65 hover:opacity-100'
                              }`}
                            >
                              <Image src={gImg} alt="Thumb" fill sizes="64px" className="object-cover" />
                            </button>
                          ))}
                        </div>

                        {/* Room Specifications Pills */}
                        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                          <div className="bg-white p-2 rounded-xl border border-slate-200 text-slate-700 font-medium">
                            <span className="block text-[10px] text-slate-400 font-bold uppercase">Bed Type</span>
                            {room.bed}
                          </div>
                          <div className="bg-white p-2 rounded-xl border border-slate-200 text-slate-700 font-medium">
                            <span className="block text-[10px] text-slate-400 font-bold uppercase">Room Size</span>
                            {room.size}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {room.description}
                        </p>

                        {/* Amenities Tags */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {room.amenities.slice(0, 5).map((am, idx) => (
                            <span key={idx} className="bg-white border border-slate-200 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                              ✓ {am}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
                        Direct Booking Perk: <strong className="text-emerald-800">{room.perk}</strong>
                      </div>
                    </div>

                    {/* Rate Plans Table (Booking.com style) (7 cols) */}
                    <div className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                            Available Direct Rate Plans ({nights} nights)
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Taxes & Service Included
                          </span>
                        </div>

                        {/* Rate Plans Cards */}
                        <div className="space-y-3">
                          {room.ratePlans.map((plan) => {
                            const isRecommended = plan.recommended;
                            const totalPrice = calculateTotal(plan.rate);
                            const totalOtaPrice = calculateOtaTotal(plan.otaRate);
                            const planSavings = totalOtaPrice - totalPrice;

                            return (
                              <div
                                key={plan.id}
                                className={`p-4 rounded-2xl border transition-all ${
                                  isRecommended
                                    ? 'bg-amber-50/40 border-amber-300 ring-1 ring-amber-300 shadow-2xs'
                                    : 'bg-white border-slate-200 hover:border-slate-300'
                                }`}
                              >
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                  <div className="space-y-1.5 max-w-sm">
                                    <div className="flex items-center gap-2">
                                      <h4 className="text-sm font-extrabold text-[#1C2733]">
                                        {plan.name}
                                      </h4>
                                      {isRecommended && (
                                        <span className="bg-[#F59E0B] text-[#1C2733] text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-2xs">
                                          Best Value
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-slate-500">
                                      {plan.description}
                                    </p>

                                    {/* Perks Checkmarks */}
                                    <ul className="space-y-1 text-xs text-slate-700 font-medium pt-1">
                                      {plan.perks.map((pk, idx) => (
                                        <li key={idx} className="flex items-center gap-1.5 text-[11px]">
                                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                          <span>{pk}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Price & Action Column */}
                                  <div className="text-right sm:self-center shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                                    <div className="space-y-0.5">
                                      <span className="text-[10px] text-slate-400 line-through block">
                                        OTA Rate: €{totalOtaPrice}
                                      </span>
                                      <div className="flex items-baseline justify-end gap-1">
                                        <span className="text-2xl font-black text-[#1C2733]">
                                          €{totalPrice}
                                        </span>
                                        <span className="text-[10px] text-slate-500 font-semibold">
                                          / {nights} nights
                                        </span>
                                      </div>
                                      <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                                        Save €{planSavings} direct
                                      </span>
                                    </div>

                                    <button
                                      onClick={() => handleOpenCheckout(room, plan)}
                                      className={`mt-2.5 w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5 ${
                                        isRecommended
                                          ? 'bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white'
                                          : 'bg-slate-100 hover:bg-[#1C2733] hover:text-white text-[#1C2733]'
                                      }`}
                                    >
                                      <span>Reserve</span>
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-medium flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Book with confidence · No prepayment required · Instant confirmation</span>
                        </span>
                        <strong className="text-emerald-800 text-[11px]">0% Fee</strong>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            6. EXPERIENCE & HOST STORY
        ────────────────────────────────────────────────────────────── */}
        <section id="experience" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <p className="text-[11px] font-bold tracking-[2px] text-[#F59E0B] uppercase">
                THE STORY & CARETAKERS
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1C2733] leading-tight">
                Personal hospitality,<br />
                not a nameless hotel chain.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {property.host.note}
              </p>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <strong className="block text-sm font-bold text-[#1C2733]">
                  {property.host.names}
                </strong>
                <span className="text-xs text-slate-500 font-medium">
                  {property.host.role} · Direct Host Communication via WhatsApp
                </span>
              </div>
            </div>

            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <Image
                src={property.heroImage}
                alt="Host atmosphere"
                fill
                sizes="500px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            7. CURATED LOCAL GUIDE (INSIDER TIPS)
        ────────────────────────────────────────────────────────────── */}
        <section id="guide" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xs space-y-6">
          <div>
            <p className="text-[11px] font-bold tracking-[2px] text-[#F59E0B] uppercase">
              LOCAL INSIDER RECOMMENDATIONS
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1C2733] tracking-tight">
              Secret Spots & Dining Nearby
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {property.localGuide.map((item, idx) => (
              <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                <span className="text-[10px] font-extrabold text-[#F59E0B] bg-amber-100/70 px-2 py-0.5 rounded">
                  {item.dist}
                </span>
                <h4 className="text-base font-bold text-[#1C2733]">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            8. STAY FAQ
        ────────────────────────────────────────────────────────────── */}
        <section id="faq" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xs space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <p className="text-[11px] font-bold tracking-[2px] text-[#F59E0B] uppercase">
              ESSENTIAL INFORMATION
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1C2733] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {property.faq.map((item, idx) => (
              <details key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 group" open={idx === 0}>
                <summary className="font-bold text-sm text-[#1C2733] cursor-pointer list-none flex justify-between items-center">
                  <span>{item.q}</span>
                  <span className="text-[#F59E0B] font-bold text-base group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

      </main>

      {/* ─────────────────────────────────────────────────────────────
          9. SOPHISTICATED MULTI-STEP BOOKING DRAWER (TRAVELOKA / BOOKING.COM)
      ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {checkoutOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCheckoutOpen(false)}
              className="absolute inset-0 bg-[#1C2733]/80 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 z-10 max-h-[92vh] overflow-y-auto shadow-2xl space-y-5"
            >
              {/* Header with Steps */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#F59E0B]">
                    Direct Booking Engine · 0% OTA Commission
                  </span>
                  <h3 className="text-xl font-black text-[#1C2733]">
                    {property.name}
                  </h3>
                </div>
                <button
                  onClick={() => setCheckoutOpen(false)}
                  className="p-2 text-slate-400 hover:text-[#1C2733] rounded-full hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Steps Indicator */}
              <div className="flex items-center justify-between text-xs font-bold px-2 py-1.5 bg-slate-100 rounded-xl">
                <span className={`flex items-center gap-1.5 ${checkoutStep === 1 ? 'text-[#1C2733] font-black' : 'text-slate-400'}`}>
                  <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-2xs">1</span>
                  <span>Stay Review</span>
                </span>
                <span className="text-slate-300">➔</span>
                <span className={`flex items-center gap-1.5 ${checkoutStep === 2 ? 'text-[#1C2733] font-black' : 'text-slate-400'}`}>
                  <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-2xs">2</span>
                  <span>Guest Details</span>
                </span>
                <span className="text-slate-300">➔</span>
                <span className={`flex items-center gap-1.5 ${checkoutStep === 3 ? 'text-emerald-700 font-black' : 'text-slate-400'}`}>
                  <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-2xs">3</span>
                  <span>Confirmation Voucher</span>
                </span>
              </div>

              {/* ── STEP 1: REVIEW SELECTION ── */}
              {checkoutStep === 1 && (
                <div className="space-y-4">
                  {/* Room Card Preview */}
                  <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0">
                      <Image src={selectedRoom.image} alt={selectedRoom.name} fill sizes="96px" className="object-cover" />
                    </div>
                    <div className="text-xs space-y-1">
                      <span className="text-[10px] font-bold text-[#F59E0B] uppercase">Selected Room</span>
                      <strong className="block text-sm text-[#1C2733]">{selectedRoom.name}</strong>
                      <span className="text-slate-500">{selectedRoom.size} · {selectedRoom.bed}</span>
                      <div className="text-emerald-700 font-bold text-[11px] pt-0.5">
                        Plan: {selectedRatePlan.name}
                      </div>
                    </div>
                  </div>

                  {/* Dates & Occupancy Details */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Check-in</span>
                      <strong className="text-[#1C2733]">{checkIn}</strong>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Check-out</span>
                      <strong className="text-[#1C2733]">{checkOut}</strong>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Duration</span>
                      <strong className="text-[#1C2733]">{nights} Nights</strong>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Guests</span>
                      <strong className="text-[#1C2733]">{adults} Adults</strong>
                    </div>
                  </div>

                  {/* Transparent Price Breakdown */}
                  <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Room Rate ({nights} nights × €{selectedRatePlan.rate}):</span>
                      <span className="font-bold text-[#1C2733]">€{calculateTotal(selectedRatePlan.rate)}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Artisan Breakfast:</span>
                      <span className="text-emerald-700 font-bold">INCLUDED (FREE)</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Local Taxes & VAT:</span>
                      <span className="font-semibold text-slate-700">INCLUDED (€0)</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400 text-[11px]">
                      <span>Estimated OTA Agency Price:</span>
                      <span className="line-through">€{calculateOtaTotal(selectedRatePlan.otaRate)}</span>
                    </div>
                    <div className="pt-2 border-t border-emerald-200 flex justify-between items-center">
                      <strong className="text-sm text-emerald-950 font-black">Total Due at Property:</strong>
                      <strong className="text-xl text-emerald-900 font-black">
                        €{calculateTotal(selectedRatePlan.rate)}
                      </strong>
                    </div>
                    <p className="text-[11px] text-emerald-800 font-bold pt-1 m-0">
                      ✓ Direct Booking Savings: You save €{savings} + receive free breakfast and welcome perks.
                    </p>
                  </div>

                  <button
                    onClick={() => setCheckoutStep(2)}
                    className="w-full py-4 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Guest Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* ── STEP 2: GUEST DETAILS FORM (TRAVELOKA / BOOKING.COM STYLE) ── */}
              {checkoutStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-bold text-[#1C2733] block mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Thomas"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#1C2733]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#1C2733] block mb-1">Last Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Schmidt"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#1C2733]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-bold text-[#1C2733] block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="thomas@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#1C2733]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#1C2733] block mb-1">WhatsApp / Phone *</label>
                      <div className="flex gap-1.5">
                        <select
                          value={countryCode}
                          onChange={e => setCountryCode(e.target.value)}
                          className="p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-[#1C2733]"
                        >
                          <option value="+49">🇩🇪 +49</option>
                          <option value="+39">🇮🇹 +39</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+43">🇦🇹 +43</option>
                          <option value="+41">🇨🇭 +41</option>
                          <option value="+33">🇫🇷 +33</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+62">🇮🇩 +62</option>
                        </select>
                        <input
                          type="tel"
                          required
                          placeholder="170 1234567"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#1C2733]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-bold text-[#1C2733] block mb-1">Country of Residence</label>
                      <select
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#1C2733]"
                      >
                        <option value="Germany">Germany</option>
                        <option value="Italy">Italy</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Austria">Austria</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="France">France</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="United States">United States</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-[#1C2733] block mb-1">Estimated Arrival Time</label>
                      <select
                        value={arrivalTime}
                        onChange={e => setArrivalTime(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#1C2733]"
                      >
                        <option value="14:00 - 16:00">14:00 – 16:00 (Standard)</option>
                        <option value="16:00 - 18:00">16:00 – 18:00</option>
                        <option value="18:00 - 20:00">18:00 – 20:00</option>
                        <option value="Late Check-in (after 20:00)">Late Check-in (after 20:00)</option>
                      </select>
                    </div>
                  </div>

                  {/* Special Requests Checkboxes */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                    <span className="font-bold text-[#1C2733] block">Special Requests</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                      {[
                        'Quiet room away from reception',
                        'High floor with best view',
                        'Airport taxi transfer service',
                        'Vegetarian / Vegan breakfast'
                      ].map((req, idx) => (
                        <label key={idx} className="flex items-center gap-2 cursor-pointer bg-slate-50 p-2 rounded-lg border border-slate-200">
                          <input
                            type="checkbox"
                            checked={specialRequests.includes(req)}
                            onChange={(e) => {
                              if (e.target.checked) setSpecialRequests(prev => [...prev, req]);
                              else setSpecialRequests(prev => prev.filter(r => r !== req));
                            }}
                            className="rounded text-[#1C2733]"
                          />
                          <span className="text-[11px] font-medium">{req}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setCheckoutStep(1)}
                      className="px-4 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCheckoutStep(3)}
                      className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Complete & Generate Voucher</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 3: INSTANT CONFIRMATION & WHATSAPP VOUCHER ── */}
              {checkoutStep === 3 && (
                <div className="space-y-4">
                  {/* Voucher Card */}
                  <div className="p-5 bg-gradient-to-br from-emerald-500/10 via-slate-50 to-amber-500/10 rounded-2xl border-2 border-emerald-500 space-y-4 shadow-md">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                      <div>
                        <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-widest block">
                          Official Direct Reservation
                        </span>
                        <strong className="text-base text-[#1C2733] font-black">
                          {bookingRef}
                        </strong>
                      </div>
                      <span className="bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-2xs">
                        Guaranteed · Pay on Arrival
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Guest</span>
                        <strong className="text-[#1C2733]">{firstName || 'Guest'} {lastName || ''}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Room & Plan</span>
                        <strong className="text-[#1C2733]">{selectedRoom.name}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Dates</span>
                        <strong className="text-[#1C2733]">{checkIn} → {checkOut} ({nights}N)</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Due</span>
                        <strong className="text-emerald-700 text-base font-black">€{calculateTotal(selectedRatePlan.rate)}</strong>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                      <strong className="block text-[#1C2733]">Direct Booking Confirmation Guarantee:</strong>
                      <p className="m-0">
                        No credit card charged online. Free cancellation up to 48 hours before arrival. Your reservation details will be sent directly to the host on WhatsApp.
                      </p>
                    </div>
                  </div>

                  {/* Actions: Send WhatsApp & Download */}
                  <div className="space-y-2">
                    <button
                      onClick={handleSendWhatsAppBooking}
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Send Real Booking Voucher via WhatsApp</span>
                    </button>
                    <p className="text-[10px] text-center text-slate-400">
                      Instantly opens WhatsApp on your phone/desktop with complete booking details pre-filled.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setCheckoutStep(2)}
                      className="px-4 py-2.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-200"
                    >
                      Edit Info
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 flex items-center justify-center gap-1.5"
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
          10. 24/7 AI GUEST CONCIERGE INTERACTIVE CHAT WIDGET
      ────────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50">
        {!conciergeOpen ? (
          <button
            onClick={() => setConciergeOpen(true)}
            className="px-4 py-3 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs transition-all cursor-pointer border border-[#233746]"
          >
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span>24/7 AI Concierge</span>
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-[340px] sm:w-[380px] bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[480px]"
          >
            {/* Chat header */}
            <div className="bg-[#1C2733] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-[#1C2733] flex items-center justify-center font-bold text-xs">
                  AI
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">24/7 Concierge</h4>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Online · {property.name}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setConciergeOpen(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#1C2733] text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompt Chips */}
            <div className="p-2.5 bg-white border-t border-slate-100 flex flex-wrap gap-1.5">
              {[
                'Free parking?',
                'Late check-in?',
                'Breakfast hours?',
                'Direct perks?'
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskConcierge(chip)}
                  className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-md font-medium cursor-pointer transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Chat input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskConcierge(inputQuestion);
              }}
              className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about parking, check-in, breakfast..."
                value={inputQuestion}
                onChange={e => setInputQuestion(e.target.value)}
                className="flex-1 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B]"
              />
              <button
                type="submit"
                className="p-2.5 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white rounded-xl transition-colors cursor-pointer"
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
