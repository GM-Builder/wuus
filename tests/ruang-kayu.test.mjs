import test from 'node:test';
import assert from 'node:assert/strict';
import { furniture, quoteFurniture, furnitureSummary } from '../lib/ruang-kayu.ts';

const config = { productId: 'aruna', materialId: 'sungkai', width: 160, quantity: 1 };
test('baseline and custom material totals use integer rupiah', () => {
  assert.equal(quoteFurniture(config).total, 4800000);
  const custom = quoteFurniture({ ...config, materialId: 'jati', width: 180, quantity: 3 });
  assert.equal(custom.total, 21060000);
  assert.equal(custom.unitPrice, 7020000);
  assert.ok(Number.isSafeInteger(custom.total));
});
test('rejects unsafe quantities, nonfinite values, unknown ids and invalid size increments', () => {
  for (const quantity of [0, -1, 1.5, 11, Infinity, NaN]) assert.equal(quoteFurniture({ ...config, quantity }).ok, false);
  for (const width of [0, 119, 125, 241, Infinity, NaN]) assert.equal(quoteFurniture({ ...config, width }).ok, false);
  assert.equal(quoteFurniture({ ...config, productId: 'missing' }).ok, false);
  assert.equal(quoteFurniture({ ...config, materialId: 'missing' }).ok, false);
});
test('each collection enforces its own inclusive boundaries', () => {
  for (const product of furniture) {
    for (const width of [product.min, product.max]) assert.equal(quoteFurniture({ ...config, productId: product.id, width, quantity: 10 }).ok, true);
    assert.equal(quoteFurniture({ ...config, productId: product.id, width: product.max + 10 }).ok, false);
  }
});
test('local inquiry summary carries selected dimensions and disclaimer; invalid quote cannot make a summary', () => {
  const summary = furnitureSummary({ ...config, materialId: 'mahoni', quantity: 2 }, 'Ruang makan kecil');
  assert.match(summary, /Mahoni gelap/);
  assert.match(summary, /160 × 85 × 75 cm/);
  assert.match(summary, /Ruang makan kecil/);
  assert.match(summary, /bukan penawaran atau pesanan/);
  assert.match(summary, /Belum termasuk pengiriman/);
  assert.equal(furnitureSummary({ ...config, quantity: -10 }), '');
  assert.ok(furnitureSummary(config, 'a'.repeat(700)).includes('a'.repeat(500)));
  assert.ok(!furnitureSummary(config, 'a'.repeat(700)).includes('a'.repeat(501)));
});
