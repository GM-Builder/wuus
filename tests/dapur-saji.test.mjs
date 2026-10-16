import test from 'node:test';
import assert from 'node:assert/strict';
import {menu,orderSummary} from '../lib/dapur-saji.ts';

test('catering totals respect minimum, integer quantities and upper bounds',()=>{
  assert.deepEqual(orderSummary({}),{items:[],total:0});
  assert.equal(orderSummary({'ayam-bakar':10,'snack-box':15}).total,680000);
  for(const qty of [-1,0,9,10.5,501,Infinity]) assert.equal(orderSummary({'ayam-bakar':qty}).items.length,0);
  assert.equal(orderSummary({'ayam-bakar':500,unknown:20}).total,17500000);
  assert.equal(orderSummary({keluarga:2}).total,370000);
  assert.equal(new Set(menu.map(i=>i.id)).size,menu.length);
});
