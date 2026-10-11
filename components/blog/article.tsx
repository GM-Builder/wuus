import Link from "next/link";
import Markdown from "react-markdown";
import { readingMinutes, safeBlogUrl, type BlogPost } from "@/lib/blog-policy";
import s from "./blog.module.css";

export function BlogArticle({ post, body, preview = false }: { post: BlogPost; body: string; preview?: boolean }) {
  const en = post.language === "en";
  return (
    <main id="main" className={s.container}>
      {preview && <aside className={s.preview}><strong>Draft · local preview only</strong>Not published. Check facts, sources, copy and layout before quality approval. This preview is disabled in production.</aside>}
      <article className={s.article}>
        <Link href="/blog" className={s.back}>{en ? "← All articles" : "← Semua artikel"}</Link>
        <header className={s.articleHeader}>
          <p className={s.eyebrow}>{post.category}</p>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <div className={s.meta}>
            <span>WUUS</span>
            {post.publishedAt && !preview && <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString(en ? "en-GB" : "id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time>}
            <span>{readingMinutes(body)} {en ? "min read" : "menit baca"}</span>
          </div>
        </header>
        <div className={s.body}>
          <Markdown skipHtml urlTransform={safeBlogUrl} allowedElements={["p", "h2", "h3", "h4", "ul", "ol", "li", "strong", "em", "a", "blockquote", "hr", "br", "code", "pre"]} unwrapDisallowed>{body}</Markdown>
        </div>
        <aside className={s.sources} aria-label={en ? "Sources and editorial note" : "Sumber dan catatan editorial"}>
          {post.sources.length > 0 && <><h2>{en ? "References" : "Referensi"}</h2><ul>{post.sources.map(source => <li key={source.url}><a href={source.url}>{source.label}</a></li>)}</ul></>}
          <p>{preview ? "Prepared with AI assistance. This version has not passed the publication quality checks." : en ? "Prepared with AI assistance and reviewed by WUUS before publication. Your agreed proposal defines the scope of a WUUS project." : "Disiapkan dengan bantuan AI dan ditinjau WUUS sebelum terbit. Scope proyek WUUS mengikuti proposal yang disepakati."}</p>
        </aside>
        <section className={s.cta}>
          <h2>{en ? "A clearer next step for your property." : "Langkah berikutnya untuk properti Anda."}</h2>
          <p>{en ? "Share your property link. We’ll review what you have and discuss a practical starting point." : "Bagikan tautan properti Anda. Kita tinjau materi yang tersedia dan bahas langkah awalnya."}</p>
          <Link href="/review" className={s.button}>{en ? "Request a free review" : "Minta review gratis"}<span aria-hidden="true">↗</span></Link>
        </section>
      </article>
    </main>
  );
}
