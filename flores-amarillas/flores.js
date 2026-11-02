(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  const cv = $("espacio"), ctx = cv.getContext("2d");
  let W = 0, H = 0, estrellas = [], t0 = 0, fase = "espera", viajeT = 16000, versoIdx = -1, leidas = new Set(), previo = 0;
  document.title = d.titulo; $("titulo").textContent = d.titulo; $("sub").textContent = d.subtitulo; $("para").textContent = "Para " + d.para; $("llegada").textContent = d.llegada;
  const alea = (a, b) => a + Math.random() * (b - a);
  function medir() { const r = window.devicePixelRatio || 1; W = innerWidth; H = innerHeight; cv.width = W * r; cv.height = H * r; ctx.setTransform(r, 0, 0, r, 0, 0); }
  window.addEventListener("resize", medir); medir();
  for (let i = 0; i < 260; i++) estrellas.push({ x: alea(-1, 1), y: alea(-1, 1), z: alea(.05, 1) });
  const planetas = [{ t: 3500, c: ["#FFB36B", "#B5481E"], lado: -1 }, { t: 7800, c: ["#8EC9FF", "#2D5FB5"], lado: 1 }, { t: 11800, c: ["#E9A8FF", "#7A2FB5"], lado: -1 }];
  function velocidad(t) { if (fase === "llegado") return .0006; if (t < 2500) return .0008 + t / 2500 * .02; if (t < viajeT - 3000) return .024; return Math.max(.0008, .024 * (viajeT - t) / 3000); }
  function dibujar(t, dt) {
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#03040F"); g.addColorStop(.7, fase === "llegado" ? "#15163D" : "#080A24"); g.addColorStop(1, fase === "llegado" ? "#4B3A12" : "#0C0F30");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const cx = W / 2, cy = H * (fase === "llegado" ? .35 : .5), v = velocidad(t) * dt / 16;
    if (fase !== "llegado") planetas.forEach(p => { const a = t - p.t; if (a < 0 || a > 4200) return; const k = a / 4200, r = 8 + k * k * W * .55, x = cx + p.lado * (30 + k * W * .55), y = cy + (k - .2) * H * .12; const rg = ctx.createRadialGradient(x - r * .3, y - r * .3, r * .1, x, y, r); rg.addColorStop(0, p.c[0]); rg.addColorStop(1, p.c[1]); ctx.globalAlpha = Math.min(1, k * 4) * (1 - Math.max(0, k - .8) * 5); ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.globalAlpha = 1; });
    estrellas.forEach(s => {
      const z0 = s.z; s.z -= v; if (s.z <= .02) { s.z = 1; s.x = alea(-1, 1); s.y = alea(-1, 1); return; }
      const k = W * .3, x0 = cx + s.x / z0 * k, y0 = cy + s.y / z0 * k, x1 = cx + s.x / s.z * k, y1 = cy + s.y / s.z * k;
      if (x1 < -50 || x1 > W + 50 || y1 < -50 || y1 > H + 50) { s.z = 1; return; }
      ctx.strokeStyle = "rgba(255,255,255," + (1 - s.z * .8).toFixed(2) + ")"; ctx.lineWidth = .6 + (1 - s.z) * 1.8; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
    });
    if (fase === "llegado") { const h = ctx.createRadialGradient(cx, H * .8, 10, cx, H * .8, W * .9); h.addColorStop(0, "rgba(255,214,60,.45)"); h.addColorStop(1, "rgba(255,214,60,0)"); ctx.fillStyle = h; ctx.fillRect(0, 0, W, H); }
  }
  function cuadro(ahora) {
    const dt = Math.min(50, ahora - previo || 16); previo = ahora; const t = ahora - t0;
    if (fase === "viaje") {
      const i = Math.min(d.viaje.length - 1, Math.floor(t / ((viajeT - 3000) / d.viaje.length)));
      if (i !== versoIdx && t > 1200) { versoIdx = i; const v = $("verso"); v.classList.remove("ver"); void v.offsetWidth; v.textContent = d.viaje[i]; v.classList.add("ver"); }
      if (t >= viajeT) llegar();
    }
    dibujar(fase === "espera" ? 0 : t, dt); requestAnimationFrame(cuadro);
  }
  function flor(esMensaje, i) {
    const b = document.createElement("button"); b.type = "button"; b.className = "flor" + (esMensaje ? " msg" : ""); const fila = Math.random();
    b.style.left = (esMensaje ? 8 + (i + .5) * (84 / d.mensajes.length) : alea(2, 96)) + "%"; b.style.bottom = (esMensaje ? alea(8, 30) : alea(0, 34)) + "%"; b.style.setProperty("--s", (esMensaje ? alea(1.05, 1.3) : alea(.55, .95)).toFixed(2)); b.style.animationDelay = (-Math.random() * 4).toFixed(2) + "s"; b.style.zIndex = Math.round((100 - parseFloat(b.style.bottom)));
    let petalos = ""; for (let k = 0; k < 10; k++) petalos += '<ellipse cx="30" cy="12" rx="5.6" ry="11" transform="rotate(' + k * 36 + ' 30 30)"/>';
    b.innerHTML = '<svg viewBox="0 0 60 120" aria-hidden="true"><path class="tallo" d="M30 32c-2 24 3 50 0 88"/><path class="hoja" d="M30 80c-14-3-22-11-24-20 12 0 22 6 24 20zM30 94c14-3 20-9 22-18-12 0-20 5-22 18z"/><g class="petalos">' + petalos + '</g><circle class="centro" cx="30" cy="30" r="8"/></svg>';
    if (esMensaje) { const m = d.mensajes[i]; b.setAttribute("aria-label", "Flor con un mensaje: " + m.titulo); b.onclick = () => abrir(i, b); } else { b.tabIndex = -1; b.setAttribute("aria-hidden", "true"); b.onclick = () => { b.classList.add("florece"); setTimeout(() => b.classList.remove("florece"), 900); }; }
    return b;
  }
  function abrir(i, b) { const m = d.mensajes[i]; $("tTit").textContent = m.titulo; $("tTxt").textContent = m.texto; $("tarjeta").hidden = false; b.classList.add("leida"); leidas.add(i); $("progreso").textContent = "Flores leídas: " + leidas.size + " de " + d.mensajes.length; $("cerrar").focus(); }
  $("cerrar").onclick = () => { $("tarjeta").hidden = true; if (leidas.size === d.mensajes.length) { $("final").hidden = false; $("final").textContent = d.final; $("campo").classList.add("completo"); } };
  function llegar() {
    if (fase === "llegado") return; fase = "llegado"; $("verso").textContent = ""; $("saltar").hidden = true; $("campo").hidden = false; $("intro").hidden = true;
    const c = $("flores"); c.replaceChildren(); for (let i = 0; i < 34; i++) c.append(flor(false, i)); for (let i = 0; i < d.mensajes.length; i++) c.append(flor(true, i));
    $("progreso").textContent = "Flores leídas: 0 de " + d.mensajes.length;
  }
  $("partir").onclick = () => { fase = "viaje"; t0 = performance.now(); $("intro").hidden = true; $("saltar").hidden = false; };
  $("saltar").onclick = llegar;
  requestAnimationFrame(cuadro);
  window.FloresAmarillas = { llegar, estado: () => ({ fase, flores: document.querySelectorAll ? $("flores").children.length : 0, leidas: leidas.size }) };
})();
