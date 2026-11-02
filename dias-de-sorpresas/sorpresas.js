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
      b.className = "puerta c" + (i % 3) + (abiertos.includes(i) ? " abierta" : "") + (ok ? "" : " bloqueada");
      b.textContent = i + 1;
      b.setAttribute("aria-label", "Día " + (i + 1) + (ok ? "" : ", todavía bloqueado"));
      b.onclick = () => {
        if (!ok) {
          $("panelTitulo").textContent = "Todavía no";
          $("panelTexto").textContent = "Esta sorpresa se abre el " + fechaDia(i).toLocaleDateString("es-MX", { day: "numeric", month: "long" }) + ".";
          return;
        }
        if (!abiertos.includes(i)) { abiertos.push(i); guardar(); pintar(); }
        $("panelTitulo").textContent = dia.titulo;
        $("panelTexto").textContent = dia.mensaje;
      };
      $("puertas").append(b);
    });
  }
  pintar();
})();
