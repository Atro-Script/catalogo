(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  const texto = d.parrafos.join("\n\n");
  let i = 0, t = null, corriendo = false, listo = false, sonido = true, ac = null, clic = null;
  document.title = "Una carta para " + d.para;
  $("fecha").textContent = d.fecha; $("saludo").textContent = d.saludo; $("despedida").textContent = d.despedida; $("firma").textContent = d.firma; $("inicial").textContent = d.inicial;
  function audio() {
    if (!ac) { const A = window.AudioContext || window.webkitAudioContext; if (A) { ac = new A(); const n = Math.floor(ac.sampleRate * .03); clic = ac.createBuffer(1, n, ac.sampleRate); const x = clic.getChannelData(0); for (let k = 0; k < n; k++) x[k] = (Math.random() * 2 - 1) * Math.pow(1 - k / n, 3); } }
    if (ac && ac.state === "suspended") ac.resume();
  }
  function tic() { if (!ac || !sonido || !clic) return; const s = ac.createBufferSource(), g = ac.createGain(), f = ac.createBiquadFilter(); f.type = "highpass"; f.frequency.value = 1400; g.gain.value = .05 + Math.random() * .03; s.buffer = clic; s.playbackRate.value = .85 + Math.random() * .4; s.connect(f); f.connect(g); g.connect(ac.destination); s.start(); }
  function retraso(c) { const base = d.velocidad || 42; let m = base * (.65 + Math.random() * .7); if (".!?…".includes(c)) m += 480; else if (",;:".includes(c)) m += 190; else if (c === "\n") m += 380; return m; }
  function paso() {
    if (!corriendo) return;
    if (i >= texto.length) { terminar(); return; }
    const c = texto[i++]; $("escrito").textContent += c; if (c.trim()) tic();
    $("hoja").scrollIntoView && 0; t = setTimeout(paso, retraso(c));
  }
  function terminar() {
    clearTimeout(t); corriendo = false; i = texto.length; $("escrito").textContent = texto; $("pluma").hidden = true;
    if (!listo) { listo = true; $("cierre").hidden = false; setTimeout(() => { $("sello").hidden = false; }, 900); }
    $("escribir").textContent = "Escribirla otra vez"; $("terminar").hidden = true;
  }
  function empezar() {
    audio();
    if (listo) { listo = false; i = 0; $("escrito").textContent = ""; $("cierre").hidden = true; $("sello").hidden = true; $("pluma").hidden = false; }
    if (corriendo) { corriendo = false; clearTimeout(t); $("escribir").textContent = "Seguir escribiendo"; return; }
    corriendo = true; $("escribir").textContent = "Pausar"; $("terminar").hidden = false; paso();
  }
  $("escribir").onclick = empezar; $("terminar").onclick = terminar;
  $("sonido").onclick = () => { sonido = !sonido; $("sonido").setAttribute("aria-pressed", String(sonido)); $("sonido").textContent = "Sonido: " + (sonido ? "sí" : "no"); };
})();
