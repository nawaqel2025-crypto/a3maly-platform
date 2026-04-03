export const INVENTORY_VALUATION_METHODS = [
  { value: "FIFO", label: "طريقة الوارد أولاً يصرف أولاً (FIFO)" },
  { value: "LIFO", label: "طريقة الوارد أخيراً يصرف أولاً (LIFO)" },
  { value: "AVERAGE", label: "متوسط التكلفة" },
] as const;
