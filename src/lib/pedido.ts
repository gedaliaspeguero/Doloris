import { buscarPastel, nombreOcasion, publicos } from "./catalogo";
import { fechaLarga, sugerirTamano } from "./calculos";
import { INDECISO, negocio } from "./negocio";

export type Modo = "igual" | "parecido" | "personalizado";

export type Pedido = {
  modo: Modo;
  pastelId?: string;
  cambios: string;
  descripcion: string;
  ocasion: string;
  publico: string;
  edad: string;
  fecha: string;
  invitados: number;
  bizcocho: string;
  relleno: string;
  cubierta: string;
  alergias: string;
  entrega: "recoger" | "domicilio";
  direccion: string;
  nombre: string;
  notas: string;
  tieneReferencia: boolean;
};

export function mensajeWhatsApp(p: Pedido, sitio: string) {
  const pastel = buscarPastel(p.pastelId);
  const { libras, pisos } = sugerirTamano(p.invitados);
  const l: string[] = [`¡Hola ${negocio.nombreCorto}! 🎂 Quiero cotizar un bizcocho desde la app.`, ""];

  if (p.modo === "personalizado" || !pastel) {
    l.push("*Diseño personalizado*", p.descripcion.trim() || "(sin descripción)");
  } else if (p.modo === "igual") {
    l.push(`*Lo quiero igual a:* ${pastel.nombre}`, `${sitio}/pastel/${pastel.id}`);
  } else {
    l.push(`*Parecido a:* ${pastel.nombre}`, `${sitio}/pastel/${pastel.id}`);
    l.push(`*Cambios:* ${p.cambios.trim() || "(los hablamos)"}`);
  }
  l.push("");

  const ocasion = nombreOcasion(p.ocasion);
  if (ocasion) {
    const publico = publicos.find((x) => x.id === p.publico)?.nombre;
    const edad = p.edad && (p.ocasion === "aniversario" ? `${p.edad} años juntos` : `cumple ${p.edad}`);
    const extra = [publico, edad].filter(Boolean).join(", ");
    l.push(`• Ocasión: ${ocasion}${extra ? ` (${extra})` : ""}`);
  }
  if (p.fecha) l.push(`• Fecha del evento: ${fechaLarga(p.fecha)}`);
  l.push(`• Invitados: ${p.invitados} (aprox. ${libras} lb, ${pisos} ${pisos === 1 ? "piso" : "pisos"})`);
  const sabor = [
    p.bizcocho !== INDECISO && `Bizcocho ${p.bizcocho.toLowerCase()}`,
    p.relleno !== INDECISO && `relleno de ${p.relleno.toLowerCase()}`,
    p.cubierta !== INDECISO && `cubierta de ${p.cubierta.toLowerCase()}`,
  ].filter(Boolean);
  l.push(`• Sabor: ${sabor.length ? sabor.join(", ") : "lo conversamos"}`);
  l.push(`• Alergias: ${p.alergias.trim() || "Ninguna"}`);
  l.push(
    p.entrega === "domicilio"
      ? `• Entrega a domicilio: ${p.direccion.trim() || "(dirección por confirmar)"}`
      : "• Paso a recogerlo",
  );
  if (p.notas.trim()) l.push(`• Notas: ${p.notas.trim()}`);
  l.push("", `Mi nombre: ${p.nombre.trim()}`);
  if (p.tieneReferencia) l.push("", "📎 Tengo una foto de referencia, te la envío aquí mismo.");
  return l.join("\n");
}

export function enlaceWhatsApp(texto: string) {
  return `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(texto)}`;
}
