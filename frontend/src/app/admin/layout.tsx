import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex">
      <aside className="w-64 border-r border-white/10 bg-[#101010] fixed h-screen">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold">
            Analisador<span className="text-pink-500">.</span>
          </h1>

          <p className="text-xs text-gray-500 mt-1">
            Painel administrativo
          </p>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            href="/admin"
            className="block px-4 py-3 rounded-lg hover:bg-white/5 transition"
          >
            📊 Dashboard
          </Link>

          <Link
            href="/admin/empresas"
            className="block px-4 py-3 rounded-lg hover:bg-white/5 transition"
          >
            🏢 Empresas
          </Link>

          <Link
            href="/admin/indicadores"
            className="block px-4 py-3 rounded-lg hover:bg-white/5 transition"
          >
            📈 Indicadores
          </Link>

          <Link
            href="/admin/precos"
            className="block px-4 py-3 rounded-lg hover:bg-white/5 transition"
          >
            💹 Preços
          </Link>

          <Link
            href="/admin/dividendos"
            className="block px-4 py-3 rounded-lg hover:bg-white/5 transition"
          >
            💰 Dividendos
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link
            href="/"
            className="block px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
          >
            ← Voltar ao site
          </Link>
        </div>
      </aside>

      <main className="ml-64 flex-1">
        {children}
      </main>
    </div>
  );
}