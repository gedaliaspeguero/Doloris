import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Inicio">
      <span className="font-display text-3xl font-black leading-none">
        <span className="text-fucsia">H</span>
        <span className="text-turquesa">G</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-script text-2xl text-turquesa">Gourmet</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-fucsia">Delicatessen</span>
      </span>
    </Link>
  );
}
