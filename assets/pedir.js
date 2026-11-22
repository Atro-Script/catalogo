// Botones flotantes de las demos: volver al catálogo y pedir este diseño por WhatsApp.
// Para entregar un producto a un cliente, quita la línea <script src="../assets/pedir.js"> del index.html.
(function () {
  const partes = location.pathname.split("/").filter(Boolean);
  const slug = /\.html?$/.test(partes[partes.length - 1] || "") ? partes[partes.length - 2] : partes[partes.length - 1];
  function cargar(src, listo) { const s = document.createElement("script"); s.src = src; s.onload = listo; s.onerror = listo; document.head.append(s); }
  function construir() {
    const numero = typeof ATRO_WHATSAPP !== "undefined" ? ATRO_WHATSAPP : "526568537764";
    let nombre = document.title;
    if (typeof PRODUCTOS !== "undefined") { const p = PRODUCTOS.find(x => x[1] === slug); if (p) nombre = p[2]; }
    const st = document.createElement("style");
    st.textContent = ".atro-flot{position:fixed;top:max(.6rem,env(safe-area-inset-top,0px));z-index:8;display:inline-flex;align-items:center;gap:.4rem;height:2.4rem;padding:0 .9rem;border:1px solid rgba(255,255,255,.16);border-radius:99px;font:700 .85rem/1 'Segoe UI',system-ui,sans-serif;text-decoration:none;color:#fff;background:rgba(10,10,14,.38);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);opacity:.7;transition:opacity .25s,background .25s,transform .25s}.atro-flot:hover,.atro-flot:focus-visible{opacity:1;background:rgba(10,10,14,.7)}.atro-flot:active{transform:scale(.94)}.atro-flot.izq{left:.6rem}.atro-flot.der{right:.6rem}.atro-flot svg{width:1.1rem;height:1.1rem}.atro-flot:focus-visible{outline:3px solid #fff;outline-offset:2px}@media(max-width:600px){.atro-flot{width:2.4rem;padding:0;justify-content:center;gap:0;font-size:0}.atro-flot.izq::before{content:'\\2039';font-size:1.7rem;line-height:1;margin-top:-.15rem}.atro-flot svg{width:1.2rem;height:1.2rem}}";
    document.head.append(st);
    if (window.self !== window.top) document.documentElement.dataset.atroFrame = "1";
    // Productos con dos modos (data-modos="index.html:Cápsula|capitulos.html:Capítulos"): interruptor solo en demos.
    const ms = (document.body.dataset.modos || "").split("|").filter(Boolean).map(x => { const i = x.indexOf(":"); return [x.slice(0, i), x.slice(i + 1)]; });
    if (ms.length > 1) {
      const actual = (partes[partes.length - 1] || "").endsWith(".html") ? partes[partes.length - 1] : "index.html";
      const st2 = document.createElement("style");
      st2.textContent = ".atro-modos{position:fixed;top:max(.6rem,env(safe-area-inset-top,0px));left:50%;transform:translateX(-50%);z-index:9;display:flex;gap:2px;padding:3px;border-radius:99px;background:rgba(8,8,10,.78);backdrop-filter:blur(8px);box-shadow:0 4px 14px rgba(0,0,0,.35)}.atro-modos a{display:block;padding:.5rem .8rem;border-radius:99px;font:700 .8rem/1 'Segoe UI',system-ui,sans-serif;color:#ffffffb8;text-decoration:none;white-space:nowrap}.atro-modos a[aria-current]{background:#F12D43;color:#fff}.atro-modos a:focus-visible{outline:3px solid #fff;outline-offset:1px}body:has(.atro-modos){padding-top:max(2.9rem,env(safe-area-inset-top,0px));box-sizing:border-box}";
      document.head.append(st2);
      const nav = document.createElement("nav"); nav.className = "atro-modos"; nav.setAttribute("aria-label", "Modo del producto");
      ms.forEach(([href, txt]) => { const a = document.createElement("a"); a.href = href; a.textContent = txt; if (href === actual) a.setAttribute("aria-current", "page"); nav.append(a); });
      document.body.append(nav);
    }
    // Dentro de la vista previa del catálogo, el propio catálogo ya ofrece volver y pedir.
    if (window.self !== window.top) { if (!window.ATRO_PANEL && slug !== "cotizador-reposteria") cargar("../assets/estilo-demo.js", function () {}); return; }
    if (!window.ATRO_PANEL && slug !== "cotizador-reposteria") cargar("../assets/estilo-demo.js", function () {});
    const volver = document.createElement("a"); volver.className = "atro-flot izq"; volver.href = "../index.html"; volver.textContent = "‹ Catálogo"; volver.setAttribute("aria-label", "Volver al catálogo");
    const pedir = document.createElement("a"); pedir.className = "atro-flot der"; pedir.target = "_blank"; pedir.rel = "noopener"; pedir.setAttribute("aria-label", "Pedir este diseño por WhatsApp");
    pedir.href = "https://wa.me/" + numero + "?text=" + encodeURIComponent("Hola, vi la demo de «" + nombre + "» en el catálogo de AtroScript y me gustaría pedir uno personalizado.");
    pedir.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.5A10 10 0 1 0 12.04 2zm0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-3.1.9.9-3-.2-.3A8.2 8.2 0 0 1 12.04 3.8zM8.9 7.5c-.2 0-.5.1-.7.3-.3.3-.9 1-.9 2.3 0 1.3 1 2.6 1.1 2.8.1.2 1.9 3 4.7 4.1 2.3.9 2.8.7 3.3.7.5 0 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3l-2.1-1c-.3-.1-.5-.2-.7.1l-.9 1.2c-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.3c-.2-.6-.5-.5-.7-.5z"/></svg>Lo quiero';
    document.body.append(volver, pedir);

    // Barra de venta: aparece tras unos segundos de probar la demo.
    const barra = document.createElement("div"); barra.className = "atro-venta"; barra.hidden = true;
    const txt = document.createElement("p"); const b = document.createElement("b"); b.textContent = nombre; txt.append(b, " con tus nombres, fotos y colores · desde $" + (typeof precioDe === "function" ? precioDe(slug) : 50) + " MXN");
    const ir = document.createElement("a"); ir.className = "atro-venta-ir"; ir.target = "_blank"; ir.rel = "noopener"; ir.href = pedir.href; ir.textContent = "Lo quiero";
    const x = document.createElement("button"); x.type = "button"; x.setAttribute("aria-label", "Cerrar"); x.textContent = "×"; x.onclick = () => { barra.hidden = true; };
    barra.append(txt, ir, x); document.body.append(barra);
    const st2 = document.createElement("style");
    st2.textContent = ".atro-venta{position:fixed;left:.6rem;right:.6rem;bottom:max(.6rem,env(safe-area-inset-bottom,0px));z-index:8;display:flex;align-items:center;gap:.6rem;padding:.55rem .6rem .55rem 1rem;border-radius:99px;font:600 .82rem/1.25 'Segoe UI',system-ui,sans-serif;color:#fff;background:rgba(8,8,10,.86);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.14);box-shadow:0 8px 24px rgba(0,0,0,.45);animation:atroVenta .4s ease-out}.atro-venta[hidden]{display:none}.atro-venta p{margin:0;flex:1;min-width:0;color:#cfd3da}.atro-venta b{color:#fff}.atro-venta-ir{flex:none;padding:.6rem 1rem;border-radius:99px;background:#F12D43;color:#fff;font-weight:800;text-decoration:none}.atro-venta button{flex:none;width:2rem;height:2rem;border:0;border-radius:50%;background:#1c1e24;color:#fff;font-size:1.2rem;cursor:pointer}@keyframes atroVenta{from{transform:translateY(120%);opacity:0}}@media (prefers-reduced-motion:reduce){.atro-venta{animation:none}}";
    document.head.append(st2);
    let visto = false; const mostrar = () => { if (visto) return; visto = true; setTimeout(() => { barra.hidden = false; }, 9000); };
    addEventListener("pointerdown", mostrar, { once: true, passive: true });
  }
  cargar("../js/productos.js", () => { if (typeof ATRO_WHATSAPP === "undefined") cargar("../assets/config.js", construir); else construir(); });
})();
