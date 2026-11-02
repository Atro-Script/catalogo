(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  let sala = 0, idx = 0, tour = null;
  document.title = d.titulo; $("titulo").textContent = d.titulo; $("curador").textContent = d.curador;
  function pintar() {
    const s = d.salas[sala]; $("intro").textContent = s.intro; $("pared").replaceChildren();
    [...$("salas").children].forEach((b, i) => b.classList.toggle("on", i === sala));
    s.obras.forEach((o, i) => {
      const f = document.createElement("figure"); f.className = "obra";
      const b = document.createElement("button"); b.className = "cuadro"; b.setAttribute("aria-label", "Ver " + o.titulo);
      const im = document.createElement("img"); im.src = o.src; im.alt = o.titulo; im.loading = "lazy"; b.append(im); b.onclick = () => abrir(i);
      const p = document.createElement("figcaption"); p.className = "etiqueta"; const t = document.createElement("b"); t.textContent = o.titulo; const m = document.createElement("span"); m.textContent = o.autor + ", " + o.anio;
      p.append(t, m); f.append(b, p); $("pared").append(f);
    });
  }
  d.salas.forEach((s, i) => { const b = document.createElement("button"); b.textContent = s.nombre; b.onclick = () => { parar(); sala = i; pintar(); }; $("salas").append(b); });
  function abrir(i) {
    idx = (i + d.salas[sala].obras.length) % d.salas[sala].obras.length; const o = d.salas[sala].obras[idx];
    $("vImg").src = o.src; $("vImg").alt = o.titulo; $("vTit").textContent = o.titulo; $("vMeta").textContent = o.autor + " · " + o.anio + " · " + o.tecnica; $("vHist").textContent = o.historia;
    $("vPos").textContent = (idx + 1) + " / " + d.salas[sala].obras.length;
    const a = $("vAudio"); if (o.audio) { a.src = o.audio; a.hidden = false; } else { a.hidden = true; a.removeAttribute("src"); }
    $("visor").hidden = false; document.body.style.overflow = "hidden";
  }
  function cerrar() { $("visor").hidden = true; document.body.style.overflow = ""; parar(); }
  function parar() { clearInterval(tour); tour = null; $("recorrido").textContent = "Recorrido guiado"; }
  $("recorrido").onclick = () => { if (tour) { parar(); return; } abrir(0); $("recorrido").textContent = "Detener recorrido"; tour = setInterval(() => abrir(idx + 1), 8000); };
  $("ant").onclick = () => { parar(); abrir(idx - 1); }; $("sig").onclick = () => { parar(); abrir(idx + 1); }; $("cerrar").onclick = cerrar;
  document.addEventListener("keydown", e => { if ($("visor").hidden) return; if (e.key === "Escape") cerrar(); if (e.key === "ArrowLeft") abrir(idx - 1); if (e.key === "ArrowRight") abrir(idx + 1); });
  pintar();
})();
