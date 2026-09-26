export interface Company {
  ticker: string;
  name?: string;
  legalName: string;
  cnpj: string;
  sector: string;
  segment: string;
  status: string;
}

export interface CompanyIndicators {
  ticker: string;
  peRatio: number;
  roe: number;
  netMargin: number;
  netDebtEbitda: number;
  dividendYield: number;
}

export interface FinancialIndicator {
  referenceDate: string;
  revenue: number;
  netIncome: number;
  equity: number;
  ebitda: number;
  netDebt: number;
  earningsPerShare: number;
}

export interface StockPrice {
  date: string;
  closePrice: number;
}

export interface Dividend {
  paymentDate: string;
  amountPerShare: number;
}

export interface Estatistica {
  empresas: number;
  indicadores: number;
  precos: number;
  dividendos: number;
}
export interface CompareResult extends CompanyIndicators {}