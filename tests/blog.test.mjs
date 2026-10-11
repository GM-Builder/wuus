import test from 'node:test';
import assert from 'node:assert/strict';
import { isPublished, parseBlogPost, safeBlogUrl, validBlogSlug } from '../lib/blog-policy.ts';

const approved = {
  slug: 'hotel-planning', title: 'Hotel planning', description: 'A practical guide.',
  language: 'en', category: 'Planning', status: 'published',
  publishedAt: '2026-10-10T00:00:00Z',
  approval: { approvedAt: '2026-10-09T00:00:00Z', factsChecked: true }, sources: [],
};
const now = new Date('2026-10-10T12:00:00Z');

test('only approved, fact-checked articles with a real publication date can go public', () => {
  assert.equal(isPublished(approved, now), true);
  for (const post of [
    { ...approved, status: 'draft' }, { ...approved, status: 'review' },
    { ...approved, approval: undefined }, { ...approved, publishedAt: undefined },
    { ...approved, publishedAt: 'not-a-date' },
    { ...approved, publishedAt: '2026-02-30T00:00:00Z' },
    { ...approved, approval: { ...approved.approval, factsChecked: false } },
    { ...approved, approval: { ...approved.approval, approvedAt: '2026-10-11T00:00:00Z' } },
    { ...approved, publishedAt: '2026-10-11T00:00:00Z' },
  ]) assert.equal(isPublished(post, now), false);
});

test('slug and source validation reject path traversal and unsafe sources', () => {
  for (const slug of ['../draft', 'foo/bar', 'foo\\bar', '', '%2e%2e', 'A-title', 'x'.repeat(101)]) {
    assert.equal(validBlogSlug(slug), false);
    assert.throws(() => parseBlogPost({ ...approved, slug }));
  }
  assert.equal(validBlogSlug('prepare-your-hotel-website'), true);
  for (const url of ['javascript:alert(1)', 'file:///etc/passwd', 'https://user:secret@example.com']) {
    assert.throws(() => parseBlogPost({ ...approved, sources: [{ label: 'Source', url }] }));
  }
});

test('markdown links cannot introduce active URLs or protocol-relative destinations', () => {
  for (const url of ['javascript:alert(1)', 'data:text/html,test', '//example.com', '/\\example.com', 'https://a:b@example.com', 'mailto:private@example.com']) {
    assert.equal(safeBlogUrl(url), '');
  }
  for (const url of ['/review', '#checklist', 'https://example.com/', 'mailto:hallo@webuntukusaha.com']) assert.equal(safeBlogUrl(url), url);
});
