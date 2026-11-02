(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  const cv = $("jardin"), ctx = cv.getContext("2d"), n = d.mensajes.length;
  let W = 0, H = 0, t = 0, previo = 0, leidas = new Set(), corazon = false, abierto = -1;
  document.title = d.titulo; $("titulo").textContent = d.titulo; $("ayuda").textContent = d.ayuda; $("para").textContent = "Para " + d.para;
  const alea = (a, b) => a + Math.random() * (b - a);
  function sprite(c1, c2) { const s = document.createElement("canvas"); s.width = s.height = 64; const g = s.getContext("2d"), r = g.createRadialGradient(32, 32, 0, 32, 32, 32); r.addColorStop(0, "#fff"); r.addColorStop(.18, c1); r.addColorStop(.5, c2); r.addColorStop(1, "rgba(0,0,0,0)"); g.fillStyle = r; g.fillRect(0, 0, 64, 64); return s; }
  const sVerde = sprite("rgba(230,255,140,1)", "rgba(150,255,60,.45)"), sOro = sprite("rgba(255,244,190,1)", "rgba(255,200,70,.55)"), sRosa = sprite("rgba(255,235,240,1)", "rgba(255,150,190,.5)");
  function medir() { const r = window.devicePixelRatio || 1; W = innerWidth; H = innerHeight; cv.width = W * r; cv.height = H * r; ctx.setTransform(r, 0, 0, r, 0, 0); }
  window.addEventListener("resize", medir); medir();
  const luciernagas = [];
  for (let i = 0; i < n; i++) luciernagas.push({ x: alea(W * .15, W * .85), y: alea(H * .25, H * .65), a: alea(0, 6.28), v: alea(.25, .5), f: alea(0, 6.28), msg: i, tam: 56, tx: 0, ty: 0 });
  for (let i = 0; i < 30; i++) luciernagas.push({ x: alea(0, W), y: alea(H * .15, H * .75), a: alea(0, 6.28), v: alea(.2, .6), f: alea(0, 6.28), msg: -1, tam: alea(16, 26), tx: 0, ty: 0 });
  const hierba = Array.from({ length: 150 }, (_, i) => ({ x: i / 150 * (W + 40) - 20 + alea(-6, 6), h: alea(40, 120), f: alea(0, 6.28), c: ["#0C2A1C", "#123824", "#0A2016", "#18462B"][i % 4] }));
  const estrellas = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random() * .55, r: alea(.5, 1.5), f: alea(0, 6.28) }));
  function objetivosCorazon() {
    const cx = W / 2, cy = H * .4, k = Math.min(W, H) * .021, tot = luciernagas.length;
    luciernagas.forEach((l, i) => { const a = i / tot * 6.2832, x = 16 * Math.pow(Math.sin(a), 3), y = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)); l.tx = cx + x * k; l.ty = cy + y * k; });
  }
  function cielo() {
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#040814"); g.addColorStop(.6, "#0A1B2E"); g.addColorStop(1, "#0F2A22"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    estrellas.forEach(s => { ctx.globalAlpha = .4 + .5 * Math.sin(t * 1.4 + s.f) ** 2; ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.r, 0, 7); ctx.fill(); }); ctx.globalAlpha = 1;
    const m = ctx.createRadialGradient(W * .82, H * .12, 4, W * .82, H * .12, 70); m.addColorStop(0, "#FFF8D8"); m.addColorStop(.35, "#F2E3A0"); m.addColorStop(1, "rgba(242,227,160,0)"); ctx.fillStyle = m; ctx.beginPath(); ctx.arc(W * .82, H * .12, 70, 0, 7); ctx.fill();
    ctx.fillStyle = "#0A1A18"; ctx.beginPath(); ctx.moveTo(0, H * .72); ctx.quadraticCurveTo(W * .3, H * .6, W * .55, H * .74); ctx.quadraticCurveTo(W * .8, H * .64, W, H * .72); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
    [[.1, .86, .22, .1], [.9, .88, .26, .12]].forEach(([x, y, rx, ry]) => { ctx.fillStyle = "#06120F"; ctx.beginPath(); ctx.ellipse(x * W, y * H, rx * W, ry * H, 0, 0, 7); ctx.fill(); });
  }
  function dibujarHierba() {
    ctx.lineCap = "round";
    hierba.forEach(b => { const s = Math.sin(t * 1.3 + b.f) * 7; ctx.strokeStyle = b.c; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(b.x, H + 4); ctx.quadraticCurveTo(b.x + s * .4, H - b.h * .6, b.x + s, H - b.h); ctx.stroke(); });
    const nb = ctx.createLinearGradient(0, H * .8, 0, H); nb.addColorStop(0, "rgba(120,200,160,0)"); nb.addColorStop(1, "rgba(120,200,160,.14)"); ctx.fillStyle = nb; ctx.fillRect(0, H * .8, W, H * .2);
  }
  function actualizar(l) {
    if (corazon) { l.x += (l.tx - l.x) * .035 + Math.sin(t * 2 + l.f) * .25; l.y += (l.ty - l.y) * .035 + Math.cos(t * 2 + l.f) * .25; return; }
    l.a += (Math.random() - .5) * .35; l.x += Math.cos(l.a) * l.v; l.y += Math.sin(l.a) * l.v * .7;
    if (l.x < 20) l.a = 0; if (l.x > W - 20) l.a = Math.PI; if (l.y < H * .14) l.a = Math.PI / 2; if (l.y > H * .8) l.a = -Math.PI / 2;
  }
  function cuadro(ahora) {
    t += Math.min(.05, (ahora - previo) / 1000 || 0); previo = ahora; cielo();
    luciernagas.forEach(l => {
      actualizar(l); const leida = l.msg >= 0 && leidas.has(l.msg), pulso = .5 + .5 * Math.sin(t * (l.msg >= 0 ? 2.2 : 3.4) + l.f), tam = l.tam * (.8 + pulso * .35);
      ctx.globalAlpha = l.msg >= 0 ? (leida ? .95 : .55 + pulso * .45) : .35 + pulso * .55; ctx.drawImage(leida ? sOro : (corazon ? sRosa : sVerde), l.x - tam / 2, l.y - tam / 2, tam, tam);
      if (l.msg >= 0 && !leida) { ctx.globalAlpha = .5 + pulso * .5; ctx.strokeStyle = "rgba(255,255,200,.7)"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(l.x, l.y, 22 + pulso * 7, 0, 7); ctx.stroke(); }
    });
    ctx.globalAlpha = 1; dibujarHierba(); requestAnimationFrame(cuadro);
  }
  function abrir(i) {
    const m = d.mensajes[i]; abierto = i; $("tTit").textContent = m.titulo; $("tTxt").textContent = m.texto; const f = $("tFoto"); f.replaceChildren(); f.hidden = !m.foto;
    if (m.foto) { const im = document.createElement("img"); im.src = m.foto; im.alt = ""; f.append(im); }
    $("tarjeta").hidden = false; leidas.add(i); $("cuenta").textContent = "Luciérnagas leídas: " + leidas.size + " de " + n; $("cerrar").focus();
  }
  cv.addEventListener("pointerdown", e => {
    if (corazon || !$("tarjeta").hidden) return; let mejor = -1, md = 52 * 52;
    luciernagas.forEach(l => { if (l.msg < 0 || leidas.has(l.msg)) return; const dd = (l.x - e.clientX) ** 2 + (l.y - e.clientY) ** 2; if (dd < md) { md = dd; mejor = l.msg; } });
    if (mejor >= 0) abrir(mejor);
  });
  $("cerrar").onclick = () => { $("tarjeta").hidden = true; if (leidas.size === n && !corazon) { corazon = true; objetivosCorazon(); $("final").hidden = false; $("final").textContent = d.final; $("ayuda").textContent = ""; } };
  $("cuenta").textContent = "Luciérnagas leídas: 0 de " + n;
  requestAnimationFrame(cuadro);
  window.Jardin = { abrir, leidas: () => leidas.size, corazon: () => corazon };
})();
