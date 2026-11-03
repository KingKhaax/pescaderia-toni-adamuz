// Carrusel del mercado: flechas, contador y desplazamiento con el dedo o el teclado.
const pista = document.getElementById("pista");
if (pista) {
  const diapos = [...pista.querySelectorAll(".diapo")];
  const num = document.getElementById("foto-n");
  const flechas = document.querySelectorAll(".flecha");
  const paso = () => diapos.length > 1 ? diapos[1].offsetLeft - diapos[0].offsetLeft : pista.clientWidth;
  const actual = () => Math.min(diapos.length - 1, Math.round(pista.scrollLeft / paso()));
  const pinta = () => {
    const fin = pista.scrollLeft + pista.clientWidth >= pista.scrollWidth - 4;
    const i = fin ? diapos.length - 1 : actual();
    num.textContent = i + 1;
    flechas[0].disabled = i === 0;
    flechas[1].disabled = fin;
  };
  flechas.forEach((b) => b.addEventListener("click", () => pista.scrollBy({ left: paso() * Number(b.dataset.dir) })));
  pista.addEventListener("scroll", () => requestAnimationFrame(pinta), { passive: true });
  pista.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); pista.scrollBy({ left: paso() }); }
    if (e.key === "ArrowLeft") { e.preventDefault(); pista.scrollBy({ left: -paso() }); }
  });
  addEventListener("resize", pinta);
  pinta();
}
