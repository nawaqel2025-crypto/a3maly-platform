// accounting/ar/invoices/creditNotes.ts

export type CreditNoteStatus = "draft" | "approved" | "posted" | "void";

export interface CreditNoteLine {
  id: string;
  invoiceLineId?: string;         // ربط بسطر الفاتورة الأصلية
  description: string;
  amount: number;
  taxCodeId?: string;
}

export interface CreditNote {
  id: string;
  creditNoteNumber: string;       // مثال: CN-2024-0001
  invoiceId: string;              // الفاتورة المرتبطة
  customerId: string;

  date: string;
  currency: string;

  status: CreditNoteStatus;

  lines: CreditNoteLine[];

  subtotal: number;
  taxAmount: number;
  totalAmount: number;

  reason?: string;

  createdAt: string;
  updatedAt: string;
}

export const creditNotes: CreditNote[] = [
  {
    id: "cn-001",
    creditNoteNumber: "CN-2024-0001",
    invoiceId: "inv-001",
    customerId: "cust-001",
    date: "2024-01-15",
    currency: "SAR",
    status: "posted",
    lines: [
      {
        id: "cn-line-1",
        description: "خصم على الخدمة",
        amount: 500,
      }
    ],
    subtotal: 500,
    taxAmount: 75,
    totalAmount: 575,
    reason: "خطأ في التسعير",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
