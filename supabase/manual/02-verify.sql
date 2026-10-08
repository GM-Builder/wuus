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
