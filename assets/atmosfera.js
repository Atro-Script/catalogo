/* AtroScript · atmósfera compartida. Uso: <body data-d="arco|marco|cinta|tarjeta|sello" data-orn="petalos|..."> (invitaciones)
   o <body data-atm="polvo|petalos|corazones|nieve|luciernagas|burbujas|confeti|nubes|hojas"> (regalos). */
(function () {
  var b = document.body, d = b.dataset, rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  function mk(c, p) { var e = document.createElement("div"); e.className = c; e.setAttribute("aria-hidden", "true"); (p || b).appendChild(e); return e; }
  var tipo = d.orn || d.atm;
  if (tipo && !rm) {
    var cap = mk("atm-cap atm-" + tipo), n = innerWidth < 600 ? 14 : 24;
    for (var i = 0; i < n; i++) {
      var p = mk("atm-p", cap), r = Math.random;
      p.style.cssText = "--x:" + r() * 100 + "%;--y:" + r() * 100 + "%;--s:" + (.6 + r() * 1.1) + ";--d:" + (9 + r() * 10) + "s;--t:-" + r() * 16 + "s;--h:" + Math.round(r() * 360) + ";--w:" + (r() * 60 - 30) + "px";
    }
  }
  if (d.atm && d.vig !== "off") mk("atm-vig");
  if (d.d) {
    var h = document.querySelector(".hero");
    if (h) {
      var o = document.createElement("div"); o.className = "d-orn"; o.setAttribute("aria-hidden", "true");
      if (d.d === "arco") o.innerHTML = '<svg viewBox="0 0 300 520"><path d="M12 508V158a138 138 0 0 1 276 0V508Z"/><path stroke-opacity=".45" d="M24 496V160a126 126 0 0 1 252 0V496Z"/></svg>';
      h.insertBefore(o, h.firstChild);
    }
    if ("IntersectionObserver" in window && !rm) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: .12 });
      document.documentElement.classList.add("js-rv");
      document.querySelectorAll("main section, body > section").forEach(function (s) { s.classList.add("rv"); io.observe(s); });
    }
  }
  var c = document.getElementById("confirmar");
  if (c && d.d) {
    var f = document.createElement("a"); f.className = "atm-cta"; f.href = c.href; f.target = "_blank"; f.rel = "noopener"; f.textContent = "Confirmar asistencia"; b.appendChild(f);
    var vis = function () { var r = c.getBoundingClientRect(), hh = document.querySelector(".hero"), hb = hh ? hh.getBoundingClientRect().bottom : 0; f.classList.toggle("on", hb < 90 && !(r.top < innerHeight && r.bottom > 0)); };
    addEventListener("scroll", vis, { passive: true }); vis();
  }
  if (d.atm && !rm) addEventListener("pointerdown", function (ev) {
    for (var i = 0; i < 6; i++) {
      var s = document.createElement("span"); s.className = "atm-sp";
      s.style.cssText = "left:" + ev.clientX + "px;top:" + ev.clientY + "px;--dx:" + (Math.random() * 90 - 45) + "px;--dy:" + (Math.random() * 90 - 55) + "px";
      b.appendChild(s); setTimeout(function (e) { e.remove(); }.bind(null, s), 750);
    }
  }, { passive: true });
})();
