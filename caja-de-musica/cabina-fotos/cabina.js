(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  let ac = null, stream = null, ocupado = false, tomadas = [];
  document.title = d.titulo + " | " + d.evento;
  $("evento").textContent = d.evento; $("titulo").textContent = d.titulo; $("nota").textContent = d.aviso;
  const slots = [...document.querySelectorAll(".tira i")];

  function sonido(tipo) {
    try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); ac.resume(); } catch (e) { return; }
    const t = ac.currentTime, o = ac.createOscillator(), g = ac.createGain(); o.connect(g); g.connect(ac.destination);
    if (tipo === "tic") { o.type = "sine"; o.frequency.value = 660; g.gain.setValueAtTime(.08, t); g.gain.exponentialRampToValueAtTime(.001, t + .15); }
    else { o.type = "square"; o.frequency.setValueAtTime(1800, t); o.frequency.exponentialRampToValueAtTime(300, t + .08); g.gain.setValueAtTime(.07, t); g.gain.exponentialRampToValueAtTime(.001, t + .12); }
    o.start(t); o.stop(t + .2);
  }
  async function camara() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: { ideal: 960 }, height: { ideal: 1280 } }, audio: false });
      const v = $("video"); v.srcObject = stream; v.hidden = false; await v.play(); v.classList.toggle("espejo", !!d.espejo);
      $("cam").hidden = true; $("msj").textContent = "¡Sonríe! Toca el botón cuando estés listo"; return true;
    } catch (e) { $("msj").textContent = "No pude abrir la cámara. Usaremos fotos de ejemplo."; return false; }
  }
  const esperar = ms => new Promise(r => setTimeout(r, rm ? Math.min(ms, 150) : ms));
  async function sesion() {
    if (ocupado) return; ocupado = true; $("foto").disabled = true; $("cam").disabled = true; $("listo").hidden = true;
    tomadas = []; slots.forEach(s => { s.style.backgroundImage = ""; });
    for (let k = 0; k < 4; k++) {
      for (let n = 3; n >= 1; n--) { const e = $("num"); e.textContent = n; e.classList.remove("pop"); void e.offsetWidth; e.classList.add("pop"); sonido("tic"); await esperar(900); }
      $("num").textContent = ""; $("flash").classList.remove("on"); void $("flash").offsetWidth; $("flash").classList.add("on"); sonido("clic");
      if (navigator.vibrate && !rm) try { navigator.vibrate(30); } catch (e) {}
      const src = captura(k); tomadas.push(src);
      slots[k].style.backgroundImage = 'url("' + src + '")';
      if (!stream) { const im = $("vista"); im.src = src; im.hidden = false; }
      await esperar(700);
    }
    if (!stream) $("vista").hidden = true;
    $("msj").textContent = ""; await armar(); ocupado = false; $("foto").disabled = false; $("cam").disabled = false; $("foto").textContent = "Tomar otras";
  }
  function captura(k) {
    const v = $("video");
    if (stream && v.videoWidth) {
      const c = document.createElement("canvas"), w = v.videoWidth, h = v.videoHeight, tw = Math.min(w, h * 3 / 4), th = tw * 4 / 3;
      c.width = 600; c.height = 800; const x = c.getContext("2d");
      if (d.espejo) { x.translate(600, 0); x.scale(-1, 1); }
      x.drawImage(v, (w - tw) / 2, (h - th) / 2, tw, th, 0, 0, 600, 800); return c.toDataURL("image/jpeg", .88);
    }
    return d.fotos[k % d.fotos.length];
  }
  function cargar(src) { return new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; }); }
  async function armar() {
    const imgs = await Promise.all(tomadas.map(cargar)), W = 440, fw = 400, fh = 300, m = 20, top = 20, pie = 120, H = top + (fh + m) * 4 + pie;
    const c = $("lienzo"); c.width = W; c.height = H; const x = c.getContext("2d");
    x.fillStyle = d.colorTira; x.fillRect(0, 0, W, H);
    imgs.forEach((im, i) => {
      if (!im) return; const y = top + i * (fh + m), r = Math.max(fw / im.width, fh / im.height), w = im.width * r, h = im.height * r;
      x.save(); x.beginPath(); x.rect(m, y, fw, fh); x.clip(); x.drawImage(im, m + (fw - w) / 2, y + (fh - h) / 2, w, h); x.restore();
    });
    x.fillStyle = d.colorTexto; x.textAlign = "center"; x.font = "700 30px Georgia,serif"; x.fillText(d.evento, W / 2, H - 70);
    x.font = "400 20px Georgia,serif"; x.fillText(d.fecha, W / 2, H - 36);
    $("listo").hidden = false; $("listo").scrollIntoView({ behavior: rm ? "auto" : "smooth", block: "center" });
  }
  $("foto").onclick = async () => { if (d.usarCamara && !stream) await camara(); sesion(); };
  $("cam").onclick = camara;
  $("otra").onclick = () => { $("listo").hidden = true; slots.forEach(s => { s.style.backgroundImage = ""; }); window.scrollTo({ top: 0, behavior: "smooth" }); };
  $("guardar").onclick = () => {
    try {
      const a = document.createElement("a"); a.href = $("lienzo").toDataURL("image/png"); a.download = "mi-tira-de-fotos.png"; document.body.appendChild(a); a.click(); a.remove();
      $("aviso").textContent = "¡Listo! Revisa tus descargas o tu galería.";
    } catch (e) { $("aviso").textContent = "Mantén presionada la tira y elige «Guardar imagen»."; }
  };
  if (d.usarCamara) $("cam").hidden = true;
})();
