/* AtroScript · Magia: estrellas con profundidad, estela de chispas, ondas y confeti en un solo canvas.
   Uso: <body data-magia="estrellas estela" data-magia-color="#8fd3ff"> y <script src="../assets/magia.js">.
   Desde el código: Magia.onda(x, y, color), Magia.confeti(), Magia.chispas(x, y, color, n). Respeta «reducir movimiento». */
(function () {
  var b = document.body, rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  var op = (b.dataset.magia || "").split(/\s+/), col = b.dataset.magiaColor || "#ffffff";
  var c = document.createElement("canvas"); c.setAttribute("aria-hidden", "true");
  c.style.cssText = "position:fixed;inset:0;width:100%;height:100%;z-index:3;pointer-events:none;mix-blend-mode:screen";
  b.appendChild(c); var x = c.getContext("2d"), W, H, dpr = Math.min(2, devicePixelRatio || 1);
  function rs() { W = innerWidth; H = innerHeight; c.width = W * dpr; c.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0); }
  rs(); addEventListener("resize", rs);
  var est = [], ch = [], on = [], tx = 0, ty = 0, cx = 0, cy = 0;
  if (op.indexOf("estrellas") >= 0 && !rm) for (var i = 0; i < 90; i++) est.push({ x: Math.random(), y: Math.random(), z: .15 + Math.random() * .85, f: Math.random() * 6 });
  function mover(px, py) { tx = (px / W - .5); ty = (py / H - .5); }
  addEventListener("pointermove", function (e) {
    mover(e.clientX, e.clientY);
    if (op.indexOf("estela") >= 0 && !rm && (e.buttons || e.pointerType !== "touch")) Magia.chispas(e.clientX, e.clientY, col, 2, .6);
  }, { passive: true });
  addEventListener("pointerdown", function (e) { if (op.indexOf("estela") >= 0 && !rm) Magia.chispas(e.clientX, e.clientY, col, 8, 1.4); }, { passive: true });
  addEventListener("deviceorientation", function (e) { if (e.gamma == null) return; tx = Math.max(-.5, Math.min(.5, e.gamma / 60)); ty = Math.max(-.5, Math.min(.5, (e.beta - 40) / 80)); });
  var Magia = window.Magia = {
    chispas: function (px, py, color, n, v) {
      for (var k = 0; k < (n || 10); k++) { var a = Math.random() * 6.283, s = (.4 + Math.random() * 2.4) * (v || 1); ch.push({ x: px, y: py, vx: Math.cos(a) * s, vy: Math.sin(a) * s - .3, l: 1, d: .018 + Math.random() * .03, r: 1 + Math.random() * 2.6, c: color || col }); }
      if (ch.length > 500) ch.splice(0, ch.length - 500);
    },
    onda: function (px, py, color) { if (rm) return; on.push({ x: px == null ? W / 2 : px, y: py == null ? H / 2 : py, r: 8, c: color || col }); Magia.chispas(px == null ? W / 2 : px, py == null ? H / 2 : py, color || col, 34, 3); },
    confeti: function (colores) {
      if (rm) return; var cs = colores || ["#FF5D8F", "#FFB703", "#3FC1C9", "#8E7DFF", "#5BD66A"];
      for (var k = 0; k < 90; k++) ch.push({ x: Math.random() * W, y: -10 - Math.random() * H * .4, vx: (Math.random() - .5) * 1.2, vy: 1.5 + Math.random() * 2.5, l: 1.6, d: .004, r: 3 + Math.random() * 3, c: cs[k % cs.length], q: 1 });
    }
  };
  (function f(t) {
    x.clearRect(0, 0, W, H); cx += (tx - cx) * .06; cy += (ty - cy) * .06;
    est.forEach(function (s) {
      var px = ((s.x + cx * s.z * .25) % 1 + 1) % 1 * W, py = ((s.y + cy * s.z * .25) % 1 + 1) % 1 * H, tw = .5 + .5 * Math.sin(t / 600 + s.f);
      x.globalAlpha = .25 + .6 * tw * s.z; x.fillStyle = col; x.beginPath(); x.arc(px, py, .5 + s.z * 1.6, 0, 6.283); x.fill();
    });
    for (var i = on.length - 1; i >= 0; i--) { var o = on[i]; o.r += 9; var a = 1 - o.r / Math.max(W, H) * 1.1; if (a <= 0) { on.splice(i, 1); continue; } x.globalAlpha = a; x.strokeStyle = o.c; x.lineWidth = 3; x.beginPath(); x.arc(o.x, o.y, o.r, 0, 6.283); x.stroke(); }
    for (var j = ch.length - 1; j >= 0; j--) {
      var p = ch[j]; p.x += p.vx; p.y += p.vy; p.vy += p.q ? .02 : .015; p.l -= p.d; if (p.l <= 0 || p.y > H + 20) { ch.splice(j, 1); continue; }
      x.globalAlpha = Math.min(1, p.l); x.fillStyle = p.c;
      if (p.q) x.fillRect(p.x, p.y, p.r, p.r * .6); else { x.shadowColor = p.c; x.shadowBlur = 8; x.beginPath(); x.arc(p.x, p.y, p.r * p.l, 0, 6.283); x.fill(); x.shadowBlur = 0; }
    }
    x.globalAlpha = 1; requestAnimationFrame(f);
  })(0);
})();
