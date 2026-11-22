/* El avión cruza la pantalla dejando estela de nubes y líneas de velocidad al revelar el destino. */
(function () {
  var b = document.getElementById("revelar"), T = 0, N = [], DUR = 2600; if (!b) return;
  var o = Lienzo.crear(30, function (x, o, t) {
    if (!T) return; var k = Math.min(1, (t - T) / DUR); if (k >= 1 && !N.length) { T = 0; return; }
    var px = -.1 * o.W + k * 1.2 * o.W, py = o.H * (.78 - .5 * Math.sin(k * Math.PI * .5) - .05 * Math.sin(k * 9)), a = -.42 + .5 * k;
    if (k < 1 && Math.random() < .8) N.push({ x: px - 20, y: py, r: 6 + Math.random() * 8, l: 1, vy: (Math.random() - .5) * .3 });
    for (var i = N.length - 1; i >= 0; i--) { var n = N[i]; n.r += .35; n.l -= .012; n.y += n.vy; if (n.l <= 0) { N.splice(i, 1); continue; } x.globalAlpha = n.l * .55; x.fillStyle = "#fff"; x.beginPath(); x.arc(n.x, n.y, n.r, 0, 6.283); x.fill(); }
    if (k < 1) { x.globalAlpha = .5; x.strokeStyle = "#fff"; x.lineWidth = 2; for (var j = 0; j < 4; j++) { x.beginPath(); x.moveTo(px - 60 - j * 30, py + 20 + j * 10); x.lineTo(px - 140 - j * 40, py + 30 + j * 12); x.stroke(); }
      x.save(); x.translate(px, py); x.rotate(a); x.globalAlpha = 1; x.fillStyle = "#fff"; x.shadowColor = "rgba(20,60,130,.7)"; x.shadowBlur = 16; x.beginPath(); x.moveTo(30, 0); x.quadraticCurveTo(10, -7, -22, -5); x.lineTo(-30, -16); x.lineTo(-22, -16); x.lineTo(-14, -5); x.lineTo(-14, 5); x.lineTo(-22, 16); x.lineTo(-30, 16); x.lineTo(-22, 5); x.quadraticCurveTo(10, 7, 30, 0); x.fill(); x.beginPath(); x.moveTo(6, -4); x.lineTo(-8, -26); x.lineTo(-2, -26); x.lineTo(14, -4); x.moveTo(6, 4); x.lineTo(-8, 26); x.lineTo(-2, 26); x.lineTo(14, 4); x.fill(); x.restore(); }
    x.globalAlpha = 1; x.shadowBlur = 0;
  });
  if (o) b.addEventListener("click", function () { T = performance.now(); });
})();
