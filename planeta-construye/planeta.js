(function () {
  const d = window.DATOS, $ = id => document.getElementById(id), n = d.zonas.length;
  const POS = [[36, 42], [60, 60], [52, 25], [38, 72], [91, 53], [82, 22]];
  const hechas = new Set();
  document.title = d.titulo; $("titulo").textContent = d.titulo; $("ayuda").textContent = d.ayuda; $("para").textContent = "Para " + d.para;
  const est = document.querySelector(".estrellas"); if (est) for (let i = 0; i < 70; i++) { const s = document.createElement("i"); s.style.left = Math.random() * 100 + "%"; s.style.top = Math.random() * 100 + "%"; s.style.animationDelay = (-Math.random() * 5).toFixed(1) + "s"; s.style.width = s.style.height = (1 + Math.random() * 2) + "px"; est.append(s); }
  function actualizar() { $("universo").style.setProperty("--p", (hechas.size / n).toFixed(2)); $("progreso").textContent = "Zonas construidas: " + hechas.size + " de " + n; }
  d.zonas.forEach((z, i) => {
    const b = document.createElement("button"); b.type = "button"; b.className = "punto"; b.style.left = POS[i][0] + "%"; b.style.top = POS[i][1] + "%"; b.style.animationDelay = (-i * .4) + "s"; b.setAttribute("aria-label", "Construir: " + z.titulo);
    b.onclick = () => {
      document.querySelectorAll(".z" + i).forEach(g => g.classList.add("on")); b.classList.add("hecho"); b.hidden = true; hechas.add(i); actualizar();
      $("tTit").textContent = z.titulo; $("tTxt").textContent = z.texto; $("tarjeta").hidden = false; $("cerrar").focus();
    };
    $("puntos").append(b);
  });
  $("cerrar").onclick = () => { $("tarjeta").hidden = true; if (hechas.size === n) { $("universo").classList.add("completo"); $("nombrePlaneta").hidden = false; $("nombrePlaneta").textContent = d.nombre; $("final").hidden = false; $("final").textContent = d.final; $("ayuda").textContent = ""; } };
  actualizar();
  window.Planeta = { construir: i => document.querySelectorAll ? $("puntos").children[i].onclick() : null, hechas: () => hechas.size };
})();
