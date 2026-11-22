(function () {
  const d = window.DATOS;
  const $ = id => document.getElementById(id);
  const PAL = [["#FFB6C1", "#FFDAB9"], ["#B5EAD7", "#C7CEEA"], ["#FFDAC1", "#E2F0CB"], ["#C7CEEA", "#F8C8DC"]];
  const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  let i = 0, x0 = null, dx = 0, arrastrando = false, vuela = false;
  document.title = d.titulo;
  $("titulo").textContent = d.titulo;
  $("sub").textContent = d.subtitulo;

  function pintar(dir) {
    const f = d.fotos[i], c = $("tarjeta"), im = $("foto"), ph = $("placeholder");
    c.style.transform = ""; c.style.transition = "";
    c.classList.remove("izq", "der"); void c.offsetWidth; c.classList.add(dir < 0 ? "izq" : "der");
    im.classList.remove("rev"); ph.classList.remove("rev"); void im.offsetWidth;
    if (f.src) { im.hidden = false; im.src = f.src; im.alt = f.texto || "Recuerdo"; ph.hidden = true; im.classList.add("rev"); }
    else { im.hidden = true; ph.hidden = false; ph.textContent = f.emoji || "♥"; ph.style.background = "linear-gradient(135deg," + PAL[i % PAL.length].join(",") + ")"; ph.classList.add("rev"); }
    $("texto").textContent = f.texto || "";
    $("fecha").textContent = f.fecha || "";
    $("pag").textContent = (i + 1) + " / " + d.fotos.length;
    c.style.setProperty("--giro", (i % 2 ? 1.8 : -1.8) + "deg");
    [...$("puntos").children].forEach((p, k) => p.classList.toggle("on", k === i));
  }
  const ir = n => { i = (i + n + d.fotos.length) % d.fotos.length; pintar(n); };
  d.fotos.forEach((_, k) => {
    const b = document.createElement("button");
    b.className = "punto"; b.setAttribute("aria-label", "Recuerdo " + (k + 1));
    b.onclick = () => { const dir = k - i; if (!dir) return; i = k; pintar(dir); };
    $("puntos").append(b);
  });
  $("ant").onclick = () => ir(-1);
  $("sig").onclick = () => ir(1);
  document.addEventListener("keydown", e => { if (e.key === "ArrowLeft") ir(-1); if (e.key === "ArrowRight") ir(1); });

  const c = $("tarjeta");
  c.addEventListener("pointerdown", e => { if (vuela) return; x0 = e.clientX; dx = 0; arrastrando = true; c.style.animation = "none"; c.style.transition = "none"; try { c.setPointerCapture(e.pointerId); } catch (x) {} });
  c.addEventListener("pointermove", e => {
    if (!arrastrando) return; dx = e.clientX - x0;
    c.style.transform = "translateX(" + dx + "px) rotate(" + (dx / 14 + (i % 2 ? 1.8 : -1.8)) + "deg)";
  });
  function soltar() {
    if (!arrastrando) return; arrastrando = false;
    if (Math.abs(dx) > 70 && !rm) {
      const dir = dx < 0 ? 1 : -1; vuela = true;
      c.style.transition = "transform .35s ease-in,opacity .35s"; c.style.transform = "translateX(" + (dx < 0 ? -1.4 : 1.4) * innerWidth + "px) rotate(" + (dx < 0 ? -28 : 28) + "deg)"; c.style.opacity = "0";
      if (navigator.vibrate) try { navigator.vibrate(12); } catch (e) {}
      setTimeout(() => { c.style.opacity = ""; c.style.animation = ""; vuela = false; ir(dir); }, 330);
    } else if (Math.abs(dx) > 70) { ir(dx < 0 ? 1 : -1); }
    else { c.style.transition = "transform .45s cubic-bezier(.2,1.6,.4,1)"; c.style.transform = ""; setTimeout(() => { c.style.animation = ""; }, 460); }
    dx = 0;
  }
  c.addEventListener("pointerup", soltar); c.addEventListener("pointercancel", soltar);
  pintar(1);
})();
