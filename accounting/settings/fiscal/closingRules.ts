// accounting/settings/fiscal/closingRules.ts

export interface ClosingRule {
  id: string;
  name: string;              // مثال: إقفال المصروفات
  description?: string;
  debitAccount: string;      // حساب المدين
  creditAccount: string;     // حساب الدائن
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// بيانات تجريبية (Mock Data)
export const closingRules: ClosingRule[] = [
  {
    id: "cr-1",
    name: "إقفال المصروفات",
    description: "نقل أرصدة المصروفات إلى حساب الأرباح والخسائر",
    debitAccount: "9999",
    creditAccount: "5000",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
