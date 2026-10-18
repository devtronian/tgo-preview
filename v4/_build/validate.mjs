import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
let checks=0;const failures=[];
const check=(ok,message)=>{checks++;if(!ok)failures.push(message)};
for(const dir of ['', 'en/'])for(const file of readdirSync(resolve(root,dir)).filter(f=>f.endsWith('.html')&&f!=='404.html')){
 const path=resolve(root,dir,file),html=readFileSync(path,'utf8');
 check((html.match(/<h1[ >]/g)||[]).length===1,`${dir+file}: one h1`);
 check(html.includes(`<html lang="${dir?'en':'th'}">`),`${dir+file}: language`);
 check(/<meta name="description" content="[^"]+"/.test(html),`${dir+file}: description`);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 check(new Set(ids).size===ids.length,`${dir+file}: duplicate IDs`);
 for(const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)){try{JSON.parse(match[1]);checks++}catch{failures.push(`${dir+file}: invalid JSON-LD`)}}
 check(!html.includes('"@type":"JobPosting"'),`${dir+file}: no sample JobPosting`);
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const href=match[1];if(/^(https?:|mailto:|tel:|data:)/.test(href))continue;
  const [resource,hash]=href.split('#');const target=resource.split('?')[0];
  const destination=target?resolve(dirname(path),target):path;
  check(existsSync(destination),`${dir+file}: missing local resource ${href}`);
  if(hash&&existsSync(destination)&&destination.endsWith('.html'))check(readFileSync(destination,'utf8').includes(`id="${hash}"`),`${dir+file}: missing anchor ${href}`);
 }
 for(const match of html.matchAll(/<img\b[^>]+>/g))check(/\balt="[^"]*"/.test(match[0])&&/\bwidth=/.test(match[0])&&/\bheight=/.test(match[0]),`${dir+file}: image accessibility/dimensions`);
}
if(failures.length){console.error(failures.join('\n'));process.exitCode=1}else console.log(`PASS: ${checks} checks across 12 translated pages: links, anchors, metadata, JSON-LD, image attributes, duplicate IDs.`);
