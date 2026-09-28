"use client";

import Link from "next/link";
import { useState } from "react";
import CakeCard from "@/components/CakeCard";
import {
  colores,
  ocasiones,
  publicos,
  recomendar,
  temas,
  type Color,
  type Ocasion,
  type Publico,
  type Tema,
} from "@/lib/catalogo";
import { sugerirTamano } from "@/lib/calculos";
import { aConsulta, type Respuestas } from "@/lib/consulta";

type Paso = "ocasion" | "publico" | "edad" | "tema" | "color" | "invitados" | "resultados";

function pasosPara(r: Respuestas): Paso[] {
  const pasos: Paso[] = ["ocasion"];
  if (r.ocasion === "cumpleanos") pasos.push("publico", "edad");
  if (r.ocasion === "aniversario") pasos.push("edad");
  pasos.push("tema", "color", "invitados", "resultados");
  return pasos;
}

const EDADES: Record<string, string[]> = {
  bebe: ["1", "2", "3"],
  nino: ["4", "5", "6", "7", "8", "10", "12"],
  adolescente: ["13", "15", "16", "17"],
  adulto: ["18", "21", "30", "40", "50", "60", "70"],
  aniversario: ["1", "5", "10", "15", "20", "25", "50"],
};

export default function Cuestionario({ inicial }: { inicial: Respuestas }) {
  const [r, setR] = useState<Respuestas>({ invitados: "20", ...inicial });
  const [i, setI] = useState(inicial.ocasion ? 1 : 0);
  const pasos = pasosPara(r);
  const paso = pasos[Math.min(i, pasos.length - 1)];

  const avanzar = (cambio: Partial<Respuestas> = {}) => {
    setR((prev) => ({ ...prev, ...cambio }));
    setI((n) => n + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const total = pasos.length - 1;
  const progreso = Math.min(i, total) / total;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-3">
        {i > 0 && (
          <button onClick={() => setI((n) => n - 1)} className="rounded-full px-3 py-1 text-sm font-bold text-tinta/60 hover:text-fucsia">
            ← Atrás
          </button>
        )}
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-tinta/10">
          <div className="h-full rounded-full bg-fucsia transition-all" style={{ width: `${progreso * 100}%` }} />
        </div>
      </div>

      {paso === "ocasion" && (
        <Pregunta titulo="¿Qué vas a celebrar?">
          <Opciones>
            {ocasiones.map((o) => (
              <Opcion
                key={o.id}
                emoji={o.emoji}
                texto={o.nombre}
                activa={r.ocasion === o.id}
                onClick={() => avanzar({ ocasion: o.id, publico: undefined, edad: undefined })}
              />
            ))}
          </Opciones>
        </Pregunta>
      )}

      {paso === "publico" && (
        <Pregunta titulo="¿Para quién es el cumpleaños?">
          <Opciones>
            {publicos.map((p) => (
              <Opcion
                key={p.id}
                emoji={p.emoji}
                texto={p.nombre}
                detalle={p.detalle}
                activa={r.publico === p.id}
                onClick={() => avanzar({ publico: p.id, edad: undefined })}
              />
            ))}
          </Opciones>
        </Pregunta>
      )}

      {paso === "edad" && (
        <Edad
          titulo={r.ocasion === "aniversario" ? "¿Cuántos años cumplen juntos?" : "¿Qué edad cumple?"}
          sugeridas={EDADES[r.ocasion === "aniversario" ? "aniversario" : (r.publico ?? "adulto")]}
          valor={r.edad}
          onListo={(edad) => avanzar({ edad })}
        />
      )}

      {paso === "tema" && (
        <Pregunta titulo="¿Qué estilo te imaginas?">
          <Opciones>
            {temas.map((t) => (
              <Opcion key={t.id} emoji={t.emoji} texto={t.nombre} activa={r.tema === t.id} onClick={() => avanzar({ tema: t.id })} />
            ))}
            <Opcion emoji="🤷" texto="No sé todavía" activa={false} onClick={() => avanzar({ tema: undefined })} />
          </Opciones>
        </Pregunta>
      )}

      {paso === "color" && (
        <Pregunta titulo="¿Algún color favorito?">
          <Opciones>
            {colores.map((c) => (
              <button
                key={c.id}
                onClick={() => avanzar({ color: c.id })}
                className={`flex items-center gap-3 rounded-2xl bg-white px-4 py-4 text-left font-bold shadow-sm ring-2 transition hover:ring-fucsia ${
                  r.color === c.id ? "ring-fucsia" : "ring-transparent"
                }`}
              >
                <span className="h-8 w-8 shrink-0 rounded-full ring-1 ring-tinta/10" style={{ background: c.muestra }} />
                {c.nombre}
              </button>
            ))}
            <Opcion emoji="🎨" texto="Cualquiera" activa={false} onClick={() => avanzar({ color: undefined })} />
          </Opciones>
        </Pregunta>
      )}

      {paso === "invitados" && <Invitados valor={Number(r.invitados) || 20} onListo={(n) => avanzar({ invitados: String(n) })} />}

      {paso === "resultados" && <Resultados r={r} />}
    </div>
  );
}

function Pregunta({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">{titulo}</h1>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Opciones({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>;
}

function Opcion(props: { emoji: string; texto: string; detalle?: string; activa: boolean; onClick: () => void }) {
  return (
    <button
      onClick={props.onClick}
      className={`flex items-center gap-3 rounded-2xl bg-white px-4 py-4 text-left shadow-sm ring-2 transition hover:ring-fucsia ${
        props.activa ? "ring-fucsia" : "ring-transparent"
      }`}
    >
      <span className="text-3xl">{props.emoji}</span>
      <span>
        <span className="block font-bold">{props.texto}</span>
        {props.detalle && <span className="block text-sm text-tinta/60">{props.detalle}</span>}
      </span>
    </button>
  );
}

function Edad(props: { titulo: string; sugeridas: string[]; valor?: string; onListo: (edad?: string) => void }) {
  const [edad, setEdad] = useState(props.valor ?? "");
  return (
    <Pregunta titulo={props.titulo}>
      <div className="flex flex-wrap gap-2">
        {props.sugeridas.map((e) => (
          <button
            key={e}
            onClick={() => props.onListo(e)}
            className="h-14 w-14 rounded-2xl bg-white font-display text-xl font-bold shadow-sm ring-2 ring-transparent hover:ring-fucsia"
          >
            {e}
          </button>
        ))}
      </div>
      <form
        className="mt-6 flex flex-wrap items-center gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          props.onListo(edad || undefined);
        }}
      >
        <label className="text-sm font-bold text-tinta/70" htmlFor="edad">
          Otra:
        </label>
        <input
          id="edad"
          type="number"
          min={1}
          max={120}
          inputMode="numeric"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          className="w-24 rounded-xl border border-tinta/15 bg-white px-3 py-2 text-lg"
        />
        <button className="rounded-full bg-fucsia px-5 py-2 font-bold text-white">Seguir</button>
        <button type="button" onClick={() => props.onListo(undefined)} className="text-sm font-bold text-tinta/60 underline">
          Prefiero no decirlo
        </button>
      </form>
    </Pregunta>
  );
}

function Invitados({ valor, onListo }: { valor: number; onListo: (n: number) => void }) {
  const [n, setN] = useState(valor);
  const { libras, pisos } = sugerirTamano(n);
  return (
    <Pregunta titulo="¿Cuántos invitados esperas?">
      <div className="flex items-center gap-4">
        <button onClick={() => setN((x) => Math.max(1, x - 5))} className="h-12 w-12 rounded-full bg-white text-2xl font-bold shadow-sm" aria-label="Menos">
          −
        </button>
        <input
          type="number"
          min={1}
          inputMode="numeric"
          value={n}
          onChange={(e) => setN(Math.max(1, Number(e.target.value) || 1))}
          className="w-28 rounded-2xl border border-tinta/15 bg-white px-3 py-3 text-center font-display text-3xl"
          aria-label="Número de invitados"
        />
        <button onClick={() => setN((x) => x + 5)} className="h-12 w-12 rounded-full bg-white text-2xl font-bold shadow-sm" aria-label="Más">
          +
        </button>
      </div>
      <input type="range" min={5} max={200} step={5} value={Math.min(n, 200)} onChange={(e) => setN(Number(e.target.value))} className="mt-6 w-full accent-fucsia" />
      <div className="mt-6 rounded-3xl bg-turquesa-suave p-5">
        <p className="text-sm font-bold uppercase tracking-wide text-turquesa">Tamaño sugerido</p>
        <p className="mt-1 font-display text-2xl">
          Unas {libras} libras · {pisos} {pisos === 1 ? "piso" : "pisos"}
        </p>
        <p className="mt-1 text-sm text-tinta/60">Es un estimado; Doloris lo confirma al darte el precio.</p>
      </div>
      <button onClick={() => onListo(n)} className="mt-6 rounded-full bg-fucsia px-6 py-3 text-lg font-bold text-white shadow-md">
        Ver bizcochos →
      </button>
    </Pregunta>
  );
}

function Resultados({ r }: { r: Respuestas }) {
  const lista = recomendar({
    ocasion: r.ocasion as Ocasion | undefined,
    publico: r.publico as Publico | undefined,
    tema: r.tema as Tema | undefined,
    color: r.color as Color | undefined,
  });
  const mejor = lista[0]?.puntos ?? 0;
  const q = aConsulta(r);

  return (
    <section className="mt-8">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Bizcochos para ti</h1>
      <p className="mt-2 text-tinta/70">Elige uno para pedirlo igual o con tus cambios.</p>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {lista.map(({ pastel, puntos }) => (
          <CakeCard key={pastel.id} pastel={pastel} href={`/pastel/${pastel.id}${q}`} destacado={puntos === mejor && mejor >= 8} />
        ))}
      </div>
      <div className="mt-10 rounded-[2rem] bg-tinta p-6 text-white sm:p-8">
        <h2 className="font-display text-2xl">¿Ninguno es lo que buscas?</h2>
        <p className="mt-2 text-white/75">Describe tu idea y Doloris la revisa y te cotiza.</p>
        <Link href={`/pedido${aConsulta(r, { modo: "personalizado" })}`} className="mt-5 inline-block rounded-full bg-naranja px-6 py-3 font-bold text-tinta">
          Describir mi bizcocho
        </Link>
      </div>
    </section>
  );
}
