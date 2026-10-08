"use client";

import { MapPin, PhoneCall, Mail, Globe, ArrowUpRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/90 pt-16 pb-12">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">

          {/* Studio Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="/logo.png"
                alt="WUUS Studio Logo"
                width={130}
                height={36}
                className="h-8 w-auto object-contain"
              />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-l border-slate-200 pl-3">
                Studio
              </span>
            </Link>

            <p className="text-sm text-slate-600 mb-6 max-w-sm leading-relaxed">
              Bespoke digital architecture, direct booking engines, and 24/7 autonomous AI guest concierges engineered for independent European boutique stays and ambitious businesses.
            </p>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Available for Q2/Q3 European Boutique Deployments</span>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">
              Practices & Solutions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/hospitality" className="text-slate-600 hover:text-[#F59E0B] transition-colors font-medium">
                  Hospitality AI Engine
                </Link>
              </li>
              <li>
                <Link href="/hospitality#ai-concierge" className="text-slate-600 hover:text-[#F59E0B] transition-colors">
                  24/7 AI Concierge Demo
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-slate-600 hover:text-[#F59E0B] transition-colors">
                  Direct Booking Architecture
                </Link>
              </li>
              <li>
                <Link href="/#workflow" className="text-slate-600 hover:text-[#F59E0B] transition-colors">
                  Alur Kerja & Kecepatan
                </Link>
              </li>
              <li>
                <Link href="/score-test" className="text-slate-600 hover:text-[#F59E0B] transition-colors">
                  Business Speed & SEO Audit
                </Link>
              </li>
            </ul>
          </div>

          {/* Process & Trust */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">
              Trust & Settlement
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/hospitality#pricing" className="text-slate-600 hover:text-[#F59E0B] transition-colors">
                  Two-Tier Sweet-Spot Pricing
                </Link>
              </li>
              <li>
                <Link href="/inquiries" className="text-slate-600 hover:text-[#F59E0B] transition-colors">
                  Staging-First Guarantee
                </Link>
              </li>
              <li>
                <span className="text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>50/50 Milestone Escrow</span>
                </span>
              </li>
              <li>
                <span className="text-slate-500">Instant Card & Bank Settlement</span>
              </li>
              <li>
                <span className="text-slate-500">European SEPA Bank Wire</span>
              </li>
            </ul>
          </div>

          {/* Contact & Studio Location */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-slate-600">
                <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
                <span>Jakarta Barat, Indonesia <br /><span className="text-xs text-slate-400">Serving Europe & Worldwide</span></span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-600">
                <Mail size={16} className="text-slate-400 shrink-0" />
                <a href="mailto:hallo@webuntukusaha.com" className="hover:text-[#F59E0B] transition-colors">
                  hallo@webuntukusaha.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-slate-600">
                <PhoneCall size={16} className="text-slate-400 shrink-0" />
                <a href="https://wa.me/6281383521750" className="hover:text-[#F59E0B] transition-colors font-medium">
                  +62 813-8352-1750
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200/90 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} WUUS Studio. Seluruh hak cipta dilindungi. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/syarat-ketentuan" className="hover:text-slate-900 transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/kebijakan-privasi" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/admin/inquiries" className="hover:text-slate-900 transition-colors text-slate-400">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
