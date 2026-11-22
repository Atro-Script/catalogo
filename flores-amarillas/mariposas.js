/* Mariposas amarillas que revolotean y se acercan a tu dedo. */
(function () {
  var B = [], mx = null, my = null;
  for (var i = 0; i < 7; i++) B.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, a: Math.random() * 6, v: 1 + Math.random(), f: Math.random() * 6, s: .7 + Math.random() * .6 });
  var o = Lienzo.crear(4, function (x, o, t) {
    B.forEach(function (b) {
      var da = Math.sin(t / 500 + b.f) * .08; if (mx !== null) { var ta = Math.atan2(my - b.y, mx - b.x), d = ((ta - b.a + 9.42) % 6.283) - 3.1416; b.a += d * .03; } else b.a += da + Math.sin(t / 1100 + b.f) * .03;
      b.x += Math.cos(b.a) * b.v; b.y += Math.sin(b.a) * b.v; if (b.x < -40) b.x = o.W + 30; if (b.x > o.W + 40) b.x = -30; if (b.y < -40) b.y = o.H + 30; if (b.y > o.H + 40) b.y = -30;
      var w = Math.abs(Math.sin(t / 90 + b.f)); x.save(); x.translate(b.x, b.y); x.rotate(b.a + 1.57); x.scale(b.s, b.s); x.shadowColor = "#FFD84D"; x.shadowBlur = 14; x.fillStyle = "#FFD84D";
      [[-1, 0], [1, 0]].forEach(function (s) { x.beginPath(); x.ellipse(s[0] * 9 * w, -4, 9 * Math.max(.2, w), 13, s[0] * .5, 0, 6.283); x.fill(); x.beginPath(); x.ellipse(s[0] * 6 * w, 8, 6 * Math.max(.2, w), 8, -s[0] * .5, 0, 6.283); x.fill(); });
      x.fillStyle = "#7a4a00"; x.beginPath(); x.ellipse(0, 2, 2, 11, 0, 0, 6.283); x.fill(); x.restore(); });
    x.shadowBlur = 0;
  });
  if (o) { addEventListener("pointermove", function (e) { mx = e.clientX; my = e.clientY; }, { passive: true }); addEventListener("pointerup", function () { setTimeout(function () { mx = my = null; }, 1800); }); }
})();
