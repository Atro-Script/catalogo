/* Aurora cálida que ondula en el cielo y brasas que suben al soltar un farol. */
(function () {
  var B = [], cols = ["255,170,60", "255,110,140", "150,110,255"];
  var o = Lienzo.crear(0, function (x, o, t) {
    cols.forEach(function (c, i) {
      var g = x.createLinearGradient(0, o.H * .2, 0, o.H * .75); g.addColorStop(0, "rgba(" + c + ",0)"); g.addColorStop(.5, "rgba(" + c + ",.16)"); g.addColorStop(1, "rgba(" + c + ",0)");
      x.fillStyle = g; x.beginPath(); x.moveTo(0, o.H);
      for (var px = 0; px <= o.W; px += 12) x.lineTo(px, o.H * (.42 + i * .07) + Math.sin(px / 90 + t / (1700 + i * 500) + i * 2) * 34 + Math.sin(px / 41 - t / 900) * 9);
      x.lineTo(o.W, o.H); x.closePath(); x.fill();
    });
    for (var i = B.length - 1; i >= 0; i--) { var b = B[i]; b.x += b.vx + Math.sin(t / 200 + b.p) * .4; b.y += b.vy; b.l -= .007; if (b.l <= 0) { B.splice(i, 1); continue; } x.globalAlpha = b.l * (.6 + .4 * Math.sin(t / 60 + b.p)); x.fillStyle = "#FFB347"; x.shadowColor = "#FF8A1F"; x.shadowBlur = 10; x.beginPath(); x.arc(b.x, b.y, b.r, 0, 6.283); x.fill(); }
    x.globalAlpha = 1; x.shadowBlur = 0;
  });
  var s = document.getElementById("soltar"); if (!o || !s) return;
  s.addEventListener("click", function () { var r = s.getBoundingClientRect(); for (var i = 0; i < 40; i++) B.push({ x: r.left + r.width / 2 + (Math.random() - .5) * r.width, y: r.top, vx: (Math.random() - .5) * 1.4, vy: -.8 - Math.random() * 2.2, r: 1 + Math.random() * 2.2, l: 1, p: Math.random() * 6 }); });
})();
