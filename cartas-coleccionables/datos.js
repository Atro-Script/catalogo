// Para un cliente nuevo, cambia SOLO este archivo.
// atributos: los 3 datos que se comparan en las cartas y en el Duelo. Cada carta lleva 3 valores (de 1 a 100) en ese orden.
// rareza: "común", "rara", "épica" o "legendaria". Para foto usa src: "fotos/mama.jpg" en lugar de emoji.
// secreta: carta especial que se desbloquea al ganar varios duelos (déjala en null para quitarla).
window.DATOS = {
  titulo: "Cartas de la Familia",
  subtitulo: "Abre sobres, colecciona y reta en duelo",
  porSobre: 3,
  atributos: ["Cariño", "Diversión", "Sabor"],
  victoriasSecreta: 3,
  secreta: { nombre: "Tú", emoji: "👑", rareza: "legendaria", frase: "La carta más rara de toda la colección: la que nadie más tiene.", valores: [100, 100, 100] },
  cartas: [
    { nombre: "Mamá", emoji: "👩", rareza: "legendaria", frase: "Siempre sabe qué necesitas, antes de que lo pidas.", valores: [100, 78, 99] },
    { nombre: "Papá", emoji: "👨", rareza: "épica", frase: "El rey del asador y de los chistes malos.", valores: [92, 95, 97] },
    { nombre: "Abuela", emoji: "👵", rareza: "épica", frase: "Sus tamales son patrimonio de la humanidad.", valores: [99, 70, 100] },
    { nombre: "Abuelo", emoji: "👴", rareza: "rara", frase: "Tiene una historia para cada ocasión.", valores: [90, 85, 60] },
    { nombre: "Tío Beto", emoji: "🕺", rareza: "rara", frase: "Si hay música, él ya está bailando.", valores: [75, 99, 55] },
    { nombre: "Prima Ana", emoji: "🤳", rareza: "rara", frase: "Cada reunión es una sesión de fotos.", valores: [80, 94, 40] },
    { nombre: "Hermano", emoji: "🎮", rareza: "común", frase: "Puede ganarte en todo, menos en paciencia.", valores: [60, 88, 72] },
    { nombre: "Max", emoji: "🐶", rareza: "común", frase: "Mueve la cola cuando alguien dice «pastel».", valores: [100, 90, 20] },
    { nombre: "Tía Lupe", emoji: "🍲", rareza: "común", frase: "Nadie se va de su casa con hambre.", valores: [93, 65, 98] }
  ]
};
