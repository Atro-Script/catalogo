(function () {
  const d = window.DATOS;
  const $ = id => document.getElementById(id);
  const PASO = 0.9;
  document.title = "Una carta para " + d.para;
  $("para").textContent = d.para;
  $("firma").textContent = d.firma;
  if (d.fecha) {
    const f = new Date(d.fecha + "T12:00");
    if (!isNaN(f)) $("fecha").textContent = f.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
  }
  d.parrafos.forEach((t, i) => {
    const p = document.createElement("p");
    p.textContent = t;
    p.style.animationDelay = (i * PASO) + "s";
    $("texto").append(p);
  });
  $("firma").style.animationDelay = (d.parrafos.length * PASO) + "s";
  $("secretoBtn").style.animationDelay = ((d.parrafos.length + 1) * PASO) + "s";
  if (d.secreto) $("secreto").textContent = d.secreto; else $("secretoBtn").hidden = true;

  $("sobre").onclick = () => {
    $("sobre").classList.add("abierto");
    $("sobre").disabled = true;
    $("pista").hidden = true;
    setTimeout(() => { $("envoltura").hidden = true; $("carta").hidden = false; window.scrollTo(0, 0); }, 900);
  };
  $("secretoBtn").onclick = () => { $("secreto").hidden = false; $("secretoBtn").hidden = true; };
})();
