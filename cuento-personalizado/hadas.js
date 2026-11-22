/* Polvo de hadas: estrellitas de cuatro puntas siguen tu dedo; al empezar el cuento estalla una lluvia de estrellas. */
(function () {
  var S = [], cs = ["#ffd6f5", "#cfe8ff", "#fff3b0", "#d9ccff"];
  function est(x, y, v, n) { for (var i = 0; i < n; i++) { var a = Math.random() * 6.283, s = Math.random() * v; S.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - .2, r: 3 + Math.random() * 6, a: Math.random() * 3, w: (Math.random() - .5) * .1, l: 1, c: cs[i % 4] }); } }
  var o = Lienzo.crear(4, function (x, o) {
    for (var i = S.length - 1; i >= 0; i--) { var s = S[i]; s.x += s.vx; s.y += s.vy; s.vy += .02; s.a += s.w; s.l -= .014; if (s.l <= 0) { S.splice(i, 1); continue; }
      x.save(); x.translate(s.x, s.y); x.rotate(s.a); x.globalAlpha = s.l; x.fillStyle = s.c; x.shadowColor = s.c; x.shadowBlur = 12; x.beginPath();
      for (var k = 0; k < 4; k++) { x.rotate(1.5708); x.moveTo(0, 0); x.quadraticCurveTo(s.r * .25, s.r * .25, 0, s.r); x.quadraticCurveTo(-s.r * .25, s.r * .25, 0, 0); } x.fill(); x.restore(); }
    x.globalAlpha = 1; x.shadowBlur = 0;
  });
  if (!o) return;
  addEventListener("pointermove", function (e) { if (e.pointerType === "mouse" || e.buttons) est(e.clientX, e.clientY, 1.2, 2); }, { passive: true });
  document.addEventListener("click", function (e) { if (e.target.closest("#empezar")) est(innerWidth / 2, innerHeight / 2, 9, 60); else if (e.target.closest("#opciones button")) est(e.clientX, e.clientY, 4, 22); });
})();
