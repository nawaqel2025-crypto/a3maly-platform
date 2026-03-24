// accounting/settings/fiscal/fiscalYears.ts

export interface FiscalYear {
  id: string;
  name: string;              // مثال: السنة المالية 2024
  startDate: string;         // تاريخ البداية
  endDate: string;           // تاريخ النهاية
  isClosed: boolean;         // هل تم إقفال السنة؟
  createdAt: string;
  updatedAt: string;
}

// بيانات تجريبية (Mock Data) — سيتم استبدالها لاحقًا بقاعدة البيانات
export const fiscalYears: FiscalYear[] = [
  {
    id: "fy-2024",
    name: "السنة المالية 2024",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    isClosed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
