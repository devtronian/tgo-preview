/* v6 page shell: <head> SEO tags, trust bar, header, display settings, footer, JSON-LD graph. */
import { SITE_URL, CO, NAV, THEMES, HEROES } from "./site.mjs";
import { ICONS } from "./icons.mjs";

export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function icon(name, cls = "") {
  return `<svg class="ic${cls ? " " + cls : ""}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] || ""}</svg>`;
}

export function absUrl(file, lang) {
  return SITE_URL + (lang === "en" ? "/en/" : "/") + (file === "index.html" ? "" : file);
}

export function makeCtx(lang, file) {
  const en = lang === "en";
  return {
    lang, en, file,
    L: (th, enText) => (en ? enText : th),
    root: en ? "../" : "",
    other: (f) => (en ? "../" : "en/") + f,
    url: (f = file) => absUrl(f, lang),
    icon
  };
}

function orgNode() {
  return {
    "@type": ["EmploymentAgency", "Organization"],
    "@id": SITE_URL + "/#org",
    name: CO.nameEn,
    alternateName: [CO.nameTh, CO.short, "TG Oversea", "ทีจี โอเวอร์ซี"],
    url: SITE_URL + "/",
    logo: { "@type": "ImageObject", url: SITE_URL + "/assets/img/icon-512.png", width: 512, height: 512 },
    image: SITE_URL + "/assets/img/og-th.jpg",
    description: "Licensed Thai overseas recruitment agency (licence T. 1307/2569, Department of Employment, Ministry of Labour) placing Thai workers in the Middle East, Australia, New Zealand, Europe and Asia.",
    telephone: CO.tel,
    email: CO.email,
    foundingDate: CO.founded,
    address: {
      "@type": "PostalAddress", streetAddress: "91/144 Moo 9, Khlong Nueng", addressLocality: "Khlong Luang",
      addressRegion: "Pathum Thani", postalCode: "12120", addressCountry: "TH"
    },
    areaServed: ["TH", "SA", "AE", "OM", "KW", "AU", "NZ", "Europe", "Asia"],
    knowsLanguage: ["th", "en"],
    identifier: { "@type": "PropertyValue", name: "Overseas recruitment licence", value: CO.licenseEn },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "Licence to recruit workers for overseas employment, no. T. 1307/2569",
      credentialCategory: "license",
      recognizedBy: { "@type": "GovernmentOrganization", name: "Department of Employment, Ministry of Labour, Thailand", url: CO.doe }
    },
    contactPoint: [{ "@type": "ContactPoint", contactType: "customer service", telephone: CO.tel, email: CO.email, availableLanguage: ["Thai", "English"], areaServed: "TH" }],
    sameAs: [CO.facebook]
  };
}

function graph(c, page) {
  const url = c.url();
  const g = [
    orgNode(),
    { "@type": "WebSite", "@id": SITE_URL + "/#website", url: SITE_URL + "/", name: CO.short, alternateName: CO.nameTh, publisher: { "@id": SITE_URL + "/#org" }, inLanguage: ["th", "en"] },
    {
      "@type": page.schemaType || "WebPage", "@id": url + "#webpage", url,
      name: page.title[c.lang], description: page.desc[c.lang], inLanguage: c.lang,
      isPartOf: { "@id": SITE_URL + "/#website" }, about: { "@id": SITE_URL + "/#org" },
      ...(page.ogImage ? { primaryImageOfPage: { "@type": "ImageObject", url: SITE_URL + "/assets/img/" + page.ogImage + "-1280.webp" } } : {}),
      ...(page.crumb ? { breadcrumb: { "@id": url + "#breadcrumb" } } : {})
    }
  ];
  if (page.crumb) {
    g.push({
      "@type": "BreadcrumbList", "@id": url + "#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: c.L("หน้าแรก", "Home"), item: c.url("index.html") },
        { "@type": "ListItem", position: 2, name: page.crumb[c.lang], item: url }
      ]
    });
  }
  if (page.schema) g.push(...[].concat(page.schema(c)).filter(Boolean));
  return JSON.stringify({ "@context": "https://schema.org", "@graph": g }).replace(/</g, "\\u003c");
}

export const FONTS = "https://fonts.googleapis.com/css2?family=Anuphan:wght@400..700&family=Geist:wght@400..700&display=swap";

/* Runs before first paint: applies saved theme, text size and motion preference. */
export const BOOT = `(function(d){var g=function(k){try{return localStorage.getItem(k)}catch(e){return null}},t=g("tg6-theme"),f=g("tg6-text"),m=g("tg6-motion"),h=g("tg6-hero");if(t)d.setAttribute("data-theme",t==="dark"||t==="night"?"dark":"light");if(f)d.setAttribute("data-text",f);if(h)d.setAttribute("data-hero",h);d.classList.add("js");if(m==="reduce"||matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("rm");setTimeout(function(){if(!d.classList.contains("ok"))d.classList.add("rm")},2500)})(document.documentElement)`;

function head(c, page) {
  const t = page.title[c.lang], d = page.desc[c.lang];
  const thUrl = absUrl(page.file, "th"), enUrl = absUrl(page.file, "en");
  const og = SITE_URL + `/assets/img/og-${c.lang}.jpg`;
  return `<!doctype html>
<html lang="${c.lang}" data-theme="auto">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<script>${BOOT}</script>
<title>${esc(t)}</title>
<meta name="description" content="${esc(d)}">
<link rel="canonical" href="${c.url()}">
<link rel="alternate" hreflang="th" href="${thUrl}">
<link rel="alternate" hreflang="en" href="${enUrl}">
<link rel="alternate" hreflang="x-default" href="${thUrl}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="theme-color" content="#f4f6f5" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0a111c" media="(prefers-color-scheme: dark)">
<meta name="color-scheme" content="light dark">
<meta name="format-detection" content="telephone=no">
<link rel="icon" href="${c.root}assets/img/icon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${c.root}assets/img/icon-180.png">
<link rel="manifest" href="${c.root}site.webmanifest">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${CO.short}">
<meta property="og:locale" content="${c.en ? "en_US" : "th_TH"}">
<meta property="og:locale:alternate" content="${c.en ? "th_TH" : "en_US"}">
<meta property="og:title" content="${esc(t)}">
<meta property="og:description" content="${esc(d)}">
<meta property="og:url" content="${c.url()}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(c.L("TG Oversea Solutions บริษัทจัดหางานไปต่างประเทศ ใบอนุญาต ต. 1307/2569", "TG Oversea Solutions, licensed overseas recruitment agency, licence T. 1307/2569"))}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
${page.preload ? page.preload(c) + "\n" : ""}<link rel="stylesheet" href="${c.root}assets/css/site.css${page.file === "profile.html" ? "?v=profile-20261102-2" : ""}">
<script src="${c.root}assets/js/site.js${page.file === "profile.html" ? "?v=book-20261101-4" : ""}" defer></script>
<script type="speculationrules">{"prerender":[{"where":{"href_matches":"*.html"},"eagerness":"moderate"}]}</script>
<script type="application/ld+json">${graph(c, page)}</script>
</head>`;
}

/* Two links to the same page in each language. site.js adds the section in view as a #hash,
   so switching language keeps the reader where they were. */
function langSwitch(c, page, cls = "") {
  const th = c.en ? "../" + page.file : page.file, en = c.en ? page.file : "en/" + page.file;
  return `<div class="lang${cls ? " " + cls : ""}" role="group" aria-label="${c.L("ภาษา", "Language")}">
      <a href="${th}" hreflang="th" lang="th" data-lang-link${c.en ? "" : ' aria-current="true"'}>ไทย</a>
      <a href="${en}" hreflang="en" lang="en" data-lang-link${c.en ? ' aria-current="true"' : ""}>EN</a>
    </div>`;
}

/* Small schematic of each home hero style for the display panel */
const HERO_PREVIEW = {
  track: '<rect x="4" y="4" width="50" height="40" rx="5" class="p1"/><rect x="34" y="16" width="42" height="28" rx="4" class="p2"/><circle cx="41" cy="24" r="2.5" class="p3"/><circle cx="41" cy="31" r="2.5" class="p3"/><circle cx="41" cy="38" r="2.5" class="p4"/><rect x="47" y="23" width="22" height="2.4" rx="1.2" class="p5"/><rect x="47" y="30" width="18" height="2.4" rx="1.2" class="p5"/><rect x="47" y="37" width="20" height="2.4" rx="1.2" class="p5"/>',
  board: '<rect x="4" y="4" width="72" height="40" rx="5" class="p0"/><rect x="10" y="9" width="28" height="14" rx="2.5" class="p2"/><rect x="10" y="26" width="28" height="14" rx="2.5" class="p2"/><rect x="42" y="15" width="28" height="14" rx="2.5" class="p2"/><rect x="42" y="32" width="28" height="9" rx="2.5" class="p2"/><rect x="13" y="12" width="12" height="5" rx="1.5" class="p1"/><rect x="13" y="29" width="12" height="5" rx="1.5" class="p1"/><rect x="45" y="18" width="12" height="5" rx="1.5" class="p1"/>',
  docs: '<rect x="18" y="8" width="28" height="34" rx="3" class="p5" transform="rotate(-9 32 25)"/><rect x="28" y="6" width="28" height="36" rx="3" class="p2" transform="rotate(4 42 24)"/><rect x="32" y="12" width="16" height="2.4" rx="1.2" class="p5"/><rect x="32" y="18" width="12" height="2.4" rx="1.2" class="p5"/><rect x="32" y="24" width="14" height="2.4" rx="1.2" class="p5"/><rect x="44" y="29" width="24" height="10" rx="2.5" class="p6" transform="rotate(-12 56 34)"/>',
  sectors: '<rect x="4" y="4" width="44" height="24" rx="4" class="p1"/><rect x="51" y="4" width="25" height="24" rx="4" class="p7"/><rect x="4" y="31" width="44" height="13" rx="4" class="p7"/><rect x="51" y="31" width="25" height="13" rx="4" class="p1"/>'
};

function heroPicker(c) {
  return `
  <p class="sp-l" id="sp-hero">${c.L("ภาพเคลื่อนไหวหน้าแรก", "Home page animation")}</p>
  <div class="sp-heroes" role="radiogroup" aria-labelledby="sp-hero">
    ${HEROES.map((h) => `<button type="button" role="radio" aria-checked="false" data-set-hero="${h.id}"><svg class="hvp" viewBox="0 0 80 48" aria-hidden="true">${HERO_PREVIEW[h.id]}</svg><span>${c.L(h.th, h.en)}</span></button>`).join("\n    ")}
  </div>`;
}

function settingsPanel(c, page) {
  const sizes = [["", c.L("ปกติ", "Normal"), "1"], ["lg", c.L("ใหญ่", "Large"), "1.12"], ["xl", c.L("ใหญ่มาก", "Larger"), "1.25"]];
  return `<div class="sp" id="settings" popover aria-labelledby="sp-t">
  <div class="sp-head">
    <p class="sp-t" id="sp-t">${c.L("ปรับการแสดงผล", "Display settings")}</p>
    <button class="ibtn ibtn--s" type="button" popovertarget="settings" popovertargetaction="hide" aria-label="${c.L("ปิด", "Close")}">${icon("x")}</button>
  </div>
  <p class="sp-l" id="sp-theme">${c.L("ธีม", "Theme")}</p>
  <div class="sp-seg sp-seg--2" role="radiogroup" aria-labelledby="sp-theme">
    ${THEMES.map((t) => `<button type="button" role="radio" aria-checked="false" data-set-theme="${t.id}">${icon(t.icon)}${c.L(t.th, t.en)}</button>`).join("")}
  </div>
  ${page.id === "home" ? heroPicker(c) : ""}
  <p class="sp-l" id="sp-text">${c.L("ขนาดตัวอักษร", "Text size")}</p>
  <div class="sp-seg" role="radiogroup" aria-labelledby="sp-text">
    ${sizes.map(([v, l, k]) => `<button type="button" role="radio" aria-checked="false" data-set-text="${v}"><span aria-hidden="true" style="font-size:${k}em">${c.L("ก", "A")}</span>${l}</button>`).join("")}
  </div>
  <label class="sp-motion"><span><b>${c.L("ลดการเคลื่อนไหว", "Reduce motion")}</b><small>${c.L("ปิดแอนิเมชันทั้งหมดในเว็บไซต์", "Turn off animation across the site")}</small></span><input type="checkbox" role="switch" data-motion-toggle><span class="tsw" aria-hidden="true"></span></label>
</div>`;
}

function header(c, page) {
  const navItems = (cur) => NAV.map((n) => `<li><a href="${n.file}"${n.id === cur ? ' aria-current="page"' : ""}>${c.L(n.th, n.en)}</a></li>`).join("");
  return `<body class="pg-${page.id}">
<a class="skip" href="#main">${c.L("ข้ามไปยังเนื้อหา", "Skip to content")}</a>
<div class="tbar">
  <div class="wrap tbar-in">
    <p>${icon("badge")}<span>${c.L(`บริษัทจัดหางานที่ได้รับอนุญาต เลขที่ <b>${CO.licenseTh}</b><span class="tbar-x"> จากกรมการจัดหางาน</span>`, `Licensed recruitment agency, licence no. <b>${CO.licenseEn}</b><span class="tbar-x">, Department of Employment</span>`)}</span></p>
    <a href="${page.id === "about" ? "#licence" : "about.html#licence"}">${c.L("ตรวจสอบใบอนุญาต", "Check our licence")}</a>
    <a class="tbar-tel" href="tel:${CO.tel}">${icon("phone")}${CO.phone}</a>
  </div>
</div>
<header class="hdr" data-hdr>
  <div class="wrap hdr-in">
    <a class="brand" href="index.html"${page.id === "home" ? ' aria-current="page"' : ""}>
      <img src="${c.root}assets/img/tg-mark-96.png" width="36" height="34" alt="">
      <span class="brand-t"><b>TG&nbsp;Oversea Solutions</b><small>${c.L("บริษัทจัดหางาน", "Recruitment Co., Ltd.")}</small></span>
      <span class="sr">${c.L(" หน้าแรก", " home")}</span>
    </a>
    <nav class="nav" aria-label="${c.L("เมนูหลัก", "Main")}"><ul role="list">${navItems(page.id)}</ul></nav>
    <div class="hdr-act">
      ${langSwitch(c, page)}
      <button class="ibtn" type="button" popovertarget="settings" aria-label="${c.L("ปรับธีมและขนาดตัวอักษร", "Theme and text size")}">${icon("palette")}</button>
      <a class="btn btn-ac btn-sm hdr-cta" href="contact.html?type=worker">${c.L("สมัครงาน", "Apply")}</a>
      <button class="ibtn menu-btn" type="button" popovertarget="mnav" aria-label="${c.L("เปิดเมนู", "Open menu")}">${icon("menu")}</button>
    </div>
  </div>
</header>
${settingsPanel(c, page)}
<div class="mnav" id="mnav" popover>
  <div class="mnav-top">
    <span class="brand-t"><b>TG&nbsp;Oversea Solutions</b><small>${c.L("บริษัทจัดหางาน", "Recruitment Co., Ltd.")}</small></span>
    <button class="ibtn" type="button" popovertarget="mnav" popovertargetaction="hide" aria-label="${c.L("ปิดเมนู", "Close menu")}">${icon("x")}</button>
  </div>
  <nav aria-label="${c.L("เมนูมือถือ", "Mobile")}"><ul class="mnav-l" role="list"><li><a href="index.html"${page.id === "home" ? ' aria-current="page"' : ""}>${c.L("หน้าแรก", "Home")}</a></li>${navItems(page.id)}</ul></nav>
  <div class="mnav-foot">
    ${langSwitch(c, page, "lang--lg")}
    <button class="btn btn-line" type="button" popovertarget="settings">${icon("palette")}${c.L("ธีมและขนาดตัวอักษร", "Theme and text size")}</button>
    <a class="btn btn-ac" href="contact.html?type=worker">${c.L("สมัครงานต่างประเทศ", "Apply for work abroad")}</a>
  </div>
</div>`;
}

export function crumbs(c, page) {
  return `<nav class="crumbs" aria-label="${c.L("เส้นทาง", "Breadcrumb")}"><ol role="list"><li><a href="index.html">${c.L("หน้าแรก", "Home")}</a></li><li><span aria-current="page">${page.crumb[c.lang]}</span></li></ol></nav>`;
}

function footer(c, page) {
  const cta = page.id === "contact" ? "" : `
<section class="cta" id="talk" aria-labelledby="cta-t">
  <div class="wrap">
    <div class="cta-in" data-reveal>
      <div>
        <h2 id="cta-t" class="h2">${c.L("คุยกับเจ้าหน้าที่ก่อน แล้วค่อยตัดสินใจ", "Talk to us first, then decide")}</h2>
        <p class="lead">${c.L("ปรึกษาฟรี เราอธิบายตำแหน่ง เงื่อนไขสัญญา ค่าใช้จ่ายทุกรายการ และระยะเวลา เป็นลายลักษณ์อักษรก่อนคุณสมัคร", "Free advice. We put the role, contract terms, every cost and the timeline in writing before you apply.")}</p>
      </div>
      <div class="cta-act">
        <a class="btn btn-ac btn-lg" href="contact.html?type=worker">${c.L("ฝากข้อมูลให้ติดต่อกลับ", "Ask us to call you")}${icon("arrow")}</a>
        <a class="btn btn-line btn-lg" href="tel:${CO.tel}">${icon("phone")}${CO.phone}</a>
        <a class="cta-emp" href="contact.html?type=employer">${c.L("นายจ้างที่ต้องการแรงงานไทย ติดต่อที่นี่", "Employers hiring Thai workers, start here")}</a>
      </div>
    </div>
  </div>
</section>`;
  return `${cta}
<footer class="ftr">
  <div class="wrap ftr-grid">
    <div class="ftr-brand">
      <img src="${c.root}assets/img/tg-logo-280.png" width="96" height="91" alt="${CO.short}" loading="lazy" decoding="async">
      <p><b>${c.L(CO.nameTh, CO.nameEn)}</b></p>
      <p>${c.L("จัดหางานและส่งแรงงานไทยไปทำงานต่างประเทศอย่างถูกกฎหมาย", "Licensed recruitment of Thai workers for employers abroad.")}</p>
    </div>
    <nav class="ftr-col" aria-label="${c.L("ลิงก์ส่วนท้าย", "Footer")}">
      <h2>${c.L("เมนู", "Pages")}</h2>
      <ul role="list"><li><a href="index.html">${c.L("หน้าแรก", "Home")}</a></li>${NAV.map((n) => `<li><a href="${n.file}">${c.L(n.th, n.en)}</a></li>`).join("")}</ul>
    </nav>
    <div class="ftr-col">
      <h2>${c.L("ติดต่อ", "Contact")}</h2>
      <address>
        <a href="tel:${CO.tel}">${icon("phone")}${CO.phone}</a>
        <a href="mailto:${CO.email}">${icon("mail")}${CO.email}</a>
        <a href="${CO.facebook}" rel="noopener" target="_blank">${icon("facebook")}Facebook</a>
        <span>${icon("pin")}${c.L(CO.addrTh, CO.addrEn)}</span>
      </address>
    </div>
    <div class="ftr-lic">
      <span class="ftr-seal">${icon("badge")}</span>
      <h2>${c.L("ใบอนุญาตจัดหางานไปต่างประเทศ", "Overseas recruitment licence")}</h2>
      <p class="ftr-no">${c.L(CO.licenseTh, CO.licenseEn)}</p>
      <p>${c.L("กรมการจัดหางาน กระทรวงแรงงาน", "Department of Employment, Ministry of Labour")}</p>
      <a href="${CO.doe}" rel="noopener" target="_blank">${c.L("ตรวจสอบที่ doe.go.th", "Verify at doe.go.th")}${icon("arrowUR")}</a>
    </div>
  </div>
  <div class="wrap ftr-bot">
    <span>© 2026 ${CO.nameEn}</span>
    <span>${c.L("สายด่วนกรมการจัดหางาน 1694", "Department of Employment hotline 1694")}</span>
    <button class="ftr-set" type="button" popovertarget="settings">${icon("palette")}${c.L("ธีมและขนาดตัวอักษร", "Theme and text size")}</button>
    ${langSwitch(c, page)}
  </div>
</footer>
<nav class="mbar" aria-label="${c.L("ติดต่อด่วน", "Quick contact")}">
  <a href="tel:${CO.tel}">${icon("phone")}${c.L("โทรหาเรา", "Call")}</a>
  <a class="mbar-ac" href="contact.html?type=worker">${icon("briefcase")}${c.L("สมัครงาน", "Apply")}</a>
</nav>
</body>
</html>
`;
}

export function render(page, lang) {
  const c = makeCtx(lang, page.file);
  return head(c, page) + "\n" + header(c, page) + `\n<main id="main">\n` + page.body(c) + `\n</main>` + footer(c, page);
}
