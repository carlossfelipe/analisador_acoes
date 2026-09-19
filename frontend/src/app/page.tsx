import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import { api } from "@/services/api";

export default async function Home() {
  let companies = [];
  try {
    companies = await api.getCompanies();
  } catch {}

  return (
    <main>
      <section className="border-b border-neutral-900">
        <div className="mx-auto max-w-7xl px-5 pb-24 pt-24 lg:px-8 lg:pb-32 lg:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1 text-xs text-zinc-500">
              Dados para análise fundamentalista
            </div>
            <h1 className="text-5xl font-bold tracking-[-0.04em] text-white sm:text-7xl">
              Analisador de<span className="text-[#cf4ce1]"> Ações</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg">
              Consulte indicadores e informações financeiras de empresas listadas na bolsa brasileira.
            </p>
            <div className="mt-10">
              <SearchBar companies={companies} />
            </div>
            <p className="mt-4 text-xs text-zinc-700">Pesquise por ticker ou nome da empresa</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#cf4ce1]">Explore</p>
            <h2 className="mt-2 text-2xl font-semibold">Empresas disponíveis</h2>
          </div>
          <Link href="/companies" className="text-sm text-zinc-500 hover:text-white">Ver todas →</Link>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {companies.slice(0, 3).map((company) => (
            <Link key={company.ticker} href={`/companies/${company.ticker}`} className="rounded-2xl border border-neutral-800 bg-[#101010] p-6 hover:border-neutral-700 hover:bg-[#141414]">
              <p className="text-lg font-bold">{company.ticker}</p>
              <p className="mt-1 text-sm text-zinc-500">{company.name ?? company.legalName}</p>
              <p className="mt-8 text-xs text-zinc-700">{company.sector}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-neutral-900">
        <div className="mx-auto max-w-7xl px-5 py-12 text-sm text-zinc-600 lg:px-8">
          Informações apresentadas para fins de consulta e análise. O sistema não realiza recomendações de compra ou venda.
        </div>
      </section>
    </main>
  );
}