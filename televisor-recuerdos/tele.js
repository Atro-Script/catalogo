(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  const cv = $("ruido"), cx = cv.getContext("2d");
  let enc = false, ch = 0, ruidoT = null, zapT = null, sonido = true, ac = null, ocupada = false;
  document.title = d.titulo; $("para").textContent = "Para " + d.para;
  function audio() { if (!ac) { const A = window.AudioContext || window.webkitAudioContext; if (A) ac = new A(); } if (ac && ac.state === "suspended") ac.resume(); }
  function sisea(ms, vol) {
    if (!ac || !sonido) return; const n = Math.floor(ac.sampleRate * ms / 1000), b = ac.createBuffer(1, n, ac.sampleRate), x = b.getChannelData(0);
    for (let i = 0; i < n; i++) x[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const s = ac.createBufferSource(), g = ac.createGain(), f = ac.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = 2400; f.Q.value = .4; g.gain.value = vol; s.buffer = b; s.connect(f); f.connect(g); g.connect(ac.destination); s.start();
  }
  function ruido(on) {
    clearInterval(ruidoT); cv.style.opacity = on ? 1 : 0; if (!on) return;
    const draw = () => { const im = cx.createImageData(96, 72), p = im.data; for (let i = 0; i < p.length; i += 4) { const v = 60 + Math.random() * 190; p[i] = v; p[i + 1] = v; p[i + 2] = v; p[i + 3] = 255; } cx.putImageData(im, 0, 0); };
    draw(); ruidoT = setInterval(draw, 70);
  }
  const GR = [["#F4B6C2", "#C75B7A"], ["#9CC9EA", "#3F7FB5"], ["#F2D78A", "#C4932A"], ["#B4DDAE", "#4F9A52"], ["#D2B6F0", "#7A55B8"], ["#F0B58E", "#C0623A"]];
  function mostrar() {
    const c = d.canales[ch], f = $("foto"); f.replaceChildren(); f.style.background = "";
    if (c.foto) { const im = document.createElement("img"); im.src = c.foto; im.alt = c.titulo; f.append(im); } else { f.style.background = "linear-gradient(135deg," + GR[ch % GR.length].join(",") + ")"; const n = document.createElement("span"); n.textContent = String(ch + 1).padStart(2, "0"); f.append(n); }
    $("fecha").textContent = c.fecha; $("titulo").textContent = c.titulo; $("texto").textContent = c.texto; $("canal").hidden = false; $("canal").classList.remove("entra"); void $("canal").offsetWidth; $("canal").classList.add("entra");
    $("osd").textContent = "CH " + String(ch + 1).padStart(2, "0") + " ▶";
  }
  function cambiar(delta) {
    if (!enc || ocupada) return; ocupada = true; ch = (ch + delta + d.canales.length) % d.canales.length;
    $("canal").hidden = true; ruido(true); $("osd").textContent = "CH " + String(ch + 1).padStart(2, "0"); sisea(520, .12);
    setTimeout(() => { ruido(false); mostrar(); ocupada = false; }, 520);
  }
  function encender() {
    audio(); enc = !enc; $("enc").classList.toggle("on", enc); $("enc").setAttribute("aria-pressed", String(enc));
    const p = $("pantalla");
    if (enc) {
      p.classList.remove("apagada"); p.classList.add("encendiendo"); $("apagado").hidden = true; ocupada = true; ruido(true); sisea(900, .14);
      setTimeout(() => { p.classList.remove("encendiendo"); }, 700);
      setTimeout(() => { ruido(false); ch = 0; mostrar(); ocupada = false; }, 1100);
    } else {
      clearInterval(zapT); zapT = null; $("zap").textContent = "Cambiar de canal sola"; ruido(false); $("canal").hidden = true; $("osd").textContent = "";
      p.classList.add("apagada"); $("apagado").hidden = false;
    }
  }
  $("enc").onclick = encender; $("mas").onclick = () => { audio(); cambiar(1); }; $("menos").onclick = () => { audio(); cambiar(-1); };
  $("zap").onclick = () => { if (!enc) encender(); if (zapT) { clearInterval(zapT); zapT = null; $("zap").textContent = "Cambiar de canal sola"; } else { zapT = setInterval(() => cambiar(1), 6500); $("zap").textContent = "Detener"; } };
  $("sonido").onclick = () => { sonido = !sonido; $("sonido").setAttribute("aria-pressed", String(sonido)); $("sonido").textContent = "Sonido: " + (sonido ? "sí" : "no"); };
  document.addEventListener("keydown", e => { if (e.key === "ArrowRight") cambiar(1); if (e.key === "ArrowLeft") cambiar(-1); });
})();
