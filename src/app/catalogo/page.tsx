import type { Metadata } from "next";
import Galeria from "./Galeria";

export const metadata: Metadata = { title: "Catálogo · Hg Delicatessen Gourmet" };

export default function Catalogo() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-4xl font-semibold">Catálogo</h1>
      <p className="mt-2 text-tinta/70">Bizcochos que Doloris ya ha creado. Pídelo igual o parecido, con tus cambios.</p>
      <Galeria />
    </div>
  );
}
