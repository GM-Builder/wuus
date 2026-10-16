export const menu = [
  { id: 'ayam-bakar', name: 'Nasi Ayam Bakar', category: 'Nasi box', price: 35000, minimum: 10, description: 'Ayam bakar, nasi putih, tumis sayur, tempe dan sambal.', tag: 'Pilihan makan siang' },
  { id: 'ayam-serundeng', name: 'Nasi Ayam Serundeng', category: 'Nasi box', price: 32000, minimum: 10, description: 'Ayam berbumbu, serundeng kelapa, nasi putih, lalap dan sambal.', tag: 'Gurih & sederhana' },
  { id: 'snack-box', name: 'Snack Box Sore', category: 'Snack box', price: 22000, minimum: 15, description: 'Lemper ayam, pastel sayur dan kue manis. Isi dapat dibahas sesuai acara.', tag: 'Teman rapat' },
  { id: 'keluarga', name: 'Paket Meja Keluarga', category: 'Paket berbagi', price: 185000, minimum: 2, description: 'Nasi, ayam bakar, sayur dan lauk pendamping untuk 4–5 orang per paket.', tag: 'Untuk dinikmati bersama' },
] as const;

export function formatRupiah(value: number) { return new Intl.NumberFormat('id-ID', {style:'currency', currency:'IDR', maximumFractionDigits:0}).format(value); }
export function orderSummary(quantities: Record<string,number>) {
  const items = menu.flatMap(item => { const quantity=quantities[item.id]??0; return Number.isInteger(quantity)&&quantity>=item.minimum&&quantity<=500 ? [{...item,quantity,subtotal:quantity*item.price}]:[]; });
  return {items,total:items.reduce((sum,item)=>sum+item.subtotal,0)};
}
