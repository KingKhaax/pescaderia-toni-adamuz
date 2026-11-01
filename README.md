# Pescadería Toñi Adamuz

Web informativa (sin pedidos): contacto por llamada y WhatsApp, horarios, reparto, catálogo y ubicación.
**Ver la web:** https://kingkhaax.github.io/pescaderia-toni-adamuz/

- Abrir `index.html` en el navegador; no necesita instalación.
- Diseño tipo portada de periódico: rojo principal, azul y blanco secundarios (colores de la tarjeta). No se listan productos concretos, solo pescado fresco, mariscos y congelados (sección `#vendemos`).
- Teléfonos, horarios y ubicación están en `index.html` y `estado.js` (horario de llamadas).

## Cuando haya dominio propio
La dirección de la web aparece en estos sitios y hay que cambiarla a la vez:
- `index.html`: `canonical`, `og:url`, `og:image` y el bloque `application/ld+json` (campos `url` e `image`).
- `toni.vcf` y `paco.vcf`: línea `URL:`.
- `qr/`: regenerar el código con `npx qrcode -t svg -o qr/qr.svg -e H --margin 1 "https://dominio"` y lo mismo para `qr.png` (`-t png -w 1200`).
- `og.jpg` es la imagen que sale al compartir el enlace por WhatsApp (1200x630).

## Imágenes
Los logos y la tarjeta están en WebP (`logos/`, `fotos/`). Para añadir otra: `ffmpeg -i origen.png -vf "scale=-1:300" -c:v libwebp -quality 86 destino.webp`.
