(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  let hechas, pistas, decodificado, fallos, actual;
  document.title = d.titulo; $("titulo").textContent = d.titulo; $("intro").textContent = d.intro; $("docTitulo").textContent = d.documento.titulo; $("docAyuda").textContent = d.documento.ayuda;
  const ver = id => ["portada", "juego", "final"].forEach(x => { $(x).hidden = x !== id; });
  const vista = k => { [["vSosp", "tSosp"], ["vPrue", "tPrue"], ["vAcus", "tAcus"]].forEach(([v, t]) => { $(v).hidden = v !== k; $(t).classList.toggle("on", v === k); }); };
  const rot = (txt, n) => txt.replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0) - 65 - n + 26) % 26 + 65));

  function iniciar() {
    hechas = new Set(); pistas = []; decodificado = false; fallos = 0; actual = null;
    $("pistas").replaceChildren(); const v = document.createElement("li"); v.className = "vacia"; v.textContent = "Aún no tienes pistas. Interroga a los sospechosos."; $("pistas").append(v);
    $("nPistas").textContent = 0; $("desp").value = 0; $("despN").textContent = 0; $("cifrado").textContent = d.documento.cifrado; $("docOk").hidden = true; $("mensaje").textContent = "";
    $("interrogatorio").hidden = true; $("intentos").textContent = "Intentos restantes: " + d.intentos;
    $("lista").replaceChildren();
    d.sospechosos.forEach(s => {
      const b = document.createElement("button"); b.className = "sosp";
      const av = document.createElement("span"); av.className = "av"; av.style.background = s.color; av.textContent = s.nombre.split(" ").pop().charAt(0);
      const t = document.createElement("span"); t.className = "sn"; t.textContent = s.nombre; const r = document.createElement("small"); r.textContent = s.rol; t.append(r);
      b.append(av, t); b.onclick = () => interrogar(s); $("lista").append(b);
    });
    $("opciones").replaceChildren();
    d.sospechosos.forEach(s => { const b = document.createElement("button"); b.className = "opc"; b.textContent = s.nombre; b.onclick = () => acusar(s); $("opciones").append(b); });
    vista("vSosp"); ver("juego");
  }
  function agregarPista(t) {
    if (pistas.includes(t)) return;
    if (!pistas.length) $("pistas").replaceChildren();
    pistas.push(t); const li = document.createElement("li"); li.textContent = t; $("pistas").append(li); $("nPistas").textContent = pistas.length;
  }
  function interrogar(s) {
    actual = s; $("iNombre").textContent = s.nombre; $("iRol").textContent = s.rol; $("interrogatorio").hidden = false; $("respuestas").replaceChildren(); $("preguntas").replaceChildren();
    s.preguntas.forEach((q, i) => {
      const k = s.id + i, b = document.createElement("button"); b.className = "preg" + (hechas.has(k) ? " hecha" : ""); b.textContent = q.p;
      b.onclick = () => {
        hechas.add(k); b.classList.add("hecha");
        const bub = document.createElement("div"); bub.className = "bub"; const n = document.createElement("b"); n.textContent = s.nombre + ": "; bub.append(n, q.r); $("respuestas").prepend(bub);
        if (q.pista) agregarPista(q.pista);
      };
      $("preguntas").append(b);
    });
    $("interrogatorio").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  $("desp").oninput = () => {
    const n = +$("desp").value; $("despN").textContent = n; const t = rot(d.documento.cifrado, n); $("cifrado").textContent = t;
    if (t === d.documento.claro) { decodificado = true; $("docOk").hidden = false; $("docOk").textContent = "¡Descifrado! " + d.documento.claro.toLowerCase().replace(/^./, c => c.toUpperCase()) + "."; agregarPista("Documento descifrado: " + d.documento.claro.toLowerCase() + "."); }
  };
  function terminar(clave) {
    const f = d.finales[clave]; $("fTitulo").textContent = f.titulo; $("fTexto").textContent = f.texto + (clave !== "fracaso" ? " " + d.prueba : "");
    $("fResumen").textContent = "Preguntas hechas: " + hechas.size + " · Pistas: " + pistas.length + " · Intentos fallidos: " + fallos; ver("final");
  }
  function acusar(s) {
    if (s.id !== d.culpable) {
      fallos++; const q = d.intentos - fallos; $("intentos").textContent = "Intentos restantes: " + q;
      if (q <= 0) { terminar("fracaso"); return; }
      $("mensaje").textContent = s.nombre + " tiene una coartada sólida. Sigue investigando."; return;
    }
    if (!decodificado) { $("mensaje").textContent = "Tu instinto apunta bien, pero sin pruebas no se sostiene. Revisa el documento."; return; }
    terminar(hechas.size <= 6 ? "maestro" : hechas.size <= 10 ? "experto" : "novato");
  }
  $("empezar").onclick = iniciar; $("otra").onclick = iniciar;
  $("tSosp").onclick = () => vista("vSosp"); $("tPrue").onclick = () => vista("vPrue"); $("tAcus").onclick = () => vista("vAcus");
  ver("portada");
})();
