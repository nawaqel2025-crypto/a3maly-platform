"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Line = {
  id: number;
  code: string;
  name: string;
  group: "revenue" | "expense";
  amount: number;
};

export default function IncomeStatementPage() {
  const [lines, setLines] = useState<Line[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .rpc("get_income_statement"); // سنعرّفها في Supabase لاحقًا

    if (!error && data) {
      setLines(data);
    }

    setLoading(false);
  };

  const revenues = lines.filter((l) => l.group === "revenue");
  const expenses = lines.filter((l) => l.group === "expense");

  const totalRevenue = revenues.reduce((s, l) => s + l.amount, 0);
  const totalExpenses = expenses.reduce((s, l) => s + l.amount, 0);
  const netIncome = totalRevenue - totalExpenses;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[var(--color-fg)]">
        قائمة الدخل
      </h1>

      {loading ? (
        <div className="text-[var(--color-fg-muted)]">جاري التحميل…</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* الإيرادات */}
          <Card title="الإيرادات" total={totalRevenue}>
            {revenues.map((row) => (
              <Row key={row.id} name={row.name} amount={row.amount} />
            ))}
          </Card>

          {/* المصروفات */}
          <Card title="المصروفات" total={totalExpenses}>
            {expenses.map((row) => (
              <Row key={row.id} name={row.name} amount={row.amount} />
            ))}
          </Card>
        </div>
      )}

      {!loading && (
        <div className="p-5 border rounded-lg bg-[var(--color-bg)] border-[var(--color-border)] space-y-3 max-w-xl">
          <h2 className="text-xl font-semibold text-[var(--color-fg)]">
            صافي الربح / الخسارة
          </h2>
          <div className="flex justify-between text-lg font-bold">
            <span>صافي الربح</span>
            <span
              className={
                netIncome >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {netIncome.toLocaleString("en-US")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------
   Components
------------------------------ */

function Card({ title, total, children }: any) {
  return (
    <div className="p-5 border rounded-lg bg-[var(--color-bg)] border-[var(--color-border)] space-y-4">
      <h2 className="text-xl font-semibold text-[var(--color-fg)]">{title}</h2>

      <div className="space-y-2">{children}</div>

      <div className="pt-3 border-t border-[var(--color-border)] flex justify-between font-bold text-[var(--color-fg)]">
        <span>الإجمالي</span>
        <span>{total.toLocaleString("en-US")}</span>
      </div>
    </div>
  );
}

function Row({ name, amount }: any) {
  return (
    <div className="flex justify-between text-sm text-[var(--color-fg)] opacity-90">
      <span>{name}</span>
      <span>{amount.toLocaleString("en-US")}</span>
    </div>
  );
}
