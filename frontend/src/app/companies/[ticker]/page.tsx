import Link from "next/link";
import { api } from "@/services/api";
import IndicatorCard from "@/components/IndicatorCard";
import FinancialTable from "@/components/FinancialTable";
import PriceTable from "@/components/PriceTable";
import DividendTable from "@/components/DividendTable";
import { FinancialCharts, PriceChart } from "@/components/Charts";
import ErrorState from "@/components/ErrorState";
import { formatCnpj, formatNumber, formatPercent } from "@/lib/format";

export default async function CompanyPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params;
  const normalizedTicker = ticker.toUpperCase();

  try {
    const [company, indicators, financials, prices, dividends] = await Promise.all([
      api.getCompany(normalizedTicker),
      api.getIndicators(normalizedTicker),
      api.getFinancials(normalizedTicker),
      api.getPrices(normalizedTicker),
      api.getDividends(normalizedTicker)
    ]);

    return (
      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <Link href="/companies" className="text-sm text-zinc-600 hover:text-white">← Empresas</Link>

        <section className="mt-8 flex flex-col justify-between gap-6 border-b border-neutral-900 pb-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight">{company.name ?? company.legalName}</h1>
              <span className="rounded-lg border border-neutral-800 bg-neutral-950 px-2.5 py-1 text-sm font-semibold text-[#cf4ce1]">{company.ticker}</span>
            </div>
            <p className="mt-3 max-w-2xl text-sm text-zinc-500">{company.legalName}</p>
          </div>
          <div className="text-sm text-zinc-600">
            <p>{company.sector}</p>
            <p className="mt-1">{company.segment}</p>
          </div>
        </section>

        <section className="grid gap-3 border-b border-neutral-900 py-7 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div><p className="text-zinc-600">CNPJ</p><p className="mt-1 text-zinc-300">{formatCnpj(company.cnpj)}</p></div>
          <div><p className="text-zinc-600">Situação</p><p className="mt-1 text-zinc-300">{company.status}</p></div>
          <div><p className="text-zinc-600">Setor</p><p className="mt-1 text-zinc-300">{company.sector}</p></div>
          <div><p className="text-zinc-600">Segmento</p><p className="mt-1 text-zinc-300">{company.segment}</p></div>
        </section>

        <section className="py-10">
          <div className="mb-5"><h2 className="text-xl font-semibold">Indicadores</h2><p className="mt-1 text-sm text-zinc-600">Principais métricas financeiras.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <IndicatorCard label="P/L" value={formatNumber(indicators.peRatio)} description="Preço da ação dividido pelo lucro por ação." />
            <IndicatorCard label="ROE" value={formatPercent(indicators.roe)} description="Retorno gerado sobre o patrimônio líquido." />
            <IndicatorCard label="Margem líquida" value={formatPercent(indicators.netMargin)} description="Parcela da receita que permanece como lucro." />
            <IndicatorCard label="Dívida / EBITDA" value={formatNumber(indicators.netDebtEbitda)} description="Relação entre dívida líquida e EBITDA." />
            <IndicatorCard label="Dividend Yield" value={formatPercent(indicators.dividendYield)} description="Dividendos por ação em relação ao preço." />
          </div>
        </section>

        <section className="space-y-5">
          <div><h2 className="text-xl font-semibold">Evolução financeira</h2><p className="mt-1 text-sm text-zinc-600">Histórico dos principais dados financeiros.</p></div>
          <FinancialCharts financials={financials} />
          {prices.length > 0 && <PriceChart prices={prices} />}
        </section>

        <section className="mt-12">
          <h2 className="mb-5 text-xl font-semibold">Histórico financeiro</h2>
          {financials.length ? <FinancialTable data={financials} /> : <p className="text-sm text-zinc-600">Nenhum histórico financeiro encontrado.</p>}
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-5 text-xl font-semibold">Preços históricos</h2>
            {prices.length ? <PriceTable data={prices} /> : <p className="text-sm text-zinc-600">Nenhum preço encontrado.</p>}
          </div>
          <div>
            <h2 className="mb-5 text-xl font-semibold">Dividendos</h2>
            {dividends.length ? <DividendTable data={dividends} /> : <p className="text-sm text-zinc-600">Nenhum dividendo encontrado.</p>}
          </div>
        </section>

        <p className="mt-12 border-t border-neutral-900 pt-6 text-xs leading-5 text-zinc-700">
          Os indicadores são apresentados como informação histórica para análise. Eles não representam garantia de retorno futuro nem recomendação de investimento.
        </p>
      </main>
    );
  } catch {
    return <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><ErrorState message={`Não foi possível carregar ${normalizedTicker}.`} /></main>;
  }
}