(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const cv = $("rueda"), cx = cv.getContext("2d"), N = d.planes.length, W = cv.width, R = W / 2;
  let ang = 0, girando = false, ac = null, vistos = [];
  document.title = d.titulo + " | " + d.para;
  $("para").textContent = d.para; $("titulo").textContent = d.titulo; $("sub").textContent = d.subtitulo;

  function dibuja() {
    cx.clearRect(0, 0, W, W); cx.save(); cx.translate(R, R); cx.rotate(ang);
    const a = Math.PI * 2 / N;
    for (let i = 0; i < N; i++) {
      cx.beginPath(); cx.moveTo(0, 0); cx.arc(0, 0, R - 8, i * a, (i + 1) * a); cx.closePath();
      cx.fillStyle = d.colores[i % d.colores.length]; cx.fill();
      cx.lineWidth = 4; cx.strokeStyle = "rgba(255,255,255,.85)"; cx.stroke();
      cx.save(); cx.rotate(i * a + a / 2);
      cx.textAlign = "right"; cx.fillStyle = "#fff"; cx.shadowColor = "rgba(0,0,0,.35)"; cx.shadowBlur = 6;
      const nom = d.planes[i].nombre, xr = R - 92, ancho = xr - R * 0.30 - 14;   // el texto termina antes del botón central
      let fs = 30, lin = [nom];
      const medir = () => { cx.font = "800 " + fs + "px 'Trebuchet MS',sans-serif"; return Math.max(...lin.map(l => cx.measureText(l).width)); };
      while (medir() > ancho && fs > 18) fs--;
      if (medir() > ancho && nom.includes(" ")) {        // si aún no cabe, se parte en dos líneas
        const pal = nom.split(" "); let mejor = 1, dif = 1e9;
        for (let k = 1; k < pal.length; k++) { const d2 = Math.abs(pal.slice(0, k).join(" ").length - pal.slice(k).join(" ").length); if (d2 < dif) { dif = d2; mejor = k; } }
        lin = [pal.slice(0, mejor).join(" "), pal.slice(mejor).join(" ")]; fs = 26;
        while (medir() > ancho && fs > 15) fs--;
      }
      cx.font = "800 " + fs + "px 'Trebuchet MS',sans-serif";
      lin.forEach((l, k) => cx.fillText(l, xr, 10 + (k - (lin.length - 1) / 2) * (fs + 2)));
      cx.font = "42px sans-serif"; cx.shadowBlur = 0; cx.textAlign = "center"; { const im = window.Arte && Arte.dibujable(d.planes[i].emoji); if (im) cx.drawImage(im, R - 50 - 25, 14 - 25, 50, 50); else cx.fillText(d.planes[i].emoji, R - 50, 14); }
      cx.restore();
    }
    cx.restore();
    cx.beginPath(); cx.arc(R, R, R - 4, 0, 7); cx.lineWidth = 12; cx.strokeStyle = "#fff"; cx.stroke();
    for (let i = 0; i < N; i++) {
      const t = ang + i * Math.PI * 2 / N; cx.beginPath(); cx.arc(R + Math.cos(t) * (R - 4), R + Math.sin(t) * (R - 4), 7, 0, 7); cx.fillStyle = "#FFB703"; cx.fill();
    }
  }
  function tic() {
    const f = document.querySelector(".flecha"); f.classList.remove("tic"); void f.offsetWidth; f.classList.add("tic");
    if (!ac) return; const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime;
    o.type = "triangle"; o.frequency.value = 1100; g.gain.setValueAtTime(.05, t); g.gain.exponentialRampToValueAtTime(.001, t + .05); o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + .06);
  }
  function indice() { const a = Math.PI * 2 / N, p = ((-Math.PI / 2 - ang) % (Math.PI * 2) + Math.PI * 4) % (Math.PI * 2); return Math.floor(p / a) % N; }
  function girar() {
    if (girando) return;
    try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); ac.resume(); } catch (e) {}
    girando = true; $("centro").disabled = true;
    const total = (6 + Math.random() * 3) * Math.PI * 2 + Math.random() * Math.PI * 2, ini = ang, dur = rm ? 400 : 5200, t0 = performance.now();
    let ult = indice();
    (function paso(t) {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 4);
      ang = ini + total * e; dibuja();
      const i = indice(); if (i !== ult) { ult = i; tic(); if (navigator.vibrate && !rm) try { navigator.vibrate(6); } catch (x) {} }
      if (k < 1) requestAnimationFrame(paso); else fin(indice());
    })(t0);
  }
  function fin(i) {
    girando = false; $("centro").disabled = false;
    const p = d.planes[i]; vistos.push(p.emoji);
    $("hist").textContent = "Planes que han salido: " + vistos.join(" ");
    $("emoji").textContent = p.emoji; $("plan").textContent = p.nombre; $("detalle").textContent = p.detalle;
    $("acepto").href = "https://wa.me/" + d.whatsapp + "?text=" + encodeURIComponent(d.mensajeAceptar + " Plan: " + p.nombre + " " + p.emoji);
    setTimeout(() => { $("velo").hidden = false; confeti(); if (navigator.vibrate && !rm) try { navigator.vibrate([20, 40, 30]); } catch (x) {} }, rm ? 0 : 350);
  }
  function confeti() {
    if (rm) return;
    for (let i = 0; i < 40; i++) {
      const c = document.createElement("i");
      c.style.cssText = "position:fixed;z-index:30;left:50%;top:40%;width:9px;height:14px;pointer-events:none;border-radius:2px;background:" + d.colores[i % d.colores.length] + ";transition:transform 1.5s cubic-bezier(.15,.7,.3,1),opacity 1.5s";
      document.body.appendChild(c);
      requestAnimationFrame(() => { c.style.transform = `translate(${Math.random() * 400 - 200}px,${Math.random() * 500 - 200}px) rotate(${Math.random() * 720}deg)`; c.style.opacity = "0"; });
      setTimeout(() => c.remove(), 1600);
    }
  }
  $("centro").onclick = girar; cv.addEventListener("click", girar);
  $("otra").onclick = () => { $("velo").hidden = true; girar(); };
  $("velo").addEventListener("click", e => { if (e.target === $("velo")) $("velo").hidden = true; });
  dibuja(); setTimeout(dibuja, 350);
})();
