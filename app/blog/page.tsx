import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/shell";
import { BrandArtwork } from "@/components/marketing/brand-artwork";
import { publishedPosts } from "@/lib/blog-content";
import s from "@/components/blog/blog.module.css";

export const metadata: Metadata = {
  title: "Hospitality website guides | WUUS Blog",
  description: "Practical website planning notes for independent hotels and properties, from room content and photography to inquiry and booking journeys.",
  alternates: { canonical: "https://webuntukusaha.com/blog" },
  openGraph: { title: "Practical website notes for independent properties | WUUS", description: "Website planning, guest journeys and a clearer starting point for your property.", url: "https://webuntukusaha.com/blog", type: "website", locale: "en_GB", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "WUUS Blog — Hospitality website guides", description: "Practical website notes for independent properties.", images: ["/opengraph-image"] },
};

export default async function BlogPage() {
  const posts = await publishedPosts();
  return <MarketingShell>
    <main id="main" className={s.container}>
      <section className={s.hero}>
        <div><p className={s.eyebrow}>The WUUS notebook</p><h1>Good websites start with clear decisions.</h1><p className={s.intro}>Practical notes for independent properties. Plan your content, simplify the guest journey and know what to ask before you build.</p></div>
        <div className={s.desk}>
          <div className={s.deskTitle}><span>A clearer website brief</span><BrandArtwork /></div>
          <ul>{["Describe your property", "Show the right rooms", "Make the next step clear", "Agree the scope"].map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
          <p>Content. Guest journey. Project planning.</p>
        </div>
      </section>
      <section className={s.section} aria-labelledby="articles-title">
        <div className={s.sectionHead}><h2 id="articles-title">From the notebook</h2><p>Guides in English · Written for property owners</p></div>
        {posts.length ? <div className={s.grid}>{posts.map(post => <article className={s.card} key={post.slug}><Link href={`/blog/${post.slug}`}><div className={s.cover}><span>{post.category}</span></div><div className={s.cardBody}><h3>{post.title}</h3><p>{post.description}</p><time className={s.date} dateTime={post.publishedAt}>{new Date(post.publishedAt!).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time></div></Link></article>)}</div> : <div className={s.empty}><div><h3>Our first guide is being prepared.</h3><p>We’re checking the details before publication. If you’re planning your property’s website now, you can start with a free review of your existing website, booking-platform page or social profile.</p></div><Link href="/review" className={s.button}>Get a free review <span aria-hidden="true">↗</span></Link></div>}
      </section>
    </main>
  </MarketingShell>;
}
