// accounting/settings/tax/taxGroups.ts

export interface TaxGroup {
  id: string;
  name: string;               // مثال: مجموعة الضرائب القياسية
  description?: string;
  taxCodeIds: string[];       // قائمة رموز الضرائب داخل المجموعة
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mock Data
export const taxGroups: TaxGroup[] = [
  {
    id: "tg-001",
    name: "المجموعة القياسية",
    description: "تحتوي على ضريبة القيمة المضافة الأساسية",
    taxCodeIds: ["tax-002"], // VAT15
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
