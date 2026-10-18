/* ==========================================================================
   Builds the static v2 site:  node _build/build.mjs   (run inside /v2)
   Output: Thai pages at /, English at /en/, plus sitemap, robots, llms.txt,
   manifest, 404 and the guilloche artwork.
   ========================================================================== */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_URL, CO, NAV } from "./site.mjs";
import { PAGES } from "./pages.mjs";
import { render, absUrl } from "./layout.mjs";
import { JOBS } from "./jobs.mjs";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..");
const write = (rel, data) => {
  const p = join(OUT, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, data);
  console.log("  wrote", rel, `(${(Buffer.byteLength(data) / 1024).toFixed(1)} KB)`);
};
const today = new Date().toISOString().slice(0, 10);

/* ---- pages ---- */
for (const page of PAGES) {
  write(page.file, render(page, "th"));
  write("en/" + page.file, render(page, "en"));
}

/* ---- sitemap with hreflang alternates ---- */
const urls = PAGES.flatMap((p) => ["th", "en"].map((lang) => `  <url>
    <loc>${absUrl(p.file, lang)}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="th" href="${absUrl(p.file, "th")}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${absUrl(p.file, "en")}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${absUrl(p.file, "th")}"/>
  </url>`));
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`);

write("robots.txt", `User-agent: *
Allow: /
Disallow: /_build/

Sitemap: ${SITE_URL}/sitemap.xml
`);

/* ---- llms.txt: a plain summary for AI search assistants ---- */
write("llms.txt", `# ${CO.nameEn} (${CO.nameTh})

> Licensed Thai overseas recruitment agency. Licence no. ${CO.licenseEn} (${CO.licenseTh}) issued by the Department of Employment, Ministry of Labour, Thailand. Founded ${CO.founded}. Office: ${CO.addrEn}. Phone ${CO.tel}. Email ${CO.email}.

We recruit and place Thai workers with overseas employers in Saudi Arabia, the United Arab Emirates, Oman, Kuwait, Australia, New Zealand, Europe and Asia. Sectors: skilled trades and technical, manufacturing, agriculture, and hospitality (Thai massage, spa, Thai chefs, hotel staff). Our strongest track record is Thai massage and spa specialists in the Middle East and Europe.

Anyone can verify a Thai recruitment agency at https://www.doe.go.th/ or via the Department of Employment hotline 1694. Fees must stay within legally set rates and should always be paid against a company receipt.

## Pages (Thai)
${PAGES.map((p) => `- [${p.title.th}](${absUrl(p.file, "th")}): ${p.desc.th}`).join("\n")}

## Pages (English)
${PAGES.map((p) => `- [${p.title.en}](${absUrl(p.file, "en")}): ${p.desc.en}`).join("\n")}
`);

write("site.webmanifest", JSON.stringify({
  name: CO.short, short_name: "TG Oversea", lang: "th", start_url: "./", display: "standalone",
  background_color: "#f3f6f8", theme_color: "#0b2150",
  icons: [{ src: "assets/img/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "assets/img/icon-512.png", sizes: "512x512", type: "image/png" }]
}, null, 2));

/* ---- 404 (bilingual, not indexed; uses root-relative links so it works at any depth) ---- */
write("404.html", `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>ไม่พบหน้านี้ / Page not found | TG Oversea Solutions</title>
<meta name="robots" content="noindex">
<link rel="icon" href="/assets/img/icon-32.png" type="image/png">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@400;600&family=Noto+Serif+Thai:wdth,wght@75,700&display=swap">
<link rel="stylesheet" href="/assets/css/site.css">
</head>
<body class="pg-404">
<main id="main" class="nf">
  <img src="/assets/img/guilloche.svg" alt="" width="640" height="640" class="nf-ros">
  <div class="wrap">
    <p class="nf-code" aria-hidden="true">404</p>
    <h1 class="display display--md">ไม่พบหน้าที่คุณต้องการ</h1>
    <p class="lead">ลิงก์อาจเปลี่ยนไปแล้ว ลองเริ่มจากหน้าแรกหรือดูตำแหน่งงานที่เปิดรับ</p>
    <p class="lead" lang="en">This page doesn't exist. It may have moved.</p>
    <div class="btn-row">
      <a class="btn btn-ink" href="/">กลับหน้าแรก</a>
      <a class="btn btn-line" href="/jobs.html">ดูตำแหน่งงาน</a>
      <a class="btn btn-line" href="/en/" lang="en">English home</a>
    </div>
  </div>
</main>
</body>
</html>
`);

/* ---- Guilloche rosette (security-print pattern), drawn once as SVG ---- */
function ring(base, amp, waves, copies, k = 1) {
  // r(θ) = base + amp·sin(waves·θ); copies are rotated by a fraction of one wave
  const pts = waves * 12, d = [];
  for (let i = 0; i <= pts; i++) {
    const t = (i / pts) * Math.PI * 2;
    const r = base + amp * Math.sin(waves * t) * (k === 1 ? 1 : Math.abs(Math.sin(k * t)) * .6 + .4);
    d.push((i ? "L" : "M") + Math.round(r * Math.cos(t) * 2) + " " + Math.round(r * Math.sin(t) * 2));
  }
  return { d: d.join("") + "Z", copies, step: 360 / waves / copies };
}
function guilloche(stroke, accent) {
  const rings = [
    ring(292, 12, 48, 6),
    ring(246, 26, 30, 8),
    ring(170, 46, 15, 9, 3),
    ring(96, 14, 24, 5)
  ];
  const defs = rings.map((r, i) => `<path id="r${i}" d="${r.d}" pathLength="1"/>`).join("");
  const uses = rings.map((r, i) => `<g class="g${i}">` + Array.from({ length: r.copies }, (_, j) => `<use href="#r${i}" transform="rotate(${(j * r.step).toFixed(2)})"/>`).join("") + `</g>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-640 -640 1280 1280" width="640" height="640">
<style>
g,circle{fill:none;stroke:${stroke};stroke-width:1.6;vector-effect:non-scaling-stroke}
.g2{stroke:${accent}}
@media (prefers-reduced-motion:no-preference){
 use,circle{stroke-dasharray:1;stroke-dashoffset:1;animation:d 2.6s cubic-bezier(.65,0,.25,1) forwards}
 .g1 use{animation-delay:.15s}.g2 use{animation-delay:.3s}.g3 use{animation-delay:.45s}
}
@keyframes d{to{stroke-dashoffset:0}}
</style>
<defs>${defs}</defs>
<circle r="626" pathLength="1"/><circle r="614" pathLength="1"/><circle r="440" pathLength="1"/><circle r="150" pathLength="1"/>
${uses}
</svg>`;
}
write("assets/img/guilloche.svg", guilloche("#8ea6c2", "#c19a4b"));
write("assets/img/guilloche-gold.svg", guilloche("#c9a24f", "#e7cf92"));

console.log(`\nBuilt ${PAGES.length * 2} pages, ${JOBS.length} jobs, nav: ${NAV.map((n) => n.id).join(", ")}`);
