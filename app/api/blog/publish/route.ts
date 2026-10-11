import { createBlogPublisher, type BlogPublication } from '@/lib/blog-publish';
import { blogDatabase, blogDatabaseConfigured } from '@/lib/blog-database';

export const runtime='nodejs';
export const maxDuration=30;
const handler=createBlogPublisher({
  secret:()=>process.env.WUUS_BLOG_PUBLISH_KEY,
  ready:()=>blogDatabaseConfigured(true),
  save:async(p:BlogPublication)=>{
    const {data,error}=await blogDatabase(true).rpc('publish_wuus_blog',{p_payload:p});
    if(error||!data)throw Error('BLOG_WRITE_FAILED');return data;
  },
  find:async(id:string)=>{
    const {data,error}=await blogDatabase(true).rpc('wuus_blog_receipt',{p_article_id:id});
    if(error)throw Error('BLOG_RECEIPT_FAILED');return data;
  },
});
export const POST=handler;
export const GET=handler;
