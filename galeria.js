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
  // Con el dedo el navegador ya desliza solo; con el ratón (o el móvil simulado en el ordenador) se arrastra a mano.
  let ini = null;
  pista.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    ini = { x: e.clientX, izq: pista.scrollLeft, mov: false };
  });
  pista.addEventListener("pointermove", (e) => {
    if (!ini) return;
    const dx = e.clientX - ini.x;
    if (!ini.mov && Math.abs(dx) > 6) { ini.mov = true; pista.classList.add("arrastra"); try { pista.setPointerCapture(e.pointerId); } catch {} }
    if (ini.mov) pista.scrollLeft = ini.izq - dx;
  });
  const suelta = () => {
    if (!ini) return;
    const movio = ini.mov;
    ini = null;
    pista.classList.remove("arrastra");
    if (movio) pista.scrollTo({ left: actual() * paso() });
  };
  pista.addEventListener("pointerup", suelta);
  pista.addEventListener("pointercancel", suelta);
  pista.addEventListener("click", (e) => { if (pista.dataset.noclick) { e.preventDefault(); } }, true);
  pista.addEventListener("dragstart", (e) => e.preventDefault());
  addEventListener("resize", pinta);
  pinta();
}
