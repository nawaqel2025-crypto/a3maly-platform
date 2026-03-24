// accounting/settings/tax/taxRules.ts

export interface TaxRule {
  id: string;
  name: string;               // مثال: ضريبة المبيعات المحلية
  description?: string;
  appliesTo: "sales" | "purchases" | "services" | "imports" | "exports";
  taxGroupId: string;         // ربط القاعدة بمجموعة ضرائب
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mock Data
export const taxRules: TaxRule[] = [
  {
    id: "tr-001",
    name: "ضريبة المبيعات المحلية",
    description: "تطبق على جميع المبيعات داخل السعودية",
    appliesTo: "sales",
    taxGroupId: "tg-001",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
