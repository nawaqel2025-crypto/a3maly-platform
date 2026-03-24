// accounting/settings/dimensions/regions.ts

export interface Region {
  id: string;
  code: string;              // R-01
  name: string;              // المنطقة الوسطى
  description?: string;
  country?: string;          // الدولة
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mock Data
export const regions: Region[] = [
  {
    id: "reg-001",
    code: "R-01",
    name: "المنطقة الوسطى",
    description: "تشمل الرياض وما حولها",
    country: "السعودية",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "reg-002",
    code: "R-02",
    name: "المنطقة الغربية",
    description: "تشمل مكة وجدة والطائف",
    country: "السعودية",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
