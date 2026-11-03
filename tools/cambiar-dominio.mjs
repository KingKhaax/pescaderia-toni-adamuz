// Cambia la dirección de la web en todos los archivos y regenera el QR.
// Uso:  node tools/cambiar-dominio.mjs dominio.es          (dominio sin https://)
//       node tools/cambiar-dominio.mjs dominio.es --sin-qr (no regenera el QR)
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const dominio = (process.argv[2] || "").replace(/^https?:\/\//, "").replace(/\/.*$/, "").toLowerCase();
if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(dominio)) {
  console.error("Falta el dominio. Ejemplo: node tools/cambiar-dominio.mjs pescaderiatoniadamuz.es");
  process.exit(1);
}
const nuevo = `https://${dominio}/`;
const m = readFileSync(join(raiz, "index.html"), "utf8").match(/<link rel="canonical" href="([^"]+)"/);
const viejo = m ? m[1] : null;
if (!viejo) { console.error("No encuentro la dirección actual (canonical) en index.html"); process.exit(1); }
if (viejo === nuevo) { console.log("La web ya usa ese dominio."); process.exit(0); }

const archivos = ["index.html", "aviso-legal.html", "404.html", "robots.txt", "sitemap.xml", "toni.vcf", "paco.vcf"];
for (const f of archivos) {
  const ruta = join(raiz, f);
  if (!existsSync(ruta)) continue;
  const t = readFileSync(ruta, "utf8");
  const n = t.split(viejo).length - 1;
  writeFileSync(ruta, t.split(viejo).join(nuevo));
  console.log(`${f}: ${n} cambios`);
}
writeFileSync(join(raiz, "CNAME"), dominio + "\n");
console.log(`CNAME: ${dominio}`);

if (!process.argv.includes("--sin-qr")) {
  try {
    execSync(`npx --yes qrcode -t svg -o qr/qr.svg -e H --margin 1 "${nuevo}"`, { cwd: raiz, stdio: "inherit" });
    execSync(`npx --yes qrcode -t png -w 1200 -o qr/qr.png -e H --margin 1 "${nuevo}"`, { cwd: raiz, stdio: "inherit" });
    console.log("QR regenerado: qr/qr.svg y qr/qr.png");
  } catch { console.error("No se pudo regenerar el QR (hace falta internet y Node). Repite sin --sin-qr."); }
}
console.log(`\nListo. Ahora: git add -A, git commit, git push; y en GitHub Pages pon el dominio ${dominio}.`);
console.log("Después hay que volver a imprimir el cartel del QR y repetir el PDF del escritorio.");
