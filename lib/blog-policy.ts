export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  language: "en" | "id";
  category: string;
  status: "draft" | "review" | "published";
  publishedAt?: string;
  approval?: { approvedAt: string; factsChecked: boolean };
  sources: { label: string; url: string }[];
};

export function validBlogSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 100;
}

export function parseBlogPost(value: unknown): BlogPost {
  if (!value || typeof value !== "object") throw new Error("Invalid blog metadata");
  const post = value as BlogPost;
  if (!validBlogSlug(post.slug ?? "") || !post.title?.trim() || !post.description?.trim()
    || !["en", "id"].includes(post.language) || !post.category?.trim()
    || !["draft", "review", "published"].includes(post.status) || !Array.isArray(post.sources)) {
    throw new Error("Invalid blog metadata");
  }
  for (const source of post.sources) {
    const url = new URL(source.url);
    if (!source.label?.trim() || url.protocol !== "https:" || url.username || url.password) {
      throw new Error("Invalid blog source");
    }
  }
  return post;
}

function utcTimestamp(value: string | undefined): number {
  if (!value || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)) return NaN;
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return NaN;
  const normalized = value.includes(".") ? value : value.replace("Z", ".000Z");
  return date.toISOString() === normalized ? date.getTime() : NaN;
}

export function isPublished(post: BlogPost, now = new Date()): boolean {
  const published = utcTimestamp(post.publishedAt);
  const approved = utcTimestamp(post.approval?.approvedAt);
  return post.status === "published" && post.approval?.factsChecked === true
    && Number.isFinite(published) && Number.isFinite(approved)
    && approved <= published && published <= now.getTime();
}

export function readingMinutes(body: string): number {
  return Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 200));
}

export function safeBlogUrl(url: string): string {
  if (url.startsWith("/") && !url.startsWith("//") && !url.includes("\\")) return url;
  if (url.startsWith("#")) return url;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "https:" && !parsed.username && !parsed.password) return url;
    if (url === "mailto:hallo@webuntukusaha.com") return url;
  } catch { /* Unsupported links are rendered without a destination. */ }
  return "";
}
