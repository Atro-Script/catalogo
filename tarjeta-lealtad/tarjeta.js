(function () {
  const d = window.DATOS;
  const $ = id => document.getElementById(id);
  const clave = "lealtad:" + d.negocio;
  let est = { sellos: 0, premios: 0 };
  try { const g = JSON.parse(localStorage.getItem(clave)); if (g) est = g; } catch (e) {}
  const guardar = () => { try { localStorage.setItem(clave, JSON.stringify(est)); } catch (e) {} };

  document.title = d.negocio + " | Tarjeta de lealtad";
  $("negocio").textContent = d.negocio;
  $("premio").textContent = d.premio;
  document.documentElement.style.setProperty("--fondo", d.colorFondo);
  document.documentElement.style.setProperty("--sello", d.colorSello);
  $("rejilla").style.setProperty("--cols", Math.min(5, Math.ceil(d.sellos / 2)));

  function pintar() {
    $("rejilla").replaceChildren();
    for (let i = 0; i < d.sellos; i++) {
      const s = document.createElement("div");
      const puesto = i < est.sellos;
      s.className = "sello" + (puesto ? " puesto" : "");
      s.style.setProperty("--giro", ((i * 37) % 11 - 5) + "deg");
      s.textContent = puesto ? "★" : i + 1;
      $("rejilla").append(s);
    }
    const faltan = d.sellos - est.sellos;
    $("estado").textContent = faltan > 0
      ? "Te " + (faltan === 1 ? "falta 1 sello" : "faltan " + faltan + " sellos") + " para tu premio."
      : "¡Tu premio está listo! Pide que lo canjeen.";
    $("sellar").hidden = faltan === 0;
    $("canjear").hidden = faltan > 0;
    $("premios").textContent = est.premios;
  }
  function pinOk() {
    if ($("pin").value === String(d.pin)) { $("pin").value = ""; $("error").textContent = ""; return true; }
    $("error").textContent = "Código incorrecto.";
    return false;
  }
  $("sellar").onclick = () => { if (!pinOk()) return; est.sellos = Math.min(d.sellos, est.sellos + 1); guardar(); pintar(); };
  $("canjear").onclick = () => { if (!pinOk()) return; est.sellos = 0; est.premios++; guardar(); pintar(); };
  pintar();
})();
