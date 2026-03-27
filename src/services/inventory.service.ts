import { createClient } from "@supabase/supabase-js";
import type { InventoryItem, InventorySettings } from "@/types/inventory";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getInventorySettings(companyId: string) {
  const { data, error } = await supabase
    .from("inventory_settings")
    .select("*")
    .eq("company_id", companyId)
    .single();

  if (error) throw error;
  return data as InventorySettings;
}

export async function upsertInventorySettings(
  companyId: string,
  payload: Partial<InventorySettings>
) {
  const { data, error } = await supabase
    .from("inventory_settings")
    .upsert({ company_id: companyId, ...payload })
    .select()
    .single();

  if (error) throw error;
  return data as InventorySettings;
}

export async function getInventoryItems(companyId: string) {
  const { data, error } = await supabase
    .from("inventory_items")
    .select("*")
    .eq("company_id", companyId);

  if (error) throw error;
  return data as InventoryItem[];
}
