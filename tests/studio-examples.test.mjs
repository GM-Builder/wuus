import test from 'node:test';
import assert from 'node:assert/strict';
import {studioExamples,getStudioExample,bouquetPrice,cartTotal,addCartLine,changeCartQuantity,validPlanDate} from '../lib/studio-examples.ts';

test('five distinct business concepts resolve only their own slugs',()=>{
  assert.deepEqual(studioExamples.map(item=>item.slug),['titik-potong','putaran-motor','kelopak','langkah-belajar','sela-wear']);
  assert.equal(new Set(studioExamples.map(item=>item.category)).size,5);
  assert.equal(getStudioExample('unknown'),undefined);
  for(const example of studioExamples){assert.equal(getStudioExample(example.slug),example);assert.ok(example.items.length>=3);assert.ok(example.items.every(item=>item.price>0));assert.equal(new Set(example.items.map(item=>item.id)).size,example.items.length);}
});

test('bouquet size changes price for the selected arrangement',()=>{
  const bouquet=getStudioExample('kelopak').items[0];
  assert.equal(bouquetPrice(bouquet.price,'Regular'),185000);
  assert.equal(bouquetPrice(bouquet.price,'Besar'),277500);
});

test('cart combines identical variants and preserves separate sizes and colors',()=>{
  const base={key:'tee-M-Ink',itemId:'everyday-tee',name:'Everyday Tee',variant:'M / Ink',unitPrice:149000};
  let cart=addCartLine([],base);cart=addCartLine(cart,base);
  cart=addCartLine(cart,{...base,key:'tee-L-Lilac',variant:'L / Lilac'});
  assert.equal(cart.length,2);assert.equal(cart[0].quantity,2);assert.equal(cart[1].quantity,1);assert.equal(cartTotal(cart),447000);
  const reduced=changeCartQuantity(cart,'tee-M-Ink',-1);
  assert.equal(cartTotal(reduced),298000);assert.equal(cart[0].quantity,2,'quantity changes do not mutate old cart');
  assert.equal(changeCartQuantity(reduced,'tee-M-Ink',-1).length,1);
});

test('cart upper bound and empty total match UI constraints',()=>{
  const line={key:'senja-Besar',itemId:'senja',name:'Senja',variant:'Besar',unitPrice:277500};
  let cart=[];for(let i=0;i<25;i++)cart=addCartLine(cart,line);
  assert.equal(cart[0].quantity,20);assert.equal(changeCartQuantity(cart,line.key,1)[0].quantity,20);
  assert.equal(cartTotal([]),0);assert.equal(cartTotal(cart),5550000);
});

test('plans reject past dates and invalid calendar days',()=>{
  assert.equal(validPlanDate('2026-10-17','2026-10-17'),true);
  assert.equal(validPlanDate('2026-10-18','2026-10-17'),true);
  assert.equal(validPlanDate('2026-10-16','2026-10-17'),false);
  assert.equal(validPlanDate('2027-02-31','2026-10-17'),false);
  assert.equal(validPlanDate('2028-02-29','2026-10-17'),true);
  assert.equal(validPlanDate('2026-13-01','2026-10-17'),false);
  assert.equal(validPlanDate('','2026-10-17'),false);
});
