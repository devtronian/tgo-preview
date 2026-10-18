/* ==========================================================================
   TG Oversea Solutions — shared layout
   Injects header, mobile menu, curtain, preloader, cursor, FAB and footer;
   owns language switching and page transitions.
   Loaded synchronously right after <body> so the header paints with the page.
   ========================================================================== */
(function () {
  "use strict";

  var html = document.documentElement;
  var body = document.body;
  var page = body.getAttribute("data-page") || "";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var CO = {
    phone: "083-157-0465",
    tel: "+66831570465",
    email: "tg.oversea.solutions@gmail.com",
    facebook: "https://www.facebook.com/share/1FQKF1hHze/",
    license: "ต. 1307/2569",
    licenseEn: "T. 1307/2569"
  };

  /* ---------- Icons (24px stroke set) ---------- */
  var P = {
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowUR: '<path d="M7 17 17 7M8 7h9v9"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
    factory: '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><path d="M17 18h1M12 18h1M7 18h1"/>',
    sprout: '<path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
    lotus: '<path d="M12 21c-4.4 0-8-2.9-8-7.4 3.1 0 6.1 1.3 8 4 1.9-2.7 4.9-4 8-4 0 4.5-3.6 7.4-8 7.4z"/><path d="M12 17.6c-2.1-2.9-2.1-8.2 0-12.6 2.1 4.4 2.1 9.7 0 12.6z"/><path d="M8.6 15.4C7 12.9 7 10.3 7.6 8.3M15.4 15.4c1.6-2.5 1.6-5.1 1-7.1"/>',
    doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
    plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    medical: '<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>',
    passport: '<rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M8 17h8"/>',
    handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7.1-.9l.5.3a2 2 0 0 0 1.4.3L21 4"/><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8"/>',
    scale: '<path d="m16 16 3-8 3 8c-.9.6-1.9 1-3 1s-2.1-.4-3-1zM2 16l3-8 3 8c-.9.6-1.9 1-3 1s-2.1-.4-3-1z"/><path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    headset: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    star: '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    alert: '<path d="m21.7 18-8-14a2 2 0 0 0-3.5 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3z"/><path d="M12 9v4M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    compass: '<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z"/>',
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    person: '<circle cx="12" cy="7" r="4"/><path d="M5 21v-1a7 7 0 0 1 14 0v1"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
    chef: '<path d="M17 21a1 1 0 0 0 1-1v-5.4a1 1 0 0 1 .6-.9A4 4 0 0 0 17 6a5 5 0 0 0-10 0 4 4 0 0 0-1.6 7.7 1 1 0 0 1 .6.9V20a1 1 0 0 0 1 1z"/><path d="M6 17h12"/>',
    bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>'
  };
  function icon(name, cls) {
    return '<svg class="ic' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" aria-hidden="true">' + (P[name] || "") + "</svg>";
  }
  function hydrateIcons(root) {
    (root || document).querySelectorAll("i[data-icon]").forEach(function (el) {
      el.outerHTML = icon(el.getAttribute("data-icon"), el.getAttribute("data-class"));
    });
  }
  function t(th, en) { return '<span data-l="th">' + th + '</span><span data-l="en">' + en + "</span>"; }

  /* ---------- Navigation ---------- */
  var NAV = [
    { id: "home", href: "index.html", th: "หน้าแรก", en: "Home" },
    { id: "about", href: "about.html", th: "เกี่ยวกับเรา", en: "About us" },
    { id: "services", href: "services.html", th: "บริการและตำแหน่งงาน", en: "Services & jobs" },
    { id: "process", href: "process.html", th: "ขั้นตอนการดำเนินงาน", en: "How it works" },
    { id: "contact", href: "contact.html", th: "ติดต่อเรา", en: "Contact" }
  ];
  function navLinks() {
    return NAV.map(function (n) {
      return '<a href="' + n.href + '"' + (n.id === page ? ' aria-current="page"' : "") + ">" + t(n.th, n.en) + "</a>";
    }).join("");
  }

  var headerHTML =
    '<a class="skip" href="#main">' + t("ข้ามไปยังเนื้อหา", "Skip to content") + "</a>" +
    '<div class="progress" aria-hidden="true"><span></span></div>' +
    '<header class="site-header" id="siteHeader"><div class="hdr">' +
      '<a class="brand" href="index.html" aria-label="TG Oversea Solutions">' +
        '<span class="brand-chip"><img src="assets/img/tg-mark.png" alt="" width="40" height="37"></span>' +
        '<span class="brand-txt"><b>TG Oversea Solutions</b><small>' + t("บริษัทจัดหางาน ทีจี โอเวอร์ซี โซลูชั่น จำกัด", "Recruitment Co., Ltd.") + "</small></span>" +
      "</a>" +
      '<nav class="nav" aria-label="Main">' + navLinks() + "</nav>" +
      '<div class="hdr-actions">' +
        '<div class="lang" role="group" aria-label="Language / ภาษา"><span class="lang-pill" aria-hidden="true"></span>' +
          '<button type="button" data-set-lang="th" lang="th" aria-label="ภาษาไทย">TH</button>' +
          '<button type="button" data-set-lang="en" lang="en" aria-label="English">EN</button>' +
        "</div>" +
        '<a class="btn btn-gold btn-sm magnetic" href="contact.html?type=worker">' + t("สมัครงาน", "Apply now") + "</a>" +
        '<button class="burger" type="button" aria-expanded="false" aria-controls="mnav"><span></span><span></span><b class="sr" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Menu</b></button>' +
      "</div>" +
    "</div></header>" +
    '<div class="mnav" id="mnav" aria-hidden="true">' +
      '<nav class="mnav-links" aria-label="Mobile">' + navLinks() + "</nav>" +
      '<div class="mnav-foot">' +
        '<a href="tel:' + CO.tel + '">' + icon("phone") + CO.phone + "</a>" +
        '<a href="mailto:' + CO.email + '">' + icon("mail") + CO.email + "</a>" +
        "<span>" + t("ใบอนุญาตจัดหางานเลขที่ " + CO.license, "Recruitment licence no. " + CO.licenseEn) + "</span>" +
      "</div>" +
    "</div>" +
    '<div class="curtain" aria-hidden="true"><div class="curtain-gold"></div><div class="curtain-navy"><span class="curtain-mark"><img src="assets/img/tg-mark.png" alt="" width="74" height="69"></span></div></div>' +
    '<div class="preloader" aria-hidden="true"><div class="pl-stage">' +
      '<div class="pl-globe"><svg viewBox="-140 -140 280 280">' +
        '<defs><linearGradient id="plg" x1="0" x2="1"><stop offset="0" stop-color="#9a7429"/><stop offset=".45" stop-color="#f0d48a"/><stop offset="1" stop-color="#a57d2e"/></linearGradient></defs>' +
        '<circle class="g" r="100"/><ellipse class="g" rx="45" ry="100"/><ellipse class="g" rx="85" ry="100"/><path class="g" d="M-100 0H100M-88 -48H88M-88 48H88"/><path class="g" d="M0 -100V100"/>' +
        '<ellipse class="orb" rx="132" ry="44" transform="rotate(-18)"/>' +
      "</svg><div class=\"pl-mark\"><img src=\"assets/img/tg-mark.png\" alt=\"\" width=\"112\" height=\"105\"></div></div>" +
      '<div class="pl-meta"><span class="pl-count">0</span><span>TG Oversea Solutions</span></div>' +
    '</div><div class="pl-bar"></div></div>' +
    '<div class="cursor" aria-hidden="true"><span class="c-ring"></span><span class="c-dot"></span></div>' +
    '<div class="fab" id="fab">' +
      '<div class="fab-menu" id="fabMenu">' +
        '<a href="' + CO.facebook + '" target="_blank" rel="noopener">' + icon("facebook") + "Facebook</a>" +
        '<a href="mailto:' + CO.email + '">' + icon("mail") + t("ส่งอีเมล", "Email us") + "</a>" +
        '<a href="tel:' + CO.tel + '">' + icon("phone") + t("โทร ", "Call ") + CO.phone + "</a>" +
      "</div>" +
      '<button class="fab-btn" type="button" aria-expanded="false" aria-controls="fabMenu" aria-label="Contact / ติดต่อ">' + icon("chat") + icon("x") + "</button>" +
    "</div>";

  document.currentScript.insertAdjacentHTML("beforebegin", headerHTML);

  /* ---------- Footer ---------- */
  function footerHTML() {
    return '<footer class="footer">' +
      (page !== "contact" ?
      '<div class="ft-cta"><div class="ft-cta-glow"></div><div class="ft-cta-ring"></div><div class="container" style="position:relative">' +
        '<h2 class="h2" data-split>' + t("ก้าวแรกสู่<span class=\"nw\">งานต่างประเทศ</span><br>เริ่มได้ด้วยการคุยกับเรา", "Your next role abroad<br>starts with one conversation") + "</h2>" +
        '<p class="lead" data-reveal>' + t("ปรึกษาฟรี ไม่มีข้อผูกมัด เจ้าหน้าที่จะอธิบายตำแหน่ง ค่าใช้จ่าย และขั้นตอนทั้งหมดให้ชัดเจนก่อนคุณตัดสินใจ", "Free, no-obligation advice. We explain the role, the costs and every step clearly before you decide.") + "</p>" +
        '<div class="btn-row" data-reveal style="--d:120ms">' +
          '<a class="btn btn-gold magnetic" href="contact.html?type=worker">' + t("สมัครงานต่างประเทศ", "Apply for work abroad") + icon("arrow") + "</a>" +
          '<a class="btn btn-ghost magnetic" href="tel:' + CO.tel + '">' + icon("phone") + CO.phone + "</a>" +
        "</div>" +
      "</div></div>" : "") +
      '<div class="container">' +
        '<div class="ft-grid">' +
          '<div class="ft-brand">' +
            '<span class="brand-chip"><img src="assets/img/tg-mark.png" alt="TG" width="50" height="47"></span>' +
            "<div><b style=\"font-size:18px\">TG Oversea Solutions Recruitment Co., Ltd.</b><p style=\"margin-top:6px\">" + t("บริษัทจัดหางาน ทีจี โอเวอร์ซี โซลูชั่น จำกัด — ผู้เชี่ยวชาญด้านการจัดหางานและส่งแรงงานไทยไปทำงานต่างประเทศอย่างถูกกฎหมาย", "Licensed international recruitment and workforce solutions, placing Thai workers abroad the legal way.") + "</p></div>" +
          "</div>" +
          '<div class="ft-col"><h4>' + t("เมนู", "Explore") + "</h4><ul>" +
            NAV.map(function (n) { return '<li><a href="' + n.href + '">' + t(n.th, n.en) + "</a></li>"; }).join("") +
          "</ul></div>" +
          '<div class="ft-col"><h4>' + t("ติดต่อ", "Contact") + "</h4><ul>" +
            "<li>" + icon("phone") + '<a href="tel:' + CO.tel + '">' + CO.phone + "</a></li>" +
            "<li>" + icon("mail") + '<a href="mailto:' + CO.email + '">' + CO.email + "</a></li>" +
            "<li>" + icon("facebook") + '<a href="' + CO.facebook + '" target="_blank" rel="noopener">Facebook</a></li>' +
            "<li>" + icon("pin") + "<span>" + t("91/144 หมู่ 9 ต.คลองหนึ่ง อ.คลองหลวง จ.ปทุมธานี 12120", "91/144 Moo 9, Khlong Nueng, Khlong Luang, Pathum Thani 12120, Thailand") + "</span></li>" +
          "</ul></div>" +
          '<div class="ft-col"><h4>' + t("ใบอนุญาต", "Licence") + '</h4><div class="ft-license">' +
            "<small>" + t("ใบอนุญาตจัดหางานไปทำงานต่างประเทศ", "Overseas recruitment licence") + "</small>" +
            "<b>" + t(CO.license, CO.licenseEn) + "</b>" +
            "<small>" + t("กรมการจัดหางาน กระทรวงแรงงาน", "Department of Employment, Ministry of Labour") + "</small>" +
            '<a href="https://www.doe.go.th/" target="_blank" rel="noopener">' + t("ตรวจสอบกับกรมการจัดหางาน", "Verify with the DOE") + icon("arrowUR") + "</a>" +
          "</div></div>" +
        "</div>" +
      "</div>" +
      '<div class="ft-word" aria-hidden="true"><span>TG OVERSEA</span></div>' +
      '<div class="ft-bottom"><div class="container" style="display:flex;justify-content:space-between;gap:12px 30px;flex-wrap:wrap">' +
        "<span>© <span data-year>2026</span> TG Oversea Solutions Recruitment Co., Ltd. " + t("สงวนลิขสิทธิ์", "All rights reserved.") + "</span>" +
        "<span>" + t("สายด่วนกรมการจัดหางาน 1694", "Department of Employment hotline: 1694") + "</span>" +
      "</div></div>" +
    "</footer>";
  }

  /* ---------- Language ---------- */
  function applyLangAttrs(lang) {
    document.querySelectorAll("[data-th-ph]").forEach(function (el) {
      el.setAttribute("placeholder", el.getAttribute("data-" + lang + "-ph"));
    });
    document.querySelectorAll("[data-th-aria]").forEach(function (el) {
      el.setAttribute("aria-label", el.getAttribute("data-" + lang + "-aria"));
    });
    document.querySelectorAll("option[data-th]").forEach(function (el) {
      el.textContent = el.getAttribute("data-" + lang);
    });
    var tt = body.getAttribute("data-title-" + lang);
    if (tt) document.title = tt;
    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-set-lang") === lang));
    });
  }
  function setLang(lang, origin) {
    if (lang === html.getAttribute("data-lang")) return;
    var apply = function () {
      html.setAttribute("data-lang", lang);
      html.setAttribute("lang", lang);
      try { localStorage.setItem("tg-lang", lang); } catch (e) {}
      applyLangAttrs(lang);
      window.dispatchEvent(new CustomEvent("tg:lang", { detail: lang }));
    };
    if (!document.startViewTransition || reduced) { apply(); return; }
    var x = origin ? origin.x : innerWidth - 120, y = origin ? origin.y : 40;
    var r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    var vt = document.startViewTransition(apply);
    vt.ready.then(function () {
      html.animate(
        { clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + r + "px at " + x + "px " + y + "px)"] },
        { duration: 850, easing: "cubic-bezier(.7,0,.2,1)", pseudoElement: "::view-transition-new(root)" }
      );
    }).catch(function () {});
  }

  /* ---------- Page transitions ---------- */
  function isInternal(a) {
    if (!a || a.target === "_blank" || a.hasAttribute("download")) return false;
    var href = a.getAttribute("href") || "";
    if (!href || href.charAt(0) === "#" || /^(mailto:|tel:|javascript:)/i.test(href)) return false;
    var u = new URL(a.href, location.href);
    if (u.origin !== location.origin && location.protocol !== "file:") return false;
    if (location.protocol === "file:" && u.protocol !== "file:") return false;
    if (u.pathname === location.pathname && u.search === location.search && u.hash) return false;
    return /\.html$|\/$/.test(u.pathname);
  }
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest("a");
    if (!isInternal(a)) return;
    e.preventDefault();
    var go = function () { location.href = a.href; };
    if (reduced) { go(); return; }
    try { sessionStorage.setItem("tg-curtain", "1"); } catch (err) {}
    html.classList.remove("curtain-out", "curtain-on", "menu-open");
    void html.offsetWidth;
    html.classList.add("is-leaving");
    setTimeout(go, 820);
  });
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) { html.classList.remove("is-leaving", "curtain-on", "menu-open"); html.classList.remove("curtain-out"); }
  });

  /* ---------- Ready sequence: preloader or curtain, then "tg:ready" ---------- */
  var readyFired = false;
  function fireReady() {
    if (readyFired) return;
    readyFired = true;
    html.classList.add("is-ready");
    window.dispatchEvent(new CustomEvent("tg:ready"));
  }
  window.TG_whenReady = function (fn) { if (readyFired) fn(); else window.addEventListener("tg:ready", fn, { once: true }); };

  function runPreloader() {
    var count = document.querySelector(".pl-count");
    var bar = document.querySelector(".pl-bar");
    var start = performance.now(), min = reduced ? 0 : 2300, loaded = document.readyState === "complete";
    window.addEventListener("load", function () { loaded = true; });
    (function tick(now) {
      var p = Math.min((now - start) / min, loaded ? 1 : .9);
      var eased = 1 - Math.pow(1 - p, 3);
      count.textContent = Math.round(eased * 100);
      bar.style.setProperty("--p", eased);
      if (p < 1) { requestAnimationFrame(tick); return; }
      try { sessionStorage.setItem("tg-visited", "1"); } catch (e) {}
      html.classList.add("preload-done");
      setTimeout(fireReady, 350);
      setTimeout(function () { html.classList.remove("preload", "preload-done"); }, 1100);
    })(start);
  }
  function runCurtainOut() {
    var fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    Promise.race([fonts, new Promise(function (r) { setTimeout(r, 900); })]).then(function () {
      html.classList.add("curtain-out");
      html.classList.remove("curtain-on");
      setTimeout(fireReady, 250);
      setTimeout(function () { html.classList.remove("curtain-out"); }, 1100);
    });
  }

  /* ---------- Boot after DOM ---------- */
  function boot() {
    var slot = document.querySelector("[data-footer]");
    if (slot) slot.outerHTML = footerHTML();
    hydrateIcons();
    applyLangAttrs(html.getAttribute("data-lang") || "th");
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.addEventListener("click", function (e) {
        var r = b.getBoundingClientRect();
        setLang(b.getAttribute("data-set-lang"), { x: e.clientX || r.left + r.width / 2, y: e.clientY || r.top + r.height / 2 });
      });
    });

    // Header states
    var lastY = scrollY, hdr = document.getElementById("siteHeader"), prog = document.querySelector(".progress span");
    function onScroll() {
      var y = scrollY;
      html.classList.toggle("is-scrolled", y > 40);
      html.classList.toggle("is-hidden", y > 420 && y > lastY + 2 && !html.classList.contains("menu-open"));
      if (y < lastY - 2) html.classList.remove("is-hidden");
      lastY = y;
      var max = document.documentElement.scrollHeight - innerHeight;
      if (prog) prog.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    }
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Mobile menu
    var burger = document.querySelector(".burger"), mnav = document.getElementById("mnav");
    function setMenu(open) {
      html.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", String(open));
      mnav.setAttribute("aria-hidden", String(!open));
      if (window.TG_lenis) open ? window.TG_lenis.stop() : window.TG_lenis.start();
      else body.style.overflow = open ? "hidden" : "";
    }
    burger.addEventListener("click", function () { setMenu(!html.classList.contains("menu-open")); });
    addEventListener("keydown", function (e) { if (e.key === "Escape" && html.classList.contains("menu-open")) setMenu(false); });

    // FAB
    var fab = document.getElementById("fab"), fabBtn = fab.querySelector(".fab-btn");
    fabBtn.addEventListener("click", function () {
      var open = !fab.classList.contains("open");
      fab.classList.toggle("open", open);
      fabBtn.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", function (e) { if (!fab.contains(e.target)) { fab.classList.remove("open"); fabBtn.setAttribute("aria-expanded", "false"); } });

    window.TG_booted = true;
    window.dispatchEvent(new CustomEvent("tg:layout"));

    if (html.classList.contains("preload")) runPreloader();
    else if (html.classList.contains("curtain-on")) runCurtainOut();
    else { try { sessionStorage.setItem("tg-visited", "1"); } catch (e) {} setTimeout(fireReady, 60); }
  }

  window.TG = { icon: icon, hydrateIcons: hydrateIcons, t: t, setLang: setLang, CO: CO, reduced: reduced };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
