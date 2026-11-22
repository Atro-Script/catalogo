/* Brasas rojas en la punta del hilo mientras lo arrastras. */
(function () {
  var E = [];
  var o = Lienzo.crear(8, function (x) {
    for (var i = E.length - 1; i >= 0; i--) { var e = E[i]; e.x += e.vx; e.y += e.vy; e.vy -= .015; e.l -= .025; if (e.l <= 0) { E.splice(i, 1); continue; } x.globalAlpha = e.l; x.fillStyle = e.l > .6 ? "#fff1c9" : "#ff3b5c"; x.shadowColor = "#ff1744"; x.shadowBlur = 12; x.beginPath(); x.arc(e.x, e.y, e.r * e.l + .5, 0, 6.283); x.fill(); }
    x.globalAlpha = 1; x.shadowBlur = 0;
  });
  if (o) addEventListener("pointermove", function (e) { if (e.pointerType === "mouse" && !e.buttons) return; for (var i = 0; i < 3; i++) E.push({ x: e.clientX, y: e.clientY, vx: (Math.random() - .5) * 1.4, vy: -Math.random() * 1.6, r: 1 + Math.random() * 2.4, l: 1 }); }, { passive: true });
})();
