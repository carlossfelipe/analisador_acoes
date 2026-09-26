import {
  Company,
  CompanyIndicators,
  FinancialIndicator,
  StockPrice,
  Dividend,
  CompareResult,
  Estatistica
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

async function requestDelete(path: string): Promise<void> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let message = `Erro ${response.status}`;

    try {
      const body = await response.json();
      message = body.message ?? message;
    } catch {}

    throw new Error(message);
  }
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
    ),


  getEstatisticas: () => request<Estatistica>(`/api/admin/statistics`),
  getEmpresas: () => request<Company[]>("/api/admin/companies"),
  deletarEmpresa: (ticker: string) => requestDelete(`/api/admin/companies/${encodeURIComponent(ticker)}`),

  

};