export interface InventoryItem {
  id: string;
  name: string;
  sku?: string;
  quantity: number;
}

export interface InventorySettings {
  id?: string;
  company_id: string;
  default_warehouse_id?: string | null;
  allow_negative_stock?: boolean;
  valuation_method?: string;
}
