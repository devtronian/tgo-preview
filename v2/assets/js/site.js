/* TG Oversea Solutions v2 — progressive enhancement only.
   Everything on the page works and is indexable without this file. */
(function () {
  "use strict";
  var q = new URLSearchParams(location.search);
  var en = document.documentElement.lang === "en";

  /* ---------- Job filter (jobs.html) ---------- */
  var filter = document.querySelector("[data-jobfilter]");
  if (filter) {
    var sector = filter.querySelector("[name=sector]");
    var country = filter.querySelector("[name=country]");
    var jobs = Array.prototype.slice.call(document.querySelectorAll("[data-jobs] .job"));
    var count = filter.querySelector("[data-count]");
    var empty = document.querySelector("[data-empty]");
    var tpl = count.getAttribute("data-tpl");

    if (q.get("sector")) sector.value = q.get("sector");
    if (q.get("country")) country.value = q.get("country");

    var apply = function (push) {
      var s = sector.value, c = country.value, n = 0;
      jobs.forEach(function (j) {
        var show = (!s || j.dataset.sector === s) && (!c || j.dataset.country === c);
        j.hidden = !show;
        if (show) n++;
      });
      count.textContent = tpl.replace("{n}", n).replace("{t}", jobs.length);
      empty.hidden = n > 0;
      if (push) {
        var p = new URLSearchParams();
        if (s) p.set("sector", s);
        if (c) p.set("country", c);
        history.replaceState(null, "", location.pathname + (p.toString() ? "?" + p : "") + location.hash);
      }
    };
    filter.addEventListener("change", function () { apply(true); });
    filter.addEventListener("submit", function (e) { e.preventDefault(); apply(true); });
    apply(false);
  }

  /* ---------- Contact form (contact.html) ---------- */
  var form = document.querySelector("[data-contact]");
  if (form) {
    var groups = form.querySelectorAll("[data-grp]");
    var radios = form.querySelectorAll("input[name=type]");
    var setType = function (t) {
      groups.forEach(function (g) { g.disabled = g.getAttribute("data-grp") !== t; });
      radios.forEach(function (r) { r.checked = r.value === t; });
    };
    radios.forEach(function (r) { r.addEventListener("change", function () { setType(r.value); }); });
    setType(q.get("type") === "employer" ? "employer" : "worker");

    var job = q.get("job");
    if (job) {
      var names = {};
      try { names = JSON.parse(form.querySelector("[data-jobnames]").textContent); } catch (e) {}
      var card = names[job];
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
    form.addEventListener("input", function (e) {
      if (e.target.classList.contains("is-bad")) mark(e.target);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true, first = null;
      form.querySelectorAll("fieldset:not([disabled]) input[required], fieldset:not([disabled]) input[type=email]").forEach(function (el) {
        if (!mark(el)) { ok = false; first = first || el; }
      });
      var consent = form.querySelector("[name=consent]");
      form.classList.toggle("bad-consent", !consent.checked);
      if (!consent.checked) { ok = false; first = first || consent; }
      if (!ok) { first.focus(); return; }

      var type = form.querySelector("input[name=type]:checked").value;
      var lines = [], name = "";
      form.querySelectorAll("fieldset:not([disabled]) .fld, .fld--full").forEach(function (f) {
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
      location.href = "mailto:" + form.action.replace(/^mailto:/, "") +
        "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
      var done = form.querySelector("[data-done]");
      done.hidden = false;
      done.focus();
    });
  }

})();
