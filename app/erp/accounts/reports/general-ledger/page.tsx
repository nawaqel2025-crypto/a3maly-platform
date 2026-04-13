"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type JournalEntry = {
  id: number;
  date: string;
  account: string;
  description: string;
  debit: number;
  credit: number;
};

export default function GeneralJournalReport() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    setLoading(true);

    const { data } = await supabase.rpc("get_general_journal", {
      date_from: fromDate || null,
      date_to: toDate || null,
    });

    if (data) setEntries(data);

    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[var(--color-fg)]">
        تقرير اليومية العامة
      </h1>

      {/* Filters */}
      <div className="p-5 border rounded-lg bg-[var(--color-bg)] border-[var(--color-border)] space-y-4 max-w-2xl">
        <h2 className="text-lg font-semibold">تصفية التقرير</h2>

        <div className="grid grid-cols-2 gap-4">
          <Input label="من تاريخ" type="date" value={fromDate} onChange={setFromDate} />
          <Input label="إلى تاريخ" type="date" value={toDate} onChange={setToDate} />
        </div>

        <button
          onClick={loadEntries}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          عرض التقرير
        </button>
      </div>

      {/* Report */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-bg-muted)] text-[var(--color-fg)]">
            <tr>
              <th className="p-2 text-right">التاريخ</th>
              <th className="p-2 text-right">الحساب</th>
              <th className="p-2 text-right">البيان</th>
              <th className="p-2 text-right">مدين</th>
              <th className="p-2 text-right">دائن</th>
            </tr>
          </thead>

          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-t border-[var(--color-border)]">
                <td className="p-2">{e.date}</td>
                <td className="p-2">{e.account}</td>
                <td className="p-2">{e.description}</td>
                <td className="p-2">{e.debit.toLocaleString("en-US")}</td>
                <td className="p-2">{e.credit.toLocaleString("en-US")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && (
        <div className="text-[var(--color-fg-muted)]">جاري التحميل…</div>
      )}
    </div>
  );
}

/* UI */
function Input({ label, value, onChange, type = "text" }: any) {
  return (
    <div>
      <label className="block mb-1 text-sm">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg)]"
      />
    </div>
  );
}
