/* Ecualizador que late al fondo como en un resumen musical; cada toque lo dispara. */
(function () {
  var K = 0, N = 28;
  var o = Lienzo.crear(0, function (x, o, t) {
    K = Math.max(0, K - .02); var w = o.W / N;
    for (var i = 0; i < N; i++) { var a = (Math.sin(t / 380 + i * .6) + Math.sin(t / 230 - i * .9) + 2) / 4, h = o.H * (.06 + .22 * a + .45 * K * Math.abs(Math.sin(i * 1.7 + t / 90)));
      var g = x.createLinearGradient(0, o.H, 0, o.H - h); g.addColorStop(0, "rgba(255,255,255,.28)"); g.addColorStop(1, "rgba(255,255,255,0)"); x.fillStyle = g; x.fillRect(i * w + 2, o.H - h, w - 4, h); }
  });
  if (o) document.addEventListener("pointerdown", function () { K = 1; });
})();
