/* Anillos de sonar al tocar un lugar del mapa. */
(function () {
  var R = [], cs = "#8a5a2b";
  var o = Lienzo.crear(5, function (x, o) { for (var i = R.length - 1; i >= 0; i--) { var r = R[i]; r.r += 2.2; r.l -= .018; if (r.l <= 0) { R.splice(i, 1); continue; } x.globalAlpha = r.l * .8; x.strokeStyle = r.c; x.lineWidth = 2.5; x.setLineDash([6, 5]); x.beginPath(); x.arc(r.x, r.y, r.r, 0, 6.283); x.stroke(); } x.globalAlpha = 1; x.setLineDash([]); });
  if (!o) return;
  function sonar(x, y) { for (var i = 0; i < 3; i++) setTimeout(function () { R.push({ x: x, y: y, r: 6, l: 1, c: i % 2 ? "#E0A84F" : cs }); }, i * 160); }
  document.addEventListener("click", function (e) { if (e.target.closest("#mapa, #siguiente")) sonar(e.clientX, e.clientY); });
})();
