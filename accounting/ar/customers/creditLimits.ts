// accounting/ar/customers/creditLimits.ts

export type CreditRiskClass = "low" | "medium" | "high";

export interface CreditLimit {
  id: string;
  customerId: string;
  creditLimitAmount: number;     // الحد الائتماني
  currency: string;
  riskClass: CreditRiskClass;    // تصنيف المخاطر
  blocked: boolean;              // هل العميل موقوف ائتمانيًا؟
  reason?: string;               // سبب الإيقاف أو التعديل
  validFrom: string;
  validTo?: string;

  // Monitoring
  currentExposure: number;       // الرصيد المستخدم حاليًا
  overdueAmount: number;         // مبالغ متأخرة
  lastReviewDate?: string;       // آخر مراجعة للحد
  nextReviewDate?: string;

  createdAt: string;
  updatedAt: string;
}

export const creditLimits: CreditLimit[] = [
  {
    id: "cl-001",
    customerId: "cust-001",
    creditLimitAmount: 200000,
    currency: "SAR",
    riskClass: "medium",
    blocked: false,
    reason: "حد ائتماني مبدئي",
    validFrom: "2024-01-01",
    currentExposure: 75000,
    overdueAmount: 0,
    lastReviewDate: "2024-01-15",
    nextReviewDate: "2024-07-15",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
