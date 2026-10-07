import { readFile, writeFile, mkdir, copyFile, stat, lstat, realpath, rm, rename, mkdtemp } from 'node:fs/promises';
import { resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
const text = (value, label, maximum = 1500) => {
  if (typeof value !== 'string' || !value.trim() || value.length > maximum || /[\u0000-\u001f]/.test(value)) throw new Error(`Invalid ${label}`);
  return value.trim();
};
const list = (value, label, maximum) => {
  if (!Array.isArray(value) || value.length === 0 || value.length > maximum) throw new Error(`Invalid ${label}`);
  return value;
};
function url(value, label, production) {
  const parsed = new URL(text(value, label, 2048));
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password) throw new Error(`${label} requires HTTPS without credentials`);
  if (production && /(^|\.)(example\.(com|org|net)|localhost|invalid|test)$/.test(parsed.hostname)) throw new Error(`Replace placeholder ${label}`);
  return parsed.href;
}
export function validateProperty(value, production = false) {
  if (!value || typeof value !== 'object' || typeof value.simulation !== 'boolean') throw new Error('Property configuration required');
  const p = structuredClone(value);
  if (production && p.simulation) throw new Error('Fictional simulation cannot be published as a real property');
  p.name = text(p.name, 'name', 160); p.tagline = text(p.tagline, 'tagline', 200);
  p.story = text(p.story, 'story'); p.location = text(p.location, 'location', 240);
  if (p.language !== 'en') throw new Error('This Starter template supports one English language');
  p.siteUrl = url(p.siteUrl, 'site URL', production);
  p.bookingUrl = p.bookingUrl ? url(p.bookingUrl, 'booking URL', production) : '';
  p.bookingLabel = text(p.bookingLabel, 'booking label', 100);
  p.mapUrl = url(p.mapUrl, 'map URL', production);
  p.locationDescription = text(p.locationDescription, 'directions');
  for (const key of ['accent','background']) if (!/^#[0-9a-f]{6}$/i.test(p.brand?.[key])) throw new Error('Invalid brand color');
  const image = item => {
    if (!item || !/^assets\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp)$/.test(item.src)) throw new Error('Images must use local assets filenames');
    return { src: item.src, alt: text(item.alt, 'image description', 240) };
  };
  p.hero = image(p.hero);
  const ids = new Set();
  p.rooms = list(p.rooms, 'rooms', 6).map(room => {
    if (!/^[a-z0-9-]{1,60}$/.test(room.id) || ids.has(room.id)) throw new Error('Unique room IDs required');
    ids.add(room.id);
    if (!Number.isInteger(room.guests) || room.guests < 1 || room.guests > 20) throw new Error('Invalid room capacity');
    return { ...room, name: text(room.name,'room name',100), description: text(room.description,'room description'), bed: text(room.bed,'bed',100), image: image(room.image) };
  });
  p.gallery = list(p.gallery, 'gallery', 20).map(image);
  if (new Set([p.hero.src,...p.rooms.map(r=>r.image.src),...p.gallery.map(i=>i.src)]).size > 20) throw new Error('Starter includes up to 20 photos');
  p.amenities = list(p.amenities, 'amenities', 20).map(item=>text(item,'amenity',100));
  p.faq = list(p.faq, 'FAQ', 10).map(item=>({question:text(item.question,'FAQ question',240),answer:text(item.answer,'FAQ answer')}));
  p.contact.email = text(p.contact?.email, 'contact email',254);
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(p.contact.email)) throw new Error('Invalid contact email');
  if (production && /@example\.(com|org|net)$/.test(p.contact.email)) throw new Error('Replace example contact email');
  p.contact.address = text(p.contact.address, 'address',500);
  for (const key of ['phone','whatsapp']) if (p.contact[key] && !/^\+[1-9][0-9]{7,14}$/.test(p.contact[key])) throw new Error(`${key} requires an international number`);
  if (production && (!p.approval?.contentReference || !p.approval?.assetsReference || !/^\d{4}-\d{2}-\d{2}$/.test(p.approval?.approvedAt))) throw new Error('Record content and asset approval before production build');
  return p;
}

function hero(p) {
  return `<section class="hero" id="story"><img class="hero-photo" src="${escape(p.hero.src)}" alt="${escape(p.hero.alt)}" fetchpriority="high" width="1600" height="1067"><div class="hero-copy"><p class="eyebrow">${escape(p.location)}</p><h1>${escape(p.tagline)}</h1><p>${escape(p.story)}</p><a class="button" href="#inquiry">Plan your stay <span aria-hidden="true">↗</span></a></div></section>`;
}
function rooms(p) {
  return `<section id="rooms" class="section"><p class="eyebrow">Your place to unwind</p><h2>Rooms with room to breathe.</h2><div class="rooms">${p.rooms.map(r=>`<article class="room"><img src="${escape(r.image.src)}" alt="${escape(r.image.alt)}" loading="lazy" width="900" height="650"><div class="room-copy"><h3>${escape(r.name)}</h3><p>${escape(r.description)}</p><p class="small">Up to ${r.guests} guests · ${escape(r.bed)}</p><a href="#inquiry" data-room="${escape(r.id)}">Ask about this room ↗</a></div></article>`).join('')}</div></section>`;
}
function gallery(p) {
  return `<section id="gallery" class="section"><p class="eyebrow">A closer look</p><h2>A feel for the place.</h2><div class="gallery">${p.gallery.map(i=>`<figure><img src="${escape(i.src)}" alt="${escape(i.alt)}" loading="lazy" width="900" height="650"><figcaption>${escape(i.alt)}</figcaption></figure>`).join('')}</div></section>`;
}
function amenities(p) {
  return `<section id="amenities" class="section split"><div><p class="eyebrow">Thoughtful essentials</p><h2>Settle in. Take it slow.</h2></div><ul class="amenities">${p.amenities.map(a=>`<li>${escape(a)}</li>`).join('')}</ul></section>`;
}
function location(p) {
  return `<section id="location" class="section split"><div><p class="eyebrow">Find your way here</p><h2>${escape(p.location)}</h2><p>${escape(p.locationDescription)}</p><p>${escape(p.contact.address)}</p><a href="${escape(p.mapUrl)}" target="_blank" rel="noopener noreferrer">Open map and directions ↗</a></div><div><h3>Before you arrive</h3>${p.faq.map(f=>`<details><summary>${escape(f.question)}</summary><p>${escape(f.answer)}</p></details>`).join('')}</div></section>`;
}
function inquiry(p) {
  return `<section id="inquiry" class="section inquiry split"><div><p class="eyebrow">We would love to hear from you</p><h2>Let’s plan your stay.</h2><p>Ask the property about availability, prices, and your plans. An inquiry is a request, not a confirmed booking.</p>${p.bookingUrl?`<a class="button" href="${escape(p.bookingUrl)}" target="_blank" rel="noopener noreferrer">${escape(p.bookingLabel)} ↗</a><p class="small">Availability and booking are handled on the property's existing booking website.</p>`:''}<p><a href="mailto:${escape(p.contact.email)}">${escape(p.contact.email)}</a>${p.contact.phone?` · <a href="tel:${escape(p.contact.phone)}">${escape(p.contact.phone)}</a>`:''}</p><p class="small"><a href="privacy.html">How your inquiry is handled</a></p></div><form id="stay-inquiry" data-email="${escape(p.contact.email)}" data-whatsapp="${escape(p.contact.whatsapp||'')}"><label>Your name<input name="name" autocomplete="name" maxlength="100" required></label><label>Email<input name="email" type="email" autocomplete="email" maxlength="254" required></label><div class="form-row"><label>Arrival<input name="arrival" type="date" required></label><label>Departure<input name="departure" type="date" required></label></div><div class="form-row"><label>Guests<input name="guests" type="number" min="1" max="20" value="2" required></label><label>Room preference<select name="room"><option value="any">No preference</option>${p.rooms.map(r=>`<option value="${escape(r.id)}">${escape(r.name)}</option>`).join('')}</select></label></div><label>Your plans<textarea name="message" maxlength="1500" rows="3"></textarea></label><p class="small">This prepares a draft in your email or WhatsApp app. Review and send it there. This website does not store the form or confirm delivery.</p><button class="button" type="submit">Prepare inquiry draft ↗</button><p id="inquiry-status" role="status" aria-live="polite"></p><div id="draft-actions" hidden><a id="email-draft" class="button">Open email draft ↗</a>${p.contact.whatsapp?'<a id="whatsapp-draft" class="button secondary" target="_blank" rel="noopener noreferrer">Open WhatsApp draft ↗</a>':''}</div><noscript><p>Email the property directly using the address above. Draft preparation requires JavaScript.</p></noscript></form></section>`;
}
export function renderProperty(p, production = false) {
  const head = `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(p.name)} · ${escape(p.location)}</title><meta name="description" content="${escape(p.tagline)}"><meta name="robots" content="${production?'index,follow':'noindex,nofollow'}">${production?`<link rel="canonical" href="${escape(p.siteUrl)}">`:''}<link rel="stylesheet" href="site.css">`;
  const html = `<!doctype html><html lang="en"><head>${head}</head><body style="--accent:${p.brand.accent};--paper:${p.brand.background}"><a class="skip" href="#main">Skip to content</a>${p.simulation?'<div class="simulation">WUUS internal concept · fictional property and illustrative photos · no real bookings</div>':''}<header><a class="brand" href="#">${escape(p.name)}</a><nav aria-label="Main"><a href="#rooms">Rooms</a><a href="#gallery">Gallery</a><a href="#location">Location</a><a href="#inquiry">Inquire ↗</a></nav></header><main id="main">${hero(p)}${rooms(p)}${gallery(p)}${amenities(p)}${location(p)}${inquiry(p)}</main><footer><span>${escape(p.name)}</span><span><a href="privacy.html">Inquiry privacy</a> · Website by WUUS</span></footer><script src="inquiry.js" defer></script></body></html>`;
  const privacyHead = head.replace(/<title>.*?<\/title>/,'<title>Inquiry privacy</title>').replace(/<link rel="canonical" href="[^"]*">/,`<link rel="canonical" href="${escape(new URL('privacy.html',p.siteUrl).href)}">`);
  const privacy = `<!doctype html><html lang="en"><head>${privacyHead}</head><body><main class="section"><a href="index.html">← Back to property</a><h1>Inquiry privacy</h1><p>This website prepares a draft on your device. The inquiry form has no server storage or analytics. Opening email or WhatsApp passes the draft to that service; sending it shares it with the property.</p><p>The hosting provider may process access logs. The property handles received correspondence and booking information under its own approved policies. Ask <a href="mailto:${escape(p.contact.email)}">${escape(p.contact.email)}</a> about retention, access, or deletion.</p><p>The existing booking website has its own terms and privacy practices. No booking or payment is processed on this website.</p>${p.simulation?'<p>This is a fictional internal example. Its contact destinations are placeholders.</p>':''}</main></body></html>`;
  return { html, privacy };
}
export async function build(root, production = false) {
  root = await realpath(root);
  const p = validateProperty(JSON.parse(await readFile(resolve(root,'property.json'),'utf8')),production);
  const assets = new Set([p.hero.src,...p.rooms.map(r=>r.image.src),...p.gallery.map(i=>i.src)]);
  for (const asset of assets) if (!(await stat(resolve(root,asset))).isFile()) throw new Error(`Missing ${asset}`);
  const output = resolve(root,'dist');
  if (!output.startsWith(root + sep)) throw new Error('Build output must stay inside the client project');
  try { if ((await lstat(output)).isSymbolicLink()) throw new Error('Build output cannot be a symlink'); }
  catch(error) { if (error.code !== 'ENOENT') throw error; }
  const staging = await mkdtemp(resolve(root,'.wuus-build-'));
  if (!staging.startsWith(root + sep)) throw new Error('Invalid staging directory');
  try {
  await mkdir(resolve(staging,'assets'),{recursive:true});
  const {html,privacy}=renderProperty(p,production);
  for (const [name,content] of [['index.html',html],['privacy.html',privacy],['robots.txt',`User-agent: *\n${production?'Allow: /':'Disallow: /'}\n${production?`Sitemap: ${new URL('sitemap.xml',p.siteUrl).href}\n`:''}`],['sitemap.xml',`<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${production?`<url><loc>${escape(p.siteUrl)}</loc></url><url><loc>${escape(new URL('privacy.html',p.siteUrl).href)}</loc></url>`:''}</urlset>`]]) await writeFile(resolve(staging,name),content);
  for (const asset of [...assets,'site.css','inquiry.js']) await copyFile(resolve(root,asset),resolve(staging,asset));
  // Only generated output is replaced, after the new files are complete. Never touch source/assets.
  await rm(output,{recursive:true,force:true});
  await rename(staging,output);
  } finally { await rm(staging,{recursive:true,force:true}); }
  return {output,simulation:p.simulation,production};
}
if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try { console.log(JSON.stringify(await build(dirname(fileURLToPath(import.meta.url)),process.argv.includes('--production')))); }
  catch(error) { console.error(error.message); process.exitCode=1; }
}
