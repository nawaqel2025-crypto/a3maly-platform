"use client";

import { useEffect, useState } from "react";
import type { InventoryItem } from "@/types/inventory";

export function useInventory(companyId: string) {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) return;

    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(/api/inventory/items?companyId=);
      const data = await res.json();
      setItems(data);
      setLoading(false);
    };

    fetchData();
  }, [companyId]);

  return { items, loading };
}
