import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const input = process.argv[2];
if (!input) throw new Error('Usage: node scripts/import-blog-draft.mjs <office-draft-directory> [category]');
const folder = resolve(input);
const brief = JSON.parse(readFileSync(resolve(folder, 'brief.json'), 'utf8'));
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(brief.slug ?? '') || brief.slug.length > 100
  || !['en', 'id'].includes(brief.language) || typeof brief.title !== 'string'
  || !brief.title.trim() || typeof brief.description !== 'string' || !brief.description.trim()
  || !Array.isArray(brief.sources)) throw new Error('Invalid office blog brief.');
const sourceBody = readFileSync(resolve(folder, 'article.md'), 'utf8');
const body = sourceBody.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim().replace(/^# [^\r\n]+(?:\r?\n|$)/, '').trim();
if (body.length < 200 || body.length > 15000) throw new Error('Draft body must contain 200–15000 characters.');
const sources = brief.sources.map(source => {
  const url = new URL(source.url);
  if (url.protocol !== 'https:' || url.username || url.password || typeof source.title !== 'string' || !source.title.trim()) throw new Error('Invalid source.');
  return { label: source.title, url: url.href };
});
const inventoryPath = resolve(root, 'content/blog/articles.json');
const inventory = JSON.parse(readFileSync(inventoryPath, 'utf8'));
if (inventory.some(post => post.slug === brief.slug)) throw new Error('Slug already exists; review/edit the existing draft explicitly.');
const post = { slug: brief.slug, title: brief.title, description: brief.description, language: brief.language,
  category: process.argv[3] || 'Website planning', status: 'draft', sources };
const articlePath = resolve(root, 'content/blog', `${brief.slug}.md`);
writeFileSync(articlePath, `${body}\n`, { flag: 'wx' });
try { writeFileSync(inventoryPath, `${JSON.stringify([...inventory, post], null, 2)}\n`); }
catch (error) { unlinkSync(articlePath); throw error; }
console.log(`Imported draft: ${brief.slug}. Not approved or published. Review at /blog/preview/${brief.slug} in local development.`);
