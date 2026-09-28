"use client";

import { motion } from "framer-motion";
import { Zap, Bot, ShieldCheck, CreditCard, Sparkles, Layers, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const bentoItems = [
  {
    id: "direct-booking",
    colSpan: "lg:col-span-8",
    badge: "Hospitality Practice",
    title: "Direct Booking Engine & OTA Commission Defense",
    description: "Break your reliance on Booking.com & Airbnb. We engineer lightning-fast direct reservation flows that keep 100% of room revenue in your bank account.",
    highlights: ["Sub-800ms Edge load time", "Zero OTA commission leakage", "Instant mobile confirmation"],
    metric: "18% – 25%",
    metricLabel: "Average commission saved per reservation",
    linkText: "Explore Hospitality Practice",
    linkHref: "/hospitality"
  },
  {
    id: "ai-concierge",
    colSpan: "lg:col-span-4",
    badge: "24/7 AI System",
    title: "Grounded AI Guest Concierge",
    description: "An autonomous digital host answering guest inquiries in 20+ languages in 1.2 seconds, strictly grounded in your hotel handbook with zero hallucinations.",
    highlights: ["24+ European languages", "Instant WhatsApp escalation", "Zero operational bottleneck"],
    metric: "24/7",
    metricLabel: "Autonomous guest coverage without host fatigue",
    linkText: "Test Live AI Demo",
    linkHref: "/hospitality#ai-concierge"
  },
  {
    id: "performance-architecture",
    colSpan: "lg:col-span-4",
    badge: "Core Engineering",
    title: "Next.js Edge Performance Architecture",
    description: "Engineered on modern React Server Components and global edge CDN caches. No bloated WordPress plugins, no database lag, no security vulnerabilities.",
    highlights: ["Lighthouse 98+ score", "Global edge caching", "Enterprise SSL & DDoS defense"],
    metric: "< 800ms",
    metricLabel: "Time to interactive worldwide",
    linkText: "Review Architecture",
    linkHref: "/inquiries"
  },
  {
    id: "cross-border-settlement",
    colSpan: "lg:col-span-4",
    badge: "Fintech Settlement",
    title: "Frictionless Mayar & SEPA Settlement",
    description: "Built-in cross-border B2B payment rails. Accept instant credit card payments via Mayar or direct European SEPA bank transfers compliant with EU tax accounting.",
    highlights: ["Instant Visa/Mastercard links", "0% VAT cross-border invoicing", "Direct IDR bank settlement"],
    metric: "50 / 50",
    metricLabel: "Milestone-protected payment structure",
    linkText: "Payment Details",
    linkHref: "/inquiries"
  },
  {
    id: "staging-guarantee",
    colSpan: "lg:col-span-4",
    badge: "Risk Reversal",
    title: "Staging-First Quality Guarantee",
    description: "You review and test your complete digital engine on a private staging link on your own phone before paying the final 50% balance. Complete transparency.",
    highlights: ["Private mobile testing link", "Unlimited pre-launch revisions", "Zero risk for client"],
    metric: "100%",
    metricLabel: "Client verification before final release",
    linkText: "Start an Inquiry",
    linkHref: "/inquiries"
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#FAFAFA] border-b border-slate-200/80 relative">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-semibold text-indigo-700 mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Studio Capabilities & Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
            Engineered for Revenue, Speed, and Total Operational Autonomy.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We don’t build generic template websites. We architect high-performance digital infrastructure that eliminates middleman fees, engages international guests 24/7, and builds undeniable corporate trust.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {bentoItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`${item.colSpan} card-enterprise p-7 md:p-9 flex flex-col justify-between group`}
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                    {item.badge}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Highlights List */}
                <ul className="space-y-2 mb-8">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer Metric & Link */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {item.metric}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {item.metricLabel}
                  </div>
                </div>

                <Link
                  href={item.linkHref}
                  className="text-xs font-semibold text-indigo-600 group-hover:text-indigo-700 inline-flex items-center gap-1 transition-colors"
                >
                  <span>{item.linkText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
