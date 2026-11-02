(function () {
  const d = window.DATOS;
  const $ = id => document.getElementById(id);
  const cant = {};
  const money = n => d.moneda + (n % 1 ? n.toFixed(2) : n);

  document.title = d.negocio + " | Menú";
  $("negocio").textContent = d.negocio;
  $("eslogan").textContent = d.eslogan;

  function boton(txt, etiqueta, fn) {
    const b = document.createElement("button");
    b.textContent = txt; b.setAttribute("aria-label", etiqueta); b.onclick = fn;
    return b;
  }
  function lineas() {
    const L = []; let total = 0, n = 0;
    d.categorias.forEach((c, ci) => c.items.forEach((it, ii) => {
      const q = cant[ci + "-" + ii] || 0;
      if (q) { L.push(q + " x " + it.nombre + " (" + money(it.precio * q) + ")"); total += it.precio * q; n += q; }
    }));
    return { L, total, n };
  }
  function resumen() {
    const r = lineas();
    $("barra").hidden = r.n === 0;
    $("resumen").textContent = r.n + (r.n === 1 ? " producto: " : " productos: ") + money(r.total);
  }
  function cambia(k, delta) {
    cant[k] = Math.max(0, (cant[k] || 0) + delta);
    $("n" + k).textContent = cant[k];
    resumen();
  }

  d.categorias.forEach((c, ci) => {
    const a = document.createElement("a");
    a.href = "#cat" + ci; a.textContent = c.nombre;
    $("tabs").append(a);
    const s = document.createElement("section");
    s.id = "cat" + ci;
    const h = document.createElement("h2"); h.textContent = c.nombre;
    s.append(h);
    c.items.forEach((it, ii) => {
      const k = ci + "-" + ii;
      const fila = document.createElement("div"); fila.className = "item";
      const info = document.createElement("div"); info.className = "info";
      const linea = document.createElement("div"); linea.className = "linea";
      const n = document.createElement("span"); n.textContent = it.nombre;
      const p = document.createElement("span"); p.className = "precio"; p.textContent = money(it.precio);
      linea.append(n, p); info.append(linea);
      if (it.desc) { const ds = document.createElement("p"); ds.textContent = it.desc; info.append(ds); }
      const ctl = document.createElement("div"); ctl.className = "ctl";
      const num = document.createElement("output"); num.id = "n" + k; num.textContent = "0";
      ctl.append(boton("−", "Quitar " + it.nombre, () => cambia(k, -1)), num, boton("+", "Agregar " + it.nombre, () => cambia(k, 1)));
      fila.append(info, ctl); s.append(fila);
    });
    $("menu").append(s);
  });

  $("pedir").onclick = () => {
    const r = lineas();
    if (!r.n) return;
    const msg = "Hola, quiero hacer un pedido en " + d.negocio + ":\n" + r.L.join("\n") + "\nTotal: " + money(r.total);
    window.open("https://wa.me/" + d.whatsapp + "?text=" + encodeURIComponent(msg), "_blank");
  };
})();
