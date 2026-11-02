(function () {
  const d = window.DATOS;
  const $ = id => document.getElementById(id);
  const LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  document.title = "Pase de abordar para " + d.pasajero;
  ["aerolinea:aerolinea", "pasajero:pasajero", "fecha:fecha", "hora:hora", "vuelo:vuelo", "puerta:puerta", "asiento:asiento"].forEach(p => { const [id, k] = p.split(":"); $(id).textContent = d[k]; });
  $("codO").textContent = d.origen.codigo; $("ciuO").textContent = d.origen.ciudad;
  $("revelar").textContent = d.etiqueta;
  const destino = d.destino.ciudad.toUpperCase();
  const celdas = [...destino].map(ch => { const c = document.createElement("span"); c.className = "celda" + (ch === " " ? " vacia" : ""); c.textContent = ch === " " ? "" : "?"; $("tablero").append(c); return c; });
  $("ciuD").textContent = "Destino sorpresa";
  let hecho = false;
  $("revelar").onclick = () => {
    if (hecho) return; hecho = true; $("revelar").disabled = true;
    const inicio = Date.now();
    celdas.forEach((c, i) => {
      const ch = destino[i]; if (ch === " ") return;
      const fin = 1100 + i * 260;
      const t = setInterval(() => {
        if (Date.now() - inicio >= fin) { clearInterval(t); c.textContent = ch; c.classList.add("fija"); if (i === celdas.length - 1) terminar(); }
        else { c.textContent = LETRAS[Math.floor(Math.random() * LETRAS.length)]; c.classList.remove("giro"); void c.offsetWidth; c.classList.add("giro"); }
      }, 70);
    });
  };
  function terminar() {
    $("ciuD").textContent = d.destino.detalle || d.destino.codigo;
    $("mensaje").textContent = d.mensaje; $("mensaje").classList.add("ver");
    $("revelar").hidden = true; $("tablero").setAttribute("aria-label", "Destino: " + d.destino.ciudad);
  }
  $("mensaje").textContent = "Toca el botón para descubrir adónde vas.";
})();
