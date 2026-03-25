// accounting/ar/receipts/cashReceipts.ts

export type CashReceiptStatus =
  | "draft"
  | "approved"
  | "posted"
  | "void";

export interface CashReceiptLine {
  id: string;
  invoiceId?: string;             // الفاتورة المسددة
  amount: number;
  discount?: number;              // خصم سداد مبكر
  writeOff?: number;              // شطب جزء من الدين
  description?: string;
}

export interface CashReceipt {
  id: string;
  receiptNumber: string;          // مثال: CR-2024-0001
  customerId: string;
  receiptDate: string;
  currency: string;

  status: CashReceiptStatus;

  lines: CashReceiptLine[];

  totalAmount: number;
  appliedAmount: number;
  unappliedAmount: number;

  reference?: string;
  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export const cashReceipts: CashReceipt[] = [
  {
    id: "cr-001",
    receiptNumber: "CR-2024-0001",
    customerId: "cust-001",
    receiptDate: "2024-01-20",
    currency: "SAR",
    status: "posted",
    lines: [
      {
        id: "cr-line-1",
        invoiceId: "inv-001",
        amount: 3000,
        description: "سداد جزئي للفاتورة",
      }
    ],
    totalAmount: 3000,
    appliedAmount: 3000,
    unappliedAmount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
