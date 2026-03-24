// gl/posting/validationRules.ts

import { JournalEntry } from "../journals/journalEntries";
import { JournalLine } from "../journals/journalLines";

export interface ValidationResult {
  success: boolean;
  message: string;
}

export function validateJournalEntry(
  entry: JournalEntry,
  lines: JournalLine[]
): ValidationResult {
  // 1) يجب أن يحتوي القيد على أسطر
  if (lines.length === 0) {
    return {
      success: false,
      message: "لا يمكن ترحيل قيد بدون أسطر.",
    };
  }

  // 2) التأكد من أن كل سطر يحتوي على حساب
  for (const line of lines) {
    if (!line.accountId) {
      return {
        success: false,
        message: "أحد الأسطر لا يحتوي على رقم حساب.",
      };
    }
  }

  // 3) التأكد من أن القيد ليس مرحلاً مسبقًا
  if (entry.status === "posted") {
    return {
      success: false,
      message: "لا يمكن ترحيل قيد مرحّل مسبقًا.",
    };
  }

  return {
    success: true,
    message: "القيد صالح للترحيل.",
  };
}
