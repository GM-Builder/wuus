import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {notificationConfig,sendOwnerNotification} from '../lib/notification.ts';

test('fixed notification destinations, idempotency and confirmed provider response',async()=>{
  assert.equal(notificationConfig({RESEND_API_KEY:'key',WUUS_NOTIFICATION_FROM:'bad\n@x.com',WUUS_OWNER_EMAIL:'owner@example.com'}),undefined);
  const config=notificationConfig({RESEND_API_KEY:'qa-key',WUUS_NOTIFICATION_FROM:'alerts@example.com',WUUS_OWNER_EMAIL:'owner@example.com'});
  const id='13d71d5c-d995-41fa-a6a7-d239beea5c33';
  assert.equal(await sendOwnerNotification(config,id,async(input,init)=>{
    assert.equal(input,'https://api.resend.com/emails');
    assert.equal(init.headers['Idempotency-Key'],`wuus-inquiry/${id}`);
    const body=JSON.parse(init.body);
    assert.deepEqual(body.to,['owner@example.com']);assert.ok(!body.text.includes('qa@example.com'));
    return Response.json({id:'provider-qa-id'});
  }),'provider-qa-id');
  await assert.rejects(sendOwnerNotification(config,id,async()=>Response.json({error:'Synthetic'}, {status:429})),/provider_rate_limit/);
  await assert.rejects(sendOwnerNotification(config,id,async()=>Response.json({})),/provider_unconfirmed/);
});

test('notification outbox is atomic, private, leased, bounded and preserves successful leads',async()=>{
  const db=new PGlite();
  try{
    await db.exec('CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role BYPASSRLS;');
    for(const file of ['202610070001_secure_inquiries.sql','202610070002_inquiry_notifications.sql'])await db.exec(await readFile(new URL(`../supabase/migrations/${file}`,import.meta.url),'utf8'));
    const id='13d71d5c-d995-41fa-a6a7-d239beea5c33';
    const payload=JSON.stringify({hotel_name:'Synthetic',website_url:'https://example.com',contact_name:'QA',email:'qa@example.com',notes:'',source:'review',request_type:'review',consent_version:'2026-10-07'});
    for(const role of ['anon','authenticated']){
      await db.exec(`SET ROLE ${role}`);
      for(const sql of ['SELECT * FROM public.wuus_inquiry_notifications','DELETE FROM public.hospitality_inquiries WHERE false','DELETE FROM public.wuus_inquiry_notifications WHERE false',"SELECT public.claim_wuus_notifications(null,5)"]){await assert.rejects(db.query(sql),/permission denied/);}
      await db.exec('RESET ROLE');
    }
    await db.exec('SET ROLE service_role');
    assert.equal((await db.query('SELECT public.submit_wuus_inquiry($1,repeat(\'d\',64),$2::jsonb) as result',[id,payload])).rows[0].result,'saved');
    assert.equal((await db.query('SELECT public.submit_wuus_inquiry($1,repeat(\'d\',64),$2::jsonb) as result',[id,payload])).rows[0].result,'duplicate');
    assert.equal((await db.query('SELECT count(*)::int as count FROM public.wuus_inquiry_notifications')).rows[0].count,1);
    const first=(await db.query('SELECT * FROM public.claim_wuus_notifications($1,1)',[id])).rows[0];
    assert.ok(first.lease_id);
    assert.equal((await db.query('SELECT * FROM public.claim_wuus_notifications($1,1)',[id])).rows.length,0);
    assert.equal((await db.query('SELECT public.finish_wuus_notification($1,gen_random_uuid(),null,\'qa_failure\') as ok',[id])).rows[0].ok,false);
    assert.equal((await db.query('SELECT public.finish_wuus_notification($1,$2,null,\'qa_failure\') as ok',[id,first.lease_id])).rows[0].ok,true);
    assert.equal((await db.query('SELECT status FROM public.wuus_inquiry_notifications')).rows[0].status,'pending');
    await db.exec('RESET ROLE');await db.exec("UPDATE public.wuus_inquiry_notifications SET available_at=now()-interval '1 minute'");
    await db.exec('SET ROLE service_role');
    const retry=(await db.query('SELECT * FROM public.claim_wuus_notifications($1,1)',[id])).rows[0];
    assert.equal((await db.query('SELECT public.finish_wuus_notification($1,$2,\'qa-provider-id\',null) as ok',[id,retry.lease_id])).rows[0].ok,true);
    assert.equal((await db.query('SELECT * FROM public.claim_wuus_notifications(null,5)')).rows.length,0);
    assert.equal((await db.query('SELECT count(*)::int as count FROM public.hospitality_inquiries')).rows[0].count,1);
    await db.exec('RESET ROLE');
    await db.exec("UPDATE public.wuus_inquiry_notifications SET status='processing',attempts=5,lease_until=now()-interval '1 minute'");
    await db.query('SELECT * FROM public.claim_wuus_notifications(null,5)');
    assert.equal((await db.query('SELECT status FROM public.wuus_inquiry_notifications')).rows[0].status,'failed');
    await db.exec("UPDATE public.wuus_inquiry_notifications SET status='pending',attempts=1,first_attempt_at=now()-interval '24 hours'");
    assert.equal((await db.query('SELECT * FROM public.claim_wuus_notifications(null,5)')).rows.length,0);
    assert.equal((await db.query('SELECT last_error FROM public.wuus_inquiry_notifications')).rows[0].last_error,'retry_window_expired');
    await db.exec(await readFile(new URL('../supabase/migrations/202610070002_inquiry_notifications.sql',import.meta.url),'utf8'));
    assert.equal((await db.query('SELECT count(*)::int as count FROM public.wuus_inquiry_notifications')).rows[0].count,1);
  }finally{await db.close();}
});
