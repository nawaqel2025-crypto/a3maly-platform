// accounting/gl/reconciliation/intercompanyReconciliation.ts

export interface IntercompanyTransaction {
  id: string;
  fromCompanyId: string;             // الشركة المرسلة
  toCompanyId: string;               // الشركة المستقبلة
  reference: string;                 // رقم المستند
  amount: number;
  currency: string;
  description?: string;
  matched: boolean;
  matchedWith?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IntercompanyReconciliation {
  id: string;
  period: string;                    // مثال: 2024-Q1
  transactions: IntercompanyTransaction[];
  createdAt: string;
  updatedAt: string;
}

export const intercompanyReconciliations: IntercompanyReconciliation[] = [
  {
    id: "icrec-001",
    period: "2024-Q1",
    transactions: [
      {
        id: "icrec-tx-1",
        fromCompanyId: "COMP-001",
        toCompanyId: "COMP-002",
        reference: "INV-1001",
        amount: 25000,
        currency: "SAR",
        description: "فاتورة خدمات بين الشركات",
        matched: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "icrec-tx-2",
        fromCompanyId: "COMP-002",
        toCompanyId: "COMP-001",
        reference: "PAY-2001",
        amount: 25000,
        currency: "SAR",
        description: "سداد الفاتورة",
        matched: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
