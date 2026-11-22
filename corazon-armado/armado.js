/* Corazón Armado: arrastra las piezas hasta formar el corazón; después aparecen las frases palabra por palabra. */
(function () {
  const D = window.DATOS, $ = i => document.getElementById(i);
  const red = matchMedia("(prefers-reduced-motion:reduce)").matches;
  for (const k in D.colores || {}) document.documentElement.style.setProperty("--" + k, D.colores[k]);
  Fecha.colores({ a: (D.colores || {}).a });
  document.title = D.titulo; $("para").textContent = D.para; $("titulo").textContent = D.titulo; $("pista").textContent = D.pista;
  $("fTit").textContent = D.final.titulo; $("fMsg").textContent = D.final.mensaje; $("fFirma").textContent = D.final.firma; $("otra").textContent = D.otraVez;
  const CORAZON = "M50 86C14 58 4 42 4 26 4 12 14 4 26 4c9 0 18 5 24 14C56 9 65 4 74 4c12 0 22 8 22 22 0 16-10 32-46 60z";
  $("contorno").setAttribute("d", CORAZON);
  const cortes = D.piezas === 4 ? [[0, 0, 50, 40], [50, 0, 50, 40], [0, 40, 50, 50], [50, 40, 50, 50]]
    : [[0, 0, 50, 30], [50, 0, 50, 30], [0, 30, 50, 28], [50, 30, 50, 28], [0, 58, 50, 32], [50, 58, 50, 32]];
  const tab = $("tablero"), esc = $("escena"); let piezas = [], puestas = 0, sesion = 0, bw = 0;

  function sonar(f, d = .5, v = .07, ret = 0) {
    try { sonar.c = sonar.c || new (window.AudioContext || window.webkitAudioContext)(); const c = sonar.c, t = c.currentTime + ret, o = c.createOscillator(), g = c.createGain();
      o.type = "triangle"; o.frequency.value = f; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .015); g.gain.exponentialRampToValueAtTime(.0001, t + d); o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + d + .05); } catch (e) {}
  }
  const NS = "http://www.w3.org/2000/svg";
  function armar() {
    sesion++; puestas = 0; piezas.forEach(p => p.el.remove()); piezas = [];
    tab.className = "tablero"; $("texto").hidden = true; $("cierre").hidden = true; $("pista").hidden = false; $("frase").replaceChildren();
    const r = tab.getBoundingClientRect(), er = esc.getBoundingClientRect(); bw = r.width; const bh = r.height;
    cortes.forEach((c, i) => {
      const s = document.createElementNS(NS, "svg"); s.setAttribute("viewBox", "0 0 100 90"); s.setAttribute("class", "pieza"); s.setAttribute("aria-label", "Pieza " + (i + 1));
      const id = "rc" + i + "_" + sesion;
      s.innerHTML = '<defs><clipPath id="' + id + '"><rect x="' + (c[0] - .15) + '" y="' + (c[1] - .15) + '" width="' + (c[2] + .3) + '" height="' + (c[3] + .3) + '"/></clipPath></defs><g clip-path="url(#' + id + ')"><path class="cuerpo" d="' + CORAZON + '"/><path class="brillo" d="M14 22c2-6 7-9 12-9"/></g>';
      s.style.transformOrigin = (c[0] + c[2] / 2) + "% " + ((c[1] + c[3] / 2) / 90 * 100) + "%"; tab.append(s);
      // posición de partida: dentro de la escena, lejos de su sitio
      const hx = (c[0] + c[2] / 2) / 100 * bw, hy = (c[1] + c[3] / 2) / 90 * bh;
      let tx, ty, n = 0; do { tx = (.12 + Math.random() * .76) * er.width - r.left + er.left; ty = (.08 + Math.random() * .84) * er.height - r.top + er.top; n++; } while (Math.hypot(tx - hx, ty - hy) < bw * .38 && n < 30);
      { // que la pieza completa quede dentro de la pantalla (antes algunas se salían por la derecha)
        const hw = c[2] / 100 * bw / 2 + 8, hh = c[3] / 90 * bh / 2 + 8;
        tx = Math.min(Math.max(r.left + tx, hw), Math.max(hw, innerWidth - hw)) - r.left;
        ty = Math.min(Math.max(r.top + ty, hh), Math.max(hh, innerHeight - hh)) - r.top;
      }
      const p = { el: s, dx: tx - hx, dy: ty - hy, r0: (Math.random() - .5) * 60, hecho: false, rot: 0 };
      p.rot = p.r0; piezas.push(p); poner(p);
      s.style.transition = "none"; s.style.opacity = "0"; s.style.transform = "translate(" + (p.dx * .2) + "px," + (p.dy * .2 - 40) + "px) rotate(0deg) scale(.6)";
      setTimeout(() => { s.style.transition = "transform .8s cubic-bezier(.2,.9,.3,1.2),opacity .5s"; s.style.opacity = "1"; poner(p); setTimeout(() => { s.style.transition = ""; }, 850); }, 120 + i * 110);
      arrastrar(p);
    });
    cuenta();
  }
  function poner(p) { p.el.style.transform = "translate(" + p.dx + "px," + p.dy + "px) rotate(" + p.rot + "deg)"; }
  function cuenta() { $("cuenta").textContent = puestas + " de " + cortes.length; }
  function arrastrar(p) {
    let sx, sy, ox, oy, on = false;
    p.el.addEventListener("pointerdown", e => { if (p.hecho) return; on = true; try { p.el.setPointerCapture(e.pointerId); } catch (_) {} p.el.classList.add("arr"); p.el.style.transition = "none"; sx = e.clientX; sy = e.clientY; ox = p.dx; oy = p.dy; tab.append(p.el); navigator.vibrate && navigator.vibrate(8); sonar(520, .15, .04); e.preventDefault(); });
    p.el.addEventListener("pointermove", e => { if (!on) return; p.dx = ox + e.clientX - sx; p.dy = oy + e.clientY - sy; const d = Math.hypot(p.dx, p.dy); p.rot = p.r0 * Math.min(1, d / (bw * .5)); poner(p); p.el.style.transform += " scale(1.04)"; });
    const suelta = () => {
      if (!on) return; on = false; p.el.classList.remove("arr"); const d = Math.hypot(p.dx, p.dy);
      if (d < bw * .13) {
        p.hecho = true; p.dx = 0; p.dy = 0; p.rot = 0; p.el.classList.add("puesta"); poner(p); puestas++; cuenta(); navigator.vibrate && navigator.vibrate(25);
        sonar(660 + puestas * 70, .5, .08); const r = p.el.getBoundingClientRect(); Fecha.rafaga(["chispa", "corazon"], r.left + r.width * .5, r.top + r.height * .5, 6);
        if (puestas === cortes.length) completo();
      } else { p.el.style.transition = "transform .25s ease"; }
    };
    p.el.addEventListener("pointerup", suelta); p.el.addEventListener("pointercancel", suelta);
  }
  function completo() {
    const mi = sesion; $("pista").hidden = true; $("cuenta").textContent = "¡Completo!"; tab.classList.add("unido");
    const r = tab.getBoundingClientRect(); [0, 4, 7, 11, 12].forEach((n, j) => sonar(330 * Math.pow(2, n / 12), 1.2, .07, j * .09));
    Fecha.rafaga(["corazon", "chispa", "flor", "estrella"], r.left + r.width / 2, r.top + r.height / 2, 36); Fecha.vibra([30, 40, 60]);
    setTimeout(() => { if (mi === sesion) tab.classList.add("late"); }, 500);
    setTimeout(() => { if (mi !== sesion) return; tab.classList.remove("late"); tab.classList.add("sube"); Fecha.llover(["corazon", "chispa", "petalo"], 18, true); frases(mi); }, 2400);
  }
  function frases(mi) {
    $("texto").hidden = false; let i = 0; const f = $("frase");
    (function sig() {
      if (mi !== sesion) return;
      if (i >= D.frases.length) { setTimeout(() => { if (mi !== sesion) return; $("texto").hidden = true; $("cierre").hidden = false; Fecha.rafaga(["corazon", "chispa"], innerWidth / 2, innerHeight * .35, 30); }, 700); return; }
      const palabras = D.frases[i++].split(" "); f.className = "frase"; f.replaceChildren();
      palabras.forEach((w, k) => { const s = document.createElement("span"); s.className = "w" + (/^(amor|vida|corazón|tú|ti)[.,!…]*$/i.test(w) ? " rojo" : ""); s.textContent = w; s.style.animationDelay = (red ? 0 : k * .32) + "s"; f.append(s); });
      setTimeout(() => { if (mi !== sesion) return; f.classList.add("fuera"); setTimeout(sig, 650); }, (palabras.length * .32 + 1.7) * 1000);
    })();
  }
  $("otra").onclick = armar;
  addEventListener("resize", () => { if (!puestas) armar(); });
  armar();
})();
