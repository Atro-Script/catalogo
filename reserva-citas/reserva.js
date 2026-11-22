(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  let sv = null, dia = null, hora = null;
  document.title = "Reserva tu cita | " + d.negocio;
  const r = document.documentElement.style; r.setProperty("--fondo", d.colorFondo); r.setProperty("--acento", d.colorAcento);
  $("negocio").textContent = d.negocio; $("sub").textContent = d.subtitulo;
  const DS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"], MS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  function elegir(cont, btn) { cont.querySelectorAll("[aria-checked]").forEach(x => x.setAttribute("aria-checked", x === btn)); }
  d.servicios.forEach((s, i) => {
    const b = document.createElement("button"); b.type = "button"; b.className = "serv"; b.setAttribute("role", "radio"); b.setAttribute("aria-checked", "false");
    b.innerHTML = '<span class="e"></span><span><b></b><small></small></span><span class="p"></span>';
    b.children[0].textContent = s.emoji; b.querySelector("b").textContent = s.nombre; b.querySelector("small").textContent = s.min + " min"; b.querySelector(".p").textContent = s.precio || "";
    b.onclick = () => { sv = s; elegir($("servicios"), b); horas(); resumen(); }; $("servicios").appendChild(b);
  });
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  for (let k = 0; k < d.diasAdelante; k++) {
    const f = new Date(hoy); f.setDate(hoy.getDate() + k); if (d.diasCerrados.includes(f.getDay())) continue;
    const b = document.createElement("button"); b.type = "button"; b.className = "dia"; b.setAttribute("role", "radio"); b.setAttribute("aria-checked", "false");
    b.innerHTML = "<small></small><b></b><span></span>"; b.children[0].textContent = k === 0 ? "hoy" : DS[f.getDay()]; b.children[1].textContent = f.getDate(); b.children[2].textContent = MS[f.getMonth()];
    b.onclick = () => { dia = f; hora = null; elegir($("dias"), b); horas(); resumen(); }; $("dias").appendChild(b);
  }
  const mins = t => { const [h, m] = t.split(":"); return +h * 60 + +m; }, fmt = m => { const h = Math.floor(m / 60), mm = m % 60, ap = h >= 12 ? "pm" : "am"; return ((h + 11) % 12 + 1) + ":" + String(mm).padStart(2, "0") + " " + ap; };
  function horas() {
    const c = $("horas"); c.innerHTML = ""; $("vacio").hidden = !!dia; if (!dia) return;
    const dur = sv ? sv.min : d.intervalo, fin = mins(d.cierra), ahora = new Date(), esHoy = dia.getTime() === hoy.getTime(); let i = 0;
    for (let m = mins(d.abre); m + dur <= fin; m += d.intervalo) {
      if (esHoy && m <= ahora.getHours() * 60 + ahora.getMinutes() + 30) continue;
      const b = document.createElement("button"); b.type = "button"; b.className = "hora"; b.setAttribute("role", "radio"); b.setAttribute("aria-checked", "false"); b.textContent = fmt(m); b.style.setProperty("--i", i++);
      b.onclick = () => { hora = m; elegir(c, b); resumen(); }; c.appendChild(b);
    }
    if (!c.children.length) { $("vacio").hidden = false; $("vacio").textContent = "Ya no hay horarios hoy. Elige otro día."; } else $("vacio").textContent = "Primero elige un día.";
  }
  function resumen() {
    const ok = sv && dia && hora != null;
    if (!ok) { $("resumen").textContent = "Elige servicio, día y hora"; $("reservar").setAttribute("aria-disabled", "true"); return; }
    const fecha = DS[dia.getDay()] + " " + dia.getDate() + " " + MS[dia.getMonth()] + " · " + fmt(hora);
    $("resumen").textContent = sv.nombre + " — " + fecha; $("reservar").setAttribute("aria-disabled", "false"); link(fecha);
  }
  function link(fecha) {
    const n = $("nom").value.trim(), nt = $("nota").value.trim();
    const t = "Hola " + d.negocio + ", quiero reservar " + sv.nombre + " (" + sv.min + " min) el " + fecha + "." + (n ? " Soy " + n + "." : "") + (nt ? " Nota: " + nt : "") + " ¿Me confirman disponibilidad?";
    $("reservar").href = "https://wa.me/" + d.whatsapp + "?text=" + encodeURIComponent(t);
  }
  ["nom", "nota"].forEach(i => $(i).addEventListener("input", () => { if (sv && dia && hora != null) resumen(); }));
})();
