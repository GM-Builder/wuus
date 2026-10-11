import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, copyFileSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, relative, isAbsolute } from 'node:path';
import { spawnSync } from 'node:child_process';

test('office handoff always imports a draft, removes the duplicate title and refuses to overwrite', () => {
  const base = resolve(tmpdir());
  const root = mkdtempSync(join(base, 'wuus-blog-import-test-'));
  try {
    mkdirSync(join(root, 'scripts'));
    mkdirSync(join(root, 'content/blog'), { recursive: true });
    mkdirSync(join(root, 'input'));
    copyFileSync(new URL('../scripts/import-blog-draft.mjs', import.meta.url), join(root, 'scripts/import-blog-draft.mjs'));
    writeFileSync(join(root, 'content/blog/articles.json'), '[]');
    const brief = { slug: 'fixture-guide', title: 'Fixture guide', description: 'Test fixture only.', language: 'en', status: 'published', approval: { approvedAt: '2026-10-09T00:00:00Z', factsChecked: true }, publishedAt: '2026-10-10T00:00:00Z', sources: [{ title: 'Fixture source', url: 'https://example.com/' }] };
    writeFileSync(join(root, 'input/brief.json'), JSON.stringify(brief));
    const body = '## Plan the website\n\n' + 'Synthetic test content. '.repeat(20);
    writeFileSync(join(root, 'input/article.md'), '---\nstatus: draft\n---\n\n# Fixture guide\n\n' + body);
    const run = () => spawnSync(process.execPath, [join(root, 'scripts/import-blog-draft.mjs'), join(root, 'input')], { encoding: 'utf8' });
    assert.equal(run().status, 0);
    const [post] = JSON.parse(readFileSync(join(root, 'content/blog/articles.json'), 'utf8'));
    assert.equal(post.status, 'draft');
    assert.equal(post.approval, undefined);
    assert.equal(post.publishedAt, undefined);
    assert.equal(post.sources[0].label, 'Fixture source');
    const imported = readFileSync(join(root, 'content/blog/fixture-guide.md'), 'utf8');
    assert.equal(imported, body.trim() + '\n');
    assert.notEqual(run().status, 0);
    assert.equal(readFileSync(join(root, 'content/blog/fixture-guide.md'), 'utf8'), imported);
  } finally {
    const inside = relative(base, resolve(root));
    if (!inside.startsWith('..') && !isAbsolute(inside) && inside.startsWith('wuus-blog-import-test-')) rmSync(root, { recursive: true, force: true });
  }
});
