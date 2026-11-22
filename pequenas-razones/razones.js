(function () {
  const d = window.DATOS;
  const $ = id => document.getElementById(id);
  const COL = ["#FFD6E0", "#FFF1B8", "#CDEBFF", "#D7F5DD", "#EAD7FF"];
  const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const pool = d.razones.map((r, i) => i);
  for (let k = pool.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [pool[k], pool[j]] = [pool[j], pool[k]]; }
  let sacadas = 0, ocupado = false;
  document.title = d.titulo;
  $("para").textContent = "Para " + d.para;
  $("titulo").textContent = d.titulo;
  $("de").textContent = "Con cariño, " + d.de;
  for (let i = 0; i < Math.min(26, d.razones.length * 2 + 6); i++) {
    const n = document.createElement("i");
    n.style.left = (4 + Math.random() * 68) + "%"; n.style.bottom = (Math.random() * 66) + "%";
    n.style.background = COL[i % COL.length]; n.style.transform = "rotate(" + (Math.random() * 100 - 50) + "deg)";
    n.style.animationDelay = "-" + (Math.random() * 5) + "s"; n.style.animationDuration = (3 + Math.random() * 4) + "s";
    $("notas").append(n);
  }
  for (let i = 0; i < 9; i++) {
    const b = document.createElement("b");
    b.style.left = (8 + Math.random() * 80) + "%"; b.style.top = (14 + Math.random() * 74) + "%";
    b.style.setProperty("--x", (Math.random() * 34 - 17) + "px"); b.style.setProperty("--y", (Math.random() * -36) + "px");
    b.style.setProperty("--d", (2.5 + Math.random() * 3.5) + "s"); b.style.animationDelay = "-" + (Math.random() * 4) + "s";
    $("luces").append(b);
  }
  d.razones.forEach(() => $("meter").append(document.createElement("i")));
  const contar = () => { $("cuenta").textContent = sacadas + " de " + d.razones.length + " razones"; [...$("meter").children].forEach((h, k) => h.classList.toggle("on", k < sacadas)); };

  function corazones(x, y, n) {
    if (rm) return;
    for (let i = 0; i < n; i++) {
      const h = document.createElement("span"); h.className = "pop"; h.style.left = x + "px"; h.style.top = y + "px";
      document.body.append(h);
      const a = Math.random() * Math.PI * 2, r = 50 + Math.random() * 110;
      h.animate([{ transform: "translate(0,0) scale(.3)", opacity: 1 }, { transform: "translate(" + Math.cos(a) * r + "px," + (Math.sin(a) * r - 40) + "px) scale(" + (.8 + Math.random()) + ") rotate(" + (Math.random() * 90 - 45) + "deg)", opacity: 0 }], { duration: 900 + Math.random() * 600, easing: "cubic-bezier(.2,.8,.3,1)" }).onfinish = () => h.remove();
    }
  }
  function mostrar(idx) {
    const p = $("papel"), t = $("papelTxt"), color = COL[idx % COL.length];
    p.classList.remove("sale"); void p.offsetWidth; p.classList.add("sale");
    p.style.background = color; t.textContent = "";
    const num = document.createElement("b"); num.textContent = "Razón #" + sacadas; t.append(num);
    d.razones[idx].split(" ").forEach((w, i) => { const s = document.createElement("span"); s.className = "pal"; s.textContent = w; s.style.animationDelay = (.35 + i * .09) + "s"; t.append(s); });
    const li = document.createElement("li"); li.textContent = d.razones[idx]; $("vistas").append(li); $("lista").hidden = false;
    contar();
    const r = p.getBoundingClientRect(); corazones(r.left + r.width / 2, r.top + r.height / 2, 10);
    if (sacadas === d.razones.length) {
      $("sacar").hidden = true; $("final").hidden = false; $("final").textContent = d.final;
      setTimeout(() => { for (let k = 0; k < 6; k++) setTimeout(() => corazones(innerWidth * (.15 + Math.random() * .7), innerHeight * (.25 + Math.random() * .4), 14), k * 260); if (navigator.vibrate && !rm) try { navigator.vibrate([30, 60, 30, 60, 60]); } catch (e) {} }, 700);
    } else $("sacar").textContent = "Sacar otra razón";
    ocupado = false;
  }
  function sacar() {
    if (sacadas >= d.razones.length || ocupado) return;
    ocupado = true; const idx = pool[sacadas++], f = $("frasco");
    if (rm) { mostrar(idx); return; }
    f.classList.remove("sacude"); void f.offsetWidth; f.classList.add("sacude");
    setTimeout(() => {
      const a = f.getBoundingClientRect(), b = $("papel").getBoundingClientRect(), v = document.createElement("div");
      v.className = "vuela"; v.style.background = COL[idx % COL.length]; v.style.left = (a.left + a.width / 2 - 19) + "px"; v.style.top = (a.top + a.height * .35) + "px"; document.body.append(v);
      const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height * .35);
      v.animate([{ transform: "translate(0,0) rotate(0) scale(1)" }, { transform: "translate(" + dx * .3 + "px," + (-90) + "px) rotate(200deg) scale(1.6)", offset: .45 }, { transform: "translate(" + dx + "px," + dy + "px) rotate(360deg) scale(3)", opacity: .2 }], { duration: 700, easing: "ease-in-out" }).onfinish = () => { v.remove(); mostrar(idx); };
    }, 480);
  }
  $("sacar").onclick = sacar; $("frasco").onclick = sacar;
  contar();
})();
