'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { INQUIRY_STATUSES, type InquiryStatus } from '@/lib/inquiry';

type Inquiry = {
  id: number | string; request_id: string | null; hotel_name: string; website_url: string; contact_name: string;
  email: string; notes: string | null; status: InquiryStatus; created_at: string;
  source: string | null; request_type: string | null; consent_at: string | null;
};
const labels: Record<InquiryStatus, string> = {
  new: 'New lead', audit_prepared: 'Audit ready', review_sent: 'Review sent', won: 'Client won', archived: 'Archived',
};

function safeLink(value: string) {
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : undefined; }
  catch { return undefined; }
}

async function adminRequest(method = 'GET', body?: unknown, path = '/api/admin/inquiries') {
  const { data } = await supabase.auth.getSession();
  if (!data.session) throw new Error('Please sign in again.');
  const response = await fetch(path, {
    method, cache: 'no-store', signal: AbortSignal.timeout(path.includes('/notifications') ? 60_000 : 20_000),
    headers: { Authorization: `Bearer ${data.session.access_token}`, 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Request failed. Please retry.');
  return result;
}

function NotificationPanel() {
  const [health, setHealth] = useState<{ configured: boolean; counts: Record<string, number> }>();
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let active = true;
    const load = () => void adminRequest('GET', undefined, '/api/admin/notifications')
      .then(result => { if (active) { setHealth(result); setMessage(''); } })
      .catch(() => { if (active) setMessage('Notification status unavailable. Check the inquiry list and inbox.'); });
    load();
    const interval = setInterval(load, 60_000);
    return () => { active = false; clearInterval(interval); };
  }, []);
  async function retry() {
    setBusy(true);
    try {
      const result = await adminRequest('POST', undefined, '/api/admin/notifications');
      setMessage(result.configured ? `${result.accepted} accepted by email provider; ${result.retryPending} waiting to retry. Confirm receipt in your inbox.` : 'Configure the email provider before retrying. Leads remain saved.');
      setHealth(await adminRequest('GET', undefined, '/api/admin/notifications'));
    } catch { setMessage('Retry unavailable. Leads remain saved; check the inquiry list.'); }
    finally { setBusy(false); }
  }
  return <aside className="border rounded-xl bg-white p-4 space-y-2 text-sm" aria-label="Owner notification status">
    <p className="font-semibold">Owner email notifications</p>
    {health && <p>{health.configured ? 'Provider configured' : 'Email provider not configured'} · Pending {health.counts.pending} · Processing {health.counts.processing} · Provider accepted {health.counts.sent} · Needs inspection {health.counts.failed}</p>}
    <p className="text-slate-600">Provider acceptance does not confirm inbox delivery. Check leads twice each working day. Inspect delivery history before manually resending a failed notification.</p>
    <button onClick={retry} disabled={busy || !health?.configured} className="underline disabled:opacity-50">{busy ? 'Processing…' : 'Retry eligible notifications (max 5)'}</button>
    {message && <p role="status">{message}</p>}
  </aside>;
}

export default function AdminInquiriesPage() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const identityGeneration = useRef(0);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      identityGeneration.current++;
      setSession(nextSession);
      setInquiries([]);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const refresh = useCallback(async () => {
    const generation = identityGeneration.current;
    setLoading(true); setError('');
    try {
      const result = await adminRequest('GET', undefined, `/api/admin/inquiries?page=${page}`);
      if (generation !== identityGeneration.current) return;
      setInquiries(result.inquiries);
      setHasMore(result.hasMore);
    } catch (failure) {
      if (generation !== identityGeneration.current) return;
      setInquiries([]);
      setError(failure instanceof Error ? failure.message : 'Unable to load inquiries.');
    } finally { if (generation === identityGeneration.current) setLoading(false); }
  }, [page]);

  useEffect(() => {
    if (!session) return;
    let active = true;
    // Defer outside the Auth callback. Supabase refresh must finish before requests.
    void adminRequest('GET', undefined, `/api/admin/inquiries?page=${page}`).then(result => { if (active) { setInquiries(result.inquiries); setHasMore(result.hasMore); setError(''); } })
      .catch(failure => { if (active) { setInquiries([]); setError(failure instanceof Error ? failure.message : 'Unable to load inquiries.'); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [session, page]);

  async function login(event: FormEvent) {
    event.preventDefault(); if (busy) return;
    setBusy(true); setError('');
    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (loginError) throw new Error('Sign-in failed. Check your credentials or try again later.');
      setPassword('');
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'Sign-in unavailable.'); }
    finally { setBusy(false); }
  }

  async function logout() {
    setBusy(true); setError('');
    try {
      const { error: logoutError } = await supabase.auth.signOut({ scope: 'local' });
      if (logoutError) throw new Error('Sign-out failed. Please retry.');
      setSession(null); setInquiries([]); setNotice('');
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'Sign-out failed.'); }
    finally { setBusy(false); }
  }

  async function changeStatus(id: Inquiry['id'], status: InquiryStatus) {
    if (busy) return;
    setBusy(true); setError(''); setNotice('');
    try {
      await adminRequest('PATCH', { id: String(id), status });
      setInquiries(items => items.map(item => item.id === id ? { ...item, status } : item));
      setNotice('Status saved.');
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'Unable to save status.'); }
    finally { setBusy(false); }
  }

  async function copyDraft(inquiry: Inquiry) {
    try {
      await navigator.clipboard.writeText(`Subject: Your website review for ${inquiry.hotel_name}\n\nHi ${inquiry.contact_name},\n\nThanks for requesting a review. Here are the findings:\n[Add the verified findings and review link before sending.]\n\nIf useful, WUUS can send a fixed-scope proposal.\n\nWUUS · https://webuntukusaha.com/hospitality`);
      setNotice('Draft copied. Add findings before sending.');
    } catch { setError('Unable to copy. Please write the reply in your email app.'); }
  }

  if (session === undefined) return <main className="p-10" role="status">Loading sign-in…</main>;
  if (!session) return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900">
      <form onSubmit={login} className="bg-white border border-slate-200 rounded-2xl p-8 w-full max-w-md space-y-5">
        <Link href="/hospitality" className="text-sm underline">WUUS</Link>
        <h1 className="text-2xl font-bold">Owner sign-in</h1>
        <p className="text-sm text-slate-600">Use your Supabase Auth owner account. Inquiry access is verified by the server.</p>
        <label className="block text-sm">Email<input required type="email" autoComplete="username" value={email} onChange={event => setEmail(event.target.value)} className="block border rounded-lg p-3 w-full mt-1" /></label>
        <label className="block text-sm">Password<input required type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} className="block border rounded-lg p-3 w-full mt-1" /></label>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button disabled={busy} className="w-full rounded-lg p-3 bg-slate-900 text-white disabled:opacity-50">{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </main>
  );

  const visible = inquiries.filter(item => (filter === 'all' || item.status === filter)
    && [item.hotel_name, item.contact_name, item.email, item.website_url, item.request_id].some(value => value?.toLowerCase().includes(query.toLowerCase())));
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div><Link href="/hospitality" className="text-sm underline">WUUS</Link><h1 className="text-2xl font-bold mt-2">Hospitality inquiries</h1><p className="text-sm text-slate-600">Page {page + 1} · up to 100 inquiries per page · check twice each working day</p></div>
          <div className="flex gap-3"><button onClick={refresh} disabled={loading || busy} className="border rounded-lg px-4 py-2 disabled:opacity-50">{loading ? 'Refreshing…' : 'Refresh'}</button><button onClick={logout} disabled={busy} className="border rounded-lg px-4 py-2">Sign out</button></div>
        </header>
        <NotificationPanel />
        {error && <p role="alert" className="bg-red-50 text-red-800 p-4 rounded-lg">{error}</p>}
        {notice && <p role="status" className="bg-emerald-50 text-emerald-800 p-4 rounded-lg">{notice}</p>}
        <div className="flex flex-wrap gap-4">
          <label className="text-sm">Search this page<input value={query} onChange={event => setQuery(event.target.value)} placeholder="Hotel, name, email, request ID" className="block border rounded-lg p-3 mt-1" /></label>
          <label className="text-sm">Status<select value={filter} onChange={event => setFilter(event.target.value)} className="block border rounded-lg p-3 mt-1"><option value="all">All statuses</option>{INQUIRY_STATUSES.map(status => <option key={status} value={status}>{labels[status]}</option>)}</select></label>
        </div>
        <p className="text-sm text-slate-600">{visible.length} shown. Client won is a pipeline stage; confirm cleared payment separately.</p>
        <div className="flex gap-3"><button disabled={page === 0 || loading || busy} onClick={() => { setLoading(true); setInquiries([]); setPage(value => value - 1); }} className="border rounded-lg px-4 py-2 disabled:opacity-50">Previous page</button><button disabled={!hasMore || loading || busy} onClick={() => { setLoading(true); setInquiries([]); setPage(value => value + 1); }} className="border rounded-lg px-4 py-2 disabled:opacity-50">Next page</button></div>
        {!error && visible.length === 0 && <p className="border bg-white rounded-xl p-6">No inquiries to show. Refresh to check for new requests.</p>}
        <div className="grid gap-4 md:grid-cols-2">
          {visible.map(inquiry => <article key={inquiry.id} className="bg-white border border-slate-200 rounded-xl p-6 space-y-3 break-words">
            <div><h2 className="font-bold text-lg">{inquiry.hotel_name}</h2><p className="text-xs text-slate-500">{new Date(inquiry.created_at).toLocaleString()} · {inquiry.source || 'Legacy inquiry'} · {inquiry.request_type || 'review'}</p></div>
            <p className="text-sm">{inquiry.contact_name} · <a className="underline" href={`mailto:${encodeURIComponent(inquiry.email)}`}>{inquiry.email}</a></p>
            {safeLink(inquiry.website_url) ? <a className="text-sm underline" href={safeLink(inquiry.website_url)} target="_blank" rel="noopener noreferrer">{inquiry.website_url}</a> : <p className="text-sm">{inquiry.website_url}</p>}
            <p className="text-sm whitespace-pre-wrap">{inquiry.notes || 'No extra notes.'}</p>
            <p className="text-xs text-slate-500">Consent: {inquiry.consent_at ? new Date(inquiry.consent_at).toLocaleString() : 'Not recorded on legacy inquiry'}</p>
            {inquiry.request_id && <p className="text-xs text-slate-500">Request ID: {inquiry.request_id}</p>}
            <label className="block text-sm">Pipeline status<select value={inquiry.status || 'new'} disabled={busy} onChange={event => changeStatus(inquiry.id, event.target.value as InquiryStatus)} className="block border rounded-lg p-2 mt-1 w-full">{INQUIRY_STATUSES.map(status => <option key={status} value={status}>{labels[status]}</option>)}</select></label>
            <button onClick={() => copyDraft(inquiry)} className="text-sm underline">Copy reply draft</button>
          </article>)}
        </div>
      </div>
    </main>
  );
}
