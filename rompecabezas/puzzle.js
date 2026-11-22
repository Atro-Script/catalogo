(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  let n = d.tamano || 3, orden = [], vacio, movs = 0, seg = 0, reloj = null, jugando = false;
  document.title = d.titulo + " | " + d.para;
  const r = document.documentElement.style; r.setProperty("--fondo", d.colorFondo); r.setProperty("--acento", d.colorAcento);
  document.body.style.setProperty("--atm", d.colorAcento);
  $("para").textContent = d.para; $("titulo").textContent = d.titulo; $("ayuda").textContent = d.ayuda;
  $("pTit").textContent = d.premioTitulo; $("pTxt").textContent = d.premioTexto; $("pWa").textContent = d.botonPremio;
  $("pWa").href = "https://wa.me/" + d.whatsapp + "?text=" + encodeURIComponent(d.mensajeWhatsapp);
  $("tablero").style.setProperty("--foto", 'url("' + d.foto + '")');
  let ac = null;
  function tono(f, dur) { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); ac.resume(); } catch (e) { return; } const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime; o.type = "triangle"; o.frequency.value = f; g.gain.setValueAtTime(.05, t); g.gain.exponentialRampToValueAtTime(.001, t + dur); o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + dur); }

  const fichas = {};
  function pos(i) { const col = i % n, fila = Math.floor(i / n); return `translate(${col * 100}%,${fila * 100}%)`; }
  function montar() {
    const t = $("tablero"); t.innerHTML = ""; t.style.setProperty("--n", n); t.classList.remove("resuelto");
    for (let k = 0; k < n * n - 1; k++) {
      const b = document.createElement("button"); b.type = "button"; b.className = "ficha"; b.setAttribute("role", "gridcell"); b.setAttribute("aria-label", "Pieza " + (k + 1));
      b.style.backgroundImage = 'url("' + d.foto + '")';
      b.style.backgroundPosition = (k % n) * 100 / (n - 1) + "% " + Math.floor(k / n) * 100 / (n - 1) + "%";
      b.innerHTML = "<span>" + (k + 1) + "</span>"; b.onclick = () => mover(k);
      t.appendChild(b); fichas[k] = b;
    }
  }
  function pinta() {
    orden.forEach((k, i) => { if (k < 0) return; const f = fichas[k]; f.style.transform = pos(i); f.classList.toggle("bien", k === i); });
  }
  function resuelto() { return orden.every((k, i) => k === (i === n * n - 1 ? -1 : i)); }
  function mezclar() {
    montar(); orden = Array.from({ length: n * n }, (_, i) => i === n * n - 1 ? -1 : i); vacio = n * n - 1;
    let prev = -1;
    for (let s = 0; s < 40 * n * n; s++) {
      const v = [], c = vacio % n, f = Math.floor(vacio / n);
      if (c > 0) v.push(vacio - 1); if (c < n - 1) v.push(vacio + 1); if (f > 0) v.push(vacio - n); if (f < n - 1) v.push(vacio + n);
      const e = v.filter(x => x !== prev), a = e[Math.floor(Math.random() * e.length)];
      orden[vacio] = orden[a]; orden[a] = -1; prev = vacio; vacio = a;
    }
    if (resuelto()) return mezclar();
    movs = 0; seg = 0; jugando = false; clearInterval(reloj); $("movs").textContent = 0; $("reloj").textContent = "0:00"; $("premio").hidden = true; pinta();
    $("nivel").textContent = "Dificultad: " + n + "×" + n;
  }
  function mover(k) {
    if (!orden.includes(k) || $("tablero").classList.contains("resuelto")) return;
    const i = orden.indexOf(k), c = i % n, f = Math.floor(i / n), vc = vacio % n, vf = Math.floor(vacio / n);
    if (Math.abs(c - vc) + Math.abs(f - vf) !== 1) { fichas[k].animate([{ translate: "0" }, { translate: "-4px" }, { translate: "4px" }, { translate: "0" }], { duration: 160 }); return; }
    if (!jugando) { jugando = true; reloj = setInterval(() => { seg++; $("reloj").textContent = Math.floor(seg / 60) + ":" + String(seg % 60).padStart(2, "0"); }, 1000); }
    orden[vacio] = k; orden[i] = -1; vacio = i; movs++; $("movs").textContent = movs; tono(520 + (movs % 5) * 60, .08);
    if (navigator.vibrate && !rm) try { navigator.vibrate(6); } catch (e) {}
    pinta(); if (resuelto()) ganar();
  }
  function ganar() {
    clearInterval(reloj); jugando = false; const t = $("tablero"); t.classList.add("resuelto");
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => tono(f, .3), i * 120));
    $("pDatos").textContent = movs + " movimientos · " + $("reloj").textContent;
    setTimeout(() => { $("premio").hidden = false; $("premio").scrollIntoView({ behavior: rm ? "auto" : "smooth", block: "center" }); }, rm ? 0 : 900);
    if (!rm) for (let i = 0; i < 44; i++) {
      const c = document.createElement("i"), col = [d.colorAcento, "#fff", "#FF5D8F", "#3FC1C9"];
      c.style.cssText = "position:fixed;z-index:30;left:50%;top:40%;width:9px;height:14px;pointer-events:none;border-radius:2px;background:" + col[i % 4] + ";transition:transform 1.6s cubic-bezier(.15,.7,.3,1),opacity 1.6s";
      document.body.appendChild(c); requestAnimationFrame(() => { c.style.transform = `translate(${Math.random() * 420 - 210}px,${Math.random() * 520 - 220}px) rotate(${Math.random() * 720}deg)`; c.style.opacity = "0"; }); setTimeout(() => c.remove(), 1700);
    }
  }
  $("mezclar").onclick = mezclar;
  $("nivel").onclick = () => { n = n >= 5 ? 3 : n + 1; mezclar(); };
  $("pista").onclick = () => { const t = $("tablero"); t.classList.add("pista"); setTimeout(() => t.classList.remove("pista"), 1800); };
  /* deslizar con el dedo / flechas */
  let x0, y0;
  $("tablero").addEventListener("pointerdown", e => { x0 = e.clientX; y0 = e.clientY; });
  $("tablero").addEventListener("pointerup", e => {
    if (x0 == null) return; const dx = e.clientX - x0, dy = e.clientY - y0; x0 = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 30) return;
    const c = vacio % n, f = Math.floor(vacio / n); let i;
    if (Math.abs(dx) > Math.abs(dy)) i = dx > 0 ? (c > 0 ? vacio - 1 : -1) : (c < n - 1 ? vacio + 1 : -1); else i = dy > 0 ? (f > 0 ? vacio - n : -1) : (f < n - 1 ? vacio + n : -1);
    if (i >= 0) mover(orden[i]);
  });
  mezclar();
})();
