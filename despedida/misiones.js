(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  document.body.dataset.tipo = d.tipo === "soltera" ? "soltera" : "soltero";
  const meta = d.misiones.reduce((s, m) => s + m.puntos, 0); let pts = 0;
  $("meta").textContent = meta;
  function confeti() {
    for (let i = 0; i < 70; i++) { const c = document.createElement("span"); c.className = "confeti"; c.style.left = Math.random() * 100 + "%"; c.style.background = ["#FFD166", "#FF3EA5", "#35A7FF", "#fff", "#7CFFB2"][i % 5]; c.style.animationDuration = (2 + Math.random() * 3) + "s"; c.style.animationDelay = (Math.random() * .6) + "s"; document.body.append(c); setTimeout(() => c.remove(), 6000); }
  }
  d.misiones.forEach(m => {
    const li = document.createElement("li"), b = document.createElement("button"); b.type = "button"; b.setAttribute("aria-pressed", "false");
    const t = document.createElement("span"); t.textContent = m.texto; const p = document.createElement("b"); p.textContent = "+" + m.puntos; b.append(t, p);
    b.onclick = () => {
      const on = b.getAttribute("aria-pressed") !== "true"; b.setAttribute("aria-pressed", String(on)); b.classList.toggle("hecha", on); pts += on ? m.puntos : -m.puntos;
      $("pts").textContent = pts; $("barra").style.width = (pts / meta * 100) + "%";
      const gana = pts >= meta; $("mvp").hidden = !gana; if (gana) { $("mvp").textContent = d.tipo === "soltera" ? "¡Eres la MVP de la noche! Todas las misiones cumplidas." : "¡Eres el MVP de la noche! Todas las misiones cumplidas."; confeti(); }
    };
    li.append(b); $("misiones").append(li);
  });
})();
