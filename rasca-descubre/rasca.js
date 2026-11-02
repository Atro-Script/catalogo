(function () {
  const d = window.DATOS;
  const $ = id => document.getElementById(id);
  const cv = $("foil"), ctx = cv.getContext("2d", { willReadFrequently: true });
  let listo = false, abajo = false, W = 0, H = 0;
  document.title = d.titulo; $("titulo").textContent = d.titulo; $("instruccion").textContent = d.instruccion;
  $("emoji").textContent = d.secreto.emoji; $("sTitulo").textContent = d.secreto.titulo; $("sTexto").textContent = d.secreto.texto;

  function pintarFoil() {
    const r = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const g = ctx.createLinearGradient(0, 0, W, H); d.colorFoil.forEach((c, i) => g.addColorStop(i / (d.colorFoil.length - 1), c));
    ctx.globalCompositeOperation = "source-over"; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 1400; i++) { ctx.fillStyle = Math.random() > .5 ? "rgba(255,255,255,.35)" : "rgba(80,90,110,.22)"; ctx.fillRect(Math.random() * W, Math.random() * H, 2, 2); }
    ctx.fillStyle = "rgba(60,70,90,.55)"; ctx.font = "700 " + Math.round(W / 9) + "px 'Segoe UI',sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("RASCA AQUÍ", W / 2, H / 2);
  }
  function rascar(e) {
    if (!abajo || listo) return;
    const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    ctx.globalCompositeOperation = "destination-out"; ctx.beginPath(); ctx.arc(x, y, Math.max(18, W / 12), 0, 7); ctx.fill();
    if (++contador % 8 === 0) revisar();
  }
  let contador = 0;
  function revisar() {
    const p = ctx.getImageData(0, 0, cv.width, cv.height).data; let claros = 0, n = 0;
    for (let i = 3; i < p.length; i += 4 * 40) { n++; if (p[i] < 20) claros++; }
    if (claros / n > .55) terminar();
  }
  function terminar() {
    if (listo) return; listo = true; cv.classList.add("fuera"); $("revelar").hidden = true; $("premio").classList.add("ver");
    for (let i = 0; i < 70; i++) {
      const c = document.createElement("span"); c.className = "confeti";
      c.style.left = Math.random() * 100 + "%"; c.style.background = ["#FFD23F", "#FF5C8A", "#4ADEFF", "#7A4DFF", "#4CD964"][i % 5];
      c.style.animationDuration = (2 + Math.random() * 3) + "s"; c.style.animationDelay = (Math.random() * .5) + "s";
      document.body.append(c); setTimeout(() => c.remove(), 6000);
    }
  }
  cv.addEventListener("pointerdown", e => { abajo = true; cv.setPointerCapture(e.pointerId); rascar(e); });
  cv.addEventListener("pointermove", rascar);
  cv.addEventListener("pointerup", () => { abajo = false; revisar(); });
  cv.addEventListener("pointercancel", () => { abajo = false; });
  $("revelar").onclick = terminar;
  addEventListener("resize", () => { if (!listo) pintarFoil(); });
  pintarFoil();
})();
