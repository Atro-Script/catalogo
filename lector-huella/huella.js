(function () {
  const d = window.DATOS, $ = id => document.getElementById(id), NS = "http://www.w3.org/2000/svg";
  const DUR = d.duracion || 2300, pad = $("pad");
  let anillos = [], presionando = false, t0 = 0, raf = 0, listo = false, ac = null, tick = null, avance = 0;
  document.title = d.titulo; $("titulo").textContent = d.titulo; $("para").textContent = "Identidad requerida: " + d.para; $("ayuda").textContent = d.instruccion; $("estado").textContent = "● SISTEMA EN ESPERA";
  // Huella: anillos concéntricos partidos en arcos
  const cx = 60, cy = 78; let sem = 7; const rnd = () => (sem = (sem * 16807) % 2147483647) / 2147483647;
  const pt = (rx, ry, a) => [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
  for (let i = 0; i < 15; i++) {
    const rx = 6 + i * 3.7, ry = rx * 1.3 + (i > 11 ? -(i - 11) * 1.6 : 0); let a = rnd() * 6.28, resto = 6.28; const g = document.createElementNS(NS, "g"); g.setAttribute("class", "anillo");
    while (resto > .5) {
      const len = Math.min(resto, .9 + rnd() * 1.6), gap = .12 + rnd() * .35, p0 = pt(rx, ry, a), p1 = pt(rx, ry, a + len);
      const ph = document.createElementNS(NS, "path"); ph.setAttribute("d", "M" + p0[0].toFixed(1) + " " + p0[1].toFixed(1) + "A" + rx.toFixed(1) + " " + ry.toFixed(1) + " 0 " + (len > Math.PI ? 1 : 0) + " 1 " + p1[0].toFixed(1) + " " + p1[1].toFixed(1)); g.append(ph);
      a += len + gap; resto -= len + gap;
    }
    $("huella").append(g); anillos.push(g);
  }
  function audio() { if (!ac) { const A = window.AudioContext || window.webkitAudioContext; if (A) ac = new A(); } if (ac && ac.state === "suspended") ac.resume(); }
  function bip(f, dur, v) { if (!ac) return; const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime; o.type = "sine"; o.frequency.value = f; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .01); g.gain.exponentialRampToValueAtTime(.0008, t + dur); o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + dur + .02); }
  function pintar(p) {
    const n = Math.floor(p * anillos.length); anillos.forEach((g, i) => g.classList.toggle("on", i < n)); $("barra").style.width = (p * 100) + "%"; $("pct").textContent = Math.round(p * 100) + " %";
  }
  function bucle(ahora) {
    if (!presionando || listo) return; avance = Math.min(1, (ahora - t0) / DUR); pintar(avance);
    if (avance >= 1) { exito(); return; } raf = requestAnimationFrame(bucle);
  }
  function empezar(e) {
    if (listo || presionando) return; if (e && e.preventDefault) e.preventDefault(); audio(); presionando = true; t0 = performance.now(); pad.classList.add("escaneando"); $("estado").textContent = "● ESCANEANDO…"; $("estado").className = "estado act";
    clearInterval(tick); let k = 0; tick = setInterval(() => bip(500 + (k++) * 38, .08, .08), 140); raf = requestAnimationFrame(bucle);
  }
  function soltar() {
    if (!presionando || listo) return; presionando = false; cancelAnimationFrame(raf); clearInterval(tick); pad.classList.remove("escaneando");
    if (avance < 1) { pintar(0); $("estado").textContent = "✖ HUELLA NO RECONOCIDA · INTENTA DE NUEVO"; $("estado").className = "estado mal"; pad.classList.add("error"); bip(180, .3, .1); if (navigator.vibrate) navigator.vibrate(60); setTimeout(() => pad.classList.remove("error"), 500); }
  }
  function exito() {
    listo = true; presionando = false; clearInterval(tick); pad.classList.remove("escaneando"); pad.classList.add("ok"); $("estado").textContent = "✔ IDENTIDAD CONFIRMADA"; $("estado").className = "estado bien";
    bip(660, .25, .12); setTimeout(() => bip(990, .5, .12), 160); if (navigator.vibrate) navigator.vibrate([40, 40, 120]); $("flash").classList.add("on");
    setTimeout(() => {
      $("lector").hidden = true; $("abierto").hidden = false; $("oTit").textContent = d.desbloqueado.titulo; $("oMsg").textContent = d.desbloqueado.mensaje;
      d.desbloqueado.archivos.forEach((a, i) => { const li = document.createElement("li"); li.style.animationDelay = (.5 + i * .6) + "s"; const b = document.createElement("b"); b.textContent = a.nombre; const p = document.createElement("p"); p.textContent = a.texto; li.append(b, p); $("archivos").append(li); });
    }, 900);
  }
  pad.addEventListener("pointerdown", e => { pad.setPointerCapture && pad.setPointerCapture(e.pointerId); empezar(e); });
  ["pointerup", "pointercancel", "pointerleave"].forEach(ev => pad.addEventListener(ev, soltar));
  pad.addEventListener("contextmenu", e => e.preventDefault());
  pad.addEventListener("keydown", e => { if ((e.key === " " || e.key === "Enter") && !e.repeat) empezar(e); }); pad.addEventListener("keyup", e => { if (e.key === " " || e.key === "Enter") soltar(); });
  window.LectorHuella = { anillos: () => anillos.length, exito };
})();
