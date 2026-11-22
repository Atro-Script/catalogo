(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  document.documentElement.style.setProperty("--c", d.colorPrincipal);
  document.title = "Una pregunta para " + d.para;
  $("pregunta-txt").textContent = d.pregunta; $("sub").textContent = d.subtitulo;
  $("si").textContent = d.textoSi; $("no").textContent = d.textoNo;
  $("finalTitulo").textContent = d.finalTitulo; $("finalMsg").textContent = d.finalMensaje; $("etiqueta").textContent = d.etiquetaContador;
  $("avisar").href = "https://wa.me/" + d.whatsapp + "?text=" + encodeURIComponent("¡Dije que sí! 💖");
  const ver = id => ["inicio", "historia", "pregunta", "final"].forEach(x => $(x).hidden = x !== id);

  // fondo: estrellas y faroles que suben
  const cv = $("cielo"), cx = cv.getContext("2d"); let W, H, es = [];
  function medir() { W = cv.width = innerWidth; H = cv.height = innerHeight; es = Array.from({ length: 90 }, () => ({ x: Math.random() * W, y: Math.random() * H * .6, r: Math.random() * 1.3 + .3, f: Math.random() * 6 })); }
  (function dib(t) { cx.clearRect(0, 0, W, H); es.forEach(s => { cx.globalAlpha = .3 + .7 * Math.abs(Math.sin(s.f + t * .0012)); cx.fillStyle = "#fff"; cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, 6.28); cx.fill(); }); if (!rm) requestAnimationFrame(dib); })(0);
  medir(); addEventListener("resize", medir);
  if (!rm) for (let i = 0; i < 9; i++) { const f = document.createElement("i"); f.className = "farol"; f.style.cssText = `--x:${Math.random() * 92}%;--s:${.7 + Math.random() * .9};--d:${16 + Math.random() * 12}s;--t:-${Math.random() * 20}s;--w:${Math.random() * 80 - 40}px`; $("faroles").append(f); }

  // historia, línea por línea
  $("empezar").onclick = () => {
    ver("historia"); let i = 0;
    (function sig() {
      if (i >= d.historia.length) return setTimeout(() => ver("pregunta"), 900);
      const p = $("linea"); p.style.animation = "none"; void p.offsetWidth; p.style.animation = ""; p.textContent = d.historia[i++];
      setTimeout(sig, rm ? 1500 : 3000);
    })();
  };

  // el «No» se escapa y el «Sí» crece
  let n = 0;
  const no = $("no"), si = $("si");
  function esquiva(e) {
    if (e) e.preventDefault();
    n++;
    if (n > d.pistas.length) { no.textContent = d.textoSi + " 💗"; no.onclick = responde; no.style.transform = "none"; no.style.opacity = 1; return; }
    $("sub").textContent = d.pistas[n - 1];
    const dx = (Math.random() - .5) * Math.min(W * .5, 200), dy = 50 + Math.random() * 60;
    no.style.transform = `translate(${dx}px,${dy}px) scale(${Math.max(.55, 1 - n * .09)})`;
    si.style.transform = `scale(${1 + n * .1})`;
  }
  no.addEventListener("pointerdown", esquiva); no.addEventListener("click", e => { if (n <= d.pistas.length) e.preventDefault(); });
  si.onclick = responde;

  function responde() {
    let ini = null; try { ini = localStorage.getItem("atro-pregunta-" + d.para); } catch (e) {}
    if (!ini) { ini = String(Date.now()); try { localStorage.setItem("atro-pregunta-" + d.para, ini); } catch (e) {} }
    const t0 = +ini; ver("final");
    $("desde").textContent = "Desde el " + new Date(t0).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
    const tick = () => { const s = Math.floor((Date.now() - t0) / 1000); $("contador").textContent = `${Math.floor(s / 86400)} d · ${Math.floor(s % 86400 / 3600)} h · ${Math.floor(s % 3600 / 60)} min · ${s % 60} s`; };
    tick(); setInterval(tick, 1000);
    if (!rm) fuegos();
  }

  // fuegos artificiales
  function fuegos() {
    const c = $("fuegos"), x = c.getContext("2d"); c.width = innerWidth; c.height = innerHeight; let ps = [], fin = Date.now() + 9000;
    const colores = [d.colorPrincipal, "#ffd36e", "#ffffff", "#ff9ec4"];
    function estalla() { const px = innerWidth * (.15 + Math.random() * .7), py = innerHeight * (.12 + Math.random() * .4), col = colores[Math.floor(Math.random() * colores.length)]; for (let i = 0; i < 46; i++) { const a = i / 46 * 6.283, v = 1.5 + Math.random() * 3.2; ps.push({ x: px, y: py, vx: Math.cos(a) * v, vy: Math.sin(a) * v, v: 1, col }); } }
    estalla(); const iv = setInterval(() => { if (Date.now() < fin) estalla(); else clearInterval(iv); }, 650);
    (function f() {
      x.globalCompositeOperation = "destination-out"; x.fillStyle = "rgba(0,0,0,.18)"; x.fillRect(0, 0, c.width, c.height); x.globalCompositeOperation = "lighter";
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .045; p.vx *= .985; p.v -= .011; x.globalAlpha = Math.max(0, p.v); x.fillStyle = p.col; x.beginPath(); x.arc(p.x, p.y, 2.2, 0, 6.283); x.fill(); });
      ps = ps.filter(p => p.v > 0); if (ps.length || Date.now() < fin) requestAnimationFrame(f); else x.clearRect(0, 0, c.width, c.height);
    })();
  }
})();
