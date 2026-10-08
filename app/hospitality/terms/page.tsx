import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Project terms | WUUS Hospitality',
  description: 'Scope, revisions, payment milestones and handover for WUUS hotel website projects.',
  alternates: { canonical: 'https://webuntukusaha.com/hospitality/terms' },
};

export default function HospitalityTermsPage() {
  return <main lang="en" className="min-h-screen bg-white text-slate-800 px-6 py-12">
    <div className="max-w-3xl mx-auto space-y-8 text-sm leading-relaxed">
      <Link href="/hospitality" className="underline">← WUUS Hospitality</Link>
      <div><h1 className="text-3xl font-bold mb-3">Project terms</h1><p>Updated 8 October 2026</p></div>
      <section className="space-y-3"><h2 className="text-lg font-bold">Written scope before work starts</h2><p>WUUS provides website design and development from Jakarta, Indonesia. Each project starts with a written proposal covering pages, content, features, price, currency, external costs, estimated schedule, acceptance, cancellation and payment instructions. The proposal identifies the service provider and covers these details before any deposit is paid.</p><p>Current services are website design and development with direct enquiry links. Booking engines, guest payments, translations and live AI assistants are outside the standard website packages. The AI examples are concepts, not a service available to purchase.</p></section>
      <section className="space-y-3"><h2 className="text-lg font-bold">Payment and review</h2><p>The proposed schedule is 50% deposit before production work and 50% after written preview approval, before production launch and source handover. The verified payment method, currency, fees, any applicable taxes and payable total are stated in your proposal/invoice.</p><p>You review a private preview against the agreed scope. If something does not meet that scope, tell us so it can be corrected. Cancellation, work completed and any refund are handled under the written project agreement and applicable obligations.</p></section>
      <section className="space-y-3"><h2 className="text-lg font-bold">Assets, timing and revisions</h2><p>You provide accurate property information and approved text/photos that you have permission to use. The schedule begins after the deposit has cleared and the required assets are complete. Delayed assets or feedback require a revised schedule.</p><p>Two consolidated revision rounds within the agreed scope are included. New pages, languages, features or a changed design direction receive a separate quote and timeline for your written approval.</p></section>
      <section className="space-y-3"><h2 className="text-lg font-bold">Ownership and continuing costs</h2><p>After final payment, we hand over the agreed source code and content. Third-party assets, fonts and libraries retain their own licences. Your domain and production hosting should be held in accounts you control. Commercial hosting, domain renewals, integrations and ongoing maintenance are listed separately in the proposal.</p><p>The standard proposal includes 14 calendar days of support after launch for defects against the agreed scope. New content, new functionality and third-party outages are outside this defect support. Website delivery does not guarantee bookings, revenue or a search ranking.</p></section>
      <section className="space-y-3"><h2 className="text-lg font-bold">Portfolio and contact</h2><p>We request your written permission before presenting the project as a portfolio case study. Questions can be sent to <a className="underline" href="mailto:hallo@webuntukusaha.com">hallo@webuntukusaha.com</a>.</p></section>
      <Link href="/hospitality/privacy" className="underline">Privacy information</Link>
    </div>
  </main>;
}
