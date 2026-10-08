-- WUUS manual Supabase bundle v1 (8 October 2026). Generated; do not edit by hand.
-- Read supabase/manual/README.md. Run 00-inspect first; save any existing data/schema backup privately.
-- Apply with the NEW safe frontend/server release; the old browser form will lose direct DB write access.
-- No Auth user/password, email provider, hosting environment or migration history is configured here.
begin;
set local lock_timeout='5s';
set local statement_timeout='60s';
-- Internal input to the generated apply file. Does not change schema or lead rows.
do $$
declare item record; relation_id oid; column_type text; problems text;
begin
  if exists (select 1 from (values ('anon'),('authenticated'),('service_role')) as expected(name)
    where not exists(select 1 from pg_roles r where r.rolname=expected.name)) then
    raise exception 'Run in the intended Supabase project: required database roles are missing.';
  end if;
  -- A different legacy schema must be reviewed, never deleted/recreated to fit this script.
  for item in select * from (values
    ('public.hospitality_inquiries','id',array['int2','int4','int8'],true),
    ('public.hospitality_inquiries','hotel_name',array['text','varchar'],true),
    ('public.hospitality_inquiries','website_url',array['text','varchar'],true),
    ('public.hospitality_inquiries','contact_name',array['text','varchar'],true),
    ('public.hospitality_inquiries','email',array['text','varchar'],true),
    ('public.hospitality_inquiries','notes',array['text','varchar'],true),
    ('public.hospitality_inquiries','status',array['text','varchar'],true),
    ('public.hospitality_inquiries','created_at',array['timestamptz'],true),
    ('public.hospitality_inquiries','request_id',array['uuid'],false),
    ('public.hospitality_inquiries','request_payload',array['jsonb'],false),
    ('public.hospitality_inquiries','source',array['text','varchar'],false),
    ('public.hospitality_inquiries','request_type',array['text','varchar'],false),
    ('public.hospitality_inquiries','consent_at',array['timestamptz'],false),
    ('public.hospitality_inquiries','consent_version',array['text','varchar'],false),
    ('public.wuus_inquiry_notifications','request_id',array['uuid'],true),
    ('public.wuus_inquiry_notifications','status',array['text'],true),
    ('public.wuus_inquiry_notifications','attempts',array['int4'],true),
    ('public.wuus_inquiry_notifications','available_at',array['timestamptz'],true),
    ('public.wuus_inquiry_notifications','first_attempt_at',array['timestamptz'],true),
    ('public.wuus_inquiry_notifications','lease_id',array['uuid'],true),
    ('public.wuus_inquiry_notifications','lease_until',array['timestamptz'],true),
    ('public.wuus_inquiry_notifications','provider_id',array['text'],true),
    ('public.wuus_inquiry_notifications','last_error',array['text'],true),
    ('public.wuus_inquiry_notifications','sent_at',array['timestamptz'],true),
    ('public.wuus_inquiry_notifications','created_at',array['timestamptz'],true),
    ('wuus_private.inquiry_rate_limits','network_key',array['text'],true),
    ('wuus_private.inquiry_rate_limits','window_start',array['timestamptz'],true),
    ('wuus_private.inquiry_rate_limits','requests',array['int4'],true)
  ) as expected(relation_name,column_name,allowed_types,required_if_table_exists)
  loop
    relation_id:=to_regclass(item.relation_name);
    if relation_id is null then continue; end if;
    if not exists(select 1 from pg_class where oid=relation_id and relkind in ('r','p')) then
      raise exception 'Expected table, found another object: %',item.relation_name;
    end if;
    select t.typname into column_type from pg_attribute a join pg_type t on t.oid=a.atttypid
      where a.attrelid=relation_id and a.attname=item.column_name and not a.attisdropped;
    if column_type is null and item.required_if_table_exists then
      raise exception 'Review legacy schema: missing %.%',item.relation_name,item.column_name;
    elsif column_type is not null and not(column_type=any(item.allowed_types)) then
      raise exception 'Review legacy schema: %.% has unsupported type %',item.relation_name,item.column_name,column_type;
    end if;
  end loop;
  relation_id:=to_regclass('public.hospitality_inquiries');
  if relation_id is not null then
    if not exists(select 1 from pg_attribute a left join pg_attrdef d on d.adrelid=a.attrelid and d.adnum=a.attnum
      where a.attrelid=relation_id and a.attname='id' and (a.attidentity<>'' or d.oid is not null)) then
      raise exception 'Review legacy id: inquiry id must have an identity/default generator.';
    end if;
    if not exists(select 1 from pg_index i join pg_attribute a on a.attrelid=i.indrelid and a.attname='id'
      where i.indrelid=relation_id and i.indisunique and i.indisvalid and i.indnkeyatts=1
        and i.indkey[0]=a.attnum and i.indpred is null) then
      raise exception 'Review legacy id: inquiry id needs a valid single-column unique/primary index.';
    end if;
    select string_agg(a.attname,', ') into problems from pg_attribute a
      left join pg_attrdef d on d.adrelid=a.attrelid and d.adnum=a.attnum
      where a.attrelid=relation_id and a.attnum>0 and not a.attisdropped and a.attnotnull
        and d.oid is null and a.attidentity='' and a.attgenerated=''
        and a.attname not in ('id','hotel_name','website_url','contact_name','email','notes','status','created_at',
          'request_id','request_payload','source','request_type','consent_at','consent_version');
    if problems is not null then raise exception 'Review required legacy columns not supplied by inquiry API: %',problems; end if;
    select string_agg(t.tgname,', ') into problems from pg_trigger t
      where t.tgrelid=relation_id and not t.tgisinternal and t.tgname<>'queue_owner_notification';
    if problems is not null then raise exception 'Review existing inquiry triggers before applying: %',problems; end if;
  end if;
  -- Detect public views, including chains of views; no lead values are selected.
  with recursive dependents(oid) as (
    select c.oid from pg_class c join pg_namespace n on n.oid=c.relnamespace
      where n.nspname='public' and c.relname in ('hospitality_inquiries','wuus_inquiry_notifications','business_scores')
    union
    select v.oid from dependents base join pg_depend d on d.refobjid=base.oid
      join pg_rewrite r on r.oid=d.objid join pg_class v on v.oid=r.ev_class where v.relkind in ('v','m')
  ) select string_agg(format('%I.%I',n.nspname,c.relname),', ') into problems
    from dependents d join pg_class c on c.oid=d.oid join pg_namespace n on n.oid=c.relnamespace
    where c.relkind in ('v','m') and (has_table_privilege('anon',c.oid,'SELECT')
      or has_table_privilege('authenticated',c.oid,'SELECT')
      or has_any_column_privilege('anon',c.oid,'SELECT') or has_any_column_privilege('authenticated',c.oid,'SELECT'));
  if problems is not null then raise exception 'Review publicly readable dependent views: %',problems; end if;
  -- Direct references only. Review all definer names in 00-inspect for indirect/dynamic SQL.
  select string_agg(format('%I.%I(%s)',n.nspname,p.proname,pg_get_function_identity_arguments(p.oid)),', ') into problems
    from pg_proc p join pg_namespace n on n.oid=p.pronamespace
    where p.prosecdef and n.nspname in ('public','wuus_private')
      and lower(p.prosrc)~'(hospitality_inquiries|wuus_inquiry_notifications|business_scores|wuus_private)'
      and (has_function_privilege('anon',p.oid,'EXECUTE') or has_function_privilege('authenticated',p.oid,'EXECUTE'))
      and p.oid not in (coalesce(to_regprocedure('public.submit_wuus_inquiry(uuid,text,jsonb)'),0::oid),
        coalesce(to_regprocedure('public.claim_wuus_notifications(uuid,integer)'),0::oid),
        coalesce(to_regprocedure('public.finish_wuus_notification(uuid,uuid,text,text)'),0::oid),
        coalesce(to_regprocedure('wuus_private.queue_inquiry_notification()'),0::oid));
  if problems is not null then raise exception 'Review public security-definer routines referencing WUUS data: %',problems; end if;
end $$;

-- Source: 202610070001_secure_inquiries.sql | sha256: 361d6e3a04070be88eb7bb99f7d1973d5c4417992ff579c0f845158fff6dfc55
-- Review in staging first. Back up existing table and policies before applying.

create table if not exists public.hospitality_inquiries (
  id bigint generated by default as identity primary key,
  hotel_name text not null, website_url text not null, contact_name text not null,
  email text not null, notes text, status text default 'new' not null,
  created_at timestamptz default now() not null
);
alter table public.hospitality_inquiries
  add column if not exists request_id uuid,
  add column if not exists request_payload jsonb,
  add column if not exists source text,
  add column if not exists request_type text,
  add column if not exists consent_at timestamptz,
  add column if not exists consent_version text;
create unique index if not exists hospitality_inquiries_request_id on public.hospitality_inquiries(request_id);
alter table public.hospitality_inquiries enable row level security;
revoke all on table public.hospitality_inquiries from public, anon, authenticated;
grant select, insert, update, delete on public.hospitality_inquiries to service_role;
-- Existing public policies are deliberately removed; restore only from reviewed backup.
do $$ declare entry record; column_names text;
begin
  -- Table REVOKE alone does not revoke pre-existing column-level grants.
  select string_agg(format('%I',attname),',') into column_names from pg_attribute
    where attrelid='public.hospitality_inquiries'::regclass and attnum>0 and not attisdropped;
  execute format('revoke all (%s) on table public.hospitality_inquiries from public, anon, authenticated',column_names);
  for entry in select policyname from pg_policies where schemaname = 'public' and tablename = 'hospitality_inquiries'
  loop execute format('drop policy %I on public.hospitality_inquiries', entry.policyname); end loop;
  -- Identity sequence may already exist under a different name.
  if pg_get_serial_sequence('public.hospitality_inquiries', 'id') is not null then
    execute format('revoke all on sequence %s from public, anon, authenticated', pg_get_serial_sequence('public.hospitality_inquiries', 'id'));
    execute format('grant usage, select on sequence %s to service_role', pg_get_serial_sequence('public.hospitality_inquiries', 'id'));
  end if;
end $$;

create schema if not exists wuus_private;
revoke all on schema wuus_private from public, anon, authenticated;
create table if not exists wuus_private.inquiry_rate_limits (
  network_key text primary key,
  window_start timestamptz not null,
  requests integer not null check (requests > 0)
);
revoke all on wuus_private.inquiry_rate_limits from public, anon, authenticated;

create or replace function public.submit_wuus_inquiry(p_request_id uuid, p_network_key text, p_payload jsonb)
returns text language plpgsql security definer set search_path = '' as $$
declare existing_payload jsonb; bucket wuus_private.inquiry_rate_limits%rowtype;
begin
  if p_request_id is null or p_network_key !~ '^[a-f0-9]{64}$' or p_network_key is null
    or p_payload is null or jsonb_typeof(p_payload) <> 'object' then
    raise exception 'Invalid request';
  end if;
  -- Request lock prevents concurrent retries on different networks from inserting twice.
  perform pg_advisory_xact_lock(hashtextextended(p_request_id::text, 0));
  select request_payload into existing_payload from public.hospitality_inquiries where request_id = p_request_id;
  if found then
    if existing_payload = p_payload then return 'duplicate'; else return 'conflict'; end if;
  end if;
  -- Network lock and durable counter work across serverless instances.
  perform pg_advisory_xact_lock(hashtextextended(p_network_key, 1));
  select * into bucket from wuus_private.inquiry_rate_limits where network_key = p_network_key;
  if not found or bucket.window_start <= now() - interval '15 minutes' then
    insert into wuus_private.inquiry_rate_limits values (p_network_key, now(), 1)
      on conflict (network_key) do update set window_start = excluded.window_start, requests = 1;
  elsif bucket.requests >= 5 then return 'limited';
  else update wuus_private.inquiry_rate_limits set requests = requests + 1 where network_key = p_network_key;
  end if;
  insert into public.hospitality_inquiries
    (request_id, request_payload, hotel_name, website_url, contact_name, email, notes, status, source, request_type, consent_at, consent_version)
  values (p_request_id, p_payload, p_payload->>'hotel_name', p_payload->>'website_url', p_payload->>'contact_name',
    p_payload->>'email', p_payload->>'notes', 'new', p_payload->>'source', p_payload->>'request_type', now(), p_payload->>'consent_version');
  return 'saved';
end $$;
revoke all on function public.submit_wuus_inquiry(uuid, text, jsonb) from public, anon, authenticated;
grant execute on function public.submit_wuus_inquiry(uuid, text, jsonb) to service_role;

-- Source: 202610070002_inquiry_notifications.sql | sha256: bb184088f1f38956d91f2618255a1cbca75bf4f272defc7055badcaa3c07dd7b
-- Apply after 001. The lead and its notification are committed together.

create table if not exists public.wuus_inquiry_notifications (
  request_id uuid primary key references public.hospitality_inquiries(request_id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','processing','sent','failed')),
  attempts integer not null default 0,
  available_at timestamptz not null default now(),
  first_attempt_at timestamptz,
  lease_id uuid,
  lease_until timestamptz,
  provider_id text,
  last_error text,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.wuus_inquiry_notifications enable row level security;
revoke all on public.wuus_inquiry_notifications from public, anon, authenticated;
grant select on public.wuus_inquiry_notifications to service_role;
do $$ declare entry record; column_names text;
begin
  select string_agg(format('%I',attname),',') into column_names from pg_attribute
    where attrelid='public.wuus_inquiry_notifications'::regclass and attnum>0 and not attisdropped;
  execute format('revoke all (%s) on table public.wuus_inquiry_notifications from public, anon, authenticated',column_names);
  for entry in select policyname from pg_policies where schemaname='public' and tablename='wuus_inquiry_notifications'
  loop execute format('drop policy %I on public.wuus_inquiry_notifications',entry.policyname); end loop;
end $$;

create or replace function wuus_private.queue_inquiry_notification()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if new.request_id is not null then
    insert into public.wuus_inquiry_notifications(request_id) values (new.request_id) on conflict do nothing;
  end if;
  return new;
end $$;
revoke all on function wuus_private.queue_inquiry_notification() from public, anon, authenticated;
drop trigger if exists queue_owner_notification on public.hospitality_inquiries;
create trigger queue_owner_notification after insert on public.hospitality_inquiries
  for each row execute function wuus_private.queue_inquiry_notification();

create or replace function public.claim_wuus_notifications(p_request_id uuid default null, p_limit integer default 5)
returns table(request_id uuid, lease_id uuid) language plpgsql security definer set search_path = '' as $$
begin
  -- Resend keys expire after 24h. Stop automatic retries before that boundary.
  -- The owner must inspect provider delivery history before any manual resend.
  update public.wuus_inquiry_notifications n set status='failed', last_error='retry_window_expired', lease_id=null, lease_until=null
    where n.status in ('pending','processing') and n.first_attempt_at <= now() - interval '23 hours';
  return query
  with candidates as (
    select n.request_id from public.wuus_inquiry_notifications n
    where (p_request_id is null or n.request_id=p_request_id)
      and n.attempts < 5 and n.available_at <= now()
      and (n.status='pending' or (n.status='processing' and n.lease_until < now()))
    order by n.created_at for update skip locked limit greatest(1,least(coalesce(p_limit,5),5))
  )
  update public.wuus_inquiry_notifications n
    set status='processing', attempts=n.attempts+1, first_attempt_at=coalesce(n.first_attempt_at,now()),
      lease_id=gen_random_uuid(), lease_until=now()+interval '5 minutes'
    from candidates c where n.request_id=c.request_id returning n.request_id,n.lease_id;
  update public.wuus_inquiry_notifications n set status='failed',last_error='attempt_limit',lease_id=null,lease_until=null
    where n.status='processing' and n.lease_until < now() and n.attempts >= 5;
end $$;

create or replace function public.finish_wuus_notification(p_request_id uuid,p_lease_id uuid,p_provider_id text,p_error text)
returns boolean language plpgsql security definer set search_path = '' as $$
begin
  update public.wuus_inquiry_notifications n set
    status=case when p_provider_id is not null then 'sent' when n.attempts>=5 then 'failed' else 'pending' end,
    provider_id=left(p_provider_id,300), last_error=left(p_error,80),
    sent_at=case when p_provider_id is not null then now() else null end,
    available_at=now()+make_interval(mins=>least(60,(power(3,n.attempts))::integer)),
    lease_id=null,lease_until=null
    where n.request_id=p_request_id and n.lease_id=p_lease_id and n.status='processing';
  return found;
end $$;
revoke all on function public.claim_wuus_notifications(uuid,integer) from public,anon,authenticated;
revoke all on function public.finish_wuus_notification(uuid,uuid,text,text) from public,anon,authenticated;
grant execute on function public.claim_wuus_notifications(uuid,integer) to service_role;
grant execute on function public.finish_wuus_notification(uuid,uuid,text,text) to service_role;

-- Source: 202610070003_retire_score_tracking.sql | sha256: ca1f6ff5f7873d068025e7f13e67b905eebf267635c05ad7ddafce35692b9ffc
-- Retire the browser's unused score-tracking channel. Preserve historical rows.
-- Back up schema/grants/policies first; review dependent views/routines in staging.

do $$ declare entry record; sequence_name text; column_names text;
begin
  if to_regclass('public.business_scores') is not null then
    alter table public.business_scores enable row level security;
    revoke all on table public.business_scores from public, anon, authenticated;
    select string_agg(format('%I',attname),',') into column_names from pg_attribute
      where attrelid='public.business_scores'::regclass and attnum>0 and not attisdropped;
    execute format('revoke all (%s) on table public.business_scores from public, anon, authenticated',column_names);
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
-- Recheck private access and queue trigger before commit. Any failed check rolls everything back.
do $$ declare item record;
begin
  for item in with tables as (
  select name,to_regclass(name) as oid,required from (values
    ('public.hospitality_inquiries',true),('public.wuus_inquiry_notifications',true),('public.business_scores',false)
  ) as expected(name,required)
), functions as (
  select name,to_regprocedure(name) as oid from (values
    ('public.submit_wuus_inquiry(uuid,text,jsonb)'),('public.claim_wuus_notifications(uuid,integer)'),
    ('public.finish_wuus_notification(uuid,uuid,text,text)')
  ) as expected(name)
), checks as (
  select name||' exists / legacy optional' as check_name,(oid is not null or not required) as passed from tables
  union all
  select name||' RLS enabled',case when oid is null then not required else (select relrowsecurity from pg_class where pg_class.oid=t.oid) end from tables t
  union all
  select name||' no anon/auth table grants',case when oid is null then not required else
    not(has_table_privilege('anon',oid,'SELECT,INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER')
      or has_table_privilege('authenticated',oid,'SELECT,INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER')) end from tables
  union all
  select name||' no anon/auth column grants',case when oid is null then not required else
    not(has_any_column_privilege('anon',oid,'SELECT,INSERT,UPDATE,REFERENCES')
      or has_any_column_privilege('authenticated',oid,'SELECT,INSERT,UPDATE,REFERENCES')) end from tables
  union all
  select name||' no public policies',case when oid is null then not required else
    not exists(select 1 from pg_policy p where p.polrelid=t.oid) end from tables t
  union all
  select name||' service RPC enabled',coalesce(has_function_privilege('service_role',oid,'EXECUTE'),false) from functions
  union all
  select name||' no anon/auth RPC execute',oid is not null and
    not(has_function_privilege('anon',oid,'EXECUTE') or has_function_privilege('authenticated',oid,'EXECUTE')) from functions
  union all
  select 'wuus_private no public schema access',case when to_regnamespace('wuus_private') is null then false else
    not(has_schema_privilege('anon','wuus_private','USAGE,CREATE') or has_schema_privilege('authenticated','wuus_private','USAGE,CREATE')) end
  union all
  select 'notification trigger enabled',exists(select 1 from pg_trigger t
    where t.tgrelid=to_regclass('public.hospitality_inquiries') and t.tgname='queue_owner_notification'
      and t.tgfoid=to_regprocedure('wuus_private.queue_inquiry_notification()') and t.tgenabled in ('O','A'))
  union all
  select 'rate-limit table exists',to_regclass('wuus_private.inquiry_rate_limits') is not null
)
select check_name,case when coalesce(passed,false) then 'PASS' else 'FAIL' end as result from checks order by check_name
  loop
    if item.result<>'PASS' then raise exception 'WUUS postcheck failed: %',item.check_name; end if;
  end loop;
end $$;
notify pgrst,'reload schema';
commit;
-- READ ONLY. All checks must be PASS; this does not test actual Auth/API/inbox.
-- Unknown security-definer routines/dynamic SQL still require inventory review.
with tables as (
  select name,to_regclass(name) as oid,required from (values
    ('public.hospitality_inquiries',true),('public.wuus_inquiry_notifications',true),('public.business_scores',false)
  ) as expected(name,required)
), functions as (
  select name,to_regprocedure(name) as oid from (values
    ('public.submit_wuus_inquiry(uuid,text,jsonb)'),('public.claim_wuus_notifications(uuid,integer)'),
    ('public.finish_wuus_notification(uuid,uuid,text,text)')
  ) as expected(name)
), checks as (
  select name||' exists / legacy optional' as check_name,(oid is not null or not required) as passed from tables
  union all
  select name||' RLS enabled',case when oid is null then not required else (select relrowsecurity from pg_class where pg_class.oid=t.oid) end from tables t
  union all
  select name||' no anon/auth table grants',case when oid is null then not required else
    not(has_table_privilege('anon',oid,'SELECT,INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER')
      or has_table_privilege('authenticated',oid,'SELECT,INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER')) end from tables
  union all
  select name||' no anon/auth column grants',case when oid is null then not required else
    not(has_any_column_privilege('anon',oid,'SELECT,INSERT,UPDATE,REFERENCES')
      or has_any_column_privilege('authenticated',oid,'SELECT,INSERT,UPDATE,REFERENCES')) end from tables
  union all
  select name||' no public policies',case when oid is null then not required else
    not exists(select 1 from pg_policy p where p.polrelid=t.oid) end from tables t
  union all
  select name||' service RPC enabled',coalesce(has_function_privilege('service_role',oid,'EXECUTE'),false) from functions
  union all
  select name||' no anon/auth RPC execute',oid is not null and
    not(has_function_privilege('anon',oid,'EXECUTE') or has_function_privilege('authenticated',oid,'EXECUTE')) from functions
  union all
  select 'wuus_private no public schema access',case when to_regnamespace('wuus_private') is null then false else
    not(has_schema_privilege('anon','wuus_private','USAGE,CREATE') or has_schema_privilege('authenticated','wuus_private','USAGE,CREATE')) end
  union all
  select 'notification trigger enabled',exists(select 1 from pg_trigger t
    where t.tgrelid=to_regclass('public.hospitality_inquiries') and t.tgname='queue_owner_notification'
      and t.tgfoid=to_regprocedure('wuus_private.queue_inquiry_notification()') and t.tgenabled in ('O','A'))
  union all
  select 'rate-limit table exists',to_regclass('wuus_private.inquiry_rate_limits') is not null
)
select check_name,case when coalesce(passed,false) then 'PASS' else 'FAIL' end as result from checks order by check_name;
