export const laundryServices = [
  {id:'cuci-lipat',name:'Cuci & lipat',price:8000,unit:'kg',minimum:3,description:'Dicuci, dikeringkan dan dilipat. Untuk pakaian harian yang tidak perlu disetrika.',time:'2–3 hari',express:true},
  {id:'cuci-setrika',name:'Cuci & setrika',price:11000,unit:'kg',minimum:3,description:'Perawatan lengkap untuk pakaian harian, dari cuci sampai rapi siap dipakai.',time:'2–3 hari',express:true},
  {id:'setrika',name:'Setrika saja',price:7000,unit:'kg',minimum:3,description:'Pakaian sudah dicuci? Pilih bantuan setrika dan pelipatan.',time:'1–2 hari',express:true},
  {id:'bed-cover',name:'Bed cover',price:40000,unit:'buah',minimum:1,description:'Perawatan terpisah untuk bed cover ukuran single atau double.',time:'3–4 hari',express:false},
  {id:'sepatu',name:'Sepatu',price:45000,unit:'pasang',minimum:1,description:'Pembersihan bagian luar dan sol, sesuai kondisi serta bahan sepatu.',time:'3–4 hari',express:false},
] as const;

export function estimateLaundry(id:string,quantity:number,speed:string,pickup:boolean){
  const service=laundryServices.find(s=>s.id===id);
  if(!service||!Number.isFinite(quantity)||quantity<service.minimum||quantity>50||!['reguler','express'].includes(speed))return null;
  if(service.unit==='kg'? !Number.isInteger(quantity*2):!Number.isInteger(quantity))return null;
  if(speed==='express'&&!service.express)return null;
  const base=Math.round(quantity*service.price);const expressFee=speed==='express'?Math.round(base*.5):0;const pickupFee=pickup?15000:0;
  return {service,quantity,base,expressFee,pickupFee,total:base+expressFee+pickupFee,time:speed==='express'?'24 jam':service.time};
}
export function laundryRupiah(value:number){return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(value);}
export const sampleOrders:Record<string,{service:string;stage:number;description:string}>={
  'BL-1024':{service:'Cuci & setrika',stage:2,description:'Pakaian sedang disetrika dan dirapikan sebelum dikemas.'},
  'BL-1025':{service:'Cuci & lipat',stage:3,description:'Pakaian sudah selesai dikemas dan siap diambil.'},
};
