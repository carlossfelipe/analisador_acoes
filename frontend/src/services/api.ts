import {
  Company,
  CompanyIndicators,
  FinancialIndicator,
  StockPrice,
  Dividend,
  CompareResult
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { Accept: "application/json" },
    cache: "no-store"
  });

  if (!response.ok) {
    let message = `Erro ${response.status}`;
    try {
      const body = await response.json();
      message = body.message ?? message;
    } catch {}
    throw new Error(message);
  }

  return response.json();
}

export const api = {
  getCompanies: () => request<Company[]>("/api/companies"),
  getCompany: (ticker: string) =>
    request<Company>(`/api/companies/${encodeURIComponent(ticker)}`),
  getIndicators: (ticker: string) =>
    request<CompanyIndicators>(
      `/api/companies/${encodeURIComponent(ticker)}/indicators`
    ),
  getFinancials: (ticker: string) =>
    request<FinancialIndicator[]>(
      `/api/companies/${encodeURIComponent(ticker)}/financials`
    ),
  getPrices: (ticker: string) =>
    request<StockPrice[]>(
      `/api/companies/${encodeURIComponent(ticker)}/prices`
    ),
  getDividends: (ticker: string) =>
    request<Dividend[]>(
      `/api/companies/${encodeURIComponent(ticker)}/dividends`
    ),
  compareCompanies: (tickers: string[]) =>
    request<CompareResult[]>(
      `/api/companies/compare?tickers=${tickers.map(encodeURIComponent).join(",")}`
    )
};