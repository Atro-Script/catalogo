/* Lluvia de la suerte: al romper la galleta salen monedas de oro que giran y estrellas fugaces; en reposo, destellos orbitan la galleta. */
(function () {
  const rm = matchMedia("(prefers-reduced-motion:reduce)").matches; if (rm) return;
  const g = document.getElementById("galleta"); if (!g) return;
  const c = document.createElement("canvas"); c.setAttribute("aria-hidden", "true"); c.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:6"; document.body.appendChild(c);
  const x = c.getContext("2d"); let W, H, dpr = Math.min(2, devicePixelRatio || 1), M = [], S = [], roto = false;
  const rs = () => { W = innerWidth; H = innerHeight; c.width = W * dpr; c.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0); }; rs(); addEventListener("resize", rs);
  const acento = () => getComputedStyle(document.documentElement).getPropertyValue("--acento").trim() || "#FFC857";
  new MutationObserver(() => { const r = g.classList.contains("rota"); if (r && !roto) lluvia(); roto = r; }).observe(g, { attributes: true, attributeFilter: ["class"] });
  function lluvia() {
    const b = g.getBoundingClientRect(), cx = b.left + b.width / 2, cy = b.top + b.height / 2;
    for (let i = 0; i < 46; i++) M.push({ x: cx, y: cy, vx: (Math.random() - .5) * 9, vy: -7 - Math.random() * 9, r: 7 + Math.random() * 7, ph: Math.random() * 6, w: .15 + Math.random() * .2, l: 1 });
    for (let i = 0; i < 6; i++) S.push({ x: Math.random() * W * 1.2 - W * .1, y: -20 - Math.random() * 200, l: 1, v: 9 + Math.random() * 6 });
  }
  (function f(t) {
    x.clearRect(0, 0, W, H); const b = g.getBoundingClientRect(), cx = b.left + b.width / 2, cy = b.top + b.height / 2, ac = acento();
    if (!roto) for (let i = 0; i < 7; i++) { const a = t / 1400 + i * .9, rr = b.width * (.52 + .06 * Math.sin(t / 500 + i)); x.globalAlpha = .5 + .5 * Math.sin(t / 300 + i * 2); x.fillStyle = ac; x.shadowColor = ac; x.shadowBlur = 10; x.beginPath(); x.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * .55, 2.2, 0, 6.283); x.fill(); }
    x.shadowBlur = 0;
    for (let i = M.length - 1; i >= 0; i--) {
      const m = M[i]; m.x += m.vx; m.y += m.vy; m.vy += .35; m.vx *= .99; m.ph += m.w; m.l -= .004; if (m.y > H + 30 || m.l <= 0) { M.splice(i, 1); continue; }
      const e = Math.abs(Math.cos(m.ph)); x.globalAlpha = Math.min(1, m.l * 2); x.save(); x.translate(m.x, m.y); x.scale(Math.max(.12, e), 1);
      const gr = x.createRadialGradient(-m.r * .3, -m.r * .3, 1, 0, 0, m.r); gr.addColorStop(0, "#FFF3B0"); gr.addColorStop(.6, "#F2B632"); gr.addColorStop(1, "#B7791F");
      x.fillStyle = gr; x.beginPath(); x.arc(0, 0, m.r, 0, 6.283); x.fill(); x.strokeStyle = "#8A5A12"; x.lineWidth = 1.2; x.beginPath(); x.arc(0, 0, m.r * .62, 0, 6.283); x.stroke(); x.restore();
    }
    for (let i = S.length - 1; i >= 0; i--) { const s = S[i]; s.x -= s.v * .6; s.y += s.v; s.l -= .012; if (s.l <= 0) { S.splice(i, 1); continue; } const gr = x.createLinearGradient(s.x, s.y, s.x + s.v * 5, s.y - s.v * 8); gr.addColorStop(0, "rgba(255,255,255," + s.l + ")"); gr.addColorStop(1, "rgba(255,255,255,0)"); x.globalAlpha = 1; x.strokeStyle = gr; x.lineWidth = 2; x.beginPath(); x.moveTo(s.x, s.y); x.lineTo(s.x + s.v * 5, s.y - s.v * 8); x.stroke(); }
    x.globalAlpha = 1; requestAnimationFrame(f);
  })(0);
})();
