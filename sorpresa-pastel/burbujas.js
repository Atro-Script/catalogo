/* Burbujas de jabón iridiscentes que suben; tócalas para reventarlas. */
(function () {
  var B = [], G = [];
  function nueva(o) { B.push({ x: Math.random() * o.W, y: o.H + 40, r: 10 + Math.random() * 22, vy: -(.3 + Math.random() * .6), p: Math.random() * 6 }); }
  var o = Lienzo.crear(2, function (x, o, t) {
    if (B.length < 12 && Math.random() < .03) nueva(o);
    for (var i = B.length - 1; i >= 0; i--) { var b = B[i]; b.y += b.vy; b.x += Math.sin(t / 900 + b.p) * .5; if (b.y < -60) { B.splice(i, 1); continue; }
      var g = x.createRadialGradient(b.x - b.r * .35, b.y - b.r * .35, b.r * .1, b.x, b.y, b.r); g.addColorStop(0, "rgba(255,255,255,.55)"); g.addColorStop(.7, "rgba(190,225,255,.10)"); g.addColorStop(.92, "rgba(255,180,230,.35)"); g.addColorStop(1, "rgba(180,255,220,.5)");
      x.fillStyle = g; x.beginPath(); x.arc(b.x, b.y, b.r, 0, 6.283); x.fill(); x.strokeStyle = "rgba(255,255,255,.55)"; x.lineWidth = 1.2; x.stroke(); }
    for (i = G.length - 1; i >= 0; i--) { var d = G[i]; d.x += d.vx; d.y += d.vy; d.vy += .12; d.l -= .04; if (d.l <= 0) { G.splice(i, 1); continue; } x.globalAlpha = d.l; x.fillStyle = "rgba(255,255,255,.9)"; x.beginPath(); x.arc(d.x, d.y, 1.8, 0, 6.283); x.fill(); } x.globalAlpha = 1;
  });
  if (o) addEventListener("pointerdown", function (e) { for (var i = B.length - 1; i >= 0; i--) { var b = B[i]; if (Math.hypot(e.clientX - b.x, e.clientY - b.y) < b.r + 14) { for (var k = 0; k < 14; k++) { var a = k / 14 * 6.283; G.push({ x: b.x, y: b.y, vx: Math.cos(a) * 3, vy: Math.sin(a) * 3, l: 1 }); } B.splice(i, 1); if (navigator.vibrate) navigator.vibrate(10); break; } } }, { passive: true });
})();
