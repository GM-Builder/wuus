'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { 
  Lock, 
  Unlock, 
  Search, 
  RefreshCw, 
  ExternalLink, 
  Mail, 
  PhoneCall, 
  Calendar, 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  LogOut, 
  Eye, 
  EyeOff,
  Filter,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface Inquiry {
  id: number | string;
  hotel_name: string;
  website_url: string;
  contact_name: string;
  email: string;
  notes?: string;
  status: 'new' | 'audit_prepared' | 'review_sent' | 'won' | 'archived';
  created_at: string;
}

// Passcode storage key & default master PIN
const AUTH_KEY = 'wuus_admin_auth_token';
const MASTER_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || 'wuus2026';

const STATUS_CONFIG: Record<string, { label: string; badge: string; dot: string }> = {
  new: { 
    label: 'New Lead', 
    badge: 'bg-amber-50 text-amber-800 border-amber-200', 
    dot: 'bg-amber-500' 
  },
  audit_prepared: { 
    label: 'Audit Ready', 
    badge: 'bg-blue-50 text-blue-800 border-blue-200', 
    dot: 'bg-blue-500' 
  },
  review_sent: { 
    label: 'Review Sent', 
    badge: 'bg-purple-50 text-purple-800 border-purple-200', 
    dot: 'bg-purple-500' 
  },
  won: { 
    label: 'Client Won', 
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-200', 
    dot: 'bg-emerald-500' 
  },
  archived: { 
    label: 'Archived', 
    badge: 'bg-gray-100 text-gray-700 border-gray-200', 
    dot: 'bg-gray-400' 
  }
};

export default function AdminInquiriesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tableExists, setTableExists] = useState(true);
  const [copiedSql, setCopiedSql] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState<number | string | null>(null);

  // Check persistent session on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_KEY);
    if (savedAuth === 'authenticated') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Fetch inquiries from Supabase
  const fetchInquiries = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase
        .from('hospitality_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // Table might not exist yet
        if (error.code === '42P01' || error.message.includes('relation') || error.message.includes('does not exist')) {
          setTableExists(false);
        }
        console.error('Supabase query error:', error);
      } else if (data) {
        setTableExists(true);
        setInquiries(data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchInquiries();
    }
  }, [isAuthenticated, fetchInquiries]);

  // Auth Handler
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === MASTER_PIN) {
      localStorage.setItem(AUTH_KEY, 'authenticated');
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setPinInput('');
  };

  // Status Update Handler
  const handleUpdateStatus = async (id: number | string, newStatus: Inquiry['status']) => {
    try {
      const { error } = await supabase
        .from('hospitality_inquiries')
        .update({ status: newStatus })
        .eq('id', id);

      if (!error) {
        setInquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter(item => {
    const matchesSearch = 
      item.hotel_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contact_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.website_url?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Analytics counts
  const totalCount = inquiries.length;
  const newCount = inquiries.filter(i => i.status === 'new').length;
  const reviewSentCount = inquiries.filter(i => i.status === 'review_sent').length;
  const wonCount = inquiries.filter(i => i.status === 'won').length;

  const sqlSnippet = `create table if not exists hospitality_inquiries (
  id bigint generated by default as identity primary key,
  hotel_name text not null,
  website_url text not null,
  contact_name text not null,
  email text not null,
  notes text,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);`;

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlSnippet);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const copyReviewEmailDraft = (inquiry: Inquiry) => {
    const draft = `Subject: Re: Your 1-Page Website Review for ${inquiry.hotel_name}

Dear ${inquiry.contact_name || 'Team'},

Thanks for requesting a review for ${inquiry.hotel_name}.

I've completed your 1-page visual guest journey teardown focusing specifically on your mobile room discovery and direct reservation pathways.

You can access your review document here:
[INSERT YOUR 1-PAGE NOTION OR PDF LINK]

I’ve kept it concise and focused strictly on the traveler perspective rather than technical jargon.

If any of these observations resonate with your upcoming season plans, I would be glad to outline a fixed-scope proposal to implement the improvements.

Best regards,

Faisal Farizi
Founder & Digital Designer, WUUS Studio
https://webuntukusaha.com/hospitality
WhatsApp: +62 813-8352-1750`;

    navigator.clipboard.writeText(draft);
    setCopiedTemplate(inquiry.id);
    setTimeout(() => setCopiedTemplate(null), 2500);
  };

  // 1. LOADING SCREEN
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-light-grey flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-accent-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 2. PIN AUTHENTICATION GATE
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-light-grey flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 md:p-10 border-2 border-primary-navy shadow-[6px_6px_0px_0px_#1C2733]">
          
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="WUUS Logo"
                width={130}
                height={36}
                priority
                className="h-8 w-auto object-contain mx-auto"
              />
            </Link>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-primary-navy text-xs font-bold uppercase tracking-wider mb-2">
              <Lock className="w-3.5 h-3.5 text-accent-orange" />
              <span>Studio Admin Portal</span>
            </div>
            <h1 className="text-2xl font-black text-primary-navy">Hospitality Pipeline</h1>
            <p className="text-xs text-gray-500 mt-1">Masukkan master PIN studio untuk mengakses dashboard klien.</p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-navy mb-2">
                Studio Master PIN
              </label>
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  placeholder="Enter PIN (Default: wuus2026)"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  autoFocus
                  className={`w-full px-4 py-3.5 rounded-xl border-2 text-sm text-primary-navy font-mono tracking-widest focus:outline-hidden transition-all ${
                    pinError 
                      ? 'border-red-500 bg-red-50/50' 
                      : 'border-gray-200 focus:border-accent-orange bg-light-grey'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-primary-navy transition-colors"
                >
                  {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {pinError && (
                <p className="text-xs text-red-600 font-semibold mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> PIN salah. Silakan coba lagi.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-accent-orange hover:bg-accent-yellow text-primary-navy font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-primary-navy shadow-[4px_4px_0px_0px_#1C2733] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Buka Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-[11px] text-gray-400 mt-6">
            Default Master PIN: <code className="bg-gray-100 px-1.5 py-0.5 rounded font-bold text-gray-600">wuus2026</code>
          </p>
        </div>
      </div>
    );
  }

  // 3. MAIN ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-light-grey text-primary-navy font-sans antialiased">
      
      {/* Top Studio Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="WUUS Logo"
                width={120}
                height={32}
                priority
                className="h-7 w-auto object-contain"
              />
            </Link>
            <span className="text-gray-300">/</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary-navy uppercase tracking-wider">Hospitality Admin</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Live Supabase Sync
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchInquiries}
              disabled={isRefreshing}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-accent-orange' : ''}`} />
              <span className="hidden sm:inline">Sync</span>
            </button>

            <Link
              href="/hospitality"
              target="_blank"
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Open Hospitality Landing Page"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">View Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              title="Logout from Admin"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 font-semibold mb-2">
              <span>Total Inquiries</span>
              <Building2 className="w-4 h-4 text-accent-orange" />
            </div>
            <div className="text-3xl font-black text-primary-navy">{totalCount}</div>
            <p className="text-[11px] text-gray-400 mt-1">All incoming leads</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-amber-700 font-semibold mb-2">
              <span>New Leads</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-amber-600">{newCount}</div>
            <p className="text-[11px] text-gray-400 mt-1">Pending review audit</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-purple-700 font-semibold mb-2">
              <span>Reviews Sent</span>
              <Mail className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-3xl font-black text-purple-600">{reviewSentCount}</div>
            <p className="text-[11px] text-gray-400 mt-1">Audit delivered to host</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold mb-2">
              <span>Deals Won</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-black text-emerald-600">{wonCount}</div>
            <p className="text-[11px] text-gray-400 mt-1">Active client builds</p>
          </div>

        </div>

        {/* Database Table Setup Notice (If table is missing in Supabase) */}
        {!tableExists && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 mb-8 text-primary-navy">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-accent-orange shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-base font-bold text-amber-950 mb-1">
                  Tabel Supabase &apos;hospitality_inquiries&apos; Belum Terdeteksi
                </h3>
                <p className="text-xs text-amber-900 leading-relaxed mb-4">
                  Data form review di website akan otomatis tersimpan di sini begitu Anda membuat tabelnya di Supabase. Anda cukup copy SQL di bawah ini dan paste di menu <strong>SQL Editor Supabase</strong> Anda:
                </p>
                
                <div className="bg-slate-950 text-slate-200 rounded-xl p-3 text-xs font-mono relative mb-3 overflow-x-auto">
                  <pre>{sqlSnippet}</pre>
                  <button
                    onClick={copySqlToClipboard}
                    className="absolute top-2.5 right-2.5 px-3 py-1.5 bg-accent-orange hover:bg-accent-yellow text-primary-navy rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedSql ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy SQL</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold text-amber-950">
                  <a 
                    href="https://supabase.com/dashboard/project/zsodlugndrjtnxoohxht/sql" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-amber-800 flex items-center gap-1"
                  >
                    <span>Buka SQL Editor Supabase Proyek Anda →</span>
                  </a>
                  <button
                    onClick={fetchInquiries}
                    className="px-3 py-1 bg-white border border-amber-300 rounded hover:bg-amber-100 text-xs font-bold cursor-pointer"
                  >
                    Periksa Ulang
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by hotel, contact person, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-primary-navy placeholder:text-gray-400 focus:outline-hidden focus:border-accent-orange bg-light-grey"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {['all', 'new', 'audit_prepared', 'review_sent', 'won', 'archived'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === status
                    ? 'bg-primary-navy text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'All Inquiries' : STATUS_CONFIG[status]?.label || status}
              </button>
            ))}
          </div>

        </div>

        {/* Inquiries Table / Cards View */}
        {loading ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-16 text-center shadow-xs">
            <div className="w-8 h-8 border-3 border-accent-orange border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-bold text-gray-500">Memuat data prospek dari Supabase...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-16 text-center shadow-xs">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-primary-navy">Belum Ada Prospek Terdaftar</h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto mt-1 mb-6">
              Inquiries yang masuk dari form di <code>webuntukusaha.com/hospitality</code> akan otomatis muncul di sini.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/hospitality#review-request"
                target="_blank"
                className="px-4 py-2 bg-accent-orange text-primary-navy rounded-lg text-xs font-bold shadow-xs hover:bg-accent-yellow transition-colors"
              >
                Coba Isi Test Lead di Landing Page
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-light-grey/80 border-b border-gray-200 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    <th className="py-4 px-6">Property / Hotel</th>
                    <th className="py-4 px-6">Contact Person</th>
                    <th className="py-4 px-6">Date Received</th>
                    <th className="py-4 px-6">Pipeline Status</th>
                    <th className="py-4 px-6 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  {filteredInquiries.map((inquiry) => {
                    const statusObj = STATUS_CONFIG[inquiry.status] || STATUS_CONFIG.new;
                    const dateFormatted = new Date(inquiry.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    });

                    return (
                      <tr 
                        key={inquiry.id} 
                        className="hover:bg-amber-50/30 transition-colors group cursor-pointer"
                        onClick={() => setSelectedInquiry(inquiry)}
                      >
                        {/* Hotel & URL */}
                        <td className="py-4 px-6">
                          <div className="font-bold text-sm text-primary-navy group-hover:text-accent-orange transition-colors">
                            {inquiry.hotel_name}
                          </div>
                          <a
                            href={inquiry.website_url.startsWith('http') ? inquiry.website_url : `https://${inquiry.website_url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[11px] text-gray-400 hover:text-accent-orange flex items-center gap-1 mt-0.5 truncate max-w-[200px]"
                          >
                            <span>{inquiry.website_url}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>

                        {/* Contact Name & Email */}
                        <td className="py-4 px-6">
                          <div className="font-semibold text-gray-800">{inquiry.contact_name}</div>
                          <div className="text-[11px] text-gray-500 font-mono">{inquiry.email}</div>
                        </td>

                        {/* Received Timestamp */}
                        <td className="py-4 px-6 text-gray-500 font-mono text-[11px]">
                          {dateFormatted}
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                          <div className="relative inline-block">
                            <select
                              value={inquiry.status}
                              onChange={(e) => handleUpdateStatus(inquiry.id, e.target.value as Inquiry['status'])}
                              className={`text-[11px] font-bold px-3 py-1.5 rounded-full border appearance-none pr-7 cursor-pointer focus:outline-hidden ${statusObj.badge}`}
                            >
                              <option value="new">🟡 New Lead</option>
                              <option value="audit_prepared">🔵 Audit Ready</option>
                              <option value="review_sent">🟣 Review Sent</option>
                              <option value="won">🟢 Client Won</option>
                              <option value="archived">⚪ Archived</option>
                            </select>
                            <span className="absolute right-2.5 top-2.5 pointer-events-none text-gray-400 text-[9px]">▼</span>
                          </div>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-2">
                            {/* Copy Review Email Draft Button */}
                            <button
                              onClick={() => copyReviewEmailDraft(inquiry)}
                              className="px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                              title="Copy prefilled review email response"
                            >
                              {copiedTemplate === inquiry.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-emerald-700">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 text-gray-500" />
                                  <span>Draft Email</span>
                                </>
                              )}
                            </button>

                            {/* Direct Mail Client */}
                            <a
                              href={`mailto:${inquiry.email}?subject=Your%201-Page%20Website%20Review%20for%20${encodeURIComponent(inquiry.hotel_name)}`}
                              className="p-1.5 rounded-lg border border-gray-200 hover:bg-primary-navy hover:text-white text-gray-600 transition-colors"
                              title="Open in Zoho/Mail Client"
                            >
                              <Mail className="w-4 h-4" />
                            </a>

                            {/* WhatsApp Fast Contact */}
                            <a
                              href={`https://wa.me/6281383521750?text=${encodeURIComponent(`Hi ${inquiry.contact_name}, Faisal from WUUS here regarding your website review request for ${inquiry.hotel_name}.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                              title="Send WhatsApp Message"
                            >
                              <PhoneCall className="w-4 h-4" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* ─────────────────────────────────────────────────────────────
          CLIENT DETAIL MODAL DRAWER (Full submission view)
      ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInquiry(null)}
              className="absolute inset-0 bg-primary-navy/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl p-8 shadow-2xl border-2 border-primary-navy z-10 overflow-hidden"
            >
              <div className="flex items-start justify-between border-b border-gray-100 pb-5 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent-orange">Client Dossier</span>
                  <h2 className="text-2xl font-black text-primary-navy mt-0.5">{selectedInquiry.hotel_name}</h2>
                  <a
                    href={selectedInquiry.website_url.startsWith('http') ? selectedInquiry.website_url : `https://${selectedInquiry.website_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-500 hover:text-accent-orange flex items-center gap-1 mt-1 font-mono"
                  >
                    <span>{selectedInquiry.website_url}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                
                {/* Contact Info Grid */}
                <div className="grid grid-cols-2 gap-4 bg-light-grey p-4 rounded-2xl border border-gray-200/80">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Contact Person</span>
                    <p className="font-bold text-sm text-primary-navy mt-0.5">{selectedInquiry.contact_name}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Email Address</span>
                    <p className="font-mono text-xs text-primary-navy mt-0.5">{selectedInquiry.email}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Submission Date</span>
                    <p className="font-mono text-xs text-gray-600 mt-0.5">
                      {new Date(selectedInquiry.created_at).toLocaleString('en-GB')}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Current Pipeline</span>
                    <div className="mt-1">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${STATUS_CONFIG[selectedInquiry.status]?.badge}`}>
                        {STATUS_CONFIG[selectedInquiry.status]?.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hotelier Notes / Inquiry Details */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary-navy mb-2">
                    Host Questions & Specific Notes:
                  </h4>
                  <div className="bg-light-grey p-4 rounded-2xl border border-gray-200 text-xs text-gray-700 leading-relaxed font-sans min-h-[80px]">
                    {selectedInquiry.notes || <span className="text-gray-400 italic">No additional notes provided by the hotelier.</span>}
                  </div>
                </div>

                {/* Operational Action Buttons */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => copyReviewEmailDraft(selectedInquiry)}
                    className="w-full sm:flex-1 py-3 bg-accent-orange hover:bg-accent-yellow text-primary-navy font-bold text-xs uppercase tracking-wider rounded-xl border border-primary-navy shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedTemplate === selectedInquiry.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-950" />
                        <span>Copied Email Template!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy 1-Page Review Delivery Script</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Your%201-Page%20Website%20Review%20for%20${encodeURIComponent(selectedInquiry.hotel_name)}`}
                    className="w-full sm:w-auto px-5 py-3 bg-primary-navy hover:bg-secondary-blue text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open in Zoho Mail</span>
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
