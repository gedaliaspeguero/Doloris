import type { Metadata } from "next";
import { ocasiones } from "@/lib/catalogo";
import { deConsulta } from "@/lib/consulta";
import Cuestionario from "./Cuestionario";

export const metadata: Metadata = { title: "¿Qué celebras? · Hg Delicatessen Gourmet" };

export default async function Descubre(props: PageProps<"/descubre">) {
  const { ocasion } = deConsulta(await props.searchParams);
  const valida = ocasiones.some((o) => o.id === ocasion) ? ocasion : undefined;
  return <Cuestionario inicial={{ ocasion: valida }} />;
}
