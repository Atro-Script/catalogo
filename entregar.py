#!/usr/bin/env python3
"""
Prepara un producto para entregarlo a un cliente.

Uso:   python entregar.py caja-de-musica
       python entregar.py caja-de-musica regalo-sofia      (nombre de la carpeta de salida)
       python entregar.py ruleta ruleta-cafe premios       (productos con dos modos: elige el modo)

Productos con dos modos (cada modo es una página con su propio archivo de datos):
  capsula-del-tiempo: capsula (por defecto) | capitulos      ruleta: planes (por defecto) | premios
  menu-catalogo: menu (por defecto) | catalogo               nuestro-album: album (por defecto) | libro

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
    modo = sys.argv[3].lower() if len(sys.argv) > 3 else None
    PAGINAS = {"capitulos": "capitulos", "premios": "premios", "catalogo": "catalogo", "libro": "libro"}
    pagina = None
    if modo:
        if modo in PAGINAS: pagina = PAGINAS[modo]
        elif modo not in ("capsula", "planes", "menu", "album"):
            print("Modo «%s» no existe. Opciones: capitulos, premios, catalogo, libro (o el modo por defecto)." % modo); sys.exit(1)
    destino = os.path.join(RAIZ, "entregas", nombre)
    if os.path.exists(destino):
        print("Ya existe entregas/%s. Bórrala o usa otro nombre." % nombre); sys.exit(1)
    shutil.copytree(origen, destino)

    # productos con dos modos: dejar solo el modo elegido como index.html + datos.js
    extras = [f for f in os.listdir(destino) if f.endswith(".html") and f != "index.html"]
    if pagina:
        src_html = pagina + ".html"
        if src_html not in extras:
            print("Este producto no tiene el modo «%s»." % modo); shutil.rmtree(destino); sys.exit(1)
        os.replace(os.path.join(destino, src_html), os.path.join(destino, "index.html"))
        extras = [f for f in extras if f != src_html]
        h = open(os.path.join(destino, "index.html"), encoding="utf8").read()
        m = re.search(r'src="(datos-[a-z]+\.js)"', h)
        if m:
            os.replace(os.path.join(destino, m.group(1)), os.path.join(destino, "datos.js"))
            h = h.replace(m.group(1), "datos.js")
            open(os.path.join(destino, "index.html"), "w", encoding="utf8").write(h)
        else:
            # el modo elegido usa el datos.js por defecto: el de la otra página sobra
            pass
    for f in extras: os.remove(os.path.join(destino, f))
    for f in os.listdir(destino):                       # datos-*.js de modos no elegidos
        if re.match(r"datos-[a-z]+\.js$", f): os.remove(os.path.join(destino, f))

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
            if src.endswith(".css"):                       # tipografías e imágenes que el CSS pide con url(...)
                css = open(src, encoding="utf8", errors="ignore").read()
                for u in re.findall(r'url\(["\']?([^)"\'#?]+)', css):
                    if u.startswith(("data:", "http", "/")): continue
                    s2 = os.path.normpath(os.path.join(os.path.dirname(src), u))
                    d2 = os.path.normpath(os.path.join(os.path.dirname(dst), u))
                    if os.path.isfile(s2) and not os.path.exists(d2):
                        os.makedirs(os.path.dirname(d2), exist_ok=True); shutil.copy2(s2, d2)
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
