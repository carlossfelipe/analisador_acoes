import { Dividend } from "@/types";
import { formatDate, formatNumber } from "@/lib/format";

export default function DividendTable({ data }: { data: Dividend[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-[#101010]">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-neutral-800 text-xs uppercase tracking-wider text-zinc-600">
          <tr><th className="px-5 py-4 font-medium">Pagamento</th><th className="px-5 py-4 font-medium">Valor por ação</th></tr>
        </thead>
        <tbody className="divide-y divide-neutral-900">
          {[...data].sort((a,b) => b.paymentDate.localeCompare(a.paymentDate)).map((item, index) => (
            <tr key={`${item.paymentDate}-${index}`} className="hover:bg-white/[0.02]">
              <td className="px-5 py-4 text-zinc-300">{formatDate(item.paymentDate)}</td>
              <td className="px-5 py-4 text-zinc-300">R$ {formatNumber(item.amountPerShare)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}