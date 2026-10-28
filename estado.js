// Horario de llamadas: martes (2) a sábado (6), 8:00–12:00, hora de Madrid.
const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const ahora = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Madrid" }));
const dia = ahora.getDay();
const minutos = ahora.getHours() * 60 + ahora.getMinutes();
const atiende = (d) => d >= 2 && d <= 6;

let texto, abierto = false;
if (atiende(dia) && minutos >= 480 && minutos < 720) {
  abierto = true;
  texto = "Ahora atendemos llamadas (hasta las 12:00)";
} else {
  let falta = atiende(dia) && minutos < 480 ? 0 : 1;
  while (!atiende((dia + falta) % 7)) falta++;
  const cuando = falta === 0 ? "hoy" : falta === 1 ? "mañana" : "el " + DIAS[(dia + falta) % 7];
  texto = `Fuera de horario de llamadas: volvemos ${cuando} a las 8:00`;
}
const estado = document.getElementById("estado");
estado.textContent = texto;
estado.dataset.abierto = abierto ? "si" : "no";

// Columna del día de hoy en la tabla (L=1 … D=0 → posición 1…7).
const cols = document.querySelectorAll("#semana thead th");
cols[(dia + 6) % 7]?.classList.add("hoy");
