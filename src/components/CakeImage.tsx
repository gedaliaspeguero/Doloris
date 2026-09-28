import Image from "next/image";
import type { Pastel } from "@/lib/catalogo";
import CakeArt from "./CakeArt";

export default function CakeImage({ pastel, sizes, compacta }: { pastel: Pastel; sizes: string; compacta?: boolean }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-2xl bg-crema-oscuro">
      {pastel.foto ? (
        <Image src={pastel.foto} alt={pastel.nombre} fill sizes={sizes} className="object-cover" />
      ) : (
        <CakeArt arte={pastel.arte} className="absolute inset-0 m-auto h-[88%] w-[88%]" />
      )}
      {pastel.ejemplo && !compacta && (
        <span className="absolute left-2 top-2 rounded-full bg-white/85 px-2 py-0.5 text-[11px] font-semibold text-tinta/70">
          Ilustración de ejemplo
        </span>
      )}
    </div>
  );
}
