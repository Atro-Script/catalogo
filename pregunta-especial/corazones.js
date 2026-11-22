/* Fuegos artificiales en forma de corazón cuando llega el «Sí». */
(function () {
  var P = [], fin = document.getElementById("final"); if (!fin) return;
  var o = Lienzo.crear(40, function (x, o) {
    for (var i = P.length - 1; i >= 0; i--) { var p = P[i]; if (p.d > 0) { p.d--; continue; } p.k = Math.min(1, p.k + .035); var e = 1 - Math.pow(1 - p.k, 3); p.x = p.cx + p.hx * e * p.s; p.y = p.cy + p.hy * e * p.s + (p.k >= 1 ? (p.g += .04) * 6 : 0); if (p.k >= 1) p.l -= .018; if (p.l <= 0) { P.splice(i, 1); continue; } x.globalAlpha = p.l; x.fillStyle = p.c; x.shadowColor = p.c; x.shadowBlur = 10; x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.283); x.fill(); }
    x.globalAlpha = 1; x.shadowBlur = 0;
  });
  if (!o) return;
  function corazon(cx, cy, s, c, d) { for (var i = 0; i < 70; i++) { var a = i / 70 * 6.283; P.push({ cx: cx, cy: cy, hx: 16 * Math.pow(Math.sin(a), 3), hy: -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)), s: s, k: 0, g: 0, l: 1, r: 2.2, c: c, d: d, x: cx, y: cy }); } }
  var hecho = false;
  new MutationObserver(function () {
    if (hecho || fin.hidden || getComputedStyle(fin).display === "none") return; hecho = true;
    var W = innerWidth, H = innerHeight, cs = ["#ff5a8a", "#ffd166", "#ffffff", "#ff8fb1"];
    [[.5, .3, 12], [.25, .22, 7], [.75, .24, 7], [.5, .5, 9], [.2, .5, 5], [.8, .52, 5]].forEach(function (a, i) { corazon(W * a[0], H * a[1], a[2], cs[i % 4], i * 18); });
    if (navigator.vibrate) navigator.vibrate([40, 30, 80]);
  }).observe(fin, { attributes: true, attributeFilter: ["hidden", "class", "style"] });
})();
