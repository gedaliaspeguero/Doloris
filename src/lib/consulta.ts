// Respuestas del cuestionario que viajan en la URL, del cuestionario
// al detalle del pastel y de ahí al formulario de pedido.

export type Respuestas = {
  ocasion?: string;
  publico?: string;
  edad?: string;
  tema?: string;
  color?: string;
  invitados?: string;
};

const CLAVES: (keyof Respuestas)[] = ["ocasion", "publico", "edad", "tema", "color", "invitados"];

export function aConsulta(r: Respuestas, extra: Record<string, string> = {}) {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(extra)) q.set(k, v);
  for (const k of CLAVES) if (r[k]) q.set(k, r[k]!);
  const s = q.toString();
  return s ? `?${s}` : "";
}

export function deConsulta(sp: Record<string, string | string[] | undefined>): Respuestas {
  const r: Respuestas = {};
  for (const k of CLAVES) {
    const v = sp[k];
    if (typeof v === "string" && v) r[k] = v;
  }
  return r;
}
