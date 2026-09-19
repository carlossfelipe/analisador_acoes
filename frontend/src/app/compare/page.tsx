import { api } from "@/services/api";
import CompareClient from "@/components/CompareClient";
import ErrorState from "@/components/ErrorState";

export default async function ComparePage() {
  try {
    const companies = await api.getCompanies();
    return (
      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[#cf4ce1]">Análise</p>
        <h1 className="mt-2 text-3xl font-bold">Comparar empresas</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
          Selecione duas ou mais empresas para visualizar seus indicadores lado a lado.
        </p>
        <CompareClient companies={companies} />
        <p className="mt-12 border-t border-neutral-900 pt-6 text-xs leading-5 text-zinc-700">
          A comparação tem caráter informativo e não realiza classificação automática das empresas.
        </p>
      </main>
    );
  } catch {
    return <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><ErrorState /></main>;
  }
}