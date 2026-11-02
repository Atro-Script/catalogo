(function () {
  const d = window.DATOS;
  const $ = id => document.getElementById(id);
  const fecha = new Date(d.fecha);
  const valida = !isNaN(fecha);

  document.title = "Graduación | " + d.nombre;
  document.documentElement.style.setProperty("--acento", d.colorPrincipal);
  if (d.colorFondo) document.documentElement.style.setProperty("--fondo", d.colorFondo);
  $("nombre").textContent = d.nombre;
  $("encabezado").textContent = d.encabezado || "";
  if ($("grande")) $("grande").textContent = d.grande || "";
  if ($("kicker") && d.kicker) $("kicker").textContent = d.kicker;
  if ($("extra")) { if (d.extra) { $("extraTitulo").textContent = d.extra.titulo; $("extraTexto").textContent = d.extra.texto; } else { $("extra").hidden = true; } }
  $("mensaje").textContent = d.mensaje;
  $("lugarNombre").textContent = d.lugar;
  $("lugarDir").textContent = d.direccion;
  $("mapa").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(d.lugar + " " + d.direccion);
  $("confirmar").href = "https://wa.me/" + d.whatsapp + "?text=" +
    encodeURIComponent("Hola, confirmo mi asistencia a la graduación de " + d.nombre + ".");

  if (valida) {
    $("fechaTexto").textContent =
      fecha.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) +
      ", " + fecha.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
  }

  d.programa.forEach(p => {
    const li = document.createElement("li");
    const h = document.createElement("strong"); h.textContent = p.hora;
    li.append(h, " " + p.texto);
    $("programa").append(li);
  });

  if (d.fotos.length) {
    d.fotos.forEach(src => {
      const img = document.createElement("img");
      img.src = src; img.alt = "Foto de " + d.nombre; img.loading = "lazy";
      $("galeria").append(img);
    });
  } else {
    $("seccionFotos").hidden = true;
  }

  function tick() {
    if (!valida) { $("cuenta").textContent = ""; return; }
    const ms = fecha - new Date();
    if (ms <= 0) { $("cuenta").textContent = "¡Hoy es el gran día!"; return; }
    const s = Math.floor(ms / 1000);
    const partes = [["días", Math.floor(s / 86400)], ["horas", Math.floor(s % 86400 / 3600)],
                    ["min", Math.floor(s % 3600 / 60)], ["seg", s % 60]];
    $("cuenta").replaceChildren(...partes.map(([n, v]) => {
      const c = document.createElement("div");
      const num = document.createElement("b"); num.textContent = v;
      const et = document.createElement("span"); et.textContent = n;
      c.append(num, et); return c;
    }));
  }
  tick();
  setInterval(tick, 1000);
})();
