export const furniture = [
  { id: 'aruna', name: 'Meja Aruna', category: 'Ruang makan', description: 'Titik temu untuk makan panjang dan cerita yang belum selesai.', width: 160, depth: 85, height: 75, min: 120, max: 240, basePrice: 4800000 },
  { id: 'teduh', name: 'Meja Teduh', category: 'Ruang kerja', description: 'Bidang yang lega. Pikiran yang punya ruang untuk bergerak.', width: 120, depth: 65, height: 75, min: 100, max: 180, basePrice: 3200000 },
  { id: 'sela', name: 'Meja Sela', category: 'Ruang santai', description: 'Tempat buku, secangkir kopi, dan jeda di tengah hari.', width: 90, depth: 55, height: 40, min: 60, max: 120, basePrice: 2100000 },
] as const;
export const materials = [
  { id: 'sungkai', name: 'Sungkai natural', multiplier: 100, note: 'Serat terang, karakter ringan.' },
  { id: 'jati', name: 'Jati madu', multiplier: 130, note: 'Warna hangat, serat yang tegas.' },
  { id: 'mahoni', name: 'Mahoni gelap', multiplier: 110, note: 'Nada dalam, suasana tenang.' },
] as const;
export const categories = ['Semua', 'Ruang makan', 'Ruang kerja', 'Ruang santai'] as const;
export function rupiah(value: number) { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value); }
export type FurnitureConfig = { productId: string; materialId: string; width: number; quantity: number };
export function quoteFurniture(config: FurnitureConfig) {
  const product = furniture.find(item => item.id === config.productId);
  const material = materials.find(item => item.id === config.materialId);
  if (!product || !material) return { ok: false as const, error: 'Pilih koleksi dan material yang tersedia.' };
  if (!Number.isInteger(config.width) || config.width < product.min || config.width > product.max || config.width % 10 !== 0) return { ok: false as const, error: `Panjang ${product.name} harus ${product.min}–${product.max} cm, dalam kelipatan 10 cm.` };
  if (!Number.isInteger(config.quantity) || config.quantity < 1 || config.quantity > 10) return { ok: false as const, error: 'Jumlah harus bilangan bulat antara 1 dan 10.' };
  const unitPrice = Math.round(product.basePrice * config.width * material.multiplier / product.width / 100 / 1000) * 1000;
  return { ok: true as const, product, material, width: config.width, quantity: config.quantity, unitPrice, total: unitPrice * config.quantity };
}
export function furnitureSummary(config: FurnitureConfig, roomNote = '') {
  const quote = quoteFurniture(config);
  if (!quote.ok) return '';
  return [`RINGKASAN CONTOH RUANG KAYU`, `${quote.product.name} · ${quote.material.name}`, `Ukuran: ${quote.width} × ${quote.product.depth} × ${quote.product.height} cm`, `Jumlah: ${quote.quantity}`, `Estimasi per unit: ${rupiah(quote.unitPrice)}`, `Estimasi total: ${rupiah(quote.total)}`, `Catatan ruang: ${roomNote.trim().slice(0, 500) || 'Belum ditambahkan'}`, 'Simulasi desain, bukan penawaran atau pesanan. Belum termasuk pengiriman dan pemasangan.'].join('\n');
}
