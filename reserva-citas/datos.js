// Para un cliente nuevo, cambia SOLO este archivo.
window.DATOS = {
  negocio: "Studio Aura · Estética",
  subtitulo: "Agenda en 30 segundos. Te confirmamos por WhatsApp.",
  whatsapp: "526568537764",                  // código de país + número, sin + ni espacios
  colorFondo: "#F7F1EC",
  colorAcento: "#B5547A",
  servicios: [                               // emoji, nombre, duración (min) y precio (opcional)
    { emoji: "💇‍♀️", nombre: "Corte y peinado", min: 60, precio: "$350" },
    { emoji: "💅", nombre: "Manicure con gel", min: 60, precio: "$280" },
    { emoji: "🧖‍♀️", nombre: "Facial hidratante", min: 90, precio: "$520" },
    { emoji: "🎨", nombre: "Color completo", min: 120, precio: "$900" }
  ],
  abre: "10:00", cierra: "19:00", intervalo: 60,   // horario y separación entre citas (minutos)
  diasCerrados: [0],                                // 0 = domingo, 1 = lunes … 6 = sábado
  diasAdelante: 14                                  // cuántos días a futuro se pueden reservar
};
