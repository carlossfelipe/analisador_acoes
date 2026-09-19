"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { FinancialIndicator, StockPrice } from "@/types";
import { formatCompactCurrency, formatDate, formatNumber } from "@/lib/format";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-neutral-800 bg-[#101010] p-5">
      <h3 className="mb-5 text-sm font-medium text-zinc-300">{title}</h3>
      <div className="h-72">{children}</div>
    </section>
  );
}

const tooltipStyle = {
  backgroundColor: "#111",
  border: "1px solid #292929",
  borderRadius: "12px",
  color: "#fff"
};

export function FinancialCharts({ financials }: { financials: FinancialIndicator[] }) {
  const data = [...financials].sort((a, b) => a.referenceDate.localeCompare(b.referenceDate)).map((item) => ({
    date: formatDate(item.referenceDate).slice(3),
    revenue: item.revenue,
    netIncome: item.netIncome,
    margin: item.revenue ? (item.netIncome / item.revenue) * 100 : 0
  }));

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card title="Evolução da receita">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid className="chart-grid" strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#71717a" fontSize={12} />
            <YAxis stroke="#71717a" fontSize={12} tickFormatter={(v) => `${(v / 1e9).toFixed(0)} bi`} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => formatCompactCurrency(Number(v))} />
            <Line type="monotone" dataKey="revenue" name="Receita" stroke="#cf4ce1" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Evolução do lucro líquido">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid className="chart-grid" strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#71717a" fontSize={12} />
            <YAxis stroke="#71717a" fontSize={12} tickFormatter={(v) => `${(v / 1e9).toFixed(0)} bi`} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => formatCompactCurrency(Number(v))} />
            <Line type="monotone" dataKey="netIncome" name="Lucro líquido" stroke="#fff" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Evolução da margem líquida">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid className="chart-grid" strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#71717a" fontSize={12} />
            <YAxis stroke="#71717a" fontSize={12} tickFormatter={(v) => `${v}%`} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${formatNumber(Number(v))}%`} />
            <Line type="monotone" dataKey="margin" name="Margem líquida" stroke="#cf4ce1" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

export function PriceChart({ prices }: { prices: StockPrice[] }) {
  const data = [...prices].sort((a, b) => a.date.localeCompare(b.date)).map((item) => ({
    date: formatDate(item.date).slice(0, 5),
    price: item.closePrice
  }));

  return (
    <Card title="Histórico do preço de fechamento">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid className="chart-grid" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#71717a" fontSize={12} />
          <YAxis stroke="#71717a" fontSize={12} tickFormatter={(v) => `R$ ${Number(v).toFixed(0)}`} />
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => `R$ ${formatNumber(Number(v))}`} />
          <Line type="monotone" dataKey="price" name="Fechamento" stroke="#cf4ce1" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}