// accounting/settings/currencies/currencyMaster.ts

export interface Currency {
  id: string;
  code: string;             // مثال: USD, SAR, EUR
  name: string;             // اسم العملة
  symbol: string;           // مثال: $, ر.س
  decimalPlaces: number;    // عدد المنازل العشرية
  isActive: boolean;        // هل العملة مفعّلة؟
  createdAt: string;
  updatedAt: string;
}

// بيانات تجريبية (Mock Data)
export const currencies: Currency[] = [
  {
    id: "cur-sar",
    code: "SAR",
    name: "الريال السعودي",
    symbol: "ر.س",
    decimalPlaces: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cur-usd",
    code: "USD",
    name: "الدولار الأمريكي",
    symbol: "$",
    decimalPlaces: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
