import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/shell";
import { BrandArtwork } from "@/components/marketing/brand-artwork";
import { publishedPosts } from "@/lib/blog-content";
import s from "@/components/blog/blog.module.css";

export const metadata: Metadata = {
  title: "Technology, AI and global insights | WUUS Blog",
  description: "Technology, AI, software, finance and global developments, explained with sources and context by WUUS.",
  alternates: { canonical: "https://webuntukusaha.com/blog" },
  openGraph: { title: "Technology and global insights | WUUS", description: "Technology, AI and global developments with clear context.", url: "https://webuntukusaha.com/blog", type: "website", locale: "en_GB", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "WUUS Insights", description: "Technology, AI, software and the world around us.", images: ["/opengraph-image"] },
};

export default async function BlogPage() {
  const posts = await publishedPosts();
  return <MarketingShell>
    <main id="main" className={s.container}>
      <section className={s.hero}>
        <div><p className={s.eyebrow}>WUUS Insights</p><h1>Understand technology. See the bigger picture.</h1><p className={s.intro}>Technology, AI, software, finance and global developments. Clear explanations, primary sources and practical context.</p></div>
        <div className={s.desk}>
          <div className={s.deskTitle}><span>A clearer perspective</span><BrandArtwork /></div>
          <ul>{["Technology & AI", "Software & digital life", "Finance & the economy", "Policy & global developments"].map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
          <p>Evidence. Context. Clear thinking.</p>
        </div>
      </section>
      <section className={s.section} aria-labelledby="articles-title">
        <div className={s.sectionHead}><h2 id="articles-title">Latest insights</h2><p>English & Indonesian · Sources and context</p></div>
        {posts.length ? <div className={s.grid}>{posts.map(post => <article className={s.card} key={post.slug}><Link href={`/blog/${post.slug}`}><div className={s.cover}><span>{post.category}</span></div><div className={s.cardBody}><h3>{post.title}</h3><p>{post.description}</p><time className={s.date} dateTime={post.publishedAt}>{new Date(post.publishedAt!).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time></div></Link></article>)}</div> : <div className={s.empty}><div><h3>New insights are being prepared.</h3><p>We check sources and context before publication. Explore WUUS while our next articles are being reviewed.</p></div><Link href="/hospitality" className={s.button}>Explore WUUS <span aria-hidden="true">↗</span></Link></div>}
      </section>
    </main>
  </MarketingShell>;
}
