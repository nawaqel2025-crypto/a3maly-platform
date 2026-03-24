// accounting/settings/currencies/revaluationRules.ts

export interface RevaluationRule {
  id: string;
  name: string;               // مثال: إعادة تقييم الأرصدة بالدولار
  description?: string;
  currency: string;           // العملة المستهدفة
  gainAccount: string;        // حساب أرباح فروقات العملة
  lossAccount: string;        // حساب خسائر فروقات العملة
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// بيانات تجريبية (Mock Data)
export const revaluationRules: RevaluationRule[] = [
  {
    id: "rev-usd",
    name: "إعادة تقييم الأرصدة بالدولار",
    description: "تطبيق فروقات العملة على الحسابات المدينة والدائنة",
    currency: "USD",
    gainAccount: "4100",     // مثال: أرباح فروقات العملة
    lossAccount: "5100",     // مثال: خسائر فروقات العملة
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
