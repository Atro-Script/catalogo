/* Pisadas luminosas que caminan por la pantalla mientras bajas por la historia. */
(function () {
  var F = [], ult = scrollY, dist = 0, lado = 1, col = "#FFD27A";
  var o = Lienzo.crear(2, function (x, o) {
    var dy = scrollY - ult; ult = scrollY; dist += Math.abs(dy);
    if (dist > 95) { dist = 0; lado = -lado; F.push({ x: o.W * (.5 + lado * .13), y: o.H * .72, l: 1, a: lado * .15 + (dy < 0 ? 3.14 : 0) }); }
    for (var i = F.length - 1; i >= 0; i--) { var f = F[i]; f.y -= dy; f.l -= .006; if (f.l <= 0) { F.splice(i, 1); continue; } x.save(); x.translate(f.x, f.y); x.rotate(f.a); x.globalAlpha = f.l * .8; x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 14;
      x.beginPath(); x.ellipse(0, 6, 7, 9, 0, 0, 6.283); x.fill(); [[-9, -6], [-3, -12], [4, -12], [10, -6]].forEach(function (p) { x.beginPath(); x.ellipse(p[0], p[1], 2.8, 3.8, 0, 0, 6.283); x.fill(); }); x.restore(); }
    x.globalAlpha = 1; x.shadowBlur = 0;
  });
})();
