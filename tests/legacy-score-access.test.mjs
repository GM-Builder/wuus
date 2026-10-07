import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';

test('retired score-table migration preserves data and denies public CRUD even with an old open policy',async()=>{
  const db=new PGlite();
  try{
    await db.exec('CREATE ROLE anon; CREATE ROLE authenticated;');
    const migration=await readFile(new URL('../supabase/migrations/202610070003_retire_score_tracking.sql',import.meta.url),'utf8');
    await db.exec(migration); // A project without the legacy table remains valid.
    await db.exec(`CREATE TABLE public.business_scores(id bigint generated always as identity primary key,score int);
      INSERT INTO public.business_scores(score) VALUES (42);
      ALTER TABLE public.business_scores ENABLE ROW LEVEL SECURITY;
      CREATE POLICY old_open ON public.business_scores FOR ALL TO public USING(true) WITH CHECK(true);
      GRANT ALL ON public.business_scores TO public,anon,authenticated;
      GRANT ALL ON SEQUENCE public.business_scores_id_seq TO public,anon,authenticated;`);
    await db.exec(migration); await db.exec(migration);
    assert.equal((await db.query('SELECT score FROM public.business_scores')).rows[0].score,42);
    for(const role of ['anon','authenticated']){
      await db.exec(`SET ROLE ${role}`);
      for(const sql of ['SELECT * FROM public.business_scores','INSERT INTO public.business_scores(score) VALUES(1)',
        'UPDATE public.business_scores SET score=0 WHERE false','DELETE FROM public.business_scores WHERE false',
        "SELECT nextval('public.business_scores_id_seq')"]){await assert.rejects(db.query(sql),/permission denied/);}
      await db.exec('RESET ROLE');
    }
  }finally{await db.close();}
});
