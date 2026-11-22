(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  const prueba = location.hash === "#probar";
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const fecha = s => { const m = s.match(/(\d+)-(\d+)-(\d+)/); return m ? +m[3] + " de " + meses[m[2] - 1] + " de " + m[1] : s; };
  const abre = c => new Date(c.abre + "T00:00");
  const abierto = c => prueba || Date.now() >= abre(c).getTime();
  document.title = d.titulo; $("titulo").textContent = d.titulo; $("sub").textContent = d.subtitulo; $("para").textContent = "Para " + d.para; $("de").textContent = "Con cariño, " + d.de;
  $("progreso").textContent = d.capitulos.filter(abierto).length + " de " + d.capitulos.length + " capítulos abiertos";
  const GR = [["#E9B872", "#C97B3A"], ["#D8A0A0", "#A8545A"], ["#A8C3B0", "#4F7A62"], ["#B9B2DA", "#6A5DA8"], ["#E8D08A", "#B98B24"]];
  d.capitulos.forEach((c, i) => {
    const li = document.createElement("li"); li.className = "cap";
    const nodo = document.createElement("span"); nodo.className = "nodo"; nodo.textContent = i + 1;
    const car = document.createElement("article"); car.className = "carta";
    if (abierto(c)) {
      const fe = document.createElement("p"); fe.className = "fecha"; fe.textContent = fecha(c.fecha);
      const h = document.createElement("h2"); h.textContent = c.titulo;
      const fo = document.createElement("div"); fo.className = "foto";
      if (c.foto) { const im = document.createElement("img"); im.src = c.foto; im.alt = c.titulo; fo.append(im); }
      else { fo.style.background = "linear-gradient(135deg," + GR[i % 5].join(",") + ")"; fo.textContent = String(i + 1).padStart(2, "0"); }
      const t = document.createElement("p"); t.className = "texto"; t.textContent = c.texto;
      car.append(fe, h, fo, t);
      if (c.audio) { const a = document.createElement("audio"); a.controls = true; a.src = c.audio; a.preload = "none"; car.append(a); }
      if (c.secreto) {
        const b = document.createElement("button"); b.className = "secreto-btn"; b.textContent = "Leer lo que no dije";
        const sp = document.createElement("p"); sp.className = "secreto"; sp.hidden = true; sp.textContent = c.secreto;
        b.onclick = () => { sp.hidden = false; b.hidden = true; }; car.append(b, sp);
      }
    } else {
      car.classList.add("sellada");
      const dias = Math.ceil((abre(c).getTime() - Date.now()) / 86400000);
      const k = document.createElement("div"); k.className = "candado"; k.textContent = "🔒";
      const h = document.createElement("h2"); h.textContent = "Capítulo sellado";
      const t = document.createElement("p"); t.textContent = "Se revela el " + fecha(c.abre) + (dias > 0 ? " (faltan " + dias + (dias === 1 ? " día)" : " días)") : "");
      car.append(k, h, t);
    }
    li.append(nodo, car); $("linea").append(li);
  });
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("ver"); io.unobserve(x.target); } }), { threshold: .2 });
    document.querySelectorAll(".cap").forEach(el => { el.classList.add("rev"); io.observe(el); });
  }
})();
