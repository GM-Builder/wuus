import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShieldCheck, Bot, Database, Lock, Globe, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & AI Transparency Disclosure - WUUS Hospitality',
  description: 'Data privacy, GDPR compliance, and EU AI transparency disclosure for WUUS Hospitality digital services and 24/7 guest concierge systems.',
  alternates: {
    canonical: 'https://www.webuntukusaha.com/hospitality/privacy',
  },
};

export default function HospitalityPrivacyPage() {
  const lastUpdated = 'October 2026';

  return (
    <div className="min-h-screen bg-white text-[#1C2733] font-sans antialiased selection:bg-[#F59E0B] selection:text-[#1C2733]">
      {/* Top Header */}
      <header className="border-b border-slate-200 py-6 px-6 md:px-12 sticky top-0 bg-white/95 backdrop-blur-xs z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/hospitality" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="WUUS Logo"
              width={120}
              height={34}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <Link
            href="/hospitality"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#1C2733] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Hospitality</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Intro */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>EU GDPR & AI Transparency Standard</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#1C2733] mb-4">
            Privacy Policy & AI Disclosure
          </h1>
          <p className="text-slate-500 text-sm">
            Last Updated: {lastUpdated} • Applicable to all WUUS Hospitality web platforms, digital guest systems, and concierge software.
          </p>
        </div>

        {/* Overview Box */}
        <div className="bg-[#F8F9FA] rounded-2xl p-6 md:p-8 mb-12 border border-slate-100">
          <h2 className="text-lg font-bold text-[#1C2733] mb-2">Our Data Commitment to Boutique Hoteliers & Guests</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            WUUS Digital Studio operates under strict principles of data minimization and transparency. We build high-performance, independent digital flagships that give hotel owners 100% data and code sovereignty, avoiding invasive third-party ad trackers or opaque multi-layered cookies.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-10 text-sm leading-relaxed text-slate-700">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-base font-bold text-[#1C2733]">
              <Database className="w-5 h-5 text-[#F59E0B]" />
              <h3>1. Data We Collect & Process</h3>
            </div>
            <p>
              When hoteliers or prospective guests interact with our studio or concierge previews, we only collect essential operational details:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
              <li><strong>Contact Information:</strong> Names, hotel names, business email addresses, and phone numbers submitted voluntarily through inquiry forms.</li>
              <li><strong>Project Specifications:</strong> Website URLs, house rules, and property handbook documents shared explicitly to configure the guest concierge.</li>
              <li><strong>Technical Logs:</strong> Non-identifying HTTP request logs necessary to verify sub-second performance, uptime, and edge network security.</li>
            </ul>
          </section>

          {/* Section 2: EU AI Act Disclosure */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-base font-bold text-[#1C2733]">
              <Bot className="w-5 h-5 text-[#F59E0B]" />
              <h3>2. AI Concierge Transparency (EU AI Act & Consumer Protection)</h3>
            </div>
            <p>
              Our 24/7 Multilingual Guest Concierge operates in full accordance with European artificial intelligence transparency guidelines:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
              <li><strong>Clear Automated Identity:</strong> Guests interacting with the concierge are always informed that they are engaging with an automated AI assistant.</li>
              <li><strong>Property Handbook Grounding:</strong> The model is constrained via Retrieval-Augmented Generation (RAG) strictly to the verified handbook and room specifications provided by the host. It does not invent policies, authorize arbitrary discounts, or access external unverified sources.</li>
              <li><strong>Human Hand-Off at Any Time:</strong> Guests can immediately transfer the conversation to a human host via WhatsApp, Viber, telephone, or email with a single tap.</li>
              <li><strong>No Model Retraining on Guest Inquiries:</strong> Guest conversation logs are never used to train generalized commercial foundation models.</li>
            </ul>
          </section>

          {/* Section 3: GDPR Compliance */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-base font-bold text-[#1C2733]">
              <Lock className="w-5 h-5 text-[#F59E0B]" />
              <h3>3. European GDPR Compliance & Guest Rights</h3>
            </div>
            <p>
              Under the EU General Data Protection Regulation (GDPR) and corresponding Western Balkan data protection legislations, hotel guests and owners retain comprehensive rights:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
              <li><strong>Right of Access & Portability:</strong> You may request a complete export of any data stored by our studio regarding your property or inquiry.</li>
              <li><strong>Right to Erasure (Right to Be Forgotten):</strong> All inquiry submissions or testing records can be permanently deleted upon request.</li>
              <li><strong>Zero Data Monetization:</strong> We never sell, rent, or trade client or guest data to third-party advertisers, data brokers, or OTA aggregators.</li>
            </ul>
          </section>

          {/* Section 4: Hosting & Infrastructure */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-base font-bold text-[#1C2733]">
              <Globe className="w-5 h-5 text-[#F59E0B]" />
              <h3>4. Edge Infrastructure & International Data Transfers</h3>
            </div>
            <p>
              Client web platforms are deployed across globally distributed edge cloud servers (Vercel Edge Network and certified cloud providers) with SSL/TLS 1.3 encryption by default. Invoicing and financial records are processed through Wise Business (regulated Electronic Money Institution in the UK/EEA) under standard European commercial accounting compliance.
            </p>
          </section>

          {/* Section 5: Studio Contact & Data Controller */}
          <section className="space-y-3 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-2.5 text-base font-bold text-[#1C2733]">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h3>5. Contact the Data Controller</h3>
            </div>
            <p className="text-slate-600">
              For any data requests, deletion notices, or questions regarding this policy, please reach out directly:
            </p>
            <div className="bg-[#F8F9FA] rounded-xl p-5 text-xs text-slate-700 space-y-1 font-mono">
              <p><strong>Studio:</strong> WUUS Digital Studio</p>
              <p><strong>Founder & Lead:</strong> Faisal Alfarizi</p>
              <p><strong>Email:</strong> faisalalfarizi@webuntukusaha.com</p>
              <p><strong>Direct Line (WhatsApp & Viber):</strong> +62 813-8352-1750</p>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 px-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} WUUS Digital Studio. Built with clean standards for independent boutique stays.</p>
      </footer>
    </div>
  );
}
