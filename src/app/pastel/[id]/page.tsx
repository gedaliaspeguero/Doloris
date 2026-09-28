import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CakeCard from "@/components/CakeCard";
import CakeImage from "@/components/CakeImage";
import { buscarPastel, colores, ocasiones, pasteles, temas } from "@/lib/catalogo";
import { aConsulta, deConsulta } from "@/lib/consulta";
import { porciones } from "@/lib/negocio";

export function generateStaticParams() {
  return pasteles.map((p) => ({ id: p.id }));
}

export async function generateMetadata(props: PageProps<"/pastel/[id]">): Promise<Metadata> {
  const pastel = buscarPastel((await props.params).id);
  return { title: pastel ? `${pastel.nombre} · Hg Delicatessen Gourmet` : "Bizcocho" };
}

export default async function DetallePastel(props: PageProps<"/pastel/[id]">) {
  const { id } = await props.params;
  const pastel = buscarPastel(id);
  if (!pastel) notFound();
  const respuestas = deConsulta(await props.searchParams);

  const etiquetas = [
    ...ocasiones.filter((o) => pastel.ocasiones.includes(o.id)).map((o) => `${o.emoji} ${o.nombre}`),
    ...temas.filter((t) => pastel.temas.includes(t.id)).map((t) => t.nombre),
    ...colores.filter((c) => pastel.colores.includes(c.id)).map((c) => c.nombre),
  ];
  const parecidos = pasteles
    .filter((p) => p.id !== pastel.id && p.ocasiones.some((o) => pastel.ocasiones.includes(o)))
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link href="/catalogo" className="text-sm font-bold text-tinta/60 hover:text-fucsia">
        ← Catálogo
      </Link>
      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-3 shadow-sm">
          <CakeImage pastel={pastel} sizes="(min-width: 768px) 480px, 100vw" />
        </div>
        <div>
          <h1 className="font-display text-4xl font-semibold leading-tight">{pastel.nombre}</h1>
          <p className="mt-2 text-tinta/60">
            {pastel.pisos} {pastel.pisos === 1 ? "piso" : "pisos"} · aprox. {pastel.libras} lb · unas {pastel.libras * porciones.porcionesPorLibra} porciones
          </p>
          <p className="mt-4 text-lg text-tinta/80">{pastel.descripcion}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {etiquetas.map((e) => (
              <span key={e} className="rounded-full bg-fucsia-suave px-3 py-1 text-sm font-semibold text-fucsia-oscuro">
                {e}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href={`/pedido${aConsulta(respuestas, { modo: "igual", pastel: pastel.id })}`}
              className="rounded-full bg-fucsia px-6 py-4 text-center text-lg font-bold text-white shadow-md hover:bg-fucsia-oscuro"
            >
              Lo quiero así
            </Link>
            <Link
              href={`/pedido${aConsulta(respuestas, { modo: "parecido", pastel: pastel.id })}`}
              className="rounded-full bg-white px-6 py-4 text-center text-lg font-bold ring-2 ring-fucsia hover:bg-fucsia-suave"
            >
              Parecido a este, pero…
            </Link>
            <p className="text-center text-sm text-tinta/60">Cambia colores, tema, número o tamaño. Doloris te confirma el precio.</p>
          </div>
        </div>
      </div>
      {parecidos.length > 0 && (
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold">También te puede gustar</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {parecidos.map((p) => (
              <CakeCard key={p.id} pastel={p} href={`/pastel/${p.id}${aConsulta(respuestas)}`} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
