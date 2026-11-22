(function () {
  const d = window.DATOS;
  const $ = id => document.getElementById(id);
  const prueba = location.hash === "#probar";   // para ver todo antes de entregarlo
  const clave = "dias:" + d.de + ":" + d.para;
  let abiertos = [];
  try { abiertos = JSON.parse(localStorage.getItem(clave)) || []; } catch (e) {}
  const guardar = () => { try { localStorage.setItem(clave, JSON.stringify(abiertos)); } catch (e) {} };

  document.title = d.titulo;
  $("para").textContent = "Para " + d.para;
  $("titulo").textContent = d.titulo;
  $("de").textContent = "De parte de " + d.de;

  const inicio = new Date(d.inicio + "T00:00");
  const fechaDia = i => { const f = new Date(inicio.getTime()); f.setDate(f.getDate() + i); return f; };
  const disponible = i => prueba || isNaN(inicio) || Date.now() >= fechaDia(i).getTime();

  function pintar() {
    $("puertas").replaceChildren();
    d.dias.forEach((dia, i) => {
      const b = document.createElement("button");
      const ok = disponible(i);
      b.className = "puerta c" + (i % 3) + (abiertos.includes(i) ? " abierta" : "") + (ok ? "" : " bloqueada") + (ok && !abiertos.includes(i) && (i === d.dias.length - 1 || !disponible(i + 1)) ? " hoy" : "");
      b.textContent = i + 1;
      b.setAttribute("aria-label", "Día " + (i + 1) + (ok ? "" : ", todavía bloqueado"));
      b.style.animationDelay = (i * .05) + "s";
      b.onclick = () => {
        if (!ok) {
          $("panelTitulo").textContent = "Todavía no";
          $("panelTexto").textContent = "Esta sorpresa se abre el " + fechaDia(i).toLocaleDateString("es-MX", { day: "numeric", month: "long" }) + ".";
          return;
        }
        const nueva = !abiertos.includes(i);
        if (nueva) { abiertos.push(i); guardar(); pintar(); }
        $("panelTitulo").textContent = dia.titulo;
        $("panelTexto").textContent = dia.mensaje;
        const pn = $("panel"); pn.classList.remove("nuevo"); void pn.offsetWidth; pn.classList.add("nuevo");
        if (nueva) { chispas(); if (navigator.vibrate) try { navigator.vibrate([20, 30, 40]); } catch (e) {} }
        setTimeout(() => pn.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
      };
      $("puertas").append(b);
    });
  }
  function chispas() {
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    for (let k = 0; k < 18; k++) {
      const c = document.createElement("i"); c.className = "chispa"; c.style.left = (innerWidth / 2) + "px"; c.style.top = (innerHeight * .55) + "px"; document.body.append(c);
      const a = Math.random() * 6.28, r = 80 + Math.random() * 140;
      c.animate([{ transform: "translate(0,0) scale(.4)", opacity: 1 }, { transform: "translate(" + Math.cos(a) * r + "px," + Math.sin(a) * r + "px) scale(1.2) rotate(180deg)", opacity: 0 }], { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,.8,.3,1)" }).onfinish = () => c.remove();
    }
  }
  pintar();
})();
