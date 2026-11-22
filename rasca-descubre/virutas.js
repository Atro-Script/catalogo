/* Virutas plateadas al rascar y rayos de luz giratorios al descubrir el premio. */
(function () {
  var cv = document.getElementById("foil"), V = [], rayos = 0, cen = null; if (!cv) return;
  var o = Lienzo.crear(5, function (x, o, t) {
    if (rayos > 0) { rayos -= .006; var R = Math.max(o.W, o.H); x.save(); x.translate(cen[0], cen[1]); x.rotate(t / 1400); x.globalAlpha = Math.min(1, rayos * 1.6) * .35; for (var i = 0; i < 16; i++) { x.rotate(6.283 / 16); var g = x.createLinearGradient(0, 0, R, 0); g.addColorStop(0, "#fff7c2"); g.addColorStop(1, "rgba(255,230,120,0)"); x.fillStyle = g; x.beginPath(); x.moveTo(0, 0); x.lineTo(R, -R * .06); x.lineTo(R, R * .06); x.closePath(); x.fill(); } x.restore(); }
    for (var i = V.length - 1; i >= 0; i--) { var v = V[i]; v.x += v.vx; v.y += v.vy; v.vy += .18; v.a += v.w; v.l -= .02; if (v.l <= 0) { V.splice(i, 1); continue; } x.globalAlpha = v.l; x.fillStyle = v.c; x.save(); x.translate(v.x, v.y); x.rotate(v.a); x.fillRect(-v.s, -1, v.s * 2, 2); x.restore(); }
    x.globalAlpha = 1;
  });
  if (!o) return;
  function chispa(e) { if (e.pointerType === "mouse" && !e.buttons) return; for (var i = 0; i < 3; i++) V.push({ x: e.clientX, y: e.clientY, vx: (Math.random() - .5) * 3, vy: -1 - Math.random() * 2, a: 0, w: (Math.random() - .5) * .5, s: 3 + Math.random() * 4, l: 1, c: ["#e9eef5", "#ffd75e", "#bfc8d6"][i % 3] }); }
  cv.addEventListener("pointermove", chispa);
  new MutationObserver(function () { if (cv.classList.contains("fuera") && !rayos) { var r = (document.getElementById("premio") || cv).getBoundingClientRect(); cen = [r.left + r.width / 2, r.top + r.height / 2]; rayos = 1; for (var i = 0; i < 60; i++) V.push({ x: cen[0], y: cen[1], vx: (Math.random() - .5) * 14, vy: -Math.random() * 12, a: 0, w: .3, s: 4, l: 1.4, c: ["#ffd75e", "#fff", "#ffb703"][i % 3] }); } }).observe(cv, { attributes: true, attributeFilter: ["class"] });
})();
