#!/usr/bin/env python3
"""
Prepara un producto para entregarlo a un cliente.

Uso:   python entregar.py caja-de-musica
       python entregar.py caja-de-musica regalo-sofia      (nombre de la carpeta de salida)

Crea la carpeta  entregas/<nombre>/  lista para subir a su propio repositorio de GitHub:
  - sin los botones "Catálogo" y "Lo quiero"
  - con noindex (Google no la lista) y robots.txt
  - con solo los archivos que ese producto necesita
Después de crearla, edita  entregas/<nombre>/datos.js  con los datos del cliente.
"""
import os, re, shutil, sys

RAIZ = os.path.dirname(os.path.abspath(__file__))
NOINDEX = '<meta name="robots" content="noindex, nofollow">'

def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    prod = sys.argv[1].strip("/\\")
    origen = os.path.join(RAIZ, prod)
    if not os.path.isfile(os.path.join(origen, "index.html")):
        print("No encuentro el producto «%s». Escribe el nombre de la carpeta, por ejemplo: caja-de-musica" % prod); sys.exit(1)
    nombre = sys.argv[2] if len(sys.argv) > 2 else prod
    destino = os.path.join(RAIZ, "entregas", nombre)
    if os.path.exists(destino):
        print("Ya existe entregas/%s. Bórrala o usa otro nombre." % nombre); sys.exit(1)
    shutil.copytree(origen, destino)

    # crear.html es la herramienta del vendedor (Llave del mensaje): no se entrega
    for f in ("crear.html",):
        p = os.path.join(destino, f)
        if os.path.exists(p): os.remove(p)

    ruta = os.path.join(destino, "index.html")
    html = open(ruta, encoding="utf8").read()

    # 1) quitar los botones flotantes del catálogo
    html = re.sub(r'\s*<script src="\.\./assets/pedir\.js"></script>', "", html)

    # 2) copiar las dependencias que queden fuera de la carpeta (../assets/..., ../js/...)
    def traer(m):
        rel = m.group(2)                                   # p. ej. assets/config.js
        src = os.path.normpath(os.path.join(origen, "..", rel))
        if os.path.isfile(src):
            dst = os.path.join(destino, rel)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            shutil.copy2(src, dst)
        return m.group(1) + rel + '"'
    html = re.sub(r'((?:src|href)=")\.\./([^"]+)"', traer, html)

    # 3) noindex
    if "name=\"robots\"" not in html:
        html = html.replace("<head>", "<head>\n" + NOINDEX, 1)
    open(ruta, "w", encoding="utf8").write(html)
    open(os.path.join(destino, "robots.txt"), "w").write("User-agent: *\nDisallow: /\n")

    print("Listo: entregas/%s" % nombre)
    print("Siguiente paso: edita entregas/%s/datos.js con los datos del cliente y súbela a su repositorio." % nombre)

main()
