"use client";

import { useState } from "react";
import CakeCard from "@/components/CakeCard";
import { ocasiones, pasteles, temas, type Ocasion, type Tema } from "@/lib/catalogo";

export default function Galeria() {
  const [ocasion, setOcasion] = useState<Ocasion | null>(null);
  const [tema, setTema] = useState<Tema | null>(null);
  const lista = pasteles.filter((p) => (!ocasion || p.ocasiones.includes(ocasion)) && (!tema || p.temas.includes(tema)));

  return (
    <>
      <div className="mt-6 flex flex-col gap-3">
        <Chips opciones={ocasiones} valor={ocasion} onCambio={setOcasion} todas="Todas las ocasiones" />
        <Chips opciones={temas} valor={tema} onCambio={setTema} todas="Todos los estilos" />
      </div>
      {lista.length === 0 ? (
        <p className="mt-10 text-center text-tinta/60">No hay bizcochos con esa combinación todavía. Prueba otro filtro.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {lista.map((p) => (
            <CakeCard key={p.id} pastel={p} />
          ))}
        </div>
      )}
    </>
  );
}

function Chips<T extends string>(props: {
  opciones: { id: T; nombre: string; emoji: string }[];
  valor: T | null;
  onCambio: (v: T | null) => void;
  todas: string;
}) {
  const clase = (activo: boolean) =>
    `shrink-0 rounded-full px-4 py-2 text-sm font-bold ring-1 transition ${
      activo ? "bg-fucsia text-white ring-fucsia" : "bg-white text-tinta/70 ring-tinta/10 hover:ring-fucsia"
    }`;
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
      <button className={clase(props.valor === null)} onClick={() => props.onCambio(null)}>
        {props.todas}
      </button>
      {props.opciones.map((o) => (
        <button key={o.id} className={clase(props.valor === o.id)} onClick={() => props.onCambio(props.valor === o.id ? null : o.id)}>
          {o.emoji} {o.nombre}
        </button>
      ))}
    </div>
  );
}
