const CATEGORIAS = [
  { id: "A", nombre: "Eventos", desc: "Invitaciones para celebraciones: programa, ubicación, cuenta regresiva y confirmación por WhatsApp." },
  { id: "B", nombre: "Regalos digitales", desc: "Experiencias para sorprender, expresar sentimientos y conservar recuerdos." },
  { id: "C", nombre: "Experiencias visuales", desc: "Animaciones interactivas que también sirven como fondos para eventos." },
  { id: "D", nombre: "Diseño", desc: "Herramientas para crear tus propias invitaciones." },
  { id: "F", nombre: "Juegos", desc: "Juegos personalizables con mecánicas propias para fiestas y celebraciones." },
  { id: "G", nombre: "Negocios", desc: "Herramientas digitales para pequeños negocios." }
];
const NOMBRE_CAT = { A: "Eventos", B: "Regalos", C: "Visual", D: "Diseño", F: "Juegos", G: "Negocios" };
const $ = id => document.getElementById(id);
const norm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 12.5l5 5 10-11"/></svg>';
let activa = "todas", texto = "", ultimoFoco = null;
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

function tarjeta(p) {
  const [c, slug, nombre, desc, feats, nuevo] = p;
  const a = document.createElement("article"); a.className = "tarjeta cat-" + c; a.dataset.slug = slug;
  const cab = document.createElement("button"); cab.type = "button"; cab.className = "cab-t"; cab.setAttribute("aria-label", "Ver detalles de " + nombre); cab.onclick = () => detalle(slug);
  const pill = document.createElement("span"); pill.className = "pill"; pill.textContent = NOMBRE_CAT[c]; cab.append(pill);
  if (nuevo) { const n = document.createElement("span"); n.className = "pill nuevo"; n.textContent = "Nuevo"; cab.append(n); }
  cab.append(icono(slug));
  const cuerpo = document.createElement("div"); cuerpo.className = "cuerpo";
  const h = document.createElement("h3"); const hb = document.createElement("button"); hb.type = "button"; hb.className = "titulo-btn"; hb.textContent = nombre; hb.onclick = () => detalle(slug); h.append(hb);
  const d = document.createElement("p"); d.className = "desc"; d.textContent = desc;
  const ul = document.createElement("ul"); ul.className = "feats";
  feats.forEach(f => { const li = document.createElement("li"); li.innerHTML = CHECK; li.append(f); ul.append(li); });
  const acc = document.createElement("div"); acc.className = "acc-t";
  const ver = document.createElement("a"); ver.className = "ver"; ver.href = slug + "/index.html"; ver.textContent = "Ver demo";
  const el = boton("elegir", "", () => alternar(slug)); el.dataset.slug = slug;
  const mas = boton("mas", "Detalles", () => detalle(slug));
  acc.append(ver, el); cuerpo.append(h, d, ul, acc, mas); a.append(cab, cuerpo);
  return a;
}
function pintar() {
  const cat = CATEGORIAS.find(c => c.id === activa);
  $("descCat").textContent = cat ? cat.desc : "";
  $("lista").replaceChildren();
  const q = norm(texto);
  const lista = PRODUCTOS.filter(p => (activa === "todas" || p[0] === activa) && norm(p[2] + " " + p[3] + " " + p[4].join(" ") + " " + NOMBRE_CAT[p[0]] + " " + (PERSONALIZA[p[1]] || "")).includes(q));
  if (!lista.length) { const v = document.createElement("p"); v.className = "vacio"; v.textContent = "No encontramos productos con esa búsqueda. ¿Tienes una idea distinta? Cuéntanosla."; $("lista").append(v); return; }
  lista.forEach(p => $("lista").append(tarjeta(p)));
  refrescar();
}
function filtros() {
  [{ id: "todas", nombre: "Todos" }, ...CATEGORIAS].forEach(o => {
    const n = o.id === "todas" ? PRODUCTOS.length : PRODUCTOS.filter(p => p[0] === o.id).length;
    const b = document.createElement("button"); b.append(o.nombre); const s = document.createElement("small"); s.textContent = n; b.append(s);
    b.className = o.id === activa ? "on" : "";
    b.onclick = () => { activa = o.id; [...$("filtros").children].forEach(x => x.classList.toggle("on", x === b)); pintar(); };
    $("filtros").append(b);
  });
}

/* ---------- Selección ---------- */
function refrescar() {
  document.querySelectorAll(".elegir").forEach(b => { const on = sel.has(b.dataset.slug); b.textContent = on ? "✓ Elegido" : "+ Elegir"; b.classList.toggle("on", on); b.setAttribute("aria-pressed", String(on)); });
  $("nSel").textContent = sel.size; $("barraSel").hidden = sel.size === 0;
  if (!$("panelSel").hidden) listaSel();
  if (!$("detalle").hidden && $("dElegir").dataset.slug) { const on = sel.has($("dElegir").dataset.slug); $("dElegir").textContent = on ? "✓ En mi selección" : "+ Agregar a mi selección"; $("dElegir").classList.toggle("on", on); }
}
function listaSel() {
  $("selLista").replaceChildren();
  if (!sel.size) { const li = document.createElement("li"); li.className = "vacio-sel"; li.textContent = "Aún no elegiste nada. Toca «+ Elegir» en los productos que te gusten."; $("selLista").append(li); }
  [...sel].forEach(s => {
    const p = porSlug(s); if (!p) return;
    const li = document.createElement("li"); li.className = "cat-" + p[0];
    const ic = icono(s); const t = document.createElement("span"); t.textContent = p[2];
    const q = boton("quitar", "×", () => { sel.delete(s); guardar(); refrescar(); }); q.setAttribute("aria-label", "Quitar " + p[2]);
    li.append(ic, t, q); $("selLista").append(li);
  });
  $("selEnviar").disabled = !sel.size;
}
function abrirModal(m) { ultimoFoco = document.activeElement; m.hidden = false; document.body.classList.add("sin-scroll"); const f = m.querySelector("button, a"); if (f) f.focus(); }
function cerrarModal(m) { m.hidden = true; if (!$("detalle").hidden || !$("panelSel").hidden) return; document.body.classList.remove("sin-scroll"); if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus(); }
function detalle(slug) {
  const p = porSlug(slug); if (!p) return; const [c, , nombre, desc, feats] = p;
  const caja = $("dCaja"); caja.className = "modal-caja cat-" + c;
  $("dIcono").replaceChildren(icono(slug)); $("dPill").textContent = NOMBRE_CAT[c]; $("dTit").textContent = nombre; $("dDesc").textContent = desc;
  $("dFeats").replaceChildren(); feats.forEach(f => { const li = document.createElement("li"); li.innerHTML = CHECK; li.append(f); $("dFeats").append(li); });
  $("dPers").textContent = PERSONALIZA[slug] || "Textos, fotos y colores"; $("dIdeal").textContent = IDEAL_PARA[c];
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
  let m = "Hola, me interesa cotizar estos productos de AtroScript:\n" + [...sel].map(s => "• " + porSlug(s)[2]).join("\n");
  if ($("selNombre").value.trim()) m += "\n\nMi nombre: " + $("selNombre").value.trim();
  if ($("selFecha").value) m += "\nFecha del evento o entrega: " + $("selFecha").value.split("-").reverse().join("/");
  if ($("selNotas").value.trim()) m += "\nLo que necesito: " + $("selNotas").value.trim();
  window.open("https://wa.me/" + ATRO_WHATSAPP + "?text=" + encodeURIComponent(m), "_blank");
};

/* ---------- Inicio ---------- */
$("total").textContent = PRODUCTOS.length + " productos"; $("nProd").textContent = PRODUCTOS.length;
DESTACADOS.forEach(n => { const p = PRODUCTOS.find(x => x[1] === n); if (p) $("destacadosLista").append(tarjeta(p)); });
$("buscar").oninput = e => { texto = e.target.value; pintar(); };
const wa = "https://wa.me/" + ATRO_WHATSAPP + "?text=" + encodeURIComponent("Hola, tengo una idea para un proyecto digital:");
["cotizar", "cotizar2", "cotizar3"].forEach(id => { $(id).href = wa; $(id).target = "_blank"; $(id).rel = "noopener"; });
filtros(); pintar();

document.querySelectorAll(".sec .enc, .pasos li, .cierre").forEach(el => el.classList.add("rev"));
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("ver"); io.unobserve(x.target); } }), { threshold: .15 });
  document.querySelectorAll(".rev").forEach(el => io.observe(el));
} else document.querySelectorAll(".rev").forEach(el => el.classList.add("ver"));

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
