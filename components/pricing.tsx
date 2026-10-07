"use client";

import { useState } from "react";
import { Check, Plus, Minus, Star, Zap, ShoppingCart, RefreshCcw, MessageCircle, ChevronRight, Code, Server, FileText, Gauge, ShieldCheck, Eye, Globe, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    id: "lite",
    name: "WUUS Lite",
    subtitle: "Landing Page Siap Pakai",
    status: "Essential",
    normalPrice: "Rp 1.500.000",
    basePromoPrice: 920000,
    mainBenefit: "Untuk kebutuhan dasar bisnis",
    specs: [
      { label: "Halaman", value: "1 Halaman" },
      { label: "Domain & Hosting", value: "GRATIS 1 Tahun" },
      { label: "Dukungan", value: "Chat WhatsApp" },
      { label: "Revisi", value: "1x Minor" },
    ],
    highlights: [
      "Tombol WhatsApp Otomatis ke Nomor Anda",
      "Tampil Sempurna di HP & Komputer",
      "Google Maps Terpasang",
    ],
    popular: false,
    isCustom: false,
  },
  {
    id: "pro",
    name: "WUUS Pro",
    subtitle: "Website Bisnis Lengkap",
    status: "PALING POPULER",
    normalPrice: "Rp 3.000.000",
    basePromoPrice: 1850000,
    mainBenefit: "Pilihan paling seimbang",
    specs: [
      { label: "Halaman", value: "Hingga 5 Halaman" },
      { label: "Domain & Hosting", value: "GRATIS 1 Tahun" },
      { label: "Dukungan", value: "WhatsApp + Bantuan Jarak Jauh" },
      { label: "Revisi", value: "3x Minor" },
    ],
    highlights: [
      "Semua fitur Lite",
      "Muncul di Pencarian Google (SEO Dasar)",
      "Formulir Kontak via Email",
      "Tampilan Katalog Produk",
    ],
    popular: true,
    isCustom: false,
  },
  {
    id: "custom",
    name: "WUUS Custom",
    subtitle: "Solusi Eksklusif Sesuai Bisnis",
    status: "Eksklusif",
    normalPrice: "Mulai Rp 7.500.000",
    basePromoPrice: 4500000,
    mainBenefit: "Dirancang sesuai kebutuhan bisnis",
    specs: [
      { label: "Halaman", value: "Sesuai Kebutuhan" },
      { label: "Domain & Hosting", value: "GRATIS 1 Tahun" },
      { label: "Dukungan", value: "Prioritas 24/7" },
      { label: "Revisi", value: "5x Minor" },
    ],
    highlights: [
      "Semua fitur Pro",
      "Sistem & Logika Khusus Bisnis Anda",
      "Desain Dibuat dari Nol",
      "Siap Terima Trafik Pengunjung Besar",
    ],
    popular: false,
    isCustom: true,
  },
];

const redesignPlans = [
  {
    id: "rd-std",
    name: "Redesign Standard",
    subtitle: "Solusi Pindah Rumah",
    target: "Cocok untuk web UMKM yang sudah terlihat ketinggalan zaman.",
    normalPrice: "Rp 2.000.000",
    basePromoPrice: 1150000,
    scope: "Pindah semua konten lama ke tampilan baru yang lebih rapi.",
    optimasi: "Website jadi lebih cepat terbuka & nyaman dilihat dari HP.",
    revisi: "2x Minor",
    highlights: [
      "Website lama dipindahkan ke platform baru yang lebih cepat",
      "Waktu loading jauh lebih singkat",
      "Tampilan sempurna di semua ukuran HP",
      "Desain lebih segar dan terlihat profesional",
      "Tombol WhatsApp diperbarui ke kontak aktif",
      "Murni tampilan baru — tanpa tambah fitur baru",
    ]
  },
  {
    id: "rd-prm",
    name: "Redesign Premium",
    subtitle: "Solusi Naik Kelas",
    target: "Untuk bisnis yang ingin terlihat mewah dan bersaing dengan brand besar.",
    normalPrice: "Rp 4.500.000",
    basePromoPrice: 2450000,
    scope: "Rombak total tampilan, struktur, dan teks promosi.",
    optimasi: "Optimasi penuh agar mudah ditemukan di Google & bisa dilacak statistiknya.",
    revisi: "3x Minor",
    highlights: [
      "Semua keuntungan Redesign Standard",
      "Perbaikan kalimat promosi agar lebih memikat pembeli",
      "Desain premium yang terlihat eksklusif dan elegan",
      "Struktur SEO diperbaiki agar lebih mudah ditemukan di Google",
      "Terpasang alat lacak pengunjung harian (Google Analytics)",
      "Pendampingan 3 bulan setelah website diluncurkan",
    ]
  }
];

const addonsList = [
  { id: "page", name: "Halaman Tambahan", price: 350000, icon: <Plus size={16} />, type: "counter" as const, unit: "/ hal" },
  { id: "katalog", name: "Katalog Produk Online", price: 500000, icon: <ShoppingCart size={16} />, type: "toggle" as const },
  { id: "reservasi", name: "Sistem Booking / Reservasi", price: 750000, icon: <Zap size={16} />, type: "toggle" as const },
];

const aLaCarteServices = [
  { id: "alc-template", name: "Beli Template Desain", desc: "Hanya kode sumber (Source Code). Tanpa bantuan pasang.", price: 349000, icon: <Code size={24} />, type: "toggle" as const, scheme: 'gold' },
  { id: "alc-setup", name: "Jasa Instalasi & Setup", desc: "Menghubungkan ke Domain & Hosting sampai online.", price: 150000, icon: <Server size={24} />, type: "toggle" as const, scheme: 'blue' },
  { id: "alc-domain", name: "Domain & Hosting (1 thn)", desc: "Domain & Hosting berkualitas + pengurusan administrasi.", price: 450000, icon: <Globe size={24} />, type: "toggle" as const, scheme: 'gold' },
  { id: "alc-content", name: "Input Konten & Produk", desc: "Membantu merapikan teks dan foto (Maks 5 hal/10 produk).", price: 250000, icon: <FileText size={24} />, type: "toggle" as const, scheme: 'green' },
  { id: "alc-speed", name: "Optimasi Speed & SEO", desc: "Penyetelan teknis agar skor performa hijau di Google.", price: 300000, icon: <Gauge size={24} />, type: "toggle" as const, scheme: 'blue' },
  { id: "alc-maint", name: "Maintenance Bulanan", desc: "Pembaruan sistem, backup, dan bantuan teknis ringan.", price: 100000, icon: <ShieldCheck size={24} />, type: "counter" as const, unit: "/ bln", scheme: 'green' },
];

const cardPatterns = [
  `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
  `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40h40V0H0v40zM1 39h38V1H1v38z' fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 0L30 15L15 30L0 15L15 0z' fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6c10 0 10-6 20-6s10 6 20 6 10-6 20-6 10 6 20 6' fill='none' stroke='%239C92AC' stroke-opacity='0.1' stroke-width='1'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l20 20M10 0l10 10M0 10l10 10' stroke='%239C92AC' stroke-opacity='0.1' stroke-width='1'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0' stroke='%239C92AC' stroke-opacity='0.1' stroke-width='1'/%3E%3Cpath d='M40 40L0 0' stroke='%239C92AC' stroke-opacity='0.1' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E")`,
];

export function Pricing() {
  const [activeTab, setActiveTab] = useState<"paket" | "alacarte">("paket");
  const [addonState, setAddonState] = useState<Record<string, number>>({});
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const updateAddon = (id: string, type: "toggle" | "counter", delta?: number) => {
    setAddonState(prev => {
      const current = prev[id] || 0;
      if (type === "toggle") {
        return { ...prev, [id]: current === 0 ? 1 : 0 };
      }
      if (type === "counter" && delta !== undefined) {
        return { ...prev, [id]: Math.max(0, Math.min(current + delta, 12)) };
      }
      return prev;
    });
  };

  const allServices = [...addonsList, ...aLaCarteServices];

  const getItemEffectivePrice = (itemId: string, qty: number) => {
    const item = allServices.find(s => s.id === itemId);
    if (!item) return 0;
    if (itemId === 'alc-maint' && qty >= 6) {
      // Logika 400.000 per 6 bulan = 66.666,6 per bulan
      return Math.round(qty * (400000 / 6));
    }
    return qty * item.price;
  };

  const totalAddonPrice = allServices.reduce((sum, item) => {
    return sum + getItemEffectivePrice(item.id, addonState[item.id] || 0);
  }, 0);

  const selectedPlan = plans.find(p => p.id === selectedPlanId) || redesignPlans.find(p => p.id === selectedPlanId);
  const selectedPlanPrice = selectedPlan ? selectedPlan.basePromoPrice : 0;
  const grandTotal = selectedPlanPrice + totalAddonPrice;

  const activeAddons = allServices.filter(a => (addonState[a.id] || 0) > 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace("Rp", "Rp ");
  };

  const buildWhatsAppMessage = () => {
    if (!selectedPlan && activeAddons.length === 0) return "#cta";
    let msg = "";
    if (selectedPlan) {
      msg = `Halo, saya tertarik dengan ${selectedPlan.name} (${formatPrice(selectedPlan.basePromoPrice)})`;
    } else {
      msg = `Halo, saya tertarik memesan layanan kustom (A La Carte)`;
    }

    if (activeAddons.length > 0) {
      msg += `\n\nLayanan/Fitur Tambahan:`;
      activeAddons.forEach(a => {
        const qty = addonState[a.id];
        msg += `\n- ${a.name}${qty > 1 && a.type === "counter" ? ` (${qty} ${a.unit?.replace('/', '').trim()})` : ""}: ${formatPrice(getItemEffectivePrice(a.id, qty))}`;
      });
    }
    msg += `\n\nTotal Estimasi: ${formatPrice(grandTotal)}`;
    return `https://wa.me/6281383521750?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="pricing" className="py-24 bg-light-grey relative min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* HEADER & TABS TOGGLE */}
        <div className="text-center mb-10">
          <span className="text-sm font-bold tracking-[0.2em] text-accent-orange uppercase mb-4 block">
            Harga Transparan
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-primary-navy mb-8 tracking-tight">
            Investasi Terjangkau,<br className="hidden md:block" />
            <span className="italic font-serif font-light text-gray-500">Hasil Memukau.</span>
          </h2>


        </div>

        {/* --- DYNAMIC SECTION BY TAB --- */}
        <div className="min-h-[400px] relative mt-12">
          {/* TAB TARGET: PAKET BUNDLING (Now Static) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 items-stretch gap-8 max-w-6xl mx-auto mb-24"
          >
            {plans.map((plan, idx) => {
              const finalPrice = plan.basePromoPrice + totalAddonPrice;
              const priceLabel = plan.isCustom ? `Mulai ${formatPrice(finalPrice)}` : formatPrice(finalPrice);
              const isSelected = selectedPlanId === plan.id;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`flex flex-col rounded-[2rem] p-6 lg:p-8 relative transition-all duration-300 cursor-pointer
                      ${plan.popular && !isSelected ? 'bg-white shadow-[0_20px_50px_-15px_rgba(0,229,255,0.2)] border-2 border-[#00E5FF] scale-100 lg:scale-[1.03] z-10' : ''}
                      ${!plan.popular && !isSelected ? 'bg-white shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)] border border-gray-100 hover:border-gray-300' : ''}
                      ${isSelected ? 'bg-primary-navy shadow-[0_25px_50px_-10px_rgba(28,39,51,0.4)] border-2 border-accent-orange scale-[1.02] z-20' : ''}
                    `}
                >
                  {plan.popular && !isSelected && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-400 to-[#00E5FF] text-primary-navy text-xs font-black px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 uppercase tracking-widest whitespace-nowrap">
                      <Star size={12} fill="currentColor" /> Best Value
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-orange text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 uppercase tracking-widest whitespace-nowrap">
                      <Check size={12} strokeWidth={3} /> Dipilih
                    </div>
                  )}

                  <div className={`mb-6 text-center border-b pb-6 ${isSelected ? 'border-white/10' : 'border-gray-100'}`}>
                    <div className={`text-xs font-black tracking-widest uppercase mb-2 ${isSelected ? 'text-accent-orange' : 'text-gray-400'}`}>{plan.status}</div>
                    <h3 className={`text-2xl font-black mb-1 ${isSelected ? 'text-white' : 'text-primary-navy'}`}>{plan.name}</h3>
                    <p className={`text-xs font-medium mb-6 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>{plan.subtitle}</p>

                    <div className="flex flex-col items-center justify-center min-h-[80px]">
                      <span className={`text-sm line-through decoration-gray-300 mb-1 font-medium italic ${isSelected ? 'text-gray-400' : 'text-gray-400'}`}>
                        {plan.normalPrice}
                      </span>
                      <span className={`text-3xl lg:text-4xl font-black tracking-tighter ${isSelected ? 'text-accent-orange' : 'text-primary-navy'}`}>
                        {priceLabel}
                      </span>
                    </div>

                    <div className={`mt-4 text-[10px] font-bold py-1.5 px-3 rounded-lg inline-block uppercase tracking-wider ${isSelected ? 'bg-white/10 text-green-300' : 'bg-green-50 text-green-600'}`}>
                      {plan.mainBenefit}
                    </div>
                  </div>

                  <div className="mb-6 space-y-3 flex-grow">
                    {plan.specs.map((spec, i) => (
                      <div key={i} className={`flex flex-col border-b pb-2 ${isSelected ? 'border-white/5' : 'border-gray-50'}`}>
                        <span className={`text-[10px] font-bold uppercase ${isSelected ? 'text-gray-400' : 'text-gray-400'}`}>{spec.label}</span>
                        <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-primary-navy'}`}>{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  <ul className={`mb-8 space-y-3 border-t pt-4 ${isSelected ? 'border-white/10' : 'border-gray-50'}`}>
                    {plan.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-medium">
                        <Check size={16} strokeWidth={3} className="text-accent-orange mt-0.5 shrink-0" />
                        <span className={`leading-tight ${isSelected ? 'text-gray-200' : 'text-gray-600'}`}>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-2 flex flex-col gap-2">
                    <div
                      className={`w-full py-3.5 text-center font-black rounded-xl text-sm uppercase tracking-wide flex items-center justify-center gap-2
                          ${isSelected
                          ? 'bg-accent-orange text-white'
                          : plan.popular
                            ? 'bg-gradient-to-r from-[#00E5FF] to-teal-400 text-primary-navy'
                            : 'bg-primary-navy text-white'
                        }`}
                    >
                      {isSelected ? <><Check size={16} /> Paket Terpilih</> : 'Pilih Paket Ini'}
                    </div>
                    {isSelected && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedPlanId(null); }}
                        className="text-[10px] font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest text-center"
                      >
                        [ Batal Pilih ]
                      </button>
                    )}
                    <p className="text-[10px] text-gray-400 text-center mt-1 font-medium px-2 leading-tight">
                      *Promo berlaku untuk <span className="font-bold text-accent-orange">5 klien pertama</span> bulan ini.
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>


        {/* SECONDARY: REDESIGN + CHECKOUT */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8 max-w-6xl mx-auto pt-10 border-t border-gray-200">

          {/* LEFT: REDESIGN */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            {/* Redesign Hero Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-8 md:p-10 rounded-[2.5rem] bg-white border border-white shadow-2xl shadow-primary-navy/5 overflow-hidden"
            >
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-orange/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-navy/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 mb-6 bg-accent-orange/10 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-accent-orange" />
                  <span className="text-[10px] font-extrabold tracking-[0.2em] text-accent-orange uppercase">WUUS Transformation</span>
                </div>

                <h3 className="text-3xl md:text-5xl font-black text-primary-navy leading-[1.1] mb-6 tracking-tight">
                  Website Anda Terasa <br className="hidden sm:block" />
                  <span className="text-accent-orange">Lambat</span> & <span className="font-serif italic font-light text-gray-400">Ketinggalan Zaman?</span>
                </h3>

                <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl">
                  Jangan biarkan wajah digital yang kurang maksimal menghambat potensi bisnis Anda. Kami bantu transformasikan website lama menjadi <span className="font-bold text-primary-navy underline decoration-accent-orange/30 decoration-4 underline-offset-4">mesin pertumbuhan</span> yang segar, modern, dan super ringan.
                </p>
              </div>
            </motion.div>

            {/* Redesign Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {redesignPlans.map((rd, idx) => (
                <motion.div
                  key={rd.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:border-accent-orange/20 hover:-translate-y-2 transition-all duration-500 flex flex-col group"
                >
                  <div className="mb-6">
                    <div className="text-[10px] font-black tracking-widest uppercase text-accent-orange mb-2 bg-accent-orange/5 px-3 py-1 rounded-lg inline-block">{rd.subtitle}</div>
                    <h4 className="text-2xl font-black text-primary-navy group-hover:text-accent-orange transition-colors">{rd.name}</h4>
                    <p className="text-xs text-gray-400 mt-2 italic font-medium">{rd.target}</p>
                  </div>

                  <div className="mb-6 p-4 bg-light-grey rounded-2xl border border-gray-50 flex flex-col">
                    <span className="text-xs text-gray-400 line-through decoration-gray-300 font-medium italic block mb-1">{rd.normalPrice}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-primary-navy">{formatPrice(rd.basePromoPrice)}</span>
                    </div>
                  </div>

                  <div className="bg-light-grey p-4 rounded-xl mb-6 space-y-3">
                    <div className="text-xs">
                      <span className="font-bold text-primary-navy block">Yang Dikerjakan:</span>
                      <span className="text-gray-600">{rd.scope}</span>
                    </div>
                    <div className="text-xs">
                      <span className="font-bold text-primary-navy block">Hasil yang Didapat:</span>
                      <span className="text-gray-600">{rd.optimasi}</span>
                    </div>
                    <div className="text-xs">
                      <span className="font-bold text-primary-navy block">Revisi:</span>
                      <span className="text-gray-600 font-medium">{rd.revisi}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 bg-off-white p-5 rounded-2xl border border-dashed border-gray-200">
                    {rd.highlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-3 text-[11px] text-gray-600 font-medium">
                        <Check size={14} className="text-accent-orange shrink-0 mt-0.5" />
                        <span className="leading-snug">{hl}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setSelectedPlanId(rd.id);
                        document.getElementById('checkout-card')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`flex items-center justify-center gap-2 w-full py-4 text-center font-bold rounded-2xl transition-all duration-300 text-xs uppercase tracking-widest shadow-lg
                          ${selectedPlanId === rd.id
                          ? 'bg-accent-orange text-white shadow-accent-orange/30'
                          : 'bg-primary-navy text-white hover:bg-accent-orange shadow-primary-navy/10 hover:shadow-accent-orange/30'
                        } `}
                    >
                      {selectedPlanId === rd.id ? <><Check size={14} /> Paket Terpilih</> : <>Redesain Sekarang <ChevronRight size={14} /></>}
                    </button>
                    {selectedPlanId === rd.id && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedPlanId(null); }}
                        className="text-[10px] font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest text-center"
                      >
                        [ Batal Pilih ]
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>


          {/* RIGHT: FEATURE ADDONS + CHECKOUT */}
          <div id="checkout-card" className="w-full lg:w-1/3 flex flex-col">
            <div className="bg-primary-navy rounded-[2rem] p-6 lg:p-8 shadow-2xl flex flex-col border border-secondary-blue relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-secondary-blue rounded-full blur-[60px] pointer-events-none opacity-50" />

              <div className="relative z-10 mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Ekstra Fitur Website</h3>
                <p className="text-xs text-gray-300">Tambahkan fitur ini jika Anda merasa paket utama masih ada yang kurang.</p>
              </div>

              <div className="relative z-10 flex flex-col gap-4 flex-grow mb-6">
                {addonsList.map((addon) => {
                  const qty = addonState[addon.id] || 0;
                  const isSelected = qty > 0;

                  return (
                    <div key={addon.id} className={`p-4 rounded-xl border transition-all duration-300
                      ${isSelected ? 'bg-secondary-blue/80 border-accent-orange shadow-lg' : 'bg-white/5 border-white/10 hover:bg-white/10'}
                `}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <div className="text-accent-orange">{addon.icon}</div>
                          <span className={`font-bold text-xs ${isSelected ? 'text-white' : 'text-gray-300'} `}>{addon.name}</span>
                        </div>
                        {addon.type === "toggle" && (
                          <button
                            onClick={() => updateAddon(addon.id, "toggle")}
                            className={`w-10 h-5 rounded-full relative transition-colors flex-shrink-0 ${isSelected ? 'bg-accent-orange' : 'bg-gray-600'} `}
                            aria-label={`Aktifkan ${addon.name} `}
                            aria-pressed={isSelected}
                          >
                            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${isSelected ? 'translate-x-5' : ''} `} />
                          </button>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-accent-orange font-bold">
                          +{formatPrice(addon.price)} {addon.unit || ''}
                        </span>

                        {addon.type === "counter" && (
                          <div className="flex items-center gap-3 bg-primary-navy border border-gray-600 rounded-lg px-2 py-1">
                            <button
                              onClick={() => updateAddon(addon.id, "counter", -1)}
                              className={`text-gray-400 hover:text-white transition-colors ${qty === 0 ? 'opacity-30 cursor-not-allowed' : ''} `}
                              disabled={qty === 0}
                              aria-label={`Kurangi jumlah ${addon.name} `}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-white text-xs font-black w-4 text-center" aria-live="polite">{qty}</span>
                            <button
                              onClick={() => updateAddon(addon.id, "counter", 1)}
                              className="text-gray-400 hover:text-white transition-colors"
                              aria-label={`Tambah jumlah ${addon.name} `}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CHECKOUT SUMMARY */}
              <div className="relative z-10 pt-6 border-t border-white/10 mt-auto">
                <div className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-4">Ringkasan Pesanan</div>

                {/* Selected plan or A la carte */}
                {selectedPlan ? (
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-white text-xs font-bold block">{selectedPlan.name}</span>
                      <span className="text-gray-400 text-[10px]">{selectedPlan.subtitle}</span>
                    </div>
                    <span className="text-white text-xs font-bold shrink-0 ml-4">{formatPrice(selectedPlan.basePromoPrice)}</span>
                  </div>
                ) : activeAddons.length > 0 ? (
                  <div className="flex items-center gap-2 mb-4 text-accent-orange text-xs font-bold border border-accent-orange/20 bg-accent-orange/5 p-2 rounded-lg">
                    <Check size={14} /> Menyusun Paket Custom (A La Carte)
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mb-4 text-gray-500 text-xs italic">
                    <ChevronRight size={14} /> Belum ada paket dipilih
                  </div>
                )}

                {/* Active addons list */}
                {activeAddons.length > 0 && (
                  <div className="mb-4 mt-3 space-y-2">
                    {activeAddons.map(a => {
                      const qty = addonState[a.id];
                      const effectivePrice = getItemEffectivePrice(a.id, qty);
                      const standardPrice = a.price * qty;
                      const savings = standardPrice - effectivePrice;

                      return (
                        <div key={a.id} className="flex flex-col gap-1">
                          <div className="flex justify-between items-start text-[10px] text-gray-300">
                            <span className="pr-2 leading-relaxed">+ {a.name}{qty > 1 && a.type === "counter" ? ` (${qty} ${a.unit?.replace('/', '').trim()})` : ""}</span>
                            <span className="text-accent-orange font-bold shrink-0">{formatPrice(effectivePrice)}</span>
                          </div>
                          {savings > 0 && (
                            <div className="flex justify-start">
                              <span className="bg-green-500/20 text-green-400 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">
                                Hemat {formatPrice(savings)} (Bulk Price Applied)
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Grand Total */}
                <div className={`flex justify-between items-center py-3 mb-4 ${(selectedPlan || activeAddons.length > 0) ? 'border-t border-white/10 mt-4' : ''} `}>
                  <span className="text-gray-300 text-xs font-medium">Total Estimasi</span>
                  <span className={`font-black text-xl ${grandTotal > 0 ? 'text-white' : 'text-gray-600'} `}>
                    {grandTotal > 0 ? formatPrice(grandTotal) : "—"}
                  </span>
                </div>

                {/* CTA Button */}
                <a
                  href={buildWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-wide flex items-center justify-center gap-3 transition-all duration-300
                    ${(selectedPlanId || activeAddons.length > 0)
                      ? 'bg-accent-orange text-white hover:bg-amber-400 shadow-[0_10px_20px_-5px_rgba(245,158,11,0.5)] hover:shadow-[0_15px_30px_-5px_rgba(245,158,11,0.6)] hover:-translate-y-1'
                      : 'bg-white/10 text-gray-500 cursor-not-allowed'
                    } `}
                  onClick={(e) => { if (!selectedPlanId && activeAddons.length === 0) e.preventDefault(); }}
                >
                  <MessageCircle size={18} />
                  Diskusikan Sekarang
                </a>
                {!(selectedPlanId || activeAddons.length > 0) && (
                  <p className="text-[10px] text-gray-500 text-center mt-2 italic">Pilih layanan di atas terlebih dahulu</p>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
