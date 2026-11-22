// Logo reactor de AtroScript, construido directamente en la página (sin marcos incrustados).
(function () {
  const NS = "http://www.w3.org/2000/svg";
  function ticks() {
    let u = "";
    for (let i = 0; i < 60; i++) u += '<use href="#atro-t' + (i && i % 10 === 0 ? "m" : "") + '"' + (i ? ' transform="rotate(' + i * 6 + ' 50 50)"' : "") + "/>";
    return u;
  }
  function marcado() {
    return '<div class="aura"></div><div class="energy"></div>' +
      '<svg class="outer" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="47.2"/><circle class="dash" cx="50" cy="50" r="47.2"/><circle class="dot" cx="50" cy="2.8" r=".85"/><circle class="dot" cx="2.8" cy="50" r=".55"/><circle class="dot" cx="97.2" cy="50" r=".55"/></svg>' +
      '<svg class="ticks" viewBox="0 0 100 100" aria-hidden="true"><defs><line id="atro-t" x1="50" y1="1.2" x2="50" y2="3.4"/><line id="atro-tm" class="major" x1="50" y1=".3" x2="50" y2="5.2"/></defs><g>' + ticks() + "</g></svg>" +
      '<svg class="segmented" viewBox="0 0 100 100" aria-hidden="true"><circle class="track" cx="50" cy="50" r="39"/><circle class="segments" cx="50" cy="50" r="39"/></svg>' +
      '<svg class="inner" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="31.5"/><circle class="hot" cx="50" cy="50" r="31.5"/></svg>' +
      '<div class="wave"></div><div class="wave delay"></div><div class="shell"></div><div class="shell two"></div>' +
      '<div class="core"><div class="corelight"></div><span class="letter">A</span><div class="scan"></div></div>' +
      '<span class="node n1"></span><span class="node n2"></span><span class="node n3"></span><span class="node n4"></span>';
  }
  function crear(lite) {
    const el = document.createElement("div");
    el.className = "atro-logo" + (lite ? " lite" : ""); el.setAttribute("role", "img"); el.setAttribute("aria-label", "Logo de ATROSCRIPT");
    try { el.innerHTML = marcado(); } catch (e) { el.className = "atro-logo-fallback"; el.textContent = "A"; return el; }
    if ("IntersectionObserver" in window) new IntersectionObserver(es => es.forEach(x => el.classList.toggle("pausa", !x.isIntersecting))).observe(el);
    return el;
  }
  const pocaMemoria = (navigator.deviceMemory && navigator.deviceMemory <= 2) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);
  function montar(cont) {
    if (cont.firstChild) return;
    cont.append(crear(cont.dataset.atroLogo === "lite" || (pocaMemoria && cont.dataset.atroLogo !== "lite")));
  }
  window.AtroLogo = { crear, montar, pocaMemoria };
  document.querySelectorAll("[data-atro-logo]:not([data-diferido])").forEach(montar);
})();
