import { execFileSync } from 'node:child_process';
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const build=resolve(dirname(fileURLToPath(import.meta.url)),'build.mjs');
const out=resolve(dirname(fileURLToPath(import.meta.url)),'../../output/seo-v4-preview');
const url='https://example.com/v4';
mkdirSync(out,{recursive:true});
execFileSync(process.execPath,[build],{env:{...process.env,SITE_URL:url,OUTPUT_DIR:out},stdio:'pipe'});
let checks=0;
const check=(ok,msg)=>{if(!ok)throw Error(msg);checks++};
const sitemap=readFileSync(resolve(out,'sitemap.xml'),'utf8');
const robots=readFileSync(resolve(out,'robots.txt'),'utf8');
check((sitemap.match(/<loc>/g)||[]).length===12,'12 sitemap locations');
check(robots.includes('Sitemap: '+url+'/sitemap.xml'),'Sitemap is absolute');
check(robots.includes('Disallow: /v4/_build/'),'Build directory path respects deployment base');
for(const lang of ['th','en'])for(const file of ['index','jobs','services','process','about','contact']){
 const prefix=lang==='en'?'en/':'';
 const html=readFileSync(resolve(out,prefix+file+'.html'),'utf8');
 const canonical=url+'/'+prefix+(file==='index'?'':file+'.html');
 check(html.includes(`<link rel="canonical" href="${canonical}">`),'self canonical');
 check(!html.includes('noindex'),'production indexable');
 for(const alt of ['th','en','x-default']){
  const target=url+'/'+(alt==='en'?'en/':'')+(file==='index'?'':file+'.html');
  check(html.includes(`hreflang="${alt}" href="${target}"`),'reciprocal alternate: '+alt);
 }
 check(html.includes(`content="${url}/assets/img/og-${lang}.jpg"`),'absolute translated social image');
 check(sitemap.includes(`<loc>${canonical}</loc>`),'sitemap includes canonical');
}
console.log(`PASS: ${checks} production SEO checks using https://example.com/v4 in output/seo-v4-preview only. Website remains in preview mode.`);
