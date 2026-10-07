'use client';

import React, { useRef, useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { requestIdentity, submitInquiry } from '@/lib/inquiry-client';
import { Check, Send } from 'lucide-react';

function ReviewContent() {
  const searchParams = useSearchParams();
  const hotelParam = searchParams.get('h') || '';
  
  // Format hotel name from parameter (e.g., 'hotel-splendid' -> 'Hotel Splendid')
  const formattedHotelName = hotelParam
    ? hotelParam.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : '';

  const [formData, setFormData] = useState({
    hotelName: formattedHotelName,
    onlineLink: '',
    yourName: '',
    email: '',
    notes: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const submission = useRef<{ fingerprint: string; id: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setFormError('');

    try {
      const payload = {
        hotelName: formData.hotelName, websiteUrl: formData.onlineLink, contactName: formData.yourName,
        email: formData.email, notes: formData.notes, consent: formData.consent,
        requestType: 'review' as const, source: 'review' as const, companyWebsite,
      };
      submission.current = requestIdentity(payload, submission.current);
      await submitInquiry({ ...payload, requestId: submission.current.id });
      setFormSubmitted(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Your request could not be saved. Please try again or email Faisal directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div lang="en" className="min-h-screen bg-white text-[#1C2733] font-sans antialiased selection:bg-[#F59E0B] selection:text-[#1C2733]">
      {/* Header */}
      <header className="border-b border-slate-100 py-4 px-6 md:px-12 bg-white sticky top-0 z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/hospitality" className="flex items-center gap-2">
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
            className="text-xs font-semibold text-slate-600 hover:text-[#1C2733] transition-colors"
          >
            See what I build →
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto px-6 py-12 md:py-16">
        
        {/* Title & Introduction */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
            Free 1-Page Mobile Review
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#1C2733] tracking-tight mt-3 mb-3">
            {formattedHotelName 
              ? `A free 1-page review of ${formattedHotelName}'s mobile experience`
              : "A free 1-page review of your hotel's mobile experience"}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
            I look at your hotel on a phone the way a guest from Germany, Italy, or the UK would see it. I send you a one-page visual note within 2 working days. Free, no obligation.
          </p>
        </div>

        {/* What is in the review */}
        <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-slate-200 mb-8 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">What you receive:</h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">1</span>
              <span><strong>3 specific findings:</strong> Mobile loading speed, photo sizes, and how easily guests can check room details.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">2</span>
              <span><strong>Direct enquiry check:</strong> How easy it is for a guest to message you directly on WhatsApp or email instead of leaving for Booking.com.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">3</span>
              <span><strong>One quick fix you can do today:</strong> Something practical you can adjust immediately at no cost.</span>
            </li>
          </ul>
        </div>

        {/* Short Who I am block */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 mb-8 flex items-center gap-4 text-xs text-slate-600">
          <div className="w-11 h-11 rounded-full bg-[#1C2733] text-white flex items-center justify-center font-bold text-xs shrink-0">
            FA
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">Hi, I&apos;m Faisal</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              I design and build websites for independent hotels from Jakarta. I read every request myself and send the review by email. I won&apos;t call you.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200">
          {formSubmitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-[#1C2733] flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-lg font-bold text-[#1C2733]">Thanks, {formData.yourName || "there"}.</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                I&apos;ve received your request for <strong>{formData.hotelName || "your hotel"}</strong>. I&apos;ll inspect your mobile presence and email your one-page note to <strong>{formData.email}</strong> within 2 working days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="hidden" aria-hidden="true">
                <label htmlFor="review-company">Leave this field empty</label>
                <input id="review-company" name="companyWebsite" tabIndex={-1} autoComplete="off" value={companyWebsite} onChange={e => setCompanyWebsite(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#1C2733] mb-1">
                  Hotel name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Villa Kliment"
                  maxLength={160} aria-label="Hotel name" value={formData.hotelName}
                  onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C2733] mb-1">
                  Where can I find your hotel online? *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Website, Booking.com, Instagram, or Google Maps link"
                  maxLength={2048} aria-label="Hotel link" value={formData.onlineLink}
                  onChange={(e) => setFormData({ ...formData, onlineLink: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B]"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  No website yet? Share your Booking.com or Instagram page and I&apos;ll review that instead.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1C2733] mb-1">
                    Your name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena"
                    maxLength={120} aria-label="Your name" value={formData.yourName}
                    onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1C2733] mb-1">
                    Email address for delivery *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@example.com"
                    maxLength={254} aria-label="Email" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C2733] mb-1">
                  Any specific question? (optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Many guests view our listing on phones but we get very few direct inquiries."
                  maxLength={3000} aria-label="Message" value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-[#1C2733] focus:outline-hidden focus:border-[#F59E0B] resize-none"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 accent-[#1C2733]"
                  />
                  <span>
                    I agree that WUUS will use my details to reply to this request, as described in the{' '}
                    <Link href="/hospitality/privacy" className="text-[#1C2733] underline hover:text-[#F59E0B]">
                      Privacy Policy
                    </Link>.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#1C2733] hover:bg-[#F59E0B] hover:text-[#1C2733] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-3"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send my free review request</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {formError && (
                <p role="alert" className="text-sm text-red-700">
                  {formError}{' '}
                  <a href="mailto:faisalalfarizi@webuntukusaha.com" className="underline">Email Faisal directly</a>
                </p>
              )}

              <p className="text-center text-[11px] text-slate-500 mt-2">
                I read every request myself and reply by email. I won&apos;t call you.
              </p>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center text-xs text-slate-500 space-y-2">
          <p>WUUS · Jakarta, Indonesia</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/hospitality/privacy" className="underline hover:text-slate-800">Privacy Policy</Link>
            <Link href="/hospitality" className="underline hover:text-slate-800">Hospitality Practice</Link>
          </div>
        </div>

      </main>
    </div>
  );
}

export default function ReviewLandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-xs text-slate-500">Loading...</div>}>
      <ReviewContent />
    </Suspense>
  );
}
