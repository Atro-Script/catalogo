/* Dos luces, una rosa y una dorada, recorren el contorno de un corazón desde lados opuestos hasta encontrarse. */
(function () {
  var N = 90, tr = [[], []];
  var o = Lienzo.crear(1, function (x, o, t) {
    var cx = o.W / 2, cy = o.H * .34, s = Math.min(o.W, o.H) / 46, cols = ["#ff6f9c", "#ffd27a"];
    for (var q = 0; q < 2; q++) {
      var a = (t / 2600) % 1 * 6.283 + q * 3.1416, px = cx + 16 * Math.pow(Math.sin(a), 3) * s, py = cy - (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) * s;
      tr[q].push([px, py]); if (tr[q].length > N) tr[q].shift();
      tr[q].forEach(function (p, i) { var k = i / tr[q].length; x.globalAlpha = k * .55; x.fillStyle = cols[q]; x.shadowColor = cols[q]; x.shadowBlur = 12; x.beginPath(); x.arc(p[0], p[1], 1 + k * 3.2, 0, 6.283); x.fill(); });
    }
    x.globalAlpha = 1; x.shadowBlur = 0;
  });
})();
