"use client";

import { useState } from "react";
import { Company, CompareResult } from "@/types";
import { api } from "@/services/api";
import { formatNumber, formatPercent } from "@/lib/format";

export default function CompareClient({ companies }: { companies: Company[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<CompareResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggle(ticker: string) {
    setSelected((current) =>
      current.includes(ticker)
        ? current.filter((x) => x !== ticker)
        : current.length < 5 ? [...current, ticker] : current
    );
    setResult(null);
  }

  async function compare() {
    if (selected.length < 2) return;
    setLoading(true);
    setError("");
    try {
      setResult(await api.compareCompanies(selected));
    } catch {
      setError("Não foi possível realizar a comparação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => {
          const active = selected.includes(company.ticker);
          return (
            <button
              key={company.ticker}
              onClick={() => toggle(company.ticker)}
              className={`rounded-2xl border p-5 text-left transition ${
                active ? "border-[#cf4ce1]/60 bg-[#cf4ce1]/5" : "border-neutral-800 bg-[#101010] hover:border-neutral-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold">{company.ticker}</span>
                <span className={`h-5 w-5 rounded-full border ${active ? "border-[#cf4ce1] bg-[#cf4ce1]" : "border-neutral-700"}`}>
                  {active && <span className="block text-center text-xs text-black">✓</span>}
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-500">{company.name ?? company.legalName}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          disabled={selected.length < 2 || loading}
          onClick={compare}
          className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {loading ? "Comparando..." : "Comparar empresas"}
        </button>
        <span className="text-sm text-zinc-600">{selected.length} selecionada(s)</span>
      </div>

      {error && <p className="mt-5 text-sm text-red-300">{error}</p>}

      {result && result.length > 0 && (
        <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-800 bg-[#101010]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead className="border-b border-neutral-800">
                <tr>
                  <th className="px-5 py-4 text-xs uppercase tracking-wider text-zinc-600">Indicador</th>
                  {result.map((item) => <th key={item.ticker} className="px-5 py-4 text-sm">{item.ticker}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-sm">
                <Row label="P/L" values={result.map((x) => formatNumber(x.peRatio))} />
                <Row label="ROE" values={result.map((x) => formatPercent(x.roe))} />
                <Row label="Margem líquida" values={result.map((x) => formatPercent(x.netMargin))} />
                <Row label="Dívida / EBITDA" values={result.map((x) => formatNumber(x.netDebtEbitda))} />
                <Row label="Dividend Yield" values={result.map((x) => formatPercent(x.dividendYield))} />
              </tbody>
            </table>
          </div>
        </div>
      )}

      {result && result.length === 0 && <p className="mt-8 text-sm text-zinc-600">Nenhum dado encontrado para a comparação.</p>}
    </div>
  );
}

function Row({ label, values }: { label: string; values: string[] }) {
  return (
    <tr className="hover:bg-white/[0.02]">
      <td className="px-5 py-4 text-zinc-400">{label}</td>
      {values.map((value, index) => <td key={index} className="px-5 py-4 text-zinc-200">{value}</td>)}
    </tr>
  );
}