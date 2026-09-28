"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Cpu, ShieldCheck, Zap, Globe } from "lucide-react";

const stacks = [
  { name: "Next.js 16", desc: "React Server Components" },
  { name: "Vercel Global CDN", desc: "Sub-800ms Edge Latency" },
  { name: "Supabase DB", desc: "Postgres Realtime Sync" },
  { name: "Mayar Cross-Border", desc: "Instant Card Settlement" },
];

const scores = [
  { label: "Performance", value: 100 },
  { label: "Accessibility", value: 100 },
  { label: "Best Practices", value: 100 },
  { label: "SEO Authority", value: 100 },
];

export function TechAuthority() {
  return (
    <section id="tech" className="py-24 md:py-32 bg-[#090D16] text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Fintech Grid */}
      <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />

      {/* Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-indigo-400 mb-6">
              <Cpu className="w-3.5 h-3.5" />
              <span>Architectural Rigor & Global Edge CDN</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Zero Bloat. Instant Speed. <br />
              <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
                Engineered for Global Trust.
              </span>
            </h2>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8">
              We never deploy on slow, vulnerable legacy platforms. Every client engine is built on modern React Server Components and distributed across 300+ global edge cache locations.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {stacks.map((stack) => (
                <div key={stack.name} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-bold text-white tracking-tight">{stack.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{stack.desc}</div>
                </div>
              ))}
            </div>

            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-slate-300">
                <CheckCircle2 className="text-emerald-400 w-4 h-4 flex-shrink-0" />
                <span>Hosted on Vercel Global Edge Network with 99.99% uptime.</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-300">
                <CheckCircle2 className="text-emerald-400 w-4 h-4 flex-shrink-0" />
                <span>Enterprise SSL & automatic DDoS mitigation by Cloudflare.</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-300">
                <CheckCircle2 className="text-emerald-400 w-4 h-4 flex-shrink-0" />
                <span>Sub-800ms Time-to-First-Byte (TTFB) across Europe & worldwide.</span>
              </li>
            </ul>
          </motion.div>

          {/* Right Performance Scorecard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6"
          >
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-8">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Independent Audit Simulation</div>
                  <div className="text-lg font-bold text-white tracking-tight mt-1">Google Lighthouse Benchmarks</div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Verified 100/100
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {scores.map((score, i) => (
                  <motion.div
                    key={score.label}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-emerald-500/80 flex items-center justify-center bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)] mb-3">
                      <span className="text-xl sm:text-2xl font-extrabold text-emerald-400">{score.value}</span>
                    </div>
                    <span className="text-xs font-medium text-slate-300">
                      {score.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Audited on Chromium Edge Engine</span>
                <span className="text-emerald-400 font-mono">0.72s Total Load</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
