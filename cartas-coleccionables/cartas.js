(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  const RZ = { "común": { k: "comun", p: 6, c: "#C9D3EA" }, "rara": { k: "rara", p: 3, c: "#5BB6FF" }, "épica": { k: "epica", p: 1.6, c: "#D07BFF" }, "legendaria": { k: "legendaria", p: .8, c: "#FFD23F" } };
  const clave = "cartas2:" + d.titulo, N = d.cartas.length, SEC = d.secreta ? N : -1;
  const todas = d.cartas.concat(d.secreta ? [d.secreta] : []);
  let est = { tengo: [], vict: 0 };
  try { const g = JSON.parse(localStorage.getItem(clave)); if (g && Array.isArray(g.tengo)) est = g; } catch (e) {}
  const guardar = () => { try { localStorage.setItem(clave, JSON.stringify(est)); } catch (e) {} };
  const mias = () => est.tengo.slice();
  const rnd = n => Math.floor(Math.random() * n);
  const barajar = a => { a = a.slice(); for (let k = a.length - 1; k > 0; k--) { const j = rnd(k + 1); [a[k], a[j]] = [a[j], a[k]]; } return a; };
  document.title = d.titulo; $("titulo").textContent = d.titulo; $("sub").textContent = d.subtitulo; $("nombreSobre").textContent = d.titulo;

  /* ---------- carta ---------- */
  function carta(c, bloq) {
    const r = RZ[c.rareza] || RZ["común"], el = document.createElement("div");
    if (bloq) { el.className = "carta bloq r-" + r.k; el.innerHTML = '<div class="marco"><span>?</span></div>'; return el; }
    el.className = "carta r-" + r.k;
    el.innerHTML = '<div class="marco"><div class="cab2"><b></b><span class="gema"></span></div><div class="arte"><i class="rayos"></i><span class="fig"></span></div><p class="frase"></p><ul class="at"></ul></div><div class="foil"></div><div class="glare"></div>';
    el.querySelector("b").textContent = c.nombre; el.querySelector(".gema").textContent = c.rareza; el.querySelector(".frase").textContent = c.frase;
    const f = el.querySelector(".fig");
    if (c.src) { const im = document.createElement("img"); im.src = c.src; im.alt = c.nombre; f.append(im); } else f.textContent = c.emoji || "⭐";
    const ul = el.querySelector(".at");
    d.atributos.forEach((n, i) => { const v = c.valores[i], li = document.createElement("li"); li.dataset.i = i; li.innerHTML = "<span></span><i><s></s></i><em></em>"; li.children[0].textContent = n; li.children[1].firstChild.style.width = v + "%"; li.children[2].textContent = v; li.children[2].style.fontStyle = "normal"; ul.append(li); });
    return el;
  }
  const slot = (c, bloq, cls) => { const s = document.createElement("div"); s.className = "slot" + (cls ? " " + cls : ""); s.append(carta(c, bloq)); return s; };
  function inclinar(el) {
    const c = el.querySelector(".carta") || el;
    el.addEventListener("pointermove", e => { const b = el.getBoundingClientRect(), x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height; c.style.transform = "perspective(700px) rotateY(" + ((x - .5) * 26) + "deg) rotateX(" + ((.5 - y) * 26) + "deg) scale(1.03)"; c.style.setProperty("--mx", (x * 100) + "%"); c.style.setProperty("--my", (y * 100) + "%"); c.classList.add("tilt"); });
    el.addEventListener("pointerleave", () => { c.style.transform = ""; c.classList.remove("tilt"); });
  }
  function chispas(x, y, color, n, fuerte) {
    for (let k = 0; k < n; k++) { const s = document.createElement("i"), a = Math.random() * 6.283, r = 50 + Math.random() * (fuerte ? 190 : 120); s.className = "chispa"; s.style.left = x + "px"; s.style.top = y + "px"; s.style.background = k % 3 ? color : "#fff"; s.style.setProperty("--dx", Math.cos(a) * r + "px"); s.style.setProperty("--dy", Math.sin(a) * r + "px"); document.body.append(s); setTimeout(() => s.remove(), 1000); }
    if (fuerte) { const f = document.createElement("div"); f.className = "destello"; document.body.append(f); setTimeout(() => f.remove(), 950); }
  }

  /* ---------- navegación ---------- */
  function ver(id) {
    ["inicio", "apertura", "coleccion", "duelo"].forEach(x => { $(x).hidden = x !== id; });
    document.querySelectorAll(".tabs button").forEach(b => b.classList.toggle("on", b.dataset.v === id || (id === "apertura" && b.dataset.v === "inicio")));
    if (id === "inicio") pintarInicio(); if (id === "coleccion") pintarColeccion(); if (id === "duelo") pintarDuelo();
    window.scrollTo(0, 0);
  }
  document.querySelectorAll(".tabs button").forEach(b => b.onclick = () => ver(b.dataset.v));

  /* ---------- inicio y sobres ---------- */
  function pintarInicio() {
    const t = est.tengo.filter(i => i < N).length, faltan = N - t;
    $("progreso").textContent = t + " de " + N + " cartas";
    $("barra").style.width = (t / N * 100) + "%";
    $("quedan").textContent = faltan ? "Sobres por abrir: " + Math.ceil(faltan / d.porSobre) : "¡Colección completa!";
    $("vict").textContent = d.secreta ? (est.tengo.includes(SEC) ? "Carta secreta desbloqueada ✦" : "Gana " + d.victoriasSecreta + " duelos para la carta secreta (" + Math.min(est.vict, d.victoriasSecreta) + "/" + d.victoriasSecreta + ")") : "";
    $("sobre").disabled = !faltan; $("sobre").classList.remove("rasga");
  }
  function sacar() {
    const faltan = d.cartas.map((c, i) => i).filter(i => !est.tengo.includes(i)); if (!faltan.length) return [];
    const res = []; let pool = faltan.slice();
    while (res.length < d.porSobre && pool.length) {
      const tot = pool.reduce((s, i) => s + (RZ[d.cartas[i].rareza] || RZ["común"]).p, 0); let x = Math.random() * tot, e = pool[0];
      for (const i of pool) { x -= (RZ[d.cartas[i].rareza] || RZ["común"]).p; if (x <= 0) { e = i; break; } }
      res.push(e); pool = pool.filter(i => i !== e);
    }
    return res;
  }
  let cola = [], pos = 0;
  $("sobre").onclick = () => {
    cola = sacar(); if (!cola.length) return; pos = 0;
    $("sobre").classList.add("rasga"); const b = $("sobre").getBoundingClientRect(); chispas(b.left + b.width / 2, b.top + 20, "#FFE68A", 14);
    setTimeout(() => { ver("apertura"); $("mano").replaceChildren(); $("finales").hidden = true; siguiente(); }, 650);
  };
  function siguiente() {
    $("mazo").replaceChildren(); $("cuenta").textContent = "Carta " + (pos + 1) + " de " + cola.length;
    const c = d.cartas[cola[pos]], v = document.createElement("div"); v.className = "vuelta entra";
    const dorso = document.createElement("div"); dorso.className = "dorso"; dorso.innerHTML = "<div>★</div>";
    const cara = document.createElement("div"); cara.className = "cara"; cara.append(carta(c));
    v.append(dorso, cara); $("mazo").append(v); $("aviso").textContent = "Toca la carta para voltearla";
    let volteada = false;
    $("mazo").onclick = () => {
      if (!volteada) {
        volteada = true; v.classList.add("flip"); est.tengo.push(cola[pos]); guardar();
        setTimeout(() => { const b = v.getBoundingClientRect(), r = RZ[c.rareza] || RZ["común"]; chispas(b.left + b.width / 2, b.top + b.height / 2, r.c, r.k === "comun" ? 8 : r.k === "rara" ? 16 : 26, r.k === "legendaria"); inclinar(cara); }, 420);
        $("aviso").textContent = c.rareza === "legendaria" ? "¡LEGENDARIA! ✦" : c.rareza === "épica" ? "¡Carta épica!" : c.rareza === "rara" ? "¡Una rara!" : "Nueva carta";
      } else {
        v.classList.add("sale"); const mini = slot(c); $("mano").append(mini); pos++;
        setTimeout(() => { if (pos < cola.length) siguiente(); else { $("mazo").replaceChildren(); $("mazo").onclick = null; $("cuenta").textContent = "¡Sobre completo!"; $("aviso").textContent = "Mira lo que conseguiste"; $("finales").hidden = false; $("otro").disabled = est.tengo.filter(i => i < N).length >= N; } }, 450);
      }
    };
  }
  $("otro").onclick = () => { ver("inicio"); $("sobre").click(); }; $("aCol").onclick = () => ver("coleccion");

  /* ---------- colección ---------- */
  function pintarColeccion() {
    const r = $("rejilla"); r.replaceChildren();
    todas.forEach((c, i) => {
      if (i === SEC && !est.tengo.includes(i)) return;
      const tiene = est.tengo.includes(i), s = slot(c, !tiene); r.append(s);
      if (tiene) s.onclick = () => abrirVisor(c);
    });
  }
  function abrirVisor(c) { $("visorSlot").replaceChildren(carta(c)); $("visor").hidden = false; inclinar($("visorSlot")); }
  $("visor").onclick = e => { if (!e.target.closest("#visorSlot")) $("visor").hidden = true; };

  /* ---------- duelo ---------- */
  let D = null;
  function pintarDuelo() {
    $("dJuego").hidden = true; $("dFin").hidden = true; $("dInicio").hidden = false;
    const n = mias().filter(i => i < N).length;
    $("dTxt").textContent = n < 3 ? "Necesitas al menos 3 cartas para retar. Te faltan " + (3 - n) + "; abre un sobre." : "Elige una carta y un atributo. Si el valor es mayor que el de la carta rival, ganas la ronda. Gana 2 de 3.";
    $("dGo").disabled = n < 3;
  }
  $("dGo").onclick = $("dOtra").onclick = () => {
    const mi = barajar(mias().filter(i => i < N)).slice(0, 3), ri = barajar(d.cartas.map((c, i) => i)).slice(0, 3);
    D = { mi, ri, ronda: 0, tu: 0, ri_p: 0, sel: -1, ocupado: false };
    $("dInicio").hidden = true; $("dFin").hidden = true; $("dJuego").hidden = false; ronda();
  };
  function ronda() {
    $("pTu").textContent = D.tu; $("pRi").textContent = D.ri_p; $("dRonda").textContent = "Ronda " + (D.ronda + 1) + " de 3";
    $("rivalSlot").replaceChildren(); const dz = document.createElement("div"); dz.className = "dorso"; dz.innerHTML = "<div>?</div>"; $("rivalSlot").append(dz);
    $("dMsg").textContent = "Elige una de tus cartas"; D.sel = -1; D.ocupado = false;
    const dm = $("dMano"); dm.replaceChildren();
    D.mi.forEach((id, k) => { const s = slot(d.cartas[id]); if (D.usadas && D.usadas.includes(k)) s.classList.add("usada"); s.onclick = () => { if (D.ocupado) return; D.sel = k; [...dm.children].forEach((x, j) => x.classList.toggle("sel", j === k)); $("dMsg").textContent = "Ahora elige un atributo"; pintaAtr(); }; dm.append(s); });
    pintaAtr();
  }
  function pintaAtr() {
    const a = $("atrib"); a.replaceChildren();
    d.atributos.forEach((n, i) => { const b = document.createElement("button"); b.textContent = n + (D.sel >= 0 ? " " + d.cartas[D.mi[D.sel]].valores[i] : ""); b.disabled = D.sel < 0 || D.ocupado; b.onclick = () => jugar(i); a.append(b); });
  }
  function jugar(i) {
    D.ocupado = true; pintaAtr(); const mio = d.cartas[D.mi[D.sel]], rival = d.cartas[D.ri[D.ronda]];
    $("rivalSlot").replaceChildren(carta(rival)); const li = $("rivalSlot").querySelector('li[data-i="' + i + '"]'); if (li) li.classList.add("sel");
    const a = mio.valores[i], b = rival.valores[i]; let msg;
    if (a > b) { D.tu++; msg = d.atributos[i] + ": " + a + " contra " + b + ". ¡Ganas la ronda!"; } else if (a < b) { D.ri_p++; msg = d.atributos[i] + ": " + a + " contra " + b + ". El rival gana la ronda."; } else msg = d.atributos[i] + ": " + a + " y " + b + ". ¡Empate!";
    $("dMsg").textContent = msg; $("pTu").textContent = D.tu; $("pRi").textContent = D.ri_p;
    (D.usadas = D.usadas || []).push(D.sel); [...$("dMano").children].forEach((x, j) => { x.classList.remove("sel"); if (D.usadas.includes(j)) x.classList.add("usada"); });
    if (a > b) { const r = $("rivalSlot").getBoundingClientRect(); chispas(r.left + r.width / 2, r.top + r.height / 2, "#FFD23F", 18); }
    setTimeout(() => { D.ronda++; if (D.ronda < 3) { D.ocupado = false; ronda(); } else fin(); }, 2300);
  }
  function fin() {
    D.usadas = null; $("dJuego").hidden = true; $("dFin").hidden = false; let extra = "";
    if (D.tu > D.ri_p) {
      est.vict++; $("dRes").textContent = "¡Ganaste el duelo!";
      if (d.secreta && !est.tengo.includes(SEC) && est.vict >= d.victoriasSecreta) { est.tengo.push(SEC); extra = " ¡Desbloqueaste la carta secreta! Búscala en tu colección."; chispas(innerWidth / 2, innerHeight / 2, "#FFD23F", 40, true); }
    } else $("dRes").textContent = D.tu < D.ri_p ? "Perdiste esta vez" : "¡Empate!";
    $("dRes2").textContent = "Marcador final " + D.tu + " a " + D.ri_p + "." + extra; guardar();
  }
  window.CartasColeccionables = { abrirSobre: () => $("sobre").click(), estado: () => est };
  ver("inicio");
})();
