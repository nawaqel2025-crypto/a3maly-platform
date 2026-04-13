"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type AccountType = {
  id: number;
  code: string;
  name: string;
  classification: string; // asset, liability, equity, revenue, expense
};

const classifications = [
  { value: "asset", label: "أصل" },
  { value: "liability", label: "خصم" },
  { value: "equity", label: "حقوق ملكية" },
  { value: "revenue", label: "إيراد" },
  { value: "expense", label: "مصروف" },
];

export default function ClassificationPage() {
  const [accounts, setAccounts] = useState<AccountType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("chart_of_accounts")
      .select("id, code, name, classification")
      .order("code");

    if (data) setAccounts(data);

    setLoading(false);
  };

  const updateClassification = async (id: number, value: string) => {
    await supabase
      .from("chart_of_accounts")
      .update({ classification: value })
      .eq("id", id);

    loadAccounts();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[var(--color-fg)]">
        تصنيف الحسابات
      </h1>

      {loading ? (
        <div className="text-[var(--color-fg-muted)]">جاري التحميل…</div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-bg-muted)] text-[var(--color-fg)]">
              <tr>
                <th className="p-2 text-right">الكود</th>
                <th className="p-2 text-right">اسم الحساب</th>
                <th className="p-2 text-right">التصنيف</th>
              </tr>
            </thead>

            <tbody>
              {accounts.map((acc) => (
                <tr
                  key={acc.id}
                  className="border-t border-[var(--color-border)]"
                >
                  <td className="p-2">{acc.code}</td>
                  <td className="p-2">{acc.name}</td>
                  <td className="p-2">
                    <select
                      className="p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg)]"
                      value={acc.classification || ""}
                      onChange={(e) =>
                        updateClassification(acc.id, e.target.value)
                      }
                    >
                      <option value="">اختر التصنيف…</option>
                      {classifications.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
