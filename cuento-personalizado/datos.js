// Para un cliente nuevo, cambia SOLO este archivo. Usa {nombre} donde quieras que aparezca el nombre del protagonista.
// escena: fondo [color arriba, color abajo] y objetos [emoji, x%, y%, tamaño]. opciones: [texto, id de la página siguiente]. fin: true marca un final.
window.DATOS = {
  nombre: "Mateo",
  de: "tu abuela",
  titulo: "{nombre} y la estrella perdida",
  portada: "🌟",
  inicio: "jardin",
  paginas: {
    jardin: { escena: { fondo: ["#1B2A6B", "#5B3E9A"], objetos: [["🌙", 78, 12, 4], ["🌻", 12, 72, 3], ["🌷", 32, 78, 2.4], ["⭐", 50, 58, 3.6], ["🏡", 85, 66, 3]] },
      texto: "Una noche, {nombre} escuchó un «plop» en el jardín. Entre las flores brillaba una estrellita del tamaño de una manzana.\n—¡Ayúdame! —dijo la estrella—. Me caí del cielo y no sé cómo volver.",
      opciones: [["Atar la estrella a un globo gigante", "globo"], ["Seguir al búho que sabe el camino", "buho"]] },
    globo: { escena: { fondo: ["#27408B", "#7A5FC4"], objetos: [["🎈", 50, 30, 6], ["⭐", 50, 54, 3], ["☁️", 14, 18, 3.4], ["☁️", 80, 40, 3], ["🏡", 18, 82, 2.6]] },
      texto: "{nombre} infló el globo más grande del mundo y lo amarró a la estrella. ¡Empezó a elevarse!\nEl viento soplaba fuerte y había que decidir rápido.",
      opciones: [["Subir con ella hasta las nubes", "fin_subir"], ["Soltar el globo desde la azotea", "fin_soltar"]] },
    buho: { escena: { fondo: ["#0F3B33", "#2F6B4F"], objetos: [["🦉", 62, 36, 5], ["🌲", 14, 62, 5], ["🌲", 86, 66, 4.6], ["✨", 30, 30, 2.4], ["⭐", 44, 74, 2.8]] },
      texto: "El búho Eusebio abrió los ojos enormes. —Conozco el camino, pero es largo —ulló—. Síganme al bosque de las luciérnagas.\nAllí el camino se partía en dos.",
      opciones: [["Pedir ayuda a las luciérnagas", "luciernagas"], ["Escalar el árbol más alto", "arbol"]] },
    luciernagas: { escena: { fondo: ["#06201B", "#14463A"], objetos: [["✨", 20, 30, 2.6], ["✨", 74, 24, 3], ["✨", 48, 52, 3.4], ["✨", 82, 70, 2.4], ["⭐", 50, 80, 3]] },
      texto: "Cientos de luciérnagas se juntaron alrededor de {nombre}. —Podemos hacer algo especial —zumbaron—, pero necesitamos que elijas cómo.",
      opciones: [["Formar una escalera de luz", "fin_escalera"], ["Cantar una canción de cuna", "fin_cuna"]] },
    arbol: { escena: { fondo: ["#2B2F7A", "#8E6BC9"], objetos: [["🌳", 50, 66, 8], ["🌙", 76, 16, 4.4], ["⭐", 50, 22, 3.2], ["🦉", 28, 44, 3]] },
      texto: "{nombre} trepó y trepó hasta la copa del árbol más alto del bosque. Desde ahí, la luna parecía estar al alcance de la mano.",
      opciones: [["Entregarle la estrella a la luna", "fin_luna"]] },
    fin_subir: { fin: "Final: La estrella con tu nombre", escena: { fondo: ["#0B1238", "#4A2F9E"], objetos: [["🌌", 50, 40, 7], ["⭐", 50, 40, 3], ["🎈", 22, 70, 3]] },
      texto: "{nombre} flotó junto a la estrella hasta las nubes. La estrella llegó a su lugar y, de agradecimiento, brilló más fuerte que nunca.\nDesde entonces, una estrella lleva el nombre de {nombre}." },
    fin_soltar: { fin: "Final: El saludo nocturno", escena: { fondo: ["#102058", "#3E3A9C"], objetos: [["🎈", 50, 20, 4], ["🌟", 50, 44, 3.6], ["🏡", 50, 80, 3]] },
      texto: "El globo subió y subió hasta perderse. A la mañana siguiente, una luz nueva parpadeaba cada noche sobre la casa: era la estrella diciendo «gracias» a {nombre}." },
    fin_escalera: { fin: "Final: La escalera de luz", escena: { fondo: ["#06201B", "#1F7A5E"], objetos: [["✨", 50, 30, 5], ["⭐", 50, 14, 3.6], ["🪜", 50, 62, 5]] },
      texto: "Las luciérnagas formaron una escalera brillante hasta el cielo. {nombre} acompañó a la estrella escalón por escalón, y juntos vieron el bosque desde arriba." },
    fin_cuna: { fin: "Final: La canción de cuna", escena: { fondo: ["#1E1456", "#5A3E9A"], objetos: [["🎶", 30, 34, 4], ["🌙", 70, 24, 4.4], ["⭐", 50, 62, 3.6]] },
      texto: "{nombre} cantó muy bajito. La canción subió y subió, y la luna la escuchó. Con un rayo plateado, recogió a la estrellita y la devolvió al cielo." },
    fin_luna: { fin: "Final: Un regalo para la luna", escena: { fondo: ["#141C5E", "#6B4CB5"], objetos: [["🌕", 50, 38, 8], ["⭐", 30, 70, 3], ["🦉", 76, 72, 3]] },
      texto: "La luna sonrió y tomó la estrella entre sus manos. —Gracias, {nombre} —dijo—. Esta noche tu ventana será la que más brille." }
  }
};
