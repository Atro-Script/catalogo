// Qué puede personalizarse en cada producto (se muestra en la ventana de detalles).
const PERSONALIZA = {
  "menu-catalogo": "Platillos o productos, precios, opciones, fotos, colores y número de pedidos",
  "galeria-viva": "Obras, salas, fichas, audios y curaduría",
  "nuestro-album": "Fotos, fechas y dedicatorias (álbum) o portada y páginas con foto y texto (libro)",
  "noche-de-gala": "Evento, causa, etiqueta, programa y lugar",
  "misterio": "El caso, los sospechosos, las pistas y el documento cifrado",
  "cartas-coleccionables": "Las cartas, rarezas, frases y estadísticas",
  "mis-xv": "Nombre, fecha, lugar, programa, fotos, colores y mensaje",
  "para-siempre": "Nombres, fecha, lugar, programa, mesa de regalos y fotos",
  "fiesta-estelar": "Nombre y edad, colores, programa y ubicación",
  "bautizo-comunion": "Nombre, tipo de ceremonia, parroquia, programa y fotos",
  "baby-shower": "Nombre, fecha, mesa de regalos y resultado de la revelación",
  "primer-anito": "Nombre, fecha, lugar, fotos y colores",
  "lo-logre": "Nombre, año de generación, lugar, vestimenta y fotos",
  "nivel-desbloqueado": "Nombre, edad, logros, misión y lugar",
  "pregunta-especial": "La historia previa, la pregunta, las pistas del «No» y el mensaje final",
  "aniversario-pareja": "Fecha de inicio, carta, secreto, foto, música y colores",
  "rosa-interactiva": "Textos de cada pantalla y la carta completa",
  "capsula-del-tiempo": "Mensaje y fecha de apertura (modo cápsula) o capítulos con fechas, fotos y audios (modo capítulos)",
  "dias-de-sorpresas": "Fecha de inicio y el mensaje de cada día",
  "mapa-recuerdos": "Los lugares, sus fechas, historias y posición en el mapa",
  "pequenas-razones": "Las razones (las que quieras), nombres y mensaje final",
  "pase-de-abordar": "Pasajero, destino, fecha, vuelo, asiento y mensaje",
  "rasca-descubre": "Título, noticia secreta y colores de la superficie",
  "cuento-personalizado": "Nombre del protagonista, dedicatoria y las páginas del cuento",
  "caja-de-musica": "El nombre grabado, la dedicatoria, las melodías, los colores y el mensaje final",
  "galaxia-interactiva": "Mensajes, fotos, fecha de inicio y textos de bienvenida",
  "tarjeta-lealtad": "Premio, número de sellos, código y colores",
  "cotizador-reposteria": "Precio base, nombre del negocio y datos de contacto",
};
PERSONALIZA["invitacion-halloween"] = "Anfitrión, fecha, lugar, disfraces, programa y confirmación";
PERSONALIZA["invitacion-posada"] = "Anfitriones, fecha, lugar, villancicos, lista de qué llevar por invitado";
PERSONALIZA["despedida"] = "Nombre del festejado, versión (soltero o soltera), plan, misiones y vestimenta";
PERSONALIZA["caja-de-musica"] = "El nombre grabado, la dedicatoria, las melodías, los mensajes y las fotos que salen";
PERSONALIZA["televisor-recuerdos"] = "Los canales: fotos, textos y fechas de cada recuerdo";
PERSONALIZA["ramo-nocturno"] = "El nombre, el título, el mensaje de la tarjeta y el color de las flores";
PERSONALIZA["flores-amarillas"] = "El mensaje de cada flor, el texto del viaje y el mensaje final";
PERSONALIZA["hilo-rojo"] = "Las frases, el nombre que escribe el hilo y el texto de la carta final";
PERSONALIZA["lector-huella"] = "El mensaje o los recuerdos que se desbloquean y los textos del lector";
PERSONALIZA["caja-regalos-3d"] = "El mensaje de cada regalo, los colores de la caja y la carta final";
PERSONALIZA["planeta-construye"] = "Cada zona del planeta con su recuerdo, los colores y el mensaje final";
PERSONALIZA["jardin-luciernagas"] = "Un mensaje o foto por luciérnaga y el mensaje final";
PERSONALIZA["sorpresa-pastel"] = "Nombre, edad, carta completa, textos, colores pastel y la frase del gran final";
PERSONALIZA["minijuego-pixel"] = "El nombre, la carta, las canciones, el premio de la bola secreta, el boleto y las normas";
PERSONALIZA["cassette-canciones"] = "El título, la nota a mano, las canciones (con link de video opcional) y los colores del casete";
const IDEAL_PARA = { A: "Fiestas y celebraciones", B: "Regalos y sorpresas", C: "Pantallas, fondos y regalos", E: "Fechas especiales del año", F: "Fiestas y reuniones", G: "Pequeños negocios y emprendedores" };
PERSONALIZA["faroles-deseos"] = "Para: nombre, los deseos, el mensaje final, la firma y el color de la luz";
PERSONALIZA["galleta-fortuna"] = "Para: nombre, las fortunas, el mensaje final y los colores";
PERSONALIZA["ruleta"] = "Planes o premios (emoji, nombre y detalle), colores, mensaje y WhatsApp";
PERSONALIZA["globos-mensajes"] = "Para: nombre, los mensajes (uno por globo), colores y mensaje final";
PERSONALIZA["rompecabezas"] = "La foto, el mensaje del premio, los colores y el número de WhatsApp";
PERSONALIZA["nuestro-wrapped"] = "Las pantallas (números, listas, frases), los colores y el mensaje final";
PERSONALIZA["loteria-personalizada"] = "Las cartas (dibujo, nombre y verso), el premio y los colores";
PERSONALIZA["dia-de-las-madres"] = "Para quién, la carta, la firma, los vales y los colores";
PERSONALIZA["san-valentin"] = "Para quién, el mensaje, las razones, la firma y los colores";
PERSONALIZA["arbol-navidad"] = "Un mensaje por esfera, el mensaje final y los colores";
PERSONALIZA["truco-o-trato"] = "Los trucos, los tratos, el mensaje final y los colores";
PERSONALIZA["ofrenda-muertos"] = "Una vela por persona con su nombre y recuerdo, y el mensaje final";
PERSONALIZA["cuenta-nuevo-ano"] = "La fecha, los propósitos, el mensaje final y los colores";
PERSONALIZA["cabina-fotos"] = "Nombre del evento, colores del marco y texto de la tira";
PERSONALIZA["reserva-citas"] = "Servicios, duración y precio, días y horarios, y el WhatsApp del negocio";
PERSONALIZA["premios-generacion"] = "Las categorías, los nominados, quién gana, el mensaje final y los colores";
PERSONALIZA["arbol-del-amor"] = "Para quién, la fecha desde que están juntos, la carta, las fotos y los colores de las hojas";
PERSONALIZA["candelabro-deseos"] = "Un deseo por vela (de 3 a 7), el mensaje final y los colores";
PERSONALIZA["corazon-armado"] = "Las frases, el mensaje final, el número de piezas (4 o 6) y los colores";
