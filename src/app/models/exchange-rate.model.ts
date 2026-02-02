export interface CurrentExchangeRateResponse {
  exchangeRate: number;
  fromSymbol: string;
  toSymbol: string;
  lastUpdatedAt: string;
  success: boolean;
  rateLimitExceeded: boolean;
}

export interface ExchangeRateData {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  closeDiffPercent?: number;
}

export interface DailyExchangeRateResponse {
  data: ExchangeRateData[];
  from: string;
  to: string;
  lastUpdatedAt: string;
  success: boolean;
  rateLimitExceeded: boolean;
}
