import Link from "next/link";
import { api } from "@/services/api";
import ErrorState from "@/components/ErrorState";

export default async function CompaniesPage() {
  try {
    const companies = await api.getCompanies();

    return (
      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#cf4ce1]">Mercado</p>
          <h1 className="mt-2 text-3xl font-bold">Empresas</h1>
          <p className="mt-2 text-sm text-zinc-500">Empresas disponíveis para consulta.</p>
        </div>

        {companies.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-neutral-800 p-10 text-center text-zinc-500">Nenhuma empresa encontrada.</div>
        ) : (
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <Link key={company.ticker} href={`/companies/${company.ticker}`} className="group rounded-2xl border border-neutral-800 bg-[#101010] p-6 hover:border-neutral-700">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">{company.ticker}</span>
                  <span className="text-zinc-700 transition group-hover:text-[#cf4ce1]">→</span>
                </div>
                <p className="mt-2 text-sm text-zinc-400">{company.name ?? company.legalName}</p>
                <div className="mt-8 flex justify-between text-xs text-zinc-600">
                  <span>{company.sector}</span>
                  <span>{company.status}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    );
  } catch {
    return <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><ErrorState /></main>;
  }
}