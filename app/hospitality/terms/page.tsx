import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | WUUS Hospitality',
  description: 'Terms and conditions for WUUS independent hotel websites and hospitality design services.',
  alternates: {
    canonical: 'https://www.webuntukusaha.com/hospitality/terms',
  },
};

export default function HospitalityTermsPage() {
  const lastUpdated = '2 October 2026';

  return (
    <div className="min-h-screen bg-white text-[#1C2733] font-sans antialiased selection:bg-[#F59E0B] selection:text-[#1C2733]">
      {/* Top Header */}
      <header className="border-b border-slate-200 py-5 px-6 md:px-12 sticky top-0 bg-white/95 backdrop-blur-xs z-50">
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
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#1C2733] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Hospitality</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        {/* Intro */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold mb-4">
            <FileText className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Client Agreement</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#1C2733] mb-3">
            Terms of Service
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="space-y-10 text-xs sm:text-sm leading-relaxed text-slate-700">
          
          {/* 1. Overview */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#1C2733]">1. Working Together</h2>
            <p>
              I build and maintain independent hotel websites as a solo web developer based in Jakarta, Indonesia. When we agree on a project, you deal directly with me. Every project starts with a written proposal that specifies the exact scope, timeline, and fixed price before any deposit is paid.
            </p>
          </section>

          {/* 2. Scope & What is Not Included */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#1C2733]">2. Scope of Services</h2>
            <p>
              My services include designing, developing, and deploying fast, mobile-friendly websites for independent hotels and guesthouses, along with optional setup of an AI guest assistant for answering common house questions.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <strong className="block text-[#1C2733] font-semibold">What is explicitly not included unless agreed in writing:</strong>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Custom booking engine or online payment processing infrastructure (I connect your direct contact channels such as WhatsApp, email, or third-party reservation links).</li>
                <li>Professional on-site photography or videography (you provide photos of your property).</li>
                <li>Copywriting from scratch (I edit and structure the information you provide).</li>
              </ul>
            </div>
          </section>

          {/* 3. Revisions & Approval */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#1C2733]">3. Revisions & Delivery</h2>
            <p>
              Every standard package includes two rounds of revisions on the private preview link. Additional structural changes or new feature requests beyond the agreed proposal are quoted separately before work begins.
            </p>
            <p>
              Project timelines depend on timely delivery of your house information, room descriptions, and photographs. If materials are delayed by more than 14 days, the scheduled launch date will be adjusted accordingly.
            </p>
          </section>

          {/* 4. Payment & Review Guarantee */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#1C2733]">4. Payment Terms & Guarantee</h2>
            <p>
              Standard payment terms are <strong>50% deposit to commence work</strong> and <strong>50% balance after you review and approve the private preview link</strong>. Invoices are issued in Euros (€) and payable via international SEPA bank transfer (Wise).
            </p>
            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200/90 text-emerald-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#1C2733]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Review before you pay the balance</span>
              </div>
              <p className="text-slate-700 m-0">
                You see the finished site on a private staging link. If it does not match the agreed scope, we fix it. If we cannot reach an agreement, you keep the work delivered to that point and the unpaid balance is cancelled.
              </p>
            </div>
          </section>

          {/* 5. Ownership & Intellectual Property */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#1C2733]">5. Ownership & Code Handover</h2>
            <p>
              Upon receipt of the final payment, you own 100% of your website content, text, and custom code. Full source code is handed over to you or your repository. You are not locked into any proprietary builder or platform. Open-source frameworks and libraries remain under their respective permissive licenses (e.g. MIT).
            </p>
          </section>

          {/* 6. Ongoing Costs & Maintenance */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#1C2733]">6. Hosting, Domains & Assistant Costs</h2>
            <p>
              Standard static hosting deployment (via modern edge platforms like Vercel or Cloudflare) is typically free or low-cost for small hotel traffic. Domain registration fees are paid directly to your chosen domain registrar.
            </p>
            <p>
              For websites using the optional AI guest assistant, language model API consumption after the initial setup period is billed directly at cost by the AI provider (typically €5–€20 per month depending on guest inquiry volume).
            </p>
          </section>

          {/* 7. Case Study Permission */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#1C2733]">7. Portfolio & Case Study</h2>
            <p>
              I take pride in my work, but I respect your privacy. I will only feature your website as a case study in my portfolio if you grant explicit written permission after launch. You may opt out at any time.
            </p>
          </section>

          {/* 8. Governing Law & Dispute Resolution */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#1C2733]">8. Dispute Resolution</h2>
            <p>
              We agree to resolve any questions or concerns through friendly, direct communication first. If a dispute cannot be resolved informally, agreements shall be interpreted under standard international freelance contract principles and resolved through mutual arbitration.
            </p>
          </section>

          {/* Contact */}
          <section className="pt-6 border-t border-slate-200">
            <h2 className="text-base font-bold text-[#1C2733] mb-2">Questions regarding these terms?</h2>
            <p className="text-slate-600">
              Please contact Faisal Alfarizi directly at{' '}
              <a href="mailto:faisalalfarizi@webuntukusaha.com" className="text-[#1C2733] underline hover:text-[#F59E0B]">
                faisalalfarizi@webuntukusaha.com
              </a>{' '}
              or via WhatsApp at{' '}
              <a href="https://wa.me/6281383521750" className="text-[#1C2733] underline hover:text-[#F59E0B]">
                +62 813-8352-1750
              </a>.
            </p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 px-6 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} WUUS. All rights reserved.
      </footer>
    </div>
  );
}
