-- Apply after 001. The lead and its notification are committed together.
begin;
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
commit;
