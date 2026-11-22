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
  let hecho = false, ac = null;
  function clac() { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); const o = ac.createOscillator(), g = ac.createGain(); o.type = "square"; o.frequency.value = 900 + Math.random() * 400; g.gain.setValueAtTime(.03, ac.currentTime); g.gain.exponentialRampToValueAtTime(.0001, ac.currentTime + .04); o.connect(g); g.connect(ac.destination); o.start(); o.stop(ac.currentTime + .05); } catch (e) {} }
  function fiesta() {
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    for (let k = 0; k < 60; k++) { const c = document.createElement("i"); c.style.cssText = "position:fixed;z-index:30;pointer-events:none;top:-12px;width:9px;height:14px;border-radius:2px;left:" + Math.random() * 100 + "%;background:" + ["#FFD23F", "#FF5C8A", "#4ADEFF", "#7A4DFF", "#4CD964"][k % 5]; document.body.append(c); c.animate([{ transform: "translateY(0) rotate(0)" }, { transform: "translateY(112vh) rotate(" + (360 + Math.random() * 360) + "deg)" }], { duration: 2200 + Math.random() * 2200, delay: Math.random() * 500, easing: "ease-in" }).onfinish = () => c.remove(); }
  }
  $("revelar").onclick = () => {
    if (hecho) return; hecho = true; $("revelar").disabled = true; $("tablero").closest("article").classList.add("despega");
    const inicio = Date.now();
    celdas.forEach((c, i) => {
      const ch = destino[i]; if (ch === " ") return;
      const fin = 1100 + i * 260;
      const t = setInterval(() => {
        if (Date.now() - inicio >= fin) { clearInterval(t); c.textContent = ch; c.classList.add("fija"); if (i === celdas.length - 1) terminar(); }
        else { if (Math.random() > .5) clac(); c.textContent = LETRAS[Math.floor(Math.random() * LETRAS.length)]; c.classList.remove("giro"); void c.offsetWidth; c.classList.add("giro"); }
      }, 70);
    });
  };
  function terminar() {
    fiesta(); if (navigator.vibrate) try { navigator.vibrate([40, 60, 40, 60, 120]); } catch (e) {}
    $("ciuD").textContent = d.destino.detalle || d.destino.codigo;
    $("mensaje").textContent = d.mensaje; $("mensaje").classList.add("ver");
    $("revelar").hidden = true; $("tablero").setAttribute("aria-label", "Destino: " + d.destino.ciudad);
  }
  $("mensaje").textContent = "Toca el botón para descubrir adónde vas.";
})();
