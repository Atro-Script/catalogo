(function () {
  const d = window.DATOS;
  const $ = id => document.getElementById(id);
  const n = d.mensajes.length;
  const vistas = new Set();
  const cielo = $("cielo");
  const reducir = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  let ultimo = null, finalMostrado = false, pausado = false;

  document.title = d.titulo;
  $("titulo").textContent = d.titulo;
  $("sub").textContent = d.subtitulo;

  // Polvo de estrellas de fondo (quieto, con brillo suave)
  for (let i = 0; i < 110; i++) {
    const p = document.createElement("span");
    p.className = "punto";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = Math.random() * 100 + "%";
    p.style.animationDelay = (Math.random() * 4) + "s";
    p.style.width = p.style.height = (1 + Math.random() * 2) + "px";
    cielo.append(p);
  }

  // Órbitas: cada estrella del mensaje tiene su radio, velocidad y ángulo inicial.
  // Las de radio chico giran más rápido (como en un sistema real).
  let sem = 11;
  const rnd = () => { sem = (sem * 16807) % 2147483647; return sem / 2147483647; };
  const orbitas = [];
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n;                       // 0 = centro, 1 = borde
    const radio = 0.22 + t * 0.7 + (rnd() - 0.5) * 0.05;   // fracción del radio máximo
    orbitas.push({
      radio,
      vel: (0.55 / Math.pow(radio, 1.3)) * (rnd() < 0.5 ? 1 : -1) * 0.22,  // rad/s
      ang: rnd() * Math.PI * 2,
      inclina: 0.38 + rnd() * 0.18,                // qué tan aplastada es la órbita
      el: null, tr: null
    });
  }

  // Estrellas decorativas que también orbitan (más pequeñas, sin mensaje)
  const extras = [];
  for (let i = 0; i < 60; i++) {
    const radio = 0.18 + rnd() * 0.82;
    extras.push({ radio, vel: (0.6 / Math.pow(radio, 1.3)) * (rnd() < 0.5 ? 1 : -1) * 0.2, ang: rnd() * Math.PI * 2, inclina: 0.3 + rnd() * 0.25, s: 0.45 + rnd() * 0.35, el: null });
  }

  const contar = () => { $("contador").textContent = vistas.size + " de " + n + " estrellas descubiertas"; };
  function abrir(msg, icono, boton) {
    pausado = true;
    $("icono").textContent = icono;
    $("texto").textContent = msg;
    $("modal").classList.add("abierto");
    ultimo = boton;
    $("cerrar").focus();
  }
  function cerrar() {
    $("modal").classList.remove("abierto");
    pausado = false;
    if (ultimo) ultimo.focus();
    if (vistas.size === n && !finalMostrado) {
      finalMostrado = true;
      setTimeout(() => abrir(d.finalTitulo + "\n" + d.finalMensaje, "🌠", null), 350);
    }
  }

  // Crear elementos
  d.mensajes.forEach((m, i) => {
    const tr = document.createElement("span");
    tr.className = "orbita";
    cielo.append(tr);
    orbitas[i].tr = tr;
    const b = document.createElement("button");
    const grande = i === Math.floor(n / 2);
    b.className = "estrella" + (grande ? " grande" : "");
    b.textContent = grande ? "🌟" : "⭐";
    b.setAttribute("aria-label", "Estrella " + (i + 1));
    b.onclick = () => { vistas.add(i); b.classList.add("vista"); contar(); abrir(m, grande ? "🌟" : "⭐", b); };
    cielo.append(b);
    orbitas[i].el = b;
  });
  extras.forEach(x => {
    const s = document.createElement("span");
    s.className = "destello";
    s.textContent = "✦";
    s.style.fontSize = x.s + "rem";
    cielo.append(s);
    x.el = s;
  });

  // Geometría: centro de la galaxia y radio máximo según la pantalla
  let cx = 0, cy = 0, R = 0;
  function medir() {
    const w = cielo.clientWidth, h = cielo.clientHeight;
    cx = w / 2; cy = h * 0.56;
    R = Math.min(w * 0.47, h * 0.4);
    orbitas.forEach(o => {
      const rx = o.radio * R, ry = rx * o.inclina;
      o.tr.style.width = rx * 2 + "px"; o.tr.style.height = ry * 2 + "px";
      o.tr.style.left = (cx - rx) + "px"; o.tr.style.top = (cy - ry) + "px";
    });
  }
  function poner(el, x, y, prof, escala) {
    el.style.transform = "translate(" + (x - el.offsetWidth / 2) + "px," + (y - el.offsetHeight / 2) + "px) scale(" + escala + ")";
    el.style.zIndex = Math.round(prof * 100) + 10;
  }
  function frame(t, dt) {
    if (!pausado) {
      orbitas.forEach(o => {
        o.ang += o.vel * dt;
        const rx = o.radio * R, ry = rx * o.inclina;
        const x = cx + Math.cos(o.ang) * rx, y = cy + Math.sin(o.ang) * ry;
        poner(o.el, x, y, (Math.sin(o.ang) + 1) / 2, 1);
      });
      extras.forEach(e => {
        e.ang += e.vel * dt;
        const rx = e.radio * R, ry = rx * e.inclina;
        poner(e.el, cx + Math.cos(e.ang) * rx, cy + Math.sin(e.ang) * ry, (Math.sin(e.ang) + 1) / 2, 1);
      });
    }
  }

  // Bucle de animación con tiempo real (se pausa si la pestaña no está visible)
  let last = performance.now();
  function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    frame(now, dt);
    requestAnimationFrame(loop);
  }

  medir(); window.addEventListener("resize", medir);
  if (!reducir) requestAnimationFrame(now => { last = now; requestAnimationFrame(loop); });
  else { orbitas.forEach(o => { const rx = o.radio * R, ry = rx * o.inclina; poner(o.el, cx + Math.cos(o.ang) * rx, cy + Math.sin(o.ang) * ry, .5, 1); }); }

  $("cerrar").onclick = cerrar;
  $("modal").onclick = e => { if (e.target === $("modal")) cerrar(); };
  document.addEventListener("keydown", e => { if (e.key === "Escape" && $("modal").classList.contains("abierto")) cerrar(); });
  contar();
})();
