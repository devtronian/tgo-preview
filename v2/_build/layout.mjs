/* Shared page shell: <head> SEO tags, header, footer, JSON-LD graph. */
import { SITE_URL, CO, NAV } from "./site.mjs";
import { ICONS } from "./icons.mjs";

export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function icon(name, cls = "") {
  return `<svg class="ic${cls ? " " + cls : ""}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] || ""}</svg>`;
}

/* Absolute URL of a page in a language. */
export function absUrl(file, lang) {
  const dir = lang === "en" ? "/en/" : "/";
  return SITE_URL + dir + (file === "index.html" ? "" : file);
}

/* Render context handed to every page body. */
export function makeCtx(lang, file) {
  const en = lang === "en";
  return {
    lang, en, file,
    L: (th, enText) => (en ? enText : th),
    root: en ? "../" : "",
    href: (f) => f,
    other: (f) => (en ? "../" : "en/") + f,
    url: (f = file) => absUrl(f, lang),
    icon
  };
}

function navList(c, current, cls) {
  return `<ul class="${cls}">` + NAV.map((n) =>
    `<li><a href="${n.file}"${n.id === current ? ' aria-current="page"' : ""}>${c.L(n.th, n.en)}</a></li>`
  ).join("") + "</ul>";
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
      "@type": "PostalAddress",
      streetAddress: "91/144 Moo 9, Khlong Nueng",
      addressLocality: "Khlong Luang",
      addressRegion: "Pathum Thani",
      postalCode: "12120",
      addressCountry: "TH"
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
    contactPoint: [{
      "@type": "ContactPoint", contactType: "customer service", telephone: CO.tel, email: CO.email,
      availableLanguage: ["Thai", "English"], areaServed: "TH"
    }],
    sameAs: [CO.facebook]
  };
}

function graph(c, page) {
  const url = c.url();
  const g = [
    orgNode(),
    {
      "@type": "WebSite", "@id": SITE_URL + "/#website", url: SITE_URL + "/",
      name: CO.short, alternateName: CO.nameTh, publisher: { "@id": SITE_URL + "/#org" }, inLanguage: ["th", "en"]
    },
    {
      "@type": page.schemaType || "WebPage", "@id": url + "#webpage", url,
      name: page.title[c.lang], description: page.desc[c.lang], inLanguage: c.lang,
      isPartOf: { "@id": SITE_URL + "/#website" }, about: { "@id": SITE_URL + "/#org" },
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

function head(c, page) {
  const t = page.title[c.lang], d = page.desc[c.lang];
  const thUrl = absUrl(page.file, "th"), enUrl = absUrl(page.file, "en");
  const og = SITE_URL + `/assets/img/og-${c.lang}.jpg`;
  return `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>document.documentElement.classList.add("js")</script>
<title>${esc(t)}</title>
<meta name="description" content="${esc(d)}">
<link rel="canonical" href="${c.url()}">
<link rel="alternate" hreflang="th" href="${thUrl}">
<link rel="alternate" hreflang="en" href="${enUrl}">
<link rel="alternate" hreflang="x-default" href="${thUrl}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="theme-color" content="#0b2150">
<meta name="color-scheme" content="light">
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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@400;500;600;700&family=Noto+Serif+Thai:wdth,wght@75,600..800&display=swap">
<link rel="stylesheet" href="${c.root}assets/css/site.css">
${page.preload || ""}<script src="${c.root}assets/js/site.js" defer></script>
<script type="speculationrules">{"prerender":[{"where":{"href_matches":"*.html"},"eagerness":"moderate"}]}</script>
<script type="application/ld+json">${graph(c, page)}</script>
</head>`;
}

function header(c, page) {
  return `<body class="pg-${page.id}">
<a class="skip" href="#main">${c.L("ข้ามไปยังเนื้อหา", "Skip to content")}</a>
<header class="hdr">
  <div class="wrap hdr-in">
    <a class="brand" href="index.html"${page.id === "home" ? ' aria-current="page"' : ""}>
      <img src="${c.root}assets/img/tg-mark-96.png" width="44" height="41" alt="">
      <span class="brand-t"><b>TG Oversea Solutions</b><small>${c.L("บริษัทจัดหางาน ใบอนุญาต " + CO.licenseTh, "Recruitment Co., Ltd. · Licence " + CO.licenseEn)}</small></span>
      <span class="sr">${c.L("หน้าแรก", "Home")}</span>
    </a>
    <nav class="nav" aria-label="${c.L("เมนูหลัก", "Main")}">${navList(c, page.id, "nav-l")}</nav>
    <div class="hdr-act">
      <a class="lang" href="${c.other(page.file)}" hreflang="${c.en ? "th" : "en"}" lang="${c.en ? "th" : "en"}">${c.en ? "ไทย" : "EN"}<span class="sr">${c.en ? " — อ่านเป็นภาษาไทย" : " — read in English"}</span></a>
      <a class="btn btn-sm btn-ink hdr-cta" href="contact.html?type=worker">${c.L("สมัครงาน", "Apply")}</a>
      <button class="menu-btn" type="button" popovertarget="mnav" aria-label="${c.L("เปิดเมนู", "Open menu")}">${icon("menu")}</button>
    </div>
  </div>
</header>
<div class="mnav" id="mnav" popover>
  <div class="mnav-top">
    <b>${c.L("เมนู", "Menu")}</b>
    <button type="button" popovertarget="mnav" popovertargetaction="hide" aria-label="${c.L("ปิดเมนู", "Close menu")}">${icon("x")}</button>
  </div>
  <nav aria-label="${c.L("เมนูมือถือ", "Mobile")}">${navList(c, page.id, "mnav-l")}</nav>
  <div class="mnav-foot">
    <a class="btn btn-ink" href="contact.html?type=worker">${c.L("สมัครงานต่างประเทศ", "Apply for work abroad")}</a>
    <a class="btn btn-line" href="tel:${CO.tel}">${icon("phone")}${CO.phone}</a>
    <a class="mnav-lang" href="${c.other(page.file)}" hreflang="${c.en ? "th" : "en"}">${c.en ? "อ่านเป็นภาษาไทย" : "Read in English"}</a>
  </div>
</div>`;
}

export function crumbs(c, page) {
  return `<nav class="crumbs" aria-label="${c.L("เส้นทาง", "Breadcrumb")}"><ol><li><a href="index.html">${c.L("หน้าแรก", "Home")}</a></li><li><span aria-current="page">${page.crumb[c.lang]}</span></li></ol></nav>`;
}

/* Thin line of repeating microtext, like the security printing on a licence or banknote. */
export function microline(c) {
  const s = c.L(`ใบอนุญาตจัดหางานไปทำงานต่างประเทศ ${CO.licenseTh} กรมการจัดหางาน กระทรวงแรงงาน ✦ `, `Overseas recruitment licence ${CO.licenseEn} Department of Employment, Ministry of Labour ✦ `);
  return `<div class="micro" aria-hidden="true"><span>${s.repeat(8)}</span></div>`;
}

function footer(c, page) {
  const cta = page.id === "contact" ? "" : `
<section class="cta" aria-labelledby="cta-t">
  <div class="wrap cta-in">
    <img class="cta-ros" src="${c.root}assets/img/guilloche-gold.svg" alt="" width="640" height="640" loading="lazy" decoding="async">
    <div>
      <h2 id="cta-t" class="h2">${c.L("ปรึกษาฟรี ก่อนตัดสินใจไปทำงานต่างประเทศ", "Free advice before you decide to work abroad")}</h2>
      <p>${c.L("เจ้าหน้าที่จะอธิบายตำแหน่งงาน ค่าใช้จ่ายทุกรายการ และระยะเวลาให้ชัดเจน ไม่มีข้อผูกมัด", "We explain the role, every cost and the timeline in plain terms. No obligation.")}</p>
    </div>
    <div class="cta-act">
      <a class="btn btn-gold" href="contact.html?type=worker">${c.L("ฝากข้อมูลสมัครงาน", "Leave your details")}</a>
      <a class="btn btn-ghost" href="tel:${CO.tel}">${icon("phone")}${c.L("โทร ", "Call ")}${CO.phone}</a>
    </div>
  </div>
</section>`;
  return `${cta}
<footer class="ftr">
  ${microline(c)}
  <div class="wrap ftr-grid">
    <div class="ftr-brand">
      <img src="${c.root}assets/img/tg-logo-280.png" width="140" height="133" alt="${CO.short}" loading="lazy" decoding="async">
      <p><b>${c.L(CO.nameTh, CO.nameEn)}</b><br>${c.L("จัดหางานและส่งแรงงานไทยไปทำงานต่างประเทศอย่างถูกกฎหมาย", "Licensed recruitment of Thai workers for employers abroad.")}</p>
    </div>
    <nav class="ftr-col" aria-label="${c.L("ลิงก์ส่วนท้าย", "Footer")}">
      <h2>${c.L("เมนู", "Pages")}</h2>
      <ul><li><a href="index.html">${c.L("หน้าแรก", "Home")}</a></li>${NAV.map((n) => `<li><a href="${n.file}">${c.L(n.th, n.en)}</a></li>`).join("")}</ul>
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
    <div class="ftr-col ftr-lic">
      <h2>${c.L("ใบอนุญาต", "Licence")}</h2>
      <p>${c.L("ใบอนุญาตจัดหางานไปทำงานต่างประเทศ เลขที่", "Overseas recruitment licence no.")}</p>
      <p class="ftr-no">${c.L(CO.licenseTh, CO.licenseEn)}</p>
      <p>${c.L("ออกโดยกรมการจัดหางาน กระทรวงแรงงาน", "Issued by the Department of Employment, Ministry of Labour")}</p>
      <a href="${CO.doe}" rel="noopener" target="_blank">${c.L("ตรวจสอบกับกรมการจัดหางาน", "Verify with the department")}${icon("arrowUR")}</a>
    </div>
  </div>
  <div class="wrap ftr-bot">
    <span>© 2026 ${CO.nameEn}</span>
    <span>${c.L("สายด่วนกรมการจัดหางาน 1694", "Department of Employment hotline 1694")}</span>
    <a href="${c.other(page.file)}" hreflang="${c.en ? "th" : "en"}">${c.en ? "ภาษาไทย" : "English"}</a>
  </div>
</footer>
</body>
</html>
`;
}

export function render(page, lang) {
  const c = makeCtx(lang, page.file);
  return head(c, page) + "\n" + header(c, page) + `\n<main id="main">\n` + page.body(c) + `\n</main>` + footer(c, page);
}
