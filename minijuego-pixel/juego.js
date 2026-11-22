(function () {
  "use strict";
  var d = window.DATOS, $ = function (s, p) { return (p || document).querySelector(s); }, $$ = function (s, p) { return [].slice.call((p || document).querySelectorAll(s)); };
  var P = 5, rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  var PAL = { k: "#3b2a4a", w: "#fff3de", p: "#ff8fb1", r: "#e0475b", y: "#ffd75e", o: "#f4a259", b: "#6ec6ff", g: "#8bd17c", s: "#c9b6d9", h: "#ffffff", m: "#b07cc6" };

  /* ---------- sprites dibujados con letras (cada letra es un color) ---------- */
  function espejo(f) { return f.map(function (r) { return r + r.split("").reverse().join(""); }); }
  var GRID = {
    corazon: [".kk...kk.", "kpppkpppk", "kphpppppk", "kpppppppk", ".kpppppk.", "..kpppk..", "...kpk...", "....k...."],
    sobre: ["kkkkkkkkkkkkkkkk", "kwwwwwwwwwwwwwwk", "kkwwwwwwwwwwwwkk", "kwkkwwwwwwwwkkwk", "kwwwkkwwwwkkwwwk", "kwwwwwkkkkwwwwwk", "kwwwwwkrrkwwwwwk", "kwwwwwwkkwwwwwwk", "kwwwwwwwwwwwwwwk", "kwwwwwwwwwwwwwwk", "kkkkkkkkkkkkkkkk"],
    estrella: ["...y...", "...y...", "yyyhyyy", ".yyhyy.", "..yyy..", ".yy.yy.", ".y...y."],
    nube: espejo(["........", "...hhhh.", "..hhhhhh", ".hhhhhhh", "hhhhhhhh", "hhhhhhhh", ".hhhhhhh"]),
    buho: espejo(["..kk....", ".kppk.kk", ".kppkkpp", ".kpppppp", "kpppkkkp", "kppkwwwk", "kppkwkwk", "kppkwwwk", "kpppkkkp", "kppppppy", "kpppppyy", "kppwwwww", "kppwpwpw", ".kppwwww", ".kkppppp", "..yyy..."])
  };
  function lienzo(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function deGrid(g) {
    var c = lienzo(g[0].length, g.length), x = c.getContext("2d");
    g.forEach(function (row, j) { row.split("").forEach(function (ch, i) { if (PAL[ch]) { x.fillStyle = PAL[ch]; x.fillRect(i, j, 1, 1); } }); });
    return c;
  }
  function circulo(n, fn) {
    var c = lienzo(n, n), x = c.getContext("2d"), m = (n - 1) / 2;
    for (var j = 0; j < n; j++) for (var i = 0; i < n; i++) {
      var dx = i - m, dy = j - m, r = Math.sqrt(dx * dx + dy * dy);
      if (r > m + .5) continue;
      x.fillStyle = r > m - .6 ? PAL.k : fn(dx, dy, r, i, j); x.fillRect(i, j, 1, 1);
    }
    return c;
  }
  var CDCOL = ["#ff8fb1", "#ffd75e", "#8bd17c", "#6ec6ff", "#b07cc6"];
  function bolaCanvas(col, osc) {
    var HEART = ["01010", "11111", "11111", "01110", "00100"];
    return circulo(11, function (dx, dy, r, i, j) {
      var hi = i - 3, hj = j - 3;
      if (hj >= 0 && hj < 5 && hi >= 0 && hi < 5 && i > 2 && i < 8 && j > 3 && j < 9 && HEART[j - 4] && HEART[j - 4][i - 3] === "1") return PAL.h;
      if (dx < -1.5 && dy < -1.5 && r > 2.5 && r < 4.2) return "#ffffff";
      return (dx + dy > 3.4) ? osc : col;
    });
  }
  var SPR = {
    corazon: function () { return deGrid(GRID.corazon); }, sobre: function () { return deGrid(GRID.sobre); }, estrella: function () { return deGrid(GRID.estrella); },
    nube: function () { return deGrid(GRID.nube); }, buho: function () { return deGrid(GRID.buho); },
    cd: function () { return circulo(13, function (dx, dy, r) { if (r < 1.8) return PAL.k; if (r < 2.8) return PAL.w; return CDCOL[Math.floor(((Math.atan2(dy, dx) + Math.PI) / (2 * Math.PI)) * 5 + (r > 5 ? 1 : 0)) % 5]; }); },
    bola: function () { return bolaCanvas("#b07cc6", "#8a5aa6"); }, bolaoro: function () { return bolaCanvas("#ffd75e", "#e0a92e"); },
    boleto: function () {
      var c = lienzo(16, 9), x = c.getContext("2d"); x.fillStyle = PAL.k; x.fillRect(0, 0, 16, 9); x.fillStyle = PAL.y; x.fillRect(1, 1, 14, 7);
      x.clearRect(0, 4, 1, 1); x.clearRect(15, 4, 1, 1); x.fillStyle = PAL.k; for (var j = 1; j < 8; j += 2) x.fillRect(11, j, 1, 1);
      x.fillStyle = PAL.r; x.fillRect(4, 3, 1, 1); x.fillRect(6, 3, 1, 1); x.fillRect(3, 4, 5, 1); x.fillRect(4, 5, 3, 1); x.fillRect(5, 6, 1, 1); return c;
    }
  };
  function spr(nombre, escala, clase) {
    var img = new Image(), c = SPR[nombre]();
    img.src = c.toDataURL(); img.width = c.width * escala; img.height = c.height * escala; img.alt = ""; img.className = clase || "px"; img.draggable = false; return img;
  }

  /* ---------- fondos pixelados (se dibujan en un lienzo pequeño y se amplían) ---------- */
  var TEMAS = {
    atardecer: { cielo: ["#2b2a6e", "#4b3a8f", "#8e4aa0", "#d9638f", "#ff9b7a", "#ffd29a"], est: 1, mont: ["#5a3f8a", "#3a2f6a"], suelo: ["#2d3d6b", "#243058"], pino: "#1f3b55" },
    bosque: { cielo: ["#2a1b2d", "#47243a", "#7a3b2e", "#c06a3a"], est: 0, mont: ["#6b3a2a", "#4a2a24"], suelo: ["#3a2a1e", "#2a1e16"], pino: "#d98a2b", pino2: "#b5651d" },
    campo: { cielo: ["#7fe0d0", "#9be8d8", "#b6f0e0"], est: 0, mont: ["#7ad1b5"], suelo: ["#5cc9b0", "#4bb89f"], flores: 1 },
    noche: { cielo: ["#0a1330", "#12204a", "#1b2e66", "#2a3f85"], est: 1, luna: 1, mont: ["#16275c", "#0f1c45"], suelo: ["#0f1c45", "#0a1330"], pino: "#0a2640" },
    pradera: { cielo: ["#6fc1ff", "#97d4ff", "#c4e8ff", "#e3f6ff"], est: 0, mont: ["#6fb7a0", "#4d9a7e"], suelo: ["#7bd06a", "#5fb957"], flores: 1 }
  };
  function sem(n) { var s = n; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
  function pintaFondo(tipo) {
    var c = $("#fondo"), W = c.width = Math.ceil(innerWidth / P), H = c.height = Math.ceil(innerHeight / P), x = c.getContext("2d"), T = TEMAS[tipo], R = sem(7), hz = Math.floor(H * .66);
    T.cielo.forEach(function (col, i) { x.fillStyle = col; var a = Math.floor(hz * i / T.cielo.length), b = Math.floor(hz * (i + 1) / T.cielo.length); x.fillRect(0, a, W, b - a + 1); });
    if (T.est) { for (var i = 0; i < W * H / 260; i++) { x.fillStyle = R() > .8 ? "#fff" : "#ffe9b0"; x.fillRect(Math.floor(R() * W), Math.floor(R() * hz * .75), 1, 1); } }
    if (T.luna) { var lx = Math.floor(W * .74), ly = Math.floor(H * .2); x.fillStyle = "#fff2c0"; x.beginPath(); x.arc(lx, ly, 8, 0, 7); x.fill(); x.fillStyle = "#f0dca0"; x.fillRect(lx - 3, ly - 2, 3, 3); x.fillRect(lx + 2, ly + 2, 2, 2); }
    T.mont.forEach(function (col, k) {
      x.fillStyle = col; var ph = k * 2.1, base = hz - k * 5;
      for (var cx = 0; cx < W; cx++) { var h = 14 + Math.round((Math.sin(cx * .05 + ph) * 8 + Math.sin(cx * .13 + ph * 2) * 4) / 2) * 2 - k * 4; x.fillRect(cx, base - h, 1, h + 4); }
    });
    T.suelo.forEach(function (col, i) { x.fillStyle = col; var a = hz + Math.floor((H - hz) * i / T.suelo.length); x.fillRect(0, a, W, H - a); });
    for (var t = 0; t < W / 9; t++) {
      var tx = Math.floor(R() * W), ty = hz + 2 + Math.floor(R() * (H - hz) * .5), tam = 3 + Math.floor(R() * 3);
      if (T.pino) { x.fillStyle = (T.pino2 && R() > .5) ? T.pino2 : T.pino; for (var r = 0; r < tam; r++) x.fillRect(tx - r, ty - (tam - r) * 2, r * 2 + 1, 2); x.fillStyle = "#3a2a1e"; x.fillRect(tx, ty, 1, 2); }
    }
    if (T.flores) { for (var f = 0; f < W * (H - hz) / 90; f++) { x.fillStyle = ["#ff8fb1", "#ffd75e", "#ffffff", "#ffb3c7"][Math.floor(R() * 4)]; x.fillRect(Math.floor(R() * W), hz + 3 + Math.floor(R() * (H - hz - 4)), 1, 1); } }
    var nb = $("#nubes"); nb.replaceChildren();
    if (!T.luna && tipo !== "bosque" && !rm) for (var n = 0; n < 4; n++) { var im = spr("nube", 5 + (n % 3) * 2); im.style.top = (6 + n * 11) + "%"; im.style.animationDuration = (60 + n * 25) + "s"; im.style.animationDelay = "-" + (n * 17) + "s"; nb.append(im); }
  }
  var FONDO = { "s-titulo": "atardecer", "s-sobre": "pradera", "s-hub": "bosque", "s-carta": "pradera", "s-canciones": "bosque", "s-bola": "campo", "s-boleto": "noche", "s-normas": "noche", "s-final": "pradera" };

  /* ---------- sonido: blips y una melodía suave ---------- */
  var ac = null, sonando = d.musica !== false, mel = null;
  function audio() { if (!ac) { var A = window.AudioContext || window.webkitAudioContext; if (A) ac = new A(); } if (ac && ac.state === "suspended") ac.resume(); return ac; }
  function tono(f, t, v, tipo) { if (!sonando) return; var a = audio(); if (!a) return; var o = a.createOscillator(), g = a.createGain(); o.type = tipo || "square"; o.frequency.value = f; g.gain.setValueAtTime(v || .04, a.currentTime); g.gain.exponentialRampToValueAtTime(.0001, a.currentTime + t); o.connect(g); g.connect(a.destination); o.start(); o.stop(a.currentTime + t); }
  var blip = function () { tono(540 + Math.random() * 160, .05, .03); };
  function ok() { tono(660, .09, .05); setTimeout(function () { tono(990, .14, .05); }, 90); }
  function mal() { tono(180, .18, .05, "sawtooth"); }
  function ganar() { [523, 659, 784, 1046].forEach(function (f, i) { setTimeout(function () { tono(f, .22, .05); }, i * 110); }); }
  var ACOR = [[262, 330, 392, 523], [220, 277, 330, 440], [175, 220, 262, 349], [196, 247, 294, 392]];
  function musica() {
    if (mel || !sonando || d.musica === false) return; var paso = 0;
    mel = setInterval(function () { if (!sonando || document.hidden) return; var ac2 = ACOR[Math.floor(paso / 8) % 4]; tono(ac2[paso % 4] * (paso % 8 > 3 ? 1 : .5), .45, .018, "triangle"); paso++; }, 230);
  }
  $("#son").onclick = function () { sonando = !sonando; this.textContent = "SON: " + (sonando ? "ON" : "OFF"); this.setAttribute("aria-pressed", sonando); if (sonando) { audio(); musica(); } };

  /* ---------- pantallas ---------- */
  var actual = "s-titulo", vistos = {};
  function ir(id) {
    var v = $("#velo"); if (!rm) { v.classList.remove("on"); void v.offsetWidth; v.classList.add("on"); }
    setTimeout(function () { $$(".esc").forEach(function (e) { e.classList.remove("on"); }); $("#" + id).classList.add("on"); actual = id; pintaFondo(FONDO[id]); var s = $("#" + id); s.scrollTop = 0; }, rm ? 0 : 260);
  }
  $$("[data-volver]").forEach(function (b) { b.onclick = function () { ok(); ir("s-hub"); }; });
  addEventListener("resize", function () { pintaFondo(FONDO[actual]); });
  function lluvia(nombres, n, escala) {
    if (rm) return;
    for (var i = 0; i < n; i++) {
      var im = spr(nombres[i % nombres.length], escala || 4, "llueve"); im.style.left = Math.random() * 96 + "%"; im.style.animationDuration = (2.4 + Math.random() * 2.4) + "s"; im.style.animationDelay = (Math.random() * 1.2) + "s"; im.style.setProperty("--g", (Math.random() * 120 - 60) + "deg");
      document.body.append(im); setTimeout(function (e) { e.remove(); }.bind(null, im), 6500);
    }
  }
  function escribe(el, texto, fin) {
    var i = 0, ya = false; el.textContent = "";
    var iv = setInterval(function () { el.textContent = texto.slice(0, ++i); if (i % 3 === 0) blip(); if (i >= texto.length) { clearInterval(iv); ya = true; if (fin) fin(); } }, 28);
    return function () { if (ya) return; clearInterval(iv); el.textContent = texto; ya = true; if (fin) fin(); };
  }
  function esquiva(btn, veces, alRendirse) {
    var n = 0;
    function mover(e) {
      if (n >= veces) return false; n++; if (e) e.preventDefault(); mal();
      var w = btn.offsetWidth, h = btn.offsetHeight; btn.style.position = "fixed"; btn.style.zIndex = 8;
      btn.style.left = Math.max(10, Math.random() * (innerWidth - w - 20)) + "px"; btn.style.top = Math.max(60, Math.random() * (innerHeight - h - 80)) + "px";
      if (n >= veces) { btn.textContent = "BUENO... ACEPTAR"; btn.classList.add("rindio"); }
      return true;
    }
    btn.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") mover(e); });
    btn.addEventListener("click", function (e) { if (mover(e)) return; ok(); alRendirse(); });
  }

  /* ---------- 1. título ---------- */
  var para = String(d.para || "").toUpperCase();
  document.title = d.titulo + " " + d.para; $("#tit").textContent = d.titulo + " " + para; $("#preg").textContent = d.pregunta;
  $("#empezar").onclick = function () { audio(); musica(); ok(); ir("s-sobre"); };
  esquiva($("#denegar"), 4, function () { audio(); musica(); ir("s-sobre"); });

  /* ---------- 2. sobre ---------- */
  $("#sobre").append(spr("sobre", 14));
  $("#sobre").onclick = function () { ok(); lluvia(["corazon", "estrella"], 14, 4); ir("s-hub"); };

  /* ---------- 3. regalos ---------- */
  var REG = [
    { id: "regalo1", sprite: "sobre", esc: 5, ir: "s-carta" }, { id: "regalo2", sprite: "cd", esc: 6, ir: "s-canciones" },
    { id: "regalo3", sprite: "bola", esc: 6, ir: "s-bola" }, { id: "regalo4", sprite: "boleto", esc: 5, ir: "s-boleto" }
  ];
  REG.forEach(function (r, i) {
    var b = document.createElement("button"); b.className = "regalo"; b.id = "b-" + r.id; b.append(spr(r.sprite, r.esc));
    var t = document.createElement("span"); t.textContent = "REGALO " + (i + 1) + ": " + d[r.id].nombre; b.append(t);
    b.onclick = function () { ok(); vistos[r.id] = 1; b.classList.add("visto"); progreso(); entrar[r.id](); ir(r.ir); };
    $("#regalos").append(b);
  });
  function progreso() { var n = Object.keys(vistos).length; $("#prog").textContent = "ABIERTOS " + n + " DE 4"; $("#alFinal").hidden = n < 4; }
  progreso();
  $("#alFinal").onclick = function () { ok(); ir("s-normas"); entrar.normas(); };

  var entrar = {};
  /* regalo 1: carta */
  entrar.regalo1 = function () {
    var p = d.regalo1.parrafos, k = 0, salta = null, caja = $("#cajaCarta"), tx = $("#textoCarta"), sig = $("#sigCarta");
    function sigue() { sig.hidden = true; if (k >= p.length) return; var t = p[k++]; salta = escribe(tx, t, function () { sig.hidden = false; salta = null; }); }
    tx.textContent = ""; k = 0; sigue();
    caja.onclick = function () { if (salta) salta(); else if (k < p.length) { sigue(); } };
  };
  /* regalo 2: canciones */
  var NOTAS = [[392, 440, 523, 440, 392, 330, 392, 523], [330, 392, 494, 392, 330, 294, 330, 392], [523, 494, 440, 392, 440, 494, 523, 659]];
  entrar.regalo2 = function () {
    $("#tCanc").textContent = d.regalo2.titulo; var ul = $("#listaCanc"); ul.replaceChildren();
    d.regalo2.canciones.forEach(function (c, i) {
      var li = document.createElement("li"); li.className = "cancion";
      var dc = document.createElement("span"); dc.className = "disco"; dc.append(spr("cd", 4));
      var tx = document.createElement("div"); tx.textContent = c.titulo; var s = document.createElement("small"); s.textContent = c.artista; tx.append(s);
      var b = document.createElement(c.enlace ? "a" : "button"); b.className = "pbtn"; b.textContent = c.enlace ? "ABRIR ►" : "ESCUCHAR ►";
      if (c.enlace) { b.href = c.enlace; b.target = "_blank"; b.rel = "noopener"; }
      else b.onclick = function () { ok(); li.classList.add("suena"); NOTAS[i % NOTAS.length].forEach(function (f, j) { setTimeout(function () { tono(f, .3, .06, "triangle"); if (j === 7) li.classList.remove("suena"); }, 300 + j * 260); }); };
      li.append(dc, tx, b); ul.append(li);
    });
  };
  /* regalo 3: bola secreta */
  entrar.regalo3 = function () {
    var cont = $("#bolas"), premio = $("#premioBola"), pista = $("#pistaBola"), g = d.regalo3, sec = Math.floor(Math.random() * 9), fallos = 0, hecho = false;
    cont.replaceChildren(); premio.hidden = true; pista.textContent = "UNA DE ESTAS GUARDA TU PREMIO";
    for (var i = 0; i < 9; i++) (function (i) {
      var b = document.createElement("button"); b.className = "bola"; b.setAttribute("aria-label", "Bola " + (i + 1)); b.append(spr("bola", 6));
      b.onclick = function () {
        if (hecho || b.classList.contains("mal")) return;
        if (i === sec) { hecho = true; b.classList.add("si"); b.replaceChildren(spr("bolaoro", 6)); ganar(); lluvia(["estrella", "corazon"], 22, 4); $("#tBola").textContent = g.titulo; $("#pBola").textContent = g.premio; premio.hidden = false; pista.textContent = "¡LA ENCONTRASTE!"; setTimeout(function () { premio.scrollIntoView({ behavior: "smooth", block: "center" }); }, 300); }
        else { b.classList.add("mal"); mal(); pista.textContent = g.pistas[fallos++ % g.pistas.length]; }
      };
      cont.append(b);
    })(i);
  };
  /* regalo 4: boleto */
  entrar.regalo4 = function () {
    var g = d.regalo4, bol = $("#boleto"); bol.classList.remove("roto"); $("#premioBol").hidden = true; $("#hBol").hidden = false;
    $("#tBol").textContent = g.titulo; $("#pBol").textContent = g.texto; $("#canjear").textContent = g.boton.toUpperCase();
    $("#canjear").href = "https://wa.me/" + d.whatsapp + "?text=" + encodeURIComponent("Canjeo mi boleto: " + g.titulo);
    bol.onclick = function () { if (bol.classList.contains("roto")) return; bol.classList.add("roto"); ganar(); lluvia(["estrella"], 10, 4); $("#hBol").hidden = true; setTimeout(function () { $("#premioBol").hidden = false; }, 700); };
  };
  /* normas */
  entrar.normas = function () {
    var ol = $("#listaNormas"), sig = $("#sigNorma"), caja = $("#cajaNormas"), k = 0;
    ol.replaceChildren(); $("#filaNormas").hidden = true; sig.hidden = false; $("#buho").replaceChildren(spr("buho", 6));
    function mas() { if (k >= d.normas.length) return; var li = document.createElement("li"); ol.append(li); var s = escribe(li, d.normas[k++], function () { if (k >= d.normas.length) { sig.hidden = true; $("#filaNormas").hidden = false; } }); }
    mas(); caja.style.cursor = "pointer";
    caja.onclick = function () { if (k < d.normas.length && ol.lastChild && ol.lastChild.textContent.length >= d.normas[k - 1].length) mas(); };
  };
  var den2 = $("#denegar2"); esquiva(den2, 5, function () { fin(); }); $("#aceptar").onclick = function () { ok(); fin(); };

  /* ---------- final ---------- */
  function fin() { $("#tFinal").textContent = d.final + " ♥"; $("#firma").textContent = "CON CARIÑO, " + String(d.de).toUpperCase(); $("#responder").href = "https://wa.me/" + d.whatsapp + "?text=" + encodeURIComponent("¡Me encantó mi regalo, " + d.de + "!"); ganar(); lluvia(["corazon", "estrella", "corazon"], 40, 4); ir("s-final"); }
  $("#repetir").onclick = function () { vistos = {}; $$(".regalo").forEach(function (b) { b.classList.remove("visto"); }); progreso(); $("#filaNormas").hidden = true; var den = $("#denegar2"); den.style.position = ""; den.textContent = "DENEGAR"; den.classList.remove("rindio"); ir("s-titulo"); };

  pintaFondo("atardecer");
})();
