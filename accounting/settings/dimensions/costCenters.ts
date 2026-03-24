// accounting/settings/dimensions/costCenters.ts

export interface CostCenter {
  id: string;
  code: string;              // مثال: CC-100
  name: string;              // اسم مركز التكلفة
  description?: string;
  parentId?: string;         // لدعم الهيكل الهرمي
  level: number;             // مستوى المركز في الهرم
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// بيانات تجريبية (Mock Data)
export const costCenters: CostCenter[] = [
  {
    id: "cc-001",
    code: "CC-001",
    name: "الإدارة العامة",
    description: "مركز تكلفة رئيسي",
    parentId: undefined,
    level: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cc-002",
    code: "CC-002",
    name: "المشاريع",
    parentId: "cc-001",
    level: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
