/* Rayo de luz con motas de polvo dorado que se dispersan al voltear una página. */
(function () {
  var M = [];
  for (var i = 0; i < 70; i++) M.push({ x: Math.random(), y: Math.random(), s: .6 + Math.random() * 1.8, v: .0002 + Math.random() * .0006, p: Math.random() * 6, vx: 0, vy: 0 });
  var o = Lienzo.crear(1, function (x, o, t) {
    var g = x.createLinearGradient(o.W * .1, 0, o.W * .7, o.H); g.addColorStop(0, "rgba(255,225,160,.20)"); g.addColorStop(1, "rgba(255,225,160,0)");
    x.fillStyle = g; x.beginPath(); x.moveTo(o.W * .05, 0); x.lineTo(o.W * .4, 0); x.lineTo(o.W * .95, o.H); x.lineTo(o.W * .45, o.H); x.closePath(); x.fill();
    M.forEach(function (m) { m.x += m.vx + Math.sin(t / 1500 + m.p) * .0002; m.y += m.v + m.vy; m.vx *= .96; m.vy *= .96; if (m.y > 1.05) m.y = -.05; if (m.x < -.05) m.x = 1.05; if (m.x > 1.05) m.x = -.05;
      var px = m.x * o.W, py = m.y * o.H, dentro = Math.abs((px / o.W) - (.05 + py / o.H * .55)) < .3; x.globalAlpha = dentro ? .8 : .25; x.fillStyle = "#FFE1A0"; x.shadowColor = "#FFD27A"; x.shadowBlur = 6; x.beginPath(); x.arc(px, py, m.s, 0, 6.283); x.fill(); });
    x.globalAlpha = 1; x.shadowBlur = 0;
  });
  if (o) document.addEventListener("click", function (e) { if (e.target.closest("#ant, #sig")) M.forEach(function (m) { var a = Math.random() * 6.283; m.vx = Math.cos(a) * .01; m.vy = Math.sin(a) * .01 - .004; }); });
})();
