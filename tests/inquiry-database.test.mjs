import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';

test('SQL migration, role privileges, deduplication and durable throttle work in local Postgres', async () => {
  const db = new PGlite();
  try {
    await db.exec('CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role BYPASSRLS;');
    const migration = await readFile(new URL('../supabase/migrations/202610070001_secure_inquiries.sql', import.meta.url), 'utf8');
    await db.exec(migration);
    // A rerun must preserve an existing lead and close an unsafe old public policy.
    await db.exec("INSERT INTO public.hospitality_inquiries(hotel_name,website_url,contact_name,email) VALUES ('Legacy QA','https://example.com','QA','qa@example.com'); CREATE POLICY unsafe_old ON public.hospitality_inquiries FOR ALL TO anon USING (true) WITH CHECK (true); GRANT ALL ON public.hospitality_inquiries TO anon; GRANT SELECT(email),INSERT(email),UPDATE(email) ON public.hospitality_inquiries TO public,anon,authenticated;");
    await db.exec(migration);
    assert.equal((await db.query('SELECT count(*)::int AS total FROM public.hospitality_inquiries')).rows[0].total, 1);
    const regression = await readFile(new URL('../supabase/tests/inquiries.sql', import.meta.url), 'utf8');
    await db.exec(regression);
    assert.equal((await db.query('SELECT count(*)::int AS total FROM public.hospitality_inquiries')).rows[0].total, 1);
    for (const role of ['anon', 'authenticated']) {
      assert.equal((await db.query("SELECT has_any_column_privilege($1,'public.hospitality_inquiries','SELECT,INSERT,UPDATE,REFERENCES') AS allowed",[role])).rows[0].allowed,false);
      await db.exec(`SET ROLE ${role}`);
      await assert.rejects(db.query('SELECT id FROM public.hospitality_inquiries WHERE false'), /permission denied/);
      await assert.rejects(db.query("UPDATE public.hospitality_inquiries SET status = 'won' WHERE false"), /permission denied/);
      await assert.rejects(db.query("INSERT INTO public.hospitality_inquiries(hotel_name,website_url,contact_name,email) VALUES ('Blocked','https://example.com','QA','qa@example.com')"), /permission denied/);
      await assert.rejects(db.query("SELECT public.submit_wuus_inquiry(gen_random_uuid(),repeat('b',64),'{}'::jsonb)"), /permission denied/);
      await db.exec('RESET ROLE');
    }
    // Test exact service-role execution, including a locked-down function search_path.
    await db.exec('SET ROLE service_role');
    const result = await db.query(`SELECT public.submit_wuus_inquiry(gen_random_uuid(),repeat('c',64),
      '{"hotel_name":"Service QA","website_url":"https://example.com","contact_name":"QA","email":"qa@example.com","notes":"","source":"review","request_type":"review","consent_version":"2026-10-07"}'::jsonb) AS result`);
    assert.equal(result.rows[0].result, 'saved');
    await db.exec('RESET ROLE');
  } finally { await db.close(); }
});
