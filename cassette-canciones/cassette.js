(function () {
  "use strict";
  var d = window.DATOS, $ = function (id) { return document.getElementById(id); }, rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  var root = document.documentElement.style;
  if (d.colores) { root.setProperty("--casete", d.colores.casete); root.setProperty("--flor", d.colores.flor); root.setProperty("--papel", d.colores.papel); }
  document.title = d.titulo + " · para " + d.para;

  /* ---------- texto de la página ---------- */
  $("paraSobre").textContent = "Para " + d.para; $("tocaSobre").textContent = d.sobre;
  $("meta").textContent = "Para " + d.para + " · De " + d.de; $("titulo").textContent = d.titulo; $("etq").textContent = d.titulo;
  $("firma").textContent = d.firma;
  d.nota.forEach(function (t) { var p = document.createElement("p"); p.textContent = t; $("notaTxt").append(p); });
  function minis(g, cx, cy) {
    var s = ""; for (var i = 0; i < 5; i++) s += '<ellipse cx="' + cx + '" cy="' + (cy - 6) + '" rx="3.4" ry="5.2" transform="rotate(' + i * 72 + " " + cx + " " + cy + ')" fill="' + d.colores.flor + '"/>';
    g.innerHTML = s + '<circle cx="' + cx + '" cy="' + cy + '" r="2.4" fill="#e9c46a"/><path d="M' + cx + " " + (cy + 4) + " q4 8 12 10" + '" stroke="#6f8a5a" fill="none" stroke-width="1.3"/>';
  }
  minis($("flor1"), 40, 100); minis($("flor2"), 280, 100);

  /* ---------- ramo de flores que cubre la pantalla ---------- */
  var cv = $("flores"), cx = cv.getContext("2d"), COL = ["#f4a6b4", "#fbd5d0", "#fff1e6", "#e8798f", "#f8c1c9", "#d94f6a", "#ffe3d6"];
  function flor(x, y, r, col, rot, k) {
    var n = 7 + Math.floor(k * 3) % 3, e = r * (k < .99 ? k : 1);
    cx.save(); cx.translate(x, y); cx.rotate(rot);
    for (var i = 0; i < n; i++) { cx.save(); cx.rotate(i * 2 * Math.PI / n); cx.fillStyle = col; cx.globalAlpha = .96; cx.beginPath(); cx.ellipse(0, -e * .55, e * .34, e * .62, 0, 0, 7); cx.fill(); cx.strokeStyle = "rgba(160,60,80,.18)"; cx.lineWidth = 1; cx.stroke(); cx.restore(); }
    cx.fillStyle = "#e9b44c"; cx.beginPath(); cx.arc(0, 0, e * .16, 0, 7); cx.fill(); cx.restore();
  }
  function florecer(listo) {
    var W = cv.width = innerWidth * (devicePixelRatio > 1.5 ? 1.5 : 1), H = cv.height = innerHeight * (devicePixelRatio > 1.5 ? 1.5 : 1), fl = [], tam = Math.max(W, H) / 7;
    for (var i = 0; i < 90; i++) fl.push({ x: Math.random() * W, y: Math.random() * H, r: tam * (.6 + Math.random() * .9), c: COL[i % COL.length], rot: Math.random() * 6, t0: (i / 90) * 900 });
    cv.classList.remove("sale"); cv.classList.add("on");
    var ini = performance.now(), lanzado = false;
    (function paso(t) {
      var ms = t - ini; cx.fillStyle = "#e9a9b4"; cx.fillRect(0, 0, W, H);
      fl.forEach(function (f) { var k = Math.max(0, Math.min(1, (ms - f.t0) / 480)); if (k > 0) { var e = 1 + 1.7 * Math.pow(k - 1, 3) + .7 * Math.pow(k - 1, 2); flor(f.x, f.y, f.r, f.c, f.rot, e > 1 ? 1 : Math.max(0, e)); } });
      if (ms > 1500 && !lanzado) { lanzado = true; listo(); }
      if (ms < 2900) requestAnimationFrame(paso); else cv.classList.remove("on");
    })(ini);
  }

  /* ---------- sobre ---------- */
  $("sobre").onclick = function () {
    var s = $("sobre"); s.disabled = true; s.classList.add("abre"); tono(523, .5, .03); setTimeout(function () { tono(784, .6, .03); }, 140);
    setTimeout(function () {
      if (rm) { mostrar(); return; }
      florecer(function () { mostrar(); setTimeout(function () { cv.classList.add("sale"); }, 150); });
    }, 650);
  };
  function mostrar() { $("sobreEsc").hidden = true; $("pagina").hidden = false; scrollTo(0, 0); $("repro").hidden = false; if (d.canciones.length) elegir(0, false); }

  /* ---------- canciones ---------- */
  var ac = null, vivo = 0, tiempos = [], idx = 0, sonando = false, t0 = 0, dur = 0, raf = 0;
  function audio() { if (!ac) { var A = window.AudioContext || window.webkitAudioContext; if (A) ac = new A(); } if (ac && ac.state === "suspended") ac.resume(); return ac; }
  function tono(f, t, v) { var a = audio(); if (!a) return; var o = a.createOscillator(), g = a.createGain(); o.type = "triangle"; o.frequency.value = f; g.gain.setValueAtTime(.0001, a.currentTime); g.gain.linearRampToValueAtTime(v || .08, a.currentTime + .02); g.gain.exponentialRampToValueAtTime(.0001, a.currentTime + t); o.connect(g); g.connect(a.destination); o.start(); o.stop(a.currentTime + t + .05); }
  var C = 261.63, M = function (s) { return C * Math.pow(2, s / 12); };
  var MEL = [
    [0, 0, 7, 7, 9, 9, [7, 2], 5, 5, 4, 4, 2, 2, [0, 2], 7, 7, 5, 5, 4, 4, [2, 2], 7, 7, 5, 5, 4, 4, [2, 2], 0, 0, 7, 7, 9, 9, [7, 2], 5, 5, 4, 4, 2, 2, [0, 2]],
    [4, 4, 5, 7, 7, 5, 4, 2, 0, 0, 2, 4, [4, 1.5], [2, .5], [2, 2], 4, 4, 5, 7, 7, 5, 4, 2, 0, 0, 2, 4, [2, 1.5], [0, .5], [0, 2]],
    [0, 0, [0, 1.5], [2, .5], [4, 2], [4, 1.5], [2, .5], [4, 1.5], [5, .5], [7, 4], 12, 12, 12, 7, 7, 7, 4, 4, 4, 0, 0, 0, [7, 1.5], [5, .5], [4, 1.5], [2, .5], [0, 4]]
  ];
  var tmp = 0, paro = [];
  function limpiarAudio() { paro.forEach(clearTimeout); paro = []; cancelAnimationFrame(raf); }
  function reproducir(i) {
    var c = d.canciones[i]; limpiarAudio(); quitarVideo();
    if (c.youtube) { sonando = true; video(c.youtube); pintar(); return; }
    var seq = MEL[(c.melodia || 0) % MEL.length], beat = .38, tt = 0; dur = 0;
    seq.forEach(function (n) { var s = Array.isArray(n) ? n[0] : n, l = Array.isArray(n) ? n[1] : 1; paro.push(setTimeout(function () { tono(M(s), l * beat * 1.1, .09); tono(M(s - 12), l * beat * 1.4, .035); }, tt * 1000)); tt += l * beat; });
    dur = tt; t0 = performance.now(); sonando = true;
    paro.push(setTimeout(function () { sonando = false; if (idx < d.canciones.length - 1) { elegir(idx + 1, true); } else { pintar(); $("prog").style.width = "100%"; } }, tt * 1000 + 250));
    (function barra() { if (!sonando) return; $("prog").style.width = Math.min(100, (performance.now() - t0) / (dur * 10)) + "%"; raf = requestAnimationFrame(barra); })();
    pintar();
  }
  function pausar() { limpiarAudio(); quitarVideo(); sonando = false; pintar(); }
  function elegir(i, tocar) { idx = i; $("prog").style.width = "0"; if (tocar) reproducir(i); else { pausar(); } textoRepro(); pintar(); }
  function video(v) {
    var m = String(v).match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/), id = m ? m[1] : String(v).trim();
    var f = document.createElement("iframe"); f.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&playsinline=1&rel=0"; f.allow = "autoplay; encrypted-media; picture-in-picture"; f.allowFullscreen = true; f.title = "Video";
    $("video").replaceChildren(f); $("video").hidden = false;
  }
  function quitarVideo() { $("video").replaceChildren(); $("video").hidden = true; }
  function textoRepro() { var c = d.canciones[idx]; $("rT").textContent = c.titulo; $("rA").textContent = c.artista; }
  function pintar() {
    document.body.classList.toggle("play", sonando); $("pp").textContent = sonando ? "❚❚" : "▶";
    [].forEach.call(document.querySelectorAll(".pista"), function (li, k) { li.classList.toggle("on", k === idx && sonando); li.querySelector("button").textContent = (k === idx && sonando) ? "❚❚" : "▶"; });
    $("suena").textContent = sonando ? "Sonando: " + d.canciones[idx].titulo : "Cara A · " + d.canciones.length + " canciones";
  }
  d.canciones.forEach(function (c, i) {
    var li = document.createElement("li"); li.className = "pista";
    li.innerHTML = '<span class="n"></span><span class="t"></span><button type="button"></button>';
    li.querySelector(".n").textContent = ("0" + (i + 1)).slice(-2);
    li.querySelector(".t").textContent = c.titulo; var s = document.createElement("small"); s.textContent = c.artista; li.querySelector(".t").append(s);
    li.querySelector("button").setAttribute("aria-label", "Reproducir " + c.titulo);
    li.querySelector("button").onclick = function () { if (i === idx && sonando) pausar(); else { idx = i; textoRepro(); reproducir(i); } };
    $("pistas").append(li);
  });
  $("pp").onclick = function () { if (sonando) pausar(); else reproducir(idx); };
  $("ant").onclick = function () { elegir((idx + d.canciones.length - 1) % d.canciones.length, true); };
  $("sig").onclick = function () { elegir((idx + 1) % d.canciones.length, true); };
  $("barra").onclick = function (e) { /* la barra solo muestra el avance */ };
})();
