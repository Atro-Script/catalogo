(function () {
  const $ = id => document.getElementById(id);
  const TEMAS = {
    fiesta: { n: "Fiesta", bg: ["#FFD23F", "#FF8A3D"], ac: "#FF3C7E", tx: "#1B1B3A", deco: "confeti" },
    elegante: { n: "Elegante", bg: ["#0F1E3D", "#1B3A6B"], ac: "#E3B84B", tx: "#F5EFD9", deco: "marco" },
    romantica: { n: "Romántica", bg: ["#FFE0E9", "#F7B8D0"], ac: "#B03A63", tx: "#5A1F3D", deco: "corazones" },
    infantil: { n: "Infantil", bg: ["#BFE6FF", "#FFF8E1"], ac: "#E8453C", tx: "#2B3A55", deco: "globos" },
    gala: { n: "Gala", bg: ["#0A0A0A", "#232323"], ac: "#D9C08A", tx: "#F3EBD8", deco: "rayos" },
    playa: { n: "Playa", bg: ["#9BE7FF", "#FFE9B3"], ac: "#FF7A59", tx: "#0B4F6C", deco: "olas" }
  };
  const FUENTES = { serif: 'Georgia, "Times New Roman", serif', script: '"Segoe Script","Brush Script MT","Lucida Handwriting",cursive', sans: '"Segoe UI",Arial,sans-serif', fuerte: '"Arial Black","Trebuchet MS",sans-serif' };
  const cv = $("lienzo"), ctx = cv.getContext("2d"), W = 1080;
  const PERMITE = (window.DATOS || {}).descargas === true;
  if (PERMITE) { $("bajar").hidden = false; $("compartir").hidden = false; $("pedir").hidden = true; $("notaVista").hidden = true; }
  let tema = "fiesta";

  Object.keys(TEMAS).forEach(k => {
    const b = document.createElement("button"); b.type = "button"; b.className = "chip"; b.textContent = TEMAS[k].n;
    b.style.setProperty("--a", TEMAS[k].bg[0]); b.style.setProperty("--b", TEMAS[k].ac);
    b.onclick = () => elegir(k); b.dataset.k = k; $("temas").append(b);
  });
  function elegir(k) {
    tema = k; $("c1").value = TEMAS[k].bg[0]; $("c2").value = TEMAS[k].ac;
    [...$("temas").children].forEach(b => b.classList.toggle("on", b.dataset.k === k)); dibujar();
  }
  const rnd = s => () => (s = (s * 16807) % 2147483647) / 2147483647;
  function corazon(x, y, s) { ctx.beginPath(); ctx.moveTo(x, y + s * .3); ctx.bezierCurveTo(x, y - s * .2, x - s * .6, y - s * .2, x - s * .6, y + s * .25); ctx.bezierCurveTo(x - s * .6, y + s * .6, x, y + s * .8, x, y + s); ctx.bezierCurveTo(x, y + s * .8, x + s * .6, y + s * .6, x + s * .6, y + s * .25); ctx.bezierCurveTo(x + s * .6, y - s * .2, x, y - s * .2, x, y + s * .3); ctx.fill(); }
  function decorar(t, H, c1, c2) {
    const r = rnd(11); ctx.save(); ctx.fillStyle = c2; ctx.strokeStyle = c2;
    if (t.deco === "confeti") { const col = [c2, "#4ADEFF", "#7A4DFF", "#4CD964", "#fff"]; for (let i = 0; i < 70; i++) { ctx.fillStyle = col[i % 5]; ctx.save(); ctx.translate(r() * W, r() * H); ctx.rotate(r() * 6); ctx.fillRect(0, 0, 14 + r() * 16, 8 + r() * 8); ctx.restore(); } }
    if (t.deco === "marco") { ctx.lineWidth = 6; ctx.strokeRect(50, 50, W - 100, H - 100); ctx.lineWidth = 2; ctx.strokeRect(74, 74, W - 148, H - 148); }
    if (t.deco === "corazones") { ctx.globalAlpha = .35; for (let i = 0; i < 26; i++) corazon(r() * W, r() * H, 30 + r() * 60); }
    if (t.deco === "globos") { const col = [c2, "#2E86DE", "#FFD23F", "#5BD66A"]; for (let i = 0; i < 9; i++) { const x = r() * W, y = r() * H * .35 + 40; ctx.fillStyle = col[i % 4]; ctx.beginPath(); ctx.ellipse(x, y, 46, 58, 0, 0, 7); ctx.fill(); ctx.strokeStyle = "rgba(0,0,0,.25)"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y + 58); ctx.quadraticCurveTo(x + 14, y + 110, x, y + 170); ctx.stroke(); } }
    if (t.deco === "rayos") { ctx.globalAlpha = .13; for (let i = 0; i < 18; i++) { const a = -Math.PI + i / 17 * Math.PI; ctx.beginPath(); ctx.moveTo(W / 2, H); ctx.arc(W / 2, H, H * 1.1, a - .05, a + .05); ctx.fill(); } ctx.globalAlpha = 1; ctx.lineWidth = 3; ctx.strokeRect(46, 46, W - 92, H - 92); }
    if (t.deco === "olas") { ctx.globalAlpha = .55; for (let k = 0; k < 4; k++) { ctx.fillStyle = k % 2 ? c2 : "#4FC3F7"; ctx.beginPath(); ctx.moveTo(0, H); for (let x = 0; x <= W; x += 20) ctx.lineTo(x, H - 80 - k * 34 + Math.sin(x / 70 + k) * 18); ctx.lineTo(W, H); ctx.fill(); } }
    ctx.restore();
  }
  function ajustar(txt, maxW, tam, fam, peso) { do { ctx.font = peso + " " + tam + "px " + fam; tam -= 4; } while (ctx.measureText(txt).width > maxW && tam > 28); return tam + 4; }
  function parrafo(txt, x, y, maxW, lh) {
    const pal = txt.split(/\s+/); let l = "";
    pal.forEach(p => { const t = l ? l + " " + p : p; if (ctx.measureText(t).width > maxW && l) { ctx.fillText(l, x, y); y += lh; l = p; } else l = t; });
    if (l) ctx.fillText(l, x, y); return y;
  }
  function dibujar() {
    const t = TEMAS[tema], H = +$("formato").value, c1 = $("c1").value, c2 = $("c2").value, fam = FUENTES[$("fuente").value];
    cv.width = W; cv.height = H;
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, c1); g.addColorStop(1, tema === "gala" ? "#232323" : c1 === t.bg[0] ? t.bg[1] : c1);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    decorar(t, H, c1, c2);
    ctx.textAlign = "center"; ctx.textBaseline = "alphabetic"; const f = H / 1350;
    ctx.fillStyle = t.tx; ctx.font = "400 " + 44 + "px " + fam; ctx.fillText($("kicker").value, W / 2, 250 * f);
    ctx.fillStyle = c2; ajustar($("titulo").value, 900, 130, fam, 700); ctx.fillText($("titulo").value, W / 2, 400 * f);
    ctx.fillStyle = t.tx; ajustar($("nombre").value, 900, 170, fam, 700); ctx.fillText($("nombre").value, W / 2, 570 * f);
    ctx.font = "400 44px " + fam; ctx.fillStyle = t.tx; parrafo($("mensaje").value, W / 2, 700 * f, 800, 62);
    ctx.fillStyle = c2; ctx.font = "700 48px " + fam; ctx.fillText($("fecha").value, W / 2, 930 * f);
    ctx.fillStyle = t.tx; ctx.font = "400 44px " + fam; ctx.fillText($("lugar").value, W / 2, 1010 * f);
    ctx.globalAlpha = .85; ctx.font = "400 36px " + fam; ctx.fillText($("contacto").value, W / 2, 1180 * f); ctx.globalAlpha = 1;
    if (!PERMITE) marca(H);
  }
  function marca(H) {
    ctx.save(); ctx.globalAlpha = .2; ctx.fillStyle = "#7a7a7a"; ctx.font = "700 54px Arial,sans-serif"; ctx.textAlign = "center"; ctx.translate(W / 2, H / 2); ctx.rotate(-0.5);
    for (let y = -H, k = 0; y < H; y += 210, k++) for (let x = -W; x < W; x += 620) ctx.fillText("ATROSCRIPT · VISTA PREVIA", x + (k % 2 ? 310 : 0), y);
    ctx.restore();
  }
  ["formato", "fuente", "kicker", "titulo", "nombre", "mensaje", "fecha", "lugar", "contacto", "c1", "c2"].forEach(id => { $(id).oninput = dibujar; });
  if (PERMITE) {
    $("bajar").onclick = () => cv.toBlob(b => { const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "invitacion.png"; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); });
    $("compartir").onclick = () => cv.toBlob(b => {
      const f = new File([b], "invitacion.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [f] })) navigator.share({ files: [f], title: "Invitación" }).catch(() => {});
      else $("aviso").textContent = "Tu navegador no permite compartir imágenes. Usa Descargar PNG.";
    });
  }
  $("pedir").onclick = () => {
    const t = TEMAS[tema];
    const m = "Hola, me gustó este diseño del Estudio de Invitaciones de AtroScript y quiero pedirlo:\n• Estilo: " + t.n + "\n• Formato: " + ($("formato").value === "1920" ? "Historia" : "Publicación") + "\n• Encabezado: " + $("kicker").value + "\n• Título: " + $("titulo").value + "\n• Nombre: " + $("nombre").value + "\n• Mensaje: " + $("mensaje").value + "\n• Fecha y hora: " + $("fecha").value + "\n• Lugar: " + $("lugar").value + "\n• Contacto: " + $("contacto").value + "\n• Colores: " + $("c1").value + " y " + $("c2").value;
    window.open("https://wa.me/" + ATRO_WHATSAPP + "?text=" + encodeURIComponent(m), "_blank");
  };
  elegir("fiesta");
})();
