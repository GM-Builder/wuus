import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/shell";
import s from "@/components/marketing/marketing.module.css";

export const metadata: Metadata = {
  title: "Privacy information | WUUS Hospitality",
  description:
    "How WUUS uses website review requests and project contact information.",
  alternates: { canonical: "https://webuntukusaha.com/hospitality/privacy" },
};

export default function HospitalityPrivacyPage() {
  return (
    <MarketingShell>
      <main id="main" className={`${s.container} ${s.legal}`}>
        <div className="space-y-8 leading-relaxed">
          <Link href="/hospitality" className="underline">
            ← WUUS Hospitality
          </Link>
          <div>
            <h1 className="text-3xl font-bold mb-3">Privacy information</h1>
            <p>Updated 8 October 2026</p>
          </div>
          <section className="space-y-3">
            <h2 className="text-lg font-bold">Who handles your request</h2>
            <p>
              WUUS is an independent web design studio based in Jakarta,
              Indonesia. Contact{" "}
              <a className="underline" href="mailto:hallo@webuntukusaha.com">
                hallo@webuntukusaha.com
              </a>{" "}
              about this notice or your information.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-bold">Information you submit</h2>
            <p>
              The review forms collect your property name, online link, name,
              email, message and request type so WUUS can reply, prepare a
              review and discuss a project. We also record the request ID,
              submission source, time and version of your consent statement.
              Please do not include guest records, passwords, payment card
              details or identity documents.
            </p>
            <p>
              We use a keyed hash of the network address to limit repeated
              submissions. This limit information is separate from your inquiry.
              Hosting providers may process technical request logs for operating
              and securing the website.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-bold">Services used</h2>
            <p>
              The website currently uses Vercel for hosting, Supabase for
              inquiry storage and owner sign-in, Resend for owner inquiry
              notifications, and Vercel Analytics and Speed Insights for website
              performance and traffic information. Replies are sent through the
              owner&apos;s business email account. Project/payment providers and
              any additional data processing are specified before a paid project
              begins.
            </p>
            <p>
              WUUS handles requests in Indonesia. Provider infrastructure can be
              outside your country. Contact us for the provider and project
              arrangements relevant to your request.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-bold">Retention and requests</h2>
            <p>
              Our operational policy is to review and remove inactive prospect
              inquiries after 90 days. Active project correspondence and records
              needed for accounting are kept for the applicable project and
              recordkeeping period. Network limit records are cleared during
              routine maintenance after they are no longer needed.
            </p>
            <p>
              You can ask for a copy, correction or deletion of your inquiry, or
              ask us to stop contacting you. Email WUUS using the address above.
              We will check the request and explain any records that must be
              retained.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-bold">AI demonstrations</h2>
            <p>
              The hospitality chat examples display prepared responses. They do
              not send your messages to a live AI provider. Live AI services and
              credit purchases are currently unavailable.
            </p>
          </section>
          <Link href="/hospitality/terms" className="underline">
            Project terms
          </Link>
        </div>
      </main>
    </MarketingShell>
  );
}
