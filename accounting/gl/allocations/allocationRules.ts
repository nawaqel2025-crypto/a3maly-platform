// accounting/gl/allocations/allocationRules.ts

export interface AllocationRule {
  id: string;
  name: string;                        // مثال: توزيع مصاريف الكهرباء
  description?: string;
  basis: "percentage" | "fixed" | "driver";  
  driver?: string;                     // مثال: عدد الموظفين، المساحة
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const allocationRules: AllocationRule[] = [
  {
    id: "ar-001",
    name: "توزيع مصاريف الكهرباء",
    description: "توزيع المصاريف على الإدارات حسب عدد الموظفين",
    basis: "driver",
    driver: "employee_count",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
