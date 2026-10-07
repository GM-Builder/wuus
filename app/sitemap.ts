import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/hospitality', '/review', '/hospitality/privacy', '/hospitality/terms', '/kebijakan-privasi', '/syarat-ketentuan']
    .map(path => ({ url: `https://webuntukusaha.com${path}` }));
}
