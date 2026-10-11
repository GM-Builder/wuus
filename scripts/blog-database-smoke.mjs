// Isolated production HTTP test: real Next handlers + PGlite SQL, no production writes.
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {randomUUID,createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
const db=new PGlite(),secret='isolated-blog-publisher-fixture-key-2026',service='fixture-service',anon='fixture-anon';
const storageRequests=[];
await db.exec('CREATE ROLE anon;CREATE ROLE authenticated;CREATE ROLE service_role BYPASSRLS;GRANT USAGE ON SCHEMA public TO anon,authenticated,service_role;');
await db.exec(await readFile(new URL('../supabase/manual/03-blog-apply.sql',import.meta.url),'utf8'));
const storage=createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://127.0.0.1'),key=req.headers.apikey;
  storageRequests.push({method:req.method,path:url.pathname,authorized:[service,anon].includes(key)});
  if(![service,anon].includes(key)){res.writeHead(401);res.end('{}');return;}
  let result;
  if(url.pathname==='/rest/v1/rpc/publish_wuus_blog'&&key===service){let body='';for await(const b of req)body+=b;result=(await db.query('SELECT public.publish_wuus_blog($1::jsonb) result',[JSON.stringify(JSON.parse(body).p_payload)])).rows[0].result;}
  else if(url.pathname==='/rest/v1/rpc/wuus_blog_receipt'&&key===service){let body='';for await(const b of req)body+=b;result=(await db.query('SELECT public.wuus_blog_receipt($1::uuid) result',[JSON.parse(body).p_article_id])).rows[0].result;}
  else if(url.pathname==='/rest/v1/wuus_blog_posts'){
   const slug=url.searchParams.get('slug')?.replace(/^eq\./,'');
   result=(await db.query("SELECT * FROM public.wuus_blog_posts WHERE status='published' AND published_at<=now() AND ($1::text IS NULL OR slug=$1) ORDER BY published_at DESC LIMIT 200",[slug??null])).rows;
  }else{res.writeHead(404);res.end('{}');return;}
  res.writeHead(200,{'content-type':'application/json'});res.end(JSON.stringify(result));
 }catch(error){console.error('Fixture query failed:',error.message);res.writeHead(500,{'content-type':'application/json'});res.end('{"message":"isolated fixture storage failed"}');}
});
await new Promise(done=>storage.listen(0,'127.0.0.1',done));const storageUrl=`http://127.0.0.1:${storage.address().port}`;
const probe=createServer();await new Promise(done=>probe.listen(0,'127.0.0.1',done));const port=probe.address().port;await new Promise(done=>probe.close(done));
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{windowsHide:true,stdio:['ignore','pipe','pipe'],env:{...process.env,NEXT_PUBLIC_SUPABASE_URL:storageUrl,NEXT_PUBLIC_SUPABASE_ANON_KEY:anon,SUPABASE_SERVICE_ROLE_KEY:service,WUUS_BLOG_PUBLISH_KEY:secret,VERCEL:'',NODE_ENV:'production'}});const exited=once(child,'exit');let log='';child.stderr.on('data',b=>log+=b.toString());child.stdout.on('data',()=>{});
const site=`http://127.0.0.1:${port}`;
try{
 let ready=false;for(let i=0;i<80;i++){try{ready=(await fetch(site)).ok;}catch{}if(ready)break;await new Promise(done=>setTimeout(done,100));}assert.ok(ready,'Next production server did not start');
 const body='Keep room information clear and make contact details easy to find. '.repeat(56).trim(),p={articleId:randomUUID(),articleHash:'f'.repeat(64),contentHash:createHash('sha256').update(body).digest('hex'),slug:'isolated-hotel-planning',title:'Isolated hotel website planning guide',description:'A practical guide for independent hotel owners preparing room details, photographs and contact information for their website.',language:'en',category:'Hotel websites',body,sources:[{label:'WUUS scope',url:'https://webuntukusaha.com/hospitality/terms'}],qa:{approvedAt:'2026-01-01T00:00:00.000Z',summary:'The independent QA review confirms practical advice consistent with retrieved WUUS scope.',checks:{facts:true,originality:true,language:true,hospitalityRelevance:true,brand:true,noUnsupportedClaims:true},evidence:[{claim:'Keep room information clear and make contact details easy to find.',excerpt:'Room information and contact details should be clear.',url:'https://webuntukusaha.com/hospitality/terms'}]}};
 const api=site+'/api/blog/publish',headers={authorization:`Bearer ${secret}`,'content-type':'application/json'};
 assert.equal((await fetch(api,{method:'POST',headers:{...headers,authorization:'Bearer wrong'},body:JSON.stringify(p)})).status,401);
 assert.equal((await fetch(`${site}/blog/${p.slug}`)).status,404);
 const write=async()=>{const r=await fetch(api,{method:'POST',headers,body:JSON.stringify(p)});assert.equal(r.status,200);return r.json();};const first=await write();assert.deepEqual(await write(),first);assert.equal(first.state,'published');
 assert.equal((await db.query('SELECT count(*)::int n FROM public.wuus_blog_posts')).rows[0].n,1);
 const receipt=await fetch(api+'?id='+p.articleId,{headers});assert.equal(receipt.status,200);assert.deepEqual(await receipt.json(),first);
 const page=await fetch(`${site}/blog/${p.slug}`);assert.equal(page.status,200);const html=await page.text();assert.ok(html.includes(`data-wuus-content-hash="${p.contentHash}"`));assert.ok(html.includes(p.title));
 assert.ok((await(await fetch(site+'/blog')).text()).includes(p.title));
 assert.ok((await(await fetch(site+'/sitemap.xml')).text()).includes('/blog/'+p.slug));
 assert.equal((await fetch(site+'/blog/preview/prepare-your-hotel-website')).status,404);
 console.log('PASS: production Next API → real SQL → database receipt → new public article, index and sitemap without rebuild; auth, dedup and private preview checked. Isolated fixtures only.');
}catch(error){console.error(log,storageRequests);throw error;}finally{child.kill();await exited;await new Promise(done=>storage.close(done));await db.close();}
