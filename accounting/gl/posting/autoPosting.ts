// gl/posting/autoPosting.ts

import { JournalTemplate } from "../journals/journalTemplates";
import { JournalEntry } from "../journals/journalEntries";
import { JournalLine } from "../journals/journalLines";

export function generateAutoJournal(
  template: JournalTemplate,
  reference: string
): { entry: JournalEntry; lines: JournalLine[] } {
  const entryId = `auto-${Date.now()}`;

  const entry: JournalEntry = {
    id: entryId,
    journalNumber: `AUTO-${Date.now()}`,
    date: new Date().toISOString(),
    description: template.description || "قيد تلقائي",
    reference,
    status: "draft",
    totalDebit: 0,
    totalCredit: 0,
    createdBy: "system",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const lines: JournalLine[] = template.lines.map((line) => ({
    id: `line-${Math.random()}`,
    entryId,
    accountId: line.accountId,
    description: line.description,
    debit: line.debit || 0,
    credit: line.credit || 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  entry.totalDebit = lines.reduce((sum, l) => sum + l.debit, 0);
  entry.totalCredit = lines.reduce((sum, l) => sum + l.credit, 0);

  return { entry, lines };
}
