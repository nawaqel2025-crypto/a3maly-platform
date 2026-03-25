// accounting/gl/reconciliation/glReconciliation.ts

export interface GLReconciliationItem {
  id: string;
  accountId: string;                 // رقم الحساب
  reference: string;                 // رقم المستند أو القيد
  description?: string;
  debit: number;
  credit: number;
  matched: boolean;                  // هل تمت المطابقة؟
  matchedWith?: string;              // رقم العنصر المطابق معه
  createdAt: string;
  updatedAt: string;
}

export interface GLReconciliation {
  id: string;
  accountId: string;                 // الحساب الذي تتم عليه المطابقة
  period: string;                    // مثال: 2024-01
  items: GLReconciliationItem[];
  createdAt: string;
  updatedAt: string;
}

export const glReconciliations: GLReconciliation[] = [
  {
    id: "glrec-001",
    accountId: "1100",
    period: "2024-01",
    items: [
      {
        id: "glrec-item-1",
        accountId: "1100",
        reference: "JV-2024-0001",
        description: "رصيد أول المدة",
        debit: 5000,
        credit: 0,
        matched: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "glrec-item-2",
        accountId: "1100",
        reference: "JV-2024-0005",
        description: "سداد فاتورة",
        debit: 0,
        credit: 5000,
        matched: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
