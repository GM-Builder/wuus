import { createHash, timingSafeEqual } from 'node:crypto';
import {EDITORIAL_CATEGORIES,PRIMARY_SOURCE_HOSTS} from './editorial-policy.mjs';

export type BlogPublication = {
  articleId: string; articleHash: string; contentHash: string; slug: string;
  title: string; description: string; language: 'en' | 'id'; category: string; body: string;
  sources: { label: string; url: string }[];
  qa: { approvedAt: string; summary: string; checks: Record<string, boolean>; evidence: { claim: string; excerpt: string; url: string }[] };
};
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const hash = /^[0-9a-f]{64}$/;
const checks = ['facts','originality','language','brand','noUnsupportedClaims'];
const official = new Set(PRIMARY_SOURCE_HOSTS);
export function publisherAuthorized(request: Request, secret: string | undefined): boolean {
  if (!secret || secret.length < 32) return false;
  const value = request.headers.get('authorization') ?? '';
  if (value.length > 512) return false;
  return timingSafeEqual(createHash('sha256').update(value).digest(), createHash('sha256').update(`Bearer ${secret}`).digest());
}
export function validatePublication(value: unknown, now = new Date()): BlogPublication {
  if (!value || typeof value !== 'object') throw Error('INVALID_PUBLICATION');
  const p = value as BlogPublication;
  if (!uuid.test(p.articleId??'') || !hash.test(p.articleHash??'') || !hash.test(p.contentHash??'') || typeof p.slug!=='string'|| !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)||p.slug.length>100
    || typeof p.title!=='string' || p.title.trim().length<10 || p.title.length>65
    || typeof p.description!=='string' || p.description.trim().length<60 || p.description.length>160
    || !['en','id'].includes(p.language) || !EDITORIAL_CATEGORIES.includes(p.category) || typeof p.body!=='string' || p.body.length>30000) throw Error('INVALID_PUBLICATION');
  const words=p.body.trim().split(/\s+/).length;
  if(words<580||words>1200||/<[^>]+>|(?:TODO|TBD|lorem ipsum|\[insert|\[placeholder)|^---/im.test(p.body)
    || createHash('sha256').update(p.body).digest('hex')!==p.contentHash)throw Error('INVALID_CONTENT');
  if(!Array.isArray(p.sources)||!p.sources.length||p.sources.length>12)throw Error('INVALID_SOURCES');
  for(const s of p.sources){const u=new URL(s.url);if(typeof s.label!=='string'||!s.label.trim()||s.label.length>200||u.protocol!=='https:'||u.username||u.password||u.port||u.search||!official.has(u.hostname))throw Error('INVALID_SOURCE');}
  const qa=p.qa,stamp=Date.parse(qa?.approvedAt);
  if(!qa||!Number.isFinite(stamp)||!/^\d{4}-\d{2}-\d{2}T.*Z$/.test(qa.approvedAt)||stamp>now.getTime()
    || typeof qa.summary!=='string'||qa.summary.length<40||qa.summary.length>2000||checks.some(k=>qa.checks?.[k]!==true)
    || !(qa.checks?.contentRelevance===true||(p.category==='Hotel websites'&&qa.checks?.hospitalityRelevance===true))
    || !Array.isArray(qa.evidence)||!qa.evidence.length||qa.evidence.length>12)throw Error('QUALITY_APPROVAL_REQUIRED');
  for(const e of qa.evidence){if(typeof e.claim!=='string'||e.claim.length<15||!p.body.includes(e.claim)||typeof e.excerpt!=='string'||e.excerpt.length<20||e.excerpt.length>500||!p.sources.some(s=>s.url===e.url))throw Error('INVALID_QUALITY_EVIDENCE');}
  return p;
}
type Receipt = { state: string; articleId: string; articleHash: string; contentHash: string; slug: string; publishedAt: string };
export function createBlogPublisher(deps: {
  secret: () => string | undefined; ready: () => boolean;
  save: (p: BlogPublication) => Promise<Receipt | { state: 'conflict' }>;
  find: (id: string) => Promise<Receipt | null>;
  editorialReady?: () => Promise<boolean>;
}) {
  return async (request: Request) => {
    const reply=(body:unknown,status=200)=>Response.json(body,{status,headers:{'cache-control':'no-store'}});
    if(!publisherAuthorized(request,deps.secret()))return reply({error:'UNAUTHORIZED'},401);
    if(!deps.ready())return reply({error:'BLOG_STORAGE_NOT_CONFIGURED'},503);
    try {
      if(request.method==='GET'){
        const id=new URL(request.url).searchParams.get('id');if(!id||!uuid.test(id))return reply({error:'INVALID_ID'},400);
        const receipt=await deps.find(id);if(receipt)return reply(receipt);
        const editorialReady=id==='00000000-0000-0000-0000-000000000000'&&await deps.editorialReady?.();
        return Response.json({error:'NOT_FOUND'},{status:404,headers:{'cache-control':'no-store',...(editorialReady?{'x-wuus-editorial-version':'2'}:{})}});
      }
      if(request.method!=='POST')return reply({error:'METHOD_NOT_ALLOWED'},405);
      if(!/^application\/json(?:;|$)/i.test(request.headers.get('content-type')??''))return reply({error:'JSON_REQUIRED'},415);
      const reader=request.body?.getReader();if(!reader)return reply({error:'BODY_REQUIRED'},400);
      const chunks:Uint8Array[]=[];let size=0;
      try{for(;;){const r=await reader.read();if(r.done)break;size+=r.value.length;if(size>120000){await reader.cancel();return reply({error:'BODY_TOO_LARGE'},413);}chunks.push(r.value);}}finally{reader.releaseLock();}
      let p:BlogPublication;try{p=validatePublication(JSON.parse(Buffer.concat(chunks).toString('utf8')));}catch{return reply({error:'INVALID_PUBLICATION_OR_QA'},400);}
      if((p.category!=='Hotel websites'||p.language!=='en')&&!(await deps.editorialReady?.()))return reply({error:'EDITORIAL_SCHEMA_NOT_READY'},503);
      const receipt=await deps.save(p);return receipt.state==='conflict'?reply({error:'PUBLICATION_CONFLICT'},409):reply(receipt);
    } catch { return reply({error:'BLOG_STORAGE_UNAVAILABLE'},503); }
  };
}
