// Para un cliente nuevo, cambia SOLO este archivo.
// canciones: cada una con nombre y melodia = lista de [nota, duración en pulsos]. Notas: C4 D4 E4 F4 G4 A4 B4 C5… (# sostenido, b bemol).
// Usa melodías de dominio público o compuestas para el cliente.
window.DATOS = {
  titulo: "Caja de Música",
  grabado: "Para Sofía",
  dedicatoria: "Cada vez que gires la manivela, esta melodía te recordará cuánto te queremos.",
  final: "Gira otra vez para escucharla de nuevo.",
  // Los mensajes (con foto opcional: foto: "fotos/1.jpg") van saliendo de la caja mientras suena la melodía.
  mensajes: [
    { texto: "Gracias por llenar de música nuestros días", foto: "fotos/atardecer.svg" },
    { texto: "Eres lo mejor que nos ha pasado", foto: "fotos/jardin.svg" },
    { texto: "Siempre tendrás un lugar en nuestro corazón", foto: "fotos/mariposas.svg" },
    { texto: "Que todos tus sueños suenen así de bonito", foto: "fotos/luna.svg" }
  ],
  colorMadera: "#6B3F1F",
  colorLaton: "#D9B860",
  canciones: [
    { nombre: "Cumpleaños feliz", melodia: [
      ["G4", .75], ["G4", .25], ["A4", 1], ["G4", 1], ["C5", 1], ["B4", 2],
      ["G4", .75], ["G4", .25], ["A4", 1], ["G4", 1], ["D5", 1], ["C5", 2],
      ["G4", .75], ["G4", .25], ["G5", 1], ["E5", 1], ["C5", 1], ["B4", 1], ["A4", 2],
      ["F5", .75], ["F5", .25], ["E5", 1], ["C5", 1], ["D5", 1], ["C5", 2] ] },
    { nombre: "Estrellita", melodia: [
      ["C4", 1], ["C4", 1], ["G4", 1], ["G4", 1], ["A4", 1], ["A4", 1], ["G4", 2],
      ["F4", 1], ["F4", 1], ["E4", 1], ["E4", 1], ["D4", 1], ["D4", 1], ["C4", 2],
      ["G4", 1], ["G4", 1], ["F4", 1], ["F4", 1], ["E4", 1], ["E4", 1], ["D4", 2],
      ["G4", 1], ["G4", 1], ["F4", 1], ["F4", 1], ["E4", 1], ["E4", 1], ["D4", 2],
      ["C4", 1], ["C4", 1], ["G4", 1], ["G4", 1], ["A4", 1], ["A4", 1], ["G4", 2],
      ["F4", 1], ["F4", 1], ["E4", 1], ["E4", 1], ["D4", 1], ["D4", 1], ["C4", 2] ] },
    { nombre: "Oda a la alegría", melodia: [
      ["E4", 1], ["E4", 1], ["F4", 1], ["G4", 1], ["G4", 1], ["F4", 1], ["E4", 1], ["D4", 1],
      ["C4", 1], ["C4", 1], ["D4", 1], ["E4", 1], ["E4", 1.5], ["D4", .5], ["D4", 2],
      ["E4", 1], ["E4", 1], ["F4", 1], ["G4", 1], ["G4", 1], ["F4", 1], ["E4", 1], ["D4", 1],
      ["C4", 1], ["C4", 1], ["D4", 1], ["E4", 1], ["D4", 1.5], ["C4", .5], ["C4", 2] ] },
    { nombre: "Para Elisa", melodia: [
      ["E5", .5], ["D#5", .5], ["E5", .5], ["D#5", .5], ["E5", .5], ["B4", .5], ["D5", .5], ["C5", .5], ["A4", 1.5],
      ["C4", .5], ["E4", .5], ["A4", .5], ["B4", 1.5], ["E4", .5], ["G#4", .5], ["B4", .5], ["C5", 1.5],
      ["E5", .5], ["D#5", .5], ["E5", .5], ["D#5", .5], ["E5", .5], ["B4", .5], ["D5", .5], ["C5", .5], ["A4", 1.5],
      ["C4", .5], ["E4", .5], ["A4", .5], ["B4", 1.5], ["E4", .5], ["C5", .5], ["B4", .5], ["A4", 2] ] },
    { nombre: "Noche de paz", melodia: [
      ["G4", 1.5], ["A4", .5], ["G4", 1], ["E4", 3], ["G4", 1.5], ["A4", .5], ["G4", 1], ["E4", 3],
      ["D5", 2], ["D5", 1], ["B4", 3], ["C5", 2], ["C5", 1], ["G4", 3],
      ["A4", 2], ["A4", 1], ["C5", 1.5], ["B4", .5], ["A4", 1], ["G4", 1.5], ["A4", .5], ["G4", 1], ["E4", 3],
      ["A4", 2], ["A4", 1], ["C5", 1.5], ["B4", .5], ["A4", 1], ["G4", 1.5], ["A4", .5], ["G4", 1], ["E4", 3],
      ["D5", 2], ["D5", 1], ["F5", 1.5], ["D5", .5], ["B4", 1], ["C5", 3], ["E5", 3],
      ["C5", 1], ["G4", 1], ["E4", 1], ["G4", 1.5], ["F4", .5], ["D4", 1], ["C4", 3] ] }
  ]
};
