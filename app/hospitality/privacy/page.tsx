import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShieldCheck, Mail, PhoneCall } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & AI Transparency Disclosure - WUUS',
  description: 'Privacy policy, GDPR compliance, and AI transparency disclosure for WUUS websites and hospitality digital services.',
  alternates: {
    canonical: 'https://www.webuntukusaha.com/hospitality/privacy',
  },
};

export default function HospitalityPrivacyPage() {
  const lastUpdated = '1 October 2026';

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
            <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>GDPR & AI Transparency</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#1C2733] mb-3">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Policy Sections (Section G1) */}
        <div className="space-y-10 text-xs sm:text-sm leading-relaxed text-slate-700">
          
          {/* 1. Who I am */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#1C2733]">1. Who I am</h2>
            <p>
              WUUS is operated by Faisal Alfarizi, based in Jakarta, Indonesia. Contact: <a href="mailto:faisalalfarizi@webuntukusaha.com" className="text-[#1C2733] underline font-medium">faisalalfarizi@webuntukusaha.com</a>.
            </p>
            <p>
              For the data described in sections 2 to 6 (website visitors and people who contact me), I am the &quot;controller&quot;. For guest data processed through the AI assistant on a hotel&apos;s website, the hotel is the controller and I act as its &quot;processor&quot; (see section 8).
            </p>
          </section>

          {/* 2. What data I collect and why */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#1C2733]">2. What data I collect and why</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-slate-200 rounded-lg overflow-hidden text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-800">
                  <tr>
                    <th className="p-3">Data</th>
                    <th className="p-3">Why</th>
                    <th className="p-3">Legal basis (GDPR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-medium">Hotel name, link, your name, role, email, message (review form)</td>
                    <td className="p-3 text-slate-600">To reply to your request and send the review</td>
                    <td className="p-3 text-slate-600">Steps at your request before a contract (Art. 6(1)(b))</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Business contact details found on public listings (cold email)</td>
                    <td className="p-3 text-slate-600">To contact you about my service</td>
                    <td className="p-3 text-slate-600">Legitimate interest (Art. 6(1)(f)): contacting businesses about relevant services</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Technical data (IP address, browser, pages visited)</td>
                    <td className="p-3 text-slate-600">To run, secure, and improve the site</td>
                    <td className="p-3 text-slate-600">Legitimate interest (Art. 6(1)(f))</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Project data for clients (content, photos, access details)</td>
                    <td className="p-3 text-slate-600">To deliver the agreed project</td>
                    <td className="p-3 text-slate-600">Contract (Art. 6(1)(b))</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Where your data came from */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#1C2733]">3. Where your data came from (cold outreach)</h2>
            <p>
              If I contacted you first, I found your business contact details on your hotel&apos;s publicly accessible website, Booking.com listing, Instagram profile, or Google Business profile. You can ask me to stop and delete your details at any time by replying &quot;stop&quot; or writing to <a href="mailto:faisalalfarizi@webuntukusaha.com" className="text-[#1C2733] underline font-medium">faisalalfarizi@webuntukusaha.com</a>.
            </p>
          </section>

          {/* 4. Who receives your data */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#1C2733]">4. Who receives your data</h2>
            <p>I rely on trusted service providers to run this website and communicate:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Hosting & Edge CDN:</strong> Vercel Inc. (USA / Global Network)</li>
              <li><strong>Database:</strong> Supabase Inc. (Encrypted cloud infrastructure)</li>
              <li><strong>Email:</strong> Google Workspace</li>
              <li><strong>Payment & Invoicing:</strong> Wise Payments Limited (UK / EEA regulated payment institution)</li>
            </ul>
          </section>

          {/* 5. Transfers outside the EU/EEA */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#1C2733]">5. Transfers outside the EU/EEA</h2>
            <p>
              I am based in Indonesia and some service providers have servers located outside the EU/EEA. Where required, I use standard safeguards such as EU Standard Contractual Clauses (SCCs) and end-to-end transport layer encryption (TLS 1.3).
            </p>
          </section>

          {/* 6. How long I keep data */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#1C2733]">6. How long I keep data</h2>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Review requests with no follow-up:</strong> Retained for up to 12 months, then permanently deleted.</li>
              <li><strong>Clients:</strong> For the duration of the project agreement and as required by standard accounting/tax law.</li>
              <li><strong>Cold outreach data:</strong> Until you object, or 12 months without reply.</li>
            </ul>
          </section>

          {/* 7. Your rights */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#1C2733]">7. Your rights</h2>
            <p>
              Under the GDPR and relevant privacy legislation, you have the right to request access, correction, deletion, restriction, and portability of your personal data, and to object to processing based on legitimate interest. To exercise any right, email <a href="mailto:faisalalfarizi@webuntukusaha.com" className="text-[#1C2733] underline font-medium">faisalalfarizi@webuntukusaha.com</a>. You also have the right to lodge a complaint with your local data protection authority.
            </p>
          </section>

          {/* 8. AI assistant */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#1C2733]">8. AI assistant</h2>
            <p>
              If a hotel uses my optional AI assistant on its website, the hotel decides what happens with the chat data. I process it only on the hotel&apos;s written instructions. Chats are processed by language model API providers as sub-processors under strict data confidentiality terms.
            </p>
            <p>
              Guests are always told in the interface that they are speaking with an automated AI assistant. Guests are asked not to share payment card, passport, or identification numbers in the chat window.
            </p>
          </section>

          {/* 9. Cookies and analytics */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#1C2733]">9. Cookies and analytics</h2>
            <p>
              This website does not load cross-site advertising cookies, invasive marketing pixels, or third-party behavioral profiling trackers. Only essential technical cookies and anonymized traffic metrics are used.
            </p>
          </section>

          {/* 10. Changes */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#1C2733]">10. Changes</h2>
            <p>
              I will update this page whenever practices change, and update the &quot;Last updated&quot; date at the top of this policy.
            </p>
          </section>

          {/* 11. Contact */}
          <section className="space-y-3 pt-6 border-t border-slate-200">
            <h2 className="text-base sm:text-lg font-bold text-[#1C2733]">11. Contact</h2>
            <div className="bg-[#F8F9FA] rounded-xl p-5 border border-slate-200 space-y-2 text-xs">
              <p><strong>Operator:</strong> Faisal Alfarizi (WUUS)</p>
              <p><strong>Location:</strong> Jakarta, Indonesia</p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>Email: <a href="mailto:faisalalfarizi@webuntukusaha.com" className="underline">faisalalfarizi@webuntukusaha.com</a></span>
              </p>
              <p className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
                <span>WhatsApp & Viber: +62 813-8352-1750</span>
              </p>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 px-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} WUUS. Jakarta, Indonesia.</p>
      </footer>
    </div>
  );
}
