(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  document.documentElement.style.setProperty("--h", d.colorFlor != null ? d.colorFlor : 270);
  document.title = "Un ramo para " + d.para;
  $("cargaTxt").textContent = d.carga; $("titulo").textContent = d.titulo;
  $("para").textContent = "Para " + d.para; $("msg").textContent = d.mensaje; $("cierre").textContent = d.cierre;

  // ---- piezas dibujadas ----
  const daisy = () => {
    let p = ""; for (let k = 0; k < 14; k++) p += `<ellipse cx="0" cy="-34" rx="10" ry="25" transform="rotate(${k * 360 / 14})" fill="url(#gp)" stroke="hsl(var(--h) 60% 40%)" stroke-width=".6"/>`;
    return p + `<circle r="19" fill="#12041f" stroke="hsl(var(--h) 55% 32%)" stroke-width="3"/><circle r="11" fill="none" stroke="hsl(var(--h) 40% 22%)" stroke-width="1.5" stroke-dasharray="2 3"/>`;
  };
  const ramo = (pasto) => {
    const fl = [[160, 96, 1], [96, 134, .92], [224, 134, .92], [62, 206, .8], [160, 176, 1.05], [258, 206, .8], [108, 254, .86], [212, 254, .86]];
    let s = "", f = "", g = "";
    fl.forEach(([x, y, k], i) => {
      s += `<path class="tallo" style="--d:${(.2 + i * .12).toFixed(2)}s" d="M160 372Q${(160 + x) / 2} ${(372 + y) / 2 + 24} ${x} ${y}"/>`;
      f += `<g transform="translate(${x} ${y}) scale(${(k * .78).toFixed(2)})"><g class="fl" style="--d:${(.9 + i * .22).toFixed(2)}s">${daisy()}</g></g>`;
    });
    if (pasto) for (let i = 0; i < 12; i++) { const x = 20 + i * 25, dx = (i % 2 ? 1 : -1) * (8 + i * 2 % 14); g += `<path class="hoja" style="--d:${(.3 + i * .08).toFixed(2)}s" d="M${x} 378Q${x + dx} 340 ${x + dx * 1.8} ${318 - (i % 3) * 14}"/>`; }
    return `<svg viewBox="0 0 320 380">${g}${s}${f}</svg>`;
  };
  const campana = () => {
    let p = "", e = "";
    for (let k = 0; k < 5; k++) {
      const a = k * 72;
      p += `<g transform="rotate(${a})"><path class="pet" style="--d:${(k * .13).toFixed(2)}s" d="M0 0C-40 -26 -38 -72 0 -92C38 -72 40 -26 0 0Z" fill="url(#gc)" stroke="hsl(var(--h) 80% 80%/.5)" stroke-width="1"/><path d="M0 -8V-80" stroke="hsl(var(--h) 85% 88%/.5)" stroke-width="1.2"/></g>`;
      e += `<g transform="rotate(${a + 36})"><path d="M0 -3Q9 -24 0 -42" fill="none" stroke="#fff" stroke-width="1.6"/><circle cy="-42" r="3.4" fill="#fff"/></g>`;
    }
    return `<svg viewBox="-100 -100 200 200">${p}<circle r="10" fill="#f6edff"/>${e}</svg>`;
  };
  const lazo = `<svg viewBox="0 0 300 120"><path d="M150 56C110 8 40 14 36 52C34 88 108 90 150 62Z" fill="url(#gb)"/><path d="M150 56C190 8 260 14 264 52C266 88 192 90 150 62Z" fill="url(#gb)"/><path d="M142 70L108 116L140 104L150 118L152 74Z" fill="#8a0f7c"/><path d="M158 70L192 116L160 104L150 118L148 74Z" fill="#8a0f7c"/><rect x="133" y="43" width="34" height="31" rx="9" fill="#d12fbb"/><path d="M60 40C90 26 118 40 140 56M240 40C210 26 182 40 160 56" stroke="#ffd0f4" stroke-width="2" fill="none" opacity=".7"/></svg>`;
  $("florBarra").innerHTML = campana();

  // ---- cielo de estrellas ----
  const cv = $("cielo"), cx = cv.getContext("2d"); let W, H, est = [];
  function medir() { W = cv.width = innerWidth; H = cv.height = innerHeight; est = Array.from({ length: 130 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.4 + .3, f: Math.random() * 6.28, v: .6 + Math.random() * 1.6 })); }
  function cielo(t) {
    cx.clearRect(0, 0, W, H);
    est.forEach(s => { cx.globalAlpha = .35 + .65 * Math.abs(Math.sin(s.f + t * .001 * s.v)); cx.fillStyle = "#fff"; cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, 6.28); cx.fill(); });
    if (!rm) requestAnimationFrame(cielo);
  }
  medir(); addEventListener("resize", medir); requestAnimationFrame(cielo);

  // ---- secuencia ----
  const ver = id => { ["carga", "noche", "zoom", "tarjeta"].forEach(x => $(x).hidden = x !== id); };
  let fase = 0;
  function carga() {
    const t0 = performance.now(), dur = rm ? 400 : 3000;
    (function f(n) {
      const e = Math.min(1, (n - t0) / dur), p = 100 * (1 - Math.pow(1 - e, 2.2));
      $("carga").style.setProperty("--p", p.toFixed(1)); $("pct").textContent = Math.round(p) + "%";
      if (e < 1) requestAnimationFrame(f); else setTimeout(noche, 450);
    })(t0);
  }
  function noche() { fase = 1; ver("noche"); $("ramo").innerHTML = ramo(true); setTimeout(() => { if (fase === 1) abrir(); }, 22000); }
  function abrir() {
    if (fase !== 1) return; fase = 2; ver("zoom"); $("campana").innerHTML = campana();
    setTimeout(tarjeta, rm ? 800 : 3600);
  }
  function tarjeta() { fase = 3; ver("tarjeta"); $("ilustra").innerHTML = ramo(false); $("lazo").innerHTML = lazo; }
  $("ramo").onclick = abrir;
  $("ramo").onkeydown = e => { if (e.key === "Enter" || e.key === " ") abrir(); };
  $("otra").onclick = () => location.reload();
  carga();
})();
