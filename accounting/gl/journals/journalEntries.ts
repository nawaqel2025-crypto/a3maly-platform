// gl/journals/journalEntries.ts

export interface JournalEntry {
  id: string;
  journalNumber: string;        // رقم القيد
  date: string;                 // تاريخ القيد
  description?: string;         // الوصف العام
  reference?: string;           // رقم مرجع خارجي
  status: "draft" | "posted" | "reversed";
  totalDebit: number;
  totalCredit: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Mock Data
export const journalEntries: JournalEntry[] = [
  {
    id: "je-001",
    journalNumber: "JV-2024-0001",
    date: "2024-01-01",
    description: "قيد افتتاحي",
    reference: "OPEN-2024",
    status: "posted",
    totalDebit: 10000,
    totalCredit: 10000,
    createdBy: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
