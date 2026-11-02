// Para un cliente nuevo, cambia SOLO este archivo: escribe tu propio caso, sospechosos y documento cifrado.
window.DATOS = {
  titulo: "El Caso del Pastel Desaparecido",
  intro: "Esta noche, en el cumpleaños de Luis, el pastel de chocolate desapareció a las 8:45 pm. Hay cuatro sospechosos y un documento misterioso. Tú eres el detective: interroga, reúne pruebas y acusa al culpable.",
  culpable: "nico",
  intentos: 3,
  sospechosos: [
    { id: "marta", nombre: "Tía Marta", rol: "La anfitriona", color: "#C2527A", preguntas: [
      { p: "¿Dónde estabas a las 8:45?", r: "En la cocina, lavando platos. Vi a Nico pasar corriendo con las manos escondidas.", pista: "Nico pasó corriendo por la cocina." },
      { p: "¿Qué opinas del pastel?", r: "Lo hice con mucho cariño. Sería incapaz de esconderlo." },
      { p: "¿Notaste algo raro?", r: "El perro ladró hacia el garaje justo después de las 8:45.", pista: "El perro ladró hacia el garaje." } ] },
    { id: "nico", nombre: "Primo Nico", rol: "El más joven", color: "#3B82C4", preguntas: [
      { p: "¿Dónde estabas a las 8:45?", r: "En la sala, jugando en mi celular. ¡Toda la noche!", pista: "Nico dice que estuvo en la sala, pero Marta lo vio en la cocina." },
      { p: "¿Tienes hambre?", r: "Eh… no, ya cené. (se limpia la boca rápidamente)", pista: "Nico se limpió la boca con nerviosismo." },
      { p: "¿Qué hay en tus bolsillos?", r: "Nada. Solo un tenedor de postre. Es mío." } ] },
    { id: "beto", nombre: "Vecino Beto", rol: "Invitado de al lado", color: "#D98B2B", preguntas: [
      { p: "¿Dónde estabas?", r: "Afuera, platicando con el abuelo. Pregúntale a él." },
      { p: "¿Te gusta el chocolate?", r: "Soy alérgico al chocolate. Ni lo toco." },
      { p: "¿Viste a alguien?", r: "Vi una luz encendida en el garaje, pero no le di importancia.", pista: "Había una luz encendida en el garaje." } ] },
    { id: "rosa", nombre: "Abuela Rosa", rol: "La invitada de honor", color: "#4F9B72", preguntas: [
      { p: "¿Dónde estabas?", r: "Contando historias a los niños en el patio." },
      { p: "¿Quién crees que fue?", r: "Un niño con hambre, seguramente… y alguien con buena puntería para esconder cosas." },
      { p: "¿Tienes alguna pista?", r: "Encontré una servilleta con chocolate cerca de la puerta del garaje.", pista: "Servilleta con chocolate junto a la puerta del garaje." } ] }
  ],
  documento: { titulo: "Nota hallada bajo la mesa", cifrado: "HO SDVWHO VH HVFRQGLR HQ HO JDUDMH", desplazamiento: 3, claro: "EL PASTEL SE ESCONDIO EN EL GARAJE", ayuda: "Parece escrita con un cifrado antiguo: cada letra fue corrida varios lugares en el abecedario." },
  prueba: "Abres el garaje y ahí está el pastel, a medio comer… y Nico escondido detrás de una caja, con chocolate hasta las orejas.",
  finales: {
    maestro: { titulo: "Detective legendario", texto: "Resolviste el caso con muy pocas preguntas. Nadie se te escapa." },
    experto: { titulo: "Detective experto", texto: "Caso cerrado. Un buen trabajo de investigación." },
    novato: { titulo: "Detective aplicado", texto: "Lo resolviste con paciencia. La constancia también cuenta." },
    fracaso: { titulo: "Caso sin resolver", texto: "Se acabaron los intentos. El culpable era Nico, y el pastel estaba en el garaje." }
  }
};
