-- Run AFTER migration in a disposable staging database. All test data rolls back.
begin;
do $$
declare request_id uuid := gen_random_uuid(); key text := repeat('a',64); result text;
  payload jsonb := '{"hotel_name":"WUUS QA ONLY","website_url":"https://example.com/","contact_name":"QA","email":"qa@example.com","notes":"synthetic","request_type":"review","source":"review","consent_version":"2026-10-07"}';
begin
  if not (select relrowsecurity from pg_class where oid = 'public.hospitality_inquiries'::regclass) then raise exception 'RLS disabled'; end if;
  if has_table_privilege('anon', 'public.hospitality_inquiries', 'SELECT,INSERT,UPDATE,DELETE')
    or has_table_privilege('authenticated', 'public.hospitality_inquiries', 'SELECT,INSERT,UPDATE,DELETE') then raise exception 'Public privileges still granted'; end if;
  if has_function_privilege('anon', 'public.submit_wuus_inquiry(uuid,text,jsonb)', 'EXECUTE')
    or has_function_privilege('authenticated', 'public.submit_wuus_inquiry(uuid,text,jsonb)', 'EXECUTE') then raise exception 'RPC exposed'; end if;
  if not has_function_privilege('service_role', 'public.submit_wuus_inquiry(uuid,text,jsonb)', 'EXECUTE') then raise exception 'Service cannot submit'; end if;
  delete from wuus_private.inquiry_rate_limits where network_key = key;
  result := public.submit_wuus_inquiry(request_id,key,payload);
  if result <> 'saved' then raise exception 'First request not saved'; end if;
  result := public.submit_wuus_inquiry(request_id,key,payload);
  if result <> 'duplicate' then raise exception 'Retry not deduplicated'; end if;
  result := public.submit_wuus_inquiry(request_id,key,payload || '{"notes":"different"}'::jsonb);
  if result <> 'conflict' then raise exception 'Changed retry accepted'; end if;
  for counter in 1..4 loop
    if public.submit_wuus_inquiry(gen_random_uuid(),key,payload) <> 'saved' then raise exception 'Rate limit early'; end if;
  end loop;
  if public.submit_wuus_inquiry(gen_random_uuid(),key,payload) <> 'limited' then raise exception 'Rate limit failed'; end if;
  update wuus_private.inquiry_rate_limits set window_start = now() - interval '16 minutes' where network_key = key;
  if public.submit_wuus_inquiry(gen_random_uuid(),key,payload) <> 'saved' then raise exception 'Window did not reset'; end if;
end $$;
rollback;
