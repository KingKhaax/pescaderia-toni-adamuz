// Horario de llamadas: martes (2) a sábado (6), 8:00–12:00, hora de Madrid.
const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const ahora = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Madrid" }));
const dia = ahora.getDay();
const minutos = ahora.getHours() * 60 + ahora.getMinutes();
const atiende = (d) => d >= 2 && d <= 6;

let texto, abierto = false;
if (atiende(dia) && minutos >= 480 && minutos < 720) {
  abierto = true;
  texto = "Ahora atendemos llamadas, hasta las 12:00";
} else {
  let falta = atiende(dia) && minutos < 480 ? 0 : 1;
  while (!atiende((dia + falta) % 7)) falta++;
  const cuando = falta === 0 ? "hoy" : falta === 1 ? "mañana" : "el " + DIAS[(dia + falta) % 7];
  texto = `Fuera de horario, volvemos ${cuando} a las 8:00`;
}
const estado = document.getElementById("estado");
estado.textContent = texto;
estado.dataset.abierto = abierto ? "si" : "no";

// Fecha de hoy en la tira de la portada.
const fecha = document.getElementById("fecha");
if (fecha) {
  const may = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const p = Object.fromEntries(new Intl.DateTimeFormat("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Madrid" }).formatToParts(new Date()).map((x) => [x.type, x.value]));
  fecha.textContent = `${may(p.weekday)}, ${p.day} de ${may(p.month)} de ${p.year}`;
}

// Marca la fila de hoy en la semana (data-d usa getDay: domingo=0).
const fila = document.querySelector(`#semana tr[data-d="${dia}"]`);
fila?.classList.add("hoy");
fila?.setAttribute("aria-current", "date");

// El nombre aparece en el menú pegajoso cuando el rótulo grande ya no se ve.
const menu = document.getElementById("menu");
const rotulo = document.querySelector(".cabecera");
if (menu && rotulo && "IntersectionObserver" in window) {
  new IntersectionObserver(([e]) => menu.classList.toggle("fijo", !e.isIntersecting)).observe(rotulo);
}
