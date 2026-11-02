(function () {
  const d = window.DATOS;
  const $ = id => document.getElementById(id);
  const COL = ["#FFD6E0", "#FFF1B8", "#CDEBFF", "#D7F5DD", "#EAD7FF"];
  const pool = d.razones.map((r, i) => i);
  for (let k = pool.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [pool[k], pool[j]] = [pool[j], pool[k]]; }
  let sacadas = 0;
  document.title = d.titulo;
  $("para").textContent = "Para " + d.para;
  $("titulo").textContent = d.titulo;
  $("de").textContent = "Con cariño, " + d.de;
  for (let i = 0; i < Math.min(22, d.razones.length * 2); i++) {
    const n = document.createElement("span");
    n.style.left = (6 + Math.random() * 72) + "%";
    n.style.bottom = (Math.random() * 62) + "%";
    n.style.background = COL[i % COL.length];
    n.style.transform = "rotate(" + (Math.random() * 90 - 45) + "deg)";
    $("notas").append(n);
  }
  const contar = () => { $("cuenta").textContent = sacadas + " de " + d.razones.length + " razones"; };
  $("sacar").onclick = () => {
    if (sacadas >= d.razones.length) return;
    const idx = pool[sacadas++];
    const p = $("papel");
    p.classList.remove("sale"); void p.offsetWidth; p.classList.add("sale");
    p.style.background = COL[idx % COL.length];
    p.textContent = "";
    const num = document.createElement("b"); num.textContent = "Razón #" + sacadas;
    const txt = document.createElement("span"); txt.textContent = d.razones[idx];
    p.append(num, txt);
    const li = document.createElement("li"); li.textContent = d.razones[idx];
    $("vistas").append(li);
    $("lista").hidden = false;
    contar();
    if (sacadas === d.razones.length) { $("sacar").hidden = true; $("final").hidden = false; $("final").textContent = d.final; }
    else $("sacar").textContent = "Sacar otra razón";
  };
  contar();
})();
