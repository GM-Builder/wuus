-- Run AFTER 03-blog-apply.sql. Non-destructive editorial scope extension.
begin;
alter table public.wuus_blog_posts drop constraint if exists wuus_blog_posts_language_check;
alter table public.wuus_blog_posts add constraint wuus_blog_posts_language_check check(language in ('en','id'));
alter table public.wuus_blog_posts drop constraint if exists wuus_blog_posts_category_check;
alter table public.wuus_blog_posts add constraint wuus_blog_posts_category_check check(category in ('Technology','AI & Robotics','Software','Crypto & Finance','Global Economy','Geopolitics','Hotel websites'));
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
    or not coalesce((p_payload->'qa'->'checks') @> '{"facts":true,"originality":true,"language":true,"brand":true,"noUnsupportedClaims":true}'::jsonb,false)
    or not coalesce((p_payload->'qa'->'checks'->>'contentRelevance')='true' or (p_payload->>'category'='Hotel websites' and (p_payload->'qa'->'checks'->>'hospitalityRelevance')='true'),false)
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

create or replace function public.wuus_blog_capabilities() returns jsonb
language sql stable security definer set search_path=pg_catalog as $$
 select '{"editorialVersion":2,"languages":["en","id"]}'::jsonb;
$$;
revoke all on function public.publish_wuus_blog(jsonb),public.wuus_blog_capabilities() from public,anon,authenticated;
grant execute on function public.publish_wuus_blog(jsonb),public.wuus_blog_capabilities() to service_role;
notify pgrst,'reload schema';
commit;
