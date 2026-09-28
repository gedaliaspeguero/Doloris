// Catálogo de bizcochos y las categorías del cuestionario.
// Cuando lleguen las fotos de Instagram, cada pastel tendrá su `foto`
// y se quitará `ejemplo`.

export type Ocasion =
  | "cumpleanos"
  | "boda"
  | "aniversario"
  | "baby-shower"
  | "bautizo"
  | "graduacion"
  | "otra";

export type Publico = "bebe" | "nino" | "adolescente" | "adulto";

export type Tema =
  | "personajes"
  | "floral"
  | "fantasia"
  | "deportes"
  | "moderno"
  | "romantico";

export type Color = "rosa" | "azul" | "blanco-dorado" | "lila" | "verde" | "rojo" | "multicolor";

export type Adorno =
  | "flores"
  | "orejas"
  | "corazon"
  | "estrella"
  | "balon"
  | "birrete"
  | "cuerno"
  | "mariposa"
  | "paloma"
  | "osito"
  | "numero"
  | "escudo";

export type Arte = {
  pisos: 1 | 2 | 3;
  base: string;
  acento: string;
  borde: string;
  adorno: Adorno;
  chorreado?: boolean;
  numero?: string;
};

export type Pastel = {
  id: string;
  nombre: string;
  descripcion: string;
  ocasiones: Ocasion[];
  publicos: Publico[];
  temas: Tema[];
  colores: Color[];
  pisos: 1 | 2 | 3;
  libras: number;
  foto?: string;
  arte: Arte;
  // Ilustración provisional mientras llegan las fotos reales.
  ejemplo?: boolean;
};

export const ocasiones: { id: Ocasion; nombre: string; emoji: string }[] = [
  { id: "cumpleanos", nombre: "Cumpleaños", emoji: "🎂" },
  { id: "boda", nombre: "Boda", emoji: "💍" },
  { id: "aniversario", nombre: "Aniversario", emoji: "💕" },
  { id: "baby-shower", nombre: "Baby shower", emoji: "🍼" },
  { id: "bautizo", nombre: "Bautizo o comunión", emoji: "🕊️" },
  { id: "graduacion", nombre: "Graduación", emoji: "🎓" },
  { id: "otra", nombre: "Otra celebración", emoji: "🎉" },
];

export const publicos: { id: Publico; nombre: string; detalle: string; emoji: string }[] = [
  { id: "bebe", nombre: "Bebé", detalle: "1 a 3 años", emoji: "👶" },
  { id: "nino", nombre: "Niño o niña", detalle: "4 a 12 años", emoji: "🧒" },
  { id: "adolescente", nombre: "Adolescente", detalle: "13 a 17, quinceañera", emoji: "✨" },
  { id: "adulto", nombre: "Adulto", detalle: "18 en adelante", emoji: "🥂" },
];

export const temas: { id: Tema; nombre: string; emoji: string }[] = [
  { id: "personajes", nombre: "Personajes y caricaturas", emoji: "🐭" },
  { id: "fantasia", nombre: "Fantasía y princesas", emoji: "🦄" },
  { id: "floral", nombre: "Flores y elegancia", emoji: "🌸" },
  { id: "deportes", nombre: "Deportes y héroes", emoji: "⚽" },
  { id: "moderno", nombre: "Sencillo y moderno", emoji: "🤍" },
  { id: "romantico", nombre: "Romántico", emoji: "❤️" },
];

export const colores: { id: Color; nombre: string; muestra: string }[] = [
  { id: "rosa", nombre: "Rosa", muestra: "#F4A7C3" },
  { id: "azul", nombre: "Azul", muestra: "#9CC3E6" },
  { id: "blanco-dorado", nombre: "Blanco y dorado", muestra: "#E8C766" },
  { id: "lila", nombre: "Lila", muestra: "#C7A8E0" },
  { id: "verde", nombre: "Verde", muestra: "#8FCB9B" },
  { id: "rojo", nombre: "Rojo", muestra: "#D9474F" },
  { id: "multicolor", nombre: "Multicolor", muestra: "conic-gradient(#F4A7C3,#9CC3E6,#8FCB9B,#E8C766,#F4A7C3)" },
];

export const pasteles: Pastel[] = [
  {
    id: "stitch-angel",
    nombre: "Stitch y Angel, 6 años",
    descripcion:
      "Un piso alto en azul con chorreado rosa, Stitch y Angel abrazados, número en brillo, cono de galleta, macarons, piruleta y rosas.",
    ocasiones: ["cumpleanos"],
    publicos: ["nino"],
    temas: ["personajes"],
    colores: ["rosa", "azul"],
    pisos: 1,
    libras: 5,
    foto: "/pasteles/stitch-angel.jpg",
    arte: { pisos: 1, base: "#BFE3EC", acento: "#E86A9A", borde: "#F4A7C3", adorno: "numero", chorreado: true, numero: "6" },
  },
  {
    id: "carrusel-azul",
    nombre: "Carrusel azul y dorado",
    descripcion:
      "Tres pisos con caballitos de carrusel, hortensias azules y molduras doradas. Ideal para un primer añito o un baby shower de niño.",
    ocasiones: ["cumpleanos", "baby-shower", "bautizo"],
    publicos: ["bebe"],
    temas: ["fantasia", "floral"],
    colores: ["azul", "blanco-dorado"],
    pisos: 3,
    libras: 12,
    foto: "/pasteles/carrusel-azul.jpg",
    arte: { pisos: 3, base: "#A9C8EA", acento: "#FFFFFF", borde: "#D6B25E", adorno: "flores" },
  },
  {
    id: "minnie-rosa",
    nombre: "Minnie rosa de primer año",
    descripcion:
      "Dos pisos en rosa y blanco con orejitas y lazo de Minnie, número del año y siluetas en los laterales.",
    ocasiones: ["cumpleanos"],
    publicos: ["bebe", "nino"],
    temas: ["personajes"],
    colores: ["rosa"],
    pisos: 2,
    libras: 6,
    foto: "/pasteles/minnie-rosa.jpg",
    arte: { pisos: 2, base: "#F4A7C3", acento: "#FFFFFF", borde: "#F7D6E4", adorno: "orejas" },
  },
  {
    id: "boda-floral-dorada",
    nombre: "Boda floral blanca y dorada",
    descripcion: "Tres pisos blancos con detalles en hoja de oro y cascada de flores naturales.",
    ocasiones: ["boda", "aniversario"],
    publicos: ["adulto"],
    temas: ["floral", "romantico"],
    colores: ["blanco-dorado"],
    pisos: 3,
    libras: 15,
    arte: { pisos: 3, base: "#FFFDF8", acento: "#F3E9D6", borde: "#D6B25E", adorno: "flores" },
    ejemplo: true,
  },
  {
    id: "aniversario-corazon",
    nombre: "Aniversario de corazones",
    descripcion: "Dos pisos en rojo y blanco con corazón en el tope, perfecto para celebrar los años juntos.",
    ocasiones: ["aniversario", "boda", "otra"],
    publicos: ["adulto"],
    temas: ["romantico"],
    colores: ["rojo", "blanco-dorado"],
    pisos: 2,
    libras: 5,
    arte: { pisos: 2, base: "#FFFFFF", acento: "#D9474F", borde: "#D9474F", adorno: "corazon" },
    ejemplo: true,
  },
  {
    id: "quince-mariposas",
    nombre: "Quinceañera lila con mariposas",
    descripcion: "Dos pisos en tonos lila con mariposas, perlas y un toque de brillo.",
    ocasiones: ["cumpleanos"],
    publicos: ["adolescente"],
    temas: ["fantasia", "floral"],
    colores: ["lila"],
    pisos: 2,
    libras: 8,
    arte: { pisos: 2, base: "#C7A8E0", acento: "#F1E6FA", borde: "#FFFFFF", adorno: "mariposa", numero: "15" },
    ejemplo: true,
  },
  {
    id: "futbol-verde",
    nombre: "Cancha de fútbol",
    descripcion: "Un piso verde como cancha, con balón y el número del cumpleañero.",
    ocasiones: ["cumpleanos"],
    publicos: ["nino", "adolescente", "adulto"],
    temas: ["deportes"],
    colores: ["verde"],
    pisos: 1,
    libras: 3,
    arte: { pisos: 1, base: "#6DBE7C", acento: "#FFFFFF", borde: "#FFFFFF", adorno: "balon" },
    ejemplo: true,
  },
  {
    id: "unicornio-pastel",
    nombre: "Unicornio de colores",
    descripcion: "Un piso con cuerno dorado, orejitas y melena de merengue en colores pastel.",
    ocasiones: ["cumpleanos", "baby-shower"],
    publicos: ["bebe", "nino"],
    temas: ["fantasia"],
    colores: ["multicolor", "rosa", "lila"],
    pisos: 1,
    libras: 3,
    arte: { pisos: 1, base: "#FFFFFF", acento: "#F4A7C3", borde: "#C7A8E0", adorno: "cuerno" },
    ejemplo: true,
  },
  {
    id: "drip-dorado",
    nombre: "Drip de chocolate y dorado",
    descripcion: "Un piso alto con chorreado de chocolate, macarons y número en dorado. Moderno y elegante.",
    ocasiones: ["cumpleanos", "otra", "aniversario"],
    publicos: ["adulto", "adolescente"],
    temas: ["moderno"],
    colores: ["blanco-dorado"],
    pisos: 1,
    libras: 4,
    arte: { pisos: 1, base: "#F6EBDD", acento: "#5B3A29", borde: "#D6B25E", adorno: "numero", chorreado: true, numero: "30" },
    ejemplo: true,
  },
  {
    id: "graduacion-birrete",
    nombre: "Graduación con birrete",
    descripcion: "Un piso en negro y dorado con birrete y diploma. Se personaliza con el año y la carrera.",
    ocasiones: ["graduacion"],
    publicos: ["adolescente", "adulto"],
    temas: ["moderno"],
    colores: ["blanco-dorado"],
    pisos: 1,
    libras: 4,
    arte: { pisos: 1, base: "#2F2A2E", acento: "#FFFFFF", borde: "#D6B25E", adorno: "birrete" },
    ejemplo: true,
  },
  {
    id: "bautizo-paloma",
    nombre: "Bautizo celeste con paloma",
    descripcion: "Dos pisos blancos y celestes con palomita, perlas y el nombre del bebé.",
    ocasiones: ["bautizo"],
    publicos: ["bebe"],
    temas: ["moderno", "floral"],
    colores: ["azul", "blanco-dorado"],
    pisos: 2,
    libras: 6,
    arte: { pisos: 2, base: "#FFFFFF", acento: "#CFE3F5", borde: "#9CC3E6", adorno: "paloma" },
    ejemplo: true,
  },
  {
    id: "baby-shower-osito",
    nombre: "Baby shower con osito",
    descripcion: "Un piso en rosa suave con osito, globos y nubecitas. También se hace en azul.",
    ocasiones: ["baby-shower"],
    publicos: ["bebe"],
    temas: ["personajes"],
    colores: ["rosa", "azul"],
    pisos: 1,
    libras: 4,
    arte: { pisos: 1, base: "#F7C9D9", acento: "#FFFFFF", borde: "#FFFFFF", adorno: "osito" },
    ejemplo: true,
  },
  {
    id: "floral-rosa-50",
    nombre: "Floral rosa para celebrar",
    descripcion: "Un piso con rosas de buttercream y número dorado. Para cumpleaños de adulto o celebraciones.",
    ocasiones: ["cumpleanos", "aniversario", "otra"],
    publicos: ["adulto"],
    temas: ["floral", "romantico"],
    colores: ["rosa"],
    pisos: 1,
    libras: 4,
    arte: { pisos: 1, base: "#FBE3EC", acento: "#E86A9A", borde: "#D6B25E", adorno: "flores", numero: "50" },
    ejemplo: true,
  },
  {
    id: "superheroe",
    nombre: "Superhéroe",
    descripcion: "Dos pisos en azul y rojo con escudo y estrellas. Se adapta al héroe favorito.",
    ocasiones: ["cumpleanos"],
    publicos: ["nino"],
    temas: ["deportes", "personajes"],
    colores: ["azul", "rojo"],
    pisos: 2,
    libras: 6,
    arte: { pisos: 2, base: "#3F6FB5", acento: "#D9474F", borde: "#F2C94C", adorno: "escudo" },
    ejemplo: true,
  },
  {
    id: "estrellas-graduacion",
    nombre: "Celebración con estrellas",
    descripcion: "Un piso blanco con estrellas doradas. Sirve para graduaciones, despedidas y cualquier logro.",
    ocasiones: ["graduacion", "otra", "cumpleanos"],
    publicos: ["nino", "adolescente", "adulto"],
    temas: ["moderno"],
    colores: ["blanco-dorado", "azul"],
    pisos: 1,
    libras: 3,
    arte: { pisos: 1, base: "#FFFFFF", acento: "#1F3B63", borde: "#D6B25E", adorno: "estrella" },
    ejemplo: true,
  },
];

export function buscarPastel(id: string | null | undefined) {
  return pasteles.find((p) => p.id === id);
}

export function nombreOcasion(id: string | null | undefined) {
  return ocasiones.find((o) => o.id === id)?.nombre;
}

export type Preferencias = {
  ocasion?: Ocasion;
  publico?: Publico;
  tema?: Tema;
  color?: Color;
};

// Ordena el catálogo según las respuestas del cuestionario.
// Solo quedan los pasteles de la ocasión elegida (si hay alguno).
export function recomendar(pref: Preferencias) {
  const puntuados = pasteles.map((p) => {
    let puntos = 0;
    if (pref.ocasion && p.ocasiones.includes(pref.ocasion)) puntos += 5;
    if (pref.publico && p.publicos.includes(pref.publico)) puntos += 3;
    if (pref.tema && p.temas.includes(pref.tema)) puntos += 3;
    if (pref.color && p.colores.includes(pref.color)) puntos += 2;
    return { pastel: p, puntos };
  });
  const deLaOcasion = pref.ocasion
    ? puntuados.filter((x) => x.pastel.ocasiones.includes(pref.ocasion!))
    : puntuados;
  const lista = deLaOcasion.length > 0 ? deLaOcasion : puntuados;
  return lista.sort((a, b) => b.puntos - a.puntos);
}
