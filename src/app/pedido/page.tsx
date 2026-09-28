import type { Metadata } from "next";
import { deConsulta } from "@/lib/consulta";
import type { Modo } from "@/lib/pedido";
import Formulario from "./Formulario";

export const metadata: Metadata = { title: "Tu pedido · Hg Delicatessen Gourmet" };

const MODOS: Modo[] = ["igual", "parecido", "personalizado"];

export default async function PaginaPedido(props: PageProps<"/pedido">) {
  const sp = await props.searchParams;
  const modo = MODOS.find((m) => m === sp.modo) ?? "personalizado";
  const pastelId = typeof sp.pastel === "string" ? sp.pastel : undefined;
  return <Formulario key={`${modo}-${pastelId}`} modo={modo} pastelId={pastelId} respuestas={deConsulta(sp)} />;
}
