// gl/journals/recurringJournals.ts

export interface RecurringJournal {
  id: string;
  templateId: string;             // ربط بقالب قيد
  frequency: "monthly" | "quarterly" | "yearly";
  nextRunDate: string;            // تاريخ التنفيذ القادم
  lastRunDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mock Data
export const recurringJournals: RecurringJournal[] = [
  {
    id: "rec-001",
    templateId: "tmpl-001",
    frequency: "monthly",
    nextRunDate: "2024-02-01",
    lastRunDate: "2024-01-01",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
