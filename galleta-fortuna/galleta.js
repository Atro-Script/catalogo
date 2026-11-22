(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  let n = 0, ac = null, roto = false;
  document.title = d.titulo + " | " + d.para;
  document.documentElement.style.setProperty("--fondo", d.colorFondo); document.documentElement.style.setProperty("--acento", d.colorAcento);
  document.body.style.setProperty("--atm", d.colorAcento);
  $("para").textContent = d.para; $("titulo").textContent = d.titulo; $("ayuda").textContent = d.ayuda;
  const total = d.fortunas.length;

  function crujido() {
    try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); ac.resume(); } catch (e) { return; }
    const len = ac.sampleRate * .22, buf = ac.createBuffer(1, len, ac.sampleRate), data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3) * (Math.random() > .55 ? 1 : .2);
    const src = ac.createBufferSource(), g = ac.createGain(); src.buffer = buf; g.gain.value = .5; src.connect(g); g.connect(ac.destination); src.start();
  }
  function escribir(el, txt) {
    el.textContent = "";
    if (rm) { el.textContent = txt; return; }
    let i = 0; (function paso() { el.textContent = txt.slice(0, ++i); if (i < txt.length) setTimeout(paso, 28); })();
  }
  function romper() {
    if (roto) return; roto = true;
    const g = $("galleta"); g.classList.add("tiembla"); crujido();
    if (navigator.vibrate && !rm) try { navigator.vibrate([20, 30, 40]); } catch (e) {}
    setTimeout(() => {
      g.classList.remove("tiembla"); g.classList.add("rota"); $("ayuda").textContent = "";
      setTimeout(() => {
        const nums = [];
        while (nums.length < 6) { const k = 1 + Math.floor(Math.random() * 49); if (!nums.includes(k)) nums.push(k); }
        $("papel").hidden = false; escribir($("texto"), d.fortunas[n % total]);
        $("suerte").textContent = d.suerte ? "NÚMEROS DE LA SUERTE: " + nums.sort((a, b) => a - b).join(" · ") : "";
        n++;
        if (n < total) { $("otra").hidden = false; }
        else setTimeout(() => { $("final").hidden = false; $("final").textContent = d.final; }, rm ? 0 : 2600);
      }, rm ? 0 : 500);
    }, rm ? 0 : 520);
  }
  $("galleta").onclick = romper;
  $("otra").onclick = () => {
    roto = false; $("papel").hidden = true; $("otra").hidden = true;
    const g = $("galleta"); g.classList.remove("rota"); $("ayuda").textContent = d.ayuda;
  };
  /* Agitar el teléfono */
  let ult = 0;
  addEventListener("devicemotion", e => {
    const a = e.accelerationIncludingGravity; if (!a) return;
    const f = Math.abs(a.x || 0) + Math.abs(a.y || 0) + Math.abs(a.z || 0), t = Date.now();
    if (f > 38 && t - ult > 1500) { ult = t; if (!roto) romper(); else if (!$("otra").hidden) $("otra").click(); }
  });
})();
