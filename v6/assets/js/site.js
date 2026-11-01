/* TG Oversea Solutions v6 "Clear Path": display settings, motion and small interactions.
   Progressive enhancement only: every page is complete and indexable without it. */
(function () {
  "use strict";
  var d = document, html = d.documentElement, q = new URLSearchParams(location.search), en = html.lang === "en";
  var mqReduce = matchMedia("(prefers-reduced-motion: reduce)");
  var fine = matchMedia("(pointer: fine)").matches;
  html.classList.add("ok");

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { if (v == null || v === "") localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  };
  var reduced = function () { return html.classList.contains("rm"); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var flipGrab = function (els) { var m = new Map(); els.forEach(function (el) { if (!el.hidden) m.set(el, el.getBoundingClientRect()); }); return m; };
  var flipPlay = function (els, first) {
    var k = 0;
    els.forEach(function (el) {
      if (el.hidden) return;
      var l = el.getBoundingClientRect(), f = first.get(el);
      if (f) {
        var dx = f.left - l.left, dy = f.top - l.top;
        if (dx || dy) el.animate([{ transform: "translate(" + dx + "px," + dy + "px)" }, { transform: "none" }], { duration: 600, easing: "cubic-bezier(.16,1,.3,1)" });
      } else {
        el.animate([{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "none" }], { duration: 550, delay: 45 * k++, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" });
      }
    });
  };

  /* ---------- Display settings: theme, text size, motion ---------- */
  var metas = $$('meta[name="theme-color"]').map(function (m) { return [m, m.getAttribute("content")]; });
  var mqDark = matchMedia("(prefers-color-scheme: dark)");
  /* light or dark as shown: the visitor's pick, or the device setting until they pick */
  var shownTheme = function () { var t = html.getAttribute("data-theme"); return t === "light" || t === "dark" ? t : mqDark.matches ? "dark" : "light"; };
  var markSettings = function () {
    var t = html.getAttribute("data-theme") || "auto", s = html.getAttribute("data-text") || "", on = shownTheme();
    $$("[data-set-theme]").forEach(function (b) { b.setAttribute("aria-checked", String(b.getAttribute("data-set-theme") === on)); });
    $$("[data-set-text]").forEach(function (b) { b.setAttribute("aria-checked", String(b.getAttribute("data-set-text") === s)); });
    var bg = getComputedStyle(d.body).backgroundColor;
    metas.forEach(function (m) { m[0].setAttribute("content", t === "auto" ? m[1] : bg); });
  };
  $$("[data-set-theme]").forEach(function (b) {
    b.addEventListener("click", function () {
      var t = b.getAttribute("data-set-theme");
      var apply = function () { html.setAttribute("data-theme", t); store.set("tg6-theme", t); markSettings(); };
      if (t === shownTheme() || !d.startViewTransition || reduced()) { apply(); return; }
      var r = b.getBoundingClientRect();
      html.style.setProperty("--vx", Math.round(r.left + r.width / 2) + "px");
      html.style.setProperty("--vy", Math.round(r.top + r.height / 2) + "px");
      html.classList.add("vt-theme");
      d.startViewTransition(apply).finished.finally(function () { html.classList.remove("vt-theme"); });
    });
  });
  $$("[data-set-text]").forEach(function (b) {
    b.addEventListener("click", function () {
      var v = b.getAttribute("data-set-text");
      if (v) html.setAttribute("data-text", v); else html.removeAttribute("data-text");
      store.set("tg6-text", v || null);
      markSettings(); measure(); onScroll();
    });
  });
  var motionToggle = d.querySelector("[data-motion-toggle]");
  if (motionToggle) {
    motionToggle.checked = store.get("tg6-motion") === "reduce";
    motionToggle.addEventListener("change", function () {
      store.set("tg6-motion", motionToggle.checked ? "reduce" : null);
      html.classList.toggle("rm", motionToggle.checked || mqReduce.matches);
      measure(); onScroll();
    });
  }
  if (mqDark.addEventListener) mqDark.addEventListener("change", markSettings);
  markSettings();

  /* Skip page transitions when motion is reduced */
  addEventListener("pageswap", function (e) { if (e.viewTransition && reduced()) e.viewTransition.skipTransition(); });

  /* ---------- Language switch keeps your place: adds the section in view as #hash ---------- */
  $$("[data-lang-link]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      if (a.hasAttribute("aria-current")) { e.preventDefault(); return; }
      var id = "";
      if (/^#page-\d+$/.test(location.hash)) id = location.hash.slice(1);   // profile book: keep the open page
      else if (scrollY > 120) $$("section[id]").forEach(function (s) { if (s.getBoundingClientRect().top <= innerHeight * 0.35) id = s.id; });
      a.href = a.getAttribute("href").split(/[?#]/)[0] + location.search + (id && id !== "top" ? "#" + id : "");
    });
  });

  /* ---------- Split headings into phrases ----------
     Thai headings are written with spaces between phrases, so lines only break between phrases. */
  $$("[data-split]").forEach(function (el) {
    var n = 0, walker = d.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (t) {
      if (!t.nodeValue.trim()) return;
      var frag = d.createDocumentFragment();
      t.nodeValue.split(/(\s+)/).forEach(function (p) {
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.appendChild(d.createTextNode(p)); return; }
        var w = d.createElement("span"), i = d.createElement("span");
        w.className = "w"; i.textContent = p; i.style.setProperty("--w", n++); w.appendChild(i); frag.appendChild(w);
      });
      t.parentNode.replaceChild(frag, t);
    });
    el.classList.add("is-split");
  });

  /* ---------- Reveal, count-up and licence-number decode ---------- */
  var countUp = function (el) {
    if (el._done) return; el._done = true;
    var to = +el.getAttribute("data-count");
    if (reduced()) { el.textContent = to; return; }
    var t0 = performance.now(), dur = 1400;
    (function step(now) {
      var k = clamp((now - t0) / dur, 0, 1); k = 1 - Math.pow(1 - k, 4);
      el.textContent = Math.round(to * k);
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  };
  var decode = function (el) {
    if (el._done) return; el._done = true;
    var to = el.getAttribute("data-decode");
    if (reduced()) return;
    var t0 = performance.now(), dur = 1300, digits = "0123456789";
    (function step(now) {
      var k = clamp((now - t0) / dur, 0, 1), fixed = Math.floor(k * to.length), s = "";
      for (var i = 0; i < to.length; i++) s += (i < fixed || !/\d/.test(to[i])) ? to[i] : digits[(Math.random() * 10) | 0];
      el.textContent = s;
      if (k < 1) requestAnimationFrame(step); else el.textContent = to;
    })(t0);
  };
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var t = e.target;
        t.classList.add("in");
        if (t.hasAttribute("data-count")) countUp(t);
        if (t.hasAttribute("data-decode")) setTimeout(function () { decode(t); }, 350);
        io.unobserve(t);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    $$("[data-reveal], [data-split], [data-count], [data-decode]").forEach(function (el) { io.observe(el); });
  } else {
    $$("[data-reveal], [data-split]").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Scroll engine: header, progress fallback, timelines, pinned steps ---------- */
  var hdr = d.querySelector("[data-hdr]");
  var tls = $$("[data-tl]");
  var hs = d.querySelector("[data-hs]"), hsTrack = hs && hs.querySelector(".hs-track"), hsBar = hs && hs.querySelector(".hs-bar"), hsCards = hs ? $$(".hs-card", hs) : [];
  var needProgress = !(window.CSS && CSS.supports("animation-timeline: scroll()"));
  var ticking = false;

  function measure() {
    if (!hs) return;
    var pin = !reduced() && innerWidth > 760 && innerHeight > 560;
    hs.classList.toggle("is-pin", pin);
    if (pin) {
      var last = hsCards[hsCards.length - 1];
      hs._dist = Math.max(0, last.offsetLeft + last.offsetWidth + parseFloat(getComputedStyle(hsTrack).paddingLeft) - innerWidth);
      hs.style.height = (innerHeight + hs._dist) + "px";
    } else {
      hs.style.height = ""; hsTrack.style.removeProperty("--hx");
    }
  }
  var setHs = function (p) {
    hsBar.style.setProperty("--p", p.toFixed(4));
    var on = Math.round(p * (hsCards.length - 1));
    hsCards.forEach(function (c, i) { c.classList.toggle("is-on", i === on); });
  };

  function frame() {
    ticking = false;
    var y = scrollY, vh = innerHeight;
    if (hdr) hdr.classList.toggle("is-stuck", y > 44);
    if (needProgress && hdr) {
      var max = html.scrollHeight - vh;
      hdr.style.setProperty("--sp", max > 0 ? (y / max).toFixed(4) : 0);
    }
    tls.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      var line = vh * 0.62;
      el.style.setProperty("--p", clamp((line - r.top) / r.height, 0, 1).toFixed(4));
      $$(".tl-i", el).forEach(function (li) { li.classList.toggle("is-past", li.getBoundingClientRect().top + 28 < line); });
    });
    if (hs && hs.classList.contains("is-pin")) {
      var r = hs.getBoundingClientRect();
      if (r.bottom > -50 && r.top < vh + 50) {
        var p = clamp(-r.top / Math.max(1, r.height - vh), 0, 1);
        hsTrack.style.setProperty("--hx", (p * hs._dist).toFixed(1));
        setHs(p);
      }
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", function () { measure(); onScroll(); }, { passive: true });
  if (hs) hsTrack.addEventListener("scroll", function () {
    if (hs.classList.contains("is-pin")) return;
    var max = hsTrack.scrollWidth - hsTrack.clientWidth;
    setHs(max > 0 ? hsTrack.scrollLeft / max : 0);
  }, { passive: true });
  measure(); frame();
  /* re-measure when reduced motion or text size changes from anywhere */
  if (window.MutationObserver) new MutationObserver(function () { measure(); onScroll(); }).observe(html, { attributes: true, attributeFilter: ["class", "data-text"] });
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(function () { measure(); frame(); });

  /* ---------- Hero: example progress updates ---------- */
  var trk = d.querySelector("[data-tracker]");
  if (trk) {
    var people = JSON.parse(trk.querySelector("[data-track]").textContent);
    var labels = JSON.parse(trk.getAttribute("data-labels"));
    var lis = $$(".trk-l li", trk), bar = trk.querySelector(".trk-bar i"), shots = $$(".hero-ph img");
    var roleEl = trk.querySelector("[data-t-role]"), whereEl = trk.querySelector("[data-t-where]"), iniEl = trk.querySelector("[data-t-ini]");
    var k = 0, cur = 0, inView = true, timer = 0;
    var setStep = function (at) {
      lis.forEach(function (li, i) {
        var st = i < at ? "done" : i === at ? "now" : "next";
        li.className = "is-" + st;
        li.querySelector(".trk-s").textContent = st === "done" ? (i === lis.length - 1 ? labels.all : labels.done) : st === "now" ? labels.now : "";
      });
      bar.style.setProperty("--v", (at / lis.length).toFixed(3));
    };
    var later = function (fn, ms) { clearTimeout(timer); timer = setTimeout(function () { if (reduced() || d.hidden || !inView) later(fn, 800); else fn(); }, ms); };
    var run = function () { if (cur < people[k].at) { setStep(++cur); later(run, 650); } else later(next, 3400); };
    var next = function () {
      k = (k + 1) % people.length;
      trk.classList.add("is-swap");
      shots.forEach(function (s, i) { s.classList.toggle("is-on", i === k); });
      setTimeout(function () {
        var p = people[k];
        roleEl.textContent = p.role; whereEl.textContent = p.where; iniEl.textContent = p.ini;
        cur = 0; setStep(0);
        trk.classList.remove("is-swap");
        later(run, 700);
      }, 380);
    };
    addEventListener("load", function () { shots.forEach(function (s) { s.loading = "eager"; }); });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { inView = es[0].isIntersecting; }).observe(trk);
    if (!reduced()) { cur = 0; setStep(0); later(run, 1300); }
  }

  /* ---------- Hero picker (home): which animated visual sits beside the headline ---------- */
  var heroBtns = $$("[data-set-hero]"), heroIds = heroBtns.map(function (b) { return b.getAttribute("data-set-hero"); });
  var curHero = function () { var h = html.getAttribute("data-hero"); return heroIds.indexOf(h) > 0 ? h : "track"; };
  var markHero = function () { var h = curHero(); heroBtns.forEach(function (b) { b.setAttribute("aria-checked", String(b.getAttribute("data-set-hero") === h)); }); };
  heroBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      var v = b.getAttribute("data-set-hero");
      if (v === curHero()) return;
      var apply = function () { if (v === "track") html.removeAttribute("data-hero"); else html.setAttribute("data-hero", v); store.set("tg6-hero", v === "track" ? null : v); markHero(); };
      var vis = d.querySelector(".hero-vis"), r = vis && vis.getBoundingClientRect();
      if (r && (r.top > innerHeight * 0.6 || r.bottom < 80)) {
        /* hero is off screen (e.g. on a phone): close the panel and bring it into view */
        apply();
        var sp = d.getElementById("settings");
        if (sp && sp.hidePopover && sp.matches(":popover-open")) sp.hidePopover();
        vis.scrollIntoView({ block: "center", behavior: reduced() ? "auto" : "smooth" });
        return;
      }
      if (!d.startViewTransition || reduced()) { apply(); return; }
      html.classList.add("vt-hero");
      d.startViewTransition(apply).finished.finally(function () { html.classList.remove("vt-hero"); });
    });
  });
  markHero();

  /* Document check: stamp the top paper, tick it off, move it to the back */
  var hd = d.querySelector("[data-docs-hero]");
  if (hd) {
    var hdDocs = $$(".hd-doc", hd), hdChecks = $$(".hd-l li", hd), hdStack = hdDocs.slice(), hdIn = false, hdT = 0;
    var hdLater = function (fn, ms) { clearTimeout(hdT); hdT = setTimeout(function () { if (reduced() || d.hidden || !hdIn) hdLater(fn, 800); else fn(); }, ms); };
    var stamp = function () {
      var top = hdStack[0];
      if (top.classList.contains("is-ok")) {
        hdDocs.forEach(function (el) { el.classList.remove("is-ok"); });
        hdChecks.forEach(function (li) { li.classList.remove("is-done"); });
        hdLater(stamp, 900); return;
      }
      top.classList.add("is-ok");
      hdChecks[hdDocs.indexOf(top)].classList.add("is-done");
      hdLater(shuffle, 1500);
    };
    var shuffle = function () {
      var top = hdStack.shift(); hdStack.push(top);
      top.classList.add("is-out");
      setTimeout(function () {
        hdStack.forEach(function (el, i) { el.style.setProperty("--i", i); });
        top.classList.remove("is-out");
        hdLater(stamp, 1000);
      }, 480);
    };
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { hdIn = es[0].isIntersecting; }).observe(hd);
    if (!reduced()) {
      hdDocs.forEach(function (el) { el.classList.remove("is-ok"); });
      hdChecks.forEach(function (li) { li.classList.remove("is-done"); });
      hdLater(stamp, 1200);
    }
  }

  /* Sector gallery: feature each sector in turn; hover or focus picks one */
  var hg = d.querySelector("[data-hg]");
  if (hg) {
    var tiles = $$(".hg-t", hg), on = 0, hgIn = false, hold = false, hgT = 0, HG_MS = 4200;
    var setOn = function (i) { on = i; hg.setAttribute("data-on", i); tiles.forEach(function (t, k) { t.classList.toggle("is-on", k === i); }); };
    var hgLater = function (fn, ms) { clearTimeout(hgT); hgT = setTimeout(function () { if (reduced() || d.hidden || !hgIn || hold) hgLater(fn, 800); else fn(); }, ms); };
    var tick = function () { setOn((on + 1) % tiles.length); hgLater(tick, HG_MS); };
    tiles.forEach(function (t, i) {
      var enter = function () { hold = true; hg.classList.remove("is-run"); setOn(i); };
      var leave = function () { hold = false; if (!reduced()) { hg.classList.add("is-run"); hgLater(tick, HG_MS); } };
      t.addEventListener("pointerenter", enter); t.addEventListener("focus", enter);
      t.addEventListener("pointerleave", leave); t.addEventListener("blur", leave);
    });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) {
      hgIn = es[0].isIntersecting;
      if (hgIn && !reduced() && !hold) { hg.classList.remove("is-run"); void hg.offsetWidth; hg.classList.add("is-run"); hgLater(tick, HG_MS); }
    }).observe(hg);
  }

  /* ---------- Home: job list tabs + floating photo preview ---------- */
  var jl = d.querySelector("[data-jl]");
  if (jl) {
    var rows = $$(".jrow", jl), LIMIT = 6, tabs = $$("[data-jtabs] button");
    var showRows = function (v, anim) {
      var first = anim && !reduced() ? flipGrab(rows) : null, n = 0;
      rows.forEach(function (r) { var ok = (!v || r.getAttribute("data-sector") === v) && n < LIMIT; r.hidden = !ok; if (ok) n++; });
      if (first) flipPlay(rows, first);
    };
    tabs.forEach(function (b) {
      b.addEventListener("click", function () {
        tabs.forEach(function (x) { x.setAttribute("aria-checked", String(x === b)); });
        showRows(b.getAttribute("data-v"), true);
      });
    });
    d.querySelector("[data-jtabs]").addEventListener("keydown", function (e) {
      var i = tabs.indexOf(d.activeElement); if (i < 0) return;
      var j = e.key === "ArrowRight" || e.key === "ArrowDown" ? i + 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? i - 1 : -9;
      if (j === -9) return; e.preventDefault();
      var t = tabs[(j + tabs.length) % tabs.length]; t.focus(); t.click();
    });
    showRows("", false);

    var prev = jl.querySelector(".jprev");
    if (fine && prev) {
      var imgs = $$("img", prev), tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, on = false;
      var loop = function () {
        cx += (tx - cx) * 0.16; cy += (ty - cy) * 0.16;
        prev.style.setProperty("--px", cx.toFixed(1) + "px"); prev.style.setProperty("--py", cy.toFixed(1) + "px");
        raf = on || Math.abs(tx - cx) > .5 ? requestAnimationFrame(loop) : 0;
      };
      jl.addEventListener("pointermove", function (e) {
        if (reduced() || innerWidth < 960) return;
        var r = jl.getBoundingClientRect(), row = e.target.closest(".jrow");
        tx = e.clientX - r.left + 28; ty = e.clientY - r.top - 150;
        if (row) {
          if (!on) { cx = tx; cy = ty; }
          on = true; prev.classList.add("is-on");
          imgs.forEach(function (im) { im.classList.toggle("is-on", im.getAttribute("data-s") === row.getAttribute("data-sector")); });
        }
        if (!raf) raf = requestAnimationFrame(loop);
      });
      jl.addEventListener("pointerleave", function () { on = false; prev.classList.remove("is-on"); });
    }
  }

  /* ---------- Copy licence number ---------- */
  $$("[data-copy]").forEach(function (b) {
    var label = b.querySelector("span"), orig = label.textContent;
    b.addEventListener("click", function () {
      var txt = b.getAttribute("data-copy");
      var done = function () {
        label.textContent = b.getAttribute("data-copied"); b.classList.add("is-done");
        setTimeout(function () { label.textContent = orig; b.classList.remove("is-done"); }, 2200);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, done); else done();
    });
  });

  /* ---------- Jobs page: search + filters with FLIP re-layout ---------- */
  var jf = d.querySelector("[data-jobfilter]");
  if (jf) {
    var jobs = $$("[data-jobs] .job"), out = jf.querySelector("[data-count-out]"), empty = d.querySelector("[data-empty]");
    var tpl = out.getAttribute("data-tpl"), country = jf.querySelector("[name=country]"), qi = jf.querySelector("[name=q]");
    var sv = (q.get("sector") || "").replace(/[^a-z]/g, "");
    var r0 = jf.querySelector('input[name=sector][value="' + sv + '"]');
    if (r0) r0.checked = true;
    if (q.get("country")) country.value = q.get("country");
    if (q.get("q")) qi.value = q.get("q");
    var apply = function (anim) {
      var s = (jf.querySelector("input[name=sector]:checked") || {}).value || "", c = country.value, words = qi.value.trim().toLowerCase().split(/\s+/).filter(Boolean), n = 0;
      var first = anim && !reduced() ? flipGrab(jobs) : null;
      jobs.forEach(function (j) {
        var text = j.getAttribute("data-text");
        var show = (!s || j.getAttribute("data-sector") === s) && (!c || j.getAttribute("data-country") === c) && words.every(function (w) { return text.indexOf(w) > -1; });
        j.hidden = !show; if (show) n++;
      });
      out.textContent = tpl.replace("{n}", n).replace("{t}", jobs.length);
      empty.hidden = n > 0;
      if (first) flipPlay(jobs, first);
      if (anim) {
        var p = new URLSearchParams();
        if (words.length) p.set("q", qi.value.trim());
        if (s) p.set("sector", s);
        if (c) p.set("country", c);
        history.replaceState(null, "", location.pathname + (p.toString() ? "?" + p : "") + location.hash);
      }
    };
    var deb = 0;
    jf.addEventListener("change", function () { apply(true); });
    qi.addEventListener("input", function () { clearTimeout(deb); deb = setTimeout(function () { apply(true); }, 160); });
    jf.addEventListener("submit", function (e) { e.preventDefault(); apply(true); });
    jf.addEventListener("reset", function () { setTimeout(function () { apply(true); }, 0); });
    apply(false);
  }

  /* ---------- Documents checklist ---------- */
  var docs = d.querySelector("[data-docs]");
  if (docs) {
    var boxes = $$("input[type=checkbox]", docs), meter = d.querySelector("[data-dmeter]"), nOut = d.querySelector("[data-docs-n]"), msg = docs.querySelector("[data-docs-msg]");
    var upDocs = function () {
      var n = boxes.filter(function (b) { return b.checked; }).length;
      meter.style.setProperty("--pct", Math.round(n / boxes.length * 100));
      nOut.textContent = n;
      msg.textContent = n === boxes.length ? msg.getAttribute("data-done") : "";
    };
    docs.addEventListener("change", upDocs); upDocs();
  }

  /* ---------- Contact form: builds an email ---------- */
  var form = d.querySelector("[data-contact]");
  if (form) {
    var groups = $$("[data-grp]", form), radios = $$("input[name=type]", form);
    var setType = function (t) {
      groups.forEach(function (g) { g.disabled = g.getAttribute("data-grp") !== t; });
      radios.forEach(function (r) { r.checked = r.value === t; });
    };
    radios.forEach(function (r) { r.addEventListener("change", function () { setType(r.value); }); });
    setType(q.get("type") === "employer" ? "employer" : "worker");

    var job = q.get("job"), card = null;
    if (job) {
      var names = {};
      try { names = JSON.parse(form.querySelector("[data-jobnames]").textContent); } catch (e) {}
      card = names[job];
      var note = form.querySelector("[data-jobnote]");
      note.querySelector("b").textContent = card || job.replace(/-/g, " ");
      note.hidden = false;
      form.querySelector("input[name=job]").value = job;
    }
    var mark = function (el) {
      var bad = !el.checkValidity();
      el.classList.toggle("is-bad", bad);
      el.setAttribute("aria-invalid", String(bad));
      return !bad;
    };
    form.addEventListener("input", function (e) { if (e.target.classList.contains("is-bad")) mark(e.target); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true, firstBad = null;
      $$("fieldset:not([disabled]) input[required], fieldset:not([disabled]) input[type=email]", form).forEach(function (el) {
        if (!mark(el)) { ok = false; firstBad = firstBad || el; }
      });
      var consent = form.querySelector("[name=consent]");
      form.classList.toggle("bad-consent", !consent.checked);
      if (!consent.checked) { ok = false; firstBad = firstBad || consent; }
      if (!ok) { firstBad.focus(); return; }
      var type = form.querySelector("input[name=type]:checked").value, lines = [], name = "";
      $$("fieldset:not([disabled]) .fld, .fld--msg", form).forEach(function (f) {
        var el = f.querySelector("input, select, textarea");
        if (!el || el.matches(":disabled") || !el.value.trim()) return;
        var label = f.querySelector("label").textContent.replace(/\s*\*$/, "");
        var val = el.tagName === "SELECT" ? el.options[el.selectedIndex].text : el.value.trim();
        if (el.name === "name") name = val;
        lines.push(label + ": " + val);
      });
      if (job) lines.unshift((en ? "Job: " : "ตำแหน่ง: ") + (card || job) + " [" + job + "]");
      var subject = type === "employer"
        ? (en ? "Employer enquiry" : "นายจ้างติดต่อ") + " — " + (form.querySelector("[name=company]").value || name)
        : (en ? "Job application" : "สมัครงานต่างประเทศ") + " — " + name;
      location.href = "mailto:" + form.getAttribute("action").replace(/^mailto:/, "") + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
      var done = form.querySelector("[data-done]");
      done.hidden = false; done.focus();
    });
  }

  /* ---------- Company profile: flip book ----------
     The pages are plain <figure>s in the HTML; here they become a book (two pages side by side on
     wide screens, one at a time on phones). A turn is drawn the way paper moves: the page corner is
     pulled to P, the sheet folds along the line halfway between P and where the corner started, and
     the folded-over part shows the other side of the sheet. */
  var fb = d.querySelector("[data-fb]");
  if (fb) (function () {
    var book = fb.querySelector("[data-fb-book]"), stage = fb.querySelector("[data-fb-stage]"), bar = fb.querySelector("[data-fb-bar]");
    var pages = $$(".fb-pg", book), n = pages.length, R = 3508 / 2480;
    var range = fb.querySelector("[data-fb-range]"), count = fb.querySelector("[data-fb-count]"), live = fb.querySelector("[data-fb-live]");
    var prevs = $$("[data-fb-prev]", fb), nexts = $$("[data-fb-next]", fb);
    var gridDlg = fb.querySelector("[data-fb-grid-dlg]"), zoomDlg = fb.querySelector("[data-fb-zoom-dlg]"), zoomBody = fb.querySelector("[data-fb-zoom-body]");
    var sndBtn = fb.querySelector("[data-fb-sound]"), fullBtn = fb.querySelector("[data-fb-full]"), hdr = d.querySelector("[data-hdr]");
    var mk = function (cls, parent) { var e = d.createElement("div"); e.className = cls; parent.appendChild(e); return e; };
    /* slots are placed from the spine: uL/uR are the pages uncovered by a turn, sL/sR the pages on top */
    var shelf = mk("fb-shelf", book), org = mk("fb-org", book);
    var uL = mk("fb-slot fb-slot--l", org), uR = mk("fb-slot fb-slot--r", org);
    var sL = mk("fb-slot fb-slot--l", org), sR = mk("fb-slot fb-slot--r", org);
    // Receiver clips the cast shadow to real paper; the moving sheet paints above it.
    var cast = mk("fb-cast", org), castBlur = mk("fb-cast-blur", cast), castShape = mk("fb-cast-shape", castBlur);
    var flapW = mk("fb-flapw", org), flap = mk("fb-slot fb-flap", flapW);
    var curlLight = mk("fb-curl-light", flap);
    [cast, curlLight].forEach(function (el) { el.setAttribute("aria-hidden", "true"); });
    var ghost = d.createElement("img");
    var dbl = null, cur = 0, max = n - 1, busy = false, pw = 0, ph = 0, touched = false, inView = true, turn = null, peeking = false;
    var m = /^#page-(\d+)$/.exec(location.hash), start = m ? clamp(+m[1] - 1, 0, n - 1) : 0;
    ghost.className = "fb-ghost"; ghost.alt = ""; ghost.decoding = "async";
    pages.forEach(function (p) { shelf.appendChild(p); });

    /* pages visible at position k, and the position that shows page i */
    var shown = function (k) { return dbl ? [2 * k - 1, 2 * k].filter(function (i) { return i >= 0 && i < n; }) : [k]; };
    var toLeaf = function (i) { return dbl ? Math.min(Math.floor((i + 1) / 2), max) : i; };
    var title = function (i) { return pages[i].getAttribute("data-title"); };
    var fx = function (v) { return Math.round(v * 100) / 100; };

    /* put page i in a slot, or empty the slot */
    function put(slot, i) {
      var pg = pages[i], old = slot.querySelector(".fb-pg");
      if (old && old !== pg) shelf.appendChild(old);
      if (pg && pg.parentNode !== slot) slot.insertBefore(pg, slot.firstChild);
      slot.hidden = !pg;
    }
    /* a closed book (cover, or back cover) sits centred */
    function setShift(k) {
      var only = !dbl ? "" : k === 0 ? "r" : k === max && n % 2 === 0 ? "l" : "";
      book.setAttribute("data-only", only);
      book.style.setProperty("--shift", only === "r" ? "-25%" : only === "l" ? "25%" : "0%");
    }

    /* the resting book */
    function place() {
      turn = null; peeking = false;
      if (ghost.parentNode) ghost.remove();
      put(uL, -1); put(uR, -1); put(flap, -1);
      if (dbl) { put(sL, 2 * cur - 1); put(sR, 2 * cur); } else { put(sL, -1); put(sR, cur); }
      sL.style.clipPath = sR.style.clipPath = "";
      flapW.hidden = cast.hidden = true;
      fb.classList.remove("is-turning");
      setShift(cur);
      var vis = shown(cur);
      pages.forEach(function (p, i) {
        var img = p.querySelector("img");
        if (Math.abs(i - vis[0]) <= (dbl ? 5 : 2) && img.loading === "lazy") img.loading = "eager";   // fetch ahead
      });
      prevs.forEach(function (b) { b.disabled = cur <= 0; });
      nexts.forEach(function (b) { b.disabled = cur >= max; });
      range.value = cur;
      count.textContent = vis.map(function (i) { return i + 1; }).join("–") + " / " + n;
      range.setAttribute("aria-valuetext", count.textContent);
    }
    function settled() {
      place();
      if (!touched) return;
      var vis = shown(cur);
      live.textContent = (en ? "Page " : "หน้า ") + count.textContent.replace(" / ", en ? " of " : " จาก ") + ": " + vis.map(title).join(", ");
      try { history.replaceState(null, "", "#page-" + (vis[0] + 1)); } catch (e) {}
    }

    /* get sheet k ready to turn. s = 1: a right-hand page going left; s = -1: a left-hand page going
       right. cy is the corner being lifted (0 top, ph bottom); x0 where that corner starts. */
    function prepare(k, s, cy, x0) {
      fb.classList.add("is-turning");
      if (ghost.parentNode) ghost.remove();
      if (!dbl) {   // one page: the back of the sheet is blank paper with the print showing through
        put(sL, -1); put(uL, -1); put(sR, k); put(uR, k + 1); put(flap, -1);
        var img = pages[k].querySelector("img");
        ghost.src = img.currentSrc || img.src;
        flap.insertBefore(ghost, flap.firstChild); flap.hidden = false;
      } else if (s > 0) { put(sL, 2 * k - 1); put(uL, -1); put(sR, 2 * k); put(uR, 2 * k + 2); put(flap, 2 * k + 1); }
      else { put(sR, 2 * k + 2); put(uR, -1); put(sL, 2 * k + 1); put(uL, 2 * k - 1); put(flap, 2 * k); }
      flap.classList.toggle("is-l", !!dbl && s > 0); flap.classList.toggle("is-r", !!dbl && s < 0);
      flapW.hidden = cast.hidden = false;
      turn = { k: k, s: s, cy: cy, P: null };
      draw({ x: x0 == null ? s * pw : x0, y: cy });
    }

    /* keep the part of polygon pts on one side of the line x·v = mv */
    function cut(pts, vx, vy, mv, side) {
      var out = [];
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i], q = pts[(i + 1) % pts.length];
        var dp = side * (p[0] * vx + p[1] * vy - mv), dq = side * (q[0] * vx + q[1] * vy - mv);
        if (dp >= 0) out.push(p);
        if ((dp >= 0) !== (dq >= 0)) { var t = dp / (dp - dq); out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]); }
      }
      return out;
    }
    /* polygon as clip-path, mapping x to off + sx * x */
    var poly = function (pts, off, sx) {
      if (pts.length < 3) return "polygon(0 0, 0 0, 0 0)";
      return "polygon(" + pts.map(function (p) { return fx(off + sx * p[0]) + "px " + fx(p[1]) + "px"; }).join(",") + ")";
    };
    /* a sheet stays bound at the spine: the corner can't be pulled further than the paper reaches */
    var bind = function (P, y, r) {
      var dx = P.x, dy = P.y - y, l = Math.sqrt(dx * dx + dy * dy);
      return l > r ? { x: dx * r / l, y: y + dy * r / l } : P;
    };
    function draw(P) {
      var t = turn, W = pw, H = ph, s = t.s, Cx = s * W, Cy = t.cy;
      P = bind(bind(P, Cy, W), H - Cy, Math.sqrt(W * W + H * H));
      t.P = P;
      var keep = s > 0 ? sR : sL, x0 = s > 0 ? 0 : -W, ox = s > 0 ? W : 0;
      var dx = Cx - P.x, dy = Cy - P.y, len = Math.sqrt(dx * dx + dy * dy);
      if (len < 1) { keep.style.clipPath = ""; flapW.style.visibility = cast.style.visibility = "hidden"; return; }
      flapW.style.visibility = cast.style.visibility = "";
      var vx = dx / len, vy = dy / len, mx = (Cx + P.x) / 2, my = (Cy + P.y) / 2, mv = mx * vx + my * vy;
      var rect = [[x0, 0], [x0 + W, 0], [x0 + W, H], [x0, H]], fold = cut(rect, vx, vy, mv, 1);
      keep.style.clipPath = poly(cut(rect, vx, vy, mv, -1), -x0, 1);
      /* the other side of the sheet: mirror it, then reflect it across the fold line */
      flap.style.clipPath = poly(fold, ox, -1);
      flap.style.transform = "matrix(" + [2 * vx * vx - 1, 2 * vx * vy, -2 * vx * vy, 1 - 2 * vy * vy,
        ox * (1 - 2 * vx * vx) + 2 * mv * vx, -2 * ox * vx * vy + 2 * mv * vy]
        .map(function (v, i) { return i < 4 ? Math.round(v * 1000000) / 1000000 : fx(v); }).join(",") + ")";
      // Project the same folded silhouette onto the receiving pages. Clip after blurring,
      // so no shadow escapes onto the stage or crosses above the moving paper.
      var prog = clamp((Cx - P.x) * s / (2 * W), 0, 1), lift = Math.sin(Math.PI * prog);
      var contact = Math.min(1, lift * 6), origin = dbl ? W : 0;
      var left = dbl && (!sL.hidden || !uL.hidden), right = !sR.hidden || !uR.hidden;
      cast.style.left = -origin + "px"; cast.style.width = (dbl ? 2 * W : W) + "px";
      cast.style.clipPath = poly([[left ? 0 : origin, 0], [right ? origin + W : origin, 0],
        [right ? origin + W : origin, H], [left ? 0 : origin, H]], 0, 1);
      castBlur.style.left = origin + "px";
      castBlur.style.transform = "translate(" + fx(3 * lift) + "px," + fx(8 * lift) + "px)";
      castBlur.style.filter = "blur(" + fx(.8 + 11 * lift) + "px)";
      cast.style.opacity = fx((.14 + .10 * lift) * contact);
      castShape.style.clipPath = flap.style.clipPath;
      castShape.style.transform = flap.style.transform;
      // A narrow curved highlight/shade band follows the crease in sheet coordinates.
      var diagonal = Math.hypot(W, H), band = Math.min(38, W * .075, len * .16);
      curlLight.style.width = fx(band) + "px"; curlLight.style.height = fx(2 * diagonal) + "px";
      curlLight.style.transform = "translate(" + fx(ox - mx) + "px," + fx(my - diagonal) + "px) rotate(" + Math.atan2(vy, -vx) + "rad)";
      curlLight.style.opacity = fx(contact * (.65 + .35 * lift));
    }

    /* move the corner to P1 along a curve that lifts it on the way across */
    var easeIO = function (p) { return (1 - Math.cos(Math.PI * p)) / 2; };
    var easeO = function (p) { return 1 - Math.pow(1 - p, 3); };
    function run(P1, dur, ease, done) {
      var P0 = { x: turn.P.x, y: turn.P.y }, up = turn.cy ? -1 : 1, t0 = null;
      var cx = (P0.x + P1.x) / 2, cy = (up < 0 ? Math.min(P0.y, P1.y) : Math.max(P0.y, P1.y)) + up * ph * .42 * Math.abs(P1.x - P0.x) / (2 * pw);
      busy = true;
      if (reduced()) { busy = false; done(); return; }
      requestAnimationFrame(function tick(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur), e = ease(p), u = 1 - e;
        draw({ x: u * u * P0.x + 2 * u * e * cx + e * e * P1.x, y: u * u * P0.y + 2 * u * e * cy + e * e * P1.y });
        if (p < 1) requestAnimationFrame(tick); else { busy = false; done(); }
      });
    }
    /* where the moving corner starts and lands for a turn in direction dir */
    var ends = function (dir) {
      var s = dbl ? dir : 1;
      return dbl ? [s * pw, -s * pw] : dir > 0 ? [pw, -pw] : [-pw, pw];
    };
    function ready(dir, cy) {
      var s = dbl ? dir : 1, k = dir > 0 ? cur : cur - 1;
      if (turn && turn.k === k && turn.s === s) return;
      if (turn) place();
      prepare(k, s, cy, ends(dir)[0]);
    }

    function step(dir, cy) {
      var to = cur + dir;
      if (busy || to < 0 || to > max) return;
      touched = true;
      if (reduced()) { cur = to; settled(); swish(); return; }
      ready(dir, cy == null ? ph : cy);
      setShift(to); swish(cur === 0 && dir > 0);
      run({ x: ends(dir)[1], y: turn.cy }, 950, easeIO, function () { cur = to; settled(); });
    }
    function go(to) {
      to = clamp(to, 0, max);
      if (busy || to === cur) return;
      if (Math.abs(to - cur) === 1) { step(to - cur); return; }
      touched = true; cur = to; settled(); swish();
      if (!reduced()) book.animate([{ opacity: .35 }, { opacity: 1 }], { duration: 320, easing: "ease-out" });
    }

    /* mouse near an outer corner: the corner lifts a little and follows the pointer */
    function hover(p) {
      var r = Math.min(pw, ph) * .2, hit = null;
      [[1, 0], [1, ph], [-1, 0], [-1, ph]].forEach(function (c) {
        var x = c[0] * pw;
        if ((!dbl && c[0] < 0) || cur + c[0] < 0 || cur + c[0] > max) return;
        if (Math.abs(p.x - x) < r && Math.abs(p.y - c[1]) < r) hit = { dir: c[0], cy: c[1], x: x };
      });
      if (!hit) { if (peeking) unpeek(); return; }
      if (turn && turn.cy !== hit.cy) place();
      ready(hit.dir, hit.cy);
      peeking = true;
      var s = turn.s, up = hit.cy ? -1 : 1;
      draw({ x: p.x - s * r * .45, y: p.y + up * r * .45 });
    }
    function unpeek() {
      peeking = false;
      if (!turn || busy) return;
      run({ x: turn.s * pw, y: turn.cy }, 240, easeO, place);
    }

    /* drag a page across, or click: right page (or right half) turns forward, left turns back */
    var g = null;
    var at = function (e) { var r = org.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    book.addEventListener("pointerdown", function (e) {
      if (busy || e.button > 0 || !e.isPrimary) return;
      g = { id: e.pointerId, p: at(e), t: performance.now(), on: false };
    });
    book.addEventListener("pointermove", function (e) {
      if (!g) { if (e.pointerType === "mouse" && !busy) hover(at(e)); return; }
      if (e.pointerId !== g.id) return;
      var p = at(e), dx = p.x - g.p.x, dy = p.y - g.p.y;
      if (!g.on) {
        if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) { g = null; if (peeking) unpeek(); return; }   // scrolling
        if (Math.abs(dx) < 8) return;
        var dir = dx < 0 ? 1 : -1;
        if (cur + dir < 0 || cur + dir > max || (dbl && (g.p.x >= 0) !== (dir > 0))) { g = null; return; }
        ready(dir, g.p.y < ph / 2 ? 0 : ph);
        g.on = true; g.dir = dir; g.P0 = { x: turn.P.x, y: turn.P.y }; g.e = ends(dir);
        busy = true; touched = true; peeking = false;
        try { book.setPointerCapture(e.pointerId); } catch (err) {}
      }
      var x = g.P0.x + dx, prog = clamp((x - g.e[0]) / (g.e[1] - g.e[0]), 0, 1), now = performance.now();
      if (g.lt) g.v = (p.x - g.lpx) / Math.max(8, now - g.lt);   // speed for a flick
      g.lpx = p.x; g.lt = now;
      draw({ x: x, y: g.P0.y + dy + (turn.cy ? -1 : 1) * ph * .2 * Math.sin(Math.PI * prog) });
    });
    var release = function (e) {
      if (!g || e.pointerId !== g.id) return;
      var gg = g; g = null;
      if (!gg.on) {
        if (e.type !== "pointerup") return;
        var p = at(e);
        if (peeking && turn) step(dbl ? turn.s : 1);
        else step(dbl ? (p.x >= 0 ? 1 : -1) : (p.x > pw / 2 ? 1 : -1), p.y < ph / 2 ? 0 : ph);
        return;
      }
      busy = false;
      var P = turn.P, prog = (P.x - gg.e[0]) / (gg.e[1] - gg.e[0]), flick = (gg.v || 0) * -gg.dir > .5;
      var keep = e.type === "pointerup" && (prog > .3 || flick), x = keep ? gg.e[1] : gg.e[0], to = cur + gg.dir;
      if (keep) { setShift(to); swish(); }
      run({ x: x, y: turn.cy }, 200 + 600 * Math.abs(x - P.x) / (2 * pw), easeO, function () { if (keep) cur = to; settled(); });
    };
    book.addEventListener("pointerup", release);
    book.addEventListener("pointercancel", release);
    book.addEventListener("pointerleave", function () { if (!g && peeking) unpeek(); });

    prevs.forEach(function (b) { b.addEventListener("click", function () { step(-1); }); });
    nexts.forEach(function (b) { b.addEventListener("click", function () { step(1); }); });
    range.addEventListener("input", function () { go(+range.value); });

    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { inView = es[0].isIntersecting; }).observe(stage);
    d.addEventListener("keydown", function (e) {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || gridDlg.open || zoomDlg.open) return;
      if (e.target.closest && e.target.closest("input, select, textarea, [contenteditable], [popover]")) return;
      var full = isFull();
      if (e.key === "Escape" && fb.classList.contains("is-max")) { setFull(false); return; }
      if (!inView && !full) return;
      if (e.key === "ArrowRight" || e.key === "PageDown" && full) step(1);
      else if (e.key === "ArrowLeft" || e.key === "PageUp" && full) step(-1);
      else if (e.key === "Home" && full) go(0);
      else if (e.key === "End" && full) go(max);
      else return;
      e.preventDefault();
    });

    /* Local Kenney book foley (CC0): a cover opening and three distinct page turns. */
    var sound = store.get("tg6-fb-sound") === "1", activePaper = null, lastPaper = -1;
    var audioRoot = new URL("../audio/", d.currentScript.src);
    var paperSounds = ["bookFlip1", "bookFlip2", "bookFlip3", "bookOpen"].map(function (name) {
      var audio = new Audio(new URL(name + ".mp3", audioRoot).href);
      audio.preload = "auto"; audio.volume = .65;
      audio.addEventListener("ended", function () { if (activePaper === audio) activePaper = null; });
      return audio;
    });
    function stopPaper() {
      if (activePaper) { activePaper.pause(); activePaper.currentTime = 0; activePaper = null; }
    }
    function swish(opening) {
      if (!sound || reduced()) return;
      stopPaper();
      var pick = opening === true ? 3 : (lastPaper + 1 + Math.floor(Math.random() * 2)) % 3;
      if (pick < 3) lastPaper = pick;
      var audio = paperSounds[pick];
      activePaper = audio; audio.currentTime = 0;
      audio.play().catch(function () { if (activePaper === audio) activePaper = null; });
    }
    sndBtn.setAttribute("aria-pressed", String(sound));
    sndBtn.addEventListener("click", function () {
      sound = !sound; store.set("tg6-fb-sound", sound ? "1" : null);
      if (!sound) stopPaper();
      sndBtn.setAttribute("aria-pressed", String(sound)); swish();
    });

    /* full screen; iPhone has no element full screen, so the book covers the window instead */
    var canFull = !!(fb.requestFullscreen && d.fullscreenEnabled);
    function isFull() { return d.fullscreenElement === fb || fb.classList.contains("is-max"); }
    function setFull(on) {
      if (canFull) {
        if (on) fb.requestFullscreen().catch(function () {});
        else if (d.fullscreenElement) d.exitFullscreen();
        return;
      }
      fb.classList.toggle("is-max", on); html.classList.toggle("fb-lock", on);
      fullBtn.setAttribute("aria-pressed", String(on)); size();
    }
    fullBtn.addEventListener("click", function () { setFull(!isFull()); });
    d.addEventListener("fullscreenchange", function () { fullBtn.setAttribute("aria-pressed", String(isFull())); size(); });

    /* dialogs: every page as a thumbnail, and a large page you can scroll and zoom */
    var openDlg = function (dlg) { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", ""); };
    $$("[data-fb-close]", fb).forEach(function (b) { b.addEventListener("click", function () { b.closest("dialog").close(); }); });
    [gridDlg, zoomDlg].forEach(function (dlg) { dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); }); });
    fb.querySelector("[data-fb-grid]").addEventListener("click", function () {
      var vis = shown(cur);
      $$("[data-fb-go]", gridDlg).forEach(function (b) { b.setAttribute("aria-current", String(vis.indexOf(+b.getAttribute("data-fb-go")) >= 0)); });
      openDlg(gridDlg);
      var on = gridDlg.querySelector('[aria-current="true"]');
      if (on) { on.focus(); on.scrollIntoView({ block: "nearest" }); }
    });
    $$("[data-fb-go]", gridDlg).forEach(function (b) {
      b.addEventListener("click", function () { gridDlg.close(); go(toLeaf(+b.getAttribute("data-fb-go"))); });
    });
    var zooms = [1, 1.4, 1.8, 2.4, 3], z = 0;
    var setZoom = function (i) {
      z = clamp(i, 0, zooms.length - 1);
      zoomBody.style.setProperty("--z", zooms[z]);
      fb.querySelector("[data-fb-zout]").disabled = z === 0;
      fb.querySelector("[data-fb-zin]").disabled = z === zooms.length - 1;
    };
    fb.querySelector("[data-fb-zoom]").addEventListener("click", function () {
      var vis = shown(cur);
      zoomBody.textContent = "";
      vis.forEach(function (i) {
        var src = pages[i].querySelector("img"), img = d.createElement("img");
        img.src = src.getAttribute("data-zoom"); img.alt = src.alt; img.decoding = "async";
        img.width = 2480; img.height = 3508; img.style.background = src.style.background;
        zoomBody.appendChild(img);
      });
      fb.querySelector("[data-fb-zoom-t]").textContent = (en ? "Page " : "หน้า ") + vis.map(function (i) { return i + 1; }).join("–") + ": " + vis.map(title).join(", ");
      setZoom(innerWidth < 700 ? 2 : 0);
      openDlg(zoomDlg);
      zoomBody.scrollTop = 0; zoomBody.scrollLeft = 0;
    });
    fb.querySelector("[data-fb-zin]").addEventListener("click", function () { setZoom(z + 1); });
    fb.querySelector("[data-fb-zout]").addEventListener("click", function () { setZoom(z - 1); });

    /* contents list: open that page and bring the book into view */
    $$("[data-fb-to]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        touched = true;
        go(toLeaf(+a.getAttribute("data-fb-to")));
        stage.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "center" });
      });
    });

    /* size: fit the window; two pages when there is room for them */
    function size() {
      var full = isFull(), cs = getComputedStyle(stage);
      var w = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      var chrome = bar.offsetHeight + (full ? 40 : 56) + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      var h = innerHeight - (full ? 0 : hdr ? hdr.offsetHeight : 0) - chrome;
      var one = Math.min(w, Math.max(h, full ? 240 : 420) / R), pair = Math.min((w - 2 * 76) / 2, Math.max(h, 360) / R);   // 76: side arrows
      var two = w >= 700 && pair >= one * .75;   // a tablet held upright reads better one page at a time
      if (two !== dbl) {
        var keep = dbl === null ? start : shown(cur)[0];
        dbl = two; max = dbl ? Math.floor(n / 2) : n - 1; range.max = max; cur = toLeaf(keep);
        fb.classList.toggle("is-dbl", dbl); fb.classList.toggle("is-sgl", !dbl);
      }
      pw = Math.max(120, Math.floor(two ? pair : one)); ph = Math.round(pw * R);
      book.style.width = (dbl ? 2 * pw : pw) + "px"; book.style.height = ph + "px";
      book.style.setProperty("--pw", pw + "px"); book.style.setProperty("--ph", ph + "px");
      pages.forEach(function (pg) { pg.querySelector("img").sizes = pw + "px"; });
      place();
    }

    fb.classList.add("is-on");
    [bar, fb.querySelector("[data-fb-hint]")].concat($$(".fb-side", fb)).forEach(function (el) { el.hidden = false; });
    size();
    if (m) stage.scrollIntoView({ block: "center" });
    var rz = 0;
    addEventListener("resize", function () { cancelAnimationFrame(rz); rz = requestAnimationFrame(function () { if (!busy) size(); }); }, { passive: true });
    if (window.MutationObserver) new MutationObserver(function () { if (!busy) size(); }).observe(html, { attributes: true, attributeFilter: ["data-text"] });
  })();

  /* close the mobile menu when one of its links is used */
  $$(".mnav a").forEach(function (a) { a.addEventListener("click", function () { var m = d.getElementById("mnav"); if (m && m.hidePopover) try { m.hidePopover(); } catch (e) {} }); });
})();
