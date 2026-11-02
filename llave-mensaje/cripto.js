// Cifrado real en el navegador (AES-GCM con clave derivada por PBKDF2). Sin servidores.
(function () {
  const enc = new TextEncoder(), dec = new TextDecoder();
  const norm = s => s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const aB64 = u => { let s = ""; for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s); };
  const deB64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  async function clave(pass, salt) {
    const base = await crypto.subtle.importKey("raw", enc.encode(norm(pass)), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: 150000, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
  }
  async function cifrar(texto, pass) {
    const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    const k = await clave(pass, salt);
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, k, enc.encode(texto)));
    const out = new Uint8Array(28 + ct.length);
    out.set(salt, 0); out.set(iv, 16); out.set(ct, 28);
    return aB64(out);
  }
  async function descifrar(b64, pass) {
    const u = deB64(b64), k = await clave(pass, u.slice(0, 16));
    return dec.decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: u.slice(16, 28) }, k, u.slice(28)));
  }
  (typeof window !== "undefined" ? window : globalThis).CRIPTO = { cifrar, descifrar };
})();
