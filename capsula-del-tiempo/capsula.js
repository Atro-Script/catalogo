(function () {
  const d = window.DATOS;
  const $ = id => document.getElementById(id);
  const fmt = f => f.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
  const apertura = new Date(d.apertura);
  const sinFecha = isNaN(apertura);
  const prueba = location.hash === "#probar";   // vista previa para quien la crea
  const sello = new Date(d.sellada + "T12:00");
  let t = null, vals = [];

  document.title = "Cápsula del tiempo de " + d.de;
  $("para").textContent = d.para; $("para2").textContent = d.para;
  $("de").textContent = d.de;
  $("firma").textContent = d.firma;
  $("cera").textContent = (d.de || "A").trim().charAt(0).toUpperCase();
  $("fechaSello").textContent = isNaN(sello) ? d.sellada : fmt(sello);
  $("fechaApertura").textContent = sinFecha ? d.apertura : fmt(apertura);
  d.parrafos.forEach((x, i) => { const p = document.createElement("p"); p.textContent = x; p.style.animationDelay = (0.5 + i * 0.7) + "s"; $("texto").append(p); });
  d.recuerdos.forEach((x, i) => { const li = document.createElement("li"); li.textContent = x; li.style.animationDelay = (1 + d.parrafos.length * 0.7 + i * 0.25) + "s"; $("recuerdos").append(li); });

  const lista = () => prueba || sinFecha || Date.now() >= apertura.getTime();
  function progreso() {
    let p = 100;
    if (!lista() && !isNaN(sello)) p = Math.max(2, Math.min(100, (Date.now() - sello) / (apertura - sello) * 100));
    $("barra").style.width = p + "%"; $("pct").textContent = Math.round(p) + " %";
  }
  function tick() {
    if (lista()) {
      const m = document.createElement("span"); m.className = "lista"; m.textContent = "Ya puedes abrirla.";
      $("cuenta").replaceChildren(m); $("abrir").hidden = false; progreso(); clearInterval(t); return;
    }
    const s = Math.max(0, Math.floor((apertura.getTime() - Date.now()) / 1000));
    const n = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
    if (!vals.length) {
      $("cuenta").replaceChildren(...["días", "horas", "min", "seg"].map(e => {
        const c = document.createElement("div"); c.className = "t";
        const b = document.createElement("b"), l = document.createElement("span"); l.textContent = e; c.append(b, l); return c;
      }));
    }
    $("cuenta").querySelectorAll(".t b").forEach((b, i) => {
      if (vals[i] !== n[i]) { b.textContent = n[i]; if (vals.length) { b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); } }
    });
    vals = n;
  }
  $("abrir").onclick = () => {
    $("capsula").classList.add("abierta");
    $("abrir").disabled = true;
    setTimeout(() => { $("bloqueo").hidden = true; $("contenido").hidden = false; window.scrollTo(0, 0); }, 1300);
  };
  tick(); setTimeout(progreso, 300);
  if (!lista()) t = setInterval(tick, 1000);
})();
