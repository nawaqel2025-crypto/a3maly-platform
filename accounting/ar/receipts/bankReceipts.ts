// accounting/ar/receipts/bankReceipts.ts

export type BankReceiptMethod =
  | "bank_transfer"
  | "check"
  | "deposit";

export type BankReceiptStatus =
  | "draft"
  | "approved"
  | "posted"
  | "returned"
  | "void";

export interface BankReceiptLine {
  id: string;
  invoiceId?: string;
  amount: number;
  description?: string;
}

export interface BankReceipt {
  id: string;
  receiptNumber: string;          // مثال: BR-2024-0001
  customerId: string;
  receiptDate: string;
  currency: string;

  method: BankReceiptMethod;
  bankAccountId: string;          // حساب البنك المستلم
  referenceNumber?: string;       // رقم الشيك أو التحويل

  status: BankReceiptStatus;

  lines: BankReceiptLine[];

  totalAmount: number;
  appliedAmount: number;
  unappliedAmount: number;

  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export const bankReceipts: BankReceipt[] = [
  {
    id: "br-001",
    receiptNumber: "BR-2024-0001",
    customerId: "cust-001",
    receiptDate: "2024-01-22",
    currency: "SAR",
    method: "bank_transfer",
    bankAccountId: "bank-001",
    referenceNumber: "TRX-998877",
    status: "posted",
    lines: [
      {
        id: "br-line-1",
        invoiceId: "inv-001",
        amount: 2750,
      }
    ],
    totalAmount: 2750,
    appliedAmount: 2750,
    unappliedAmount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
