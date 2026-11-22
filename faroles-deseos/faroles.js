(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const cielo = $("cielo"), total = d.deseos.length;
  let soltados = 0, ac = null, abierto = null;
  document.title = d.titulo + " | " + d.para;
  document.body.style.setProperty("--luz", d.color);
  $("para").textContent = d.para; $("titulo").textContent = d.titulo; $("ayuda").textContent = d.ayuda;
  $("fTit").textContent = d.finalTitulo; $("fTxt").textContent = d.finalTexto; $("fFirma").textContent = d.firma;
  $("fWa").textContent = d.botonFinal; $("fWa").href = "https://wa.me/" + d.whatsapp + "?text=" + encodeURIComponent(d.mensajeWhatsapp);
  for (let i = 0; i < 70; i++) {
    const s = document.createElement("i"), t = .8 + Math.random() * 1.8;
    s.style.cssText = `--x:${Math.random() * 100}%;--y:${Math.random() * 70}%;--s:${t}px;--d:${2 + Math.random() * 4}s;--t:-${Math.random() * 5}s`;
    $("estrellas").appendChild(s);
  }
  const marca = () => { $("cuenta").textContent = soltados < total ? "Faroles en el cielo: " + soltados + " / " + total : ""; };
  marca();

  function tono(f, t0, dur, vol) {
    if (!ac) return; const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + t0;
    o.type = "sine"; o.frequency.value = f; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .05); g.gain.exponentialRampToValueAtTime(.0005, t + dur);
    o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + dur + .05);
  }
  function suena(tipo) {
    try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); ac.resume(); } catch (e) { return; }
    if (tipo === "suelta") { [392, 523, 659].forEach((f, i) => tono(f, i * .12, 1.4, .05)); }
    else tono(880, 0, .8, .04);
  }

  function soltar() {
    if (soltados >= total) return;
    const idx = soltados++, f = document.createElement("button");
    f.type = "button"; f.className = "farol"; f.setAttribute("aria-label", "Farol " + (idx + 1) + ": leer su deseo");
    f.innerHTML = '<span class="cu"></span><span class="ba"></span>';
    const x = 12 + Math.random() * 76; f.style.setProperty("--x", x + "%"); f.style.setProperty("--t", -Math.random() * 4 + "s");
    f.dataset.i = idx; cielo.appendChild(f);
    suena("suelta"); if (navigator.vibrate && !rm) try { navigator.vibrate(15); } catch (e) {}
    const y = 22 + Math.random() * 38;
    requestAnimationFrame(() => requestAnimationFrame(() => { f.style.top = y + "%"; }));
    setTimeout(() => f.classList.add("flota"), rm ? 0 : 7000);
    $("ayuda").style.opacity = ".0";
    marca();
    if (soltados >= total) $("soltar").disabled = true, $("soltar").textContent = "Toca cada farol";
  }
  $("soltar").onclick = soltar;
  cielo.addEventListener("click", e => {
    const f = e.target.closest(".farol");
    if (f) return leer(f);
    if (e.target === cielo || !e.target.closest("button")) { if (soltados < total && !abierto) soltar(); }
  });
  let leidos = new Set();
  function leer(f) {
    if (abierto) return;
    abierto = f; suena("leer");
    $("notaTxt").textContent = d.deseos[+f.dataset.i];
    $("nota").hidden = false; leidos.add(f.dataset.i); f.classList.add("leido");
  }
  $("notaCerrar").onclick = () => {
    $("nota").hidden = true; abierto = null;
    if (leidos.size >= total) finale();
  };
  function finale() {
    document.querySelectorAll(".farol").forEach(f => { f.classList.remove("flota"); f.classList.add("sube-todos"); });
    $("soltar").hidden = true; $("cuenta").hidden = true;
    suena("suelta"); setTimeout(() => suena("suelta"), 700);
    setTimeout(() => { $("final").hidden = false; }, rm ? 0 : 2200);
  }
})();
