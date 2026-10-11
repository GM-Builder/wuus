import Link from "next/link";
import { MarketingShell } from "@/components/marketing/shell";
import s from "@/components/blog/blog.module.css";

export default function BlogNotFound() {
  return <MarketingShell><main id="main" className={s.container}><div className={s.article}><p className={s.eyebrow}>WUUS notebook</p><h1 style={{ fontSize: 36, lineHeight: 1.2, marginBottom: 20 }}>This article isn’t available.</h1><p style={{ marginBottom: 24 }}>Visit the blog to find our published guides.</p><Link href="/blog" className={s.button}>Back to the blog</Link></div></main></MarketingShell>;
}
