// accounting/ar/receipts/reconciliation.ts

export interface ReceiptReconciliationItem {
  id: string;
  receiptId: string;               // Cash or Bank Receipt
  invoiceId: string;
  appliedAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReceiptReconciliation {
  id: string;
  customerId: string;
  period: string;                  // مثال: 2024-01
  items: ReceiptReconciliationItem[];
  createdAt: string;
  updatedAt: string;
}

export const receiptReconciliations: ReceiptReconciliation[] = [
  {
    id: "rec-001",
    customerId: "cust-001",
    period: "2024-01",
    items: [
      {
        id: "rec-item-1",
        receiptId: "cr-001",
        invoiceId: "inv-001",
        appliedAmount: 3000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
