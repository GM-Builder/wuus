import type { MetadataRoute } from 'next';
import { publishedPosts } from '@/lib/blog-content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    ...['', '/hospitality', '/review', '/blog', '/hospitality/privacy', '/hospitality/terms', '/kebijakan-privasi', '/syarat-ketentuan']
      .map(path => ({ url: `https://webuntukusaha.com${path}` })),
    ...(await publishedPosts()).map(post => ({ url: `https://webuntukusaha.com/blog/${post.slug}`, lastModified: post.publishedAt })),
  ];
}
