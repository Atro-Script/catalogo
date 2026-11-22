(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const campo = $("campo"), N = d.mensajes.length;
  let rev = 0, ac = null, abierto = false;
  document.title = d.titulo + " | " + d.para;
  $("para").textContent = d.para; $("titulo").textContent = d.titulo; $("ayuda").textContent = d.ayuda;
  $("fTit").textContent = d.finalTitulo; $("fTxt").textContent = d.finalTexto; $("fFirma").textContent = d.firma;
  const marca = () => { $("marca").textContent = rev < N ? "GLOBOS REVENTADOS: " + rev + " / " + N : ""; };
  marca();

  const gl = [];
  function crear(i) {
    const b = document.createElement("button"); b.type = "button"; b.className = "globo"; b.setAttribute("aria-label", "Globo " + (i + 1) + ": reventar");
    const c = d.colores[i % d.colores.length]; b.style.setProperty("--c", c);
    b.innerHTML = '<span class="cu"></span><span class="nu"></span><span class="hi"></span>';
    const o = { el: b, i, c, x: Math.random() * (innerWidth - 90), y: innerHeight * (.25 + Math.random() * .7), vy: .25 + Math.random() * .35, ph: Math.random() * 6, v: 1, esc: .9 + Math.random() * .3 };
    b.onclick = () => reventar(o); campo.appendChild(b); gl.push(o);
  }
  for (let i = 0; i < N; i++) crear(i);

  function ruido() {
    try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); ac.resume(); } catch (e) { return; }
    const len = ac.sampleRate * .12, buf = ac.createBuffer(1, len, ac.sampleRate), data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
    const s = ac.createBufferSource(), g = ac.createGain(); s.buffer = buf; g.gain.value = .6; s.connect(g); g.connect(ac.destination); s.start();
  }
  function reventar(o) {
    if (!o.v || abierto) return; o.v = 0; o.el.classList.add("pop"); ruido();
    if (navigator.vibrate && !rm) try { navigator.vibrate(14); } catch (e) {}
    const r = o.el.getBoundingClientRect(), px = r.left + r.width / 2, py = r.top + r.height / 2;
    if (!rm) for (let k = 0; k < 14; k++) {
      const t = document.createElement("i"); t.className = "trozo"; t.style.cssText = `--c:${o.c};left:${px}px;top:${py}px;opacity:1`;
      document.body.appendChild(t);
      requestAnimationFrame(() => { t.style.transform = `translate(${Math.random() * 200 - 100}px,${Math.random() * 200 - 100}px) scale(.3)`; t.style.opacity = "0"; });
      setTimeout(() => t.remove(), 700);
    }
    if (window.Magia) Magia.onda(px, py, o.c);
    setTimeout(() => o.el.remove(), 160);
    rev++; marca(); $("ayuda").style.opacity = "0";
    $("notaTxt").textContent = d.mensajes[o.i]; $("nota").hidden = false; abierto = true;
  }
  $("ok").onclick = () => {
    $("nota").hidden = true; abierto = false;
    if (rev >= N) { $("final").hidden = false; ruido(); if (window.Magia) { Magia.confeti(d.colores); setTimeout(() => Magia.confeti(d.colores), 900); } }
  };
  let t0 = performance.now();
  (function loop(t) {
    const dt = Math.min(40, t - t0) / 16; t0 = t;
    gl.forEach(o => {
      if (!o.v) return;
      o.ph += .012 * dt; o.y -= o.vy * dt * (rm ? 0 : 1);
      if (o.y < -130) { o.y = innerHeight + 30; o.x = Math.random() * (innerWidth - 90); }
      o.el.style.transform = `translate(${o.x + Math.sin(o.ph) * 16}px,${o.y}px) scale(${o.esc})`;
    });
    requestAnimationFrame(loop);
  })(t0);
})();
