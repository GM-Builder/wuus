import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash,randomUUID} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {validatePublication,createBlogPublisher} from '../lib/blog-publish.ts';
const secret='fixture-owner-publisher-key-32-characters',date='2026-01-01T00:00:00.000Z';
function payload(){const body='Keep room information clear and make contact details easy to find. '.repeat(56).trim();return {articleId:randomUUID(),articleHash:'f'.repeat(64),contentHash:createHash('sha256').update(body).digest('hex'),slug:'hotel-website-planning',title:'A useful independent hotel website',description:'A practical guide for independent hotel owners preparing room details, photographs and contact information for their website.',language:'en',category:'Hotel websites',body,sources:[{label:'WUUS scope',url:'https://webuntukusaha.com/hospitality/terms'}],qa:{approvedAt:date,summary:'The independent QA review confirms practical advice consistent with retrieved WUUS scope.',checks:{facts:true,originality:true,language:true,hospitalityRelevance:true,brand:true,noUnsupportedClaims:true},evidence:[{claim:'Keep room information clear and make contact details easy to find.',excerpt:'Room information and contact details should be clear.',url:'https://webuntukusaha.com/hospitality/terms'}]}};}
test('publisher rejects missing keys/auth, invalid QA, oversized body and never calls storage before validation',async()=>{
 let writes=0;const api=createBlogPublisher({secret:()=>secret,ready:()=>true,save:async()=>{writes++;return {state:'conflict'};},find:async()=>null});
 const req=(p,token=secret)=>new Request('https://webuntukusaha.com/api/blog/publish',{method:'POST',headers:{authorization:`Bearer ${token}`,'content-type':'application/json'},body:JSON.stringify(p)});
 assert.equal((await api(req(payload(),'wrong'))).status,401);
 const absent=createBlogPublisher({secret:()=>undefined,ready:()=>true,save:async()=>{throw Error('must not run');},find:async()=>null});assert.equal((await absent(req(payload(),'undefined'))).status,401);
 const p=payload();validatePublication(p);assert.equal((await api(req({...p,body:p.body+' changed'}))).status,400);
 assert.equal((await api(req({...p,qa:{...p.qa,checks:{}}}))).status,400);
 assert.equal((await api(req({...p,body:'x'.repeat(130000)}))).status,413);assert.equal(writes,0);
 assert.equal((await api(req(p))).status,409);assert.equal(writes,1);
});
test('blog SQL permits public published content only, blocks writes/proofs/RPC, and atomically deduplicates publication',async()=>{
 const db=new PGlite(),sql=await readFile(new URL('../supabase/manual/03-blog-apply.sql',import.meta.url),'utf8');
 try{
  await db.exec('CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role BYPASSRLS; GRANT USAGE ON SCHEMA public TO anon,authenticated,service_role;');
  await db.exec(sql);await db.exec(sql);
  const verified=await db.query(await readFile(new URL('../supabase/manual/04-blog-verify.sql',import.meta.url),'utf8'));assert.ok(verified.rows.every(r=>r.result==='PASS'),JSON.stringify(verified.rows));
  const p=payload();await db.exec('SET ROLE service_role');
  const publish=async value=>(await db.query('SELECT public.publish_wuus_blog($1::jsonb) receipt',[JSON.stringify(value)])).rows[0].receipt;
  const a=await publish(p),b=await publish(p);assert.deepEqual(a,b);assert.equal(a.state,'published');
  assert.equal((await publish({...p,title:'An altered independent hotel website'})).state,'conflict');
  assert.equal((await publish({...p,articleId:randomUUID()})).state,'conflict');
  assert.deepEqual((await db.query('SELECT public.wuus_blog_receipt($1::uuid) receipt',[p.articleId])).rows[0].receipt,a);
  await db.exec('RESET ROLE');
  await db.query("INSERT INTO public.wuus_blog_posts SELECT $1::uuid,'hidden-draft',title,description,language,category,body,sources,content_hash,'draft',approved_at,published_at FROM public.wuus_blog_posts LIMIT 1",[randomUUID()]);
  await db.query("INSERT INTO public.wuus_blog_posts SELECT $1::uuid,'future-post',title,description,language,category,body,sources,content_hash,'published',approved_at,now()+interval '1 day' FROM public.wuus_blog_posts LIMIT 1",[randomUUID()]);
  for(const role of ['anon','authenticated']){
   await db.exec(`SET ROLE ${role}`);assert.equal((await db.query('SELECT count(*)::int n FROM public.wuus_blog_posts')).rows[0].n,1);
   await assert.rejects(db.exec('DELETE FROM public.wuus_blog_posts'),/permission denied/);
   await assert.rejects(db.exec('UPDATE public.wuus_blog_posts SET title=title'),/permission denied/);
   await assert.rejects(db.query('SELECT public.publish_wuus_blog($1::jsonb)',[JSON.stringify(p)]),/permission denied/);
   await assert.rejects(db.exec('SELECT * FROM wuus_private.blog_release_receipts'),/permission denied/);await db.exec('RESET ROLE');
  }
 }finally{await db.close();}
});

test('editorial v2 requires real schema readiness and preserves quality for non-hospitality content',async()=>{
 const p=payload();p.language='id';p.category='AI & Robotics';delete p.qa.checks.hospitalityRelevance;p.qa.checks.contentRelevance=true;p.sources=[{label:'NIST',url:'https://www.nist.gov/itl/ai-risk-management-framework'}];p.qa.evidence[0].url=p.sources[0].url;validatePublication(p);
 assert.throws(()=>validatePublication({...p,qa:{...p.qa,checks:{...p.qa.checks,contentRelevance:false,hospitalityRelevance:true}}}),/QUALITY/);
 let writes=0;const api=createBlogPublisher({secret:()=>secret,ready:()=>true,editorialReady:async()=>false,save:async()=>{writes++;return {state:'conflict'};},find:async()=>null});
 const req=new Request('https://webuntukusaha.com/api/blog/publish',{method:'POST',headers:{authorization:`Bearer ${secret}`,'content-type':'application/json'},body:JSON.stringify(p)});assert.equal((await api(req)).status,503);assert.equal(writes,0);
 const db=new PGlite();try{
  await db.exec('CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role BYPASSRLS; GRANT USAGE ON SCHEMA public TO anon,authenticated,service_role;');
  await db.exec(await readFile(new URL('../supabase/manual/03-blog-apply.sql',import.meta.url),'utf8'));
  const migration=await readFile(new URL('../supabase/manual/05-blog-editorial-apply.sql',import.meta.url),'utf8');await db.exec(migration);await db.exec(migration);
  const verified=await db.query(await readFile(new URL('../supabase/manual/06-blog-editorial-verify.sql',import.meta.url),'utf8'));assert.ok(verified.rows.every(r=>r.result==='PASS'));
  await db.exec('SET ROLE service_role');const receipt=(await db.query('SELECT public.publish_wuus_blog($1::jsonb) r',[JSON.stringify(p)])).rows[0].r;assert.equal(receipt.state,'published');
  await db.exec('RESET ROLE');await db.exec('SET ROLE anon');assert.equal((await db.query('SELECT count(*)::int n FROM public.wuus_blog_posts')).rows[0].n,1);await assert.rejects(db.exec('SELECT public.wuus_blog_capabilities()'),/permission denied/);await assert.rejects(db.exec('DELETE FROM public.wuus_blog_posts'),/permission denied/);
 }finally{await db.close();}
});
