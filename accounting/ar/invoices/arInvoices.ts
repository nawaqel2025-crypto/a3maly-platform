// accounting/ar/invoices/arInvoices.ts

export type ARInvoiceStatus =
  | "draft"
  | "approved"
  | "posted"
  | "partially_paid"
  | "paid"
  | "void";

export interface ARInvoiceLine {
  id: string;
  itemId?: string;                 // ربط بالأصناف (إن وجدت)
  description: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
  taxCodeId?: string;
  total: number;
}

export interface ARInvoice {
  id: string;
  invoiceNumber: string;           // مثال: INV-2024-0001
  customerId: string;
  invoiceDate: string;
  dueDate: string;
  currency: string;

  status: ARInvoiceStatus;

  lines: ARInvoiceLine[];

  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;

  reference?: string;
  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export const arInvoices: ARInvoice[] = [
  {
    id: "inv-001",
    invoiceNumber: "INV-2024-0001",
    customerId: "cust-001",
    invoiceDate: "2024-01-10",
    dueDate: "2024-02-10",
    currency: "SAR",
    status: "posted",
    lines: [
      {
        id: "inv-line-1",
        description: "خدمة استشارية",
        quantity: 10,
        unitPrice: 500,
        total: 5000,
      }
    ],
    subtotal: 5000,
    taxAmount: 750,
    totalAmount: 5750,
    amountPaid: 0,
    balanceDue: 5750,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
