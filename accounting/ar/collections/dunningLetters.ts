// accounting/ar/collections/dunningLetters.ts

export type DunningLevel =
  | "level_1"   // تذكير بسيط
  | "level_2"   // إشعار تأخير رسمي
  | "level_3"   // إشعار نهائي
  | "legal";    // تحويل قانوني

export interface DunningLetter {
  id: string;
  customerId: string;
  level: DunningLevel;
  issueDate: string;
  dueAmount: number;
  overdueDays: number;

  message: string;                 // نص الخطاب
  sentBy?: string;                 // موظف التحصيل
  deliveryMethod: "email" | "sms" | "printed";

  createdAt: string;
  updatedAt: string;
}

export const dunningLetters: DunningLetter[] = [
  {
    id: "dun-001",
    customerId: "cust-001",
    level: "level_2",
    issueDate: "2024-01-28",
    dueAmount: 20000,
    overdueDays: 45,
    message:
      "نود إعلامكم بوجود مبالغ مستحقة تجاوزت 30 يومًا. نرجو السداد في أقرب وقت لتجنب الإجراءات اللاحقة.",
    sentBy: "collector-001",
    deliveryMethod: "email",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
