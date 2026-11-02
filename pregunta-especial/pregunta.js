(function () {
  const d = window.DATOS;
  const $ = id => document.getElementById(id);
  const PISTAS = ["¿Seguro?", "Piénsalo otra vez.", "Ese botón está roto.", "Mira cómo crece el sí.", "Última oportunidad."];
  const MAX = 6;
  let intentos = 0, escala = 1;

  if (d.colorPrincipal) document.documentElement.style.setProperty("--acento", d.colorPrincipal);
  document.title = d.pregunta;
  $("de").textContent = "De parte de " + d.de;
  $("pregunta").textContent = d.pregunta;
  $("sub").textContent = d.subtitulo || "";
  $("si").textContent = d.textoSi;
  $("no").textContent = d.textoNo;
  $("finalTitulo").textContent = d.finalTitulo;
  $("finalMensaje").textContent = d.finalMensaje;
  $("avisar").href = "https://wa.me/" + d.whatsapp + "?text=" + encodeURIComponent("¡Dije que sí!");

  function huir() {
    intentos++;
    escala += 0.18;
    $("si").style.transform = "scale(" + escala + ")";
    if (intentos >= MAX) { $("no").hidden = true; $("pista").textContent = "Ya no hay botón de no. Solo queda una opción."; return; }
    const no = $("no"), W = window.innerWidth || 360, H = window.innerHeight || 640;
    no.classList.add("huye");
    no.style.left = Math.max(12, Math.random() * (W - (no.offsetWidth || 100) - 24)) + "px";
    no.style.top = Math.max(12, Math.random() * (H - (no.offsetHeight || 50) - 24)) + "px";
    $("pista").textContent = PISTAS[Math.min(intentos - 1, PISTAS.length - 1)];
  }
  function celebrar() {
    $("pantalla").hidden = true;
    $("final").hidden = false;
    for (let i = 0; i < 36; i++) {
      const c = document.createElement("span");
      c.className = "corazon"; c.textContent = "♥";
      c.style.left = Math.random() * 100 + "%";
      c.style.fontSize = (1 + Math.random() * 2) + "rem";
      c.style.animationDelay = (Math.random() * 3) + "s";
      c.style.animationDuration = (4 + Math.random() * 4) + "s";
      $("lluvia").append(c);
    }
  }
  $("no").onpointerenter = huir;
  $("no").onclick = huir;
  $("si").onclick = celebrar;
})();
