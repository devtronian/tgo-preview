/* ==========================================================================
   TG Oversea Solutions — page interactions
   Requires layout.js (window.TG). GSAP/ScrollTrigger/Lenis are optional:
   everything degrades to native scrolling and CSS transitions without them.
   ========================================================================== */
(function () {
  "use strict";
  var TG = window.TG;
  var html = document.documentElement;
  var reduced = TG.reduced;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function lang() { return html.getAttribute("data-lang") === "en" ? "en" : "th"; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function init() {
    TG.hydrateIcons();

    /* ---------- Smooth scroll + GSAP ---------- */
    var hasGsap = !!(window.gsap && window.ScrollTrigger);
    if (hasGsap) gsap.registerPlugin(ScrollTrigger);
    var lenis = null;
    if (window.Lenis && !reduced) {
      lenis = new Lenis({ duration: 1.15, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); } });
      window.TG_lenis = lenis;
      if (hasGsap) {
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
        gsap.ticker.lagSmoothing(0);
      } else {
        (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
      }
      if (html.classList.contains("preload")) lenis.stop();
      $$('a[href^="#"]').forEach(function (a) {
        a.addEventListener("click", function (e) {
          var id = a.getAttribute("href");
          if (id.length < 2) return;
          var el = document.getElementById(id.slice(1));
          if (!el) return;
          e.preventDefault();
          lenis.scrollTo(el, { offset: -90 });
          if (id === "#main") el.focus({ preventScroll: true });
        });
      });
    }

    /* ---------- Split headings into words (Thai-aware) ---------- */
    var seg = window.Intl && Intl.Segmenter ? {
      th: new Intl.Segmenter("th", { granularity: "word" }),
      en: new Intl.Segmenter("en", { granularity: "word" })
    } : null;
    function splitEl(el) {
      var i = 0;
      (function walk(node, lg) {
        Array.prototype.slice.call(node.childNodes).forEach(function (ch) {
          if (ch.nodeType === 3) {
            var text = ch.nodeValue;
            if (!text.trim()) return;
            var parts = seg ? Array.from(seg[lg].segment(text), function (s) { return s.segment; }) : text.split(/(\s+)/);
            // glue punctuation to the previous word so it never wraps alone
            var merged = [];
            parts.forEach(function (p) {
              if (merged.length && /^[,.!?;:)\]”"'’ๆฯ]+$/.test(p)) merged[merged.length - 1] += p;
              else merged.push(p);
            });
            var frag = document.createDocumentFragment();
            merged.forEach(function (p) {
              if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
              var w = document.createElement("span"); w.className = "w";
              var wi = document.createElement("span"); wi.className = "wi";
              wi.style.setProperty("--i", Math.min(i++, 22));
              wi.textContent = p;
              w.appendChild(wi); frag.appendChild(w);
            });
            ch.parentNode.replaceChild(frag, ch);
          } else if (ch.nodeType === 1 && ch.tagName !== "BR" && !ch.classList.contains("w")) {
            var l2 = ch.getAttribute("data-l");
            if (l2) i = 0;
            walk(ch, l2 || lg);
          }
        });
      })(el, (el.closest("[data-l]") && el.closest("[data-l]").getAttribute("data-l")) || lang());
    }
    if (!reduced) $$("[data-split]").forEach(splitEl);

    /* ---------- Counters ---------- */
    function countUp(el) {
      var to = parseFloat(el.getAttribute("data-count")), dur = 1600, t0 = performance.now();
      if (reduced) { el.textContent = to; return; }
      (function step(now) {
        var p = clamp((now - t0) / dur, 0, 1), e = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(to * e);
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    }

    /* ---------- Reveal on scroll ---------- */
    function startReveals() {
      if (!("IntersectionObserver" in window)) {
        $$("[data-reveal],[data-stagger],[data-split],.tl-item,.route").forEach(function (el) { el.classList.add("in"); });
        $$("[data-count]").forEach(countUp);
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          if (e.target.hasAttribute("data-count")) countUp(e.target);
          io.unobserve(e.target);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
      $$("[data-reveal],[data-stagger],[data-split],.tl-item,.route,[data-count]").forEach(function (el) { io.observe(el); });
    }

    window.TG_whenReady(function () {
      var hero = $(".hero");
      if (hero) hero.classList.add("go");
      if (lenis) lenis.start();
      startReveals();
      if (hasGsap) setTimeout(function () { ScrollTrigger.refresh(); }, 200);
      var target = location.hash && document.getElementById(location.hash.slice(1));
      if (target) setTimeout(function () {
        if (lenis) lenis.scrollTo(target, { offset: -90, immediate: true });
        else target.scrollIntoView();
      }, 260);
    });
    window.addEventListener("load", function () { if (hasGsap) ScrollTrigger.refresh(); });

    /* ---------- Cursor + magnetic ---------- */
    if (finePointer && !reduced) {
      html.classList.add("has-cursor");
      var cur = $(".cursor"), dot = $(".c-dot"), ring = $(".c-ring");
      var mx = -100, my = -100, rx = -100, ry = -100;
      addEventListener("pointermove", function (e) { mx = e.clientX; my = e.clientY; dot.style.transform = "translate3d(" + mx + "px," + my + "px,0)"; }, { passive: true });
      (function loop() {
        rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
        ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
        requestAnimationFrame(loop);
      })();
      document.addEventListener("pointerover", function (e) {
        cur.classList.toggle("is-hover", !!e.target.closest("a, button, summary, label, select, [data-cursor]"));
      });
      addEventListener("pointerdown", function () { cur.classList.add("is-down"); });
      addEventListener("pointerup", function () { cur.classList.remove("is-down"); });

      $$(".magnetic").forEach(function (el) {
        el.addEventListener("pointermove", function (e) {
          var r = el.getBoundingClientRect();
          var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
          el.style.transform = "translate(" + dx * 0.22 + "px," + dy * 0.32 + "px)";
        });
        el.addEventListener("pointerleave", function () { el.style.transform = ""; });
      });

      // spotlight cards
      $$(".strength, .link, .dest").forEach(function (el) {
        el.addEventListener("pointermove", function (e) {
          var r = el.getBoundingClientRect();
          el.style.setProperty("--mx", e.clientX - r.left + "px");
          el.style.setProperty("--my", e.clientY - r.top + "px");
        });
      });

      // 3D tilt
      $$("[data-tilt]").forEach(function (el) {
        el.addEventListener("pointermove", function (e) {
          var r = el.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
          el.style.transform = "perspective(900px) rotateY(" + px * 8 + "deg) rotateX(" + -py * 8 + "deg) translateY(-6px)";
        });
        el.addEventListener("pointerleave", function () { el.style.transform = ""; });
      });

      // footer wordmark light
      var word = $(".ft-word");
      if (word) word.addEventListener("pointermove", function (e) {
        var r = word.getBoundingClientRect();
        word.style.setProperty("--sx", ((e.clientX - r.left) / r.width) * 140 - 20 + "%");
      });
    }

    /* ---------- Scroll-linked bits (no GSAP needed) ---------- */
    var scrollers = [];
    function onFrame() { scrollers.forEach(function (fn) { fn(); }); }
    var ticking = false;
    addEventListener("scroll", function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () { ticking = false; onFrame(); });
    }, { passive: true });
    addEventListener("resize", onFrame);

    // timeline fill (about)
    $$(".timeline").forEach(function (tl) {
      scrollers.push(function () {
        var r = tl.getBoundingClientRect(), mid = innerHeight * 0.6;
        tl.style.setProperty("--tl", clamp((mid - r.top) / r.height, 0, 1));
      });
    });

    // journey path (process)
    $$(".jsteps").forEach(function (js) {
      var steps = $$(".jstep", js);
      scrollers.push(function () {
        if (!js.offsetParent) return;
        var r = js.getBoundingClientRect(), mid = innerHeight * 0.55;
        js.style.setProperty("--jp", clamp((mid - r.top) / r.height, 0, 1));
        steps.forEach(function (s) {
          var sr = s.getBoundingClientRect();
          s.classList.toggle("reached", sr.top + sr.height / 2 < mid);
        });
      });
    });

    // parallax
    $$("[data-speed]").forEach(function (el) {
      var sp = parseFloat(el.getAttribute("data-speed"));
      if (reduced) return;
      scrollers.push(function () {
        var r = el.getBoundingClientRect();
        var c = r.top + r.height / 2 - innerHeight / 2;
        el.style.setProperty("--py", (c * sp).toFixed(1) + "px");
      });
    });
    onFrame();

    /* ---------- Departure board ---------- */
    var board = $("[data-board]");
    if (board) {
      var ROUTES = [
        { code: "RUH", th: "ริยาด", en: "RIYADH", s: { th: "นวดแผนไทยและสปา", en: "Thai massage & spa" }, ic: "lotus" },
        { code: "SYD", th: "ซิดนีย์", en: "SYDNEY", s: { th: "ช่างฝีมือและช่างเทคนิค", en: "Skilled & technical trades" }, ic: "wrench" },
        { code: "MCT", th: "มัสกัต", en: "MUSCAT", s: { th: "นวดแผนไทยและสปา", en: "Thai massage & spa" }, ic: "lotus" },
        { code: "AKL", th: "โอ๊คแลนด์", en: "AUCKLAND", s: { th: "เกษตรและฟาร์ม", en: "Agriculture & farming" }, ic: "sprout" },
        { code: "DXB", th: "ดูไบ", en: "DUBAI", s: { th: "งานบริการ สปา และครัว", en: "Hospitality, spa & kitchen" }, ic: "chef" },
        { code: "KWI", th: "คูเวต", en: "KUWAIT", s: { th: "ผู้เชี่ยวชาญสปา", en: "Spa specialists" }, ic: "lotus" },
        { code: "PER", th: "เพิร์ท", en: "PERTH", s: { th: "เกษตรและเรือนกระจก", en: "Agriculture & greenhouse" }, ic: "sprout" },
        { code: "ASIA", th: "เอเชีย", en: "ASIA", s: { th: "โรงงานและอุตสาหกรรม", en: "Manufacturing" }, ic: "factory" }
      ];
      var CH = { en: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", th: "กขคงจฉชซญดตถทธนบปผพฟมยรลวสหอฮ" };
      var CITY = 9, CODE = 4, ROWS = 3, idx = 0;
      var gseg = window.Intl && Intl.Segmenter ? new Intl.Segmenter("th", { granularity: "grapheme" }) : null;
      function graphemes(s) { return gseg ? Array.from(gseg.segment(s), function (x) { return x.segment; }) : Array.from(s); }
      var rowsEl = $(".board-rows", board);
      var rows = [];
      for (var r = 0; r < ROWS; r++) {
        var row = document.createElement("div"); row.className = "b-row";
        var code = document.createElement("div"); code.className = "b-cells b-code";
        var city = document.createElement("div"); city.className = "b-cells b-city";
        for (var c1 = 0; c1 < CODE; c1++) { var cc = document.createElement("span"); cc.className = "b-cell"; cc.textContent = " "; code.appendChild(cc); }
        for (var c2 = 0; c2 < CITY; c2++) { var ci = document.createElement("span"); ci.className = "b-cell"; ci.textContent = " "; city.appendChild(ci); }
        var sec = document.createElement("div"); sec.className = "b-sector";
        row.appendChild(code); row.appendChild(city); row.appendChild(sec);
        rowsEl.appendChild(row);
        rows.push({ code: code.children, city: city.children, sec: sec });
      }
      function flipCell(cell, target, delay, set) {
        var tok = cell._tok = (cell._tok || 0) + 1;
        if (reduced) { cell.textContent = target; return; }
        var n = target === " " && cell.textContent === " " ? 0 : 3 + ((Math.random() * 5) | 0);
        setTimeout(function () {
          (function step() {
            if (cell._tok !== tok) return;
            cell.classList.remove("flip"); void cell.offsetWidth; cell.classList.add("flip");
            if (n-- > 0) { cell.textContent = set.charAt((Math.random() * set.length) | 0); setTimeout(step, 70); }
            else cell.textContent = target;
          })();
        }, delay);
      }
      function setRow(row, route, delay) {
        var lg = lang(), set = CH[lg];
        var cg = route.code.split(""); while (cg.length < CODE) cg.push(" ");
        var tg = graphemes(route[lg]).slice(0, CITY); while (tg.length < CITY) tg.push(" ");
        for (var i = 0; i < CODE; i++) flipCell(row.code[i], cg[i], delay + i * 40, CH.en);
        for (var j = 0; j < CITY; j++) flipCell(row.city[j], tg[j], delay + 120 + j * 45, set);
        row.sec.style.opacity = 0;
        var stok = row.sec._tok = (row.sec._tok || 0) + 1;
        setTimeout(function () {
          if (row.sec._tok !== stok) return;
          row.sec.innerHTML = TG.icon(route.ic) + "<span>" + route.s[lg] + "</span>";
          row.sec.style.transition = "opacity .5s";
          row.sec.style.opacity = 1;
        }, delay + 500);
      }
      function render() {
        rows.forEach(function (row, k) { setRow(row, ROUTES[(idx + k) % ROUTES.length], k * 220); });
      }
      var started = false;
      window.TG_whenReady(function () {
        started = true; render();
        if (!reduced) setInterval(function () { if (document.hidden) return; idx = (idx + ROWS) % ROUTES.length; render(); }, 6000);
      });
      addEventListener("tg:lang", function () { if (started) render(); });
      var clock = $(".board-time", board);
      if (clock) {
        var fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Bangkok", hour: "2-digit", minute: "2-digit" });
        var tick = function () { clock.textContent = "BKK " + fmt.format(new Date()); };
        tick(); setInterval(tick, 15000);
      }
    }

    /* ---------- Sector switcher ---------- */
    $$("[data-sectors]").forEach(function (wrap) {
      var btns = $$(".sector-btn", wrap), panels = $$(".sector-panel", wrap);
      function activate(i) {
        btns.forEach(function (b, k) { b.setAttribute("aria-selected", String(k === i)); b.tabIndex = k === i ? 0 : -1; });
        panels.forEach(function (p, k) {
          if (k === i) { p.classList.remove("off"); p.classList.add("on"); p.removeAttribute("aria-hidden"); }
          else if (p.classList.contains("on")) {
            p.classList.remove("on"); p.classList.add("off"); p.setAttribute("aria-hidden", "true");
            setTimeout(function () { if (!p.classList.contains("on")) p.classList.remove("off"); }, 1000);
          } else p.setAttribute("aria-hidden", "true");
        });
      }
      btns.forEach(function (b, i) {
        b.addEventListener("click", function () { activate(i); });
        if (finePointer) b.addEventListener("mouseenter", function () { if (b.getAttribute("aria-selected") !== "true") activate(i); });
        b.addEventListener("keydown", function (e) {
          var n = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
          if (!n) return; e.preventDefault();
          var k = (i + n + btns.length) % btns.length; activate(k); btns[k].focus();
        });
      });
      activate(0);
    });

    /* ---------- Destinations: pinned horizontal scroll ---------- */
    var passWrap = $(".passes-wrap");
    if (passWrap) {
      var track = $(".passes-track", passWrap), bar = $(".passes-progress span", passWrap);
      var pinned = false;
      if (hasGsap && !reduced) {
        var mm = gsap.matchMedia();
        mm.add("(min-width: 961px)", function () {
          pinned = true;
          var dist = function () { return Math.max(0, track.scrollWidth - innerWidth); };
          gsap.to(track, {
            x: function () { return -dist(); }, ease: "none",
            scrollTrigger: {
              trigger: $(".passes-pin", passWrap), start: "top top", end: function () { return "+=" + dist(); },
              pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
              onUpdate: function (self) { if (bar) bar.style.transform = "scaleX(" + self.progress + ")"; }
            }
          });
          return function () { pinned = false; };
        });
      }
      if (!pinned) { track.style.overflowX = "auto"; track.style.width = "auto"; track.style.scrollSnapType = "x mandatory"; }
    }

    /* ---------- Segmented toggles ---------- */
    $$(".seg").forEach(function (segEl) {
      var btns = $$("button", segEl), pill = $(".seg-pill", segEl);
      function move(b) {
        if (!pill) return;
        pill.style.width = b.offsetWidth + "px";
        pill.style.transform = "translateX(" + (b.offsetLeft - 6) + "px)";
      }
      function select(b, silent) {
        btns.forEach(function (x) {
          var on = x === b;
          x.setAttribute("aria-selected", String(on));
          var p = x.getAttribute("aria-controls") && document.getElementById(x.getAttribute("aria-controls"));
          if (p) p.hidden = !on;
        });
        move(b);
        if (!silent) segEl.dispatchEvent(new CustomEvent("seg:change", { detail: b.getAttribute("data-value") }));
        onFrame();
      }
      btns.forEach(function (b) { b.addEventListener("click", function () { select(b); }); });
      segEl.TG_select = function (v) { var b = btns.filter(function (x) { return x.getAttribute("data-value") === v; })[0]; if (b) select(b); };
      var cur = btns.filter(function (x) { return x.getAttribute("aria-selected") === "true"; })[0] || btns[0];
      select(cur, true);
      addEventListener("resize", function () { move(btns.filter(function (x) { return x.getAttribute("aria-selected") === "true"; })[0]); });
      addEventListener("tg:lang", function () { setTimeout(function () { move(btns.filter(function (x) { return x.getAttribute("aria-selected") === "true"; })[0]); }, 30); });
      if (document.fonts) document.fonts.ready.then(function () { move(btns.filter(function (x) { return x.getAttribute("aria-selected") === "true"; })[0]); });
    });

    /* ---------- Testimonials ---------- */
    var vs = $(".voices");
    if (vs) {
      var voices = $$(".voice", vs), dotsEl = $(".voice-dots", vs), vi = 0, timer = null;
      voices.forEach(function () { dotsEl.appendChild(document.createElement("i")); });
      var dots = $$("i", dotsEl);
      function show(i) {
        vi = (i + voices.length) % voices.length;
        voices.forEach(function (v, k) { v.classList.toggle("on", k === vi); v.setAttribute("aria-hidden", String(k !== vi)); });
        dots.forEach(function (d, k) { d.classList.remove("on"); if (k === vi) { void d.offsetWidth; d.classList.add("on"); } });
        clearTimeout(timer);
        if (!reduced) timer = setTimeout(function () { show(vi + 1); }, 7000);
      }
      $(".voice-nav .prev", vs).addEventListener("click", function () { show(vi - 1); });
      $(".voice-nav .next", vs).addEventListener("click", function () { show(vi + 1); });
      show(0);
    }

    /* ---------- Documents checklist ---------- */
    var docGrid = $(".doc-grid");
    if (docGrid) {
      var boxes = $$("input", docGrid), meterBar = $(".doc-meter i"), meterTxt = $(".doc-meter b");
      var upd = function () {
        var n = boxes.filter(function (b) { return b.checked; }).length;
        if (meterBar) meterBar.style.width = (n / boxes.length * 100) + "%";
        if (meterTxt) meterTxt.textContent = n + "/" + boxes.length;
      };
      boxes.forEach(function (b) { b.addEventListener("change", upd); });
      upd();
    }

    /* ---------- Job board ---------- */
    var jobsEl = $("[data-jobs]");
    if (jobsEl && window.TG_JOBS) {
      var fSector = "all", fCountry = "all";
      var chipsEl = $("[data-job-chips]"), countrySel = $("[data-job-country]"), countEl = $("[data-job-count]");
      function renderJobs() {
        var lg = lang();
        var list = window.TG_JOBS.filter(function (j) {
          return (fSector === "all" || j.sector === fSector) && (fCountry === "all" || j.country === fCountry);
        });
        if (countEl) countEl.textContent = list.length;
        if (!list.length) {
          jobsEl.innerHTML = '<div class="jobs-empty">' + TG.t("ยังไม่มีตำแหน่งที่ตรงกับตัวกรองนี้ ลองเปลี่ยนสายงานหรือประเทศ หรือฝากประวัติไว้กับเรา แล้วเจ้าหน้าที่จะติดต่อกลับเมื่อมีตำแหน่งที่เหมาะสม", "No roles match these filters yet. Try another sector or country, or leave your details and we'll contact you when a suitable role opens.") + '<div style="margin-top:20px"><a class="btn btn-navy btn-sm" href="contact.html?type=worker">' + TG.t("ฝากประวัติ", "Leave your details") + "</a></div></div>";
          return;
        }
        jobsEl.innerHTML = list.map(function (j, i) {
          var sec = window.TG_SECTORS[j.sector], ct = window.TG_COUNTRIES[j.country];
          return '<article class="job enter" style="--i:' + i + '">' +
            '<div class="job-top"><span class="job-ic">' + TG.icon(sec.icon) + "</span>" +
            '<div class="job-place"><b>' + j.city[lg] + "</b>" + (j.city[lg] !== ct[lg] ? ct[lg] : "") + "</div></div>" +
            "<h3>" + j.title[lg] + "</h3>" +
            "<ul>" + j.req[lg].map(function (r) { return "<li>" + TG.icon("check") + "<span>" + r + "</span></li>"; }).join("") + "</ul>" +
            '<div class="job-foot"><span class="job-tag">' + sec[lg] + "</span>" +
            '<a class="job-apply" href="contact.html?type=worker&job=' + encodeURIComponent(j.id) + '">' + (lg === "th" ? "สมัครตำแหน่งนี้" : "Apply for this role") + TG.icon("arrow") + "</a></div>" +
          "</article>";
        }).join("");
      }
      if (chipsEl) {
        var chipDefs = [{ k: "all", th: "ทั้งหมด", en: "All sectors" }].concat(Object.keys(window.TG_SECTORS).map(function (k) { return { k: k, th: window.TG_SECTORS[k].th, en: window.TG_SECTORS[k].en }; }));
        chipsEl.innerHTML = chipDefs.map(function (c) { return '<button type="button" class="chip" data-k="' + c.k + '" aria-pressed="' + (c.k === "all") + '">' + TG.t(c.th, c.en) + "</button>"; }).join("");
        chipsEl.addEventListener("click", function (e) {
          var b = e.target.closest(".chip"); if (!b) return;
          fSector = b.getAttribute("data-k");
          $$(".chip", chipsEl).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
          renderJobs();
        });
      }
      if (countrySel) {
        countrySel.innerHTML = '<option value="all" data-th="ทุกประเทศ" data-en="All countries">ทุกประเทศ</option>' +
          Object.keys(window.TG_COUNTRIES).map(function (k) { var c = window.TG_COUNTRIES[k]; return '<option value="' + k + '" data-th="' + c.th + '" data-en="' + c.en + '">' + c[lang()] + "</option>"; }).join("");
        $$("option", countrySel).forEach(function (o) { o.textContent = o.getAttribute("data-" + lang()); });
        countrySel.addEventListener("change", function () { fCountry = countrySel.value; renderJobs(); });
      }
      var qs = new URLSearchParams(location.search);
      if (qs.get("sector") && window.TG_SECTORS[qs.get("sector")]) {
        fSector = qs.get("sector");
        $$(".chip", chipsEl).forEach(function (x) { x.setAttribute("aria-pressed", String(x.getAttribute("data-k") === fSector)); });
      }
      renderJobs();
      addEventListener("tg:lang", renderJobs);
    }

    /* ---------- Contact form ---------- */
    var form = $("[data-contact-form]");
    if (form) {
      var card = form.closest(".form-card"), typeSeg = $(".seg", card), type = "worker";
      var sectorSel = $("[name=sector]", form), countrySel2 = $("[name=country]", form);
      if (sectorSel && window.TG_SECTORS) {
        sectorSel.innerHTML = '<option value="" data-th="ยังไม่แน่ใจ / ให้เจ้าหน้าที่แนะนำ" data-en="Not sure yet / please advise"></option>' +
          Object.keys(window.TG_SECTORS).map(function (k) { var s = window.TG_SECTORS[k]; return '<option value="' + k + '" data-th="' + s.th + '" data-en="' + s.en + '"></option>'; }).join("");
      }
      if (countrySel2 && window.TG_COUNTRIES) {
        countrySel2.innerHTML = '<option value="" data-th="ยังไม่แน่ใจ / ทุกประเทศ" data-en="Not sure yet / any"></option>' +
          Object.keys(window.TG_COUNTRIES).map(function (k) { var c = window.TG_COUNTRIES[k]; return '<option value="' + k + '" data-th="' + c.th + '" data-en="' + c.en + '"></option>'; }).join("");
      }
      $$("option[data-th]", form).forEach(function (o) { o.textContent = o.getAttribute("data-" + lang()); });

      function setType(v) {
        type = v;
        var jlab = $("[data-job-label]", card);
        if (jlab && jlab.getAttribute("data-has-job")) jlab.hidden = v !== "worker";
        $$("[data-for]", form).forEach(function (el) {
          var on = el.getAttribute("data-for") === v;
          el.hidden = !on;
          $$("input,select,textarea", el).forEach(function (x) { x.disabled = !on; });
        });
      }
      if (typeSeg) typeSeg.addEventListener("seg:change", function (e) { setType(e.detail); });

      var q = new URLSearchParams(location.search);
      if (q.get("type") === "employer" && typeSeg) typeSeg.TG_select("employer");
      setType(q.get("type") === "employer" ? "employer" : "worker");
      var job = q.get("job") && window.TG_JOBS && window.TG_JOBS.filter(function (j) { return j.id === q.get("job"); })[0];
      if (job) {
        if (sectorSel) sectorSel.value = job.sector;
        if (countrySel2) countrySel2.value = job.country;
        var msg = $("[name=message]", form);
        if (msg) msg.value = (lang() === "th" ? "สนใจตำแหน่ง: " : "I'm interested in: ") + job.title[lang()] + " (" + job.city[lang()] + ")";
        var jl = $("[data-job-label]", card);
        if (jl) { jl.hidden = type !== "worker"; jl.setAttribute("data-has-job", "1"); $("b", jl).textContent = job.title[lang()] + " — " + job.city[lang()]; }
      }

      function fieldErr(input, on) { var f = input.closest(".field"); if (f) f.classList.toggle("err", on); }
      form.addEventListener("input", function (e) { fieldErr(e.target, false); });
      form.addEventListener("change", function (e) { if (e.target.type === "checkbox" && e.target.closest(".consent")) e.target.closest(".consent").classList.remove("err"); });
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = true, first = null;
        $$("[required]", form).forEach(function (x) {
          if (x.disabled) return;
          if (x.type === "checkbox") {
            var c = x.closest(".consent"); if (c) c.classList.toggle("err", !x.checked);
            if (!x.checked) { ok = false; first = first || x; }
            return;
          }
          var bad = !x.value.trim() || (x.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.value)) || (x.type === "tel" && x.value.replace(/\D/g, "").length < 9);
          fieldErr(x, bad);
          if (bad) { ok = false; first = first || x; }
        });
        if (!ok) { first.focus(); return; }
        var lg = lang(), lines = [], data = new FormData(form);
        var labelOf = function (name) {
          var el = form.querySelector("[name=" + name + "]");
          var l = el && el.closest(".field") && el.closest(".field").querySelector("label [data-l=" + lg + "]");
          return l ? l.textContent : name;
        };
        data.forEach(function (v, k) {
          if (!String(v).trim() || k === "consent") return;
          var el = form.querySelector("[name=" + k + "]"), val = v;
          if (el && el.tagName === "SELECT") val = el.options[el.selectedIndex].textContent;
          lines.push(labelOf(k) + ": " + val);
        });
        var subj = type === "employer"
          ? (lg === "th" ? "[นายจ้าง] ขอรายละเอียดการจัดหาแรงงาน" : "[Employer] Workforce enquiry")
          : (lg === "th" ? "[สมัครงาน] " : "[Job application] ") + (data.get("name") || "");
        location.href = "mailto:" + TG.CO.email + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(lines.join("\n"));
        card.classList.add("sent");
      });
      var again = $("[data-again]", card);
      if (again) again.addEventListener("click", function () { card.classList.remove("sent"); form.reset(); setType(type); });
    }
  }

  if (window.TG_booted) init();
  else window.addEventListener("tg:layout", init, { once: true });
})();
