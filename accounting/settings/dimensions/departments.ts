// accounting/settings/dimensions/departments.ts

export interface Department {
  id: string;
  code: string;              // DEP-10
  name: string;              // إدارة تقنية المعلومات
  manager?: string;          // مدير الإدارة
  parentId?: string;         // دعم الهيكل الإداري الهرمي
  costCenterId?: string;     // ربط الإدارة بمركز تكلفة
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mock Data
export const departments: Department[] = [
  {
    id: "dep-001",
    code: "DEP-001",
    name: "إدارة تقنية المعلومات",
    manager: "محمد العتيبي",
    costCenterId: "cc-001",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "dep-002",
    code: "DEP-002",
    name: "إدارة الموارد البشرية",
    manager: "سارة القحطاني",
    costCenterId: "cc-001",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
