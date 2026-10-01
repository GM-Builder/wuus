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
  Send
} from 'lucide-react';
import { PropertyData, Room } from './demo-data';

export function DemoPropertyClient({ property, slug }: { property: PropertyData; slug: string }) {
  // Language state
  const [lang, setLang] = useState<'EN' | 'DE' | 'IT'>('EN');

  // Booking drawer state
  const [bookingDrawerOpen, setBookingDrawerOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room>(property.rooms[0]);
  const [checkIn, setCheckIn] = useState('2026-10-12');
  const [checkOut, setCheckOut] = useState('2026-10-15');
  const [nights, setNights] = useState(3);
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState('');
  const [specialNote, setSpecialNote] = useState('');

  // Active gallery view for room cards
  const [activePhoto, setActivePhoto] = useState<Record<string, string>>({
    [property.rooms[0].id]: property.rooms[0].gallery[0],
    [property.rooms[1]?.id || '']: property.rooms[1]?.gallery[0] || ''
  });

  // 24/7 AI Concierge chat state
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    { sender: 'ai', text: `Hello and welcome to ${property.name}! I am the property's 24/7 assistant. How can I help with your stay?` }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');

  const calculateTotal = (rate: number) => rate * nights;
  const calculateOtaTotal = (otaRate: number) => otaRate * nights;

  // Handle WhatsApp Booking Trigger
  const handleWhatsAppBooking = () => {
    const text = `Hello! I would like to book a direct stay at ${property.name}.\n\n• Room: ${selectedRoom.name}\n• Check-in: ${checkIn}\n• Check-out: ${checkOut} (${nights} nights)\n• Guests: ${guests}\n• Name: ${guestName || 'Guest'}\n• Direct rate: €${calculateTotal(selectedRoom.rate)} (0% OTA Fee)\n${specialNote ? '• Note: ' + specialNote : ''}\n\nCould you please confirm availability?`;
    window.open(`https://wa.me/6281383521750?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Handle Concierge Question
  const handleAskConcierge = (qText: string) => {
    if (!qText.trim()) return;
    const userMsg = qText;
    setInputQuestion('');
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);

    setTimeout(() => {
      let reply = "I would be delighted to help! For specific personalized requests, our team is always available via WhatsApp.";
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

  return (
    <div className="min-h-screen bg-white text-[#1C2733] font-sans antialiased selection:bg-amber-500/20 selection:text-[#1C2733]">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP DEMO INSPECTOR BANNER (WUUS STUDIO EVALUATION)
      ────────────────────────────────────────────────────────────── */}
      <div className="bg-[#1C2733] text-white px-4 py-2.5 sticky top-0 z-50 border-b border-[#233746] shadow-md flex flex-wrap items-center justify-between gap-3 text-xs">
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
      <header className="bg-white/95 backdrop-blur-xs border-b border-slate-200 sticky top-10 z-40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href={`/hospitality/demo/${property.slug}`} className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black text-[#1C2733] tracking-tight">
              {property.name}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-[2px] text-[#F59E0B]">
              Boutique Independent Stay
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#1C2733]">
            <a href="#rooms" className="hover:text-[#F59E0B] transition-colors">Suites & Rooms</a>
            <a href="#experience" className="hover:text-[#F59E0B] transition-colors">The Experience</a>
            <a href="#guide" className="hover:text-[#F59E0B] transition-colors">Local Guide</a>
            <a href="#faq" className="hover:text-[#F59E0B] transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center bg-slate-100 rounded-lg p-1 text-xs font-bold text-[#1C2733]">
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
                setSelectedRoom(property.rooms[0]);
                setBookingDrawerOpen(true);
              }}
              className="bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Book Direct</span>
              <span className="text-amber-400 font-extrabold">• 0% Fee</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ─────────────────────────────────────────────────────────────
            3. HERO SECTION
        ────────────────────────────────────────────────────────────── */}
        <section className="relative h-[540px] sm:h-[620px] w-full flex items-center justify-center text-white overflow-hidden">
          <Image
            src={property.heroImage}
            alt={property.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C2733]/90 via-[#1C2733]/40 to-black/30" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white border border-white/20">
              <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{property.location}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              {property.motto}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal">
              {property.tagline}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  setSelectedRoom(property.rooms[0]);
                  setBookingDrawerOpen(true);
                }}
                className="px-8 py-4 bg-[#F59E0B] hover:bg-amber-400 text-[#1C2733] font-black text-sm rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Check Direct Availability</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#rooms"
                className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl transition-colors backdrop-blur-xs border border-white/20"
              >
                Explore Rooms & Suites
              </a>
            </div>

            <div className="pt-3 flex items-center justify-center gap-2 text-xs font-semibold text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Perk: {property.directPerk}</span>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            4. QUICK DIRECT BENEFIT BAR
        ────────────────────────────────────────────────────────────── */}
        <div className="bg-[#F8F9FA] border-b border-slate-200 py-6">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0 border border-emerald-200">
                <Check className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <strong className="block text-[#1C2733] text-sm">Best Rate Guaranteed</strong>
                <span className="text-slate-500">15%–20% cheaper than online booking agencies</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-50 text-[#F59E0B] flex items-center justify-center font-bold shrink-0 border border-amber-200">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <strong className="block text-[#1C2733] text-sm">Exclusive Direct Perks</strong>
                <span className="text-slate-500">Breakfast, welcome wine & flexible late check-in</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-[#1C2733] flex items-center justify-center font-bold shrink-0 border border-slate-200">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <strong className="block text-[#1C2733] text-sm">Direct Contact With Host</strong>
                <span className="text-slate-500">Instant confirmation directly via WhatsApp / Viber</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            5. ROOMS & SUITES SECTION
        ────────────────────────────────────────────────────────────── */}
        <section id="rooms" className="py-20 max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <p className="text-xs font-bold tracking-[2px] text-[#F59E0B] uppercase mb-2">
                ACCOMMODATION
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1C2733] tracking-tight">
                Rooms & Suites
              </h2>
            </div>
            <p className="text-xs text-slate-500 sm:text-right">
              All direct rates include daily artisan breakfast & taxes.<br />
              No surprise cleaning fees.
            </p>
          </div>

          <div className="space-y-12">
            {property.rooms.map((room) => {
              const currentImg = activePhoto[room.id] || room.image;
              return (
                <article
                  key={room.id}
                  className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-0 transition-all hover:border-slate-300"
                >
                  {/* Left: Interactive Room Photo Gallery (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col bg-slate-50">
                    <div className="relative h-[320px] sm:h-[400px] w-full">
                      <Image
                        src={currentImg}
                        alt={room.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 650px"
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-extrabold text-[#1C2733] shadow-xs">
                        {room.view}
                      </div>
                    </div>

                    {/* Thumbnail Switcher */}
                    <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                        Gallery:
                      </span>
                      {room.gallery.map((gImg, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActivePhoto(prev => ({ ...prev, [room.id]: gImg }))}
                          className={`relative w-14 h-10 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                            currentImg === gImg ? 'border-[#F59E0B] scale-105 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                        >
                          <Image src={gImg} alt="Thumbnail" fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right: Room Specs, Price Comparison & Booking (5 cols) */}
                  <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-[#1C2733]">
                          {room.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          {room.size} · {room.bed}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {room.description}
                      </p>

                      {/* Amenities Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {room.amenities.map((am, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-md"
                          >
                            {am}
                          </span>
                        ))}
                      </div>

                      {/* Direct Perk Banner */}
                      <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#F59E0B] shrink-0" />
                        <span><strong>Direct Booking Perk:</strong> {room.perk}</span>
                      </div>
                    </div>

                    {/* Price & Action Area */}
                    <div className="pt-6 border-t border-slate-100 mt-6 space-y-4">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-3xl font-black text-[#1C2733]">
                              €{room.rate}
                            </span>
                            <span className="text-xs text-slate-500 font-normal">/ night</span>
                          </div>
                          <span className="text-[11px] text-slate-400 line-through">
                            OTA Price: €{room.otaRate} / night
                          </span>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          Save €{room.otaRate - room.rate} direct
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedRoom(room);
                          setBookingDrawerOpen(true);
                        }}
                        className="w-full py-3.5 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <PhoneCall className="w-4 h-4 text-[#F59E0B]" />
                        <span>Book Room Directly (WhatsApp)</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            6. THE EXPERIENCE & HOST STORY
        ────────────────────────────────────────────────────────────── */}
        <section id="experience" className="bg-[#F8F9FA] py-20 border-y border-slate-200">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold tracking-[2px] text-[#F59E0B] uppercase mb-2">
                THE STORY & HOSTS
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1C2733] leading-tight mb-4">
                Personal hospitality,<br />
                not a nameless hotel chain.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-normal">
                {property.host.note}
              </p>
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                <strong className="block text-sm font-bold text-[#1C2733]">
                  {property.host.names}
                </strong>
                <span className="text-xs text-slate-500">
                  {property.host.role} · Direct Host Access on WhatsApp
                </span>
              </div>
            </div>

            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden border border-slate-200 shadow-md">
              <Image
                src={property.heroImage}
                alt="Host atmosphere"
                fill
                sizes="600px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            7. CURATED LOCAL GUIDE
        ────────────────────────────────────────────────────────────── */}
        <section id="guide" className="py-20 max-w-6xl mx-auto px-6">
          <p className="text-xs font-bold tracking-[2px] text-[#F59E0B] uppercase mb-2">
            INSIDER TIPS
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1C2733] tracking-tight mb-10">
            Curated Local Highlights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {property.localGuide.map((item, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <span className="text-xs font-bold text-[#F59E0B] bg-amber-50 px-2.5 py-1 rounded-md">
                  {item.dist}
                </span>
                <h4 className="text-lg font-bold text-[#1C2733]">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            8. FREQUENTLY ASKED QUESTIONS
        ────────────────────────────────────────────────────────────── */}
        <section id="faq" className="bg-[#F8F9FA] py-20 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-black text-[#1C2733] tracking-tight mb-8 text-center">
              Essential Stay Information
            </h2>

            <div className="space-y-4">
              {property.faq.map((item, idx) => (
                <details key={idx} className="p-5 bg-white rounded-2xl border border-slate-200 group" open={idx === 0}>
                  <summary className="font-bold text-base text-[#1C2733] cursor-pointer list-none flex justify-between items-center">
                    <span>{item.q}</span>
                    <span className="text-[#F59E0B] font-bold text-lg group-open:rotate-180 transition-transform">↓</span>
                  </summary>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          9. LIVE INTERACTIVE BOOKING DRAWER (ACTUALLY SENDS TO WHATSAPP)
      ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {bookingDrawerOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingDrawerOpen(false)}
              className="absolute inset-0 bg-[#1C2733]/80 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 z-10 max-h-[90vh] overflow-y-auto shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F59E0B]">
                    Direct Booking Confirmation
                  </span>
                  <h3 className="text-xl font-bold text-[#1C2733]">
                    {selectedRoom.name}
                  </h3>
                </div>
                <button
                  onClick={() => setBookingDrawerOpen(false)}
                  className="p-2 text-slate-400 hover:text-[#1C2733] rounded-full hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Room preview strip */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="relative w-16 h-14 rounded-xl overflow-hidden shrink-0">
                  <Image src={selectedRoom.image} alt="Room" fill className="object-cover" />
                </div>
                <div className="text-xs">
                  <strong className="block text-[#1C2733]">{selectedRoom.name}</strong>
                  <span className="text-slate-500">{selectedRoom.size} · {selectedRoom.bed}</span>
                  <span className="block text-emerald-700 font-bold mt-0.5">✓ {selectedRoom.perk}</span>
                </div>
              </div>

              {/* Dates & Guests Inputs */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-[#1C2733] block mb-1">Check-in Date</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={e => setCheckIn(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#1C2733]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#1C2733] block mb-1">Check-out Date</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={e => setCheckOut(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#1C2733]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-[#1C2733] block mb-1">Duration (Nights)</label>
                  <select
                    value={nights}
                    onChange={e => setNights(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#1C2733]"
                  >
                    {[1, 2, 3, 4, 5, 7, 10, 14].map(n => (
                      <option key={n} value={n}>{n} nights</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#1C2733] block mb-1">Guests</label>
                  <select
                    value={guests}
                    onChange={e => setGuests(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#1C2733]"
                  >
                    {[1, 2, 3, 4].map(g => (
                      <option key={g} value={g}>{g} guests</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-xs space-y-2">
                <label className="font-bold text-[#1C2733] block">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Thomas Schmidt"
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#1C2733]"
                />
              </div>

              {/* Price Calculation Card */}
              <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Direct Rate ({nights} nights × €{selectedRoom.rate}):</span>
                  <strong className="text-lg text-emerald-900 font-extrabold">€{calculateTotal(selectedRoom.rate)}</strong>
                </div>
                <div className="flex justify-between items-center text-slate-500 text-[11px]">
                  <span>OTA Estimated Cost:</span>
                  <span className="line-through">€{calculateOtaTotal(selectedRoom.otaRate)}</span>
                </div>
                <div className="pt-2 border-t border-emerald-200/70 text-emerald-700 font-bold text-[11px]">
                  ✓ You save €{calculateOtaTotal(selectedRoom.otaRate) - calculateTotal(selectedRoom.rate)} + free breakfast & wine.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleWhatsAppBooking}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Send Real WhatsApp Inquiry to Host</span>
                </button>
                <p className="text-[10px] text-center text-slate-400">
                  Opens WhatsApp on your device with your room dates and direct perks pre-filled.
                </p>
              </div>
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
            className="px-4 py-3.5 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs transition-all cursor-pointer border border-[#233746]"
          >
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span>Ask 24/7 Concierge</span>
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
