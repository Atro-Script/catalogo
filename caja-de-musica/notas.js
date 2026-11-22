/* Notas musicales de colores que suben ondulando desde la caja cuando suena. */
(function () {
  var N = [], g = ["♪", "♫", "♩", "♬"], cs = ["#ffd1f0", "#c9e7ff", "#fff0a8", "#d8c9ff"], vivo = 0, esc = document.getElementById("escenario");
  var o = Lienzo.crear(5, function (x, o, t) {
    if (vivo > 0) { vivo--; if (vivo % 7 == 0 && esc) { var r = esc.getBoundingClientRect(); N.push({ x: r.left + r.width * (.3 + Math.random() * .4), y: r.top + r.height * .45, vy: -(.8 + Math.random() * 1.2), p: Math.random() * 6, s: 20 + Math.random() * 18, l: 1, g: g[Math.floor(Math.random() * 4)], c: cs[Math.floor(Math.random() * 4)] }); } }
    for (var i = N.length - 1; i >= 0; i--) { var n = N[i]; n.y += n.vy; n.x += Math.sin(t / 300 + n.p) * 1.1; n.l -= .006; if (n.l <= 0) { N.splice(i, 1); continue; } x.globalAlpha = n.l; x.fillStyle = n.c; x.shadowColor = n.c; x.shadowBlur = 14; x.font = n.s + "px serif"; x.fillText(n.g, n.x, n.y); }
    x.globalAlpha = 1; x.shadowBlur = 0;
  });
  if (o) document.addEventListener("click", function (e) { if (e.target.closest("#abrir, #manivela, #mec, #temas")) vivo = 260; });
  if (o) document.addEventListener("pointermove", function (e) { if (e.buttons && e.target.closest && e.target.closest("#mec, #manivela")) vivo = 120; });
})();
