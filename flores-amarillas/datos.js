// Para un cliente nuevo, cambia SOLO este archivo.
window.DATOS = {
  titulo: "El viaje de las flores amarillas",   // título de la portada
  subtitulo: "Cierra los ojos un momento y respira hondo",
  para: "Valeria",                               // deja "" para ocultar el "Para ..."
  viaje: [
    "Dejamos atrás el ruido de todos los días…",
    "Cruzamos mares de estrellas que nadie ha nombrado…",
    "Pasamos junto a planetas que guardan secretos…",
    "Y al fondo, una luz amarilla nos llama…"
  ],
  llegada: "Hemos llegado. Cada flor guarda algo para ti.",
  // Una flor brillante por mensaje (cualquier cantidad). Los textos largos se desplazan dentro de la tarjeta.
  mensajes: [
    { titulo: "Por tu sonrisa", texto: "Hace brillar hasta los días más grises." },
    { titulo: "Por tu paciencia", texto: "Gracias por esperar y por quedarte." },
    { titulo: "Por tu risa", texto: "Es mi sonido favorito del universo." },
    { titulo: "Por tu forma de mirar", texto: "Ves lo bonito donde otros no lo ven." },
    { titulo: "Por nuestro camino", texto: "Y por todo lo que todavía nos falta recorrer." }
  ],
  final: "Ninguna estrella brilla tanto como tú. Ni siquiera las que acabamos de cruzar.",
  // Colores (opcional). Flores con mensaje y flores del campo; el resto del tema se cambia en "tema".
  flores: {
    mensaje: ["#FFD21F", "#FFC400"],
    campo: ["#FFD21F", "#FFC91A", "#FFE04D", "#F7B500"]
  },
  tema: {}   // ver ejemplo en la carpeta flores-cliente/datos.js
};
