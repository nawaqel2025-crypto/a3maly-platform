"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type CashFlowSection = {
  title: string;
  items: { name: string; amount: number }[];
  total: number;
};

export default function CashFlowPage() {
  const [data, setData] = useState<{
    operating: CashFlowSection;
    investing: CashFlowSection;
    financing: CashFlowSection;
    netCashFlow: number;
    endingCash: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    const { data, error } = await supabase.rpc("get_cash_flow_statement");

    if (!error && data) {
      setData(data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="text-[var(--color-fg-muted)]">جاري تحميل التقرير…</div>
    );
  }

  if (!data) {
    return (
      <div className="text-red-500">تعذر تحميل تقرير التدفقات النقدية.</div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[var(--color-fg)]">
        تقرير التدفقات النقدية
      </h1>

      {/* الأنشطة التشغيلية */}
      <CashFlowCard section={data.operating} />

      {/* الأنشطة الاستثمارية */}
      <CashFlowCard section={data.investing} />

      {/* الأنشطة التمويلية */}
      <CashFlowCard section={data.financing} />

      {/* صافي التدفق النقدي */}
      <div className="p-5 border rounded-lg bg-[var(--color-bg)] border-[var(--color-border)] space-y-3 max-w-xl">
        <h2 className="text-xl font-semibold text-[var(--color-fg)]">
          صافي التدفق النقدي
        </h2>
        <div className="flex justify-between text-lg font-bold">
          <span>صافي التدفق</span>
          <span
            className={
              data.netCashFlow >= 0 ? "text-green-500" : "text-red-500"
            }
          >
            {data.netCashFlow.toLocaleString("en-US")}
          </span>
        </div>

        <div className="flex justify-between text-lg font-bold pt-3 border-t border-[var(--color-border)]">
          <span>الرصيد النقدي الختامي</span>
          <span>{data.endingCash.toLocaleString("en-US")}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------
   Components
------------------------------ */

function CashFlowCard({ section }: { section: CashFlowSection }) {
  return (
    <div className="p-5 border rounded-lg bg-[var(--color-bg)] border-[var(--color-border)] space-y-4 max-w-xl">
      <h2 className="text-xl font-semibold text-[var(--color-fg)]">
        {section.title}
      </h2>

      <div className="space-y-2">
        {section.items.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between text-sm text-[var(--color-fg)] opacity-90"
          >
            <span>{item.name}</span>
            <span>{item.amount.toLocaleString("en-US")}</span>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-[var(--color-border)] flex justify-between font-bold text-[var(--color-fg)]">
        <span>الإجمالي</span>
        <span>{section.total.toLocaleString("en-US")}</span>
      </div>
    </div>
  );
}
