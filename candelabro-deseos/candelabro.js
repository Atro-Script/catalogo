/* Candelabro de Deseos: velas que se encienden al tocarlas; al encender todas, estalla la luz. Todo en canvas. */
(function () {
  const D = window.DATOS, $ = i => document.getElementById(i);
  const red = matchMedia("(prefers-reduced-motion:reduce)").matches;
  for (const k in D.colores || {}) document.documentElement.style.setProperty("--" + k, D.colores[k]);
  document.title = D.titulo; $("para").textContent = D.para; $("titulo").textContent = D.titulo;
  $("fTit").textContent = D.final.titulo; $("fMsg").textContent = D.final.mensaje; $("fFirma").textContent = D.final.firma; $("otra").textContent = D.otraVez;
  const cv = $("lienzo"), x = cv.getContext("2d"), N = Math.max(3, Math.min(7, D.velas.length));
  const clamp = v => Math.max(0, Math.min(1, v)), suave = p => p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
  const rebote = p => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); };
  let W, H, dpr, S, cx, y0, velas = [], T = 0, tFinal = 0, chispas = [], motas = [], bruto = null;

  function bez(a, b, c, d, t) { const u = 1 - t; return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d; }
  function armar() {
    W = innerWidth; H = innerHeight; dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = W * dpr; cv.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0);
    S = Math.min(W * 1.02, H * .62); cx = W / 2; y0 = H * .42;
    const prev = velas.map(v => v.t);
    velas = Array.from({ length: N }, (_, i) => {
      const m = (N - 1) / 2, o = (i - m) / m, ox = o * S * .4, by = y0 + (-.04 + .16 * Math.abs(o)) * S;
      return { i, ox, bx: cx + ox, by, x: cx + ox, y: by - S * .1, f: i * 1.7, t: prev[i] == null ? null : prev[i] };
    });
  }
  armar(); addEventListener("resize", armar);

  // sonido suave (se crea al primer toque)
  let ac = null;
  function tono(f, d = .9, v = .09, ret = 0) {
    try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); const t = ac.currentTime + ret, o = ac.createOscillator(), g = ac.createGain();
      o.type = "sine"; o.frequency.value = f; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + d); o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + d + .05); } catch (e) {}
  }
  const escala = [523.25, 587.33, 659.25, 783.99, 880, 987.77, 1046.5];

  const hud = () => { const n = velas.filter(v => v.t != null).length; $("hud").textContent = n === N ? "¡Todas encendidas!" : (n ? n + " de " + N + " · " : "") + D.pista; };
  hud();

  function encender(v) {
    if (v.t != null) return; v.t = T; hud(); navigator.vibrate && navigator.vibrate(18);
    tono(escala[v.i % escala.length], 1.4, .1); tono(escala[v.i % escala.length] * 2, .8, .03, .04);
    for (let k = 0; k < 14; k++) chispas.push({ x: v.x, y: v.y, vx: (Math.random() - .5) * 2.4, vy: -Math.random() * 2.2 - .4, l: 60 + Math.random() * 30, m: 90, s: 1 + Math.random() * 1.6 });
    const b = $("deseo"); b.textContent = D.velas[v.i].deseo; b.classList.remove("on");
    const w = Math.min(innerWidth * .78, 272), px = Math.max(w / 2 + 8, Math.min(innerWidth - w / 2 - 8, v.x));
    b.style.left = px + "px"; b.style.top = Math.max(120, v.y - S * .2) + "px"; b.style.transform = "translate(-50%,-100%) translateY(14px)";
    requestAnimationFrame(() => { b.classList.add("on"); b.style.transform = "translate(-50%,-100%)"; });
    clearTimeout(encender.h); encender.h = setTimeout(() => b.classList.remove("on"), 3600);
    if (velas.every(q => q.t != null)) { tFinal = T + .9; setTimeout(() => { for (let k = 0; k < 150; k++) { const a = Math.random() * 6.283, s = 1.5 + Math.random() * 6; chispas.push({ x: cx, y: y0, vx: Math.cos(a) * s, vy: Math.sin(a) * s, l: 90 + Math.random() * 60, m: 150, s: 1 + Math.random() * 2.2 }); } [0, 4, 7, 12].forEach((n, j) => tono(261.63 * Math.pow(2, n / 12), 3, .08, j * .08)); }, 900); setTimeout(() => { $("fin").hidden = false; $("deseo").classList.remove("on"); }, 3200); }
  }
  cv.addEventListener("pointerdown", e => {
    const r = cv.getBoundingClientRect(), px = e.clientX - r.left, py = e.clientY - r.top;
    let mejor = null, md = 1e9; velas.forEach(v => { const d = Math.hypot(px - v.x, (py - (v.y + S * .06)) * .8); if (v.t == null && d < md) { md = d; mejor = v; } });
    if (mejor && md < S * .17) encender(mejor); else for (let k = 0; k < 6; k++) chispas.push({ x: px, y: py, vx: (Math.random() - .5) * 2, vy: (Math.random() - .5) * 2, l: 30, m: 40, s: 1.2 });
  });
  $("otra").onclick = () => { velas.forEach(v => v.t = null); tFinal = 0; chispas = []; $("fin").hidden = true; hud(); };

  function bronce(w) { x.lineCap = "round"; x.lineWidth = w; const g = x.createLinearGradient(0, y0 - S * .2, 0, y0 + S * .45); g.addColorStop(0, "#7a6232"); g.addColorStop(.5, "#c9a959"); g.addColorStop(1, "#6a5228"); x.strokeStyle = g; }
  function cristal(px, py, L, tw) {
    const l = S * .045, a = .35 + .5 * L * (.6 + .4 * Math.sin(T * 3 + tw));
    x.save(); x.translate(px, py); x.fillStyle = "rgba(255,244,214," + a + ")"; x.strokeStyle = "rgba(255,230,170," + Math.min(1, a + .2) + ")"; x.lineWidth = 1;
    x.beginPath(); x.moveTo(0, 0); x.lineTo(l * .35, l * .4); x.quadraticCurveTo(l * .55, l * .95, 0, l * 1.1); x.quadraticCurveTo(-l * .55, l * .95, -l * .35, l * .4); x.closePath(); x.fill(); x.stroke(); x.restore();
  }
  function estructura(L) {
    // cadena
    x.strokeStyle = "rgba(201,169,89,.6)"; x.lineWidth = 2; for (let y = 0; y < y0 - S * .14; y += 9) { x.beginPath(); x.ellipse(cx, y + 4, 2.5, 4.5, 0, 0, 6.283); x.stroke(); }
    bronce(S * .018); x.beginPath(); x.moveTo(cx, y0 - S * .14); x.lineTo(cx, y0 + S * .4); x.stroke();
    // brazos
    velas.forEach(v => { if (v.ox === 0) return; const sx = cx, sy = y0 + S * .2, c1x = cx + v.ox * .15, c1y = y0 + S * .36, c2x = cx + v.ox, c2y = y0 + S * .34, ex = v.bx, ey = v.by + S * .05; bronce(S * .013); x.beginPath(); x.moveTo(sx, sy); x.bezierCurveTo(c1x, c1y, c2x, c2y, ex, ey); x.stroke();
      [.3, .55, .8].forEach((t, k) => cristal(bez(sx, c1x, c2x, ex, t), bez(sy, c1y, c2y, ey, t) + S * .006, L, v.f + k)); });
    // esferas y base
    [[y0 - S * .08, .022], [y0 + S * .2, .034], [y0 + S * .4, .03]].forEach(([yy, r]) => { const g = x.createRadialGradient(cx - S * r * .3, yy - S * r * .3, 1, cx, yy, S * r); g.addColorStop(0, "#f3dc9a"); g.addColorStop(1, "#7a5f2c"); x.fillStyle = g; x.beginPath(); x.arc(cx, yy, S * r, 0, 6.283); x.fill(); });
    [-.06, 0, .06].forEach((o, k) => cristal(cx + o * S, y0 + S * (.43 + (k === 1 ? .03 : 0)), L, k * 2));
    // copas y velas
    velas.forEach(v => { x.fillStyle = "#b8963f"; x.beginPath(); x.moveTo(v.bx - S * .035, v.by + S * .035); x.lineTo(v.bx + S * .035, v.by + S * .035); x.lineTo(v.bx + S * .022, v.by + S * .06); x.lineTo(v.bx - S * .022, v.by + S * .06); x.closePath(); x.fill();
      const g = x.createLinearGradient(v.bx - S * .02, 0, v.bx + S * .02, 0); g.addColorStop(0, "#d9cdb0"); g.addColorStop(.5, "#fff6e0"); g.addColorStop(1, "#cbbd9c"); x.fillStyle = g; x.fillRect(v.bx - S * .02, v.by - S * .1, S * .04, S * .13);
      x.strokeStyle = "#2a2118"; x.lineWidth = 1.5; x.beginPath(); x.moveTo(v.x, v.y); x.lineTo(v.x, v.y - S * .014); x.stroke(); });
  }
  function llama(v) {
    if (v.t == null) { x.fillStyle = "rgba(255,255,255," + (.25 + .2 * Math.sin(T * 2.4 + v.f)) + ")"; x.beginPath(); x.arc(v.x, v.y - S * .02, S * .007, 0, 6.283); x.fill(); return; }
    const p = clamp((T - v.t) / .8), e = rebote(p); if (p <= 0) return;
    const s = S * .038 * e, fl = 1 + .1 * Math.sin(T * 13 + v.f) + .06 * Math.sin(T * 27 + v.f * 2), sw = Math.sin(T * 4.3 + v.f) * S * .004;
    x.globalCompositeOperation = "lighter"; const gl = x.createRadialGradient(v.x, v.y - s, 0, v.x, v.y - s, S * .34 * e); gl.addColorStop(0, "rgba(255,190,90," + (.34 * fl * .9) + ")"); gl.addColorStop(1, "rgba(255,140,40,0)"); x.fillStyle = gl; x.fillRect(v.x - S * .4, v.y - S * .5, S * .8, S * .8); x.globalCompositeOperation = "source-over";
    x.save(); x.translate(v.x + sw, v.y - S * .012); x.scale(1, fl);
    const g = x.createLinearGradient(0, -s * 2.2, 0, s * .6); g.addColorStop(0, "rgba(255,130,30,.9)"); g.addColorStop(.3, "#ffb347"); g.addColorStop(.75, "#ffe9a0"); g.addColorStop(1, "#fff");
    x.fillStyle = g; x.beginPath(); x.moveTo(0, -s * 2.3); x.bezierCurveTo(s * 1.1, -s * 1.1, s * .9, s * .5, 0, s * .6); x.bezierCurveTo(-s * .9, s * .5, -s * 1.1, -s * 1.1, 0, -s * 2.3); x.fill();
    x.fillStyle = "rgba(80,120,255,.5)"; x.beginPath(); x.ellipse(0, s * .1, s * .28, s * .4, 0, 0, 6.283); x.fill(); x.restore();
  }

  function cuadro(now) {
    T = red ? 99 : (now - (bruto || (bruto = now))) / 1000; x.clearRect(0, 0, W, H);
    const lit = velas.reduce((a, v) => a + (v.t == null ? 0 : clamp((T - v.t) / 1.2)), 0) / N;
    x.globalCompositeOperation = "lighter"; const amb = x.createRadialGradient(cx, y0, 0, cx, y0, S * .9); amb.addColorStop(0, "rgba(255,200,120," + (.1 * lit + .0) + ")"); amb.addColorStop(1, "rgba(255,200,120,0)"); x.fillStyle = amb; x.fillRect(0, 0, W, H); x.globalCompositeOperation = "source-over";
    estructura(lit); velas.forEach(llama);
    // motas de polvo que suben de las llamas encendidas
    if (!red) velas.forEach(v => { if (v.t != null && Math.random() < .12) motas.push({ x: v.x + (Math.random() - .5) * S * .1, y: v.y, vx: (Math.random() - .5) * .3, vy: -.3 - Math.random() * .5, l: 120, s: .8 + Math.random() * 1.4 }); });
    x.globalCompositeOperation = "lighter";
    for (let i = motas.length - 1; i >= 0; i--) { const m = motas[i]; m.x += m.vx + Math.sin(m.l * .08) * .15; m.y += m.vy; if (--m.l <= 0) { motas.splice(i, 1); continue; } x.fillStyle = "rgba(255,220,150," + (m.l / 120 * .7) + ")"; x.beginPath(); x.arc(m.x, m.y, m.s, 0, 6.283); x.fill(); }
    // estallido de luz final
    if (tFinal && T > tFinal) {
      const p = suave(clamp((T - tFinal) / 2.2)), q = clamp((T - tFinal) / 1.1);
      const fl = x.createRadialGradient(cx, y0, 0, cx, y0, Math.max(W, H) * (.2 + p)); fl.addColorStop(0, "rgba(255,245,210," + (.85 * (1 - q * .6)) + ")"); fl.addColorStop(.4, "rgba(255,200,120," + (.28 * (1 - q * .5)) + ")"); fl.addColorStop(1, "rgba(255,200,120,0)"); x.fillStyle = fl; x.fillRect(0, 0, W, H);
      const rayos = 22, giro = T * .12; for (let k = 0; k < rayos; k++) { const a = k / rayos * 6.283 + giro, L = S * (.3 + 1.3 * p) * (k % 2 ? .75 : 1), w = .028 + (k % 3) * .012; const g = x.createLinearGradient(cx, y0, cx + Math.cos(a) * L, y0 + Math.sin(a) * L); g.addColorStop(0, "rgba(255,236,180," + (.3 * (1 - q * .5)) + ")"); g.addColorStop(1, "rgba(255,236,180,0)"); x.fillStyle = g; x.beginPath(); x.moveTo(cx, y0); x.lineTo(cx + Math.cos(a - w) * L, y0 + Math.sin(a - w) * L); x.lineTo(cx + Math.cos(a + w) * L, y0 + Math.sin(a + w) * L); x.fill(); }
    }
    for (let i = chispas.length - 1; i >= 0; i--) { const c = chispas[i]; c.x += c.vx; c.y += c.vy; c.vy += .04; c.vx *= .985; if (--c.l <= 0) { chispas.splice(i, 1); continue; } const im = window.Arte && Arte.dibujable("chispa"), a = Math.min(1, c.l / 40); x.globalAlpha = a; if (im) { const z = c.s * 7; x.drawImage(im, c.x - z / 2, c.y - z / 2, z, z); } else { x.fillStyle = "#ffe9a0"; x.fillRect(c.x, c.y, c.s, c.s); } }
    x.globalAlpha = 1; x.globalCompositeOperation = "source-over";
    requestAnimationFrame(cuadro);
  }
  requestAnimationFrame(cuadro);
})();
