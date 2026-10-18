/* ==========================================================================
   Hero globe — dot-matrix earth with flight arcs from Bangkok and the gold
   orbit ring from the TG monogram. Plain canvas 2D, no dependencies.
   ========================================================================== */
(function () {
  "use strict";
  var wrap = document.querySelector("[data-globe]");
  if (!wrap || !window.TG_LAND) return;

  var canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  wrap.appendChild(canvas);
  var ctx = canvas.getContext("2d");
  var D = Math.PI / 180;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var ORIGIN = { lon: 100.5, lat: 13.75, th: "กรุงเทพฯ", en: "Bangkok" };
  var DEST = [
    { lon: 46.7, lat: 24.7, th: "ริยาด", en: "Riyadh", lx: -8, ly: 6, al: "right" },
    { lon: 47.98, lat: 29.37, th: "คูเวต", en: "Kuwait", lx: -8, ly: -8, al: "right" },
    { lon: 55.3, lat: 25.2, th: "ดูไบ", en: "Dubai", lx: 7, ly: -9 },
    { lon: 58.4, lat: 23.6, th: "มัสกัต", en: "Muscat", lx: 8, ly: 9 },
    { lon: 151.2, lat: -33.87, th: "ซิดนีย์", en: "Sydney" },
    { lon: 115.86, lat: -31.95, th: "เพิร์ท", en: "Perth" },
    { lon: 174.76, lat: -36.85, th: "โอ๊คแลนด์", en: "Auckland" }
  ];

  // Rough outline of Thailand, used to tint its dots gold
  var TH_POLY = [[97.3,18.5],[98.9,20],[100.1,20.4],[100.6,19.5],[101.3,19.5],[101.1,17.5],[102.1,18.2],[103,17.9],[104.1,17.6],[104.8,16.4],[105.6,15.6],[105.4,14.3],[103,14.3],[102.3,13.4],[102.6,12.2],[101.7,12.6],[100.9,12.6],[100.9,13.5],[100.1,13.4],[99.9,12],[99.2,10],[99.9,9.2],[100.4,7.4],[101.1,6.9],[101.8,5.8],[101.1,5.7],[100.2,6.5],[99.6,6.9],[98.5,8],[98.3,9.3],[98.6,10.5],[99,11],[99.6,11.8],[99.2,12.7],[99.1,13.9],[98.4,14.7],[98.6,15.3],[98.6,16.1],[97.6,16.8]];
  function inPoly(x, y, poly) {
    var inside = false;
    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      var xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }

  // Precompute dots (radians + unit vectors)
  var L = window.TG_LAND, N = L.length / 2;
  var dLon = new Float32Array(N), dLat = new Float32Array(N), dTh = new Uint8Array(N);
  for (var i = 0; i < N; i++) {
    dLon[i] = L[i * 2] * D; dLat[i] = L[i * 2 + 1] * D;
    dTh[i] = inPoly(L[i * 2], L[i * 2 + 1], TH_POLY) ? 1 : 0;
  }

  // Great-circle arcs
  function vec(lon, lat) { lon *= D; lat *= D; return [Math.cos(lat) * Math.cos(lon), Math.cos(lat) * Math.sin(lon), Math.sin(lat)]; }
  var ARCS = DEST.map(function (d, k) {
    var a = vec(ORIGIN.lon, ORIGIN.lat), b = vec(d.lon, d.lat);
    var om = Math.acos(Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
    var S = 72, pts = [];
    for (var s = 0; s <= S; s++) {
      var tt = s / S, k1 = Math.sin((1 - tt) * om) / Math.sin(om), k2 = Math.sin(tt * om) / Math.sin(om);
      var x = k1 * a[0] + k2 * b[0], y = k1 * a[1] + k2 * b[1], z = k1 * a[2] + k2 * b[2];
      pts.push({ lon: Math.atan2(y, x), lat: Math.asin(z), alt: Math.sin(Math.PI * tt) * (0.05 + om * 0.16) });
    }
    return { pts: pts, d: d, offset: k * 0.63, period: 3.4 + (k % 3) * 0.5 };
  });

  // View state
  var W = 0, H = 0, R = 0, cx = 0, cy = 0, dpr = 1;
  var lam0 = 92 * D, phi0 = -6 * D;
  var userLam = 0, userPhi = 0, velLam = 0, dragging = false, lastX = 0, lastY = 0;
  var hoverX = 0, hoverY = 0, hx = 0, hy = 0;
  var running = false, visible = true, t0 = performance.now();

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = wrap.getBoundingClientRect();
    W = Math.max(10, r.width); H = Math.max(10, r.height);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    R = Math.min(W, H) * 0.355; cx = W / 2; cy = H / 2;
    if (!running) draw(performance.now());
  }

  var cL, sL, cP, sP, L0;
  function setView(lam, phi) { L0 = lam; cP = Math.cos(phi); sP = Math.sin(phi); }
  // returns [sx, sy, depth, onDiscOrFront]
  var out = [0, 0, 0, 0];
  function proj(lon, lat, alt) {
    var l = lon - L0, cp = Math.cos(lat), sp = Math.sin(lat), cl = Math.cos(l);
    var x = cp * Math.sin(l), y = cP * sp - sP * cp * cl, z = sP * sp + cP * cp * cl;
    var k = R * (1 + (alt || 0));
    out[0] = cx + x * k; out[1] = cy - y * k; out[2] = z;
    out[3] = z > 0 || (x * x + y * y) * (1 + (alt || 0)) * (1 + (alt || 0)) > 1 ? 1 : 0;
    return out;
  }

  function lang() { return document.documentElement.getAttribute("data-lang") === "en" ? "en" : "th"; }

  function orbitPoint(th) {
    var rx = R * 1.34, ry = R * 0.34, rot = -17 * D;
    var x = rx * Math.cos(th), y = ry * Math.sin(th);
    return [cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)];
  }
  function drawOrbit(front, alphaMul) {
    var steps = 90, a0 = front ? 0 : Math.PI, a1 = front ? Math.PI : Math.PI * 2;
    ctx.lineCap = "round";
    for (var s = 0; s < steps; s++) {
      var u = a0 + (a1 - a0) * s / steps, v = a0 + (a1 - a0) * (s + 1) / steps;
      var p = orbitPoint(u), q = orbitPoint(v);
      var depth = Math.sin((u + v) / 2); // >0 front
      var w = 1 + 3.2 * Math.max(0, depth);
      var gl = 0.5 + 0.5 * Math.cos(u * 1.0 + 0.8);
      ctx.strokeStyle = "rgba(" + Math.round(201 + 40 * gl) + "," + Math.round(160 + 52 * gl) + "," + Math.round(74 + 64 * gl) + "," + ((front ? 0.95 : 0.28) * alphaMul) + ")";
      ctx.lineWidth = w;
      ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke();
    }
  }
  function drawBall(th) {
    var p = orbitPoint(th), r = R * 0.055;
    var g = ctx.createRadialGradient(p[0] - r * .35, p[1] - r * .4, r * .1, p[0], p[1], r);
    g.addColorStop(0, "#fff6d6"); g.addColorStop(.45, "#e2bd68"); g.addColorStop(1, "#8a6420");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, Math.PI * 2); ctx.fill();
  }

  function draw(now) {
    var time = (now - t0) / 1000;
    if (!dragging) {
      velLam *= 0.95; userLam += velLam;
      userLam *= 0.995; userPhi *= 0.97;
    }
    hx += (hoverX - hx) * 0.05; hy += (hoverY - hy) * 0.05;
    var lam = lam0 + (reduced ? 0 : Math.sin(time * 0.09) * 18 * D) + userLam - hx * 8 * D;
    var phi = phi0 + userPhi + hy * 5 * D;
    setView(lam, phi);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // atmosphere
    var atm = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.45);
    atm.addColorStop(0, "rgba(74,120,210,.32)"); atm.addColorStop(.35, "rgba(40,80,170,.12)"); atm.addColorStop(1, "rgba(20,40,100,0)");
    ctx.fillStyle = atm; ctx.beginPath(); ctx.arc(cx, cy, R * 1.45, 0, Math.PI * 2); ctx.fill();

    var ballTh = reduced ? 2.2 : time * 0.42;
    var ballFront = Math.sin(ballTh % (Math.PI * 2)) > 0;

    // orbit back half + ball behind
    drawOrbit(false, 1);
    if (!ballFront) drawBall(ballTh);

    // sphere
    var sg = ctx.createRadialGradient(cx - R * .35, cy - R * .4, R * .1, cx, cy, R);
    sg.addColorStop(0, "#173f86"); sg.addColorStop(.55, "#0b2457"); sg.addColorStop(1, "#06163a");
    ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

    // graticule (gold, like the logo)
    ctx.lineWidth = 1; ctx.strokeStyle = "rgba(201,160,74,.16)";
    var la, lo, p, started;
    for (la = -60; la <= 60; la += 30) {
      ctx.beginPath(); started = false;
      for (lo = -180; lo <= 180; lo += 4) {
        p = proj(lo * D, la * D, 0);
        if (p[2] > 0) { if (!started) { ctx.moveTo(p[0], p[1]); started = true; } else ctx.lineTo(p[0], p[1]); } else started = false;
      }
      ctx.stroke();
    }
    for (lo = -180; lo < 180; lo += 30) {
      ctx.beginPath(); started = false;
      for (la = -88; la <= 88; la += 4) {
        p = proj(lo * D, la * D, 0);
        if (p[2] > 0) { if (!started) { ctx.moveTo(p[0], p[1]); started = true; } else ctx.lineTo(p[0], p[1]); } else started = false;
      }
      ctx.stroke();
    }

    // land dots, bucketed by depth
    var buckets = [[], [], [], [], []], gold = [];
    for (var i = 0; i < N; i++) {
      p = proj(dLon[i], dLat[i], 0);
      if (p[2] <= 0.02) continue;
      if (dTh[i]) { gold.push(p[0], p[1], p[2]); continue; }
      var b = Math.min(4, (p[2] * 5) | 0);
      buckets[b].push(p[0], p[1], p[2]);
    }
    for (var bI = 0; bI < 5; bI++) {
      var arr = buckets[bI]; if (!arr.length) continue;
      ctx.fillStyle = "rgba(176,198,240," + (0.14 + bI * 0.16) + ")";
      ctx.beginPath();
      for (var j = 0; j < arr.length; j += 3) {
        var s = (0.9 + arr[j + 2] * 1.25);
        ctx.rect(arr[j] - s / 2, arr[j + 1] - s / 2, s, s);
      }
      ctx.fill();
    }
    ctx.fillStyle = "#f0d48a";
    ctx.beginPath();
    for (var g2 = 0; g2 < gold.length; g2 += 3) { var s2 = 1.4 + gold[g2 + 2] * 1.4; ctx.rect(gold[g2] - s2 / 2, gold[g2 + 1] - s2 / 2, s2, s2); }
    ctx.fill();

    // rim light
    var rim = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
    rim.addColorStop(0, "rgba(240,212,138,.55)"); rim.addColorStop(.5, "rgba(240,212,138,.05)"); rim.addColorStop(1, "rgba(120,160,240,.35)");
    ctx.strokeStyle = rim; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

    // arcs
    var lg = lang();
    ARCS.forEach(function (a) {
      var pts = a.pts, n = pts.length - 1;
      // faint full route
      ctx.lineWidth = 1; ctx.strokeStyle = "rgba(240,212,138,.18)";
      ctx.beginPath(); started = false;
      for (var s = 0; s <= n; s++) {
        var q = proj(pts[s].lon, pts[s].lat, pts[s].alt);
        if (q[3]) { if (!started) { ctx.moveTo(q[0], q[1]); started = true; } else ctx.lineTo(q[0], q[1]); } else started = false;
      }
      ctx.stroke();
      // travelling comet
      var u = reduced ? 1 : ((time + a.offset * a.period) % a.period) / a.period * 1.45;
      var head = Math.min(1, u), tail = Math.max(0, u - 0.42);
      if (head > tail) {
        var h0 = Math.floor(tail * n), h1 = Math.floor(head * n), prev = null;
        for (var s3 = h0; s3 <= h1; s3++) {
          var q3 = proj(pts[s3].lon, pts[s3].lat, pts[s3].alt);
          var cur = q3[3] ? [q3[0], q3[1]] : null;
          if (prev && cur) {
            var f = (s3 - h0) / Math.max(1, h1 - h0);
            ctx.strokeStyle = "rgba(240,212,138," + (0.15 + f * 0.85) + ")";
            ctx.lineWidth = 0.8 + f * 1.8;
            ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(cur[0], cur[1]); ctx.stroke();
          }
          prev = cur;
        }
        if (u < 1 && prev) {
          ctx.fillStyle = "#fff3cf"; ctx.shadowColor = "rgba(240,212,138,.9)"; ctx.shadowBlur = 12;
          ctx.beginPath(); ctx.arc(prev[0], prev[1], 2.4, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
        }
      }
    });

    // markers + labels
    ctx.font = "500 12px Outfit, Anuphan, sans-serif";
    ctx.textBaseline = "middle";
    var all = [ORIGIN].concat(DEST);
    all.forEach(function (c, k) {
      var q = proj(c.lon * D, c.lat * D, 0);
      if (q[2] <= 0.08) return;
      var x = q[0], y = q[1], isO = k === 0;
      var pulse = reduced ? .5 : ((time * 0.6 + k * 0.27) % 1);
      ctx.strokeStyle = "rgba(240,212,138," + (1 - pulse) * 0.8 + ")"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(x, y, (isO ? 6 : 3) + pulse * (isO ? 18 : 11), 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = isO ? "#f0d48a" : "#ffffff";
      ctx.beginPath(); ctx.arc(x, y, isO ? 4.2 : 2.6, 0, Math.PI * 2); ctx.fill();
      if (!isO && R < 190) return;
      var label = c[lg];
      ctx.globalAlpha = Math.min(1, (q[2] - 0.08) * 4);
      ctx.fillStyle = isO ? "#f0d48a" : "rgba(255,255,255,.82)";
      ctx.font = (isO ? "600 13px " : "500 11.5px ") + "Outfit, Anuphan, sans-serif";
      ctx.textAlign = c.al || "left";
      ctx.fillText(label, x + (isO ? 10 : (c.lx != null ? c.lx : 7)), y + (isO ? -10 : (c.ly || 0)));
      ctx.textAlign = "left";
      ctx.globalAlpha = 1;
    });

    // orbit front half + ball in front
    drawOrbit(true, 1);
    if (ballFront) drawBall(ballTh);
  }

  function loop(now) {
    if (!running) return;
    draw(now);
    requestAnimationFrame(loop);
  }
  function start() { if (running || reduced || !visible || document.hidden) return; running = true; requestAnimationFrame(loop); }
  function stop() { running = false; }

  // Interaction
  canvas.addEventListener("pointerdown", function (e) { dragging = true; lastX = e.clientX; lastY = e.clientY; velLam = 0; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener("pointermove", function (e) {
    var r = canvas.getBoundingClientRect();
    hoverX = ((e.clientX - r.left) / r.width - .5) * 2; hoverY = ((e.clientY - r.top) / r.height - .5) * 2;
    if (!dragging) return;
    var dx = e.clientX - lastX, dy = e.clientY - lastY; lastX = e.clientX; lastY = e.clientY;
    velLam = -dx * 0.0042; userLam += velLam;
    userPhi = Math.max(-0.6, Math.min(0.6, userPhi + dy * 0.003));
    if (reduced) draw(performance.now());
  });
  function end() { dragging = false; }
  canvas.addEventListener("pointerup", end);
  canvas.addEventListener("pointercancel", end);
  canvas.addEventListener("pointerleave", function () { hoverX = 0; hoverY = 0; });

  new IntersectionObserver(function (es) { visible = es[0].isIntersecting; visible ? start() : stop(); }).observe(wrap);
  document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
  window.addEventListener("resize", resize);
  window.addEventListener("tg:lang", function () { if (!running) draw(performance.now()); });
  if (document.fonts) document.fonts.ready.then(function () { if (!running) draw(performance.now()); });

  resize();
  start();
})();
