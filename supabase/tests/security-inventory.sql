-- Read-only inventory for an authorised database administrator.
-- Save results privately. No lead content or credentials are selected.
select c.relname, c.relrowsecurity, c.relforcerowsecurity
from pg_class c join pg_namespace n on n.oid=c.relnamespace
where n.nspname='public' and c.relname in ('hospitality_inquiries','wuus_inquiry_notifications','business_scores');

select grantee,table_name,privilege_type from information_schema.role_table_grants
where table_schema='public' and table_name in ('hospitality_inquiries','wuus_inquiry_notifications','business_scores')
order by table_name,grantee,privilege_type;

select schemaname,tablename,policyname,roles,cmd,qual,with_check from pg_policies
where schemaname='public' and tablename in ('hospitality_inquiries','wuus_inquiry_notifications','business_scores');

-- Dependent views may expose data through the view owner's permissions.
select distinct ns.nspname as schema_name,v.relname as view_name,v.reloptions
from pg_depend d join pg_rewrite r on r.oid=d.objid
join pg_class v on v.oid=r.ev_class join pg_namespace ns on ns.oid=v.relnamespace
where d.refobjid in (to_regclass('public.hospitality_inquiries'),to_regclass('public.wuus_inquiry_notifications'),to_regclass('public.business_scores'))
and v.relkind in ('v','m');

-- Security-definer routines need manual review, including indirect/dynamic SQL.
-- Names/permissions only; function bodies can contain private configuration.
select n.nspname as schema_name,p.proname,pg_get_function_identity_arguments(p.oid) as arguments,
has_function_privilege('anon',p.oid,'EXECUTE') as anon_execute,
has_function_privilege('authenticated',p.oid,'EXECUTE') as authenticated_execute,
p.proconfig as configuration
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where p.prosecdef and n.nspname in ('public','wuus_private')
order by n.nspname,p.proname;
