/* Árbol del Amor: el árbol crece, florece en forma de corazón y suelta hojas al tocarlo. Todo se dibuja en un canvas. */
(function () {
  const D = window.DATOS, $ = i => document.getElementById(i);
  const red = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const col = D.colores || {}; for (const k in col) document.documentElement.style.setProperty("--" + k, col[k]);
  document.title = D.titulo; $("para").textContent = D.para; $("titulo").textContent = D.titulo; $("sub").textContent = D.subtitulo;
  $("etq").textContent = D.etiquetaTiempo; $("bCarta").textContent = D.botonCarta; $("bFotos").textContent = D.botonFotos;

  const cv = $("lienzo"), x = cv.getContext("2d");
  const corazon = new Path2D("M0 .9C-1.4-.1-.9-1-.4-.9-.15-.85 0-.6 0-.4 0-.6.15-.85.4-.9.9-1 1.4-.1 0 .9z");
  const paleta = D.hojas && D.hojas.length ? D.hojas : ["#ff4f81", "#ffb703"];
  const clamp = v => Math.max(0, Math.min(1, v));
  const suave = p => p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
  const rebote = p => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); };
  let W, H, dpr, seg = [], hojas = [], caen = [], suelo = 0, bx = 0, by = 0, viento = 0, T = 0, inicio = performance.now();

  function armar() {
    W = innerWidth; H = innerHeight; dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = W * dpr; cv.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0);
    bx = W / 2; by = Math.min(H * .72, H - 240); suelo = by;
    const th = Math.min(H * .15, W * .27); seg = []; hojas = [];
    (function rama(x1, y1, ang, len, w, d, t) {
      if (d > 6 || len < 6) return;
      const x2 = x1 + Math.sin(ang) * len, y2 = y1 - Math.cos(ang) * len;
      seg.push({ x1, y1, x2, y2, w, t, dur: .55 });
      rama(x2, y2, ang - .3 - Math.random() * .16, len * .72, w * .68, d + 1, t + .5);
      rama(x2, y2, ang + .3 + Math.random() * .16, len * .72, w * .68, d + 1, t + .5);
      if (d < 2) rama(x2, y2, ang + (Math.random() - .5) * .3, len * .7, w * .6, d + 1, t + .55);
    })(bx, by, 0, th, Math.max(9, W * .032), 0, 0);
    const k = Math.min(W * .46, th * 1.55) / 17, cx = bx, cy = by - th * 2.25, maxd = Math.hypot(W * .4, th * 3.4);
    const n = Math.round(Math.min(520, 260 + W * .35));
    for (let i = 0; i < n; i++) {
      const t = Math.random() * 6.2832, r = Math.sqrt(Math.random()) ;
      const px = 16 * Math.pow(Math.sin(t), 3), py = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      const hx = cx + px * r * k, hy = cy + py * r * k + k * 1.5;
      hojas.push({ x: hx, y: hy, s: (5.5 + Math.random() * 6.5) * (W < 500 ? .9 : 1.15), r: (Math.random() - .5) * .9, f: Math.random() * 6.28, c: paleta[Math.floor(Math.random() * paleta.length)], d: 2.3 + Math.hypot(hx - bx, hy - by) / maxd * 3 + Math.random() * .9 });
    }
    hojas.sort((a, b) => a.y - b.y);
  }
  armar(); addEventListener("resize", armar);

  function rafaga(px, py, n) {
    for (let i = 0; i < n; i++) caen.push({ x: px + (Math.random() - .5) * 40, y: py + (Math.random() - .5) * 30, v: .6 + Math.random() * 1.1, w: Math.random() * 6, s: 6 + Math.random() * 6, c: paleta[Math.floor(Math.random() * paleta.length)], r: Math.random() * 6, a: 1 });
  }
  cv.addEventListener("pointerdown", e => { viento = 1; rafaga(e.clientX, e.clientY, 10); navigator.vibrate && navigator.vibrate(12); });
  cv.addEventListener("pointermove", e => { if (e.pressure > 0 || e.buttons) { viento = Math.min(1, viento + .06); if (Math.random() < .3) rafaga(e.clientX, e.clientY, 1); } });

  let ult = 0;
  function cuadro(now) {
    T = red ? 99 : (now - inicio) / 1000;
    x.clearRect(0, 0, W, H);
    const ps = suave(clamp((T - .1) / 1));
    x.strokeStyle = "rgba(91,26,54,.35)"; x.lineWidth = 2; x.lineCap = "round";
    x.beginPath(); x.moveTo(W / 2 - W * .42 * ps, suelo); x.lineTo(W / 2 + W * .42 * ps, suelo); x.stroke();
    x.strokeStyle = col.tronco || "#7a4a2a";
    for (const s of seg) {
      const p = suave(clamp((T - s.t) / s.dur)); if (p <= 0) continue;
      x.lineWidth = s.w; x.beginPath(); x.moveTo(s.x1, s.y1); x.lineTo(s.x1 + (s.x2 - s.x1) * p, s.y1 + (s.y2 - s.y1) * p); x.stroke();
    }
    viento *= .965;
    for (const h of hojas) {
      const p = clamp((T - h.d) / .9); if (p <= 0) continue;
      const sc = h.s * rebote(p), sw = Math.sin(T * 1.3 + h.f) * (.05 + viento * .3);
      x.save(); x.translate(h.x + sw * 9, h.y); x.rotate(h.r + sw); x.scale(sc, sc); x.fillStyle = h.c; x.fill(corazon); x.restore();
    }
    if (T > 5.2 && now - ult > 260 && caen.length < 60 && !red) { ult = now; const h = hojas[Math.floor(Math.random() * hojas.length)]; caen.push({ x: h.x, y: h.y, v: .5 + Math.random() * .8, w: Math.random() * 6, s: h.s, c: h.c, r: Math.random() * 6, a: 1 }); }
    for (let i = caen.length - 1; i >= 0; i--) {
      const f = caen[i]; f.w += .03; f.r += .02; f.x += Math.sin(f.w) * .9 + viento * 1.5; f.y += f.v + viento * .6;
      if (f.y > suelo - 2) { f.y = suelo - 2; f.v = 0; f.a -= .02; if (f.a <= 0) { caen.splice(i, 1); continue; } }
      x.globalAlpha = f.a; x.save(); x.translate(f.x, f.y); x.rotate(f.r); x.scale(f.s * Math.abs(Math.cos(f.w * .8)) * .6 + f.s * .4, f.s); x.fillStyle = f.c; x.fill(corazon); x.restore();
    }
    x.globalAlpha = 1;
    requestAnimationFrame(cuadro);
  }
  requestAnimationFrame(cuadro);

  // contador de tiempo juntos
  const desde = new Date(D.desde).getTime(), prev = {};
  function poner(id, v) { const e = $(id); if (prev[id] === v) return; prev[id] = v; e.textContent = v; if (!red) { e.classList.remove("t"); void e.offsetWidth; e.classList.add("t"); } }
  function cuenta() { const s = Math.max(0, Math.floor((Date.now() - desde) / 1000)); poner("cD", Math.floor(s / 86400)); poner("cH", Math.floor(s % 86400 / 3600)); poner("cM", Math.floor(s % 3600 / 60)); poner("cS", s % 60); }
  cuenta(); setInterval(cuenta, 1000);

  // paneles
  let token = 0, foco = null;
  function abrir(id) { foco = document.activeElement; $(id).hidden = false; const b = $(id).querySelector("[data-x]"); b && b.focus(); }
  function cerrar(id) { $(id).hidden = true; token++; clearInterval(auto); foco && foco.focus && foco.focus(); }
  document.querySelectorAll("[data-x]").forEach(b => b.onclick = () => cerrar(b.closest(".hoja").id));
  document.querySelectorAll(".hoja").forEach(h => h.addEventListener("pointerdown", e => { if (e.target === h) cerrar(h.id); }));
  addEventListener("keydown", e => { if (e.key === "Escape") document.querySelectorAll(".hoja:not([hidden])").forEach(h => cerrar(h.id)); });

  function tipear(el, texto, ms, fin, mi) {
    if (red) { el.textContent = texto; fin && fin(); return; }
    el.textContent = ""; el.classList.add("escribiendo"); let i = 0;
    (function f() { if (mi !== token) return; el.textContent = texto.slice(0, ++i); if (i < texto.length) setTimeout(f, ms); else { el.classList.remove("escribiendo"); fin && fin(); } })();
  }
  $("bCarta").onclick = () => {
    abrir("pCarta"); const mi = ++token, c = D.carta;
    $("cTit").textContent = c.titulo; $("cTxt").replaceChildren(); $("cFirma").textContent = "";
    const ps = c.parrafos.map(() => { const p = document.createElement("p"); $("cTxt").append(p); return p; });
    let k = 0; (function sig() { if (mi !== token) return; if (k < ps.length) { const i = k++; tipear(ps[i], c.parrafos[i], 22, sig, mi); } else tipear($("cFirma"), c.firma, 40, null, mi); })();
  };
  $("cTxt").addEventListener("click", () => { const c = D.carta; token++; $("cTxt").querySelectorAll("p").forEach((p, i) => { p.textContent = c.parrafos[i]; p.classList.remove("escribiendo"); }); $("cFirma").textContent = c.firma; });

  // carrusel 3D de fotos
  const F = D.fotos || [], carr = $("carr"); let idx = 0, auto = 0, x0 = null;
  const tarjetas = F.map((f, i) => {
    const fig = document.createElement("figure"); fig.className = "tj polaroid"; fig.innerHTML = "<i class=\"cinta\"></i>";
    const im = document.createElement("div"); im.className = "im";
    if (f.src) im.style.backgroundImage = "url(\"" + f.src + "\")";
    else { im.style.background = "linear-gradient(160deg," + paleta[(i * 2) % paleta.length] + "55," + paleta[(i * 2 + 1) % paleta.length] + "99)"; if (window.Arte && Arte.url(f.arte)) { const g = new Image(); g.src = Arte.url(f.arte); g.alt = ""; g.draggable = false; im.append(g); } }
    const cap = document.createElement("figcaption"); cap.textContent = f.pie || "";
    fig.append(im, cap); fig.onclick = () => { if (i !== idx) { idx = i; pos(); reiniciar(); } }; carr.append(fig); return fig;
  });
  function pos() {
    const n = tarjetas.length;
    tarjetas.forEach((t, i) => {
      let o = i - idx; if (o > n / 2) o -= n; if (o < -n / 2) o += n; const a = Math.abs(o);
      t.style.transform = "translateX(" + o * 52 + "%) translateZ(" + (-a * 140) + "px) rotateY(" + (-o * 36) + "deg) scale(" + (1 - a * .08) + ")";
      t.style.zIndex = 10 - a; t.style.opacity = a > 2 ? 0 : 1; t.style.filter = a ? "brightness(" + (1 - a * .12) + ")" : "none"; t.style.pointerEvents = a > 2 ? "none" : "auto";
    });
    $("fPos").textContent = (idx + 1) + " / " + n;
  }
  const ir = d => { idx = (idx + d + tarjetas.length) % tarjetas.length; pos(); };
  function reiniciar() { clearInterval(auto); if (!red) auto = setInterval(() => ir(1), 3600); }
  $("fPrev").onclick = () => { ir(-1); reiniciar(); }; $("fNext").onclick = () => { ir(1); reiniciar(); };
  carr.addEventListener("pointerdown", e => { x0 = e.clientX; });
  carr.addEventListener("pointerup", e => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 40) { ir(dx < 0 ? 1 : -1); reiniciar(); } });
  $("bFotos").onclick = () => { abrir("pFotos"); idx = Math.floor(tarjetas.length / 2); pos(); reiniciar(); };
  if (!tarjetas.length) $("bFotos").hidden = true;
})();
