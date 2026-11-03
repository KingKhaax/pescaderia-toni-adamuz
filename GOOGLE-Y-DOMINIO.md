# Dominio y Google: qué hacer cuando se compre el dominio

La web ya está preparada: etiquetas para buscadores, datos de empresa (JSON-LD), `robots.txt`, `sitemap.xml`, iconos, página 404 y un script que cambia la dirección en todos los archivos.

## 1. Cuando esté comprado el dominio en Hostalia
Ejemplo: `pescaderiatoniadamuz.es`

1. En el panel de Hostalia, **DNS del dominio**, añadir:
   - 4 registros **A** para el dominio sin www (`@`): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1 registro **CNAME** para `www` apuntando a `kingkhaax.github.io`
2. En esta carpeta: `node tools/cambiar-dominio.mjs pescaderiatoniadamuz.es`
   (cambia canonical, sitemap, robots, datos de empresa, tarjetas de contacto, crea `CNAME` y regenera el QR).
3. `git add -A`, `git commit`, `git push`.
4. En GitHub: repositorio → Settings → Pages → Custom domain = el dominio → cuando salga el candado, marcar **Enforce HTTPS** (puede tardar de minutos a unas horas).
5. Volver a imprimir el cartel del QR (`qr/index.html`) y repetir el PDF del escritorio. El QR antiguo seguirá funcionando porque GitHub redirige la dirección vieja al dominio nuevo.

## 2. Para que salga en Google
1. **Google Search Console** (search.google.com/search-console): añadir el dominio como propiedad. Se verifica con un registro TXT en los DNS de Hostalia, o pegando la etiqueta en el comentario preparado de `index.html`.
2. En Search Console → Sitemaps: enviar `https://DOMINIO/sitemap.xml`. Después, en "Inspección de URLs", pedir indexar la portada.
3. **Ficha de Google Business Profile** (business.google.com), lo más importante para búsquedas como "pescadería en Córdoba":
   - Buscar si ya existe la ficha del Mercado de la Corredera y reclamar el puesto, o crear la ficha "Pescadería Toñi Adamuz".
   - Categoría: Pescadería. Dirección: Mercado de la Corredera, Pl. de las Cañas, 1, 14002 Córdoba (puestos 35 y 36).
   - Teléfonos 661 512 393 y 661 512 392, la web con el dominio, el horario real del puesto y fotos del puesto y de los productos.
   - Pedir reseñas a clientes habituales.
4. Mantener **el mismo nombre, dirección y teléfono** en la ficha de Google, la web, Facebook, Instagram y cualquier directorio.
5. Opcional: dar de alta también en Bing Places y poner el enlace de la web en las redes sociales.

Plazos normales: Google tarda de unos días a unas semanas en mostrar la web; la ficha de Google Business, de unos días a dos semanas (a veces piden verificación por correo postal, vídeo o llamada).
