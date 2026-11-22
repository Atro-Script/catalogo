/* Extras del catálogo: ocasiones, vista previa en vivo y "Sorpréndeme". */

/* ---------- Vista previa en vivo (pantalla completa) ---------- */
let vLista = [], vIdx = 0;
const vEl = id => document.getElementById(id);

function pintarVista() {
  const slug = vLista[vIdx], p = porSlug(slug); if (!p) return;
  const [c, , nombre] = p;
  vEl("vCaja").className = "vista-caja cat-" + c;
  vEl("vCaja").classList.remove("lista");
  vEl("vista").setAttribute("aria-label", "Demo: " + nombre);
  vEl("vFrame").src = slug + "/index.html";
}
function abrirVista(slug, lista) {
  vLista = (lista && lista.includes(slug)) ? lista : PRODUCTOS.map(p => p[1]);
  vIdx = Math.max(0, vLista.indexOf(slug));
  const v = vEl("vista"); ultimoFoco = document.activeElement;
  v.hidden = false; document.body.classList.add("sin-scroll");
  pintarVista();
}
function cerrarVista() {
  const v = vEl("vista"); if (v.hidden) return;
  v.hidden = true; vEl("vFrame").src = "about:blank";
  if ($("detalle").hidden && $("panelSel").hidden) document.body.classList.remove("sin-scroll");
  if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus({ preventScroll: true });
}

vEl("vCerrar").onclick = cerrarVista;
document.addEventListener("keydown", e => {
  if (vEl("vista").hidden) return;
  if (e.key === "Escape") { e.stopImmediatePropagation(); cerrarVista(); }
}, true);

// La demo aparece con un fundido cuando termina de cargar; Esc dentro de la demo también regresa.
vEl("vFrame").addEventListener("load", () => {
  if (vEl("vFrame").src.endsWith("about:blank")) return;
  vEl("vCaja").classList.add("lista");
  try { vEl("vFrame").contentWindow.addEventListener("keydown", e => { if (e.key === "Escape") cerrarVista(); }); } catch (e) {}
});
