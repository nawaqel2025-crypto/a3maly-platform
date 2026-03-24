// gl/journals/journalTemplates.ts

export interface JournalTemplateLine {
  id: string;
  accountId: string;
  description?: string;
  debit?: number;
  credit?: number;
}

export interface JournalTemplate {
  id: string;
  name: string;                     // مثال: قالب الرواتب
  description?: string;
  lines: JournalTemplateLine[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mock Data
export const journalTemplates: JournalTemplate[] = [
  {
    id: "tmpl-001",
    name: "قالب الرواتب",
    description: "قيد شهري للرواتب",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lines: [
      {
        id: "tmpl-line-1",
        accountId: "5000",
        description: "مصروف الرواتب",
        debit: 50000,
      },
      {
        id: "tmpl-line-2",
        accountId: "2000",
        description: "الصندوق",
        credit: 50000,
      }
    ]
  }
];
