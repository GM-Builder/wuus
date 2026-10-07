import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,dirname,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'dist');
const port=Number(process.env.PORT||4173);
createServer(async(req,res)=>{
  try{
    const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const file=resolve(root,'.'+(path==='/'?'/index.html':path));
    if(!file.startsWith(root+sep)||!(await stat(file)).isFile()){res.writeHead(404);res.end('Not found');return;}
    const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.webp':'image/webp','.png':'image/png','.xml':'application/xml','.txt':'text/plain'};
    res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(await readFile(file));
  }catch{res.writeHead(404);res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Local preview: http://127.0.0.1:${port}`));
