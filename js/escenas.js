/* AtroScript · Escenas ilustradas del catálogo.
   Cada producto tiene una escena propia: una ilustración principal + 3 acompañantes (assets/arte.js),
   sobre una textura según su categoría. Para cambiar el arte de un producto, edita su fila en MOTIVOS:
   [principal, acompañante 1, acompañante 2, acompañante 3]. Los nombres válidos están en Arte.nombres. */
const MOTIVOS = {
  "mis-xv": ["corona", "rosa", "chispa", "estrella"],
  "para-siempre": ["copa", "rosa", "corazon", "chispa"],
  "fiesta-estelar": ["estrella", "globo", "confeti", "chispa"],
  "bautizo-comunion": ["vela", "nube", "chispa", "estrella"],
  "baby-shower": ["bebe", "globo", "estrella", "nube"],
  "primer-anito": ["pastel", "sombrero", "globo", "confeti"],
  "lo-logre": ["trofeo", "confeti", "estrella", "chispa"],
  "nivel-desbloqueado": ["mando", "estrella", "candado", "chispa"],
  "invitacion-halloween": ["calabaza", "fantasma", "murcielago", "dulce"],
  "invitacion-posada": ["farol", "estrella", "copo", "dulce"],
  "despedida": ["botella", "disco", "confeti", "copa"],
  "noche-de-gala": ["copa", "estrella", "chispa", "corona"],
  "premios-generacion": ["medalla", "birrete", "estrella", "trofeo"],
  "pregunta-especial": ["corazon", "sobre", "chispa", "petalo"],
  "aniversario-pareja": ["corazon", "vela", "flor", "chispa"],
  "rosa-interactiva": ["rosa", "petalo", "chispa", "hoja"],
  "capsula-del-tiempo": ["reloj", "sobre", "estrella", "chispa"],
  "dias-de-sorpresas": ["regalo", "calendario", "estrella", "chispa"],
  "mapa-recuerdos": ["mapa", "pin", "corazon", "camara"],
  "pequenas-razones": ["corazon", "libreta", "chispa", "petalo"],
  "pase-de-abordar": ["avion", "boleto", "nube", "estrella"],
  "rasca-descubre": ["boleto", "estrella", "chispa", "moneda"],
  "cuento-personalizado": ["libro", "luna", "estrella", "chispa"],
  "caja-de-musica": ["cajamusica", "nota", "estrella", "chispa"],
  "televisor-recuerdos": ["televisor", "camara", "corazon", "chispa"],
  "ramo-nocturno": ["tulipan", "rosa", "luna", "chispa"],
  "flores-amarillas": ["girasol", "flor", "chispa", "hoja"],
  "hilo-rojo": ["corazon", "espiral", "chispa", "petalo"],
  "lector-huella": ["huella", "candado", "check", "chispa"],
  "caja-regalos-3d": ["regalo", "confeti", "estrella", "chispa"],
  "sorpresa-pastel": ["pastel", "globo", "flor", "chispa"],
  "faroles-deseos": ["farol", "luna", "estrella", "chispa"],
  "galleta-fortuna": ["fortuna", "estrella", "chispa", "moneda"],
  "nuestro-wrapped": ["nota", "corazon_morado", "estrella", "chispa"],
  "nuestro-album": ["camara", "marco", "corazon", "chispa"],
  "arbol-del-amor": ["robles", "corazon", "petalo", "chispa"],
  "candelabro-deseos": ["vela", "llama", "estrella", "chispa"],
  "corazon-armado": ["puzzle", "corazon", "chispa", "estrella"],
  "galaxia-interactiva": ["galaxia", "estrella", "corazon", "chispa"],
  "planeta-construye": ["planeta", "estrella", "luna", "chispa"],
  "jardin-luciernagas": ["luciernaga", "flor", "luna", "hoja"],
  "cassette-canciones": ["casete", "nota", "corazon", "chispa"],
  "galeria-viva": ["marco", "paleta", "estrella", "chispa"],
  "dia-de-las-madres": ["tulipan", "sobre", "corazon", "petalo"],
  "san-valentin": ["corazon", "rosa", "sobre", "chispa"],
  "arbol-navidad": ["arbol", "regalo", "copo", "estrella"],
  "truco-o-trato": ["calabaza", "dulce", "fantasma", "chocolate"],
  "ofrenda-muertos": ["cempasuchil", "calavera", "vela", "chispa"],
  "cuenta-nuevo-ano": ["fuegos", "copa", "reloj", "confeti"],
  "minijuego-pixel": ["mando", "corazon", "estrella", "chispa"],
  "ruleta": ["ruleta", "pizza", "estrella", "chispa"],
  "globos-mensajes": ["globo", "confeti", "nube", "estrella"],
  "rompecabezas": ["puzzle", "estrella", "chispa", "corazon"],
  "loteria-personalizada": ["cartas", "pastel", "estrella", "chispa"],
  "cartas-coleccionables": ["cartas", "estrella", "corona", "chispa"],
  "misterio": ["lupa", "libreta", "candado", "chispa"],
  "cabina-fotos": ["camara", "estrella", "corazon", "chispa"],
  "tarjeta-lealtad": ["tarjeta", "estrella", "corazon", "chispa"],
  "cotizador-reposteria": ["pastel", "cupcake", "dinero", "chispa"],
  "menu-catalogo": ["qr", "cafe", "pizza", "chispa"],
  "reserva-citas": ["calendario", "tijeras", "esmalte", "chispa"],
};
const DEFECTO = ["estrella", "chispa", "corazon", "chispa"];
// posiciones [izq %, arriba %, tamaño px, profundidad, retraso s] de los 3 acompañantes (3 composiciones)
const COMPOSICIONES = [
  [[17, 30, 42, 20, 0], [81, 25, 36, 26, -1.3], [76, 74, 30, 16, -2.1]],
  [[15, 68, 40, 18, -.6], [84, 40, 42, 24, -1.8], [30, 21, 30, 14, -2.6]],
  [[21, 22, 38, 22, -1], [79, 71, 42, 18, -.2], [87, 22, 28, 28, -2.4]]
];
const hashDe = s => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; };
const motivos = slug => (MOTIVOS[slug] || DEFECTO).map(n => (window.Arte && Arte.nombres.includes(n)) ? n : "estrella");
function imagenArte(n, clase) {
  const i = new Image(); i.src = window.Arte ? Arte.url(n) : ""; i.alt = ""; i.draggable = false; i.decoding = "async"; if (clase) i.className = clase; return i;
}
function crear(clase, hijos) { const d = document.createElement("div"); d.className = clase; (hijos || []).forEach(h => d.append(h)); return d; }

function escena(slug) {
  const m = motivos(slug), h = hashDe(slug), com = COMPOSICIONES[h % 3];
  const el = crear("es");
  el.style.setProperty("--d", (-(h % 9) * .8) + "s");
  el.style.setProperty("--dur", (5.2 + (h % 5) * .5) + "s");
  el.style.setProperty("--r0", (-4 + (h % 3)) + "deg"); el.style.setProperty("--r1", (3 + (h % 4)) + "deg");
  el.append(crear("es-fondo"), crear("es-tex"), crear("es-grano"), crear("es-marco"));
  [[12, 18, 0], [88, 56, -1.1], [60, 10, -2], [30, 82, -.5], [92, 14, -2.8]].forEach(([x, y, d]) => {
    const c = imagenArte("chispa", "es-chisp"); c.style.cssText = `left:${x}%;top:${y}%;animation-delay:${d}s`; el.append(c);
  });
  el.append(crear("es-halo"));
  com.forEach(([x, y, t, k, d], i) => {
    const im = imagenArte(m[i + 1], "es-sat"); im.style.cssText = `width:${t}px;height:${t}px;animation-delay:${d}s`;
    const capa = crear("es-capa es-capa-s", [im]); capa.style.cssText = `left:${x}%;top:${y}%;--k:${k}`; el.append(capa);
  });
  const principal = crear("es-capa es-capa-p", [crear("es-obj", [imagenArte(m[0], "es-main")])]); principal.style.setProperty("--k", 12); el.append(principal);
  el.append(crear("es-brillo"));
  return el;
}
function miniArte(slug, clase) { return imagenArte(motivos(slug)[0], clase || "es-mini"); }

/* Parallax suave con el ratón y rebote al tocar */
(function () {
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  let raf = 0;
  document.addEventListener("pointermove", e => {
    if (e.pointerType !== "mouse") return;
    const c = e.target.closest && e.target.closest(".cab-t"); if (!c) return;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0; const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 2 - 1).toFixed(3));
      c.style.setProperty("--my", ((e.clientY - r.top) / r.height * 2 - 1).toFixed(3));
    });
  }, { passive: true });
  document.addEventListener("pointerout", e => {
    const c = e.target.closest && e.target.closest(".cab-t");
    if (c && !c.contains(e.relatedTarget)) { c.style.setProperty("--mx", 0); c.style.setProperty("--my", 0); }
  }, { passive: true });
  document.addEventListener("pointerdown", e => {
    const c = e.target.closest && e.target.closest(".cab-t"); if (!c) return;
    c.classList.remove("toque"); void c.offsetWidth; c.classList.add("toque");
  }, { passive: true });
})();
