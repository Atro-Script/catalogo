/* Flash de cámara instantánea con fuga de luz cálida y «clic» al pasar de foto. */
(function () {
  var F = 0, ac;
  var o = Lienzo.crear(50, function (x, o) {
    if (F <= 0) return; F -= .045; x.globalAlpha = Math.max(0, F) * .9; x.fillStyle = "#fff"; x.fillRect(0, 0, o.W, o.H);
    var g = x.createLinearGradient(o.W * (1 - F), 0, o.W * (1 - F) + o.W * .6, o.H); g.addColorStop(0, "rgba(255,150,60,0)"); g.addColorStop(.5, "rgba(255,150,60,.55)"); g.addColorStop(1, "rgba(255,80,120,0)"); x.globalAlpha = Math.max(0, F); x.fillStyle = g; x.fillRect(0, 0, o.W, o.H); x.globalAlpha = 1;
  });
  function clic() { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); ac.resume(); var n = ac.sampleRate * .06, b = ac.createBuffer(1, n, ac.sampleRate), d = b.getChannelData(0); for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3) * .5; var s = ac.createBufferSource(); s.buffer = b; s.connect(ac.destination); s.start(); } catch (e) {} }
  if (o) document.addEventListener("click", function (e) { if (e.target.closest("#ant, #sig, #puntos")) { F = 1; clic(); } });
})();
