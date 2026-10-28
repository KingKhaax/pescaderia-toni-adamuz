# Pescadería Toñi Adamuz

Web informativa (sin pedidos): contacto por llamada y WhatsApp, horarios, reparto, catálogo y ubicación.
**Ver la web:** https://kingkhaax.github.io/pescaderia-toni-adamuz/

- Abrir `index.html` en el navegador; no necesita instalación.
- Productos: editar la sección `#pescados` de `index.html`. Fotos: añadirlas en `fotos/` y ponerlas con `<img>` dentro de cada `<li>`.
- Teléfonos, horarios y ubicación están en `index.html` y `estado.js` (horario de llamadas).

## Cuando haya dominio propio
La dirección de la web aparece en estos sitios y hay que cambiarla a la vez:
- `index.html`: `canonical`, `og:url`, `og:image` y el bloque `application/ld+json` (campos `url` e `image`).
- `toni.vcf` y `paco.vcf`: línea `URL:`.
- `qr/`: regenerar el código con `npx qrcode -t svg -o qr/qr.svg -e H --margin 1 "https://dominio"` y lo mismo para `qr.png` (`-t png -w 1200`).
- `og.jpg` es la imagen que sale al compartir el enlace por WhatsApp (1200x630).

## Imágenes
Los logos y la tarjeta están en WebP (`logos/`, `fotos/`). Para añadir otra: `ffmpeg -i origen.png -vf "scale=-1:300" -c:v libwebp -quality 86 destino.webp`.
