(function () {
  const d = window.DATOS;
  const $ = id => document.getElementById(id);
  const fmt = f => f.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
  const apertura = new Date(d.apertura);
  const sinFecha = isNaN(apertura);
  const prueba = location.hash === "#probar";   // vista previa para quien la crea
  let t = null;

  document.title = "Cápsula del tiempo de " + d.de;
  $("para").textContent = d.para;
  $("de").textContent = d.de;
  $("firma").textContent = d.firma;
  const sello = new Date(d.sellada + "T12:00");
  $("fechaSello").textContent = isNaN(sello) ? d.sellada : fmt(sello);
  $("fechaApertura").textContent = sinFecha ? d.apertura : fmt(apertura);
  d.parrafos.forEach(x => { const p = document.createElement("p"); p.textContent = x; $("texto").append(p); });
  d.recuerdos.forEach(x => { const li = document.createElement("li"); li.textContent = x; $("recuerdos").append(li); });

  const lista = () => prueba || sinFecha || Date.now() >= apertura.getTime();
  function tick() {
    if (lista()) { $("cuenta").textContent = "Ya puedes abrirla."; $("abrir").hidden = false; clearInterval(t); return; }
    const s = Math.floor((apertura.getTime() - Date.now()) / 1000);
    $("cuenta").textContent = "Se abre en " + Math.floor(s / 86400) + " días, " + Math.floor(s % 86400 / 3600) + " h, " + Math.floor(s % 3600 / 60) + " min";
  }
  $("abrir").onclick = () => {
    $("capsula").classList.add("abierta");
    $("abrir").disabled = true;
    setTimeout(() => { $("bloqueo").hidden = true; $("contenido").hidden = false; window.scrollTo(0, 0); }, 900);
  };
  tick();
  if (!lista()) t = setInterval(tick, 30000);
})();
