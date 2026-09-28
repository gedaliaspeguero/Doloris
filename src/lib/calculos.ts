import { disponibilidad, porciones } from "./negocio";

export function sugerirTamano(invitados: number) {
  const libras = Math.max(porciones.librasMinimas, Math.ceil(invitados / porciones.porcionesPorLibra));
  let pisos = 3;
  for (const [n, max] of Object.entries(porciones.maxLibrasPorPisos)) {
    if (libras <= max) {
      pisos = Number(n);
      break;
    }
  }
  return { libras, pisos };
}

// Fechas como texto AAAA-MM-DD en hora local, para comparar sin líos de zona horaria.
export function aTextoFecha(d: Date) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export function primeraFechaDisponible(hoy = new Date()) {
  const d = new Date(hoy);
  d.setDate(d.getDate() + disponibilidad.diasMinimosAnticipacion);
  while (disponibilidad.fechasLlenas.includes(aTextoFecha(d))) d.setDate(d.getDate() + 1);
  return aTextoFecha(d);
}

export type EstadoFecha = { ok: true } | { ok: false; motivo: string };

export function revisarFecha(fecha: string, hoy = new Date()): EstadoFecha {
  if (!fecha) return { ok: false, motivo: "Elige la fecha del evento." };
  const minima = new Date(hoy);
  minima.setDate(minima.getDate() + disponibilidad.diasMinimosAnticipacion);
  if (fecha < aTextoFecha(minima)) {
    return {
      ok: false,
      motivo: `Doloris necesita al menos ${disponibilidad.diasMinimosAnticipacion} días de anticipación. Escríbele de todas formas si es urgente.`,
    };
  }
  if (disponibilidad.fechasLlenas.includes(fecha)) {
    return { ok: false, motivo: "Ese día ya no hay cupo. Prueba otra fecha cercana." };
  }
  return { ok: true };
}

export function fechaLarga(fecha: string) {
  const [a, m, d] = fecha.split("-").map(Number);
  return new Date(a, m - 1, d).toLocaleDateString("es", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
