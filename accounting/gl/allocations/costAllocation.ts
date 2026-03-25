// accounting/gl/allocations/costAllocation.ts

export interface CostAllocationLine {
  id: string;
  costCenterId: string;                // مركز التكلفة المستهدف
  percentage: number;                  // نسبة التوزيع
}

export interface CostAllocation {
  id: string;
  ruleId: string;                      // ربط بقواعد التوزيع
  sourceCostCenterId: string;          // مركز التكلفة المصدر
  lines: CostAllocationLine[];         // مراكز التكلفة المستهدفة
  createdAt: string;
  updatedAt: string;
}

export const costAllocations: CostAllocation[] = [
  {
    id: "ca-001",
    ruleId: "ar-001",
    sourceCostCenterId: "cc-001",
    lines: [
      { id: "ca-line-1", costCenterId: "cc-002", percentage: 60 },
      { id: "ca-line-2", costCenterId: "cc-003", percentage: 40 }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
