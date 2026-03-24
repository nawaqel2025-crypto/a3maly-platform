// accounting/settings/currencies/exchangeRates.ts

export interface ExchangeRate {
  id: string;
  fromCurrency: string;     // مثال: USD
  toCurrency: string;       // مثال: SAR
  rate: number;             // سعر الصرف
  date: string;             // تاريخ السعر
  createdAt: string;
  updatedAt: string;
}

// بيانات تجريبية (Mock Data)
export const exchangeRates: ExchangeRate[] = [
  {
    id: "rate-usd-sar",
    fromCurrency: "USD",
    toCurrency: "SAR",
    rate: 3.75,
    date: "2024-01-01",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
