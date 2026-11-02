(function () {
  const d = window.DATOS, $ = id => document.getElementById(id), n = d.razones.length;
  let i = 0, x0 = null, dx = 0, arrastrando = false;
  document.body.dataset.tema = ["pareja", "amigos", "familia"].includes(d.tema) ? d.tema : "pareja";
  document.title = d.titulo; $("titulo").textContent = d.titulo; $("para").textContent = "Para " + d.para + " · de " + d.de;
  const ICONO = { pareja: '<path d="M12 20.5C6 16.5 3.5 13 3.5 9.2 3.5 6.6 5.5 4.8 7.9 4.8 9.7 4.8 11.2 5.8 12 7.3 12.8 5.8 14.3 4.8 16.1 4.8 18.5 4.8 20.5 6.6 20.5 9.2 20.5 13 18 16.5 12 20.5z"/>', amigos: '<path d="M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 16.8 6.6 19.8l1.1-6.1L3.2 9.4l6.1-.8z"/>', familia: '<path d="M3 11.5L12 4l9 7.5M5.5 10v10.5h13V10M10 20.5v-5.5h4v5.5"/>' }[document.body.dataset.tema];
  function tarjeta(k) {
    const c = document.createElement("article"); c.className = "tarjeta";
    c.innerHTML = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + ICONO + "</svg>";
    const num = document.createElement("span"); num.className = "num"; num.textContent = "Razón " + (k + 1); const t = document.createElement("p"); t.textContent = d.razones[k]; const f = document.createElement("small"); f.textContent = "— " + d.de;
    c.append(num, t, f); return c;
  }
  function pintar() {
    $("pila").replaceChildren();
    for (let k = Math.min(n - 1, i + 2); k >= i; k--) { const c = tarjeta(k), p = k - i; c.style.setProperty("--p", p); if (p === 0) { c.classList.add("top"); enganchar(c); } $("pila").append(c); }
    $("cuenta").textContent = (i + 1) + " de " + n; $("atras").disabled = i === 0;
  }
  function enganchar(c) {
    c.addEventListener("pointerdown", e => { arrastrando = true; x0 = e.clientX; dx = 0; c.setPointerCapture(e.pointerId); c.classList.add("arrastra"); });
    c.addEventListener("pointermove", e => { if (!arrastrando) return; dx = e.clientX - x0; c.style.transform = "translateX(" + dx + "px) rotate(" + dx / 18 + "deg)"; });
    const fin = () => { if (!arrastrando) return; arrastrando = false; c.classList.remove("arrastra"); if (Math.abs(dx) > 90) avanzar(dx < 0 ? 1 : -1, c, dx); else c.style.transform = ""; };
    c.addEventListener("pointerup", fin); c.addEventListener("pointercancel", fin);
  }
  function avanzar(dir, c, desde) {
    if (dir < 0 && i === 0) return; const top = c || document.querySelector(".tarjeta.top");
    if (top) { top.classList.add("vuela"); top.style.transform = "translateX(" + (dir > 0 ? -1 : 1) * 520 + "px) rotate(" + (dir > 0 ? -1 : 1) * 25 + "deg)"; }
    setTimeout(() => { i += dir; if (i >= n) { cielo(); return; } pintar(); }, 230);
  }
  function cielo() {
    $("mesa").hidden = true; $("cielo").hidden = false; $("finalTxt").textContent = d.final; $("estrellas").replaceChildren();
    d.razones.forEach((r, k) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "estrella"; b.setAttribute("aria-label", "Razón " + (k + 1)); b.style.left = (8 + ((k * 37) % 84)) + "%"; b.style.top = (6 + ((k * 53) % 78)) + "%"; b.style.animationDelay = (-k * .45) + "s";
      b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.5 2.4-7.4L2 9.6h7.6z"/></svg>';
      b.onclick = () => { $("verRazon").textContent = "“" + r + "”"; [...$("estrellas").children].forEach(x => x.classList.remove("sel")); b.classList.add("sel"); }; $("estrellas").append(b);
    });
  }
  $("sig").onclick = () => avanzar(1); $("atras").onclick = () => { if (i > 0) { i--; pintar(); } };
  $("otra").onclick = () => { i = 0; $("cielo").hidden = true; $("mesa").hidden = false; pintar(); };
  document.addEventListener("keydown", e => { if ($("mesa").hidden) return; if (e.key === "ArrowRight") avanzar(1); if (e.key === "ArrowLeft" && i > 0) { i--; pintar(); } });
  pintar();
  window.ListaRazones = { avanzar: () => avanzar(1), indice: () => i };
})();
