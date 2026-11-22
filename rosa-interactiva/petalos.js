/* Pétalos que se desprenden de la rosa, giran en 3D y caen con vaivén al tocarla. */
(function () {
  var P = [];
  var o = Lienzo.crear(6, function (x, o, t) {
    for (var i = P.length - 1; i >= 0; i--) { var p = P[i]; p.vy += .03; p.vx *= .985; p.x += p.vx + Math.sin(t / 380 + p.f) * .9; p.y += p.vy; p.a += p.w; p.k += .07; if (p.y > o.H + 30) { P.splice(i, 1); continue; }
      x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.scale(1, Math.max(.15, Math.abs(Math.cos(p.k)))); x.globalAlpha = .95; var g = x.createRadialGradient(0, -p.s * .3, 1, 0, 0, p.s); g.addColorStop(0, "#ff5a73"); g.addColorStop(1, "#8f0f2a"); x.fillStyle = g; x.shadowColor = "rgba(255,40,80,.5)"; x.shadowBlur = 8;
      x.beginPath(); x.moveTo(0, -p.s); x.bezierCurveTo(p.s * .9, -p.s * .6, p.s * .8, p.s * .7, 0, p.s); x.bezierCurveTo(-p.s * .8, p.s * .7, -p.s * .9, -p.s * .6, 0, -p.s); x.fill(); x.restore(); }
  });
  if (!o) return;
  function caer(x, y, n) { for (var i = 0; i < n; i++) P.push({ x: x + (Math.random() - .5) * 40, y: y + (Math.random() - .5) * 30, vx: (Math.random() - .5) * 4, vy: -2.5 - Math.random() * 2.5, s: 9 + Math.random() * 9, a: Math.random() * 6, w: (Math.random() - .5) * .14, k: Math.random() * 6, f: Math.random() * 6 }); }
  document.addEventListener("click", function (e) { if (e.target.closest("#roseArea, #yes, #envelope")) caer(e.clientX, e.clientY, 12); });
  var u = 0; addEventListener("pointermove", function (e) { if (e.buttons && e.target.closest && e.target.closest("#roseArea") && ++u % 5 == 0) caer(e.clientX, e.clientY, 2); }, { passive: true });
})();
