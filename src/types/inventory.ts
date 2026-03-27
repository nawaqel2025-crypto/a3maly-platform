export interface InventoryItem {
  id: string;
  company_id: string;
  code: string;
  name: string;
  unit: string;
  balance: number;
}

export interface InventorySettings {
  company_id: string;
  valuation_method: "FIFO" | "LIFO" | "AVERAGE";
  allow_negative: boolean;
}
