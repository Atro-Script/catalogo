(function () {
  const d = window.DATOS;
  const $ = id => document.getElementById(id);
  const PAL = [["#FFB6C1", "#FFDAB9"], ["#B5EAD7", "#C7CEEA"], ["#FFDAC1", "#E2F0CB"], ["#C7CEEA", "#F8C8DC"]];
  let i = 0, x0 = null;
  document.title = d.titulo;
  $("titulo").textContent = d.titulo;
  $("sub").textContent = d.subtitulo;

  function pintar(dir) {
    const f = d.fotos[i], c = $("tarjeta");
    c.classList.remove("izq", "der"); void c.offsetWidth; c.classList.add(dir < 0 ? "izq" : "der");
    if (f.src) { $("foto").hidden = false; $("foto").src = f.src; $("foto").alt = f.texto || "Recuerdo"; $("placeholder").hidden = true; }
    else { $("foto").hidden = true; const p = $("placeholder"); p.hidden = false; p.textContent = f.emoji || "♥"; p.style.background = "linear-gradient(135deg," + PAL[i % PAL.length].join(",") + ")"; }
    $("texto").textContent = f.texto || "";
    $("fecha").textContent = f.fecha || "";
    $("pag").textContent = (i + 1) + " / " + d.fotos.length;
    c.style.setProperty("--giro", (i % 2 ? 1.6 : -1.6) + "deg");
    [...$("puntos").children].forEach((p, k) => p.classList.toggle("on", k === i));
  }
  const ir = n => { i = (i + n + d.fotos.length) % d.fotos.length; pintar(n); };
  d.fotos.forEach((_, k) => {
    const b = document.createElement("button");
    b.className = "punto"; b.setAttribute("aria-label", "Recuerdo " + (k + 1));
    b.onclick = () => { const dir = k - i; i = k; pintar(dir); };
    $("puntos").append(b);
  });
  $("ant").onclick = () => ir(-1);
  $("sig").onclick = () => ir(1);
  document.addEventListener("keydown", e => { if (e.key === "ArrowLeft") ir(-1); if (e.key === "ArrowRight") ir(1); });
  $("tarjeta").addEventListener("pointerdown", e => { x0 = e.clientX; });
  $("tarjeta").addEventListener("pointerup", e => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 40) ir(dx < 0 ? 1 : -1); });
  pintar(1);
})();
