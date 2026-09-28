import { negocio } from "@/lib/negocio";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-tinta/5 bg-white/60">
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 text-sm text-tinta/70 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg text-tinta">{negocio.nombre}</p>
          <p className="mt-1">{negocio.lema}.</p>
        </div>
        <div>
          <p className="font-bold text-tinta">Horario de atención</p>
          {negocio.horario.map((h) => (
            <p key={h.dias}>
              {h.dias}: {h.horas}
            </p>
          ))}
        </div>
        <div>
          <p className="font-bold text-tinta">Contacto</p>
          <a className="block hover:text-fucsia" href={`https://wa.me/${negocio.whatsapp}`}>
            WhatsApp {negocio.whatsappVisible}
          </a>
          <a className="block hover:text-fucsia" href={`https://instagram.com/${negocio.instagram}`}>
            @{negocio.instagram}
          </a>
        </div>
      </div>
    </footer>
  );
}
