(function () {
  const d = window.DATOS;
  const $ = id => document.getElementById(id);
  let intentos = 0;
  document.title = "Un mensaje para " + d.para;
  $("para").textContent = d.para;
  $("de").textContent = d.de;
  $("pista").textContent = d.pista ? "Pista: " + d.pista : "";
  $("form").onsubmit = async e => {
    e.preventDefault();
    if (!$("clave").value.trim()) return;
    if (!window.crypto || !crypto.subtle) { $("error").textContent = "Abre este enlace desde una página https (por ejemplo, la que te compartieron)."; return; }
    $("abrir").disabled = true;
    try {
      $("texto").textContent = await CRIPTO.descifrar(d.cifrado, $("clave").value);
      $("bloqueo").hidden = true; $("mensaje").hidden = false;
    } catch (err) {
      intentos++;
      $("error").textContent = intentos >= 3 ? "Esa no es la clave. Revisa la pista." : "Esa no es la clave.";
      const c = $("form"); c.classList.remove("sacude"); void c.offsetWidth; c.classList.add("sacude");
    }
    $("abrir").disabled = false;
  };
})();
