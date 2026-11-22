/* Guirnalda de focos navideños que se persiguen; al abrir una puerta destellan todos. */
(function () {
  var f = 0;
  var o = Lienzo.crear(3, function (x, o, t) {
    f = Math.max(0, f - .015); var cs = ["#ff4d5e", "#ffd166", "#5bd6a0", "#6ab8ff"], n = Math.ceil(o.W / 34) + 1;
    x.strokeStyle = "rgba(255,255,255,.25)"; x.lineWidth = 1.5; x.beginPath();
    for (var i = 0; i <= n; i++) { var px = i * 34, py = 14 + 15 * Math.sin(i * .55); i ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke();
    for (i = 0; i <= n; i++) { px = i * 34; py = 14 + 15 * Math.sin(i * .55); var c = cs[i % 4], on = (Math.sin(t / 260 - i * .7) + 1) / 2, br = Math.min(1, .25 + .75 * on + f);
      x.globalAlpha = br; x.fillStyle = c; x.shadowColor = c; x.shadowBlur = 10 + 14 * br; x.beginPath(); x.ellipse(px, py + 9, 4.2, 6, 0, 0, 6.283); x.fill(); }
    x.globalAlpha = 1; x.shadowBlur = 0;
  });
  if (o) document.addEventListener("click", function (e) { if (e.target.closest("#puertas button")) f = 1; });
})();
