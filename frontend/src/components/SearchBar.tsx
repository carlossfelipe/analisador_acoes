"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Company } from "@/types";

export default function SearchBar({ companies }: { companies: Company[] }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return companies.filter((company) =>
      [company.ticker, company.name, company.legalName].some((field) =>
        field?.toLowerCase().includes(q)
      )
    ).slice(0, 6);
  }, [query, companies]);

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="flex items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-950 px-5 py-4 shadow-2xl shadow-black/30">
        <span className="text-zinc-500">⌕</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquise por ticker ou nome..."
          className="w-full bg-transparent text-white outline-none placeholder:text-zinc-600"
        />
        <kbd className="hidden rounded-md border border-neutral-800 px-2 py-1 text-xs text-zinc-600 sm:block">/</kbd>
      </div>

      {results.length > 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-2xl border border-neutral-800 bg-[#101010] shadow-2xl">
          {results.map((company) => (
            <button
              key={company.ticker}
              onClick={() => router.push(`/companies/${company.ticker}`)}
              className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-white/5"
            >
              <div>
                <p className="font-semibold text-white">{company.ticker}</p>
                <p className="text-sm text-zinc-500">{company.name ?? company.legalName}</p>
              </div>
              <span className="text-zinc-600">→</span>
            </button>
          ))}
        </div>
      )}

      {query.trim() && results.length === 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] rounded-2xl border border-neutral-800 bg-[#101010] p-5 text-sm text-zinc-500">
          Nenhuma empresa encontrada.
        </div>
      )}
    </div>
  );
}