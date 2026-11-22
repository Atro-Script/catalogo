/* AtroScript v27 · progreso de lectura y luz que sigue al dedo en las tarjetas */
(function () {
  var bar = document.createElement("div"); bar.className = "progreso"; bar.setAttribute("aria-hidden", "true"); document.body.append(bar);
  var raf = 0;
  function pinta() { raf = 0; var h = document.documentElement.scrollHeight - innerHeight; bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, scrollY / h) : 0) + ")"; }
  addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(pinta); }, { passive: true });
  pinta();
  function luz(e) {
    var t = e.target.closest && e.target.closest(".tarjeta"); if (!t) return;
    var r = t.getBoundingClientRect();
    t.style.setProperty("--mx", (e.clientX - r.left) + "px"); t.style.setProperty("--my", (e.clientY - r.top) + "px");
    if (e.pointerType === "touch") { t.classList.add("toca"); clearTimeout(t._tm); t._tm = setTimeout(function () { t.classList.remove("toca"); }, 600); }
  }
  document.addEventListener("pointermove", luz, { passive: true });
  document.addEventListener("pointerdown", luz, { passive: true });
})();
