// Datos del negocio. Todo lo que Doloris podría querer cambiar sin tocar
// el resto de la app vive aquí.

export const negocio = {
  nombre: "Hg Delicatessen Gourmet",
  duena: "Doloris Henriquez",
  nombreCorto: "Doloris",
  lema: "Bizcochos, picaderas y postres con altos estándares de calidad",
  // Solo dígitos, con código de país (formato que exige wa.me).
  whatsapp: "13478244083",
  whatsappVisible: "+1 (347) 824-4083",
  instagram: "hg_delicatessen_gourmet",
  horario: [
    { dias: "Lunes a jueves", horas: "9:00 AM – 6:00 PM" },
    { dias: "Viernes a domingo", horas: "Mensajes se responden el lunes" },
  ],
};

export const disponibilidad = {
  // "Es recomendable siempre hacer su orden con mínimo 1 semana de anticipación."
  diasMinimosAnticipacion: 7,
  // Días sin cupo, en formato AAAA-MM-DD.
  fechasLlenas: [] as string[],
};

export const porciones = {
  // Estimado para bizcocho dominicano; Doloris confirma al cotizar.
  porcionesPorLibra: 10,
  librasMinimas: 1,
  // Hasta cuántas libras cabe en cada número de pisos.
  maxLibrasPorPisos: { 1: 4, 2: 8 } as Record<number, number>,
};

export const sabores = {
  bizcocho: ["Vainilla", "Chocolate", "Marmoleado", "Red velvet", "Naranja"],
  relleno: ["Piña", "Guayaba", "Dulce de leche", "Chocolate", "Crema pastelera", "Fresa"],
  cubierta: ["Suspiro (merengue)", "Buttercream", "Fondant", "Ganache de chocolate"],
};

export const INDECISO = "Lo decido con Doloris";
