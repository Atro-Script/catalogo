/* Interferencia de cinta VHS: barras con color desfasado que cruzan la pantalla al cambiar de canal. */
(function () {
  var G = 0;
  var o = Lienzo.crear(20, function (x, o) {
    if (G <= 0) return; G -= .04; var n = 3 + Math.floor(G * 14);
    for (var i = 0; i < n; i++) { var y = Math.random() * o.H, h = 2 + Math.random() * 26 * G, dx = (Math.random() - .5) * 40 * G;
      x.globalAlpha = .55 * G; x.fillStyle = "#00e5ff"; x.fillRect(dx - 6, y, o.W, h); x.fillStyle = "#ff2d95"; x.fillRect(dx + 6, y + 2, o.W, h); x.globalAlpha = .35 * G; x.fillStyle = "#fff"; x.fillRect(0, y + 1, o.W, Math.max(1, h * .25)); }
    var ty = (1 - G) * o.H; x.globalAlpha = .18 * G; x.fillStyle = "#fff"; x.fillRect(0, ty, o.W, 40); x.globalAlpha = 1;
  });
  if (o) document.addEventListener("click", function (e) { if (e.target.closest("#zap, #mas, #menos")) G = 1; });
})();
