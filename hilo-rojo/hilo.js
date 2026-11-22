(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  const cv = $("lienzo"), cx = cv.getContext("2d"), N = 64;
  let W, H, DPR = Math.min(devicePixelRatio || 1, 2), P = [], L = 10;
  const FUENTE = f => f + 'px "Segoe Script","Brush Script MT","Lucida Handwriting",cursive';
  function medir() { W = innerWidth; H = innerHeight; cv.width = W * DPR; cv.height = H * DPR; cv.style.width = W + "px"; cv.style.height = H + "px"; cx.setTransform(DPR, 0, 0, DPR, 0, 0); }
  const ancla = () => ({ x: W * 1.06, y: H * .96 });
  function iniciar() {
    medir(); const a = ancla(); P = [];
    for (let i = 0; i < N; i++) {
      const k = i / (N - 1), x = W * .5 + (a.x - W * .5) * k, y = H * .45 + (a.y - H * .45) * k, o = Math.sin(i * .42) * Math.min(W, H) * .22 * (1 - k * .4);
      const nx = -(a.y - H * .45), ny = a.x - W * .5, m = Math.hypot(nx, ny) || 1;
      P.push({ x: x + nx / m * o, y: y + ny / m * o, px: 0, py: 0 }); P[i].px = P[i].x; P[i].py = P[i].y;
    }
    let tot = 0; for (let i = 0; i < N - 1; i++) tot += Math.hypot(P[i + 1].x - P[i].x, P[i + 1].y - P[i].y);
    L = tot / (N - 1) * 1.08;
  }
  iniciar(); addEventListener("resize", iniciar);

  // ----- interacción con el dedo -----
  let toque = false, ultimo = -9999, tgt = { x: W / 2, y: H * .45 }, modo = "auto", r = 0, alfaTxt = 1;
  const pos = e => { tgt.x = e.clientX; tgt.y = e.clientY; };
  cv.addEventListener("pointerdown", e => { toque = true; pos(e); $("aviso").classList.add("no"); cv.setPointerCapture(e.pointerId); });
  cv.addEventListener("pointermove", e => { if (toque) pos(e); });
  const suelta = () => { toque = false; ultimo = performance.now(); };
  cv.addEventListener("pointerup", suelta); cv.addEventListener("pointercancel", suelta);

  // ----- física del hilo (verlet) -----
  function paso(t) {
    let hx, hy;
    if (modo === "texto") {
      const fs = Math.min(W * .21, 112); cx.font = FUENTE(fs); const w = cx.measureText(d.destinatario).width;
      hx = (W - w) / 2 + w * r; hy = H * .46 - fs * .15 + Math.sin(t * .02) * fs * .22;
    } else if (toque || t - ultimo < 1800) { hx = tgt.x; hy = tgt.y; }
    else { hx = W * .5 + Math.sin(t * .0011) * W * .4; hy = H * .46 + Math.sin(t * .0016 + 1) * H * .24; }
    const h = P[0]; h.x += (hx - h.x) * .22; h.y += (hy - h.y) * .22; h.px = h.x; h.py = h.y;
    for (let i = 1; i < N - 1; i++) { const p = P[i], vx = (p.x - p.px) * .978, vy = (p.y - p.py) * .978; p.px = p.x; p.py = p.y; p.x += vx; p.y += vy + .05; }
    const a = ancla();
    for (let it = 0; it < 8; it++) {
      P[N - 1].x = a.x; P[N - 1].y = a.y;
      for (let i = 0; i < N - 1; i++) {
        const A = P[i], B = P[i + 1], dx = B.x - A.x, dy = B.y - A.y, dist = Math.hypot(dx, dy) || .001, f = (dist - L) / dist;
        if (i === 0) { B.x -= dx * f; B.y -= dy * f; } else if (i + 1 === N - 1) { A.x += dx * f; A.y += dy * f; }
        else { A.x += dx * f * .5; A.y += dy * f * .5; B.x -= dx * f * .5; B.y -= dy * f * .5; }
      }
    }
  }
  function ruta() {
    cx.beginPath(); cx.moveTo(P[0].x, P[0].y);
    for (let i = 1; i < N - 1; i++) cx.quadraticCurveTo(P[i].x, P[i].y, (P[i].x + P[i + 1].x) / 2, (P[i].y + P[i + 1].y) / 2);
  }
  function dibujar() {
    cx.clearRect(0, 0, W, H); cx.lineCap = cx.lineJoin = "round";
    if (modo === "texto" || alfaTxt < 1) {
      const fs = Math.min(W * .21, 112); cx.save(); cx.font = FUENTE(fs); cx.textAlign = "left";
      const w = cx.measureText(d.destinatario).width, x0 = (W - w) / 2;
      cx.globalAlpha = alfaTxt; cx.beginPath(); cx.rect(x0 - 30, 0, w * r + 34, H); cx.clip();
      cx.shadowColor = "rgba(255,30,70,.95)"; cx.shadowBlur = 22; cx.fillStyle = "#ff2a55"; cx.fillText(d.destinatario, x0, H * .5);
      cx.shadowBlur = 0; cx.lineWidth = 1.2; cx.strokeStyle = "#ffb3c1"; cx.strokeText(d.destinatario, x0, H * .5); cx.restore();
    }
    cx.save();
    cx.shadowColor = "rgba(255,30,70,.9)"; cx.shadowBlur = 18; cx.strokeStyle = "rgba(255,40,80,.5)"; cx.lineWidth = 8; ruta(); cx.stroke();
    cx.shadowBlur = 8; cx.strokeStyle = "#ff2a55"; cx.lineWidth = 4; ruta(); cx.stroke();
    cx.shadowBlur = 0; cx.strokeStyle = "#ffa3b4"; cx.lineWidth = 1.3; cx.setLineDash([2, 4]); ruta(); cx.stroke();
    cx.restore();
  }
  (function bucle(t) { paso(t); dibujar(); requestAnimationFrame(bucle); })(0);

  // ----- guion -----
  const fr = $("frase");
  function frase(s) { fr.classList.remove("on"); setTimeout(() => { fr.textContent = s; if (s) fr.classList.add("on"); }, 450); }
  const tt = [], at = (ms, f) => tt.push(setTimeout(f, ms));
  function escribe(ms, fin) { const t0 = performance.now(); (function f(n) { r = Math.min(1, (n - t0) / ms); if (r < 1) requestAnimationFrame(f); else fin && fin(); })(t0); }
  function guion() {
    d.frases.forEach((s, i) => at(500 + i * 3900, () => frase(s)));
    const t1 = 500 + d.frases.length * 3900;
    at(t1, () => { frase(""); modo = "texto"; r = 0; alfaTxt = 1; escribe(3400); });
    at(t1 + 3800, () => frase(d.fraseNombre));
    at(t1 + 7600, () => { frase(""); const t0 = performance.now(); (function f(n) { alfaTxt = Math.max(0, 1 - (n - t0) / 900); if (alfaTxt > 0) requestAnimationFrame(f); else modo = "auto"; })(t0); });
    at(t1 + 8800, rollo);
  }
  function rollo() {
    $("aviso").classList.add("no"); $("rollo").hidden = false; $("jala").textContent = d.jala; frase("");
    cv.style.opacity = .35; cv.style.pointerEvents = "none";
    const c = $("cola"); let y0 = null, y = 0;
    const tira = () => { if (c.dataset.ok) return; c.dataset.ok = 1; $("rollo").classList.add("suelto"); setTimeout(abre, 1500); };
    c.addEventListener("pointerdown", e => { y0 = e.clientY; c.setPointerCapture(e.pointerId); });
    c.addEventListener("pointermove", e => { if (y0 === null) return; y = Math.max(0, e.clientY - y0); c.style.transform = "translateY(" + y * .6 + "px)"; if (y > 90) { y0 = null; tira(); } });
    c.addEventListener("pointerup", () => { if (y0 !== null && y < 8) tira(); else if (!c.dataset.ok) c.style.transform = ""; y0 = null; y = 0; });
    c.addEventListener("keydown", e => { if (e.key === "Enter") tira(); });
  }
  function abre() {
    $("rollo").classList.add("fin");
    $("cPara").textContent = "Para " + d.destinatario; $("cFirma").textContent = d.firma; $("cFirma").className = "firma";
    d.parrafos.forEach((x, i) => { const p = document.createElement("p"); p.textContent = x; p.style.animationDelay = (1 + i * 1.2) + "s"; $("cTexto").append(p); });
    $("cFirma").style.animationDelay = (1 + d.parrafos.length * 1.2) + "s"; $("otra").style.animationDelay = "0s";
    $("carta").hidden = false; setTimeout(() => $("rollo").hidden = true, 900);
  }
  $("otra").onclick = () => location.reload();
  guion();
})();
