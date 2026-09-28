"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import CakeImage from "@/components/CakeImage";
import { buscarPastel, ocasiones, publicos } from "@/lib/catalogo";
import { primeraFechaDisponible, revisarFecha, sugerirTamano } from "@/lib/calculos";
import type { Respuestas } from "@/lib/consulta";
import { disponibilidad, INDECISO, negocio, sabores } from "@/lib/negocio";
import { enlaceWhatsApp, mensajeWhatsApp, type Modo, type Pedido } from "@/lib/pedido";

type Props = { modo: Modo; pastelId?: string; respuestas: Respuestas };

export default function Formulario({ modo: modoInicial, pastelId, respuestas }: Props) {
  const pastel = buscarPastel(pastelId);
  const [p, setP] = useState<Pedido>({
    modo: pastel ? modoInicial : "personalizado",
    pastelId: pastel?.id,
    cambios: "",
    descripcion: "",
    ocasion: respuestas.ocasion ?? "",
    publico: respuestas.publico ?? "",
    edad: respuestas.edad ?? "",
    fecha: "",
    invitados: Number(respuestas.invitados) || 20,
    bizcocho: INDECISO,
    relleno: INDECISO,
    cubierta: INDECISO,
    alergias: "",
    entrega: "recoger",
    direccion: "",
    nombre: "",
    notas: "",
    tieneReferencia: false,
  });
  const [intento, setIntento] = useState(false);
  const [enlace, setEnlace] = useState<string | null>(null);

  const set = <K extends keyof Pedido>(k: K, v: Pedido[K]) => setP((x) => ({ ...x, [k]: v }));
  const fechaMinima = useMemo(() => primeraFechaDisponible(), []);
  const estadoFecha = p.fecha ? revisarFecha(p.fecha) : null;
  const fechaLlena = disponibilidad.fechasLlenas.includes(p.fecha);
  const tamano = sugerirTamano(p.invitados);
  const origen = useSyncExternalStore(sinSuscripcion, () => window.location.origin, () => "");
  const sitio = process.env.NEXT_PUBLIC_SITE_URL ?? origen;
  const mensaje = mensajeWhatsApp(p, sitio);

  const errores = {
    nombre: !p.nombre.trim() ? "Escribe tu nombre." : null,
    fecha: !p.fecha ? "Elige la fecha del evento." : fechaLlena ? "Ese día ya no hay cupo." : null,
    descripcion: p.modo === "personalizado" && p.descripcion.trim().length < 10 ? "Cuéntanos un poco más de tu idea." : null,
  };
  const valido = !Object.values(errores).some(Boolean);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    setIntento(true);
    if (!valido) return;
    // Un enlace normal en vez de window.open: los navegadores bloquean las ventanas emergentes.
    setEnlace(enlaceWhatsApp(mensaje));
    window.scrollTo({ top: 0 });
  }

  if (enlace) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-5xl">🎂</p>
        <h1 className="mt-4 font-display text-3xl font-semibold">¡Tu pedido está listo!</h1>
        <p className="mt-3 text-tinta/70">
          Toca el botón para abrir WhatsApp con todos los detalles ya escritos. Luego pulsa <strong>enviar</strong> y{" "}
          {negocio.nombreCorto} te responderá con el precio.
          {p.tieneReferencia && " No olvides adjuntar tu foto de referencia en el chat."}
        </p>
        <a href={enlace} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full bg-[#25D366] px-6 py-4 text-lg font-bold text-white shadow-md">
          Abrir WhatsApp
        </a>
        <pre className="mt-8 whitespace-pre-wrap rounded-2xl bg-white p-4 text-left font-sans text-sm text-tinta/80 ring-1 ring-tinta/5">{mensaje}</pre>
        <p className="mt-6 flex justify-center gap-6">
          <button type="button" onClick={() => setEnlace(null)} className="text-sm font-bold text-tinta/60 underline">
            Editar pedido
          </button>
          <Link href="/" className="text-sm font-bold text-tinta/60 underline">
            Volver al inicio
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="mx-auto max-w-3xl px-4 py-8" noValidate>
      <h1 className="font-display text-4xl font-semibold">Tu pedido</h1>
      <p className="mt-2 text-tinta/70">Completa los detalles y se lo enviamos a {negocio.nombreCorto} por WhatsApp para que te cotice.</p>

      <Bloque titulo="Tu bizcocho">
        {pastel && (
          <div className="flex gap-4">
            <div className="w-28 shrink-0 sm:w-36">
              <CakeImage pastel={pastel} sizes="144px" compacta />
            </div>
            <div className="flex-1">
              <p className="font-display text-xl">{pastel.nombre}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(["igual", "parecido"] as const).map((m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => set("modo", m)}
                    className={`rounded-full px-4 py-2 text-sm font-bold ring-1 ${
                      p.modo === m ? "bg-fucsia text-white ring-fucsia" : "bg-white ring-tinta/15"
                    }`}
                  >
                    {m === "igual" ? "Lo quiero así" : "Parecido, con cambios"}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => set("modo", "personalizado")}
                  className={`rounded-full px-4 py-2 text-sm font-bold ring-1 ${
                    p.modo === "personalizado" ? "bg-fucsia text-white ring-fucsia" : "bg-white ring-tinta/15"
                  }`}
                >
                  Otro diseño
                </button>
              </div>
            </div>
          </div>
        )}
        {p.modo === "parecido" && (
          <Campo etiqueta="¿Qué le cambiarías?" ayuda="Colores, tema, personaje, número, nombre, tamaño…">
            <textarea
              rows={3}
              value={p.cambios}
              onChange={(e) => set("cambios", e.target.value)}
              placeholder="Ej.: En vez de rosa, lila; y con el nombre Sofía"
              className={entrada}
            />
          </Campo>
        )}
        {p.modo === "personalizado" && (
          <Campo etiqueta="Describe tu bizcocho soñado" error={intento ? errores.descripcion : null}>
            <textarea
              rows={5}
              value={p.descripcion}
              onChange={(e) => set("descripcion", e.target.value)}
              placeholder="Ej.: Dos pisos, blanco con flores lilas, un unicornio dorado arriba y el nombre Valentina"
              className={entrada}
            />
          </Campo>
        )}
        <label className="mt-4 flex items-start gap-3 text-sm">
          <input type="checkbox" checked={p.tieneReferencia} onChange={(e) => set("tieneReferencia", e.target.checked)} className="mt-1 h-4 w-4 accent-fucsia" />
          <span>
            <strong>Tengo una foto de referencia.</strong> La podrás adjuntar en el chat de WhatsApp.
          </span>
        </label>
      </Bloque>

      <Bloque titulo="La celebración">
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo etiqueta="Ocasión">
            <select value={p.ocasion} onChange={(e) => set("ocasion", e.target.value)} className={entrada}>
              <option value="">Elige una</option>
              {ocasiones.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.nombre}
                </option>
              ))}
            </select>
          </Campo>
          {p.ocasion === "cumpleanos" && (
            <Campo etiqueta="¿Para quién?">
              <select value={p.publico} onChange={(e) => set("publico", e.target.value)} className={entrada}>
                <option value="">—</option>
                {publicos.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.nombre}
                  </option>
                ))}
              </select>
            </Campo>
          )}
          {(p.ocasion === "cumpleanos" || p.ocasion === "aniversario") && (
            <Campo etiqueta={p.ocasion === "aniversario" ? "Años juntos" : "Edad que cumple"}>
              <input type="number" min={1} inputMode="numeric" value={p.edad} onChange={(e) => set("edad", e.target.value)} className={entrada} />
            </Campo>
          )}
          <Campo
            etiqueta="Fecha del evento"
            error={intento ? errores.fecha : null}
            aviso={estadoFecha && !estadoFecha.ok && !fechaLlena ? estadoFecha.motivo : null}
          >
            <input type="date" min={fechaMinima} value={p.fecha} onChange={(e) => set("fecha", e.target.value)} className={entrada} />
          </Campo>
          <Campo etiqueta="Invitados" ayuda={`Sugerido: unas ${tamano.libras} lb, ${tamano.pisos} ${tamano.pisos === 1 ? "piso" : "pisos"}`}>
            <input
              type="number"
              min={1}
              inputMode="numeric"
              value={p.invitados}
              onChange={(e) => set("invitados", Math.max(1, Number(e.target.value) || 1))}
              className={entrada}
            />
          </Campo>
        </div>
      </Bloque>

      <Bloque titulo="Sabor">
        <div className="grid gap-4 sm:grid-cols-3">
          <Selector etiqueta="Bizcocho" valor={p.bizcocho} opciones={sabores.bizcocho} onCambio={(v) => set("bizcocho", v)} />
          <Selector etiqueta="Relleno" valor={p.relleno} opciones={sabores.relleno} onCambio={(v) => set("relleno", v)} />
          <Selector etiqueta="Cubierta" valor={p.cubierta} opciones={sabores.cubierta} onCambio={(v) => set("cubierta", v)} />
        </div>
        <Campo etiqueta="Alergias o restricciones" ayuda="Nueces, lácteos, gluten, sin azúcar…">
          <input value={p.alergias} onChange={(e) => set("alergias", e.target.value)} placeholder="Ninguna" className={entrada} />
        </Campo>
      </Bloque>

      <Bloque titulo="Entrega y contacto">
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["recoger", "Paso a recogerlo"],
              ["domicilio", "Entrega a domicilio"],
            ] as const
          ).map(([v, t]) => (
            <button
              type="button"
              key={v}
              onClick={() => set("entrega", v)}
              className={`rounded-full px-4 py-2 font-bold ring-1 ${p.entrega === v ? "bg-turquesa text-white ring-turquesa" : "bg-white ring-tinta/15"}`}
            >
              {t}
            </button>
          ))}
        </div>
        {p.entrega === "domicilio" && (
          <Campo etiqueta="Dirección">
            <input value={p.direccion} onChange={(e) => set("direccion", e.target.value)} className={entrada} />
          </Campo>
        )}
        <Campo etiqueta="Tu nombre" error={intento ? errores.nombre : null}>
          <input value={p.nombre} onChange={(e) => set("nombre", e.target.value)} autoComplete="name" className={entrada} />
        </Campo>
        <Campo etiqueta="Algo más que Doloris deba saber">
          <textarea rows={2} value={p.notas} onChange={(e) => set("notas", e.target.value)} className={entrada} />
        </Campo>
      </Bloque>

      <details className="mt-6 rounded-2xl bg-white p-4 text-sm ring-1 ring-tinta/5">
        <summary className="cursor-pointer font-bold">Ver el mensaje que le llegará</summary>
        <pre className="mt-3 whitespace-pre-wrap font-sans text-tinta/80">{mensaje}</pre>
      </details>

      {intento && !valido && <p className="mt-6 font-bold text-fucsia-oscuro">Revisa los campos marcados arriba.</p>}
      <button className="mt-6 w-full rounded-full bg-[#25D366] px-6 py-4 text-lg font-bold text-white shadow-md hover:brightness-95 sm:w-auto">
        Continuar a WhatsApp
      </button>
      <p className="mt-3 text-sm text-tinta/60">
        {negocio.horario.map((h) => `${h.dias}: ${h.horas}`).join(" · ")}
      </p>
    </form>
  );
}

const sinSuscripcion = () => () => {};

const entrada = "w-full rounded-xl border border-tinta/15 bg-white px-3 py-2.5 text-base focus:border-fucsia focus:outline-none";

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <fieldset className="mt-6 rounded-3xl bg-white/70 p-5 ring-1 ring-tinta/5">
      <legend className="px-1 font-display text-xl font-semibold">{titulo}</legend>
      <div className="flex flex-col gap-4">{children}</div>
    </fieldset>
  );
}

function Campo(props: { etiqueta: string; ayuda?: string; error?: string | null; aviso?: string | null; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-bold">{props.etiqueta}</span>
      {props.children}
      {props.ayuda && <span className="mt-1 block text-xs text-tinta/60">{props.ayuda}</span>}
      {props.aviso && <span className="mt-1 block text-xs font-semibold text-amber-700">{props.aviso}</span>}
      {props.error && <span className="mt-1 block text-xs font-bold text-fucsia-oscuro">{props.error}</span>}
    </label>
  );
}

function Selector(props: { etiqueta: string; valor: string; opciones: string[]; onCambio: (v: string) => void }) {
  return (
    <Campo etiqueta={props.etiqueta}>
      <select value={props.valor} onChange={(e) => props.onCambio(e.target.value)} className={entrada}>
        <option>{INDECISO}</option>
        {props.opciones.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </Campo>
  );
}
