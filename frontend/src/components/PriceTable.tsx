import { StockPrice } from "@/types";
import { formatDate, formatNumber } from "@/lib/format";

export default function PriceTable({ data }: { data: StockPrice[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-[#101010]">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-neutral-800 text-xs uppercase tracking-wider text-zinc-600">
          <tr><th className="px-5 py-4 font-medium">Data</th><th className="px-5 py-4 font-medium">Fechamento</th></tr>
        </thead>
        <tbody className="divide-y divide-neutral-900">
          {[...data].sort((a,b) => b.date.localeCompare(a.date)).map((item) => (
            <tr key={item.date} className="hover:bg-white/[0.02]">
              <td className="px-5 py-4 text-zinc-300">{formatDate(item.date)}</td>
              <td className="px-5 py-4 text-zinc-300">R$ {formatNumber(item.closePrice)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}