import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/article";
import { MarketingShell } from "@/components/marketing/shell";
import { blogArticle } from "@/lib/blog-content";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await blogArticle(slug);
  if (!article) notFound();
  const { post } = article;
  const url = `https://webuntukusaha.com/blog/${post.slug}`;
  return {
    title: `${post.title} | WUUS`, description: post.description,
    alternates: { canonical: url },
    openGraph: { title: post.title, description: post.description, url, type: "article", publishedTime: post.publishedAt, authors: ["WUUS"], locale: post.language === "en" ? "en_GB" : "id_ID", images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: ["/opengraph-image"] },
  };
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await blogArticle(slug);
  if (!article) notFound();
  const { post, body } = article;
  const schema = { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.description, datePublished: post.publishedAt, inLanguage: post.language, author: { "@type": "Organization", name: "WUUS", url: "https://webuntukusaha.com" }, publisher: { "@type": "Organization", name: "WUUS" }, mainEntityOfPage: `https://webuntukusaha.com/blog/${post.slug}` };
  return <MarketingShell language={post.language}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <div data-wuus-content-hash={article.contentHash}><BlogArticle post={post} body={body} /></div>
  </MarketingShell>;
}
