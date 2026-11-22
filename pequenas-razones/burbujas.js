/* Corazoncitos que suben como burbujas del frasco; al sacar una razón sale una oleada. */
(function () {
  var H = [], fr = document.getElementById("frasco"); if (!fr) return;
  function nuevo(burst) { var r = fr.getBoundingClientRect(); H.push({ x: r.left + r.width * (.25 + Math.random() * .5), y: r.top + r.height * .2, s: 5 + Math.random() * 9, vy: -(.5 + Math.random() * (burst ? 2.4 : 1.1)), p: Math.random() * 6, l: 1, c: ["#ff7aa8", "#ffb3cf", "#ffd6e5"][Math.floor(Math.random() * 3)] }); }
  var o = Lienzo.crear(4, function (x, o, t) {
    if (Math.random() < .09) nuevo(false);
    for (var i = H.length - 1; i >= 0; i--) { var h = H[i]; h.y += h.vy; h.x += Math.sin(t / 400 + h.p) * .6; h.l -= .006; if (h.l <= 0) { H.splice(i, 1); continue; }
      x.save(); x.translate(h.x, h.y); x.scale(h.s / 10, h.s / 10); x.globalAlpha = h.l * .85; x.fillStyle = h.c; x.shadowColor = h.c; x.shadowBlur = 12; x.beginPath(); x.moveTo(0, 4); x.bezierCurveTo(-10, -4, -5, -11, 0, -5); x.bezierCurveTo(5, -11, 10, -4, 0, 4); x.fill(); x.restore(); }
    x.globalAlpha = 1; x.shadowBlur = 0;
  });
  if (o) { var s = function () { for (var i = 0; i < 22; i++) setTimeout(function () { nuevo(true); }, i * 25); }; fr.addEventListener("click", s); var b = document.getElementById("sacar"); b && b.addEventListener("click", s); }
})();
