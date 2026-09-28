import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-tinta/5 bg-crema/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Logo />
        <nav className="flex items-center gap-1 text-sm font-semibold sm:gap-3">
          <Link href="/catalogo" className="rounded-full px-3 py-2 text-tinta/70 hover:text-fucsia">
            Catálogo
          </Link>
          <Link href="/descubre" className="rounded-full bg-fucsia px-4 py-2 text-white shadow-sm hover:bg-fucsia-oscuro">
            Pedir
          </Link>
        </nav>
      </div>
    </header>
  );
}
