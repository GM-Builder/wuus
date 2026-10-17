import test from 'node:test';import assert from 'node:assert/strict';
import {estimateLaundry,sampleOrders} from '../lib/bersih-laundry.ts';
test('laundry quotes enforce minima, unit increments, maximum and express eligibility',()=>{
  assert.equal(estimateLaundry('cuci-setrika',3,'reguler',true).total,48000);
  assert.equal(estimateLaundry('cuci-setrika',3.5,'express',true).total,72750);
  assert.equal(estimateLaundry('cuci-setrika',3.5,'express',false).total,57750);
  assert.equal(estimateLaundry('bed-cover',2,'reguler',false).total,80000);
  for(const q of [0,-1,2.5,3.2,51,Infinity,NaN])assert.equal(estimateLaundry('cuci-setrika',q,'reguler',true),null);
  assert.equal(estimateLaundry('bed-cover',1.5,'reguler',true),null);
  assert.equal(estimateLaundry('bed-cover',1,'express',true),null);
  assert.equal(estimateLaundry('unknown',3,'reguler',true),null);
  assert.equal(estimateLaundry('setrika',3,'overnight',true),null);
});
test('tracking is limited to explicitly illustrative sample records',()=>{
  assert.equal(sampleOrders['BL-1024'].stage,2);assert.equal(sampleOrders['BL-1025'].stage,3);
  assert.equal(sampleOrders['BL-9999'],undefined);
});
