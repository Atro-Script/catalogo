/* Lluvia de código verde que se intensifica mientras escaneas la huella. */
(function () {
  var pad = document.getElementById("pad"), nivel = 0, cols = null, o;
  o = Lienzo.crear(1, function (x, o) {
    var cw = 16, n = Math.ceil(o.W / cw); if (!cols || cols.length !== n) cols = Array.from({ length: n }, function () { return Math.random() * o.H; });
    var esc = pad.classList.contains("escaneando"), ok = pad.classList.contains("ok"); nivel += ((esc ? 1 : ok ? 1.6 : 0) - nivel) * .05;
    if (nivel < .02) return; x.font = "14px monospace"; x.shadowColor = "#4df2c8"; x.shadowBlur = 8;
    for (var i = 0; i < n; i++) { if (i % 3 !== 0 && nivel < .9) continue; cols[i] += 4 + nivel * 7; if (cols[i] > o.H + 200) cols[i] = -Math.random() * 300;
      for (var k = 0; k < 9; k++) { x.globalAlpha = Math.max(0, (1 - k / 9)) * .55 * Math.min(1, nivel); x.fillStyle = k ? "#4df2c8" : "#eafff9"; x.fillText(Math.random() < .5 ? "0" : "1", i * cw, cols[i] - k * 16); } }
    x.globalAlpha = 1; x.shadowBlur = 0;
  });
})();
