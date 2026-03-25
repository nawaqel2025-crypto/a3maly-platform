// accounting/ar/customers/customerAging.ts

export interface AgingBucket {
  bucketName: string;        // مثال: "0-30", "31-60"
  fromDays: number;
  toDays: number | null;     // null = open-ended (مثال: +180)
}

export interface CustomerAgingBalance {
  customerId: string;
  asOfDate: string;          // تاريخ إعداد التقرير
  currency: string;

  current: number;           // غير مستحق بعد
  bucket_0_30: number;
  bucket_31_60: number;
  bucket_61_90: number;
  bucket_91_120: number;
  bucket_121_plus: number;

  total: number;
  overdue: number;           // مجموع المبالغ المتأخرة فقط
}

export const defaultAgingBuckets: AgingBucket[] = [
  { bucketName: "0-30", fromDays: 0, toDays: 30 },
  { bucketName: "31-60", fromDays: 31, toDays: 60 },
  { bucketName: "61-90", fromDays: 61, toDays: 90 },
  { bucketName: "91-120", fromDays: 91, toDays: 120 },
  { bucketName: "121+", fromDays: 121, toDays: null },
];

export const customerAgingBalances: CustomerAgingBalance[] = [
  {
    customerId: "cust-001",
    asOfDate: "2024-01-31",
    currency: "SAR",
    current: 30000,
    bucket_0_30: 20000,
    bucket_31_60: 15000,
    bucket_61_90: 5000,
    bucket_91_120: 0,
    bucket_121_plus: 0,
    total: 70000,
    overdue: 20000, // 31+ days
  }
];
