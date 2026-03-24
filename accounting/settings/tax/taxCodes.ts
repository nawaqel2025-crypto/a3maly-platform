// accounting/settings/tax/taxCodes.ts

export interface TaxCode {
  id: string;
  code: string;              // مثال: VAT5
  name: string;              // ضريبة القيمة المضافة 5%
  rate: number;              // نسبة الضريبة
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mock Data
export const taxCodes: TaxCode[] = [
  {
    id: "tax-001",
    code: "VAT5",
    name: "ضريبة القيمة المضافة 5%",
    rate: 5,
    description: "تطبق على معظم السلع والخدمات",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tax-002",
    code: "VAT15",
    name: "ضريبة القيمة المضافة 15%",
    rate: 15,
    description: "النسبة الأساسية في السعودية",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
