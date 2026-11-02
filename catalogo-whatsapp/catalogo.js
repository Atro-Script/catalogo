(function () {
  const d = window.DATOS;
  const $ = id => document.getElementById(id);
  const money = n => d.moneda + (n % 1 ? n.toFixed(2) : n);
  let cat = "Todos", q = "", carrito = [];
  document.title = d.negocio + " | Catálogo";
  document.documentElement.style.setProperty("--ac", d.colorPrincipal);
  $("negocio").textContent = d.negocio; $("eslogan").textContent = d.eslogan;

  const cats = ["Todos", ...new Set(d.productos.map(p => p.categoria).filter(Boolean))];
  cats.forEach(c => {
    const b = document.createElement("button"); b.textContent = c; b.className = c === cat ? "on" : "";
    b.onclick = () => { cat = c; [...$("cats").children].forEach(x => x.classList.toggle("on", x === b)); pintar(); };
    $("cats").append(b);
  });
  $("buscar").oninput = e => { q = e.target.value.toLowerCase(); pintar(); };

  function pintar() {
    $("lista").replaceChildren();
    const lista = d.productos.filter(p => (cat === "Todos" || p.categoria === cat) && (p.nombre + " " + (p.desc || "")).toLowerCase().includes(q));
    if (!lista.length) { const v = document.createElement("p"); v.className = "vacio"; v.textContent = "No encontramos productos con esa búsqueda."; $("lista").append(v); return; }
    lista.forEach(p => {
      const c = document.createElement("article"); c.className = "prod";
      const im = document.createElement("div"); im.className = "img";
      if (p.src) { const i = document.createElement("img"); i.src = p.src; i.alt = p.nombre; im.append(i); } else im.textContent = p.emoji || "🛍️";
      const h = document.createElement("h3"); h.textContent = p.nombre;
      const ds = document.createElement("p"); ds.className = "desc"; ds.textContent = p.desc || "";
      const pr = document.createElement("p"); pr.className = "precio"; pr.textContent = money(p.precio);
      c.append(im, h, ds);
      const sels = (p.opciones || []).map(o => {
        const l = document.createElement("label"); l.textContent = o.nombre;
        const s = document.createElement("select");
        o.valores.forEach(v => { const op = document.createElement("option"); op.textContent = v; s.append(op); });
        l.append(s); c.append(l); return { nombre: o.nombre, s };
      });
      const b = document.createElement("button"); b.className = "boton"; b.textContent = "Agregar";
      b.onclick = () => {
        const opts = sels.map(x => x.nombre + ": " + x.s.value).join(", ");
        const key = p.nombre + "|" + opts;
        const ya = carrito.find(x => x.key === key);
        if (ya) ya.qty++; else carrito.push({ key, nombre: p.nombre, opts, precio: p.precio, qty: 1 });
        b.textContent = "Agregado ✓"; setTimeout(() => { b.textContent = "Agregar"; }, 900); actualizar();
      };
      c.append(pr, b); $("lista").append(c);
    });
  }
  const total = () => carrito.reduce((s, x) => s + x.precio * x.qty, 0);
  function actualizar() {
    const n = carrito.reduce((s, x) => s + x.qty, 0);
    $("verCarrito").hidden = n === 0 || !$("panel").hidden; $("n").textContent = n; $("total").textContent = money(total());
    $("suma").textContent = money(total()); $("items").replaceChildren();
    carrito.forEach((x, i) => {
      const li = document.createElement("li");
      const t = document.createElement("span"); t.textContent = x.nombre + (x.opts ? " (" + x.opts + ")" : "") + " · " + money(x.precio * x.qty);
      const mas = document.createElement("button"); mas.textContent = "+"; mas.setAttribute("aria-label", "Agregar uno"); mas.onclick = () => { x.qty++; actualizar(); };
      const menos = document.createElement("button"); menos.textContent = "−"; menos.setAttribute("aria-label", "Quitar uno"); menos.onclick = () => { x.qty--; if (x.qty <= 0) carrito.splice(i, 1); actualizar(); if (!carrito.length) cerrar(); };
      const q2 = document.createElement("b"); q2.textContent = x.qty;
      li.append(t, menos, q2, mas); $("items").append(li);
    });
  }
  function cerrar() { $("panel").hidden = true; actualizar(); }
  $("verCarrito").onclick = () => { $("panel").hidden = false; $("verCarrito").hidden = true; };
  $("cerrar").onclick = cerrar;
  $("enviar").onclick = () => {
    if (!carrito.length) return;
    let m = "Hola, quiero hacer un pedido en " + d.negocio + ":\n" + carrito.map(x => "• " + x.qty + " x " + x.nombre + (x.opts ? " (" + x.opts + ")" : "") + " - " + money(x.precio * x.qty)).join("\n") + "\nTotal: " + money(total());
    if ($("cliente").value.trim()) m += "\nNombre: " + $("cliente").value.trim();
    if ($("notas").value.trim()) m += "\nNotas: " + $("notas").value.trim();
    window.open("https://wa.me/" + d.whatsapp + "?text=" + encodeURIComponent(m), "_blank");
  };
  pintar(); actualizar();
})();
