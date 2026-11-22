/* Lienzo: canvas de pantalla completa para animaciones propias de cada producto. Lienzo.crear(z, (x, o, t) => {...}) dibuja cada cuadro; o.W y o.H son el tamaño. Devuelve null si el teléfono pide menos movimiento. */
window.Lienzo = { crear: function (z, fn) {
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) return null;
  var c = document.createElement("canvas"); c.setAttribute("aria-hidden", "true"); c.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:" + z; document.body.appendChild(c);
  var x = c.getContext("2d"), o = { W: 0, H: 0 }, d = Math.min(2, devicePixelRatio || 1);
  function rs() { o.W = innerWidth; o.H = innerHeight; c.width = o.W * d; c.height = o.H * d; x.setTransform(d, 0, 0, d, 0, 0); } rs(); addEventListener("resize", rs);
  (function f(t) { x.clearRect(0, 0, o.W, o.H); fn(x, o, t); requestAnimationFrame(f); })(0); return o;
} };
