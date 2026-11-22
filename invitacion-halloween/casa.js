(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  $("tituloEscena").textContent = d.titulo;
  let ac = null, master = null, sonando = false, abierta = false, timers = [];
  function audio() { if (!ac) { const A = window.AudioContext || window.webkitAudioContext; if (A) ac = new A(); } if (ac && ac.state === "suspended") ac.resume(); return !!ac; }
  function crujido() {
    if (!ac) return; const t0 = ac.currentTime, o = ac.createOscillator(), g = ac.createGain(), f = ac.createBiquadFilter();
    o.type = "sawtooth"; o.frequency.setValueAtTime(90, t0); o.frequency.exponentialRampToValueAtTime(230, t0 + 1.1); o.frequency.exponentialRampToValueAtTime(120, t0 + 1.6);
    f.type = "bandpass"; f.frequency.value = 700; f.Q.value = 4; g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(.13, t0 + .15); g.gain.linearRampToValueAtTime(0, t0 + 1.7);
    o.connect(f); f.connect(g); g.connect(ac.destination); o.start(t0); o.stop(t0 + 1.8);
  }
  function campana() {
    if (!ac || !master) return; const esc = [220, 261.63, 329.63, 392, 440], f = esc[Math.floor(Math.random() * esc.length)] * (Math.random() > .6 ? 2 : 1), t0 = ac.currentTime;
    [[1, .12, 2.2], [2.76, .04, .8]].forEach(([r, v, dur]) => { const o = ac.createOscillator(), g = ac.createGain(); o.frequency.value = f * r; g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(v, t0 + .01); g.gain.exponentialRampToValueAtTime(.0005, t0 + dur); o.connect(g); g.connect(master); o.start(t0); o.stop(t0 + dur + .05); });
  }
  function ambiente() {
    if (!ac || sonando) return; sonando = true; master = ac.createGain(); master.gain.value = 0; master.gain.linearRampToValueAtTime(.4, ac.currentTime + 2.5); master.connect(ac.destination);
    [[55, .06], [55.7, .06], [82.4, .035]].forEach(([f, v]) => { const o = ac.createOscillator(), g = ac.createGain(), lp = ac.createBiquadFilter(); o.type = "sawtooth"; o.frequency.value = f; lp.type = "lowpass"; lp.frequency.value = 170; g.gain.value = v; o.connect(lp); lp.connect(g); g.connect(master); o.start(); });
    const buf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate), dat = buf.getChannelData(0); for (let i = 0; i < dat.length; i++) dat[i] = Math.random() * 2 - 1;
    const s = ac.createBufferSource(), bp = ac.createBiquadFilter(), ng = ac.createGain(), lfo = ac.createOscillator(), lg = ac.createGain();
    s.buffer = buf; s.loop = true; bp.type = "bandpass"; bp.frequency.value = 520; bp.Q.value = .7; ng.gain.value = .09; lfo.frequency.value = .13; lg.gain.value = 260;
    lfo.connect(lg); lg.connect(bp.frequency); s.connect(bp); bp.connect(ng); ng.connect(master); s.start(); lfo.start();
    timers.push(setInterval(campana, 4200));
  }
  function abrir() {
    if (abierta) return; abierta = true; document.body.classList.add("abierta");
    if (audio()) { crujido(); ambiente(); $("sonido").hidden = false; }
    setTimeout(() => { $("invi").hidden = false; $("escena").classList.add("cerrada"); window.scrollTo(0, 0); }, 2300);
  }
  $("puerta").addEventListener("click", abrir); $("puerta-btn").onclick = abrir;
  $("sonido").onclick = () => { const on = $("sonido").getAttribute("aria-pressed") !== "true"; $("sonido").setAttribute("aria-pressed", String(on)); $("sonido").textContent = "Sonido: " + (on ? "sí" : "no"); if (master) master.gain.value = on ? .4 : 0; };
})();
