/* AtroScript · emoción compartida (ver emocion.css). Onda de luz al tocar, vibración suave y grano cálido. */
(function () {
  var b = document.body, rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  if (b.dataset.grano !== "off") { var g = document.createElement("div"); g.className = "emo-grano"; g.setAttribute("aria-hidden", "true"); b.appendChild(g); }
  addEventListener("pointerdown", function (e) {
    var t = e.target.closest && e.target.closest("button,a,[role=button],summary,input,label,.btn");
    if (!t) return;
    if (navigator.vibrate && !rm) try { navigator.vibrate(9); } catch (x) {}
    if (rm) return;
    var r = document.createElement("i"); r.className = "emo-ring";
    r.style.left = e.clientX + "px"; r.style.top = e.clientY + "px";
    b.appendChild(r); setTimeout(function () { r.remove(); }, 700);
  }, { passive: true });
})();
