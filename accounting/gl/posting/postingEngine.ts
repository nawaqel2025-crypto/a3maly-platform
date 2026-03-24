// gl/posting/postingEngine.ts

import { JournalEntry } from "../journals/journalEntries";
import { JournalLine } from "../journals/journalLines";
import { validateJournalEntry } from "./validationRules";

export interface PostingResult {
  success: boolean;
  message: string;
  entry?: JournalEntry;
}

export function postJournalEntry(
  entry: JournalEntry,
  lines: JournalLine[]
): PostingResult {
  // 1) التحقق من صحة القيد
  const validation = validateJournalEntry(entry, lines);
  if (!validation.success) {
    return {
      success: false,
      message: validation.message,
    };
  }

  // 2) التأكد من توازن المدين والدائن
  const totalDebit = lines.reduce((sum, l) => sum + l.debit, 0);
  const totalCredit = lines.reduce((sum, l) => sum + l.credit, 0);

  if (totalDebit !== totalCredit) {
    return {
      success: false,
      message: "القيد غير متوازن: مجموع المدين لا يساوي مجموع الدائن.",
    };
  }

  // 3) تغيير حالة القيد إلى Posted
  const postedEntry: JournalEntry = {
    ...entry,
    status: "posted",
    updatedAt: new Date().toISOString(),
  };

  return {
    success: true,
    message: "تم ترحيل القيد بنجاح.",
    entry: postedEntry,
  };
}
