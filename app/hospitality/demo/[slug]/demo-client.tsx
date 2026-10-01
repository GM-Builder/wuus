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
  Compass,
  Clock,
  Sparkles,
  ChevronDown
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
    <div className="min-h-screen bg-white text-[#1C2733] font-sans antialiased selection:bg-[#F59E0B]/20 selection:text-[#1C2733]">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP DEMO INSPECTOR BAR (WUUS STUDIO EVALUATION)
      ────────────────────────────────────────────────────────────── */}
      <div className="bg-[#1C2733] text-white px-4 sm:px-6 py-2.5 sticky top-0 z-50 border-b border-[#233746] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-bold tracking-wider uppercase text-[11px] text-[#F59E0B]">
            WUUS Live Demo
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
              Lake Ohrid
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
            Ask Faisal for a Bespoke Build →
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
          2. HOTEL NAVBAR
      ────────────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-200 sticky top-10 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href={`/hospitality/demo/${property.slug}`} className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold text-[#1C2733] tracking-tight">
              {property.name}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
              {property.category}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm text-[#1C2733]">
            <a href="#search-engine" className="hover:text-[#F59E0B] transition-colors font-medium">Availability</a>
            <a href="#rooms" className="hover:text-[#F59E0B] transition-colors font-medium">Rooms & Rates</a>
            <a href="#experience" className="hover:text-[#F59E0B] transition-colors font-medium">About</a>
            <a href="#guide" className="hover:text-[#F59E0B] transition-colors font-medium">Local Guide</a>
            <a href="#faq" className="hover:text-[#F59E0B] transition-colors font-medium">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs font-semibold text-[#1C2733]">
              {(['EN', 'DE', 'IT'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded transition-colors ${
                    lang === l ? 'bg-white text-[#1C2733] font-bold shadow-xs' : 'text-slate-500 hover:text-[#1C2733]'
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
              className="bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white px-4 py-2.5 rounded-lg font-semibold text-xs transition-colors cursor-pointer"
            >
              See Rooms
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        
        {/* ─────────────────────────────────────────────────────────────
            3. PROPERTY OVERVIEW & EDITORIAL PHOTO GALLERY
        ────────────────────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-1">
                {property.category} · {property.location}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1C2733] tracking-tight">
                {property.name}
              </h1>
              <p className="text-sm text-slate-600 mt-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{property.locationHighlight}</span>
              </p>
            </div>

            {/* Score block */}
            <div className="flex items-center gap-3 text-right shrink-0">
              <div>
                <strong className="block text-sm font-bold text-[#1C2733]">
                  {property.ratingLabel}
                </strong>
                <span className="text-xs text-slate-500">
                  {property.reviewsCount} verified reviews
                </span>
              </div>
              <div className="w-12 h-12 bg-[#1C2733] text-white rounded-xl flex items-center justify-center font-bold text-lg">
                {property.ratingScore}
              </div>
            </div>
          </div>

          {/* Clean 3-Photo Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-[380px] sm:h-[460px] rounded-2xl overflow-hidden">
            {/* Main Featured Photo (7 cols) */}
            <div className="md:col-span-7 relative h-full">
              <Image
                src={property.heroImage}
                alt={property.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
            </div>

            {/* Right 2 Stacked Photos (5 cols) */}
            <div className="md:col-span-5 grid grid-rows-2 gap-3 h-full">
              <div className="relative h-full">
                <Image
                  src={property.rooms[0]?.image || property.heroImage}
                  alt="Room View"
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-full">
                <Image
                  src={property.rooms[1]?.image || property.atmosphereImage}
                  alt="Terrace or Garden"
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            4. CLEAN SEARCH & DATES BAR
        ────────────────────────────────────────────────────────────── */}
        <section 
          id="search-engine" 
          className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs sticky top-24 z-30"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            
            {/* Check-in Date */}
            <div className="lg:col-span-3 bg-slate-50 border border-slate-200 rounded-lg p-2.5">
              <label className="text-[11px] font-semibold text-slate-500 block mb-0.5">
                Check-in Date
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
                className="w-full text-sm font-semibold text-[#1C2733] bg-transparent outline-hidden cursor-pointer"
              />
            </div>

            {/* Check-out Date */}
            <div className="lg:col-span-3 bg-slate-50 border border-slate-200 rounded-lg p-2.5">
              <label className="text-[11px] font-semibold text-slate-500 block mb-0.5">
                Check-out ({nights} nights)
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
                className="w-full text-sm font-semibold text-[#1C2733] bg-transparent outline-hidden cursor-pointer"
              />
            </div>

            {/* Guests & Room */}
            <div className="lg:col-span-4 relative">
              <div
                onClick={() => setGuestPickerOpen(!guestPickerOpen)}
                className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 cursor-pointer hover:border-slate-300 transition-colors"
              >
                <span className="text-[11px] font-semibold text-slate-500 block mb-0.5">
                  Guests & Rooms
                </span>
                <span className="text-sm font-semibold text-[#1C2733] block truncate">
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
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl p-4 border border-slate-200 shadow-lg z-50 space-y-3"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <strong className="block text-[#1C2733]">Adults</strong>
                        <span className="text-xs text-slate-500">Ages 13+</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-7 h-7 rounded border border-slate-300 font-bold flex items-center justify-center hover:bg-slate-50"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-semibold">{adults}</span>
                        <button
                          onClick={() => setAdults(Math.min(4, adults + 1))}
                          className="w-7 h-7 rounded border border-slate-300 font-bold flex items-center justify-center hover:bg-slate-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-100">
                      <div>
                        <strong className="block text-[#1C2733]">Children</strong>
                        <span className="text-xs text-slate-500">Ages 0 to 12</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                          className="w-7 h-7 rounded border border-slate-300 font-bold flex items-center justify-center hover:bg-slate-50"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-semibold">{childrenCount}</span>
                        <button
                          onClick={() => setChildrenCount(Math.min(3, childrenCount + 1))}
                          className="w-7 h-7 rounded border border-slate-300 font-bold flex items-center justify-center hover:bg-slate-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setGuestPickerOpen(false)}
                      className="w-full py-2 bg-[#1C2733] text-white text-xs font-semibold rounded hover:bg-[#233746] transition-colors"
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Check Rates Button */}
            <div className="lg:col-span-2">
              <button
                onClick={() => {
                  setGuestPickerOpen(false);
                  const elem = document.getElementById('rooms');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Check Rates
              </button>
            </div>

          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            5. ROOMS & RATE PLANS
        ────────────────────────────────────────────────────────────── */}
        <section id="rooms" className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C2733] tracking-tight">
                Rooms & Direct Rates
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Direct reservations include guaranteed lowest rate, artisan breakfast options, and flexible arrival.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setRoomFilter('all')}
                className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  roomFilter === 'all' ? 'bg-[#1C2733] border-[#1C2733] text-white font-semibold' : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                All Rooms ({property.rooms.length})
              </button>
              <button
                onClick={() => setRoomFilter('breakfast')}
                className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  roomFilter === 'breakfast' ? 'bg-[#1C2733] border-[#1C2733] text-white font-semibold' : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                Breakfast Included
              </button>
            </div>
          </div>

          {/* Rooms List */}
          <div className="space-y-10">
            {filteredRooms.map((room) => {
              const currentImg = activePhoto[room.id] || room.image;
              return (
                <div
                  key={room.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    
                    {/* Left: Photos & Specs (5 cols) */}
                    <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-xl font-bold text-[#1C2733]">
                            {room.name}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {room.view} · Max {room.maxGuests} Guests
                          </p>
                        </div>

                        {/* Main Room Photo */}
                        <div className="relative h-64 w-full rounded-xl overflow-hidden">
                          <Image
                            src={currentImg}
                            alt={room.name}
                            fill
                            sizes="(max-width: 1024px) 100vw, 400px"
                            className="object-cover"
                          />
                        </div>

                        {/* Thumbnail switcher */}
                        <div className="flex items-center gap-2">
                          {room.gallery.map((gImg, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActivePhoto(prev => ({ ...prev, [room.id]: gImg }))}
                              className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                                currentImg === gImg ? 'border-[#1C2733]' : 'border-transparent opacity-70 hover:opacity-100'
                              }`}
                            >
                              <Image src={gImg} alt="Thumb" fill sizes="64px" className="object-cover" />
                            </button>
                          ))}
                        </div>

                        {/* Specs */}
                        <div className="text-xs text-slate-600 space-y-1 pt-1">
                          <p className="m-0"><strong>Bed:</strong> {room.bed}</p>
                          <p className="m-0"><strong>Size:</strong> {room.size}</p>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed pt-1">
                          {room.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                        Direct stay perk: <strong className="text-slate-800">{room.perk}</strong>
                      </div>
                    </div>

                    {/* Right: Rate Plans Table (7 cols) */}
                    <div className="lg:col-span-7 p-6 flex flex-col justify-between space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="font-semibold text-slate-700">Available Rate Plans</span>
                          <span>{nights} nights total</span>
                        </div>

                        {/* Rate Plans List */}
                        <div className="space-y-3">
                          {room.ratePlans.map((plan) => {
                            const isRecommended = plan.recommended;
                            const totalPrice = calculateTotal(plan.rate);
                            const totalOtaPrice = calculateOtaTotal(plan.otaRate);
                            const planSavings = totalOtaPrice - totalPrice;

                            return (
                              <div
                                key={plan.id}
                                className={`p-5 rounded-xl border transition-colors ${
                                  isRecommended
                                    ? 'border-[#1C2733] bg-white shadow-xs'
                                    : 'border-slate-200 bg-white'
                                }`}
                              >
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                  <div className="space-y-1.5 max-w-sm">
                                    <div className="flex items-center gap-2">
                                      <h4 className="text-base font-bold text-[#1C2733]">
                                        {plan.name}
                                      </h4>
                                      {isRecommended && (
                                        <span className="bg-[#1C2733] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                                          Recommended
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-slate-500">
                                      {plan.description}
                                    </p>

                                    {/* Perks List */}
                                    <ul className="space-y-1 text-xs text-slate-700 pt-1">
                                      {plan.perks.map((pk, idx) => (
                                        <li key={idx} className="flex items-start gap-1.5">
                                          <Check className="w-3.5 h-3.5 text-slate-700 mt-0.5 shrink-0" />
                                          <span>{pk}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Price & Action */}
                                  <div className="text-right sm:self-center shrink-0 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                    <div className="space-y-0.5">
                                      <span className="text-xs text-slate-400 line-through block">
                                        OTA rate: €{totalOtaPrice}
                                      </span>
                                      <div className="flex items-baseline justify-end gap-1">
                                        <span className="text-2xl font-bold text-[#1C2733]">
                                          €{totalPrice}
                                        </span>
                                        <span className="text-xs text-slate-500">
                                          / {nights} nights
                                        </span>
                                      </div>
                                      <span className="text-xs font-semibold text-emerald-800 block">
                                        Save €{planSavings} direct (0% OTA Fee)
                                      </span>
                                    </div>

                                    <button
                                      onClick={() => handleOpenCheckout(room, plan)}
                                      className="mt-3 w-full sm:w-auto px-5 py-2.5 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                                    >
                                      Select & Reserve
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>No prepayment needed · Pay at check-in · Free cancellation</span>
                        </span>
                        <span className="font-semibold text-slate-700">0% OTA fee</span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            6. EXPERIENCE & HOST STORY (NON-REPEATING PHOTOGRAPHY)
        ────────────────────────────────────────────────────────────── */}
        <section id="experience" className="border-t border-slate-200 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                THE STORY & CARETAKERS
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C2733] tracking-tight">
                Personal hospitality,<br />
                not a nameless hotel chain.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {property.host.note}
              </p>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <strong className="block text-sm font-bold text-[#1C2733]">
                  {property.host.names}
                </strong>
                <span className="text-xs text-slate-500">
                  {property.host.role} · Direct contact via WhatsApp
                </span>
              </div>
            </div>

            <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden shadow-xs">
              <Image
                src={property.atmosphereImage}
                alt="Property atmosphere"
                fill
                sizes="500px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            7. CURATED LOCAL GUIDE (CLEAN CATEGORIZED TILES)
        ────────────────────────────────────────────────────────────── */}
        <section id="guide" className="border-t border-slate-200 pt-12 space-y-6">
          <div>
            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              LOCAL INSIDER TIPS
            </p>
            <h2 className="text-2xl font-bold text-[#1C2733] tracking-tight">
              Secret Spots & Dining Nearby
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {property.localGuide.map((item, idx) => (
              <div key={idx} className="p-5 bg-white border border-slate-200 rounded-xl space-y-2.5 hover:border-slate-300 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {item.dist}
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#1C2733] m-0">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed m-0">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            8. STAY FAQ
        ────────────────────────────────────────────────────────────── */}
        <section id="faq" className="border-t border-slate-200 pt-12 space-y-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              FREQUENTLY ASKED QUESTIONS
            </p>
            <h2 className="text-2xl font-bold text-[#1C2733] tracking-tight">
              Essential Stay Details
            </h2>
          </div>

          <div className="max-w-3xl space-y-3">
            {property.faq.map((item, idx) => (
              <details key={idx} className="p-4 bg-slate-50 rounded-xl group border border-slate-200/80" open={idx === 0}>
                <summary className="font-bold text-sm text-[#1C2733] cursor-pointer list-none flex justify-between items-center">
                  <span>{item.q}</span>
                  <span className="text-slate-400 font-bold text-base group-open:rotate-180 transition-transform">↓</span>
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
          9. CLEAN MULTI-STEP RESERVATION DRAWER
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
                  className="p-2 text-slate-400 hover:text-[#1C2733] rounded-full hover:bg-slate-100 cursor-pointer"
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
                  <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-xs">
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Room Rate ({nights} nights × €{selectedRatePlan.rate}):</span>
                      <span className="font-semibold text-[#1C2733]">€{calculateTotal(selectedRatePlan.rate)}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Breakfast & Direct Perks:</span>
                      <span className="font-semibold text-slate-700">{selectedRatePlan.breakfastIncluded ? 'Included' : 'Room Only'}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Taxes & Service:</span>
                      <span className="font-semibold text-slate-700">Included (€0)</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                      <strong className="text-sm text-[#1C2733]">Total Due at Property:</strong>
                      <strong className="text-xl text-[#1C2733]">
                        €{calculateTotal(selectedRatePlan.rate)}
                      </strong>
                    </div>
                    <p className="text-xs text-emerald-800 font-semibold m-0">
                      ✓ Direct Rate Guarantee: You save €{savings} vs. OTA bookings.
                    </p>
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
                        placeholder="e.g. Thomas"
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
                        placeholder="e.g. Schmidt"
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
                        placeholder="thomas@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-[#1C2733]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#1C2733] block mb-1">WhatsApp / Phone *</label>
                      <div className="flex gap-1.5">
                        <select
                          value={countryCode}
                          onChange={e => setCountryCode(e.target.value)}
                          className="p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-[#1C2733]"
                        >
                          <option value="+49">+49 (DE)</option>
                          <option value="+39">+39 (IT)</option>
                          <option value="+44">+44 (UK)</option>
                          <option value="+43">+43 (AT)</option>
                          <option value="+41">+41 (CH)</option>
                          <option value="+33">+33 (FR)</option>
                          <option value="+62">+62 (ID)</option>
                        </select>
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

                  {/* Special Requests */}
                  <div className="space-y-1.5 pt-2 text-xs">
                    <span className="font-semibold text-[#1C2733] block">Special Requests</span>
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
                          <span className="text-xs">{req}</span>
                        </label>
                      ))}
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
                  {/* Clean Voucher Receipt Card */}
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
                      Payment is made directly at the guesthouse upon check-in. Free cancellation up to 48 hours prior to arrival.
                    </div>
                  </div>

                  {/* WhatsApp Action */}
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
          10. GUEST INQUIRIES CONCIERGE CHAT
      ────────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50">
        {!conciergeOpen ? (
          <button
            onClick={() => setConciergeOpen(true)}
            className="px-4 py-3 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white rounded-full shadow-lg flex items-center gap-2 font-semibold text-xs transition-colors cursor-pointer"
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
            {/* Chat header */}
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

            {/* Chat messages */}
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

            {/* Prompt Chips */}
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

            {/* Input */}
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
