/* Vórtice del tiempo: arena dorada que gira alrededor de la cápsula (detrás y delante de ella). Al abrirla se contrae y estalla. */
(function () {
  const rm = matchMedia("(prefers-reduced-motion:reduce)").matches; if (rm) return;
  const esc = document.querySelector(".escena"), main = document.querySelector("main"); if (!esc) return;
  main.style.zIndex = "1";
  const mk = z => { const c = document.createElement("canvas"); c.setAttribute("aria-hidden", "true"); c.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:" + z; document.body.appendChild(c); return c; };
  const back = mk(0), front = mk(2), bx = back.getContext("2d"), fx = front.getContext("2d");
  let W, H, dpr = Math.min(2, devicePixelRatio || 1);
  const rs = () => { W = innerWidth; H = innerHeight; [back, front].forEach(c => { c.width = W * dpr; c.height = H * dpr; c.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0); }); };
  rs(); addEventListener("resize", rs);
  const P = Array.from({ length: 150 }, () => ({ a: Math.random() * 6.283, r: 40 + Math.random() * 190, v: .6 + Math.random() * .8, h: (Math.random() - .5) * 150, s: .8 + Math.random() * 1.8, c: Math.random() < .25 ? "#FFF3C4" : "#E0B554" }));
  let fase = "gira", t0 = 0, giro = 1, bur = [];
  esc.addEventListener("pointerdown", () => { giro = 5; });
  addEventListener("pointerup", () => { giro = 1; });
  document.addEventListener("click", e => { if (e.target.id === "abrir" && fase === "gira") { fase = "implota"; t0 = performance.now(); } }, true);
  function estallar(cx, cy) { for (let i = 0; i < 160; i++) { const a = Math.random() * 6.283, v = 3 + Math.random() * 9; bur.push({ x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, l: 1, s: 1 + Math.random() * 3, g: ["✦", "·", "◆", "✧"][i % 4], c: i % 3 ? "#E0B554" : "#F2EAD3" }); } fase = "fin"; }
  (function f(t) {
    bx.clearRect(0, 0, W, H); fx.clearRect(0, 0, W, H);
    const r = esc.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    if (fase === "implota" && t - t0 > 750) estallar(cx, cy);
    if (fase !== "fin") P.forEach(p => {
      p.a += .012 * p.v * giro * (fase === "implota" ? 3 : 1);
      if (fase === "implota") p.r *= .96;
      const rx = p.r * 1.25, sy = Math.sin(p.a), x = cx + Math.cos(p.a) * rx, y = cy + p.h * (p.r / 230) + sy * rx * .28;
      const k = fase === "implota" ? 1 : .55 + .45 * (p.r / 230), c = sy > 0 ? fx : bx;
      c.globalAlpha = (.35 + .5 * Math.abs(sy)) * k; c.fillStyle = p.c; c.shadowColor = p.c; c.shadowBlur = 6; c.beginPath(); c.arc(x, y, p.s * (.7 + .5 * sy), 0, 6.283); c.fill();
    });
    fx.shadowBlur = 0;
    for (let i = bur.length - 1; i >= 0; i--) { const b = bur[i]; b.x += b.vx; b.y += b.vy; b.vx *= .985; b.vy = b.vy * .985 + .12; b.l -= .012; if (b.l <= 0) { bur.splice(i, 1); continue; } fx.globalAlpha = b.l; fx.fillStyle = b.c; fx.font = (10 + b.s * 5) + "px serif"; fx.fillText(b.g, b.x, b.y); }
    fx.globalAlpha = bx.globalAlpha = 1; requestAnimationFrame(f);
  })(0);
})();
