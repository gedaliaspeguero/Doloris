import Link from "next/link";
import CakeCard from "@/components/CakeCard";
import CakeImage from "@/components/CakeImage";
import { buscarPastel, ocasiones, pasteles } from "@/lib/catalogo";
import { disponibilidad, negocio } from "@/lib/negocio";

const pasos = [
  { n: "1", titulo: "Cuéntanos qué celebras", texto: "Unas preguntas rápidas: ocasión, edad, estilo y cuántos invitados." },
  { n: "2", titulo: "Elige o describe", texto: "Mira los bizcochos que Doloris ya ha hecho, pide uno parecido o describe tu idea." },
  { n: "3", titulo: "Recibe tu cotización", texto: "Tu pedido llega completo a su WhatsApp y ella te responde con el precio." },
];

export default function Inicio() {
  const portada = buscarPastel("stitch-angel")!;
  return (
    <>
      <section className="mx-auto grid max-w-5xl items-center gap-10 px-4 pb-12 pt-10 md:grid-cols-[1.1fr_0.9fr] md:pt-16">
        <div>
          <p className="font-script text-2xl text-turquesa">{negocio.nombre}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-[1.1] sm:text-5xl">
            El bizcocho de tu celebración, <span className="text-fucsia">hecho a mano</span> por {negocio.nombreCorto}.
          </h1>
          <p className="mt-4 max-w-md text-lg text-tinta/70">
            Responde unas preguntas y te mostramos los bizcochos que mejor encajan. ¿No está el tuyo? Lo diseñamos juntos.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/descubre" className="rounded-full bg-fucsia px-6 py-3 text-lg font-bold text-white shadow-md hover:bg-fucsia-oscuro">
              ¿Qué celebras? 🎉
            </Link>
            <Link href="/catalogo" className="rounded-full bg-white px-6 py-3 text-lg font-bold text-tinta ring-1 ring-tinta/10 hover:ring-fucsia">
              Ver catálogo
            </Link>
          </div>
          <p className="mt-4 text-sm text-tinta/60">
            Haz tu pedido con al menos {disponibilidad.diasMinimosAnticipacion} días de anticipación.
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-3 -rotate-3 rounded-[2rem] bg-fucsia-suave" />
          <div className="relative rotate-2 rounded-[2rem] bg-white p-3 shadow-xl">
            <CakeImage pastel={portada} sizes="(min-width: 768px) 384px, 90vw" />
            <p className="px-2 pb-1 pt-3 font-display text-lg">{portada.nombre}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4">
        <h2 className="font-display text-2xl font-semibold">Empieza por la ocasión</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ocasiones.map((o) => (
            <Link
              key={o.id}
              href={`/descubre?ocasion=${o.id}`}
              className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 font-bold shadow-sm ring-1 ring-tinta/5 hover:ring-fucsia"
            >
              <span className="text-2xl">{o.emoji}</span>
              {o.nombre}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-5xl px-4">
        <h2 className="font-display text-2xl font-semibold">Así funciona</h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          {pasos.map((p) => (
            <li key={p.n} className="rounded-3xl bg-turquesa-suave p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-turquesa font-bold text-white">{p.n}</span>
              <p className="mt-3 font-bold">{p.titulo}</p>
              <p className="mt-1 text-sm text-tinta/70">{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-14 max-w-5xl px-4">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold">Algunas creaciones</h2>
          <Link href="/catalogo" className="text-sm font-bold text-fucsia">
            Ver todas →
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {pasteles.slice(0, 4).map((p) => (
            <CakeCard key={p.id} pastel={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-5xl px-4">
        <div className="rounded-[2rem] bg-tinta px-6 py-10 text-center text-white sm:px-12">
          <h2 className="font-display text-3xl font-semibold">¿Tienes una idea diferente?</h2>
          <p className="mx-auto mt-3 max-w-lg text-white/75">
            Descríbela con tus palabras, adjunta una foto de referencia y {negocio.nombreCorto} te dirá si es posible y cuánto costaría.
          </p>
          <Link href="/pedido?modo=personalizado" className="mt-6 inline-block rounded-full bg-naranja px-6 py-3 font-bold text-tinta hover:brightness-105">
            Diseñar mi bizcocho
          </Link>
        </div>
      </section>
    </>
  );
}
