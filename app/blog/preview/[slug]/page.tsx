import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/article";
import { MarketingShell } from "@/components/marketing/shell";
import { blogArticle } from "@/lib/blog-content";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Draft preview | WUUS", robots: { index: false, follow: false }, alternates: { canonical: null } };
export default async function DraftPreview({ params }: { params: Promise<{ slug: string }> }) {
  if (process.env.NODE_ENV !== "development") notFound();
  const { slug } = await params;
  const article = await blogArticle(slug, true);
  if (!article) notFound();
  return <MarketingShell language={article.post.language}><BlogArticle {...article} preview /></MarketingShell>;
}
