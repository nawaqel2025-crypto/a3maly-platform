// accounting/ar/collections/collectionPlans.ts

export type CollectionActionType =
  | "call"
  | "email"
  | "visit"
  | "promise_to_pay"
  | "legal_notice";

export type CollectionStatus =
  | "open"
  | "in_progress"
  | "resolved"
  | "closed";

export interface CollectionAction {
  id: string;
  actionType: CollectionActionType;
  actionDate: string;
  notes?: string;

  // For promise to pay
  promisedAmount?: number;
  promisedDate?: string;
  fulfilled?: boolean;
}

export interface CollectionPlan {
  id: string;
  customerId: string;
  createdDate: string;
  assignedTo?: string;               // موظف التحصيل
  status: CollectionStatus;

  totalOutstanding: number;          // إجمالي المبالغ المستحقة
  overdueAmount: number;             // المبالغ المتأخرة فقط

  actions: CollectionAction[];

  nextFollowUpDate?: string;
  priority: "low" | "medium" | "high";

  createdAt: string;
  updatedAt: string;
}

export const collectionPlans: CollectionPlan[] = [
  {
    id: "col-001",
    customerId: "cust-001",
    createdDate: "2024-01-25",
    assignedTo: "collector-001",
    status: "in_progress",
    totalOutstanding: 70000,
    overdueAmount: 20000,
    priority: "high",
    actions: [
      {
        id: "col-act-1",
        actionType: "call",
        actionDate: "2024-01-26",
        notes: "تم التواصل مع العميل ووعد بالسداد",
      },
      {
        id: "col-act-2",
        actionType: "promise_to_pay",
        actionDate: "2024-01-26",
        promisedAmount: 20000,
        promisedDate: "2024-02-05",
        fulfilled: false,
      }
    ],
    nextFollowUpDate: "2024-02-06",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
