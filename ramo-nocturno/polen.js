/* Polen luminoso que flota alrededor del ramo; al tocarlo sube una nube de destellos dorados. */
(function () {
  var M = [], r = document.getElementById("ramo");
  function nuevo(f) { var b = r ? r.getBoundingClientRect() : { left: innerWidth * .2, top: innerHeight * .3, width: innerWidth * .6, height: innerHeight * .4 }; M.push({ x: b.left + Math.random() * b.width, y: b.top + b.height * (.3 + Math.random() * .6), vy: -(.15 + Math.random() * (f ? 1.6 : .5)), p: Math.random() * 6, s: .8 + Math.random() * 2.2, l: 1, c: Math.random() < .5 ? "#FFE9A0" : "#d9b8ff" }); }
  var o = Lienzo.crear(3, function (x, o, t) {
    if (Math.random() < .25) nuevo(false);
    for (var i = M.length - 1; i >= 0; i--) { var m = M[i]; m.y += m.vy; m.x += Math.sin(t / 700 + m.p) * .5; m.l -= .004; if (m.l <= 0) { M.splice(i, 1); continue; } x.globalAlpha = m.l * (.5 + .5 * Math.sin(t / 200 + m.p)); x.fillStyle = m.c; x.shadowColor = m.c; x.shadowBlur = 12; x.beginPath(); x.arc(m.x, m.y, m.s, 0, 6.283); x.fill(); }
    x.globalAlpha = 1; x.shadowBlur = 0;
  });
  if (o && r) r.addEventListener("click", function () { for (var i = 0; i < 40; i++) nuevo(true); });
})();
