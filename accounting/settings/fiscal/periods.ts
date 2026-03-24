// accounting/settings/fiscal/periods.ts

export interface FiscalPeriod {
  id: string;
  fiscalYearId: string;      // ربط الفترة بالسنة المالية
  name: string;              // مثال: الربع الأول، الفترة 1
  startDate: string;
  endDate: string;
  isClosed: boolean;
  createdAt: string;
  updatedAt: string;
}

// بيانات تجريبية (Mock Data)
export const fiscalPeriods: FiscalPeriod[] = [
  {
    id: "p1-2024",
    fiscalYearId: "fy-2024",
    name: "الفترة 1",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    isClosed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
