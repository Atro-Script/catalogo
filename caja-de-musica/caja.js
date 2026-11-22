(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  const NOTAS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const midi = n => { const m = String(n).match(/^([A-G])([#b]?)(\d)$/); return m ? 12 * (+m[3] + 1) + NOTAS[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0) : 60; };
  const freq = m => 440 * Math.pow(2, (m - 69) / 12);
  const VUELTA = 6, ANTES = -1.5;
  const canciones = d.canciones || [{ nombre: d.titulo, melodia: d.melodia }];
  let ev = [], fin = 0, cols = [], vib = [], flotan = [], tocadas = 0, msgAt = [];
  const mensajes = d.mensajes || [];
  let actual = 0, pos = ANTES, auto = false, ac = null, ang = 0, ultimo = null, terminado = false, previo = 0;

  document.title = d.titulo + " | " + d.grabado;
  $("grabado").textContent = d.grabado; $("dedica").textContent = d.dedicatoria;
  document.documentElement.style.setProperty("--madera", d.colorMadera); document.documentElement.style.setProperty("--laton", d.colorLaton);

  function cargar(i) {
    actual = i; let t = 0;
    ev = canciones[i].melodia.map(([n, dur]) => { const e = { n, m: midi(n), t, hecho: false }; t += dur; return e; });
    fin = t + .6; cols = [...new Set(ev.map(e => e.m))].sort((a, b) => a - b); vib = cols.map(() => 0); flotan = [];
    msgAt = mensajes.map((m, k) => Math.round((k + 1) * ev.length / (mensajes.length + 1)));
    [...$("temas").children].forEach((b, k) => { b.classList.toggle("on", k === i); b.setAttribute("aria-pressed", String(k === i)); });
    reiniciar();
  }
  canciones.forEach((c, i) => { const b = document.createElement("button"); b.type = "button"; b.className = "tema"; b.textContent = c.nombre; b.onclick = () => { audio(); cargar(i); }; $("temas").append(b); });
  $("temas").hidden = canciones.length < 2;

  function audio() { if (!ac) { const A = window.AudioContext || window.webkitAudioContext; if (A) ac = new A(); } if (ac && ac.state === "suspended") ac.resume(); }
  function sonar(m) {
    if (!ac) return; const f = freq(m), t0 = ac.currentTime;
    [[1, .5, 1.7], [2.76, .12, .55], [5.4, .05, .28]].forEach(([r, g, dur]) => {
      const o = ac.createOscillator(), v = ac.createGain(); o.type = "sine"; o.frequency.value = f * r;
      v.gain.setValueAtTime(0, t0); v.gain.linearRampToValueAtTime(g, t0 + .005); v.gain.exponentialRampToValueAtTime(.0008, t0 + dur);
      o.connect(v); v.connect(ac.destination); o.start(t0); o.stop(t0 + dur + .05);
    });
  }
  function avanzar(delta) {
    if (terminado || delta <= 0) return;
    pos = Math.min(fin, pos + delta);
    ev.forEach(e => { if (!e.hecho && e.t <= pos) { e.hecho = true; const c = cols.indexOf(e.m); vib[c] = 1; flotan.push({ c, y: 0, a: 1, dx: (Math.random() - .5) * 18 }); sonar(e.m); tocadas++; const k = msgAt.indexOf(tocadas); if (k >= 0) saleMensaje(mensajes[k], k); } });
    if (pos >= fin) acabar();
  }
  function acabar() { terminado = true; auto = false; $("auto").textContent = "Tocar sola"; $("final").hidden = false; $("final").textContent = d.final; $("indica").textContent = "La melodía terminó"; }
  function saleMensaje(m, k) {
    const c = document.createElement("div"); c.className = "tarjeta-sale"; c.style.setProperty("--rot", (k % 2 ? 4 : -4) + "deg"); c.style.setProperty("--x", (k % 3 === 0 ? 50 : k % 3 === 1 ? 32 : 68) + "%");
    const f = document.createElement("div"); f.className = "foto";
    if (m.foto) { const im = document.createElement("img"); im.src = m.foto; im.alt = ""; f.append(im); } else { f.style.background = "linear-gradient(135deg," + [["#F4B6C2", "#E58AA0"], ["#B8D8F0", "#7DB4DE"], ["#F7E3A1", "#E5C45C"], ["#C9E5C3", "#8FC688"]][k % 4].join(",") + ")"; f.textContent = "♪"; }
    const p = document.createElement("p"); p.textContent = m.texto; c.append(f, p); $("sale").append(c); setTimeout(() => c.remove(), 6200);
  }
  function abrirTapa() { $("escenario").classList.add("abierta"); }
  function reiniciar() { tocadas = 0; $("sale").replaceChildren(); pos = ANTES; terminado = false; auto = false; ev.forEach(e => { e.hecho = false; }); $("final").hidden = true; $("auto").textContent = "Tocar sola"; $("indica").textContent = "Gira la manivela hacia la derecha"; }

  const man = $("manivela");
  function angulo(e) { const r = man.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)); }
  man.addEventListener("pointerdown", e => { audio(); abrirTapa(); man.setPointerCapture(e.pointerId); ultimo = angulo(e); e.preventDefault(); });
  man.addEventListener("pointermove", e => {
    if (ultimo === null) return; const a = angulo(e); let da = a - ultimo; if (da > Math.PI) da -= 2 * Math.PI; if (da < -Math.PI) da += 2 * Math.PI; ultimo = a;
    if (da > 0) { ang += da; avanzar(da / (2 * Math.PI) * VUELTA); }
  });
  const soltar = () => { ultimo = null; };
  man.addEventListener("pointerup", soltar); man.addEventListener("pointercancel", soltar);
  man.addEventListener("keydown", e => { if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight") { e.preventDefault(); audio(); abrirTapa(); ang += .25; avanzar(.25 / (2 * Math.PI) * VUELTA); } });
  $("abrir").onclick = () => { audio(); abrirTapa(); };
  $("auto").onclick = () => { audio(); abrirTapa(); if (terminado) reiniciar(); auto = !auto; $("auto").textContent = auto ? "Pausar" : "Tocar sola"; };
  $("reinicia").onclick = reiniciar;

  const cv = $("mec"), ctx = cv.getContext("2d");
  let W = 0, H = 0;
  function medir() { const r = window.devicePixelRatio || 1; W = cv.clientWidth || 320; H = cv.clientHeight || 330; cv.width = W * r; cv.height = H * r; ctx.setTransform(r, 0, 0, r, 0, 0); }
  window.addEventListener("resize", medir); medir();
  function dibujar() {
    const peine = H - 74, colW = (W - 24) / cols.length, PX = (peine - 18) / 5.5, ahora = performance.now();
    const g = ctx.createLinearGradient(0, 0, W, 0); g.addColorStop(0, "#7A5E22"); g.addColorStop(.5, d.colorLaton); g.addColorStop(1, "#7A5E22");
    ctx.fillStyle = g; ctx.fillRect(10, 8, W - 20, peine - 6);
    ctx.fillStyle = "rgba(0,0,0,.14)"; cols.forEach((m, i) => ctx.fillRect(12 + (i + .5) * colW - .5, 8, 1, peine - 6));
    for (let y = ((pos * PX) % 28); y < peine; y += 28) { ctx.fillStyle = "rgba(0,0,0,.07)"; ctx.fillRect(10, 8 + y, W - 20, 1); }
    const br = ctx.createLinearGradient(0, 8, 0, peine); br.addColorStop(0, "rgba(255,255,255,.28)"); br.addColorStop(.25, "rgba(255,255,255,0)"); br.addColorStop(1, "rgba(0,0,0,.28)");
    ctx.fillStyle = br; ctx.fillRect(10, 8, W - 20, peine - 6);
    ev.forEach(e => {
      const y = peine - (e.t - pos) * PX; if (y < 6 || y > peine + 2) return;
      const x = 12 + (cols.indexOf(e.m) + .5) * colW;
      ctx.fillStyle = "#3E2C0B"; ctx.beginPath(); ctx.arc(x + 1.2, y + 1.8, 5.4, 0, 7); ctx.fill();
      const p = ctx.createRadialGradient(x - 1.5, y - 2, 1, x, y, 5.6); p.addColorStop(0, "#FFF8D2"); p.addColorStop(1, "#A8832F");
      ctx.fillStyle = p; ctx.beginPath(); ctx.arc(x, y, 5.1, 0, 7); ctx.fill();
    });
    ctx.fillStyle = "#26211A"; ctx.fillRect(0, peine, W, H - peine);
    cols.forEach((m, i) => {
      const x = 12 + (i + .5) * colW + Math.sin(ahora / 18 + i) * vib[i] * 2.2, h = 58 - (i / Math.max(1, cols.length - 1)) * 26;
      const tg = ctx.createLinearGradient(x - colW * .3, 0, x + colW * .3, 0); tg.addColorStop(0, "#9AA3AE"); tg.addColorStop(.5, vib[i] > .2 ? "#FFF6D0" : "#E7ECF2"); tg.addColorStop(1, "#8C95A0");
      ctx.fillStyle = tg; ctx.fillRect(x - colW * .3, peine, colW * .6, h); ctx.fillStyle = "rgba(0,0,0,.25)"; ctx.fillRect(x - colW * .3, peine + h - 3, colW * .6, 3);
      vib[i] *= .93;
    });
    ctx.fillStyle = "#E7C46B"; ctx.fillRect(0, peine - 2, W, 3);
    ctx.font = "700 20px Georgia,serif"; ctx.textAlign = "center";
    flotan = flotan.filter(n => n.a > .02);
    flotan.forEach(n => { n.y += 1.1; n.a *= .965; ctx.fillStyle = "rgba(255,244,194," + n.a.toFixed(2) + ")"; ctx.fillText("♪", 12 + (n.c + .5) * colW + n.dx * (1 - n.a), peine - 8 - n.y); });
  }
  function cuadro(ahora) {
    const dt = Math.min(.05, (ahora - previo) / 1000 || 0); previo = ahora;
    if (auto) avanzar(dt * 1.7);
    man.style.setProperty("--giro", ang + "rad");
    $("prog").style.width = Math.max(0, Math.min(100, (pos - ANTES) / (fin - ANTES) * 100)) + "%";
    dibujar(); requestAnimationFrame(cuadro);
  }
  cargar(0); requestAnimationFrame(cuadro);
  window.CajaMusica = { avanzar, reiniciar, cargar, midi, freq, estado: () => ({ pos, fin, tocadas: ev.filter(e => e.hecho).length, total: ev.length, columnas: cols.length, terminado, cancion: canciones[actual].nombre }) };
})();
