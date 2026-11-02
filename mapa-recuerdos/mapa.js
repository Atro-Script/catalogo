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

  function ver(i) {
    actual = i;
    const l = P[i];
    $("nombre").textContent = l.nombre;
    $("fecha").textContent = l.fecha || "";
    $("texto").textContent = l.texto || "";
    [...$("mapa").querySelectorAll(".marca")].forEach((m, k) => { m.classList.toggle("on", k === i); if (k <= i) m.classList.add("visto"); });
    $("siguiente").textContent = i === P.length - 1 ? "Volver al inicio" : "Siguiente recuerdo";
  }
  P.forEach((l, i) => {
    const b = document.createElement("button");
    b.className = "marca" + (i === P.length - 1 ? " final" : "");
    b.textContent = i === P.length - 1 ? "✕" : i + 1;
    b.style.left = l.x + "%"; b.style.top = l.y + "%";
    b.setAttribute("aria-label", l.nombre);
    b.onclick = () => ver(i);
    $("mapa").append(b);
  });
  $("siguiente").onclick = () => ver((actual + 1) % P.length);
})();
