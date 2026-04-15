"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Check, Info } from "lucide-react";

export function RoiCalculator() {
  const [monthlyCustomers, setMonthlyCustomers] = useState<number>(50);
  const [avgTransaction, setAvgTransaction] = useState<number>(50000);

  const estimatedGrowthRate = 0.20;
  const currentRevenue = monthlyCustomers * avgTransaction;
  const potentialNewRevenue = currentRevenue * estimatedGrowthRate;

  const websiteCost = 1500000;
  const monthsToROI = websiteCost / potentialNewRevenue;

  const formatIDR = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <section id="roi" className="py-48 bg-light-grey relative z-0 border-t border-gray-200 overflow-hidden">

      {/* Navy right background — outside container so left-1/2 = viewport center */}
      {/* Extends to right-0 so the card can be perfectly centered inside via justify-center */}
      <div
        className="absolute top-0 bottom-0 bg-primary-navy hidden lg:block z-0"
        style={{ left: '50%', right: '0' }}
      />      {/* LEFT: Text content — inside container, occupies left half */}
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="lg:w-1/2 lg:pr-16 py-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-primary-navy font-bold text-[10px] uppercase tracking-widest mb-6 rounded-sm">
              <Calculator size={14} className="text-accent-orange" />
              <span>Bisnis Dashboard</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary-navy mb-6 tracking-tight leading-tight">
              Website yang Tepat<br /> <span className="font-serif italic text-accent-orange font-light">Adalah Investasi Jangka Panjang.</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Simulasikan bagaimana website yang dirancang dengan tepat dapat meningkatkan kepercayaan dan konversi bisnis Anda.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Meningkatkan Kepercayaan Pelanggan",
                "Buka 24/7 Tanpa Operasional Staf",
                "Membangun Citra yang Lebih Kredibel"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-accent-orange flex items-center justify-center text-white">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* RIGHT: Card — absolutely centered in the exact right 50% of viewport */}
      <div
        className="absolute inset-y-0 hidden lg:flex items-center justify-center z-10 px-10 py-12"
        style={{ left: '50%', right: '0' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] relative overflow-hidden group transition-all duration-500 hover:shadow-[0_40px_100px_rgba(0,0,0,0.6),0_0_60px_rgba(245,158,11,0.15)] hover:-translate-y-2 w-full max-w-[480px]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-accent-orange/10 flex items-center justify-center">
              <Calculator size={18} className="text-accent-orange" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Simulasi Bisnis</p>
              <p className="text-sm font-bold text-primary-navy">Hitung Potensi Keuntungan Anda</p>
            </div>
          </div>

          {/* Slider 1 */}
          <div className="mb-8 relative z-10">
            <div className="flex justify-between items-end mb-3">
              <label htmlFor="monthly-customers" className="block text-xs font-black text-gray-400 uppercase tracking-widest">
                Estimasi Pelanggan / Bulan
              </label>
              <span className="text-3xl font-black text-primary-navy tracking-tighter">{monthlyCustomers}</span>
            </div>
            <input
              id="monthly-customers"
              type="range"
              min="10"
              max="500"
              step="10"
              value={monthlyCustomers}
              onChange={(e) => setMonthlyCustomers(Number(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-accent-orange"
              aria-label="Jumlah pelanggan rata-rata per bulan"
            />
          </div>

          {/* Slider 2 */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-3">
              <label htmlFor="avg-transaction" className="block text-xs font-black text-gray-400 uppercase tracking-widest">
                Rata-rata Transaksi
              </label>
              <span className="text-3xl font-black text-primary-navy tracking-tighter">{formatIDR(avgTransaction)}</span>
            </div>
            <input
              id="avg-transaction"
              type="range"
              min="10000"
              max="500000"
              step="10000"
              value={avgTransaction}
              onChange={(e) => setAvgTransaction(Number(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-accent-orange"
              aria-label="Rata-rata nilai transaksi"
            />
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gray-100 my-6" />

          {/* Result box */}
          <div className="bg-primary-navy rounded-2xl p-6 md:p-8 mb-6 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent-orange/20 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-2 text-[10px] font-black uppercase tracking-widest text-white/40">
                <span>Proyeksi Tambahan Omzet (20%)</span>
                <Info size={14} className="text-white/20" />
              </div>
              <div className="text-4xl md:text-5xl font-black text-accent-orange mb-6 flex items-baseline gap-2 tracking-tighter">
                {formatIDR(potentialNewRevenue)} <span className="text-xs font-bold text-white/40 tracking-normal">/ bln</span>
              </div>
              <div className="w-full h-px bg-white/10 my-5" />
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white/50 uppercase tracking-widest text-[10px]">Estimasi Balik Modal</span>
                <span className="font-black text-white flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <TrendingUp size={14} className="text-accent-orange" /> {monthsToROI < 1 ? "< 1 Bulan" : `${Math.ceil(monthsToROI)} Bulan`}
                </span>
              </div>
            </div>
          </div>

          <p className="text-[10px] uppercase tracking-widest font-bold text-center text-gray-300">
            Data berbasis simulasi konversi
          </p>
        </motion.div>
      </div>

      {/* MOBILE: Stacked layout */}
      <div className="lg:hidden container mx-auto px-4 max-w-7xl flex flex-col gap-12 relative z-10 mt-8">
        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-accent-orange/10 flex items-center justify-center">
              <Calculator size={16} className="text-accent-orange" />
            </div>
            <p className="text-sm font-bold text-primary-navy">Hitung Potensi Keuntungan</p>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-end mb-2">
              <label htmlFor="monthly-customers-m" className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pelanggan / Bulan</label>
              <span className="text-2xl font-black text-primary-navy">{monthlyCustomers}</span>
            </div>
            <input id="monthly-customers-m" type="range" min="10" max="500" step="10" value={monthlyCustomers} onChange={(e) => setMonthlyCustomers(Number(e.target.value))} className="w-full h-1 bg-gray-200 appearance-none cursor-pointer accent-accent-orange" />
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-end mb-2">
              <label htmlFor="avg-transaction-m" className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rata-rata Transaksi</label>
              <span className="text-2xl font-black text-primary-navy">{formatIDR(avgTransaction)}</span>
            </div>
            <input id="avg-transaction-m" type="range" min="10000" max="500000" step="10000" value={avgTransaction} onChange={(e) => setAvgTransaction(Number(e.target.value))} className="w-full h-1 bg-gray-200 appearance-none cursor-pointer accent-accent-orange" />
          </div>
          <div className="bg-primary-navy rounded-xl p-5">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Proyeksi Omzet Tambahan</p>
            <p className="text-3xl font-black text-accent-orange">{formatIDR(potentialNewRevenue)}<span className="text-xs text-white/40 ml-1">/ bln</span></p>
            <div className="w-full h-px bg-white/10 my-3" />
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Balik Modal</span>
              <span className="text-sm font-black text-white">{monthsToROI < 1 ? "< 1 Bulan" : `${Math.ceil(monthsToROI)} Bulan`}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
