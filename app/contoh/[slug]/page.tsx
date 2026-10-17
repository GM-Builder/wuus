import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {StudioExampleSite} from '@/components/concepts/studio-examples';
import {getStudioExample, studioExamples} from '@/lib/studio-examples';

export const dynamicParams = false;
export function generateStaticParams(){return studioExamples.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params,example=getStudioExample(slug);
  if(!example)notFound();
  const title=`${example.brand} — ${example.category} | Contoh Desain WUUS`;
  const url=`https://webuntukusaha.com/contoh/${slug}`;
  return {title,description:example.description,alternates:{canonical:url},robots:{index:false,follow:true},openGraph:{title,description:example.description,url,locale:'id_ID',images:[{url:`/images/concepts/${slug}/hero.webp`,alt:example.imageAlt}]},twitter:{card:'summary_large_image',title,description:example.description,images:[`/images/concepts/${slug}/hero.webp`]}};
}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params,example=getStudioExample(slug);if(!example)notFound();return <StudioExampleSite example={example}/>;}
