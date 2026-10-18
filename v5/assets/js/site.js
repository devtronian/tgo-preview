/* TG Oversea Solutions v5 — motion, themes and small interactions.
   Progressive enhancement only: every page is readable and indexable without it. */
(function () {
  "use strict";
  var d = document, html = d.documentElement, q = new URLSearchParams(location.search), en = html.lang === "en";
  var mqReduce = matchMedia("(prefers-reduced-motion: reduce)");
  var fine = matchMedia("(pointer: fine)").matches;
  html.classList.add("io");

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  };
  var reduced = function () { return html.classList.contains("rm"); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var smooth = function (a, b, v) { var t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };

  /* ---------- Theme picker (with circular reveal) ---------- */
  var themeBtns = $$("[data-set-theme]");
  var markTheme = function () {
    var t = html.getAttribute("data-theme") || "auto";
    themeBtns.forEach(function (b) { b.setAttribute("aria-checked", String(b.getAttribute("data-set-theme") === t)); });
    var bg = getComputedStyle(d.body).backgroundColor;
    $$('meta[name="theme-color"]').forEach(function (m) { if (t !== "auto") m.setAttribute("content", bg); });
  };
  themeBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      var t = b.getAttribute("data-set-theme");
      if (t === (html.getAttribute("data-theme") || "auto")) return;
      var apply = function () { html.setAttribute("data-theme", t); store.set("tg5-theme", t === "auto" ? null : t); markTheme(); };
      if (!d.startViewTransition || reduced()) { apply(); return; }
      var r = b.getBoundingClientRect();
      html.style.setProperty("--vx", Math.round(r.left + 14) + "px");
      html.style.setProperty("--vy", Math.round(r.top + r.height / 2) + "px");
      html.classList.add("vt-theme");
      d.startViewTransition(apply).finished.finally(function () { html.classList.remove("vt-theme"); });
    });
  });
  markTheme();

  var motionToggle = d.querySelector("[data-motion-toggle]");
  if (motionToggle) {
    motionToggle.checked = html.getAttribute("data-motion") === "reduce";
    motionToggle.addEventListener("change", function () {
      if (motionToggle.checked) { html.setAttribute("data-motion", "reduce"); store.set("tg5-motion", "reduce"); html.classList.add("rm"); }
      else { html.removeAttribute("data-motion"); store.set("tg5-motion", null); if (!mqReduce.matches) html.classList.remove("rm"); }
      onScroll();
    });
  }

  /* ---------- Split headings into phrases for the reveal ----------
     Thai headings are written with spaces between phrases, so splitting on
     whitespace keeps every line break at a phrase boundary (never mid-word). */
  $$("[data-split]").forEach(function (el) {
    var n = 0, walker = d.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (t) {
      if (t.parentElement.closest(".hpill, .sr")) return;
      var s = t.nodeValue;
      if (!s.trim()) return;
      var frag = d.createDocumentFragment();
      s.split(/(\s+)/).forEach(function (p) {
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.appendChild(d.createTextNode(p)); return; }
        var w = d.createElement("span"), i = d.createElement("span");
        w.className = "w"; i.textContent = p; i.style.setProperty("--w", n++); w.appendChild(i); frag.appendChild(w);
      });
      t.parentNode.replaceChild(frag, t);
    });
    el.classList.add("is-split");
  });

  /* ---------- Reveal on scroll ---------- */
  var countUp = function (el) {
    if (el._done) return; el._done = true;
    var to = +el.getAttribute("data-count");
    if (reduced()) { el.textContent = to; return; }
    var t0 = performance.now(), dur = 1700;
    var step = function (now) {
      var k = clamp((now - t0) / dur, 0, 1); k = 1 - Math.pow(1 - k, 4);
      el.textContent = Math.round(to * k);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        if (e.target.hasAttribute("data-count")) countUp(e.target);
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.12 });
    $$("[data-reveal], [data-split]").forEach(function (el) { io.observe(el); });
    $$("[data-count]").forEach(function (el) { if (!el.closest(".opens")) io.observe(el); });
  } else {
    $$("[data-reveal], [data-split]").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Scroll engine: header, progress, scrubbed sections, stacked cards ---------- */
  var hdr = d.querySelector("[data-hdr]");
  var scrubs = $$("[data-scrub]");
  var stackItems = $$("[data-stack] .stack-i");
  var progress = d.querySelector(".progress span");
  var needProgress = !(window.CSS && CSS.supports("animation-timeline: scroll()"));
  var lastY = scrollY, ticking = false;

  function frame() {
    ticking = false;
    var y = scrollY, vh = innerHeight;
    if (hdr) {
      hdr.classList.toggle("is-solid", y > 16);
      var anyOpen = d.querySelector(":popover-open");
      if (y > 480 && y - lastY > 6 && !anyOpen) hdr.classList.add("is-hidden");
      else if (lastY - y > 6 || y < 480) hdr.classList.remove("is-hidden");
    }
    lastY = y;
    if (needProgress && progress) {
      var max = d.documentElement.scrollHeight - vh;
      progress.style.setProperty("--sp", max > 0 ? (y / max).toFixed(4) : 0);
    }
    var rm = reduced();
    scrubs.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var sticky = el.getAttribute("data-scrub") === "sticky";
      var p = sticky ? clamp(-r.top / Math.max(1, r.height - vh), 0, 1) : clamp((vh - r.top) / (vh + r.height), 0, 1);
      if (rm) p = sticky ? 1 : 0.5;
      el.style.setProperty("--p", p.toFixed(4));
      if (sticky) {
        var p2 = smooth(0.42, 0.72, p);
        el.style.setProperty("--p1", smooth(0, 0.5, p).toFixed(4));
        el.style.setProperty("--p2", p2.toFixed(4));
        if (p2 > 0.25) $$("[data-count]", el).forEach(countUp);
      }
    });
    stackItems.forEach(function (li, i) {
      var card = li.firstElementChild, next = stackItems[i + 1];
      if (!next || rm) { card.style.setProperty("--s", 1); return; }
      var cr = card.getBoundingClientRect(), nr = next.getBoundingClientRect();
      var t = clamp((cr.bottom - nr.top) / Math.max(1, cr.height), 0, 1);
      card.style.setProperty("--s", (1 - t * 0.08).toFixed(4));
    });
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll, { passive: true });
  frame();

  /* ---------- Hero window: change the view with a window-shade "blink" ---------- */
  var ph = d.querySelector("[data-rotator]");
  if (ph) {
    var slides = $$(".ph-slide", ph), pills = $$(".hpill img"), idx = 0;
    var codeEl = d.querySelector("[data-ph-code]"), cityEl = d.querySelector("[data-ph-city]"), flyEl = d.querySelector("[data-ph-fly]");
    setInterval(function () {
      if (reduced() || d.hidden) return;
      var nextI = (idx + 1) % slides.length;
      pills.forEach(function (p, i) { p.classList.toggle("is-on", i === nextI % pills.length); });
      ph.classList.add("is-shut");
      setTimeout(function () {
        slides[idx].classList.remove("is-on");
        idx = nextI;
        var s = slides[idx];
        s.classList.add("is-on");
        codeEl.textContent = s.getAttribute("data-code");
        cityEl.textContent = s.getAttribute("data-city");
        flyEl.textContent = s.getAttribute("data-fly");
        ph.classList.remove("is-shut");
      }, 600);
    }, 5200);
  }

  /* ---------- Bangkok clock ---------- */
  var clock = d.querySelector("[data-clock]");
  if (clock) {
    var fmt = new Intl.DateTimeFormat(en ? "en-GB" : "th-TH", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Bangkok" });
    var tick = function () { clock.textContent = fmt.format(new Date()); };
    tick(); setInterval(tick, 15000);
  }

  /* ---------- Pointer effects: tilt, spotlight, magnetic buttons ---------- */
  if (fine) {
    d.addEventListener("pointermove", function (e) {
      if (reduced()) return;
      var spot = e.target.closest && e.target.closest("[data-spot], .cert");
      if (spot) {
        var r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", (e.clientX - r.left) + "px");
        spot.style.setProperty("--my", (e.clientY - r.top) + "px");
      }
      var tilt = e.target.closest && e.target.closest("[data-tilt]");
      if (tilt) {
        var t = tilt.getBoundingClientRect();
        var x = (e.clientX - t.left) / t.width - 0.5, y = (e.clientY - t.top) / t.height - 0.5;
        tilt.style.setProperty("--ry", (x * 10).toFixed(2) + "deg");
        tilt.style.setProperty("--rx", (-y * 10).toFixed(2) + "deg");
      }
    }, { passive: true });
    $$("[data-tilt]").forEach(function (el) {
      el.addEventListener("pointerleave", function () { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); });
    });
    $$("[data-magnet]").forEach(function (b) {
      b.addEventListener("pointermove", function (e) {
        if (reduced()) return;
        var r = b.getBoundingClientRect();
        b.style.transform = "translate(" + ((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1) + "px," + ((e.clientY - r.top - r.height / 2) * 0.32).toFixed(1) + "px)";
      });
      b.addEventListener("pointerleave", function () { b.style.transform = ""; });
    });
  }

  /* ---------- Sector accordion ---------- */
  $$("[data-acc]").forEach(function (acc) {
    var panels = $$(".acc-p", acc), timer;
    var open = function (p) {
      panels.forEach(function (x) {
        var on = x === p;
        x.classList.toggle("is-on", on);
        x.querySelector(".acc-tab").setAttribute("aria-expanded", String(on));
      });
    };
    panels.forEach(function (p) {
      p.querySelector(".acc-tab").addEventListener("click", function () { open(p); });
      p.addEventListener("click", function (e) { if (!e.target.closest("a")) open(p); });
      if (fine) {
        p.addEventListener("pointerenter", function () { clearTimeout(timer); timer = setTimeout(function () { open(p); }, 120); });
        p.addEventListener("pointerleave", function () { clearTimeout(timer); });
      }
    });
    var want = q.get("sector");
    if (want) { var m = d.getElementById("sector-" + want); if (m && panels.indexOf(m) > -1) open(m); }
  });

  /* ---------- Destination carousel: drag, buttons, parallax ---------- */
  $$("[data-car]").forEach(function (car) {
    var tr = car.querySelector(".car-track"), cards = $$(".dcard", tr), raf = 0;
    var upd = function () {
      raf = 0;
      var max = tr.scrollWidth - tr.clientWidth;
      car.style.setProperty("--cp", max > 0 ? (tr.scrollLeft / max).toFixed(3) : 0);
      var c = tr.getBoundingClientRect(), mid = c.left + c.width / 2;
      cards.forEach(function (k) {
        var r = k.getBoundingClientRect();
        k.style.setProperty("--x", clamp(((r.left + r.width / 2) - mid) / c.width, -1, 1).toFixed(3));
      });
    };
    tr.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true });
    addEventListener("resize", upd, { passive: true });
    var step = function (dir) { tr.scrollBy({ left: dir * (cards[0].offsetWidth + 18) * (innerWidth > 900 ? 2 : 1), behavior: reduced() ? "auto" : "smooth" }); };
    car.querySelector("[data-car-prev]").addEventListener("click", function () { step(-1); });
    car.querySelector("[data-car-next]").addEventListener("click", function () { step(1); });
    var sx = 0, sl = 0, down = false, moved = false;
    tr.addEventListener("pointerdown", function (e) { if (e.pointerType !== "mouse") return; down = true; moved = false; sx = e.clientX; sl = tr.scrollLeft; });
    addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - sx;
      if (!moved && Math.abs(dx) > 5) { moved = true; tr.classList.add("is-drag"); }
      if (moved) tr.scrollLeft = sl - dx;
    });
    addEventListener("pointerup", function () {
      if (!down) return; down = false;
      if (moved) setTimeout(function () { tr.classList.remove("is-drag"); }, 30);
    });
    tr.addEventListener("click", function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);
    upd();
  });

  /* ---------- Job filter with FLIP re-layout ---------- */
  var jf = d.querySelector("[data-jobfilter]");
  if (jf) {
    var jobs = $$("[data-jobs] .job"), out = jf.querySelector("[data-count-out]"), empty = d.querySelector("[data-empty]");
    var tpl = out.getAttribute("data-tpl"), country = jf.querySelector("[name=country]");
    var qs = q.get("sector") || "";
    var r0 = jf.querySelector('input[name=sector][value="' + qs.replace(/[^a-z]/g, "") + '"]');
    if (r0) r0.checked = true;
    if (q.get("country")) country.value = q.get("country");
    var apply = function (anim) {
      var s = (jf.querySelector("input[name=sector]:checked") || {}).value || "", c = country.value, n = 0;
      var animate = anim && !reduced() && jobs[0] && jobs[0].animate;
      var first = new Map();
      if (animate) jobs.forEach(function (j) { if (!j.hidden) first.set(j, j.getBoundingClientRect()); });
      jobs.forEach(function (j) {
        var show = (!s || j.getAttribute("data-sector") === s) && (!c || j.getAttribute("data-country") === c);
        j.hidden = !show; if (show) n++;
      });
      out.textContent = tpl.replace("{n}", n).replace("{t}", jobs.length);
      empty.hidden = n > 0;
      if (animate) {
        var k = 0;
        jobs.forEach(function (j) {
          if (j.hidden) return;
          var l = j.getBoundingClientRect(), f = first.get(j);
          if (f) {
            var dx = f.left - l.left, dy = f.top - l.top;
            if (dx || dy) j.animate([{ transform: "translate(" + dx + "px," + dy + "px)" }, { transform: "none" }], { duration: 650, easing: "cubic-bezier(.16,1,.3,1)" });
          } else {
            j.animate([{ opacity: 0, transform: "translateY(24px) scale(.96)" }, { opacity: 1, transform: "none" }], { duration: 600, delay: 40 * k++, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" });
          }
        });
      }
      if (anim) {
        var p = new URLSearchParams();
        if (s) p.set("sector", s);
        if (c) p.set("country", c);
        history.replaceState(null, "", location.pathname + (p.toString() ? "?" + p : "") + location.hash);
      }
    };
    jf.addEventListener("change", function () { apply(true); });
    jf.addEventListener("submit", function (e) { e.preventDefault(); apply(true); });
    apply(false);
  }

  /* ---------- Documents checklist ring ---------- */
  var docs = d.querySelector("[data-docs]");
  if (docs) {
    var boxes = $$("input[type=checkbox]", docs), ring = d.querySelector("[data-ring]"), msg = docs.querySelector("[data-docs-msg]");
    var upDocs = function () {
      var n = boxes.filter(function (b) { return b.checked; }).length;
      ring.style.setProperty("--pct", Math.round(n / boxes.length * 100));
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

  /* close the mobile menu when a link inside it is used (same-page anchors) */
  $$(".mnav a").forEach(function (a) { a.addEventListener("click", function () { var m = d.getElementById("mnav"); if (m && m.hidePopover) try { m.hidePopover(); } catch (e) {} }); });
})();
