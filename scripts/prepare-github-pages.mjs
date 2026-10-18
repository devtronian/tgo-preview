// Package existing static designs for a single GitHub Pages preview site.
// Does not rebuild or modify any design source, and performs no remote actions.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, resolve, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(project, 'output/github-pages');
const assetTypes = new Set(['.png','.jpg','.jpeg','.webp','.avif','.svg','.gif','.ico','.css','.js','.json','.woff','.woff2','.ttf','.otf','.mp4','.webm','.pdf']);
const write = (path, data) => { mkdirSync(dirname(path), { recursive:true }); writeFileSync(path,data); };
const files = [];
function copyFolder(source, target, assets = false) {
  for (const item of readdirSync(source, {withFileTypes:true})) {
    if (item.isSymbolicLink()) throw Error(`Symlink requires review: ${item.name}`);
    const from = resolve(source,item.name), to = resolve(target,item.name);
    if (item.name === 'versions.html') continue; // The shared selector belongs at the export root.
    if (item.isDirectory()) {
      if (assets || item.name === 'assets' || item.name === 'en') copyFolder(from,to,assets || item.name === 'assets');
      continue;
    }
    if (!assets && !item.name.endsWith('.html') && item.name !== 'site.webmanifest') continue;
    if (assets && !assetTypes.has(extname(item.name).toLowerCase())) continue;
    mkdirSync(dirname(to), {recursive:true});
    if (item.name.endsWith('.html')) {
      let html = readFileSync(from,'utf8');
      html = html.replace(/<meta\b[^>]*\bname=["']robots["'][^>]*>/gi,'');
      html = html.replace(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi,'');
      html = html.replace(/<link\b[^>]*\bhreflang=["'][^"']+["'][^>]*>/gi,'');
      html = html.replace(/<meta\b[^>]*\bproperty=["']og:url["'][^>]*>/gi,'');
      if (/<\/head>/i.test(html)) html = html.replace(/<\/head>/i,'<meta name="robots" content="noindex, nofollow">\n</head>');
      else html = html.replace(/<title>/i,'<meta name="robots" content="noindex, nofollow"><title>');
      // V2's standalone 404 uses deployment-root paths. Keep these version-local.
      if (item.name === '404.html') html = html.replace(/(href|src)=["']\/(?!\/)([^"']*)["']/g,(_,attr,path)=>`${attr}="${path || 'index.html'}"`);
      writeFileSync(to,html);
    } else copyFileSync(from,to);
    files.push(relative(output,to).replaceAll('\\','/'));
  }
}

// Fail rather than silently replacing a manually edited export.
if (existsSync(output) && readdirSync(output).length) throw Error('output/github-pages already contains files. Keep that export or rename it before preparing another.');
mkdirSync(output,{recursive:true});
for(let version=1;version<=6;version++) {
  const source=resolve(project,`v${version}`);
  if(!existsSync(resolve(source,'index.html'))) throw Error(`Missing version ${version}`);
  copyFolder(source,resolve(output,`v${version}`));
}
// The collection homepage uses its own screenshots, outside individual versions.
if (existsSync(resolve(project,'assets'))) copyFolder(resolve(project,'assets'),resolve(output,'assets'),true);
let chooser = readFileSync(resolve(project,'versions.html'),'utf8');
chooser=chooser.replace('href="index.html"','href="v1/index.html"').replace('href="assets/img/favicon.png"','href="v1/assets/img/favicon.png"');
write(resolve(output,'index.html'),chooser);
write(resolve(output,'versions.html'),chooser);
write(resolve(output,'.nojekyll'),'');
write(resolve(output,'robots.txt'),'User-agent: *\nDisallow: /\n');
write(resolve(output,'README.md'),`# TG website design preview

Upload the CONTENTS of this folder to the root of a GitHub repository.
In Settings > Pages, choose Deploy from a branch > main > / (root) > Save.

- index.html: design selector
- v1/ to v6/: self-contained design versions
- .nojekyll: serve the prepared static files directly

Example URL: https://YOUR-USERNAME.github.io/tgo-preview/
Version 4: https://YOUR-USERNAME.github.io/tgo-preview/v4/

This is a public design preview. HTML pages contain noindex metadata.
No source generators, QA output, local configuration or credentials are packaged.
Files are ready to serve; no npm install or build is needed on GitHub.
`);

// Verify local references as they will resolve beneath /repository-name/.
const failures=[];let checked=0;
for(const path of ['index.html','versions.html',...files.filter(f=>f.endsWith('.html'))]) {
  const absolute=resolve(output,path),html=readFileSync(absolute,'utf8');
  for(const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    const href=match[1];
    if(/^(?:https?:|mailto:|tel:|data:|javascript:|#|\/\/)/i.test(href)) continue;
    if(href.startsWith('/')){failures.push(`${path}: root-relative path ${href}`);continue;}
    const resource=href.split(/[?#]/)[0];
    if(!resource)continue;
    checked++;
    if(!existsSync(resolve(dirname(absolute),decodeURIComponent(resource))))failures.push(`${path}: missing ${href}`);
  }
}
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log(`Ready: ${output}\n${files.length} design files; ${checked} local reference checks passed.\nUpload the CONTENTS of this folder, including .nojekyll.`);
