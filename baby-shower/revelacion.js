(function () {
  const d = window.DATOS.revelacion || { resultado: "niña" };
  const $ = id => document.getElementById(id);
  const niña = d.resultado !== "niño";
  const paleta = niña ? ["#F48FB1", "#F8BBD0", "#FFD54F", "#FFFFFF", "#F06292"] : ["#64B5F6", "#90CAF9", "#FFD54F", "#FFFFFF", "#42A5F5"];
  let hecho = false;
  $("revelar").onclick = () => {
    if (hecho) return; hecho = true;
    $("revelar").disabled = true;
    let n = 3;
    $("resultado").textContent = n;
    const t = setInterval(() => {
      n--;
      if (n > 0) { $("resultado").textContent = n; return; }
      clearInterval(t);
      $("resultado").textContent = niña ? "¡Es una niña!" : "¡Es un niño!";
      $("resultado").style.color = paleta[0];
      for (let i = 0; i < 60; i++) {
        const c = document.createElement("span");
        c.className = "confeti";
        c.style.left = Math.random() * 100 + "%";
        c.style.background = paleta[i % paleta.length];
        c.style.animationDuration = (2 + Math.random() * 3) + "s";
        c.style.animationDelay = (Math.random() * 0.6) + "s";
        document.body.append(c);
        setTimeout(() => c.remove(), 6000);
      }
    }, 900);
  };
})();
