-- Retire the browser's unused score-tracking channel. Preserve historical rows.
-- Back up schema/grants/policies first; review dependent views/routines in staging.
begin;
do $$ declare entry record; sequence_name text;
begin
  if to_regclass('public.business_scores') is not null then
    alter table public.business_scores enable row level security;
    revoke all on table public.business_scores from public, anon, authenticated;
    for entry in select policyname from pg_policies
      where schemaname='public' and tablename='business_scores'
    loop execute format('drop policy %I on public.business_scores',entry.policyname); end loop;
    if exists (select 1 from information_schema.columns
      where table_schema='public' and table_name='business_scores' and column_name='id') then
      sequence_name := pg_get_serial_sequence('public.business_scores','id');
      if sequence_name is not null then
        execute format('revoke all on sequence %s from public, anon, authenticated',sequence_name);
      end if;
    end if;
  end if;
end $$;
commit;
