-- READ ONLY. Run first in the intended Supabase project's SQL Editor.
-- Save privately with any existing table data/schema backup. No lead values/secrets.
select jsonb_pretty(jsonb_build_object(
  'columns',coalesce((select jsonb_agg(row_to_json(x)) from (
    select table_schema,table_name,column_name,data_type,is_nullable,column_default
    from information_schema.columns where
      (table_schema='public' and table_name in ('hospitality_inquiries','wuus_inquiry_notifications','business_scores'))
      or (table_schema='wuus_private' and table_name='inquiry_rate_limits')
    order by table_schema,table_name,ordinal_position) x),'[]'::jsonb),
  'policies',coalesce((select jsonb_agg(row_to_json(x)) from (
    select schemaname,tablename,policyname,roles,cmd,qual,with_check from pg_policies
    where schemaname='public' and tablename in ('hospitality_inquiries','wuus_inquiry_notifications','business_scores')) x),'[]'::jsonb),
  'table_grants',coalesce((select jsonb_agg(row_to_json(x)) from (
    select grantee,table_name,privilege_type from information_schema.role_table_grants
    where table_schema='public' and table_name in ('hospitality_inquiries','wuus_inquiry_notifications','business_scores')) x),'[]'::jsonb),
  'column_grants',coalesce((select jsonb_agg(row_to_json(x)) from (
    select grantee,table_name,column_name,privilege_type from information_schema.column_privileges
    where table_schema='public' and table_name in ('hospitality_inquiries','wuus_inquiry_notifications','business_scores')) x),'[]'::jsonb),
  'triggers',coalesce((select jsonb_agg(row_to_json(x)) from (
    select c.relname as table_name,t.tgname,p.proname as function_name
    from pg_trigger t join pg_class c on c.oid=t.tgrelid join pg_namespace n on n.oid=c.relnamespace
    join pg_proc p on p.oid=t.tgfoid
    where n.nspname='public' and c.relname in ('hospitality_inquiries','wuus_inquiry_notifications','business_scores') and not t.tgisinternal) x),'[]'::jsonb),
  'security_definers_review_required',coalesce((select jsonb_agg(row_to_json(x)) from (
    select n.nspname as schema_name,p.proname,pg_get_function_identity_arguments(p.oid) as arguments,
      has_function_privilege('anon',p.oid,'EXECUTE') as anon_execute,
      has_function_privilege('authenticated',p.oid,'EXECUTE') as authenticated_execute
    from pg_proc p join pg_namespace n on n.oid=p.pronamespace
    where p.prosecdef and n.nspname in ('public','wuus_private')) x),'[]'::jsonb),
  'dependent_views_review_required',coalesce((with recursive dependents(oid) as (
    select c.oid from pg_class c join pg_namespace n on n.oid=c.relnamespace
      where n.nspname='public' and c.relname in ('hospitality_inquiries','wuus_inquiry_notifications','business_scores')
    union
    select v.oid from dependents base join pg_depend d on d.refobjid=base.oid
      join pg_rewrite r on r.oid=d.objid join pg_class v on v.oid=r.ev_class where v.relkind in ('v','m')
  ) select jsonb_agg(jsonb_build_object('schema',n.nspname,'view',c.relname,'options',c.reloptions,
    'anon_select',has_table_privilege('anon',c.oid,'SELECT') or has_any_column_privilege('anon',c.oid,'SELECT'),
    'authenticated_select',has_table_privilege('authenticated',c.oid,'SELECT') or has_any_column_privilege('authenticated',c.oid,'SELECT')))
    from dependents d join pg_class c on c.oid=d.oid join pg_namespace n on n.oid=c.relnamespace where c.relkind in ('v','m')),'[]'::jsonb)
)) as schema_inventory;
