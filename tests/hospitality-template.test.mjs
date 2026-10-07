import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,writeFile,copyFile,mkdir,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve,sep} from 'node:path';
import {validateProperty,renderProperty,build} from '../templates/hospitality-static/build.mjs';
const template=new URL('../templates/hospitality-static/',import.meta.url);
const sample=JSON.parse(await readFile(new URL('property.json',template),'utf8'));
test('production rejects simulated properties, missing approvals and unsafe links',()=>{
  assert.throws(()=>validateProperty(sample,true),/Fictional/);
  assert.throws(()=>validateProperty({...sample,bookingUrl:'javascript:alert(1)'}),/HTTPS/);
  assert.throws(()=>validateProperty({...sample,hero:{src:'../secret.png',alt:'x'}}),/local assets/);
  const real={...sample,simulation:false,siteUrl:'https://guesthouse.tld',bookingUrl:'',mapUrl:'https://maps.google.com/',contact:{...sample.contact,email:'stay@guesthouse.tld'}};
  assert.throws(()=>validateProperty(real,true),/approval/);
  assert.equal(validateProperty({...real,approval:{contentReference:'Signed content v1',assetsReference:'Client asset licence list v1',approvedAt:'2026-10-07'}},true).simulation,false);
});
test('client content is escaped and build output is isolated',async()=>{
  const p=validateProperty({...sample,name:'<script>alert(1)</script>'});
  const output=renderProperty(p);
  assert.ok(output.html.includes('&lt;script&gt;'));assert.ok(!output.html.includes('<script>alert(1)'));
  assert.ok(output.html.includes('noindex,nofollow'));
  const root=await mkdtemp(resolve(tmpdir(),'wuus-template-'));
  try{
    await writeFile(resolve(root,'property.json'),JSON.stringify(sample));await mkdir(resolve(root,'assets'));
    for(const image of ['hero.jpg','room.jpg','terrace.jpg'])await writeFile(resolve(root,'assets',image),'synthetic file; layout QA uses actual concept images');
    for(const file of ['site.css','inquiry.js'])await copyFile(new URL(file,template),resolve(root,file));
    const result=await build(root);
    assert.equal(result.output,resolve(root,'dist'));assert.ok((await readFile(resolve(root,'dist/index.html'),'utf8')).includes('Casa Aurora'));
    await writeFile(resolve(root,'dist/assets/retired-photo.jpg'),'Old photo withdrawn from approved content');
    await build(root);
    await assert.rejects(readFile(resolve(root,'dist/assets/retired-photo.jpg')),/ENOENT/);
  }finally{assert.ok(root.startsWith(resolve(tmpdir())+sep));await rm(root,{recursive:true,force:true});}
});
