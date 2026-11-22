/* AtroScript · capa premium de invitaciones. Se carga DESPUÉS de motor.js y atmosfera.js.
   Aporta: apertura animada (sobre, cortina o portal), nombre letra a letra, formulario de confirmación,
   «Agregar al calendario», compartir, música generada, barra de avance, visor de fotos y un panel para
   probar colores, lluvia de adornos y apertura en vivo (solo en las demos).
   Opciones en <body data-plus="sin-intro sin-musica sin-rsvp sin-panel"> y en <body data-intro="sobre|cortina|portal">.
   También acepta DATOS.intro y DATOS.musica (false para apagarla). */
/* AtroScript-fallback */(function(){try{if(!getComputedStyle(document.documentElement).getPropertyValue("--ip-ok")){var st=document.createElement("style");st.textContent=":root{--ip-ok:1}body.ip-esp{overflow:hidden}body.ip-esp .hero>:not(.d-orn){animation:none!important;opacity:0}body.ip-esp .ip-l{animation-play-state:paused}.ip-intro{--ip-tx:#fff;position:fixed;inset:0;z-index:2147482000;display:grid;place-content:center;justify-items:center;gap:1.6rem;text-align:center;color:var(--ip-tx);background:radial-gradient(circle at 50% 42%,color-mix(in srgb,var(--fondo,#222) 78%,var(--acento,#fff)),color-mix(in srgb,var(--fondo,#222) 90%,#000));transition:opacity .9s ease .1s,visibility .9s}.ip-intro.fuera{opacity:0;visibility:hidden;pointer-events:none}.ip-intro.ip-claro{--ip-tx:#2b2230}.ip-toca{margin:0;font:600 .9rem/1.2 system-ui,sans-serif;letter-spacing:.22em;text-transform:uppercase;opacity:.85;animation:ip-late 2.2s ease-in-out infinite}.ip-abierto .ip-toca{opacity:0;animation:none;transition:opacity .3s}.ip-sello{position:relative;z-index:6;width:68px;height:68px;border:0;border-radius:50%;cursor:pointer;color:var(--fondo,#222);font:700 1.7rem/1 var(--serif,Georgia),serif;background:radial-gradient(circle at 34% 28%,color-mix(in srgb,var(--acento,#fc0) 62%,#fff),var(--acento,#fc0) 52%,color-mix(in srgb,var(--acento,#fc0) 68%,#000));box-shadow:0 6px 18px rgba(0,0,0,.45),inset 0 -3px 6px rgba(0,0,0,.25),0 0 0 6px color-mix(in srgb,var(--acento,#fc0) 25%,transparent);animation:ip-pulsa 2.2s ease-in-out infinite;transition:transform .5s cubic-bezier(.6,-.4,.4,1.4),opacity .4s}.ip-abierto .ip-sello{animation:none;transform:scale(0) rotate(160deg);opacity:0}.ip-sello:focus-visible{outline:3px solid var(--ip-tx);outline-offset:4px}.ip-sobre{position:relative;width:min(78vw,340px);aspect-ratio:1.5;perspective:900px;display:grid;place-items:center}.ip-sobre>*{position:absolute}.ip-cuerpo{inset:0;z-index:0;border-radius:6px;background:linear-gradient(160deg,color-mix(in srgb,var(--acento,#fc0) 34%,var(--fondo,#222)),color-mix(in srgb,var(--acento,#fc0) 14%,var(--fondo,#222)));box-shadow:0 22px 50px rgba(0,0,0,.45)}.ip-carta{left:7%;right:7%;top:9%;bottom:9%;z-index:1;display:grid;place-content:center;gap:.2rem;padding:.4rem;border-radius:4px;background:#FFF8EA;color:#4A3B2A;box-shadow:0 2px 8px rgba(0,0,0,.2);transition:transform 1s cubic-bezier(.3,.9,.3,1) .55s}.ip-carta small{font:600 .62rem/1 system-ui,sans-serif;letter-spacing:.24em;text-transform:uppercase;opacity:.7}.ip-carta b{font:400 clamp(1.1rem,5.5vw,1.6rem)/1.15 var(--guion,var(--serif,Georgia)),serif;overflow-wrap:anywhere}.ip-frente{inset:0;z-index:2;border-radius:6px;background:linear-gradient(200deg,color-mix(in srgb,var(--acento,#fc0) 26%,var(--fondo,#222)),color-mix(in srgb,var(--acento,#fc0) 9%,var(--fondo,#222)));clip-path:polygon(0 0,50% 54%,100% 0,100% 100%,0 100%)}.ip-solapa{left:0;right:0;top:0;height:55%;z-index:3;transform-origin:50% 0;background:linear-gradient(180deg,color-mix(in srgb,var(--acento,#fc0) 40%,var(--fondo,#222)),color-mix(in srgb,var(--acento,#fc0) 22%,var(--fondo,#222)));clip-path:polygon(0 0,100% 0,50% 100%);transition:transform .9s cubic-bezier(.5,0,.3,1),z-index 0s .45s;backface-visibility:visible}.ip-sobre .ip-sello{left:50%;top:55%;translate:-50% -50%}.ip-abierto .ip-solapa{transform:rotateX(180deg);z-index:0}.ip-abierto .ip-carta{transform:translateY(-64%) scale(1.06)}.ip-t-cortina{background:transparent!important}.ip-telon{position:absolute;top:0;bottom:0;width:50.5%;z-index:0;transition:transform 1.3s cubic-bezier(.7,0,.25,1) .15s;background:repeating-linear-gradient(90deg,color-mix(in srgb,var(--fondo,#222) 76%,var(--acento,#fc0)) 0 16px,color-mix(in srgb,var(--fondo,#222) 88%,#000) 16px 32px)}.ip-telon.i{left:0;box-shadow:6px 0 24px rgba(0,0,0,.5);border-right:2px solid var(--acento,#fc0)}.ip-telon.d{right:0;box-shadow:-6px 0 24px rgba(0,0,0,.5);border-left:2px solid var(--acento,#fc0)}.ip-abierto .ip-telon.i{transform:translateX(-102%)}.ip-abierto .ip-telon.d{transform:translateX(102%)}.ip-t-cortina .ip-centro{position:relative;z-index:2;display:grid;justify-items:center;gap:1.2rem;transition:opacity .4s,transform .6s}.ip-t-cortina.ip-abierto .ip-centro{opacity:0;transform:scale(.9)}.ip-t-cortina .ip-nom{margin:0;font:400 clamp(1.6rem,8vw,2.4rem)/1.1 var(--guion,var(--serif,Georgia)),serif;text-shadow:0 2px 14px rgba(0,0,0,.35);padding:0 1rem}.ip-t-cortina .ip-toca,.ip-t-cortina .ip-nom{color:var(--ip-tx)}@property --ipr{syntax:\"<percentage>\";inherits:false;initial-value:0%}.ip-t-portal{-webkit-mask:radial-gradient(circle at 50% 50%,transparent var(--ipr),#000 calc(var(--ipr) + 1.5%));mask:radial-gradient(circle at 50% 50%,transparent var(--ipr),#000 calc(var(--ipr) + 1.5%));transition:--ipr 1.5s cubic-bezier(.6,0,.3,1),opacity .6s ease,visibility .6s}.ip-t-portal.ip-abierto{--ipr:95%}.ip-aro{position:relative;display:grid;place-items:center;width:min(70vw,260px);aspect-ratio:1;border-radius:50%;border:1px solid var(--acento,#fc0);box-shadow:0 0 30px color-mix(in srgb,var(--acento,#fc0) 55%,transparent),inset 0 0 40px color-mix(in srgb,var(--acento,#fc0) 22%,transparent)}.ip-aro::before{content:\"\";position:absolute;inset:-14px;border-radius:50%;border:2px dashed color-mix(in srgb,var(--acento,#fc0) 70%,transparent);animation:ip-gira 24s linear infinite}.ip-aro::after{content:\"\";position:absolute;inset:14px;border-radius:50%;border:1px solid color-mix(in srgb,var(--acento,#fc0) 50%,transparent)}.ip-aro .ip-nom{position:absolute;bottom:-3.2rem;margin:0;white-space:nowrap;font:400 1.25rem/1 var(--guion,var(--serif,Georgia)),serif;color:var(--acento,#fc0);transition:opacity .3s}.ip-t-portal.ip-abierto .ip-nom{opacity:0}.ip-t-portal .ip-toca{margin-top:2.4rem}.ip-conf{position:fixed;z-index:2147482500;width:8px;height:14px;pointer-events:none;border-radius:2px;animation:ip-conf 1.6s cubic-bezier(.15,.7,.3,1) forwards}.ip-pal{display:inline-block;white-space:nowrap}.ip-l{display:inline-block;animation:ip-letra 1s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i)*60ms + 300ms)}.cuenta div:last-child b{display:block;animation:ip-tic 1s ease-out}.ip-acc{display:flex;flex-wrap:wrap;justify-content:center;gap:.6rem;margin:1.2rem 0 0}.ip-pill{display:inline-flex;align-items:center;gap:.45rem;padding:.55rem 1.05rem;border-radius:99px;cursor:pointer;font:600 .82rem/1 system-ui,sans-serif;text-decoration:none;color:inherit;background:color-mix(in srgb,var(--acento,#fff) 14%,transparent);border:1px solid color-mix(in srgb,var(--acento,#fff) 60%,transparent);backdrop-filter:blur(6px);transition:background .25s,transform .2s}.ip-pill:hover{background:color-mix(in srgb,var(--acento,#fff) 28%,transparent)}.ip-pill svg{width:1rem;height:1rem;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.ip-rsvp{display:grid;gap:.9rem;max-width:420px;margin:0 auto 1.3rem;text-align:left}.ip-rsvp label,.ip-fila>span{display:grid;gap:.35rem;font:600 .78rem/1.2 system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase;opacity:.92}.ip-rsvp input{font:400 1rem/1.3 system-ui,sans-serif;color:inherit;padding:.8rem 1rem;border-radius:14px;width:100%;background:color-mix(in srgb,currentColor 9%,transparent);border:1px solid color-mix(in srgb,var(--acento,#fff) 55%,transparent)}.ip-rsvp input::placeholder{color:inherit;opacity:.5}.ip-rsvp input:focus-visible{outline:2px solid var(--acento,#fff);outline-offset:2px}.ip-fila{display:flex;align-items:center;justify-content:space-between;gap:1rem}.ip-step{display:flex;align-items:center;gap:.9rem}.ip-step button{width:2.5rem;height:2.5rem;border-radius:50%;cursor:pointer;font:700 1.3rem/1 system-ui,sans-serif;color:inherit;background:color-mix(in srgb,var(--acento,#fff) 16%,transparent);border:1px solid color-mix(in srgb,var(--acento,#fff) 60%,transparent)}.ip-step b{min-width:1.6rem;text-align:center;font:700 1.5rem/1 var(--serif,Georgia),serif;font-variant-numeric:tabular-nums}.ip-op{display:grid;grid-template-columns:1fr 1fr;gap:.6rem}.ip-op button{padding:.8rem .6rem;border-radius:14px;cursor:pointer;font:700 .9rem/1.2 system-ui,sans-serif;color:inherit;background:transparent;border:1px solid color-mix(in srgb,var(--acento,#fff) 55%,transparent);transition:background .25s,color .25s}.ip-op button[aria-pressed=true]{background:var(--acento,#fff);color:var(--fondo,#222);border-color:var(--acento,#fff)}.ip-ok{margin:0;text-align:center;font:600 .95rem/1.3 system-ui,sans-serif;min-height:1.2em;color:var(--acento,inherit)}.ip-prog{position:fixed;top:0;left:0;right:0;height:3px;z-index:9;transform-origin:0 50%;transform:scaleX(0);background:var(--acento,#fff);box-shadow:0 0 10px var(--acento,#fff);pointer-events:none}.ip-ctl{position:fixed;bottom:max(14px,env(safe-area-inset-bottom));z-index:9;width:44px;height:44px;display:grid;place-items:center;border-radius:50%;cursor:pointer;padding:0;color:var(--acento,#fff);background:color-mix(in srgb,var(--fondo,#222) 78%,transparent);border:1px solid color-mix(in srgb,var(--acento,#fff) 70%,transparent);backdrop-filter:blur(8px);box-shadow:0 6px 18px rgba(0,0,0,.35)}.ip-ctl svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.ip-ctl.izq{left:12px}.ip-ctl.der{right:12px}.ip-ctl.off::after{content:\"\";position:absolute;width:26px;height:2px;border-radius:2px;background:currentColor;rotate:-45deg}.ip-panel{--ip-tx:#fff;position:fixed;right:12px;bottom:max(68px,calc(env(safe-area-inset-bottom) + 58px));z-index:9;width:min(88vw,310px);padding:1.1rem;border-radius:20px;color:var(--ip-tx);background:color-mix(in srgb,var(--fondo,#222) 90%,#000);border:1px solid color-mix(in srgb,var(--acento,#fff) 60%,transparent);box-shadow:0 14px 40px rgba(0,0,0,.5);transform-origin:100% 100%;transition:opacity .25s,transform .3s cubic-bezier(.3,1.4,.5,1)}.ip-panel[hidden]{display:block!important;opacity:0;transform:scale(.85);pointer-events:none;visibility:hidden}.ip-panel h3{margin:0 0 .8rem;font:700 .95rem/1.2 system-ui,sans-serif;color:var(--acento,#fff)}.ip-panel h4{margin:.9rem 0 .45rem;font:600 .7rem/1 system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;opacity:.75}.ip-sw{display:flex;flex-wrap:wrap;gap:.55rem}.ip-sw button{width:34px;height:34px;border-radius:50%;cursor:pointer;padding:0;border:2px solid transparent;box-shadow:0 0 0 1px rgba(255,255,255,.35)}.ip-sw button[aria-pressed=true]{border-color:var(--ip-tx);box-shadow:0 0 0 2px var(--acento,#fff)}.ip-ch{display:flex;flex-wrap:wrap;gap:.45rem}.ip-ch button{padding:.5rem .8rem;border-radius:99px;cursor:pointer;font:600 .78rem/1 system-ui,sans-serif;color:var(--ip-tx);background:transparent;border:1px solid color-mix(in srgb,var(--ip-tx) 40%,transparent)}.ip-ch button[aria-pressed=true]{background:var(--acento,#fff);color:var(--fondo,#222);border-color:var(--acento,#fff)}.galeria img{cursor:zoom-in;transition:transform .35s,filter .35s}@media (hover:hover){.galeria img:hover{transform:scale(1.03) rotate(-.6deg)}}.ip-visor{position:fixed;inset:0;z-index:2147481000;display:grid;place-items:center;background:rgba(0,0,0,.88);opacity:0;transition:opacity .3s}.ip-visor.on{opacity:1}.ip-visor img{max-width:92vw;max-height:84vh;border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.6);touch-action:pan-y}.ip-visor button{position:absolute;top:max(14px,env(safe-area-inset-top));right:14px;width:44px;height:44px;border-radius:50%;border:0;cursor:pointer;font-size:1.4rem;color:#fff;background:rgba(255,255,255,.16)}.ip-visor p{position:absolute;bottom:max(18px,env(safe-area-inset-bottom));margin:0;color:#fff;opacity:.7;font:600 .8rem system-ui,sans-serif}@keyframes ip-pulsa{0%,100%{scale:1}50%{scale:1.1}}@keyframes ip-late{0%,100%{opacity:.45}50%{opacity:1}}@keyframes ip-gira{to{rotate:360deg}}@keyframes ip-letra{from{opacity:0;transform:translateY(.7em) scale(.8);filter:blur(8px)}}@keyframes ip-tic{0%{opacity:.3;transform:scale(1.35)}100%{opacity:1;transform:none}}@keyframes ip-conf{0%{opacity:1;transform:translate(0,0) rotate(0)}100%{opacity:0;transform:translate(var(--dx),var(--dy)) rotate(var(--r))}}@media (prefers-reduced-motion:reduce){.ip-intro,.ip-intro *{animation:none!important;transition-duration:.01s!important}.ip-l,.cuenta div:last-child b{animation:none}.ip-conf{display:none}}body[data-plus~=\"escena\"]:not(.abierta) :is(.ip-ctl,.ip-panel,.ip-prog){display:none}@media (max-width:430px){body[data-d=arco] .cuenta{gap:.45rem}body[data-d=arco] .cuenta div{width:3.5rem;height:3.5rem}body[data-d=arco] .cuenta b{font-size:1.15rem}}@media (max-width:430px){body[data-d=arco] .cuenta div{min-width:0;width:3.5rem;padding:.4rem .2rem}body[data-d=arco] .cuenta span{font-size:.55rem}}";document.head.appendChild(st);}}catch(e){}})();
(function () {
  var b = document.body, root = document.documentElement, d = window.DATOS || {};
  var rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  var P = " " + (b.dataset.plus || "") + " ";
  var tiene = function (k) { return P.indexOf(" " + k + " ") > -1; };
  var $ = function (id) { return document.getElementById(id); };
  var demo = false;
  var ICO = {
    cal: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>',
    share: '<svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/></svg>',
    nota: '<svg viewBox="0 0 24 24"><path d="M9 18V6l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/></svg>',
    paleta: '<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-1 1.6-2-.5-1.3.2-2.5 1.6-2.5H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7.5" r="1"/><circle cx="14.5" cy="7.5" r="1"/></svg>'
  };

  /* ---------- Utilidades de color ---------- */
  function varCss(n) { return getComputedStyle(root).getPropertyValue(n).trim(); }
  function luz(c) {
    var t = document.createElement("i"); t.style.color = c; b.appendChild(t);
    var m = getComputedStyle(t).color.match(/[\d.]+/g) || [0, 0, 0]; t.remove();
    return (0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]) / 255;
  }
  var fondo0 = varCss("--fondo") || "#222", acento0 = varCss("--acento") || "#fc0";
  var claro0 = luz(fondo0) > 0.55;

  /* ---------- Nombre letra a letra ---------- */
  function letras() {
    var el = $("nombre");
    if (!el || el.children.length || el.dataset.ip) return;
    var cs = getComputedStyle(el);
    if ((cs.webkitBackgroundClip || cs.backgroundClip) === "text") return; /* el degradado en el texto se rompería */
    var txt = el.textContent.trim();
    if (!txt || txt.length > 44) return;
    el.dataset.ip = "1"; el.setAttribute("aria-label", txt); el.textContent = "";
    var i = 0;
    txt.split(" ").forEach(function (w, k, a) {
      var p = document.createElement("span"); p.className = "ip-pal"; p.setAttribute("aria-hidden", "true");
      w.split("").forEach(function (ch) {
        var s = document.createElement("span"); s.className = "ip-l"; s.textContent = ch; s.style.setProperty("--i", i++); p.appendChild(s);
      });
      el.appendChild(p); if (k < a.length - 1) { el.appendChild(document.createTextNode(" ")); i++; }
    });
  }
  function reiniciarLetras() {
    document.querySelectorAll(".ip-l").forEach(function (l) { l.style.animation = "none"; void l.offsetWidth; l.style.animation = ""; });
  }

  /* ---------- Confeti ---------- */
  function confeti(x, y, n) {
    if (rm) return;
    var col = [acento0, varCss("--acento") || acento0, "#ffffff", "hsl(" + Math.round(Math.random() * 360) + " 85% 65%)"];
    for (var i = 0; i < (n || 36); i++) {
      var c = document.createElement("i"); c.className = "ip-conf";
      c.style.cssText = "left:" + x + "px;top:" + y + "px;background:" + col[i % col.length] + ";--dx:" + (Math.random() * 360 - 180) + "px;--dy:" + (Math.random() * 300 - 220) + "px;--r:" + (Math.random() * 720 - 360) + "deg;animation-delay:" + (Math.random() * 0.12) + "s";
      b.appendChild(c); setTimeout(function (e) { e.remove(); }.bind(null, c), 1900);
    }
  }

  /* ---------- Música generada (caja de música) ---------- */
  var ESC = {
    dulce: { r: 261.63, p: [0, 4, 7, 12, 7, 4, 0, 4, 9, 12, 9, 4, 2, 5, 9, 14, 9, 5, 2, 5, 7, 11, 7, 2], t: 0.42 },
    alegre: { r: 293.66, p: [0, 4, 7, 4, 12, 7, 4, 7, 9, 5, 2, 5, 11, 7, 4, 7], t: 0.28 },
    elegante: { r: 220, p: [0, 3, 7, 12, 7, 3, 0, -2, 2, 5, 9, 5, 2, -2, 0, 3], t: 0.55 }
  };
  var dis = b.dataset.d;
  var melodia = ESC[dis === "marco" ? "elegante" : (dis === "cinta" || dis === "sello") ? "alegre" : "dulce"];
  var ac = null, suena = false, paso = 0, tmr = null, btnMus = null;
  function nota(f) {
    var t = ac.currentTime;
    [[f, "sine", 0.5], [f * 2, "triangle", 0.14]].forEach(function (o) {
      var os = ac.createOscillator(), g = ac.createGain();
      os.type = o[1]; os.frequency.value = o[0];
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(o[2] * 0.22, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0005, t + 1.5);
      os.connect(g); g.connect(ac.destination); os.start(t); os.stop(t + 1.6);
    });
  }
  function bucle() {
    if (!suena) return;
    nota(melodia.r * Math.pow(2, melodia.p[paso % melodia.p.length] / 12)); paso++;
    tmr = setTimeout(bucle, melodia.t * 1000);
  }
  function musica(on) {
    if (on === suena) return;
    if (on) {
      try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); ac.resume(); } catch (e) { return; }
      suena = true; bucle();
    } else { suena = false; clearTimeout(tmr); }
    if (btnMus) { btnMus.classList.toggle("off", !suena); btnMus.setAttribute("aria-pressed", suena); }
  }
  document.addEventListener("visibilitychange", function () { if (!ac) return; document.hidden ? ac.suspend() : (suena && ac.resume()); });

  /* ---------- Pantalla de apertura ---------- */
  var TIPOS = { arco: "portal", boda: "sobre", cinta: "cortina", tarjeta: "sobre", sello: "portal", marco: "cortina" };
  var tipoActual = b.dataset.intro || d.intro || TIPOS[dis] || "sobre";
  var intro = null;
  function inicial() { var n = ($("nombre") && ($("nombre").getAttribute("aria-label") || $("nombre").textContent)) || d.nombre || "✦"; return n.trim().charAt(0).toUpperCase() || "✦"; }
  function nombreTxt() { return (($("nombre") && ($("nombre").getAttribute("aria-label") || $("nombre").textContent)) || d.nombre || "").trim(); }
  function mostrarIntro(tipo, conMusica) {
    if (intro) intro.remove();
    tipoActual = tipo;
    window.scrollTo(0, 0);
    b.classList.add("ip-esp");
    var n = nombreTxt();
    var o = document.createElement("div");
    o.className = "ip-intro ip-t-" + tipo + (luz(varCss("--fondo") || fondo0) > 0.55 ? " ip-claro" : "");
    o.setAttribute("role", "dialog"); o.setAttribute("aria-label", "Abrir invitación");
    var sello = '<button type="button" class="ip-sello" aria-label="Abrir la invitación">' + inicial() + "</button>";
    if (tipo === "sobre") {
      o.innerHTML = '<div class="ip-sobre"><div class="ip-cuerpo"></div><div class="ip-solapa"></div><div class="ip-carta"><small>Invitación de</small><b></b></div><div class="ip-frente"></div>' + sello + '</div><p class="ip-toca">Toca el sello para abrir</p>';
      o.querySelector(".ip-carta b").textContent = n;
    } else if (tipo === "cortina") {
      o.innerHTML = '<div class="ip-telon i"></div><div class="ip-telon d"></div><div class="ip-centro"><p class="ip-nom"></p>' + sello + '<p class="ip-toca">Toca para abrir el telón</p></div>';
      o.querySelector(".ip-nom").textContent = n;
    } else {
      o.innerHTML = '<div class="ip-aro">' + sello + '<p class="ip-nom"></p></div><p class="ip-toca">Toca para entrar</p>';
      o.querySelector(".ip-nom").textContent = n;
    }
    b.appendChild(o); intro = o;
    var s = o.querySelector(".ip-sello"); s.focus({ preventScroll: true });
    s.addEventListener("click", function () {
      if (o.classList.contains("ip-abierto")) return;
      var r = s.getBoundingClientRect();
      o.classList.add("ip-abierto");
      if (navigator.vibrate && !rm) try { navigator.vibrate([12, 40, 18]); } catch (e) {}
      confeti(r.left + r.width / 2, r.top + r.height / 2, 40);
      if (conMusica !== false && d.musica !== false && !tiene("sin-musica")) musica(true);
      var t = tipo === "sobre" ? [1500, 1900] : tipo === "cortina" ? [900, 1500] : [700, 1700];
      if (rm) t = [50, 200];
      setTimeout(function () { b.classList.remove("ip-esp"); reiniciarLetras(); window.scrollTo(0, 0); }, t[0]);
      setTimeout(function () { o.classList.add("fuera"); }, t[1]);
      setTimeout(function () { o.remove(); if (intro === o) intro = null; }, t[1] + 1300);
    });
  }

  /* ---------- Calendario y compartir ---------- */
  function fechaIcs(f) { return f.toISOString().replace(/[-:]|\.\d{3}/g, ""); }
  function descargarIcs() {
    var ini = new Date(d.fecha); if (isNaN(ini)) return;
    var fin = new Date(+ini + 4 * 3600e3), esc = function (t) { return String(t || "").replace(/[\\;,]/g, "\\$&").replace(/\n/g, "\\n"); };
    var l = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//AtroScript//Invitacion//ES", "BEGIN:VEVENT", "UID:" + Date.now() + "@atroscript",
      "DTSTAMP:" + fechaIcs(new Date()), "DTSTART:" + fechaIcs(ini), "DTEND:" + fechaIcs(fin), "SUMMARY:" + esc(document.title),
      "LOCATION:" + esc([d.lugar, d.direccion].filter(Boolean).join(", ")), "DESCRIPTION:" + esc(d.mensaje), "END:VEVENT", "END:VCALENDAR"];
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([l.join("\r\n")], { type: "text/calendar;charset=utf-8" }));
    a.download = "invitacion.ics"; document.body.appendChild(a); a.click(); a.remove();
  }
  function acciones() {
    var ancla = $("cuenta") || $("fechaTexto"); if (!ancla || tiene("sin-acciones")) return;
    var box = document.createElement("div"); box.className = "ip-acc";
    if (!isNaN(new Date(d.fecha))) {
      var c = document.createElement("button"); c.type = "button"; c.className = "ip-pill"; c.innerHTML = ICO.cal + "<span>Agregar al calendario</span>";
      c.onclick = function () {
        if (demo) { c.lastChild.textContent = "Disponible en tu invitación"; setTimeout(function () { c.lastChild.textContent = "Agregar al calendario"; }, 2400); }
        else descargarIcs();
      };
      box.appendChild(c);
    }
    if (navigator.share || (navigator.clipboard && navigator.clipboard.writeText)) {
      var s = document.createElement("button"); s.type = "button"; s.className = "ip-pill"; s.innerHTML = ICO.share + "<span>Compartir</span>";
      s.onclick = function () {
        var u = location.href.split("#")[0];
        if (navigator.share) navigator.share({ title: document.title, text: d.mensaje || document.title, url: u }).catch(function () {});
        else navigator.clipboard.writeText(u).then(function () { s.lastChild.textContent = "¡Enlace copiado!"; setTimeout(function () { s.lastChild.textContent = "Compartir"; }, 2200); });
      };
      box.appendChild(s);
    }
    if (box.children.length) ancla.after(box);
  }

  /* ---------- Confirmación con formulario ---------- */
  function rsvp() {
    var c = $("confirmar"); if (!c || tiene("sin-rsvp")) return;
    var num = d.whatsapp || ((c.href.match(/wa\.me\/(\d+)/) || [])[1]) || "";
    var est = "si", cant = 1;
    var f = document.createElement("div"); f.className = "ip-rsvp";
    f.innerHTML = '<label>Tu nombre<input type="text" autocomplete="name" placeholder="¿Cómo te llamas?" maxlength="60"></label>' +
      '<div class="ip-op"><button type="button" data-r="si" aria-pressed="true">¡Allí estaré! 🎉</button><button type="button" data-r="no" aria-pressed="false">No podré 💌</button></div>' +
      '<div class="ip-fila"><span>¿Cuántos vienen?</span><div class="ip-step"><button type="button" data-s="-1" aria-label="Menos personas">−</button><b aria-live="polite">1</b><button type="button" data-s="1" aria-label="Más personas">+</button></div></div>' +
      '<label class="ip-nota">¿Algo que debamos saber?<input type="text" placeholder="Alergias, menú, silla de bebé…" maxlength="120"></label>';
    c.before(f);
    var ok = document.createElement("p"); ok.className = "ip-ok"; ok.setAttribute("role", "status"); c.after(ok);
    var inN = f.querySelectorAll("input")[0], inNota = f.querySelectorAll("input")[1], num$ = f.querySelector("b");
    function pinta() {
      var n = inN.value.trim(), t = document.title.replace(/\s+/g, " "), txt;
      if (est === "si") txt = "Hola" + (n ? ", soy " + n : "") + ": ¡confirmo mi asistencia a «" + t + "»! Seremos " + cant + (cant === 1 ? " persona." : " personas.") + (inNota.value.trim() ? " Nota: " + inNota.value.trim() : "");
      else txt = "Hola" + (n ? ", soy " + n : "") + ": lamentablemente no podré asistir a «" + t + "». ¡Les mando un abrazo enorme!";
      var url = "https://wa.me/" + num + "?text=" + encodeURIComponent(txt);
      c.href = url; c.textContent = est === "si" ? "Confirmar por WhatsApp" : "Avisar por WhatsApp";
      var cta = document.querySelector(".atm-cta"); if (cta) { cta.href = url; cta.textContent = c.textContent; }
      f.querySelector(".ip-fila").hidden = f.querySelector(".ip-nota").hidden = est !== "si";
      num$.textContent = cant;
    }
    f.addEventListener("click", function (e) {
      var r = e.target.closest("[data-r]"), s = e.target.closest("[data-s]");
      if (r) { est = r.dataset.r; f.querySelectorAll("[data-r]").forEach(function (x) { x.setAttribute("aria-pressed", x === r); }); }
      if (s) cant = Math.max(1, Math.min(20, cant + +s.dataset.s));
      pinta();
    });
    f.addEventListener("input", pinta);
    c.addEventListener("click", function (e) {
      var r = c.getBoundingClientRect();
      if (est === "si") confeti(e.clientX || r.left + r.width / 2, e.clientY || r.top, 30);
      ok.textContent = est === "si" ? "¡Gracias! Se abrirá WhatsApp para enviar tu confirmación." : "Gracias por avisar. ¡Te echaremos de menos!";
    });
    pinta();
  }

  /* ---------- Visor de fotos ---------- */
  function visor() {
    var g = $("galeria"); if (!g) return;
    g.addEventListener("click", function (e) {
      var im = e.target.closest("img"); if (!im) return;
      var imgs = Array.prototype.slice.call(g.querySelectorAll("img")), k = imgs.indexOf(im);
      var v = document.createElement("div"); v.className = "ip-visor"; v.setAttribute("role", "dialog"); v.setAttribute("aria-label", "Foto ampliada");
      v.innerHTML = '<img alt=""><button type="button" aria-label="Cerrar">✕</button><p></p>';
      var big = v.querySelector("img"), pie = v.querySelector("p"), x0 = null;
      function ver(i) { k = (i + imgs.length) % imgs.length; big.src = imgs[k].src; big.alt = imgs[k].alt; pie.textContent = (k + 1) + " / " + imgs.length + (imgs.length > 1 ? " · desliza" : ""); }
      function cerrar() { v.classList.remove("on"); setTimeout(function () { v.remove(); }, 300); document.removeEventListener("keydown", tecla); }
      function tecla(ev) { if (ev.key === "Escape") cerrar(); else if (ev.key === "ArrowRight") ver(k + 1); else if (ev.key === "ArrowLeft") ver(k - 1); }
      v.addEventListener("click", function (ev) { if (ev.target !== big) cerrar(); });
      v.addEventListener("touchstart", function (ev) { x0 = ev.touches[0].clientX; }, { passive: true });
      v.addEventListener("touchend", function (ev) { if (x0 === null) return; var dx = ev.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) ver(k + (dx < 0 ? 1 : -1)); x0 = null; }, { passive: true });
      document.addEventListener("keydown", tecla); ver(k); b.appendChild(v); requestAnimationFrame(function () { v.classList.add("on"); });
    });
  }

  /* ---------- Barra de avance, música y panel ---------- */
  function controles() {
    var pr = document.createElement("div"); pr.className = "ip-prog"; pr.setAttribute("aria-hidden", "true"); b.appendChild(pr);
    function sc() { var h = root.scrollHeight - innerHeight; pr.style.transform = "scaleX(" + (h > 0 ? Math.min(1, scrollY / h) : 0) + ")"; }
    addEventListener("scroll", sc, { passive: true }); sc();
    if (d.musica !== false && !tiene("sin-musica")) {
      btnMus = document.createElement("button"); btnMus.type = "button"; btnMus.className = "ip-ctl izq off"; btnMus.setAttribute("aria-label", "Música"); btnMus.setAttribute("aria-pressed", "false"); btnMus.innerHTML = ICO.nota;
      btnMus.onclick = function () { musica(!suena); }; b.appendChild(btnMus);
    }
    if ((demo || tiene("panel")) && !tiene("sin-panel")) panel();
  }
  var OSC = [["#E3B84B", "#14203F"], ["#F4B6C8", "#4A1230"], ["#E8D48B", "#0F3D32"], ["#FFD27D", "#3A1470"], ["#D9C08A", "#0A0A0A"], ["#7FE3F0", "#0B1B3A"]];
  var CLA = [["#B8924A", "#FFF5F2"], ["#C9A24D", "#BFE3F7"], ["#3FAE95", "#FFF6DD"], ["#C8643B", "#FBF1E6"], ["#8B6BC9", "#F3EEFF"], ["#E07A5F", "#FFF0E6"]];
  var LLUVIA = [["✨ Destellos", "destellos"], ["🌸 Pétalos", "petalos"], ["🎈 Burbujas", "burbujas"], ["🎊 Confeti", "confeti"], ["☁️ Nubes", "nubes"], ["❄️ Nieve", "nieve"], ["💖 Corazones", "corazones"]];
  function aplicar(a, fo, pan) {
    root.style.setProperty("--acento", a); root.style.setProperty("--fondo", fo); b.style.setProperty("--atm", a);
    if (varCss("--btn")) root.style.setProperty("--btn", fo);
    if (varCss("--bg")) root.style.setProperty("--bg", "linear-gradient(" + fo + ",color-mix(in srgb," + fo + " 80%," + a + "))");
    if (varCss("--hero")) root.style.setProperty("--hero", "radial-gradient(circle at 50% 30%,color-mix(in srgb," + a + " 28%,transparent),transparent 58%),linear-gradient(" + fo + ",color-mix(in srgb," + fo + " 82%," + a + "))");
    pan.style.setProperty("--ip-tx", luz(fo) > 0.55 ? "#2b2230" : "#fff");
  }
  function panel() {
    window.ATRO_PANEL = true;
    var btn = document.createElement("button"); btn.type = "button"; btn.className = "ip-ctl der"; btn.setAttribute("aria-label", "Personalizar esta invitación"); btn.setAttribute("aria-expanded", "false"); btn.innerHTML = ICO.paleta;
    var pan = document.createElement("div"); pan.className = "ip-panel"; pan.hidden = true;
    pan.style.setProperty("--ip-tx", claro0 ? "#2b2230" : "#fff");
    pan.innerHTML = "<h3>Pruébala a tu gusto</h3><h4>Colores</h4><div class=\"ip-sw\"></div>";
    var sw = pan.querySelector(".ip-sw");
    [[acento0, fondo0]].concat(claro0 ? CLA : OSC).forEach(function (p, i) {
      var s = document.createElement("button"); s.type = "button"; s.setAttribute("aria-label", i ? "Combinación " + i : "Colores originales"); s.setAttribute("aria-pressed", i === 0);
      s.style.background = "linear-gradient(135deg," + p[1] + " 50%," + p[0] + " 50%)";
      s.onclick = function () { sw.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === s); }); aplicar(p[0], p[1], pan); };
      sw.appendChild(s);
    });
    var cap = document.querySelector(".atm-cap");
    if (cap) {
      var h = document.createElement("h4"); h.textContent = "Lluvia de adornos"; var ch = document.createElement("div"); ch.className = "ip-ch";
      var actual = (cap.className.match(/atm-(\w+)/g) || []).map(function (x) { return x.slice(4); }).filter(function (x) { return x !== "cap"; })[0];
      LLUVIA.forEach(function (l) {
        var s = document.createElement("button"); s.type = "button"; s.textContent = l[0]; s.setAttribute("aria-pressed", l[1] === actual);
        s.onclick = function () { cap.className = "atm-cap atm-" + l[1]; ch.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === s); }); };
        ch.appendChild(s);
      });
      pan.append(h, ch);
    }
    if (!tiene("sin-intro")) {
      var h2 = document.createElement("h4"); h2.textContent = "Apertura"; var c2 = document.createElement("div"); c2.className = "ip-ch";
      [["💌 Sobre", "sobre"], ["🎭 Cortina", "cortina"], ["🌀 Portal", "portal"]].forEach(function (l) {
        var s = document.createElement("button"); s.type = "button"; s.textContent = l[0]; s.setAttribute("aria-pressed", l[1] === tipoActual);
        s.onclick = function () { pan.hidden = true; btn.setAttribute("aria-expanded", "false"); c2.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === s); }); mostrarIntro(l[1], false); };
        c2.appendChild(s);
      });
      pan.append(h2, c2);
    }
    btn.onclick = function () { pan.hidden = !pan.hidden; btn.setAttribute("aria-expanded", !pan.hidden); };
    b.append(pan, btn);
  }

  /* ---------- Arranque ---------- */
  letras();
  acciones();
  rsvp();
  visor();
  var listo = function () { demo = !!document.querySelector('script[src*="pedir.js"]'); controles(); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", listo); else listo();
  if (!tiene("sin-intro") && location.hash !== "#sin-intro") mostrarIntro(tipoActual);
})();
