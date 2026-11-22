/* Serpentinas de colores que salen disparadas de la caja al abrirla y caen enroscándose. */
(function () {
  var S = [], cs = ["#FF5D8F", "#FFB703", "#3FC1C9", "#8E7DFF", "#5BD66A", "#FF8A3D"];
  var o = Lienzo.crear(7, function (x, o) {
    for (var i = S.length - 1; i >= 0; i--) { var s = S[i]; s.vy += .13; s.vx *= .992; s.x += s.vx; s.y += s.vy; s.age++; s.t.push([s.x, s.y]); if (s.t.length > 34) s.t.shift(); if (s.y > o.H + 80 && s.t[0][1] > o.H + 80) { S.splice(i, 1); continue; }
      x.strokeStyle = s.c; x.lineWidth = 5; x.lineCap = "round"; x.globalAlpha = .95; x.beginPath();
      s.t.forEach(function (p, j) { var w = Math.sin(j * .7 + s.age * .1) * 9 * (j / s.t.length); j ? x.lineTo(p[0] + w, p[1]) : x.moveTo(p[0] + w, p[1]); }); x.stroke(); }
    x.globalAlpha = 1;
  });
  var b = document.getElementById("abrir"), c = document.getElementById("cubo"); if (!o || !b) return;
  b.addEventListener("click", function () { var r = (c || b).getBoundingClientRect(); for (var i = 0; i < 34; i++) { var a = -1.57 + (Math.random() - .5) * 1.7, v = 9 + Math.random() * 9; S.push({ x: r.left + r.width / 2, y: r.top + r.height * .3, vx: Math.cos(a) * v, vy: Math.sin(a) * v, c: cs[i % 6], t: [], age: Math.random() * 20 }); } if (navigator.vibrate) navigator.vibrate([20, 30, 60]); });
})();
