// accounting/ar/invoices/recurringInvoices.ts

export type RecurringFrequency = "monthly" | "quarterly" | "yearly";

export interface RecurringInvoiceTemplateLine {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxCodeId?: string;
}

export interface RecurringInvoiceTemplate {
  id: string;
  name: string;                     // مثال: اشتراك شهري
  customerId: string;
  currency: string;

  frequency: RecurringFrequency;
  nextRunDate: string;
  lastRunDate?: string;

  lines: RecurringInvoiceTemplateLine[];

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

export const recurringInvoices: RecurringInvoiceTemplate[] = [
  {
    id: "recinv-001",
    name: "اشتراك شهري - باقة أعمال",
    customerId: "cust-001",
    currency: "SAR",
    frequency: "monthly",
    nextRunDate: "2024-02-01",
    lastRunDate: "2024-01-01",
    isActive: true,
    lines: [
      {
        id: "recinv-line-1",
        description: "اشتراك منصة أعمالي",
        quantity: 1,
        unitPrice: 300,
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
