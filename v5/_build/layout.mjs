/* v5 page shell: <head> SEO tags, header, theme picker, footer, JSON-LD graph. */
import { SITE_URL, CO, NAV, THEMES } from "./site.mjs";
import { ICONS } from "./icons.mjs";
import { photo } from "./img.mjs";

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

function navList(c, current, cls) {
  return `<ul class="${cls}" role="list">` + NAV.map((n) =>
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

function head(c, page) {
  const t = page.title[c.lang], d = page.desc[c.lang];
  const thUrl = absUrl(page.file, "th"), enUrl = absUrl(page.file, "en");
  const og = SITE_URL + `/assets/img/og-${c.lang}.jpg`;
  return `<!doctype html>
<html lang="${c.lang}" data-theme="auto">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<script>(function(d){var t,m;try{t=localStorage.getItem("tg5-theme");m=localStorage.getItem("tg5-motion")}catch(e){}if(t)d.setAttribute("data-theme",t);if(m)d.setAttribute("data-motion",m);d.classList.add("js");if(m==="reduce"||matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("rm");setTimeout(function(){if(!d.classList.contains("io"))d.classList.add("rm")},2500)})(document.documentElement)</script>
<title>${esc(t)}</title>
<meta name="description" content="${esc(d)}">
<link rel="canonical" href="${c.url()}">
<link rel="alternate" hreflang="th" href="${thUrl}">
<link rel="alternate" hreflang="en" href="${enUrl}">
<link rel="alternate" hreflang="x-default" href="${thUrl}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="theme-color" content="#f3f5fa" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#05070f" media="(prefers-color-scheme: dark)">
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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Noto+Sans+Thai:wdth,wght@75..100,400..800&display=swap">
${page.preload ? page.preload(c) + "\n" : ""}<link rel="stylesheet" href="${c.root}assets/css/site.css">
<script src="${c.root}assets/js/site.js" defer></script>
<script type="speculationrules">{"prerender":[{"where":{"href_matches":"*.html"},"eagerness":"moderate"}]}</script>
<script type="application/ld+json">${graph(c, page)}</script>
</head>`;
}

function themePanel(c) {
  return `<div class="tpanel" id="theme-panel" popover>
  <p class="tpanel-t" id="tp-t">${c.L("เลือกธีมสี", "Colour theme")}</p>
  <div class="tpanel-l" role="radiogroup" aria-labelledby="tp-t">
    ${THEMES.map((t) => `<button type="button" role="radio" aria-checked="false" data-set-theme="${t.id}"><span class="sw" style="--a:${t.sw[0]};--b:${t.sw[1]}"></span><span>${c.L(t.th, t.en)}</span></button>`).join("\n    ")}
  </div>
  <label class="tpanel-m"><input type="checkbox" data-motion-toggle><span class="tg-sw" aria-hidden="true"></span><span>${c.L("ลดการเคลื่อนไหว", "Reduce motion")}</span></label>
</div>`;
}

function header(c, page) {
  return `<body class="pg-${page.id}">
<a class="skip" href="#main">${c.L("ข้ามไปยังเนื้อหา", "Skip to content")}</a>
<div class="progress" aria-hidden="true"><span></span></div>
<header class="hdr" data-hdr>
  <div class="hdr-in">
    <a class="brand" href="index.html"${page.id === "home" ? ' aria-current="page"' : ""}>
      <span class="brand-m"><img src="${c.root}assets/img/tg-mark-96.png" width="34" height="32" alt=""></span>
      <span class="brand-t"><b>TG Oversea</b><small>${c.L("บริษัทจัดหางาน", "Recruitment")}</small></span>
      <span class="sr">${c.L(" — หน้าแรก", " — home")}</span>
    </a>
    <nav class="nav" aria-label="${c.L("เมนูหลัก", "Main")}">${navList(c, page.id, "nav-l")}</nav>
    <div class="hdr-act">
      <button class="ibtn" type="button" popovertarget="theme-panel" aria-label="${c.L("เลือกธีมสี", "Choose colour theme")}">${icon("palette")}</button>
      <a class="ibtn lang" href="${c.other(page.file)}" hreflang="${c.en ? "th" : "en"}" lang="${c.en ? "th" : "en"}">${c.en ? "ไทย" : "EN"}<span class="sr">${c.en ? " — อ่านเป็นภาษาไทย" : " — read in English"}</span></a>
      <a class="btn btn-acc btn-sm hdr-cta" href="contact.html?type=worker" data-magnet>${c.L("สมัครงาน", "Apply now")}</a>
      <button class="ibtn menu-btn" type="button" popovertarget="mnav" aria-label="${c.L("เปิดเมนู", "Open menu")}">${icon("menu")}</button>
    </div>
  </div>
</header>
${themePanel(c)}
<div class="mnav" id="mnav" popover>
  <div class="mnav-top">
    <span class="brand-t"><b>TG Oversea</b><small>${c.L("บริษัทจัดหางาน", "Recruitment")}</small></span>
    <button class="ibtn" type="button" popovertarget="mnav" popovertargetaction="hide" aria-label="${c.L("ปิดเมนู", "Close menu")}">${icon("x")}</button>
  </div>
  <nav aria-label="${c.L("เมนูมือถือ", "Mobile")}"><ul class="mnav-l" role="list"><li><a href="index.html"${page.id === "home" ? ' aria-current="page"' : ""}>${c.L("หน้าแรก", "Home")}</a></li>${NAV.map((n) => `<li><a href="${n.file}"${n.id === page.id ? ' aria-current="page"' : ""}>${c.L(n.th, n.en)}</a></li>`).join("")}</ul></nav>
  <div class="mnav-foot">
    <a class="btn btn-acc" href="contact.html?type=worker">${c.L("สมัครงานต่างประเทศ", "Apply for work abroad")}</a>
    <a class="btn btn-line" href="tel:${CO.tel}">${icon("phone")}${CO.phone}</a>
    <a class="mnav-lang" href="${c.other(page.file)}" hreflang="${c.en ? "th" : "en"}">${c.en ? "อ่านเป็นภาษาไทย" : "Read in English"}</a>
  </div>
</div>`;
}

export function crumbs(c, page) {
  return `<nav class="crumbs" aria-label="${c.L("เส้นทาง", "Breadcrumb")}"><ol role="list"><li><a href="index.html">${c.L("หน้าแรก", "Home")}</a></li><li><span aria-current="page">${page.crumb[c.lang]}</span></li></ol></nav>`;
}

function footer(c, page) {
  const cta = page.id === "contact" ? "" : `
<section class="cta" aria-labelledby="cta-t">
  <div class="wrap cta-in" data-reveal>
    <div class="cta-win" aria-hidden="true">${photo(c, "plane-gate", "", { sizes: "(max-width: 900px) 70vw, 420px" })}</div>
    <div class="cta-copy">
      <h2 id="cta-t" class="h2" data-split>${c.L("พร้อมออกเดินทางแล้วหรือยัง?", "Ready for take-off?")}</h2>
      <p class="lead">${c.L("ปรึกษาฟรี ไม่มีข้อผูกมัด เจ้าหน้าที่อธิบายตำแหน่ง ค่าใช้จ่ายทุกรายการ และระยะเวลาให้ชัดเจนก่อนคุณตัดสินใจ", "Free, no-obligation advice. We explain the role, every cost and the timeline before you decide.")}</p>
      <div class="btn-row">
        <a class="btn btn-acc btn-lg" href="contact.html?type=worker" data-magnet>${c.L("ฝากข้อมูลสมัครงาน", "Leave your details")}${icon("arrow")}</a>
        <a class="btn btn-line btn-lg" href="tel:${CO.tel}">${icon("phone")}${CO.phone}</a>
      </div>
    </div>
  </div>
</section>`;
  return `${cta}
<footer class="ftr">
  <div class="wrap ftr-grid">
    <div class="ftr-brand">
      <img src="${c.root}assets/img/tg-logo-280.png" width="120" height="114" alt="${CO.short}" loading="lazy" decoding="async">
      <p><b>${c.L(CO.nameTh, CO.nameEn)}</b><br>${c.L("จัดหางานและส่งแรงงานไทยไปทำงานต่างประเทศอย่างถูกกฎหมาย", "Licensed recruitment of Thai workers for employers abroad.")}</p>
      <button class="btn btn-line btn-sm" type="button" popovertarget="theme-panel">${icon("palette")}${c.L("เปลี่ยนธีมสี", "Change theme")}</button>
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
    <div class="ftr-col ftr-lic">
      <h2>${c.L("ใบอนุญาต", "Licence")}</h2>
      <p class="ftr-no">${c.L(CO.licenseTh, CO.licenseEn)}</p>
      <p>${c.L("ใบอนุญาตจัดหางานไปทำงานต่างประเทศ กรมการจัดหางาน กระทรวงแรงงาน", "Overseas recruitment licence, Department of Employment, Ministry of Labour")}</p>
      <a href="${CO.doe}" rel="noopener" target="_blank">${c.L("ตรวจสอบกับกรมการจัดหางาน", "Verify with the department")}${icon("arrowUR")}</a>
    </div>
  </div>
  <p class="ftr-word" aria-hidden="true">TG Oversea</p>
  <div class="wrap ftr-bot">
    <span>© 2026 ${CO.nameEn}</span>
    <span>${c.L("สายด่วนกรมการจัดหางาน 1694", "Department of Employment hotline 1694")}</span>
    <a href="${c.other(page.file)}" hreflang="${c.en ? "th" : "en"}">${c.en ? "ภาษาไทย" : "English"}</a>
  </div>
</footer>
<div class="fab">
  <button class="fab-btn" type="button" popovertarget="fab-menu" aria-label="${c.L("ช่องทางติดต่อด่วน", "Quick contact")}">${icon("chat")}</button>
  <div class="fab-menu" id="fab-menu" popover>
    <a href="tel:${CO.tel}">${icon("phone")}<span><b>${c.L("โทรหาเรา", "Call us")}</b><small>${CO.phone}</small></span></a>
    <a href="${CO.facebook}" rel="noopener" target="_blank">${icon("facebook")}<span><b>Facebook</b><small>${c.L("ส่งข้อความหาเรา", "Message us")}</small></span></a>
    <a href="mailto:${CO.email}">${icon("mail")}<span><b>${c.L("อีเมล", "Email")}</b><small>${CO.email}</small></span></a>
  </div>
</div>
</body>
</html>
`;
}

export function render(page, lang) {
  const c = makeCtx(lang, page.file);
  return head(c, page) + "\n" + header(c, page) + `\n<main id="main">\n` + page.body(c) + `\n</main>` + footer(c, page);
}
