"use client";

import { useEffect, useState } from "react";
import type { Customer } from "@/types/customers";

export function useCustomers(companyId: string) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) return;

    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(/api/customers?companyId=);
      const data = await res.json();
      setCustomers(data);
      setLoading(false);
    };

    fetchData();
  }, [companyId]);

  return { customers, loading };
}
