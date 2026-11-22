(function () {
  const d = window.DATOS;
  const $ = id => document.getElementById(id);
  const P = d.lugares;
  let actual = -1;
  document.title = d.titulo;
  $("titulo").textContent = d.titulo;
  $("sub").textContent = d.subtitulo;

  let ruta = "M" + P[0].x + " " + P[0].y;
  for (let i = 1; i < P.length - 1; i++) ruta += " Q" + P[i].x + " " + P[i].y + " " + (P[i].x + P[i + 1].x) / 2 + " " + (P[i].y + P[i + 1].y) / 2;
  if (P.length > 1) ruta += " L" + P[P.length - 1].x + " " + P[P.length - 1].y;
  $("ruta").setAttribute("d", ruta);
  const trazo = document.createElementNS("http://www.w3.org/2000/svg", "path"); trazo.setAttribute("d", ruta); trazo.setAttribute("class", "trazo"); trazo.setAttribute("pathLength", "100"); trazo.style.strokeDasharray = "100"; trazo.style.strokeDashoffset = "100"; $("ruta").parentNode.append(trazo);
  const via = document.createElement("i"); via.className = "viajero"; via.hidden = true; $("mapa").append(via);

  function ver(i) {
    actual = i;
    const l = P[i];
    via.hidden = false; via.style.left = l.x + "%"; via.style.top = l.y + "%"; trazo.style.strokeDashoffset = String(100 - (P.length > 1 ? i / (P.length - 1) * 100 : 100));
    const dt = $("detalle"); dt.classList.remove("nuevo"); void dt.offsetWidth; dt.classList.add("nuevo");
    if (navigator.vibrate) try { navigator.vibrate(12); } catch (e) {}
    $("nombre").textContent = l.nombre;
    $("fecha").textContent = l.fecha || "";
    $("texto").textContent = l.texto || "";
    [...$("mapa").querySelectorAll(".marca")].forEach((m, k) => { m.classList.toggle("on", k === i); if (k <= i) m.classList.add("visto"); });
    $("siguiente").textContent = i === P.length - 1 ? "Volver al inicio" : "Siguiente recuerdo";
  }
  P.forEach((l, i) => {
    const b = document.createElement("button");
    b.className = "marca" + (i === P.length - 1 ? " final" : "");
    const n = document.createElement("span"); n.textContent = i === P.length - 1 ? "✕" : i + 1; b.append(n);
    b.style.left = l.x + "%"; b.style.top = l.y + "%";
    b.setAttribute("aria-label", l.nombre); b.style.setProperty("--d", (i * .12) + "s");
    b.onclick = () => ver(i);
    $("mapa").append(b);
  });
  $("siguiente").onclick = () => ver((actual + 1) % P.length);
})();
