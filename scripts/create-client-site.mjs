import {cp,readFile,writeFile,mkdir,access,copyFile} from 'node:fs/promises';
import {resolve,dirname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const website=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const clientsRoot=resolve(website,'..','client-projects');
const slug=process.argv[2];
if(!/^[a-z][a-z0-9-]{2,60}$/.test(slug||'')||/^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/.test(slug)){console.error('Use a safe client slug: node scripts/create-client-site.mjs casa-aurora');process.exit(1);}
const target=resolve(clientsRoot,slug);
if(!target.startsWith(clientsRoot+sep))throw new Error('Invalid client directory');
try{await access(target);throw new Error('Client directory already exists. Never overwrite a client project.');}
catch(error){if(error.code!=='ENOENT')throw error;}
execFileSync('git',['--version'],{stdio:'ignore',windowsHide:true});
await mkdir(clientsRoot,{recursive:true});
await cp(resolve(website,'templates/hospitality-static'),target,{recursive:true,filter:source=>!source.includes(`${sep}dist`)});
await mkdir(resolve(target,'assets'),{recursive:true});
for(const [from,to] of [['guesthouse.webp','hero.jpg'],['stone-suite-main.jpg','room.jpg'],['stone-suite-breakfast.jpg','terrace.jpg']]){
  // Preserve actual image type instead of renaming WebP to JPEG.
  const filename=from.endsWith('.webp')?'hero.webp':to;
  await copyFile(resolve(website,'public/images/hospitality',from),resolve(target,'assets',filename));
}
const property=JSON.parse(await readFile(resolve(target,'property.json'),'utf8'));
property.hero.src='assets/hero.webp';property.gallery[0].src='assets/hero.webp';
await writeFile(resolve(target,'property.json'),JSON.stringify(property,null,2)+'\n');
const pkg=JSON.parse(await readFile(resolve(target,'package.json'),'utf8'));pkg.name=slug;
await writeFile(resolve(target,'package.json'),JSON.stringify(pkg,null,2)+'\n');
execFileSync('git',['init','-b','main'],{cwd:target,stdio:'ignore',windowsHide:true});
console.log(JSON.stringify({directory:target,repository:'independent Git repository; add client-owned remote before delivery',next:'Review README, replace fictional content and assets, npm run build, npm run preview'}));
