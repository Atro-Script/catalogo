/* Ventas: sección de temporada, preguntas frecuentes y botón flotante de WhatsApp. */
(function () {
  const wa = t => "https://wa.me/" + ATRO_WHATSAPP + "?text=" + encodeURIComponent(t);

  // 1) De temporada: se elige sola según la fecha del dispositivo.
  // Cada fila: [mes inicio, día inicio, mes fin, día fin, título, productos]. La primera que coincida gana.
  // Para probar: agrega ?fecha=2027-02-01 al enlace del catálogo.
  const TEMPORADAS = [
    [10, 1, 11, 2, "Día de Muertos y Halloween", ["ofrenda-muertos", "invitacion-halloween", "truco-o-trato"], "muertos"],
    [12, 15, 1, 6, "Año Nuevo y Reyes", ["cuenta-nuevo-ano", "invitacion-posada", "arbol-navidad"], "anonuevo"],
    [11, 3, 12, 14, "Navidad y posadas", ["invitacion-posada", "arbol-navidad", "cuenta-nuevo-ano", "faroles-deseos"], "navidad"],
    [1, 7, 2, 14, "San Valentín", ["san-valentin", "pregunta-especial", "rosa-interactiva", "corazon-armado"], "amor"],
    [4, 15, 5, 10, "Día de las Madres", ["dia-de-las-madres", "carta-favorita", "flores-amarillas", "pequenas-razones"], "madres"],
    [5, 11, 7, 15, "Graduaciones", ["lo-logre", "premios-generacion", "nuestro-album"], "graduacion"]
  ];
  const DEFECTO = ["Regalos y cumpleaños que sorprenden", ["fiesta-estelar", "sorpresa-pastel", "pregunta-especial", "caja-regalos-3d"], "base"];
  function hoy() {
    const m = /[?&]fecha=(\d{4})-(\d{2})-(\d{2})/.exec(location.search);
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date();
  }
  function temporadaActual() {
    const d = hoy(), v = (d.getMonth() + 1) * 100 + d.getDate();
    for (const [m1, d1, m2, d2, tit, sl, clave] of TEMPORADAS) {
      const a = m1 * 100 + d1, b = m2 * 100 + d2;
      if (a <= b ? (v >= a && v <= b) : (v >= a || v <= b)) return [tit, sl, clave];
    }
    return DEFECTO;
  }
  const [tituloTemp, slugsTemp, claveTemp] = temporadaActual();
  const lista = slugsTemp.filter(s => typeof porSlug === "function" && porSlug(s));
  const cat = document.getElementById("catalogo");
  if (cat && lista.length) {
    const s = document.createElement("section");
    s.className = "sec temporada";
    s.innerHTML = '<div class="temp-marco"><div class="enc"><p class="eyebrow">Esta temporada</p><h2></h2><p class="temp-sub">Toca uno para probar la demo al instante.</p></div><div class="temp-fila"></div></div>';
    s.querySelector(".temp-marco").dataset.temp = claveTemp;
    s.querySelector("h2").textContent = tituloTemp;
    const fila = s.querySelector(".temp-fila");
    lista.forEach(slug => {
      const p = porSlug(slug), b = document.createElement("button");
      b.type = "button"; b.className = "temp-card";
      b.innerHTML = "<b></b><span></span><i>Probar demo ›</i>";
      b.querySelector("b").textContent = p[2];
      b.querySelector("span").textContent = p[3];
      b.onclick = () => abrirVista(slug, lista);
      fila.append(b);
    });
    cat.before(s);
  }

  // 2) Preguntas frecuentes (solo datos que ya promete el catálogo)
  const FAQ = [
    ["¿Cuánto cuesta?", "Todos los productos tienen un precio inicial de $50 MXN; lo ves en su tarjeta. Sin suscripciones. El precio final depende de cuánto personalices; te enviamos la propuesta con precio antes de empezar."],
    ["¿Puedo verlo antes de pedirlo?", "Sí. Cada producto tiene una demo en vivo que puedes tocar y probar desde el catálogo."],
    ["¿Qué pasa con mis fotos y datos?", "Solo se usan para tu pedido y se eliminan después de entregarlo. Puedes leer la política completa en la página de privacidad."],
    ["¿Cómo lo recibo?", "Con un enlace que compartes por WhatsApp o con código QR. Funciona en cualquier celular, sin instalar nada."],
    ["¿Y si quiero algo que no está?", "Cuéntanos tu idea por WhatsApp y te cotizamos algo hecho a tu medida."]
  ];
  const como = document.getElementById("como");
  if (como) {
    const s = document.createElement("section");
    s.className = "sec faq";
    s.innerHTML = '<div class="enc"><p class="eyebrow">Resolvemos tus dudas</p><h2>Preguntas frecuentes</h2></div>';
    FAQ.forEach(([q, a]) => {
      const d = document.createElement("details"), m = document.createElement("summary"), p = document.createElement("p");
      m.textContent = q; p.textContent = a; d.append(m, p); s.append(d);
    });
    como.after(s);
  }

  // 3) Botón flotante de WhatsApp (se sube cuando aparece «Mi selección»)
  const f = document.createElement("a");
  f.className = "wa-flota"; f.target = "_blank"; f.rel = "noopener";
  f.href = wa("Hola, vi el catálogo de AtroScript y tengo una pregunta.");
  f.setAttribute("aria-label", "Escribir por WhatsApp");
  f.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/></svg><span>¿Dudas?</span>';
  document.body.append(f);
  const barra = document.getElementById("barraSel");
  if (barra) new MutationObserver(() => f.classList.toggle("sube", !barra.hidden)).observe(barra, { attributes: true, attributeFilter: ["hidden"] });
})();
