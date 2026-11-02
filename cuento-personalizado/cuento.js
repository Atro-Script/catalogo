(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  const sub = s => s.replace(/\{nombre\}/g, d.nombre);
  const finales = Object.keys(d.paginas).filter(k => d.paginas[k].fin);
  const reducir = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  let hist = [], voz = false, vistos = new Set(), cambio = 0;
  document.title = sub(d.titulo); $("titulo").textContent = sub(d.titulo); $("icono").textContent = d.portada;
  $("dedica").textContent = "Un cuento para " + d.nombre + ", de parte de " + d.de;

  // Escena: cada página es una capa nueva que se funde sobre la anterior.
  function escena(p) {
    const cont = $("escena");
    const capa = document.createElement("div");
    capa.className = "capa";
    capa.style.background = "linear-gradient(" + p.escena.fondo.join(",") + ")";
    // Estrellitas de polvo que suben lentamente (dan sensación de movimiento)
    for (let k = 0; k < 9; k++) {
      const s = document.createElement("span"); s.className = "polvo";
      s.style.left = (Math.random() * 100) + "%"; s.style.animationDelay = (-Math.random() * 6) + "s"; s.style.animationDuration = (5 + Math.random() * 4) + "s";
      capa.append(s);
    }
    p.escena.objetos.forEach(([em, x, y, s], i) => {
      const o = document.createElement("span"); o.className = "obj"; o.textContent = em;
      o.style.left = x + "%"; o.style.top = y + "%"; o.style.fontSize = s + "rem";
      o.style.animationDelay = (-i * 0.9) + "s"; o.style.animationDuration = (4 + (i % 3)) + "s";
      capa.append(o);
    });
    capa.style.zIndex = ++cambio;
    cont.append(capa);
    if (reducir) { [...cont.children].slice(0, -1).forEach(c => c.remove()); return; }
    requestAnimationFrame(() => requestAnimationFrame(() => capa.classList.add("visible")));
    setTimeout(() => { [...cont.children].forEach(c => { if (c !== capa) c.remove(); }); }, 900);
  }
  function hablar(t) { if (!voz || !window.speechSynthesis) return; try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = "es-MX"; u.rate = .9; speechSynthesis.speak(u); } catch (e) {} }

  // Texto: cada párrafo aparece con un pequeño retraso
  function texto(t) {
    const cont = $("texto"); cont.replaceChildren();
    t.split("\n").filter(Boolean).forEach((linea, i) => {
      const p = document.createElement("p"); p.className = "linea"; p.textContent = linea;
      p.style.animationDelay = (0.15 + i * 0.35) + "s"; cont.append(p);
    });
  }

  function ir(id, guardar) {
    const p = d.paginas[id]; if (guardar !== false) hist.push(id);
    escena(p);
    const t = sub(p.texto); texto(t); $("opciones").replaceChildren();
    $("pagina").classList.remove("pasa"); void $("pagina").offsetWidth; $("pagina").classList.add("pasa");
    $("atras").disabled = hist.length <= 1;
    if (p.fin) {
      vistos.add(id); $("finBloque").hidden = false; $("finTitulo").textContent = p.fin;
      $("finCuenta").textContent = "Has descubierto " + vistos.size + " de " + finales.length + " finales.";
    } else {
      $("finBloque").hidden = true;
      const retraso = 0.9 + t.split("\n").length * 0.35;
      p.opciones.forEach(([tx, sig], i) => {
        const b = document.createElement("button"); b.className = "opcion";
        b.style.animationDelay = (retraso + i * 0.18) + "s";
        b.textContent = sub(tx); b.onclick = () => ir(sig); $("opciones").append(b);
      });
    }
    hablar(t);
  }
  $("empezar").onclick = () => { $("portada").hidden = true; $("libro").hidden = false; hist = []; ir(d.inicio); };
  $("otra").onclick = () => { hist = []; ir(d.inicio); };
  $("atras").onclick = () => { if (hist.length > 1) { hist.pop(); ir(hist[hist.length - 1], false); } };
  $("voz").onclick = () => { voz = !voz; $("voz").setAttribute("aria-pressed", String(voz)); $("voz").textContent = voz ? "🔇 Silenciar" : "🔊 Leer en voz alta"; if (voz) hablar($("texto").textContent); else if (window.speechSynthesis) speechSynthesis.cancel(); };
})();
