/* Mejoras de Nivel Desbloqueado: sonidos de 8 bits, suelo retro animado, lluvia de píxeles, XP y temblor al subir de nivel.
   Para quitarlas: borra la línea <script src="nivel-plus.js"> del index.html. Todo respeta «reducir movimiento». */
(function () {
  var rm = matchMedia("(prefers-reduced-motion:reduce)").matches, b = document.body, ac = null;
  var st = document.createElement("style");
  st.textContent =
    ".suelo{position:fixed;left:-50%;right:-50%;bottom:0;height:46vh;z-index:0;pointer-events:none;transform:perspective(380px) rotateX(62deg);transform-origin:50% 100%;" +
    "background:linear-gradient(#FF3CAC00,#FF3CAC55),repeating-linear-gradient(90deg,#7A4DFF88 0 2px,transparent 2px 60px),repeating-linear-gradient(0deg,#7A4DFF88 0 2px,transparent 2px 60px);background-size:100% 100%,60px 60px,60px 60px;animation:ng-suelo 1.6s linear infinite}" +
    "@keyframes ng-suelo{to{background-position:0 0,0 0,0 60px}}" +
    ".ng-px{position:fixed;z-index:3;width:10px;height:10px;pointer-events:none;animation:ng-px 1.4s cubic-bezier(.2,.7,.3,1) forwards}" +
    "@keyframes ng-px{to{opacity:0;transform:translate(var(--dx),var(--dy)) rotate(var(--r))}}" +
    ".ng-xp{display:flex;justify-content:space-between;margin:-.4rem 0 .6rem;font-size:.8rem;letter-spacing:.12em;color:#00F5D4}" +
    ".logro{position:relative;overflow:hidden}.logro::after{content:\"+250 XP\";position:absolute;top:.3rem;right:.6rem;font-size:.7rem;font-weight:700;color:#FFE14D;animation:ng-xpup 1.6s ease-out forwards}" +
    ".logro::before{content:\"\";position:absolute;inset:0;background:linear-gradient(100deg,transparent 30%,#ffffff55 50%,transparent 70%);transform:translateX(-120%);animation:ng-brillo 1s .3s ease-out forwards}" +
    "@keyframes ng-xpup{from{opacity:0;transform:translateY(8px)}30%{opacity:1}to{opacity:0;transform:translateY(-14px)}}@keyframes ng-brillo{to{transform:translateX(120%)}}" +
    "body.ng-tiembla main{animation:ng-tiembla .5s}@keyframes ng-tiembla{20%{transform:translate(-6px,3px)}40%{transform:translate(6px,-3px)}60%{transform:translate(-4px,2px)}80%{transform:translate(3px,-2px)}}" +
    ".mision .boton{animation:ng-late 1.4s ease-in-out infinite}@keyframes ng-late{50%{transform:scale(1.06)}}" +
    "@media (prefers-reduced-motion:reduce){.suelo,.logro::before,.logro::after,body.ng-tiembla main,.mision .boton{animation:none}}";
  document.head.appendChild(st);
  if (!rm) { var s = document.createElement("div"); s.className = "suelo"; s.setAttribute("aria-hidden", "true"); b.insertBefore(s, b.firstChild); }

  function tono(f, t0, dur, tipo, vol) {
    if (!ac) return;
    var o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + t0;
    o.type = tipo || "square"; o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(vol || 0.05, t); g.gain.exponentialRampToValueAtTime(0.0005, t + dur);
    o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + dur + 0.02);
  }
  function blip() { tono(880, 0, 0.09); tono(1320, 0.08, 0.14); }
  function fanfarria() { [523, 659, 784, 1047, 784, 1047, 1319].forEach(function (f, i) { tono(f, i * 0.11, 0.22, "square", 0.06); }); tono(262, 0, 0.9, "triangle", 0.07); }
  function pixeles() {
    if (rm) return;
    var col = ["#00F5D4", "#FFE14D", "#FF3CAC", "#7A4DFF", "#fff"];
    for (var i = 0; i < 46; i++) {
      var p = document.createElement("i"); p.className = "ng-px";
      p.style.cssText = "left:50%;top:38%;background:" + col[i % 5] + ";--dx:" + (Math.random() * 420 - 210) + "px;--dy:" + (Math.random() * 420 - 260) + "px;--r:" + (Math.random() * 540) + "deg";
      b.appendChild(p); setTimeout(function (e) { e.remove(); }.bind(null, p), 1500);
    }
  }
  var start = document.getElementById("start");
  if (start) start.addEventListener("click", function () {
    try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); ac.resume(); } catch (e) {}
    tono(330, 0, 0.1); tono(494, 0.1, 0.1); tono(659, 0.2, 0.18);
    var xp = document.querySelector(".xp");
    if (xp && !document.querySelector(".ng-xp")) {
      var d = window.DATOS || {}, l = document.createElement("div"); l.className = "ng-xp";
      l.innerHTML = "<span>XP</span><span>NIVEL " + d.nivelAnterior + " → " + d.nivel + "</span>"; xp.before(l);
    }
  });
  var niv = document.getElementById("nivel");
  if (niv) new MutationObserver(function () {
    if (niv.classList.contains("sube")) { fanfarria(); pixeles(); if (navigator.vibrate && !rm) try { navigator.vibrate([30, 40, 60]); } catch (e) {} if (!rm) { b.classList.add("ng-tiembla"); setTimeout(function () { b.classList.remove("ng-tiembla"); }, 600); } }
  }).observe(niv, { attributes: true, attributeFilter: ["class"] });
  var lg = document.getElementById("logros");
  if (lg) new MutationObserver(function (m) { if (m.some(function (x) { return x.addedNodes.length; })) blip(); }).observe(lg, { childList: true });
})();
