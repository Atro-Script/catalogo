const CATEGORIAS = [
  { id: "A", nombre: "Eventos", desc: "Invitaciones para celebraciones: programa, ubicación, cuenta regresiva y confirmación por WhatsApp." },
  { id: "B", nombre: "Regalos digitales", desc: "Experiencias para sorprender, expresar sentimientos y conservar recuerdos." },
  { id: "C", nombre: "Experiencias visuales", desc: "Animaciones interactivas que también sirven como fondos para eventos." },
  { id: "E", nombre: "Fechas especiales", desc: "Mamá, San Valentín, Navidad, Halloween, Día de Muertos y Año Nuevo: regalos digitales para cada fecha." },
  { id: "F", nombre: "Juegos", desc: "Juegos personalizables con mecánicas propias para fiestas y celebraciones." },
  { id: "G", nombre: "Negocios", desc: "Herramientas digitales para pequeños negocios." }
];
const NOMBRE_CAT = { A: "Eventos", B: "Regalos", C: "Visual", E: "Fechas", F: "Juegos", G: "Negocios" };
const $ = id => document.getElementById(id);
const norm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 12.5l5 5 10-11"/></svg>';
let activa = "todas", ultimoFoco = null;
let sel = new Set();
try { sel = new Set((JSON.parse(localStorage.getItem("atro-sel")) || []).filter(s => PRODUCTOS.some(p => p[1] === s))); } catch (e) {}
const guardar = () => { try { localStorage.setItem("atro-sel", JSON.stringify([...sel])); } catch (e) {} };
const porSlug = s => PRODUCTOS.find(p => p[1] === s);

function icono(slug) {
  const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("class", "ico"); s.setAttribute("aria-hidden", "true");
  s.setAttribute("fill", "none"); s.setAttribute("stroke", "currentColor"); s.setAttribute("stroke-width", "1.6"); s.setAttribute("stroke-linecap", "round"); s.setAttribute("stroke-linejoin", "round");
  s.innerHTML = (window.ICONOS && window.ICONOS[slug]) || "";   // íconos propios, contenido fijo del proyecto
  return s;
}
function alternar(slug) { if (sel.has(slug)) sel.delete(slug); else sel.add(slug); guardar(); refrescar(); }
function boton(clase, texto, fn) { const b = document.createElement("button"); b.className = clase; b.type = "button"; b.textContent = texto; b.onclick = fn; return b; }

const PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" fill="currentColor"/></svg>';
const ioTarjetas = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(x => {
  const t = x.target; t.classList.toggle("en-pantalla", x.isIntersecting);
  if (x.isIntersecting && t.classList.contains("pre")) { t.classList.remove("pre"); t.classList.add("entra"); }
}), { rootMargin: "120px 0px" }) : null;
function tarjeta(p, i = 0) {
  const [c, slug, nombre, desc, feats] = p;
  const a = document.createElement("article"); a.className = "tarjeta cat-" + c; a.dataset.slug = slug;
  const cab = document.createElement("button"); cab.type = "button"; cab.className = "cab-t"; cab.setAttribute("aria-label", "Ver detalles de " + nombre); cab.onclick = () => abrirVista(slug, visibles);
  const pill = document.createElement("span"); pill.className = "pill"; pill.textContent = NOMBRE_CAT[c]; cab.append(pill);
  cab.append(escena(slug));
  const pl = document.createElement("span"); pl.className = "probar"; pl.innerHTML = PLAY + "Probar demo"; cab.append(pl);
  const cuerpo = document.createElement("div"); cuerpo.className = "cuerpo";
  const h = document.createElement("h3"); const hb = document.createElement("button"); hb.type = "button"; hb.className = "titulo-btn"; hb.textContent = nombre; hb.onclick = () => detalle(slug); h.append(hb);
  const d = document.createElement("p"); d.className = "desc"; d.textContent = desc;
  const ul = document.createElement("ul"); ul.className = "feats";
  feats.forEach(f => { const li = document.createElement("li"); li.innerHTML = CHECK; li.append(f); ul.append(li); });
  const per = document.createElement("p"); per.className = "per"; per.append((() => { const b = document.createElement("b"); b.textContent = "Tú cambias: "; return b; })(), PERSONALIZA[slug] || "textos, fotos y colores");
  const pr = document.createElement("p"); pr.className = "precio"; pr.innerHTML = "<span>Desde</span> <b>$" + precioDe(slug) + "</b> <small>MXN · sin suscripción</small>";
  const acc = document.createElement("div"); acc.className = "acc-t";
  const ver = document.createElement("a"); ver.className = "ver"; ver.href = slug + "/index.html"; ver.textContent = "Probar demo"; ver.onclick = e => { if (e.ctrlKey || e.metaKey || e.shiftKey || e.button) return; e.preventDefault(); abrirVista(slug, visibles); };
  const el = boton("elegir", "", () => alternar(slug)); el.dataset.slug = slug;
  const mas = boton("mas", "Detalles", () => detalle(slug));
  acc.append(ver, el); cuerpo.append(h, d, ul, per, pr, acc, mas); a.append(cab, cuerpo);
  a.style.setProperty("--e", (i % 3) * 90 + "ms");
  if (ioTarjetas) { a.classList.add("pre"); ioTarjetas.observe(a); } else a.classList.add("en-pantalla");
  return a;
}
let visibles = [];
function pintar() {
  const cat = CATEGORIAS.find(c => c.id === activa);
  $("descCat").textContent = cat ? cat.desc : "";
  if (ioTarjetas) ioTarjetas.disconnect();
  $("lista").replaceChildren();
  const rango = s => { const i = DESTACADOS.indexOf(s); return i < 0 ? 99 : i; };
  const lista = PRODUCTOS.filter(p => (activa === "todas" || p[0] === activa) && true).sort((a, b) => rango(a[1]) - rango(b[1]));
  visibles = lista.map(p => p[1]);
  if (!lista.length) {
    const v = document.createElement("div"); v.className = "vacio";
    const t = document.createElement("p"); t.textContent = "Aún no hay productos en esta categoría. Cuéntanos tu idea y la creamos.";
    const r = boton("elegir", "Ver todos los productos", () => { activa = "todas"; sincronizar(); pintar(); });
    r.style.maxWidth = "18rem"; r.style.margin = ".8rem auto 0";
    v.append(t, r); $("lista").append(v); return;
  }
  lista.forEach((p, i) => $("lista").append(tarjeta(p, i)));
  refrescar();
}
function sincronizar() {
  [...$("filtros").children].forEach((x, i) => x.classList.toggle("on", (i === 0 ? "todas" : CATEGORIAS[i - 1].id) === activa));
}
function filtros() {
  [{ id: "todas", nombre: "Todos" }, ...CATEGORIAS].forEach(o => {
    const n = o.id === "todas" ? PRODUCTOS.length : PRODUCTOS.filter(p => p[0] === o.id).length;
    const b = document.createElement("button"); b.append(o.nombre); const s = document.createElement("small"); s.textContent = n; b.append(s);
    b.className = o.id === activa ? "on" : "";
    b.onclick = () => { activa = o.id; sincronizar(); [...$("filtros").children].forEach(x => x.classList.toggle("on", x === b)); pintar(); };
    $("filtros").append(b);
  });
}

/* ---------- Selección ---------- */
function refrescar() {
  if (window.refrescarVista) refrescarVista();
  document.querySelectorAll(".elegir").forEach(b => { const on = sel.has(b.dataset.slug); b.textContent = on ? "✓ Elegido" : "+ Elegir"; b.classList.toggle("on", on); b.setAttribute("aria-pressed", String(on)); });
  $("nSel").textContent = sel.size; $("barraSel").hidden = sel.size === 0;
  if (!$("panelSel").hidden) listaSel();
  if (!$("detalle").hidden && $("dElegir").dataset.slug) { const on = sel.has($("dElegir").dataset.slug); $("dElegir").textContent = on ? "✓ En mi selección" : "+ Agregar a mi selección"; $("dElegir").classList.toggle("on", on); }
}
const AV_FOTOS = "Tus fotos, audios y cualquier dato que nos compartas se usan solo para elaborar tu pedido y se eliminarán después de entregar tu producto.";
const AV_DATOS = "Los datos que nos compartas se usan solo para tu cotización y se eliminarán después de entregar tu producto.";
function usaFotos(slug) {
  const p = porSlug(slug); if (!p) return false;
  return /foto|polaroid|audio|imagen|álbum|album/i.test((PERSONALIZA[slug] || "Textos, fotos y colores") + " " + p[3] + " " + p[4].join(" "));
}
function avisoPrivacidad() {
  const conFotos = [...sel].some(usaFotos);
  const el = $("selPriv"); el.replaceChildren();
  el.append("🔒 " + (conFotos ? AV_FOTOS : AV_DATOS) + " ");
  const a = document.createElement("a"); a.href = "privacidad.html"; a.target = "_blank"; a.rel = "noopener"; a.textContent = "Ver política de privacidad";
  el.append(a);
}
function listaSel() {
  $("selLista").replaceChildren();
  if (!sel.size) { const li = document.createElement("li"); li.className = "vacio-sel"; li.textContent = "Aún no elegiste nada. Toca «+ Elegir» en los productos que te gusten."; $("selLista").append(li); }
  [...sel].forEach(s => {
    const p = porSlug(s); if (!p) return;
    const li = document.createElement("li"); li.className = "cat-" + p[0];
    const ic = miniArte(s); const t = document.createElement("span"); t.textContent = p[2];
    const q = boton("quitar", "×", () => { sel.delete(s); guardar(); refrescar(); }); q.setAttribute("aria-label", "Quitar " + p[2]);
    li.append(ic, t, q); $("selLista").append(li);
  });
  $("selEnviar").disabled = !sel.size;
  avisoPrivacidad();
}
function abrirModal(m) { ultimoFoco = document.activeElement; m.hidden = false; document.body.classList.add("sin-scroll"); const f = m.querySelector("button, a"); if (f) f.focus(); }
function cerrarModal(m) { m.hidden = true; if (!$("detalle").hidden || !$("panelSel").hidden) return; document.body.classList.remove("sin-scroll"); if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus(); }
function detalle(slug) {
  const p = porSlug(slug); if (!p) return; const [c, , nombre, desc, feats] = p;
  const caja = $("dCaja"); caja.className = "modal-caja cat-" + c;
  $("dIcono").replaceChildren(miniArte(slug)); $("dPill").textContent = NOMBRE_CAT[c]; $("dTit").textContent = nombre; $("dDesc").textContent = desc;
  $("dFeats").replaceChildren(); feats.forEach(f => { const li = document.createElement("li"); li.innerHTML = CHECK; li.append(f); $("dFeats").append(li); });
  $("dPers").textContent = PERSONALIZA[slug] || "Textos, fotos y colores"; $("dIdeal").textContent = IDEAL_PARA[c];
  $("dPrecio").textContent = "Desde $" + precioDe(slug) + " MXN, sin suscripción. El precio final depende de cuánto lo personalices.";
  $("dVer").href = slug + "/index.html"; $("dElegir").dataset.slug = slug;
  abrirModal($("detalle")); refrescar();
}
$("dElegir").onclick = () => alternar($("dElegir").dataset.slug);
document.querySelectorAll("[data-cerrar]").forEach(b => { b.onclick = () => cerrarModal(b.closest(".modal")); });
document.querySelectorAll(".modal").forEach(m => { m.addEventListener("click", e => { if (e.target === m) cerrarModal(m); }); });
document.addEventListener("keydown", e => { if (e.key === "Escape") { if (!$("detalle").hidden) cerrarModal($("detalle")); else if (!$("panelSel").hidden) cerrarModal($("panelSel")); } });
$("abrirSel").onclick = () => { listaSel(); abrirModal($("panelSel")); };
$("selVaciar").onclick = () => { sel.clear(); guardar(); refrescar(); };
$("selEnviar").onclick = () => {
  if (!sel.size) return;
  let m = "Hola, me interesa cotizar estos productos de AtroScript:\n" + [...sel].map(s => "• " + porSlug(s)[2] + " (desde $" + precioDe(s) + " MXN)").join("\n");
  if ($("selNombre").value.trim()) m += "\n\nMi nombre: " + $("selNombre").value.trim();
  if ($("selFecha").value) m += "\nFecha del evento o entrega: " + $("selFecha").value.split("-").reverse().join("/");
  if ($("selNotas").value.trim()) m += "\nLo que necesito: " + $("selNotas").value.trim();
  m += "\n\n🔒 Entiendo que mis " + ([...sel].some(usaFotos) ? "fotos y datos" : "datos") + " se usan solo para mi pedido y se eliminan después de la entrega.";
  window.open("https://wa.me/" + ATRO_WHATSAPP + "?text=" + encodeURIComponent(m), "_blank", "noopener,noreferrer");
};

/* ---------- Inicio ---------- */
$("total").textContent = PRODUCTOS.length + " productos"; $("nProd").textContent = PRODUCTOS.length;
const wa = "https://wa.me/" + ATRO_WHATSAPP + "?text=" + encodeURIComponent("Hola, tengo una idea para un proyecto digital:");
["cotizar2", "cotizar3"].forEach(id => { $(id).href = wa; $(id).target = "_blank"; $(id).rel = "noopener"; });
filtros(); pintar();
$("probarDemo").onclick = () => abrirVista(DESTACADOS[Math.floor(Math.random() * DESTACADOS.length)], DESTACADOS);

document.querySelectorAll(".sec .enc, .pasos li, .cierre").forEach(el => el.classList.add("rev"));
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("visto"); io.unobserve(x.target); } }), { threshold: .15 });
  document.querySelectorAll(".rev").forEach(el => io.observe(el));
} else document.querySelectorAll(".rev").forEach(el => el.classList.add("visto"));

// Pantalla de carga con el logo (una vez por visita) y logo grande de la portada
(function () {
  const intro = $("intro");
  const montarHero = () => document.querySelectorAll("[data-atro-logo][data-diferido]").forEach(c => { try { window.AtroLogo.montar(c); } catch (e) {} });
  let visto = false;
  try { visto = sessionStorage.getItem("atro-intro") === "1"; } catch (e) {}
  let listo = false;
  const quitar = () => { if (listo) return; listo = true; intro.classList.add("fuera"); setTimeout(() => intro.remove(), 800); montarHero(); try { sessionStorage.setItem("atro-intro", "1"); } catch (e) {} };
  if (visto) { intro.remove(); montarHero(); return; }
  const min = new Promise(r => setTimeout(r, 2400));
  const cargado = new Promise(r => { if (document.readyState === "complete") r(); else addEventListener("load", r); });
  Promise.all([min, cargado]).then(quitar);
  setTimeout(quitar, 5000);
})();
