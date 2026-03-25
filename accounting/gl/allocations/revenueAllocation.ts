// accounting/gl/allocations/revenueAllocation.ts

export interface RevenueAllocationLine {
  id: string;
  departmentId: string;                // الإدارة المستهدفة
  percentage: number;                  // نسبة التوزيع
}

export interface RevenueAllocation {
  id: string;
  ruleId: string;                      // ربط بقواعد التوزيع
  sourceDepartmentId: string;          // الإدارة المصدر
  lines: RevenueAllocationLine[];
  createdAt: string;
  updatedAt: string;
}

export const revenueAllocations: RevenueAllocation[] = [
  {
    id: "ra-001",
    ruleId: "ar-001",
    sourceDepartmentId: "dep-001",
    lines: [
      { id: "ra-line-1", departmentId: "dep-002", percentage: 50 },
      { id: "ra-line-2", departmentId: "dep-003", percentage: 50 }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
