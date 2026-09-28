import Link from "next/link";
import type { Pastel } from "@/lib/catalogo";
import CakeImage from "./CakeImage";

export default function CakeCard({ pastel, destacado, href }: { pastel: Pastel; destacado?: boolean; href?: string }) {
  return (
    <Link
      href={href ?? `/pastel/${pastel.id}`}
      className="group flex flex-col gap-3 rounded-3xl bg-white p-3 shadow-sm ring-1 ring-tinta/5 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <CakeImage pastel={pastel} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" />
      <div className="px-1 pb-1">
        {destacado && <p className="text-xs font-bold uppercase tracking-wide text-turquesa">Muy parecido a lo que buscas</p>}
        <h3 className="font-display text-lg leading-tight text-tinta group-hover:text-fucsia">{pastel.nombre}</h3>
        <p className="mt-1 text-sm text-tinta/60">
          {pastel.pisos} {pastel.pisos === 1 ? "piso" : "pisos"} · aprox. {pastel.libras} lb
        </p>
      </div>
    </Link>
  );
}
