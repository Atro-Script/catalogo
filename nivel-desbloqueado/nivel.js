(function () {
  const d = window.DATOS;
  const $ = id => document.getElementById(id);
  document.title = d.titulo;
  $("jugador").textContent = d.jugador; $("titulo").textContent = d.titulo;
  $("mNombre").textContent = d.mision.nombre; $("mDesc").textContent = d.mision.descripcion; $("mFecha").textContent = d.mision.fecha; $("mLugar").textContent = d.mision.lugar;
  $("aceptar").href = "https://wa.me/" + d.whatsapp + "?text=" + encodeURIComponent("Misión aceptada. ¡Ahí estaré!");
  $("start").onclick = () => {
    $("inicio").hidden = true; $("juego").hidden = false;
    $("nivel").textContent = d.nivelAnterior; $("barra").style.width = "0%";
    requestAnimationFrame(() => { $("barra").style.width = "100%"; });
    setTimeout(() => {
      $("nivel").textContent = d.nivel; $("nivel").classList.add("sube"); document.body.classList.add("flash");
      $("titulo").classList.add("ver");
      d.logros.forEach((l, i) => setTimeout(() => {
        const li = document.createElement("li"); li.className = "logro";
        const ic = document.createElement("span"); ic.className = "ic"; ic.textContent = l.icono;
        const tx = document.createElement("div"); const t = document.createElement("b"); t.textContent = "Logro desbloqueado: " + l.titulo; const p = document.createElement("p"); p.textContent = l.desc; tx.append(t, p);
        li.append(ic, tx); $("logros").append(li);
        if (i === d.logros.length - 1) setTimeout(() => { $("mision").hidden = false; }, 700);
      }, 900 + i * 900));
    }, 1800);
  };
})();
