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
