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
    <section id="roi" className="py-24 bg-light-grey relative overflow-hidden border-t border-gray-200">
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="flex-1 lg:pr-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-blue text-white font-semibold text-sm mb-6 rounded-sm">
                <Calculator size={16} className="text-accent-orange" />
                <span>Kalkulator ROI</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
                Website adalah <br/> <span className="font-serif italic text-accent-orange">Investasi, bukan Biaya.</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Cari tahu bagaimana website modern dari WUUS bisa meyakinkan calon pelanggan dan meningkatkan konversi penjualan.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Meningkatkan Kepercayaan Pelanggan",
                  "Buka 24/7 Tanpa Operasional Staf",
                  "Terlihat Profesional Layaknya Brand Besar"
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

          <div className="flex-1 w-full max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-primary-navy rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-2xl border-b-8 border-accent-orange text-white"
            >
              <div className="mb-6 md:mb-8">
                <label htmlFor="monthly-customers" className="block text-xs md:text-sm font-bold text-gray-300 mb-3 md:mb-4">
                  Rata-rata Pelanggan per Bulan: <span className="text-white text-base md:text-lg ml-2">{monthlyCustomers}</span>
                </label>
                <input 
                  id="monthly-customers"
                  type="range" 
                  min="10" 
                  max="500" 
                  step="10"
                  value={monthlyCustomers}
                  onChange={(e) => setMonthlyCustomers(Number(e.target.value))}
                  className="w-full h-1.5 md:h-2 bg-secondary-blue rounded-lg appearance-none cursor-pointer accent-accent-orange"
                  aria-label="Jumlah pelanggan rata-rata per bulan"
                />
              </div>

              <div className="mb-6 md:mb-8">
                <label htmlFor="avg-transaction" className="block text-xs md:text-sm font-bold text-gray-300 mb-3 md:mb-4">
                  Rata-rata Transaksi: <span className="text-white text-base md:text-lg ml-2">{formatIDR(avgTransaction)}</span>
                </label>
                <input 
                  id="avg-transaction"
                  type="range" 
                  min="10000" 
                  max="500000" 
                  step="10000"
                  value={avgTransaction}
                  onChange={(e) => setAvgTransaction(Number(e.target.value))}
                  className="w-full h-1.5 md:h-2 bg-secondary-blue rounded-lg appearance-none cursor-pointer accent-accent-orange"
                  aria-label="Rata-rata nilai transaksi"
                />
              </div>

              <div className="bg-secondary-blue rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10 mb-6">
                <div>
                  <div className="flex justify-between items-center mb-1 text-[10px] md:text-sm font-medium text-gray-400">
                    <span>Estimasi Tambahan Omzet</span>
                    <Info size={14} />
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-accent-orange mb-4 flex items-center gap-2">
                    {formatIDR(potentialNewRevenue)} <span className="text-[10px] md:text-sm font-medium text-gray-400">/ bln</span>
                  </div>
                  
                  <div className="w-full h-px bg-white/10 my-4" />
                  
                  <div className="flex justify-between items-center text-[11px] md:text-sm">
                    <span className="font-bold text-gray-300">Estimasi Balik Modal:</span>
                    <span className="font-black text-white flex items-center gap-1 bg-white/10 px-2 md:px-3 py-1 rounded-sm">
                      <TrendingUp size={12} className="text-accent-orange" /> {monthsToROI < 1 ? "< 1 Bln" : `${Math.ceil(monthsToROI)} Bln`}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-center text-gray-400">
                *Asumsi peningkatkan 20% konversi karena tingkat profesionalisme website.
              </p>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
