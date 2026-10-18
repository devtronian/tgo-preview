/* ==========================================================================
   Builds the static v5 site:  node _build/build.mjs   (run inside /v5)
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
  background_color: "#f3f5fa", theme_color: "#2b4bee",
  icons: [{ src: "assets/img/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "assets/img/icon-512.png", sizes: "512x512", type: "image/png" }]
}, null, 2));

/* ---- 404 (bilingual, not indexed; uses root-relative links so it works at any depth) ---- */
write("404.html", `<!doctype html>
<html lang="th" data-theme="auto">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<script>(function(d){var t;try{t=localStorage.getItem("tg5-theme")}catch(e){}if(t)d.setAttribute("data-theme",t);d.classList.add("js")})(document.documentElement)</script>
<title>ไม่พบหน้านี้ / Page not found | TG Oversea Solutions</title>
<meta name="robots" content="noindex">
<link rel="icon" href="/assets/img/icon-32.png" type="image/png">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Noto+Sans+Thai:wdth,wght@75..100,400..800&display=swap">
<link rel="stylesheet" href="/assets/css/site.css">
</head>
<body class="pg-404">
<main id="main" class="nf">
  <div class="hero-bg" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="wrap">
    <p class="nf-code" aria-hidden="true">404</p>
    <h1 class="display display--md">เที่ยวบินนี้ไม่มีอยู่จริง</h1>
    <p class="lead">ไม่พบหน้าที่คุณต้องการ ลิงก์อาจเปลี่ยนไปแล้ว ลองเริ่มจากหน้าแรกหรือดูตำแหน่งงานที่เปิดรับ</p>
    <p class="lead" lang="en">This flight doesn't exist. The page may have moved.</p>
    <div class="btn-row">
      <a class="btn btn-acc" href="/">กลับหน้าแรก</a>
      <a class="btn btn-line" href="/jobs.html">ดูตำแหน่งงาน</a>
      <a class="btn btn-line" href="/en/" lang="en">English home</a>
    </div>
  </div>
</main>
</body>
</html>
`);

console.log(`
Built ${PAGES.length * 2} pages, ${JOBS.length} jobs, nav: ${NAV.map((n) => n.id).join(", ")}`);
