// Para un cliente nuevo, cambia SOLO este archivo. Cada línea trae un comentario.
window.DATOS = {
  para: "Valeria",                       // nombre de quien recibe el regalo (sale en el título)
  de: "Andrés",                          // tu nombre (firma del final)
  titulo: "Feliz cumpleaños",            // título de la pantalla de inicio (se le agrega el nombre)
  pregunta: "¿Quieres ver tu regalo?",   // pregunta bajo el título
  musica: true,                          // true = melodía de fondo (se puede apagar con el botón SON)
  whatsapp: "526568537764",              // número que recibe el aviso al final (con lada, sin +)

  regalo1: {                             // REGALO 1: la carta
    nombre: "Carta",
    parrafos: [
      "Hoy cumples años y quise hacerte algo distinto a una tarjeta.",
      "Así que te hice un juego. Porque contigo todo se siente como una aventura.",
      "Gracias por existir, por tu risa y por hacerme mejor."
    ]
  },
  regalo2: {                             // REGALO 2: canciones. enlace es opcional (pega el link de YouTube o Spotify)
    nombre: "Canciones",
    titulo: "Canciones que me recuerdan a ti",
    canciones: [
      { titulo: "Nuestra tarde de domingo", artista: "Andrés", enlace: "" },
      { titulo: "La que cantamos en el carro", artista: "Andrés", enlace: "" },
      { titulo: "Para cuando estés lejos", artista: "Andrés", enlace: "" }
    ]
  },
  regalo3: {                             // REGALO 3: la bola secreta (juego de encontrarla)
    nombre: "Bola secreta",
    titulo: "¡Felicidades! Has encontrado la bola secreta",
    premio: "Vale por una cena donde tú elijas el lugar.",
    pistas: ["Esa no. Sigue buscando.", "Frío, frío... prueba otra.", "Casi. La suerte está de tu lado.", "No me rindo si tú no te rindes."]
  },
  regalo4: {                             // REGALO 4: el boleto que se rompe
    nombre: "Boleto",
    titulo: "Boleto dorado",
    texto: "Válido por una salida sorpresa. Tú solo pon la fecha.",
    boton: "Canjear boleto"              // abre WhatsApp con un aviso para ti
  },

  normas: [                              // «Por último pero no menos importante, tiene normas»
    "Un beso se paga con otro beso.",
    "Los abrazos largos no se pueden cancelar.",
    "Prohibido olvidar que te quiero."
  ],
  final: "Espero te haya gustado"        // frase del gran final
};
