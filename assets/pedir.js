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
    st.textContent = ".atro-flot{position:fixed;top:max(.6rem,env(safe-area-inset-top,0px));z-index:8;display:inline-flex;align-items:center;gap:.4rem;height:2.4rem;padding:0 .9rem;border:0;border-radius:99px;font:700 .85rem/1 'Segoe UI',system-ui,sans-serif;text-decoration:none;color:#fff;background:rgba(8,8,10,.72);backdrop-filter:blur(8px);box-shadow:0 4px 14px rgba(0,0,0,.35);opacity:.92}.atro-flot:hover{opacity:1}.atro-flot.izq{left:.6rem}.atro-flot.der{right:.6rem;background:#F12D43}.atro-flot svg{width:1.1rem;height:1.1rem}.atro-flot:focus-visible{outline:3px solid #fff;outline-offset:2px}";
    document.head.append(st);
    const volver = document.createElement("a"); volver.className = "atro-flot izq"; volver.href = "../index.html"; volver.textContent = "‹ Catálogo";
    const pedir = document.createElement("a"); pedir.className = "atro-flot der"; pedir.target = "_blank"; pedir.rel = "noopener";
    pedir.href = "https://wa.me/" + numero + "?text=" + encodeURIComponent("Hola, vi la demo de «" + nombre + "» en el catálogo de AtroScript y me gustaría pedir uno personalizado.");
    pedir.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.5A10 10 0 1 0 12.04 2zm0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-3.1.9.9-3-.2-.3A8.2 8.2 0 0 1 12.04 3.8zM8.9 7.5c-.2 0-.5.1-.7.3-.3.3-.9 1-.9 2.3 0 1.3 1 2.6 1.1 2.8.1.2 1.9 3 4.7 4.1 2.3.9 2.8.7 3.3.7.5 0 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3l-2.1-1c-.3-.1-.5-.2-.7.1l-.9 1.2c-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.3c-.2-.6-.5-.5-.7-.5z"/></svg>Lo quiero';
    document.body.append(volver, pedir);
  }
  cargar("../js/productos.js", () => { if (typeof ATRO_WHATSAPP === "undefined") cargar("../assets/config.js", construir); else construir(); });
})();
