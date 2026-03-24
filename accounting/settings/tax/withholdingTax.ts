// accounting/settings/tax/withholdingTax.ts

export interface WithholdingTax {
  id: string;
  code: string;               // مثال: WHT5
  name: string;               // ضريبة استقطاع 5%
  rate: number;               // نسبة الاستقطاع
  description?: string;
  appliesTo: "services" | "contracts" | "rent" | "royalties";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mock Data
export const withholdingTaxes: WithholdingTax[] = [
  {
    id: "wht-001",
    code: "WHT5",
    name: "ضريبة استقطاع 5%",
    rate: 5,
    description: "تطبق على خدمات غير المقيم",
    appliesTo: "services",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
