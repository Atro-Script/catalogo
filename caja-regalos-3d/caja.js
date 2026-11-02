(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  const SVG = {
    pastel: '<ellipse cx="32" cy="57" rx="26" ry="4.5" fill="rgba(0,0,0,.25)"/><rect x="10" y="34" width="44" height="21" rx="4" fill="#F4A6BE"/><rect x="10" y="27" width="44" height="11" rx="5.5" fill="#fff"/><path d="M10 34q5.5 7 11 0t11 0 11 0 11 0" fill="#fff"/><rect x="30" y="13" width="4" height="14" rx="2" fill="#6EC1E4"/><ellipse cx="32" cy="10" rx="3" ry="5" fill="#FFC83D"/><circle cx="20" cy="45" r="2" fill="#fff"/><circle cx="32" cy="48" r="2" fill="#fff"/><circle cx="44" cy="45" r="2" fill="#fff"/>',
    carta: '<ellipse cx="32" cy="55" rx="24" ry="4" fill="rgba(0,0,0,.25)"/><rect x="7" y="14" width="50" height="36" rx="4" fill="#FFF3D6" stroke="#C9A24D" stroke-width="1.5"/><path d="M8 16l24 19 24-19" fill="none" stroke="#C9A24D" stroke-width="2"/><circle cx="32" cy="36" r="7" fill="#C2185B"/><path d="M32 40.5c-3-2-4.200-3.200-4.200-4.700 0-1.100.900-1.900 1.900-1.900.9 0 1.800.5 2.300 1.300.5-.8 1.400-1.300 2.300-1.300 1 0 1.900.8 1.900 1.900 0 1.500-1.200 2.700-4.200 4.700z" fill="#fff"/>',
    osito: '<ellipse cx="32" cy="58" rx="22" ry="4" fill="rgba(0,0,0,.25)"/><circle cx="32" cy="42" r="15" fill="#C98B5A"/><circle cx="19" cy="52" r="5.5" fill="#D9A06B"/><circle cx="45" cy="52" r="5.5" fill="#D9A06B"/><circle cx="32" cy="23" r="13" fill="#D9A06B"/><circle cx="21" cy="12" r="5.5" fill="#D9A06B"/><circle cx="43" cy="12" r="5.5" fill="#D9A06B"/><circle cx="21" cy="12" r="2.600" fill="#F3D9B5"/><circle cx="43" cy="12" r="2.600" fill="#F3D9B5"/><ellipse cx="32" cy="27" rx="6.500" ry="5" fill="#F3D9B5"/><circle cx="27" cy="21" r="1.900" fill="#3A2412"/><circle cx="37" cy="21" r="1.900" fill="#3A2412"/><ellipse cx="32" cy="25.500" rx="2.200" ry="1.600" fill="#3A2412"/><path d="M25 38l7 4 7-4-3 6h-8z" fill="#C2185B"/>',
    polaroid: '<ellipse cx="32" cy="58" rx="22" ry="3.800" fill="rgba(0,0,0,.25)"/><g transform="rotate(-5 32 32)"><rect x="12" y="7" width="40" height="49" rx="2" fill="#fff" stroke="#ddd"/><rect x="16" y="11" width="32" height="31" fill="#9CC9EA"/><circle cx="26" cy="21" r="4.500" fill="#FFE27A"/><path d="M16 42l10-11 8 7 6-5 8 9z" fill="#5BA07A"/></g>'
  };
  const cubo = $("cubo"), esc = $("escena"), caja = d.colorCaja, cinta = d.colorCinta;
  let rx = -18, ry = 28, vy = .35, arrastrando = false, ux = 0, uy = 0, abierta = false, abiertos = new Set();
  document.documentElement.style.setProperty("--caja", caja); document.documentElement.style.setProperty("--cinta", cinta);
  document.title = d.titulo; $("titulo").textContent = d.titulo; $("ayuda").textContent = d.ayuda; $("para").textContent = "Para " + d.para;
  esc.addEventListener("pointerdown", e => { arrastrando = true; ux = e.clientX; uy = e.clientY; esc.setPointerCapture(e.pointerId); });
  esc.addEventListener("pointermove", e => { if (!arrastrando) return; const dx = e.clientX - ux, dy = e.clientY - uy; ux = e.clientX; uy = e.clientY; ry += dx * .6; rx = Math.max(-60, Math.min(14, rx - dy * .5)); vy = dx * .12; });
  ["pointerup", "pointercancel"].forEach(ev => esc.addEventListener(ev, () => { arrastrando = false; }));
  function bucle() { if (!arrastrando) { ry += vy; vy += (.3 - vy) * .02; } cubo.style.transform = "rotateX(" + rx + "deg) rotateY(" + ry + "deg)"; requestAnimationFrame(bucle); }
  requestAnimationFrame(bucle);
  function globos() {
    const c = $("globos"), col = ["#E53935", "#FFD23F", "#2E86DE", "#43A047", "#EC407A", "#8E24AA", "#FB8C00"];
    for (let i = 0; i < 22; i++) { const b = document.createElement("i"); b.className = "globo"; b.style.left = (8 + Math.random() * 84) + "%"; b.style.background = "radial-gradient(circle at 32% 28%,#fff9," + col[i % col.length] + " 55%)"; b.style.setProperty("--dur", (5 + Math.random() * 4).toFixed(1) + "s"); b.style.animationDelay = (Math.random() * 1.8).toFixed(1) + "s"; b.style.setProperty("--dx", ((Math.random() - .5) * 90).toFixed(0) + "px"); c.append(b); }
    setTimeout(() => c.replaceChildren(), 11500);
  }
  function regalos() {
    const c = $("regalos"), n = d.regalos.length;
    d.regalos.forEach((g, i) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "regalo"; const a = (-70 + i * (140 / Math.max(1, n - 1))) * Math.PI / 180;
      b.style.setProperty("--x", (Math.sin(a) * 125).toFixed(0) + "px"); b.style.setProperty("--y", (-Math.cos(a) * 70 - 40).toFixed(0) + "px"); b.style.animationDelay = (.35 + i * .18) + "s"; b.setAttribute("aria-label", g.titulo);
      const ico = '<svg viewBox="0 0 64 64" aria-hidden="true">' + (SVG[g.tipo] || SVG.carta) + "</svg>";
      if (g.foto) { b.classList.add("con-foto"); b.style.setProperty("--r", ((i % 2 ? 1 : -1) * (4 + i * 2)) + "deg"); b.innerHTML = '<span class="mini"><img src="' + g.foto + '" alt=""></span><span class="ico">' + ico + "</span>"; } else b.innerHTML = ico;
      b.onclick = () => ver(i, b); c.append(b);
    });
  }
  function ver(i, b) {
    const g = d.regalos[i]; $("tTit").textContent = g.titulo; $("tTxt").textContent = g.mensaje; const f = $("tFoto"); f.replaceChildren(); f.hidden = !g.foto;
    if (!f.hidden) { const im = document.createElement("img"); im.src = g.foto; im.alt = ""; f.append(im); }
    $("tarjeta").hidden = false; b.classList.add("visto"); abiertos.add(i); $("cerrar").focus();
  }
  $("cerrar").onclick = () => { $("tarjeta").hidden = true; if (abiertos.size === d.regalos.length) { $("final").hidden = false; $("final").textContent = d.final; } };
  $("abrir").onclick = () => {
    if (abierta) return; abierta = true; $("tapa").classList.add("abierta"); $("abrir").hidden = true; $("escena").classList.add("abierta"); $("ayuda").textContent = "Toca cada regalo para abrirlo";
    setTimeout(() => { globos(); regalos(); }, 450);
  };
  window.CajaRegalos3D = { abrir: () => $("abrir").onclick(), abiertos: () => abiertos.size };
})();
