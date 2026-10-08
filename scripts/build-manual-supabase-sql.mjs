// Generate one transaction from canonical migrations; no DB connection or credentials.
import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
import {createHash} from 'node:crypto';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=async path=>(await readFile(resolve(root,path),'utf8')).replaceAll('\r\n','\n');
export async function manualBundle(){
  const files=['202610070001_secure_inquiries.sql','202610070002_inquiry_notifications.sql','202610070003_retire_score_tracking.sql'];
  const migrations=[];
  for(const file of files){
    const source=await read(`supabase/migrations/${file}`);
    if((source.match(/^begin;\s*$/gmi)||[]).length!==1||(source.match(/^commit;\s*$/gmi)||[]).length!==1)throw new Error('Each canonical migration needs exactly one outer transaction');
    migrations.push(`-- Source: ${file} | sha256: ${createHash('sha256').update(source).digest('hex')}\n${source.replace(/^begin;\s*$/im,'').replace(/^commit;\s*$/im,'').trim()}`);
  }
  const verification=await read('supabase/manual/02-verify.sql');
  return `-- WUUS manual Supabase bundle v1 (8 October 2026). Generated; do not edit by hand.
-- Read supabase/manual/README.md. Run 00-inspect first; save any existing data/schema backup privately.
-- Apply with the NEW safe frontend/server release; the old browser form will lose direct DB write access.
-- No Auth user/password, email provider, hosting environment or migration history is configured here.
begin;
set local lock_timeout='5s';
set local statement_timeout='60s';
${await read('supabase/manual/_safety-checks.sql')}
${migrations.join('\n\n')}
-- Recheck private access and queue trigger before commit. Any failed check rolls everything back.
do $$ declare item record;
begin
  for item in ${verification.replace(/^--.*\n/gm,'').replace(/;\s*$/,'')}
  loop
    if item.result<>'PASS' then raise exception 'WUUS postcheck failed: %',item.check_name; end if;
  end loop;
end $$;
notify pgrst,'reload schema';
commit;
${verification}`;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const output=resolve(root,'supabase/manual/01-apply.sql');
  await writeFile(output,await manualBundle());console.log('Generated supabase/manual/01-apply.sql');
}
