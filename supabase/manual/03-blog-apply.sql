-- Run ONCE in the existing WUUS Supabase SQL Editor. Safe to rerun.
-- This adds blog storage only. It does not change inquiries, auth users or notifications.
begin;
create schema if not exists wuus_private;
revoke all on schema wuus_private from public,anon,authenticated;

create table if not exists public.wuus_blog_posts(
  id uuid primary key,
  slug text not null unique check(slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(slug)<=100),
  title text not null check(length(title) between 10 and 65),
  description text not null check(length(description) between 60 and 160),
  language text not null check(language='en'),
  category text not null check(category='Hotel websites'),
  body text not null check(length(body) between 200 and 30000),
  sources jsonb not null check(jsonb_typeof(sources)='array'),
  content_hash text not null check(content_hash ~ '^[0-9a-f]{64}$'),
  status text not null default 'published' check(status in ('draft','published','withdrawn')),
  approved_at timestamptz not null,
  published_at timestamptz not null default now(),
  check(approved_at<=published_at)
);
create table if not exists wuus_private.blog_release_receipts(
  article_id uuid primary key references public.wuus_blog_posts(id),
  payload jsonb not null,
  receipt jsonb not null,
  created_at timestamptz not null default now()
);
alter table public.wuus_blog_posts enable row level security;
alter table wuus_private.blog_release_receipts enable row level security;
revoke all on public.wuus_blog_posts from public,anon,authenticated;
revoke all on wuus_private.blog_release_receipts from public,anon,authenticated;
do $$ declare p record; cols text;
begin
  select string_agg(format('%I',attname),',') into cols from pg_attribute where attrelid='public.wuus_blog_posts'::regclass and attnum>0 and not attisdropped;
  execute format('revoke all (%s) on public.wuus_blog_posts from public,anon,authenticated',cols);
  for p in select policyname from pg_policies where schemaname='public' and tablename='wuus_blog_posts'
  loop execute format('drop policy %I on public.wuus_blog_posts',p.policyname);end loop;
end $$;
grant select on public.wuus_blog_posts to anon,authenticated,service_role;
create policy wuus_blog_public_read on public.wuus_blog_posts for select to anon,authenticated
  using(status='published' and published_at<=now() and approved_at<=published_at);
create index if not exists wuus_blog_public_date on public.wuus_blog_posts(published_at desc) where status='published';

create or replace function public.publish_wuus_blog(p_payload jsonb) returns jsonb
language plpgsql security definer set search_path=pg_catalog,public,wuus_private as $$
declare v_id uuid; old wuus_private.blog_release_receipts%rowtype; result jsonb;
begin
  v_id := (p_payload->>'articleId')::uuid;
  if v_id is null or (p_payload->>'articleHash') is null or (p_payload->>'articleHash') !~ '^[0-9a-f]{64}$'
    or (p_payload->>'contentHash') is null or (p_payload->>'body') is null
    or p_payload->>'contentHash' <> encode(sha256(convert_to(p_payload->>'body','UTF8')),'hex')
    or jsonb_typeof(p_payload->'qa'->'evidence') is distinct from 'array'
    or jsonb_array_length(p_payload->'qa'->'evidence') not between 1 and 12
    or not coalesce((p_payload->'qa'->'checks') @> '{"facts":true,"originality":true,"language":true,"hospitalityRelevance":true,"brand":true,"noUnsupportedClaims":true}'::jsonb,false)
    or (p_payload->'qa'->>'approvedAt') is null or (p_payload->'qa'->>'approvedAt')::timestamptz>now()
  then raise exception 'Invalid blog publication';end if;
  perform pg_advisory_xact_lock(hashtextextended(v_id::text,0));
  select * into old from wuus_private.blog_release_receipts where article_id=v_id;
  if found then
    if old.payload=p_payload then return old.receipt;else return '{"state":"conflict"}'::jsonb;end if;
  end if;
  insert into public.wuus_blog_posts(id,slug,title,description,language,category,body,sources,content_hash,approved_at)
  values(v_id,p_payload->>'slug',p_payload->>'title',p_payload->>'description',p_payload->>'language',p_payload->>'category',p_payload->>'body',p_payload->'sources',p_payload->>'contentHash',(p_payload->'qa'->>'approvedAt')::timestamptz)
  on conflict do nothing;
  if not found then return '{"state":"conflict"}'::jsonb;end if;
  select jsonb_build_object('state','published','articleId',v_id,'articleHash',p_payload->>'articleHash','contentHash',content_hash,'slug',slug,'publishedAt',published_at)
    into result from public.wuus_blog_posts where public.wuus_blog_posts.id=v_id;
  insert into wuus_private.blog_release_receipts(article_id,payload,receipt) values(v_id,p_payload,result);
  return result;
end $$;
create or replace function public.wuus_blog_receipt(p_article_id uuid) returns jsonb
language sql stable security definer set search_path=pg_catalog,wuus_private as $$
  select receipt from wuus_private.blog_release_receipts where article_id=p_article_id;
$$;
revoke all on function public.publish_wuus_blog(jsonb),public.wuus_blog_receipt(uuid) from public,anon,authenticated;
grant execute on function public.publish_wuus_blog(jsonb),public.wuus_blog_receipt(uuid) to service_role;
notify pgrst,'reload schema';
commit;
