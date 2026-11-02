(function () {
  const $ = id => document.getElementById(id), cv = $("lienzo"), cx = cv.getContext("2d"), W = 900, H = 1200, TAU = Math.PI * 2;
  const D = window.DATOS || {}, PERMITE = D.descargas === true;
  const PAL = [
    { n: "Aurora", b: ["#0B1026", "#1B2A6B"], c: ["#7CF5D4", "#6EA8FF", "#C58BFF"], t: "#F2F7FF" },
    { n: "Atardecer", b: ["#2A0F3A", "#8A2A5C"], c: ["#FFC371", "#FF6F91", "#FFE9A8"], t: "#FFF4E6" },
    { n: "Jardín", b: ["#0F2A1F", "#1F5F46"], c: ["#B8F2A0", "#FFD97A", "#FF9EC0"], t: "#F3FFF0" },
    { n: "Océano", b: ["#04202F", "#0B5D7A"], c: ["#7DF0FF", "#FFFFFF", "#8DB6FF"], t: "#EAFBFF" },
    { n: "Rosa y oro", b: ["#FFF1F5", "#FFD3E0"], c: ["#C2185B", "#D4A24C", "#8E3B6F"], t: "#4A1030" },
    { n: "Papel", b: ["#F7F1E5", "#E4D4B4"], c: ["#3A2A1A", "#B5502B", "#5B7F6E"], t: "#2E2216" },
    { n: "Medianoche", b: ["#08060F", "#2B1A3F"], c: ["#FFD23F", "#F12D43", "#FFFFFF"], t: "#FFFFFF" },
    { n: "Lavanda", b: ["#EFE9FF", "#CDBFFF"], c: ["#6A4BD8", "#FF7BAC", "#2D8CFF"], t: "#2B1A66" }
  ];
  const EST = [["mandala", "Mandala", '<circle cx="12" cy="12" r="3"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5M5.6 5.6l3.5 3.5M14.9 14.9l3.5 3.5M18.4 5.6l-3.5 3.5M9.1 14.9l-3.5 3.5"/>'], ["ondas", "Ondas", '<path d="M3 12h1M6 8v8M9 5v14M12 9v6M15 4v16M18 8v8M21 12h-1"/>'], ["constelacion", "Estrellas", '<path d="M4 18l5-8 5 4 6-9"/><circle cx="4" cy="18" r="1.4"/><circle cx="9" cy="10" r="1.4"/><circle cx="14" cy="14" r="1.4"/><circle cx="20" cy="5" r="1.4"/>'], ["orbitas", "Órbitas", '<circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-25 12 12)"/><circle cx="19" cy="8" r="1.3"/>']];
  let est = D.estilo || "mandala", pal = D.paleta | 0;
  $("nombre").value = D.nombre || ""; $("fecha").value = D.fecha || ""; $("frase").value = D.frase || "";
  if (PERMITE) { $("bajar").hidden = false; $("pedir").hidden = true; $("notaVista").hidden = true; }

  function semilla(s) { let h = 1779033703 ^ s.length; for (let i = 0; i < s.length; i++) { h = Math.imul(h ^ s.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; } h = Math.imul(h ^ h >>> 16, 2246822507); h = Math.imul(h ^ h >>> 13, 3266489909); return (h ^= h >>> 16) >>> 0; }
  function rng(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const alfa = (hex, a) => { const n = parseInt(hex.slice(1), 16); return "rgba(" + (n >> 16) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")"; };

  /* ----- estilos ----- */
  function mandala(cx0, cy0, R, P, r, L) {
    const n = 6 + Math.floor(r() * 7);
    for (let ring = 0; ring < 8; ring++) {
      const rad = R * (.1 + ring * .115), k = n * (1 + ring % 2), v = L[ring % L.length];
      for (let i = 0; i < k; i++) {
        cx.save(); cx.translate(cx0, cy0); cx.rotate(i / k * TAU + ring * .21); cx.translate(0, -rad);
        const len = R * .13 * (.7 + v * 1.1), w = R * (.028 + ring * .006) * (.7 + r() * .6);
        cx.beginPath(); cx.moveTo(0, 0); cx.bezierCurveTo(w, -len * .3, w, -len * .8, 0, -len); cx.bezierCurveTo(-w, -len * .8, -w, -len * .3, 0, 0);
        cx.fillStyle = alfa(P.c[ring % 3], .62 - ring * .04); cx.fill(); cx.strokeStyle = alfa(P.c[(ring + 1) % 3], .75); cx.lineWidth = 1.6; cx.stroke(); cx.restore();
      }
      cx.beginPath(); cx.arc(cx0, cy0, rad, 0, TAU); cx.strokeStyle = alfa(P.c[(ring + 2) % 3], .22); cx.lineWidth = 1.2; cx.stroke();
      for (let i = 0; i < k; i++) { const a = (i + .5) / k * TAU + ring * .21; cx.beginPath(); cx.arc(cx0 + Math.cos(a) * rad * 1.06, cy0 + Math.sin(a) * rad * 1.06, 2.4 + ring * .15, 0, TAU); cx.fillStyle = alfa(P.c[ring % 3], .9); cx.fill(); }
    }
    const g = cx.createRadialGradient(cx0, cy0, 0, cx0, cy0, R * .1); g.addColorStop(0, alfa(P.c[2], 1)); g.addColorStop(1, alfa(P.c[0], 0)); cx.fillStyle = g; cx.beginPath(); cx.arc(cx0, cy0, R * .1, 0, TAU); cx.fill();
  }
  function ondas(cx0, cy0, R, P, r, L) {
    const sol = cx.createRadialGradient(cx0, cy0, R * .1, cx0, cy0, R * .95); sol.addColorStop(0, alfa(P.c[1], .35)); sol.addColorStop(1, alfa(P.c[1], 0)); cx.fillStyle = sol; cx.beginPath(); cx.arc(cx0, cy0, R, 0, TAU); cx.fill();
    const N = 61, pasos = []; let ph = r() * 6, ph2 = r() * 6;
    for (let i = 0; i < N; i++) {
      const x = i / (N - 1), env = Math.pow(Math.sin(x * Math.PI), .8), ruido = .55 + .3 * Math.sin(x * 11 + ph) + .15 * Math.sin(x * 27 + ph2);
      const li = L[Math.floor(x * L.length) % L.length], pico = Math.exp(-Math.pow((x - (Math.floor(x * L.length) + .5) / L.length) * L.length * 2.2, 2)) * li * .5;
      pasos.push(Math.min(1, env * (ruido * .8 + pico + .08)));
    }
    const bw = (R * 2) / N;
    pasos.forEach((h, i) => {
      const x = cx0 - R + i * bw + bw / 2, hh = h * R * 1.15, g = cx.createLinearGradient(0, cy0 - hh, 0, cy0 + hh); g.addColorStop(0, P.c[0]); g.addColorStop(.5, P.c[2]); g.addColorStop(1, P.c[1]);
      cx.strokeStyle = g; cx.lineWidth = bw * .56; cx.lineCap = "round"; cx.beginPath(); cx.moveTo(x, cy0 - hh); cx.lineTo(x, cy0 + hh); cx.stroke();
    });
    cx.strokeStyle = alfa(P.c[2], .5); cx.lineWidth = 2; cx.beginPath(); cx.moveTo(cx0 - R, cy0); cx.lineTo(cx0 + R, cy0); cx.stroke();
  }
  function estrella(x, y, s, col) {
    const g = cx.createRadialGradient(x, y, 0, x, y, s * 3.2); g.addColorStop(0, alfa(col, .9)); g.addColorStop(1, alfa(col, 0)); cx.fillStyle = g; cx.beginPath(); cx.arc(x, y, s * 3.2, 0, TAU); cx.fill();
    cx.fillStyle = col; cx.beginPath(); for (let i = 0; i < 8; i++) { const a = i / 8 * TAU - Math.PI / 2, rr = i % 2 ? s * .38 : s * 1.5; cx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } cx.closePath(); cx.fill();
  }
  function constelacion(cx0, cy0, R, P, r, L, letras) {
    for (let i = 0; i < 90; i++) { const a = r() * TAU, d = Math.sqrt(r()) * R * 1.05; cx.fillStyle = alfa(P.c[i % 3], .25 + r() * .5); cx.beginPath(); cx.arc(cx0 + Math.cos(a) * d, cy0 + Math.sin(a) * d, .8 + r() * 1.8, 0, TAU); cx.fill(); }
    const n = Math.max(5, letras.length), pts = []; let x = cx0 - R * .72, y = cy0 + (r() - .5) * R * .6;
    for (let i = 0; i < n; i++) { pts.push([x, y]); x += (R * 1.44) / (n - 1) * (.7 + r() * .6); y += (r() - .5) * R * .75; x = Math.min(cx0 + R * .78, x); y = Math.max(cy0 - R * .72, Math.min(cy0 + R * .72, y)); }
    cx.strokeStyle = alfa(P.c[2], .65); cx.lineWidth = 2.2; cx.setLineDash([10, 9]); cx.beginPath(); pts.forEach((p, i) => i ? cx.lineTo(p[0], p[1]) : cx.moveTo(p[0], p[1])); cx.stroke(); cx.setLineDash([]);
    pts.forEach((p, i) => { const v = L[i % L.length]; estrella(p[0], p[1], 11 + v * 15, P.c[i % 3]); if (letras[i]) { cx.fillStyle = alfa(P.t, .9); cx.font = "600 30px Georgia,serif"; cx.textAlign = "center"; cx.fillText(letras[i].toUpperCase(), p[0] + 24, p[1] - 22); } });
  }
  function orbitas(cx0, cy0, R, P, r, L, letras) {
    const n = Math.max(4, Math.min(8, letras.length)), tilt = -.38 + r() * .2;
    const sol = cx.createRadialGradient(cx0, cy0, 0, cx0, cy0, R * .3); sol.addColorStop(0, "#fff"); sol.addColorStop(.25, P.c[0]); sol.addColorStop(1, alfa(P.c[0], 0)); cx.fillStyle = sol; cx.beginPath(); cx.arc(cx0, cy0, R * .3, 0, TAU); cx.fill();
    for (let i = 0; i < n; i++) {
      const rx = R * (.3 + i * .7 / n), ry = rx * .42; cx.save(); cx.translate(cx0, cy0); cx.rotate(tilt); cx.beginPath(); cx.ellipse(0, 0, rx, ry, 0, 0, TAU); cx.strokeStyle = alfa(P.c[(i + 1) % 3], .45); cx.lineWidth = 1.8; cx.stroke();
      const a = r() * TAU, px = Math.cos(a) * rx, py = Math.sin(a) * ry, v = L[i % L.length], s = 11 + v * 24, g = cx.createRadialGradient(px - s * .3, py - s * .3, s * .1, px, py, s);
      g.addColorStop(0, "#fff"); g.addColorStop(.35, P.c[i % 3]); g.addColorStop(1, alfa(P.c[i % 3], .55)); cx.fillStyle = g; cx.beginPath(); cx.arc(px, py, s, 0, TAU); cx.fill();
      if (i % 3 === 1) { cx.strokeStyle = alfa(P.c[(i + 2) % 3], .8); cx.lineWidth = 3; cx.beginPath(); cx.ellipse(px, py, s * 1.7, s * .5, -.4, 0, TAU); cx.stroke(); }
      cx.restore();
    }
  }
  const ESTILOS = { mandala, ondas, constelacion, orbitas };

  /* ----- poster ----- */
  function ajusta(txt, fuente, max, ini) { let s = ini; do { cx.font = fuente.replace("#", s); s -= 4; } while (cx.measureText(txt).width > max && s > 28); }
  function dibujar() {
    const P = PAL[pal], nombre = $("nombre").value.trim() || "Tu nombre", fecha = $("fecha").value.trim(), frase = $("frase").value.trim();
    const letras = nombre.toLowerCase().normalize("NFD").replace(/[^a-z]/g, "").split(""), L = letras.map(c => (c.charCodeAt(0) - 96) / 26); if (!L.length) L.push(.5);
    const r = rng(semilla(nombre.toLowerCase() + "|" + fecha + "|" + est));
    const bg = cx.createLinearGradient(0, 0, W * .3, H); bg.addColorStop(0, P.b[0]); bg.addColorStop(1, P.b[1]); cx.fillStyle = bg; cx.fillRect(0, 0, W, H);
    for (let i = 0; i < 60; i++) { cx.fillStyle = alfa(P.c[i % 3], .08 + r() * .12); cx.beginPath(); cx.arc(r() * W, r() * H, 1 + r() * 2.4, 0, TAU); cx.fill(); }
    ESTILOS[est](W / 2, 520, 345, P, r, L, letras);
    cx.strokeStyle = alfa(P.t, .55); cx.lineWidth = 3; cx.strokeRect(34, 34, W - 68, H - 68); cx.strokeStyle = alfa(P.t, .25); cx.lineWidth = 1.5; cx.strokeRect(48, 48, W - 96, H - 96);
    cx.textAlign = "center"; cx.fillStyle = P.t; ajusta(nombre, 'italic 700 #px Georgia,"Times New Roman",serif', W - 190, 150); cx.fillText(nombre, W / 2, 985);
    cx.strokeStyle = alfa(P.c[0], .9); cx.lineWidth = 2.5; cx.beginPath(); cx.moveTo(W / 2 - 70, 1022); cx.lineTo(W / 2 + 70, 1022); cx.stroke();
    cx.fillStyle = alfa(P.t, .88); if (fecha) { cx.font = "600 34px Georgia,serif"; cx.fillText(fecha, W / 2, 1078); }
    if (frase) { cx.font = 'italic 30px Georgia,serif'; cx.fillStyle = alfa(P.t, .72); cx.fillText(frase, W / 2, fecha ? 1128 : 1090); }
    if (!PERMITE) marca();
  }
  function marca() {
    cx.save(); cx.translate(W / 2, H / 2); cx.rotate(-.5); cx.font = "700 44px sans-serif"; cx.textAlign = "center"; cx.fillStyle = "rgba(255,255,255,.2)"; cx.strokeStyle = "rgba(0,0,0,.14)"; cx.lineWidth = 2;
    for (let y = -900; y <= 900; y += 150) for (let x = -900; x <= 900; x += 560) { const xx = x + (y / 150 % 2 ? 280 : 0); cx.strokeText("VISTA PREVIA · ATROSCRIPT", xx, y); cx.fillText("VISTA PREVIA · ATROSCRIPT", xx, y); }
    cx.restore();
  }

  /* ----- panel ----- */
  EST.forEach(([id, n, ico]) => { const b = document.createElement("button"); b.type = "button"; b.dataset.id = id; b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + ico + "</svg><span>" + n + "</span>"; b.onclick = () => { est = id; marcar(); dibujar(); }; $("estilos").append(b); });
  PAL.forEach((p, i) => { const b = document.createElement("button"); b.type = "button"; b.setAttribute("aria-label", p.n); b.style.background = "linear-gradient(135deg," + p.b[0] + " 0 45%," + p.c[0] + " 45% 70%," + p.c[1] + " 70%)"; b.onclick = () => { pal = i; marcar(); dibujar(); }; $("paletas").append(b); });
  function marcar() { [...$("estilos").children].forEach(b => b.classList.toggle("on", b.dataset.id === est)); [...$("paletas").children].forEach((b, i) => b.classList.toggle("on", i === pal)); $("nPal").textContent = "· " + PAL[pal].n; }
  ["nombre", "fecha", "frase"].forEach(id => $(id).addEventListener("input", dibujar));
  $("azar").onclick = () => { est = EST[Math.floor(Math.random() * EST.length)][0]; pal = Math.floor(Math.random() * PAL.length); marcar(); dibujar(); };
  $("bajar").onclick = () => { const a = document.createElement("a"); a.download = "arte-" + ($("nombre").value.trim() || "poster").toLowerCase().replace(/\s+/g, "-") + ".png"; a.href = cv.toDataURL("image/png"); a.click(); };
  $("pedir").onclick = () => {
    const m = "Hola, me gustó el póster de «Arte con tu Nombre» de AtroScript y quiero pedirlo:\n• Nombre: " + ($("nombre").value.trim() || "—") + "\n• Fecha: " + ($("fecha").value.trim() || "—") + "\n• Estilo: " + (EST.find(e => e[0] === est) || [])[1] + "\n• Paleta: " + PAL[pal].n;
    window.open("https://wa.me/" + (typeof ATRO_WHATSAPP !== "undefined" ? ATRO_WHATSAPP : "526568537764") + "?text=" + encodeURIComponent(m), "_blank");
  };
  marcar(); dibujar();
  window.ArteConTuNombre = { estilo: id => { est = id; marcar(); dibujar(); }, paleta: i => { pal = i; marcar(); dibujar(); } };
})();
