import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800/80 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Analisador<span className="text-[#cf4ce1]">.</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm text-zinc-400">
          <Link className="rounded-lg px-3 py-2 hover:bg-white/5 hover:text-white" href="/companies">Empresas</Link>
          <Link className="rounded-lg px-3 py-2 hover:bg-white/5 hover:text-white" href="/compare">Comparar</Link>
        </nav>
      </div>
    </header>
  );
}