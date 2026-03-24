// gl/journals/journalLines.ts

export interface JournalLine {
  id: string;
  entryId: string;             // ربط السطر بالقيد
  accountId: string;           // رقم الحساب
  description?: string;
  debit: number;
  credit: number;
  costCenterId?: string;
  projectId?: string;
  departmentId?: string;
  regionId?: string;
  createdAt: string;
  updatedAt: string;
}

// Mock Data
export const journalLines: JournalLine[] = [
  {
    id: "jl-001",
    entryId: "je-001",
    accountId: "1000",
    description: "رصيد افتتاحي",
    debit: 10000,
    credit: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "jl-002",
    entryId: "je-001",
    accountId: "3000",
    description: "رصيد افتتاحي",
    debit: 0,
    credit: 10000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
