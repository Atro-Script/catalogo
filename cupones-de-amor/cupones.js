(function () {
  const d = window.DATOS;
  const $ = id => document.getElementById(id);
  const clave = "cupones:" + d.de + ":" + d.para;
  let usados = [];
  try { usados = JSON.parse(localStorage.getItem(clave)) || []; } catch (e) {}

  document.title = "Cupones para " + d.para;
  $("de").textContent = d.de;
  $("para").textContent = d.para;
  $("mensaje").textContent = d.mensaje;

  function guardar() { try { localStorage.setItem(clave, JSON.stringify(usados)); } catch (e) {} }

  function pintar() {
    $("lista").replaceChildren();
    d.cupones.forEach((c, i) => {
      const usado = usados.includes(i);
      const el = document.createElement("article");
      el.className = "cupon" + (usado ? " usado" : "");
      const t = document.createElement("h2"); t.textContent = c.titulo;
      const p = document.createElement("p"); p.textContent = c.detalle;
      el.append(t, p);
      if (usado) {
        const a = document.createElement("a");
        a.className = "aviso"; a.target = "_blank"; a.rel = "noopener";
        a.textContent = "Canjeado. Avisar por WhatsApp";
        a.href = "https://wa.me/" + d.whatsapp + "?text=" + encodeURIComponent("Canjeé mi cupón: " + c.titulo);
        el.append(a);
      } else {
        const b = document.createElement("button");
        b.textContent = "Canjear";
        b.onclick = () => {
          if (confirm("¿Canjear este cupón? No se puede deshacer.")) { usados.push(i); guardar(); pintar(); }
        };
        el.append(b);
      }
      $("lista").append(el);
    });
    $("restan").textContent = d.cupones.length - usados.length;
  }
  pintar();
})();
