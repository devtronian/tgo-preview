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
  var markSettings = function () {
    var t = html.getAttribute("data-theme") || "auto", s = html.getAttribute("data-text") || "";
    $$("[data-set-theme]").forEach(function (b) { b.setAttribute("aria-checked", String(b.getAttribute("data-set-theme") === t)); });
    $$("[data-set-text]").forEach(function (b) { b.setAttribute("aria-checked", String(b.getAttribute("data-set-text") === s)); });
    var bg = getComputedStyle(d.body).backgroundColor;
    metas.forEach(function (m) { m[0].setAttribute("content", t === "auto" ? m[1] : bg); });
  };
  $$("[data-set-theme]").forEach(function (b) {
    b.addEventListener("click", function () {
      var t = b.getAttribute("data-set-theme");
      if (t === (html.getAttribute("data-theme") || "auto")) return;
      var apply = function () { html.setAttribute("data-theme", t); store.set("tg6-theme", t === "auto" ? null : t); markSettings(); };
      if (!d.startViewTransition || reduced()) { apply(); return; }
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
  markSettings();

  /* Skip page transitions when motion is reduced */
  addEventListener("pageswap", function (e) { if (e.viewTransition && reduced()) e.viewTransition.skipTransition(); });

  /* ---------- Language switch keeps your place: adds the section in view as #hash ---------- */
  $$("[data-lang-link]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      if (a.hasAttribute("aria-current")) { e.preventDefault(); return; }
      var id = "";
      if (scrollY > 120) $$("section[id]").forEach(function (s) { if (s.getBoundingClientRect().top <= innerHeight * 0.35) id = s.id; });
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

  /* close the mobile menu when one of its links is used */
  $$(".mnav a").forEach(function (a) { a.addEventListener("click", function () { var m = d.getElementById("mnav"); if (m && m.hidePopover) try { m.hidePopover(); } catch (e) {} }); });
})();
