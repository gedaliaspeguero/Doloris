"""Da a las fotos de pasteles el mismo acabado de estudio.

Recorta el pastel de su fondo, lo centra sobre un degradado crema de la
marca con una sombra suave bajo la base y guarda todas las fotos del mismo
tamaño. Solo cambia fondo, luz y encuadre: el pastel queda tal cual.

Uso:
    pip install -r scripts/fotos/requirements.txt
    python scripts/fotos/procesar.py fotos-originales/*.jpg
    python scripts/fotos/procesar.py foto.jpg --salida public/pasteles

La primera vez descarga el modelo de recorte (unos 170 MB).
"""

import argparse
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageOps
from rembg import new_session, remove

LADO = 1400  # Fotos cuadradas, como las tarjetas del catálogo.
ALTO_MAX = 0.80  # Parte del lienzo que puede ocupar el pastel.
ANCHO_MAX = 0.82
BASE = 0.90  # Altura donde se apoya la base del pastel.
ESCALA_MAX = 2.2  # Más ampliación que esto se ve pixelada.
CENTRO = np.array([255.0, 251.0, 246.0])  # Crema claro de la app.
BORDE = np.array([240.0, 229.0, 216.0])  # Crema oscuro, hacia las esquinas.


def fondo():
    y, x = np.mgrid[0:LADO, 0:LADO]
    r = ((x - LADO * 0.5) / (LADO * 0.72)) ** 2 + ((y - LADO * 0.42) / (LADO * 0.72)) ** 2
    t = np.clip(r, 0, 1)[..., None]
    return Image.fromarray((CENTRO * (1 - t) + BORDE * t).astype(np.uint8))


def recortar(foto, sesion):
    pastel = remove(foto, session=sesion, post_process_mask=True)
    alfa = np.array(pastel.getchannel("A"))
    # Limpia restos semitransparentes del fondo original.
    alfa[alfa < 24] = 0
    pastel.putalpha(Image.fromarray(alfa))
    caja = Image.fromarray(alfa).getbbox()
    if not caja:
        raise ValueError("no se encontró el pastel en la foto")
    izq, arriba, der, abajo = caja
    margen = 3
    if izq <= margen or der >= foto.width - margen or abajo >= foto.height - margen:
        raise ValueError("el pastel sale cortado en la foto; usa una donde se vea completo")
    return pastel.crop(caja)


def ancho_de_base(pastel):
    """Ancho de la parte inferior del pastel, para dimensionar la sombra."""
    alfa = np.array(pastel.getchannel("A")) > 128
    filas = alfa[int(alfa.shape[0] * 0.9) :]
    columnas = np.where(filas.any(axis=0))[0]
    return (columnas[-1] - columnas[0]) if len(columnas) else pastel.width


def procesar(ruta, salida, sesion):
    foto = ImageOps.exif_transpose(Image.open(ruta)).convert("RGB")
    pastel = recortar(foto, sesion)

    escala = min(LADO * ALTO_MAX / pastel.height, LADO * ANCHO_MAX / pastel.width)
    if escala > ESCALA_MAX:
        raise ValueError(f"resolución muy baja ({pastel.width}×{pastel.height} px); busca la foto original")
    pastel = pastel.resize((round(pastel.width * escala), round(pastel.height * escala)), Image.LANCZOS)
    # Luz: un poco más clara y viva, sin tocar las formas.
    alfa = pastel.getchannel("A")
    rgb = ImageEnhance.Brightness(pastel.convert("RGB")).enhance(1.05)
    rgb = ImageEnhance.Contrast(rgb).enhance(1.04)
    rgb = ImageEnhance.Color(rgb).enhance(1.05)
    pastel = rgb.convert("RGBA")
    pastel.putalpha(alfa)

    x = (LADO - pastel.width) // 2
    y = int(LADO * BASE) - pastel.height
    lienzo = fondo()

    ancho = float(ancho_de_base(pastel)) * 1.08
    alto = max(24, ancho * 0.09)
    cy = y + pastel.height - alto * 0.15
    sombra = Image.new("L", (LADO, LADO))
    ImageDraw.Draw(sombra).ellipse((LADO / 2 - ancho / 2, cy - alto / 2, LADO / 2 + ancho / 2, cy + alto / 2), fill=70)
    sombra = sombra.filter(ImageFilter.GaussianBlur(alto * 0.6))
    lienzo.paste(Image.new("RGB", (LADO, LADO), (120, 98, 80)), (0, 0), sombra)

    lienzo.paste(pastel, (x, y), pastel)
    destino = salida / (Path(ruta).stem + ".jpg")
    lienzo.save(destino, quality=90, optimize=True, progressive=True)
    return destino


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("fotos", nargs="+", type=Path)
    p.add_argument("--salida", type=Path, default=Path("public/pasteles"))
    p.add_argument("--modelo", default="isnet-general-use", help="modelo de rembg para el recorte")
    args = p.parse_args()

    args.salida.mkdir(parents=True, exist_ok=True)
    sesion = new_session(args.modelo)
    for ruta in args.fotos:
        try:
            print(f"✓ {procesar(ruta, args.salida, sesion)}")
        except Exception as e:  # Sigue con las demás si una falla.
            print(f"✗ {ruta}: {e}")


if __name__ == "__main__":
    main()
