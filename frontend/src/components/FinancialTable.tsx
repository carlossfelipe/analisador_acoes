import { FinancialIndicator } from "@/types";
import { formatCompactCurrency, formatDate, formatNumber } from "@/lib/format";

export default function FinancialTable({ data }: { data: FinancialIndicator[] }) {
  const rows = [...data].sort((a, b) => b.referenceDate.localeCompare(a.referenceDate));

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-[#101010]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="border-b border-neutral-800 text-xs uppercase tracking-wider text-zinc-600">
            <tr>
              {["Data", "Receita", "Lucro líquido", "Patrimônio", "EBITDA", "Dívida líquida", "LPA"].map((h) => (
                <th key={h} className="px-5 py-4 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {rows.map((item) => (
              <tr key={item.referenceDate} className="hover:bg-white/[0.02]">
                <td className="px-5 py-4 text-zinc-300">{formatDate(item.referenceDate)}</td>
                <td className="px-5 py-4 text-zinc-300">{formatCompactCurrency(item.revenue)}</td>
                <td className="px-5 py-4 text-zinc-300">{formatCompactCurrency(item.netIncome)}</td>
                <td className="px-5 py-4 text-zinc-300">{formatCompactCurrency(item.equity)}</td>
                <td className="px-5 py-4 text-zinc-300">{formatCompactCurrency(item.ebitda)}</td>
                <td className="px-5 py-4 text-zinc-300">{formatCompactCurrency(item.netDebt)}</td>
                <td className="px-5 py-4 text-zinc-300">{formatNumber(item.earningsPerShare)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}