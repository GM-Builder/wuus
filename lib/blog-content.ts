import "server-only";
import { cache } from "react";
import { readFile } from "node:fs/promises";
import path from "node:path";
import inventory from "@/content/blog/articles.json";
import { isPublished, parseBlogPost, validBlogSlug, type BlogPost } from "./blog-policy";
import { connection } from 'next/server';
import { blogDatabase, blogDatabaseConfigured } from './blog-database';

const posts: BlogPost[] = inventory.map(parseBlogPost);
if (new Set(posts.map(post => post.slug)).size !== posts.length) throw new Error("Duplicate blog slug");

type BlogRow = { slug:string; title:string; description:string; language:string; category:string; sources:unknown; published_at:string; approved_at:string; body?:string; content_hash?:string };
function publicPost(row:BlogRow):BlogPost {
  return parseBlogPost({slug:row.slug,title:row.title,description:row.description,language:row.language,category:row.category,sources:row.sources,status:'published',publishedAt:new Date(row.published_at).toISOString(),approval:{approvedAt:new Date(row.approved_at).toISOString(),factsChecked:true}});
}
function publicClient() {
  return blogDatabaseConfigured() ? blogDatabase() : null;
}
const databasePosts=cache(async()=>{
  await connection();const client=publicClient();if(!client)return [];
  const {data,error}=await client.from('wuus_blog_posts').select('slug,title,description,language,category,sources,published_at,approved_at').eq('status','published').order('published_at',{ascending:false}).limit(200);
  if(error){console.error('WUUS blog database read unavailable.');return [];}
  return (data as BlogRow[]).map(publicPost);
});
export async function publishedPosts(now = new Date()): Promise<BlogPost[]> {
  const db=await databasePosts(),slugs=new Set(db.map(p=>p.slug));
  return [...db,...posts.filter(p=>!slugs.has(p.slug))].filter(post => isPublished(post, now))
    .sort((a, b) => Date.parse(b.publishedAt!) - Date.parse(a.publishedAt!));
}

export const blogArticle = cache(async function blogArticle(slug: string, preview = false) {
  if (!validBlogSlug(slug)) return null;
  // Preview never opens drafts in a production or deployed preview environment.
  if (preview && process.env.NODE_ENV !== "development") return null;
  if(!preview){
    await connection();const client=publicClient();
    if(client){
      const {data,error}=await client.from('wuus_blog_posts').select('slug,title,description,language,category,sources,published_at,approved_at,body,content_hash').eq('slug',slug).eq('status','published').maybeSingle();
      if(error){console.error('WUUS blog article read unavailable.');throw Error('Blog storage unavailable');}
      if(data){const row=data as BlogRow,post=publicPost(row);return isPublished(post)?{post,body:row.body!,contentHash:row.content_hash}:null;}
    }
  }
  const post = posts.find(item => item.slug === slug);
  if (!post || (!preview && !isPublished(post))) return null;
  const body = await readFile(path.join(process.cwd(), "content", "blog", `${slug}.md`), "utf8");
  return { post, body, contentHash: undefined };
});
