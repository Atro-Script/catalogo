/* AtroScript · «Pruébalo a tu gusto» (solo demos). Lo carga pedir.js: no hace falta tocar ningún producto.
   Cambia el tono de color de todo el producto y la lluvia de adornos para que el cliente imagine el suyo.
   Se quita solo al entregar (entregar.py elimina pedir.js). */
(function () {
  if (document.querySelector(".ed-btn")) return;
  var b = document.body, root = document.documentElement, rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  var st = document.createElement("style");
  st.textContent =
    "html.ed-t{filter:hue-rotate(var(--ed-h,0deg)) saturate(var(--ed-s,1));transition:filter .6s}" +
    ".ed-btn{position:fixed;left:.6rem;top:calc(max(.6rem,env(safe-area-inset-top,0px)) + 2.9rem);z-index:8;display:inline-flex;align-items:center;gap:.4rem;height:2.4rem;padding:0 .9rem;border:0;border-radius:99px;cursor:pointer;font:700 .85rem/1 'Segoe UI',system-ui,sans-serif;color:#fff;background:rgba(10,10,14,.38);border:1px solid rgba(255,255,255,.22);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);opacity:.62;transition:opacity .25s,background .25s,transform .25s}" +
    ".ed-btn:hover,.ed-btn[aria-expanded=true]{opacity:1;background:rgba(10,10,14,.7)}.ed-btn:active{transform:scale(.94)}" +
    "html[data-atro-frame] .ed-btn{top:max(.6rem,env(safe-area-inset-top,0px));left:.6rem}" +
    ".ed-btn:focus-visible{outline:3px solid #fff;outline-offset:2px}" +
    "@media(max-width:600px){.ed-btn{top:max(.6rem,env(safe-area-inset-top,0px));left:3.8rem;width:2.4rem;padding:0;justify-content:center;gap:0;font-size:0}html[data-atro-frame] .ed-btn{left:.6rem}.ed-pan{top:calc(max(.6rem,env(safe-area-inset-top,0px)) + 3rem)}}" +
    ".ed-pan{position:fixed;left:.6rem;top:calc(max(.6rem,env(safe-area-inset-top,0px)) + 5.6rem);z-index:8;width:min(88vw,300px);padding:1.1rem;border-radius:20px;color:#fff;background:rgba(14,14,20,.92);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.18);box-shadow:0 14px 40px rgba(0,0,0,.5);font-family:'Segoe UI',system-ui,sans-serif;transform-origin:0 0;transition:opacity .25s,transform .3s cubic-bezier(.3,1.4,.5,1)}" +
    ".ed-pan[hidden]{display:block!important;opacity:0;transform:scale(.85);pointer-events:none;visibility:hidden}" +
    ".ed-pan h3{margin:0 0 .8rem;font-size:.95rem;color:#FFC83D}.ed-pan h4{margin:.9rem 0 .45rem;font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;opacity:.7}" +
    ".ed-sw{display:flex;flex-wrap:wrap;gap:.55rem}.ed-sw button{width:34px;height:34px;border-radius:50%;cursor:pointer;padding:0;border:2px solid transparent;box-shadow:0 0 0 1px rgba(255,255,255,.35)}" +
    ".ed-sw button[aria-pressed=true]{border-color:#fff;box-shadow:0 0 0 2px #F12D43}" +
    ".ed-ch{display:flex;flex-wrap:wrap;gap:.45rem}.ed-ch button{padding:.5rem .8rem;border-radius:99px;cursor:pointer;font:600 .78rem/1 'Segoe UI',system-ui,sans-serif;color:#fff;background:transparent;border:1px solid rgba(255,255,255,.35)}" +
    ".ed-ch button[aria-pressed=true]{background:#F12D43;border-color:#F12D43}" +
    "@media (prefers-reduced-motion:reduce){html.ed-t,.ed-pan{transition:none}}";
  document.head.appendChild(st);

  var TONOS = [["Original", 0, 1, "#F12D43"], ["Dorado", 35, 1, "#E3B84B"], ["Menta", 120, 1, "#3FC9A0"], ["Cielo", 190, 1, "#3FA7E8"], ["Violeta", 250, 1, "#8B6BC9"], ["Rosa", 320, 1, "#E8559B"]];
  var LLUVIA = [["🚫 Ninguna", ""], ["✨ Destellos", "destellos"], ["🌸 Pétalos", "petalos"], ["💖 Corazones", "corazones"], ["❄️ Nieve", "nieve"], ["🔥 Luciérnagas", "luciernagas"], ["🎊 Confeti", "confeti"]];

  function lluvia(tipo) {
    var cap = document.querySelector(".atm-cap");
    if (cap) cap.remove();
    if (!tipo || rm) return;
    if (!document.querySelector('link[href*="atmosfera.css"]')) { var l = document.createElement("link"); l.rel = "stylesheet"; l.href = "../assets/atmosfera.css"; document.head.appendChild(l); }
    cap = document.createElement("div"); cap.className = "atm-cap atm-" + tipo; cap.setAttribute("aria-hidden", "true");
    var n = innerWidth < 600 ? 14 : 24, r = Math.random;
    for (var i = 0; i < n; i++) {
      var p = document.createElement("div"); p.className = "atm-p";
      p.style.cssText = "--x:" + r() * 100 + "%;--y:" + r() * 100 + "%;--s:" + (.6 + r() * 1.1) + ";--d:" + (9 + r() * 10) + "s;--t:-" + r() * 16 + "s;--h:" + Math.round(r() * 360) + ";--w:" + (r() * 60 - 30) + "px";
      cap.appendChild(p);
    }
    b.appendChild(cap);
  }

  var btn = document.createElement("button"); btn.type = "button"; btn.className = "ed-btn"; btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-1 1.6-2-.5-1.3.2-2.5 1.6-2.5H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7.5" r="1"/><circle cx="14.5" cy="7.5" r="1"/></svg>Estilo';
  var pan = document.createElement("div"); pan.className = "ed-pan"; pan.hidden = true;
  pan.innerHTML = "<h3>Pruébalo a tu gusto</h3><h4>Tono de color</h4><div class=\"ed-sw\"></div><h4>Lluvia de adornos</h4><div class=\"ed-ch\"></div>";
  var sw = pan.querySelector(".ed-sw"), ch = pan.querySelector(".ed-ch");
  TONOS.forEach(function (t, i) {
    var s = document.createElement("button"); s.type = "button"; s.setAttribute("aria-label", "Tono " + t[0]); s.setAttribute("aria-pressed", i === 0); s.style.background = t[3];
    s.onclick = function () {
      sw.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === s); });
      root.style.setProperty("--ed-h", t[1] + "deg"); root.style.setProperty("--ed-s", t[2]); root.classList.toggle("ed-t", t[1] !== 0);
    };
    sw.appendChild(s);
  });
  var actual = (document.body.dataset.atm || document.body.dataset.orn || "");
  LLUVIA.forEach(function (l) {
    var s = document.createElement("button"); s.type = "button"; s.textContent = l[0]; s.setAttribute("aria-pressed", l[1] === actual);
    s.onclick = function () { ch.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === s); }); lluvia(l[1]); };
    ch.appendChild(s);
  });
  btn.onclick = function () { pan.hidden = !pan.hidden; btn.setAttribute("aria-expanded", !pan.hidden); };
  b.append(pan, btn);
})();
