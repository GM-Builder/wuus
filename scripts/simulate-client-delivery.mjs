// Fictional internal workflow. No payments, emails, hosting account or real client data.
import {readFile,writeFile,mkdir,copyFile,access} from 'node:fs/promises';
import {resolve,dirname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const website=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const site=resolve(website,'..','client-projects','casa-aurora-simulation');
const output=resolve(website,'..','outputs','wuus-readiness-20261007','handover');
const restored=resolve(output,'restored-client');
const git=(cwd,args)=>execFileSync('git',args,{cwd,windowsHide:true,encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
const hash=async file=>createHash('sha256').update(await readFile(file)).digest('hex');
const property=JSON.parse(await readFile(resolve(site,'property.json'),'utf8'));
assert.equal(property.simulation,true,'Only the fictional project may be changed');
assert.equal(git(site,['rev-list','--all','--count']),'0','Run only on the freshly generated simulation project; never overwrite existing work');
await mkdir(output,{recursive:true});
assert.ok(restored.startsWith(output+sep));
try{await access(restored);throw new Error('Restore directory exists. Keep previous evidence; use a fresh simulation workspace.');}catch(error){if(error.code!=='ENOENT')throw error;}
// Freeze the current kit in this separate client repo; no runtime import from WUUS.
for(const file of ['build.mjs','site.css','inquiry.js','preview.mjs','README.md'])await copyFile(resolve(website,'templates/hospitality-static',file),resolve(site,file));
await mkdir(resolve(site,'operations'),{recursive:true});
const docs={
 'BRIEF.md':'# SIMULATION ONLY — onboarding\n\nProject DEMO-STARTER-001; Casa Aurora Guesthouse is fictional. Approval contact: Simulation Owner, owner@example.com. One English page, six sections, two room types, three illustrative photos. Client material approval and asset permissions are simulated, not permissions for a real accommodation. Contact stay@example.com; existing booking link https://example.com/booking; CMS excluded, content edits by WUUS. Preview and hosting are local only. No real supplier identity, bank account or domain is asserted.\n',
 'PROPOSAL.md':'# SIMULATION ONLY — accepted proposal fixture\n\nVersion 1, DEMO-STARTER-001. Fictional supplier/client; not issued to anyone. Deliverables: story, two rooms, gallery, amenities, location/FAQ, email inquiry draft and existing booking link. One English language; six sections, max six rooms/20 photos; two consolidated revision rounds. Price EUR 390, deposit 195 and balance 195. Timeline 5–7 working days after cleared deposit plus complete assets. Domain, commercial hosting, translations and third-party booking fees excluded and paid by client only after agreement. Cancellation fixture: logged work EUR 32.50/hour capped at 390, approved unrecoverable costs itemised, unused funds reconciled within 10 working days; actual jurisdictions require review. Bespoke source transfers after payment; reusable tools and third-party licences retained. 14-day scoped bug support; new content/features paid separately. All approvals and payments here are fictional.\n',
 'INVOICES.md':'# SIMULATION ONLY — invoices and receipt fixtures\n\nSIM-DP-001: EUR 195; SIM-BAL-001: EUR 195. Supplier/client: fictional training identities. No payment instructions or bank details. Simulated deposit and balance approvals exercise the process only. Actual money received: 0. No screenshot accepted as proof. A real project requires direct account reconciliation and private receipt evidence.\n',
 'REVISION.md':'# SIMULATION ONLY — revision round 1\n\nApproval fixture SIM-CR-001 changes the hero tagline to “A slower stay. A warmer welcome.” Existing scope, fee EUR 0. One of two included rounds used. No new features, pages, languages or booking system.\n',
 'HANDOVER.md':'# SIMULATION ONLY — handover\n\nSource release simulation-v2; separate repository and local preview. property.json contains content; build.mjs/site.css/inquiry.js are reusable display/draft components. npm run build; npm run preview. Production build rejects this fictional example. Backup is a Git source archive and rebuildable release. Restore performed in a separate checkout, including rollback to simulation-v1 and return to v2. Domain/HTTPS, provider inbox receipt, client approval and actual payments remain real-project release gates. Commercial hosting/account handover is simulated, not provisioned. Bug-support dates and renewal payer must be recorded at real launch.\n',
};
for(const [file,content]of Object.entries(docs))await writeFile(resolve(site,'operations',file),content);
await writeFile(resolve(site,'operations/payment-ledger.json'),JSON.stringify({simulation:true,projectId:'DEMO-STARTER-001',currency:'EUR',proposalTotal:390,actualReceived:0,steps:[{milestone:'deposit',simulatedAmount:195,realBankVerification:false},{milestone:'balance',simulatedAmount:195,realBankVerification:false}]},null,2)+'\n');
git(site,['config','user.name','WUUS Internal Simulation']);git(site,['config','user.email','simulation@example.com']);
git(site,['add','--all']);git(site,['commit','-m','Internal simulation: approved materials and baseline website']);git(site,['tag','simulation-v1']);
execFileSync(process.execPath,['build.mjs'],{cwd:site,windowsHide:true,stdio:'ignore'});
const firstHash=await hash(resolve(site,'dist/index.html'));
property.tagline='A slower stay. A warmer welcome.';
await writeFile(resolve(site,'property.json'),JSON.stringify(property,null,2)+'\n');
git(site,['add','property.json']);git(site,['commit','-m','Internal simulation: apply approved first revision']);git(site,['tag','simulation-v2']);
execFileSync(process.execPath,['build.mjs'],{cwd:site,windowsHide:true,stdio:'ignore'});
const finalHash=await hash(resolve(site,'dist/index.html'));
assert.notEqual(firstHash,finalHash);
const release=git(site,['rev-parse','HEAD']);
const archive=resolve(output,'casa-aurora-source.zip');
git(site,['archive','--format=zip',`--output=${archive}`,'simulation-v2']);
git(output,['clone','--no-hardlinks',site,restored]);
assert.equal(git(restored,['rev-parse','HEAD']),release);
execFileSync(process.execPath,['build.mjs'],{cwd:restored,windowsHide:true,stdio:'ignore'});
assert.equal(await hash(resolve(restored,'dist/index.html')),finalHash,'Source handover must rebuild identically');
git(restored,['checkout','--detach','simulation-v1']);
execFileSync(process.execPath,['build.mjs'],{cwd:restored,windowsHide:true,stdio:'ignore'});
assert.equal(await hash(resolve(restored,'dist/index.html')),firstHash,'Rollback must recover previous output');
git(restored,['checkout','--detach','simulation-v2']);
execFileSync(process.execPath,['build.mjs'],{cwd:restored,windowsHide:true,stdio:'ignore'});
assert.equal(await hash(resolve(restored,'dist/index.html')),finalHash);
const inquiry=JSON.parse(await readFile(resolve(website,'docs/client-readiness/qa/integration-report.json'),'utf8'));
assert.ok(inquiry.passed>=24);
const report={simulation:true,performedAt:new Date().toISOString(),projectId:'DEMO-STARTER-001',actualRevenue:0,
 steps:['Synthetic WUUS inquiry persisted and read by verified owner (local Auth/PostgREST adapter)','Fictional needs and fixed scope recorded','Proposal approval simulated','Deposit verification step simulated; no real funds','Materials complete fixture','Independent client repository built','Local preview and responsive/browser QA','Approved in-scope revision committed','Balance step simulated; no real funds','Local launch rehearsal only; fictional production build blocked','Source archive and editing/handover guide prepared','Separate checkout rebuild, previous release rollback and return verified'],
 release,previousRelease:git(site,['rev-parse','simulation-v1']),firstHtmlSha256:firstHash,finalHtmlSha256:finalHash,sourceArchiveSha256:await hash(archive),restoreHtmlSha256:await hash(resolve(restored,'dist/index.html')),
 limitations:['No actual bank/payment route confirmation','No public client domain/HTTPS or commercial hosting provisioned','No real email or WhatsApp message sent','Archive checksum recorded; Git checkout restore tested','No real client acceptance']};
await writeFile(resolve(website,'docs/client-readiness/qa/delivery-simulation-report.json'),JSON.stringify(report,null,2)+'\n');
await writeFile(resolve(output,'verification.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({simulation:true,release,restoreVerified:true,archive,actualRevenue:0}));
