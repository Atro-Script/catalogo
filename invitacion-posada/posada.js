(function () {
  const d = window.DATOS, $ = id => document.getElementById(id);
  const MEL = {
    "Noche de paz": [["G4",1.5],["A4",.5],["G4",1],["E4",3],["G4",1.5],["A4",.5],["G4",1],["E4",3],["D5",2],["D5",1],["B4",3],["C5",2],["C5",1],["G4",3],["A4",2],["A4",1],["C5",1.5],["B4",.5],["A4",1],["G4",1.5],["A4",.5],["G4",1],["E4",3],["A4",2],["A4",1],["C5",1.5],["B4",.5],["A4",1],["G4",1.5],["A4",.5],["G4",1],["E4",3],["D5",2],["D5",1],["F5",1.5],["D5",.5],["B4",1],["C5",3],["E5",3],["C5",1],["G4",1],["E4",1],["G4",1.5],["F4",.5],["D4",1],["C4",3]],
    "Jingle Bells": [["E4",1],["E4",1],["E4",2],["E4",1],["E4",1],["E4",2],["E4",1],["G4",1],["C4",1.5],["D4",.5],["E4",4],["F4",1],["F4",1],["F4",1.5],["F4",.5],["F4",1],["E4",1],["E4",1],["E4",.5],["E4",.5],["E4",1],["D4",1],["D4",1],["E4",1],["D4",2],["G4",2]]
  };
  const NOTAS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const freq = n => { const m = n.match(/^([A-G])([#b]?)(\d)$/); return 440 * Math.pow(2, (12 * (+m[3] + 1) + NOTAS[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0) - 69) / 12); };
  let ac = null, timers = [], sonando = false, idx = 0;
  function campana(f) {
    if (!ac) return; const t0 = ac.currentTime;
    [[1, .35, 1.4], [2.01, .12, .7], [3.98, .05, .3]].forEach(([r, v, dur]) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = "sine"; o.frequency.value = f * r; g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(v, t0 + .008); g.gain.exponentialRampToValueAtTime(.0006, t0 + dur); o.connect(g); g.connect(ac.destination); o.start(t0); o.stop(t0 + dur + .05); });
  }
  function parar() { timers.forEach(clearTimeout); timers = []; sonando = false; $("tocar").textContent = "Villancicos"; }
  function tocar() {
    if (sonando) { parar(); return; }
    if (!ac) { const A = window.AudioContext || window.webkitAudioContext; if (A) ac = new A(); } if (ac && ac.state === "suspended") ac.resume();
    const nombre = d.villancicos[idx % d.villancicos.length], mel = MEL[nombre]; if (!mel) return;
    idx++; sonando = true; $("tocar").textContent = "Detener"; $("tema").textContent = "♪ " + nombre;
    let t = 0; mel.forEach(([n, dur]) => { const ms = t * 460; timers.push(setTimeout(() => campana(freq(n)), ms)); t += dur; });
    timers.push(setTimeout(() => { parar(); }, t * 460 + 800));
  }
  $("tocar").onclick = tocar;
  // ¿Qué me toca llevar?
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  function pintar(q) {
    $("llevar").replaceChildren(); const l = d.llevar.filter(x => !q || norm(x.quien).includes(norm(q)));
    if (!l.length) { const li = document.createElement("li"); li.className = "nada"; li.textContent = "No encontramos tu nombre. Pregúntale a tu anfitrión."; $("llevar").append(li); return; }
    l.forEach(x => { const li = document.createElement("li"); const b = document.createElement("b"); b.textContent = x.quien; li.append(b, " lleva: " + x.cosa); $("llevar").append(li); });
  }
  $("buscar").oninput = e => pintar(e.target.value.trim()); pintar("");
  // Las velas se encienden al llegar a cada paso
  const pasos = document.querySelectorAll(".paso");
  if ("IntersectionObserver" in window) { const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("encendida"); io.unobserve(x.target); } }), { threshold: .35 }); pasos.forEach(p => io.observe(p)); }
  else pasos.forEach(p => p.classList.add("encendida"));
})();
