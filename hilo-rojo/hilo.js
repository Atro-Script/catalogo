(function () {
  const d = window.DATOS, $ = id => document.getElementById(id), NS = "http://www.w3.org/2000/svg";
  document.title = d.titulo; $("titulo").textContent = d.titulo; $("leyenda").textContent = d.leyenda;
  const A = [64, 78], B = [296, 568], n = d.momentos.length;
  const puntos = [A];
  d.momentos.forEach((m, i) => puntos.push([i % 2 ? 98 + (i * 7) % 20 : 262 - (i * 5) % 18, 78 + (i + 1) * (490 / (n + 1))]));
  puntos.push(B);
  function suave(p) {                                   // Catmull-Rom → Bézier
    let s = "M" + p[0][0] + " " + p[0][1];
    for (let i = 0; i < p.length - 1; i++) {
      const p0 = p[Math.max(0, i - 1)], p1 = p[i], p2 = p[i + 1], p3 = p[Math.min(p.length - 1, i + 2)];
      s += " C" + (p1[0] + (p2[0] - p0[0]) / 4.2).toFixed(1) + " " + (p1[1] + (p2[1] - p0[1]) / 4.2).toFixed(1) + "," + (p2[0] - (p3[0] - p1[0]) / 4.2).toFixed(1) + " " + (p2[1] - (p3[1] - p1[1]) / 4.2).toFixed(1) + "," + p2[0] + " " + p2[1];
    }
    return s;
  }
  const dstr = suave(puntos); $("hilo").setAttribute("d", dstr); $("guia").setAttribute("d", dstr);
  $("pa").setAttribute("transform", "translate(" + A[0] + "," + A[1] + ")"); $("pb").setAttribute("transform", "translate(" + B[0] + "," + B[1] + ")");
  $("ia").textContent = d.a.charAt(0); $("ib").textContent = d.b.charAt(0);
  [["na", d.a, A[0], A[1] - 32], ["nb", d.b, B[0], B[1] + 44]].forEach(([id, t, x, y]) => { $(id).textContent = t; $(id).setAttribute("x", x); $(id).setAttribute("y", y); });
  const hilo = $("hilo"); let largo = 0, tramos = [], actual = -1, offset = 0, anim = false, final = false;
  try {
    largo = hilo.getTotalLength(); hilo.style.strokeDasharray = largo; hilo.style.strokeDashoffset = largo;
    // longitud del hilo hasta cada nudo (la más cercana al punto del nudo)
    puntos.forEach(p => { let mejor = 0, md = 1e9; for (let k = 0; k <= 600; k++) { const L = largo * k / 600, q = hilo.getPointAtLength(L), dd = (q.x - p[0]) ** 2 + (q.y - p[1]) ** 2; if (dd < md) { md = dd; mejor = L; } } tramos.push(mejor); });
    tramos[tramos.length - 1] = largo;
  } catch (e) { tramos = puntos.map((_, i) => i / (puntos.length - 1)); largo = 1; }
  function mover(hasta, fin) {
    anim = true; const ini = offset, dur = 1700, t0 = performance.now();
    (function paso(ahora) { const k = Math.min(1, (ahora - t0) / dur), e = 1 - Math.pow(1 - k, 3); offset = ini + (hasta - ini) * e; hilo.style.strokeDashoffset = largo - offset; if (k < 1) requestAnimationFrame(paso); else { anim = false; fin(); } })(t0);
  }
  function nudo(i) {
    const p = puntos[i + 1], g = document.createElementNS(NS, "g"); g.setAttribute("class", "nudo"); g.setAttribute("transform", "translate(" + p[0] + "," + p[1] + ")");
    g.innerHTML = '<circle r="9" class="n1"/><circle r="4" class="n2"/><path class="lazo" d="M0 0c-14-10-18 6 0 0zM0 0c14-10 18 6 0 0z"/><path class="cola" d="M0 4c-3 8-6 11-9 14M0 4c3 8 6 11 9 14"/>'; $("nudos").append(g);
  }
  function mostrar(m) { $("pFecha").textContent = m.fecha || ""; $("pTit").textContent = m.titulo; $("pTxt").textContent = m.texto; $("panel").classList.remove("ver"); void $("panel").offsetWidth; $("panel").classList.add("ver"); }
  $("seguir").onclick = () => {
    if (anim) return;
    if (final) { location.reload(); return; }
    actual++;
    if (actual < n) { $("seguir").disabled = true; mover(tramos[actual + 1], () => { nudo(actual); mostrar(d.momentos[actual]); $("seguir").disabled = false; $("seguir").textContent = actual === n - 1 ? "Llegar al final del hilo" : "Seguir el hilo"; }); }
    else { $("seguir").disabled = true; mover(largo, () => { final = true; document.body.classList.add("unidos"); mostrar({ fecha: d.a + " y " + d.b, titulo: "Unidos", texto: d.final }); $("seguir").disabled = false; $("seguir").textContent = "Volver a empezar"; }); }
  };
  $("pTit").textContent = "Un hilo, dos destinos"; $("pTxt").textContent = "Toca el botón para seguir el hilo y descubrir cada nudo.";
  window.HiloRojo = { n, tramos: () => tramos, siguiente: () => $("seguir").onclick() };
})();
